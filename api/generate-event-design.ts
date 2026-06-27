
import { GoogleGenAI, Type } from "@google/genai";

// Switch to Node.js runtime
// export const config = { runtime: 'edge' };

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const config = req.body;
        const { companyName, eventName, guestCount, eventType, brief, features } = config;

        if (!companyName || !eventName) {
            return res.status(400).json({ error: 'Missing required design parameters.' });
        }

        const apiKey = process.env.API_KEY || process.env.GOOGLE_CLOUD_API_KEY;
        if (!apiKey) {
            throw new Error("API key is not configured on the server.");
        }
        const ai = new GoogleGenAI({ apiKey });

        // Define Schema
        const conceptSchema = {
            type: Type.OBJECT,
            properties: {
                conceptName: { type: Type.STRING },
                style: { type: Type.STRING },
                detailedDescription: { type: Type.STRING, description: "3-4 sentences describing the atmosphere." },
                decorElements: { type: Type.ARRAY, items: { type: Type.STRING } },
                lighting: { type: Type.STRING },
                engagementTech: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ['conceptName', 'style', 'detailedDescription', 'decorElements', 'lighting', 'engagementTech']
        };

        const responseSchema = {
            type: Type.OBJECT,
            properties: {
                industryDetected: { type: Type.STRING },
                conceptA: conceptSchema,
                conceptB: conceptSchema,
                conceptC: conceptSchema,
                conceptD: conceptSchema
            },
            required: ['industryDetected', 'conceptA', 'conceptB', 'conceptC', 'conceptD']
        };

        // === 1. Generate 4 Text Concepts ===
        const textPrompt = `
        You are a world-class creative director for luxury events in Dubai.
        
        Context:
        - Client: "${companyName}"
        - Event: "${eventName}" (${eventType})
        - Guests: ~${guestCount}
        - Brief/Theme: "${brief || 'No specific theme, surprise us.'}"
        - Must Haves: ${features.join(', ') || 'Standard luxury event features'}

        Task:
        Create FOUR distinct event concepts to pitch to the client:
        1. Concept A: "Timeless Luxury" (Elegant, classic, opulent).
        2. Concept B: "Futuristic Tech" (Digital, immersive, neon/holographic).
        3. Concept C: "Avant-Garde" (Artistic, bold, unexpected).
        4. Concept D: "Organic Sanctuary" (Sustainable, biophilic, warm).

        OUTPUT INSTRUCTION:
        Return ONLY a raw valid JSON object matching the following structure. Do not include markdown code blocks.
        Structure: ${JSON.stringify(responseSchema)}
        `;

        const textResponse = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: { parts: [{ text: textPrompt }] },
            config: {
                tools: [{ googleSearch: {} }] 
            },
        });

        // Clean and Parse JSON
        let rawText = textResponse.text ? textResponse.text.trim() : "";
        rawText = rawText.replace(/^```json\s*/, "").replace(/^```\s*/, "").replace(/\s*```$/, "");

        if (!rawText) {
             throw new Error("Model returned empty response.");
        }

        let designData;
        try {
            designData = JSON.parse(rawText);
        } catch (e) {
            console.error("JSON Parsing Failed", rawText);
            throw new Error("Failed to parse generated event concepts.");
        }

        // === 2. Generate Images (4 distinct renders) ===
        
        const generateImage = async (concept: any) => {
             const imagePrompt = `Photorealistic, award-winning event photography of "${concept.conceptName}" for "${companyName}".
            Event Type: ${eventType}.
            Style: ${concept.style}.
            Scene Description: ${concept.detailedDescription}.
            Key Decor: ${concept.decorElements.join(', ')}.
            Lighting Atmosphere: ${concept.lighting}.
            Venue: High-end luxury venue in Dubai.
            Resolution: 8k, cinematic, atmospheric depth.`;

            try {
                const resp = await ai.models.generateContent({
                    model: 'gemini-3.1-flash-image',
                    contents: { parts: [{ text: imagePrompt }] },
                    config: {
                        imageConfig: { aspectRatio: "16:9", imageSize: "1K" }
                    }
                } as any);

                if (resp.candidates?.[0]?.content?.parts) {
                    for (const part of resp.candidates[0].content.parts) {
                        if (part.inlineData) return part.inlineData.data;
                    }
                }
            } catch (imgError) {
                console.error("Image generation failed for concept:", concept.conceptName, imgError);
            }
            return null;
        };

        // Run image generation in parallel
        const [imageA, imageB, imageC, imageD] = await Promise.all([
            generateImage(designData.conceptA),
            generateImage(designData.conceptB),
            generateImage(designData.conceptC),
            generateImage(designData.conceptD)
        ]);

        // === 3. Respond ===
        return res.status(200).json({ 
            industry: designData.industryDetected,
            conceptA: { ...designData.conceptA, image: imageA },
            conceptB: { ...designData.conceptB, image: imageB },
            conceptC: { ...designData.conceptC, image: imageC },
            conceptD: { ...designData.conceptD, image: imageD }
        });

    } catch (error: any) {
        console.error('Error in generate-event-design API:', error);
        return res.status(500).json({ error: error.message || 'An internal server error occurred.' });
    }
}
