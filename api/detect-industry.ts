
import { GoogleGenAI } from "@google/genai";

// Switch to Node.js runtime
// export const config = { runtime: 'edge' };

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { eventName } = req.body;
        if (!eventName) {
             return res.status(200).json({ industry: null });
        }

        const apiKey = process.env.API_KEY || process.env.GOOGLE_CLOUD_API_KEY;
        if (!apiKey) {
            throw new Error("API key is not configured.");
        }
        const ai = new GoogleGenAI({ apiKey });

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: `Identify the primary industry associated with the trade show or event named "${eventName}". Return ONLY a single short string (e.g. "Technology", "Healthcare", "Automotive", "Food & Beverage"). If you are unsure or it's generic, return "General". Do not include punctuation.`,
        });

        const industry = response.text ? response.text.trim() : "General";
        return res.status(200).json({ industry });

    } catch (error: any) {
        console.error('Error detecting industry:', error);
        return res.status(500).json({ error: error.message });
    }
}
