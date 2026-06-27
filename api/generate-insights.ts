import { GoogleGenAI } from "@google/genai";

// This is a Vercel Serverless Function (Node.js runtime).
// It has a longer timeout than Edge Functions, suitable for API calls that may take more time.
export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { prompt } = req.body;
        if (!prompt) {
             return res.status(400).json({ error: 'Prompt is required.' });
        }
        
        const apiKey = process.env.API_KEY || process.env.GOOGLE_CLOUD_API_KEY;
        if (!apiKey) {
          throw new Error("API key is not configured on the server. Please set either API_KEY or GOOGLE_CLOUD_API_KEY in your Vercel environment variables.");
        }
        const ai = new GoogleGenAI({ apiKey });

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
            config: { tools: [{ googleSearch: {} }] },
        });

        const content = response.text;
        const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map(chunk => chunk.web) || [];
        const filteredSources = sources.filter(source => source && source.uri);

        return res.status(200).json({ content, sources: filteredSources });

    } catch (error: any) {
        console.error('Error in generate-insights API:', error);
        return res.status(500).json({ error: error.message || 'An internal server error occurred.' });
    }
}