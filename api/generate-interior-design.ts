import { GoogleGenAI, Type } from "@google/genai";

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
    }

    try {
        const config = await req.json();
        const { projectName, clientName, spaceArea, spaceType, style, features } = config;

        if (!projectName || !clientName || !spaceArea || !spaceType || !style) {
            return new Response(JSON.stringify({ error: 'Missing required design parameters.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        const apiKey = process.env.API_KEY || process.env.GOOGLE_CLOUD_API_KEY;
        if (!apiKey) {
            throw new Error("API key is not configured on the server.");
        }
        const ai = new GoogleGenAI({ apiKey });

        // === 1. Generate Text Concept ===
        const textPrompt = `
        You are a world-class interior designer for luxury commercial and residential spaces in Dubai.
        Based on the following client brief, generate a compelling and creative interior design concept.
        - Project Name: "${projectName}" for "${clientName}"
        - Space Area: Approximately ${spaceArea} sqm
        - Space Type: ${spaceType}
        - Desired Style: ${style}
        - Key Features Required: ${features.join(', ') || 'None specified'}

        The concept should be innovative, luxurious, and highly functional, suitable for a high-end property in a location like Downtown Dubai or Palm Jumeirah.
        The "detailedDescription" should be a captivating paragraph (3-4 sentences) describing the space.
        Return a single, valid JSON object with the exact structure defined. Do not include any text, notes, or markdown formatting before or after the JSON.
        `;

        const responseSchema = {
            type: Type.OBJECT,
            properties: {
                conceptName: { type: Type.STRING, description: "A catchy, professional name for the design concept (e.g., 'The Elysian Loft')." },
                detailedDescription: { type: Type.STRING, description: "A detailed paragraph describing the interior's aesthetic, material palette, and overall ambiance." },
                materials: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of 3-4 key materials (e.g., 'Italian Calacatta marble', 'Smoked oak wood flooring')." },
                lighting: { type: Type.STRING, description: "A brief description of the lighting strategy (e.g., 'Concealed LED cove lighting with statement pendant fixtures')." },
                furnitureStyle: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of 2-3 descriptors for the furniture style (e.g., 'Bespoke contemporary pieces', 'Minimalist forms', 'Plush, textured upholstery')." },
            },
            required: ['conceptName', 'detailedDescription', 'materials', 'lighting', 'furnitureStyle']
        };

        const textResponse = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: textPrompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        const designConcept = JSON.parse(textResponse.text.trim());

        // === 2. Generate Image (Using gemini-3-pro-image-preview / Nano Banana Pro) ===
        const imagePrompt = `Photorealistic, award-winning 3D interior render of a "${spaceType}" with a "${style}" design.
        The concept is named "${designConcept.conceptName}" and is described as: "${designConcept.detailedDescription}".
        Key features visible should include: ${features.join(', ')}.
        The design prominently uses these materials: ${designConcept.materials.join(', ')}.
        The lighting is ${designConcept.lighting}.
        The furniture is characterized by: ${designConcept.furnitureStyle.join(', ')}.
        The overall atmosphere is professional, luxurious, and highly functional. High-quality, detailed rendering.`;
        
        // Fix: Cast the entire object to any to bypass type checking for imageConfig/imageSize
        const imageResponse = await ai.models.generateContent({
            model: 'gemini-3.1-flash-image',
            contents: {
                parts: [{ text: imagePrompt }],
            },
            config: {
                imageConfig: {
                    aspectRatio: "16:9",
                    imageSize: "1K"
                }
            }
        } as any);
        
        let image = null;
        if (imageResponse.candidates?.[0]?.content?.parts) {
            for (const part of imageResponse.candidates[0].content.parts) {
                if (part.inlineData) {
                    image = part.inlineData.data;
                    break;
                }
            }
        }

        if (!image) {
            throw new Error("Failed to generate image.");
        }

        // === 3. Respond ===
        return new Response(JSON.stringify({ designConcept, image }), { status: 200, headers: { 'Content-Type': 'application/json' } });

    } catch (error: any) {
        console.error('Error in generate-interior-design API:', error);
        return new Response(JSON.stringify({ error: error.message || 'An internal server error occurred.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}