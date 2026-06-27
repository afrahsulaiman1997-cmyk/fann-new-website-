
import { GoogleGenAI, Type } from "@google/genai";

// Switch to Node.js runtime
// export const config = { runtime: 'edge' };

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { image, mimeType } = req.body;
        if (!image || !mimeType) {
            return res.status(400).json({ error: 'Missing image or mimeType' });
        }
        const apiKey = process.env.API_KEY || process.env.GOOGLE_CLOUD_API_KEY;
        if (!apiKey) {
          throw new Error("API key is not configured on the server.");
        }
        const ai = new GoogleGenAI({ apiKey });

        const response = await ai.models.generateContent({
            model: 'gemini-3.5-flash',
            contents: { parts: [
                { inlineData: { mimeType, data: image } },
                { text: "Analyze the attached logo to identify the 3-5 most dominant brand colors and return them as an array of HEX codes." }
            ]},
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        colors: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING,
                                description: 'A color in HEX code format (e.g., "#RRGGBB").'
                            }
                        }
                    },
                    required: ['colors']
                }
            }
        });
        
        const rawText = response.text?.trim();
        if (!rawText) {
             throw new Error("Empty response from color extraction.");
        }

        let result;
        try {
            result = JSON.parse(rawText);
        } catch (e) {
            console.error("Failed to parse model's JSON response for colors:", rawText);
            throw new Error("The model returned an invalid JSON response for color extraction.");
        }

        const colors = result.colors || [];
        // Validate that the returned values are indeed hex codes.
        const validatedColors = colors.filter((c: any) => typeof c === 'string' && /^#([0-9A-F]{3}){1,2}$/i.test(c));
        
        return res.status(200).json({ colors: validatedColors });

    } catch (error: any) {
        console.error('Error in extract-colors API:', error);
        return res.status(500).json({ error: error.message });
    }
}
