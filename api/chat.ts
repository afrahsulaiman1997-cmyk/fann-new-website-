import { GoogleGenAI } from "@google/genai";

export const config = {
  runtime: 'edge',
};

interface ChatMessage {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    const { history } = await req.json();
    if (!history || !Array.isArray(history) || history.length === 0) {
      return new Response(JSON.stringify({ error: 'History is required.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const apiKey = process.env.API_KEY || process.env.GOOGLE_CLOUD_API_KEY;
    if (!apiKey) {
      throw new Error("API key is not configured on the server.");
    }
    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = "You are the FANN Assistant, a helpful virtual assistant for FANN, a world-class exhibition, events, and interior design company in Dubai. Be friendly, professional, and helpful. If asked about recent news, trends, or specific facts you don't know, use the provided search tool to find up-to-date information. Always cite your sources if you use the search tool. Keep responses concise and well-formatted using markdown.";

    const contents: ChatMessage[] = history.map((msg: any) => ({
        role: msg.role,
        parts: msg.parts
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: { 
        systemInstruction: systemInstruction,
        tools: [{ googleSearch: {} }] 
      },
    });

    const content = response.text;
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
    const sources = groundingChunks
      .map(chunk => chunk.web)
      .filter(source => source && source.uri);

    return new Response(JSON.stringify({ content, sources }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error: any) {
    console.error('Error in chat API:', error);
    return new Response(JSON.stringify({ error: error.message || 'An internal server error occurred.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}