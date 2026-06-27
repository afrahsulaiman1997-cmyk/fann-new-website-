
import { GoogleGenAI, Type } from "@google/genai";

// Switch to Node.js runtime for longer timeouts (configured in vercel.json)
// export const config = { runtime: 'edge' }; 

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const config = req.body;
        const { companyName, websiteUrl, eventName, boothSize, boothType, features, standWidth, standLength, standHeight, brief, brandColors, industry } = config;

        if (!boothSize || !boothType) {
            return res.status(400).json({ error: 'Missing required design parameters.' });
        }

        const apiKey = process.env.API_KEY || process.env.GOOGLE_CLOUD_API_KEY;
        if (!apiKey) {
            throw new Error("API key is not configured on the server.");
        }
        const ai = new GoogleGenAI({ apiKey });

        // Define Schema Structure
        const conceptSchema = {
            type: Type.OBJECT,
            properties: {
                conceptName: { type: Type.STRING },
                style: { type: Type.STRING },
                description: { type: Type.STRING, description: "2-3 sentences describing the look and feel." },
                materials: { type: Type.ARRAY, items: { type: Type.STRING } },
                keyFeature: { type: Type.STRING, description: "The standout element." }
            },
            required: ['conceptName', 'style', 'description', 'materials', 'keyFeature']
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

        // === 1. Analyze Brand & Generate 4 Text Concepts ===
        // Note: We rely on the passed 'brandColors' instead of analyzing the logo again to save bandwidth/time.
        const textPrompt = `
        You are a world-class exhibition stand designer.
        
        Context:
        - Event: "${eventName}"
        - Company: "${companyName}"
        - Website: "${websiteUrl}"
        - Client Brief: "${brief || 'No specific instructions.'}"
        - Detected Industry: "${industry || 'General'}"
        - Brand Colors: ${brandColors && brandColors.length > 0 ? brandColors.join(', ') : 'Not specified (Infer from context)'}.
        
        Constraints:
        - Orientation: ${boothType} (${standWidth}m x ${standLength}m).
        - Height: ${standHeight || 4}m.
        - Must include: ${features.join(', ') || 'Standard exhibition features'}.
        
        Task:
        Create FOUR distinct design concepts suitable for the ${industry || 'identified'} industry.
        1. Concept A: "Modern & Tech-Forward" (Innovation focus).
        2. Concept B: "Luxury & Hospitality" (Premium materials, lounge focus).
        3. Concept C: "Interactive & Engaging" (Gamification/Demo focus).
        4. Concept D: "Sustainable & Organic" (Greenery, wood, eco-friendly focus).

        Ensure the 'brandColors' are mentioned in the material/description where appropriate.

        OUTPUT INSTRUCTION:
        Return ONLY a raw valid JSON object matching the following structure. Do not include markdown code blocks (like \`\`\`json).
        Structure: ${JSON.stringify(responseSchema)}
        `;

        const textResponse = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: { parts: [{ text: textPrompt }] },
            config: {
                tools: [{ googleSearch: {} }], 
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
            console.error("JSON Parsing Failed. Raw text:", rawText);
            throw new Error("Failed to parse generated design data. The model output was not valid JSON.");
        }

        // === 2. Generate Images (4 distinct renders) ===
        
        const generateImage = async (concept: any) => {
             const imagePrompt = `Photorealistic 3D render of an exhibition stand for "${companyName}".
            Style: ${concept.style}.
            Concept: "${concept.conceptName}".
            Description: ${concept.description}.
            Layout: ${boothType} Stand (${standWidth}m x ${standLength}m).
            Key Feature: ${concept.keyFeature}.
            Materials: ${concept.materials.join(', ')}.
            Brand Colors: ${brandColors && brandColors.length > 0 ? brandColors.join(', ') : 'Brand standard'}.
            Industry: ${designData.industryDetected}.
            Lighting: Cinematic studio lighting, high resolution 8k.`;

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

        // Run image generation in parallel for speed
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
        console.error('Error in generate-exhibition-design API:', error);
        return res.status(500).json({ error: error.message || 'An internal server error occurred.' });
    }
}
