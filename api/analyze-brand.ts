
import { GoogleGenAI, Type } from "@google/genai";

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
    }

    try {
        const { logo, mimeType, websiteUrl } = await req.json();

        const apiKey = process.env.API_KEY || process.env.GOOGLE_CLOUD_API_KEY;
        if (!apiKey) throw new Error("API key not configured");
        
        const ai = new GoogleGenAI({ apiKey });

        const prompt = `
        Analyze the provided logo image and the website URL "${websiteUrl}".
        1. Identify the primary Industry.
        2. Extract 3-5 dominant brand HEX colors from the logo.
        3. Describe the brand "Vibe" in 3 adjectives (e.g. Modern, Trustworthy, Playful).
        
        Return JSON.
        `;

        const responseSchema = {
            type: Type.OBJECT,
            properties: {
                industry: { type: Type.STRING },
                colors: { type: Type.ARRAY, items: { type: Type.STRING } },
                vibe: { type: Type.STRING }
            },
            required: ['industry', 'colors', 'vibe']
        };

        const parts = [];
        if (logo && mimeType) {
            parts.push({ inlineData: { mimeType, data: logo } });
        }
        parts.push({ text: prompt });

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: { parts },
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                // Tools not needed for simple image analysis, but helpful if URL scraping required. 
                // For speed on Vercel Edge, avoiding tools unless necessary.
            },
        });

        return new Response(response.text, { status: 200, headers: { 'Content-Type': 'application/json' } });

    } catch (error: any) {
        console.error('Error in analyze-brand:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
