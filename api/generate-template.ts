import { GoogleGenAI } from "@google/genai";

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
    }

    try {
        const body = await req.json();
        const { templateType, userContext } = body;

        const apiKey = process.env.API_KEY || process.env.GOOGLE_CLOUD_API_KEY;
        if (!apiKey) throw new Error("API key not configured");
        const ai = new GoogleGenAI({ apiKey });

        const prompt = `
        Generate a professional, ready-to-use ${templateType} for an exhibition project.
        
        Context:
        - Industry: ${userContext.industry}
        - Event: ${userContext.eventType}
        - Stand Size: ${userContext.standSize}
        - Location: ${userContext.location}

        The output should be formatted in Markdown, suitable for converting to a clean document.
        Include placeholders like [Date], [Name] where necessary.
        Make it specific to the ${userContext.industry} industry in Dubai/UAE if applicable.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
        });

        return new Response(JSON.stringify({ content: response.text }), { status: 200, headers: { 'Content-Type': 'application/json' } });

    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}