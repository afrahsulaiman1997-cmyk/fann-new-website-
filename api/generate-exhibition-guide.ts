import { GoogleGenAI, Type } from "@google/genai";

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
    }

    try {
        const body = await req.json();
        const { 
            industry, 
            eventType, 
            standSize, 
            budget, 
            eventDate,
            location,
            experienceLevel 
        } = body;

        const apiKey = process.env.API_KEY || process.env.GOOGLE_CLOUD_API_KEY;
        if (!apiKey) {
            throw new Error("API key is not configured.");
        }
        const ai = new GoogleGenAI({ apiKey });

        // Calculate days remaining
        const today = new Date();
        const event = new Date(eventDate);
        const diffTime = Math.abs(event.getTime() - today.getTime());
        const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        const isUrgent = daysRemaining < 45;

        const prompt = `
        Act as a veteran Exhibition Project Director in Dubai with 20 years of experience.
        Generate a personalized Exhibition Execution Guide for a client with the following profile:
        
        - **Industry:** ${industry}
        - **Event Type:** ${eventType}
        - **Stand Size:** ${standSize} sqm
        - **Budget:** ${budget}
        - **Location:** ${location}
        - **Experience Level:** ${experienceLevel}
        - **Days Until Event:** ${daysRemaining} days ${isUrgent ? '(CRITICAL TIMELINE)' : ''}

        **Requirements:**
        1. **Phased Timeline:** Break down actions into 4-5 logical phases based on the days remaining. If <30 days, use "Emergency/Express" phases.
        2. **Checklist:** Concrete, actionable items for each phase.
        3. **Compliance:** Specific tips for ${location} (e.g., DWTC regulations, municipality approvals).
        4. **Budget Tips:** How to maximize this specific budget for this stand size.
        5. **Pitfalls:** Common mistakes for ${experienceLevel} exhibitors in the ${industry} sector.

        Output strictly as JSON.
        `;

        const responseSchema = {
            type: Type.OBJECT,
            properties: {
                guideTitle: { type: Type.STRING },
                executiveSummary: { type: Type.STRING, description: "A 2-sentence motivational summary of the strategy." },
                timelineStatus: { type: Type.STRING, enum: ["On Track", "Caution", "Critical"] },
                phases: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            phaseName: { type: Type.STRING },
                            timeframe: { type: Type.STRING, description: "e.g., '3 Months Out' or 'Week 1'" },
                            description: { type: Type.STRING },
                            actions: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        task: { type: Type.STRING },
                                        priority: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
                                        deadline_offset: { type: Type.INTEGER, description: "Days before event" }
                                    }
                                }
                            }
                        }
                    }
                },
                compliance_notes: { type: Type.ARRAY, items: { type: Type.STRING } },
                budget_hacks: { type: Type.ARRAY, items: { type: Type.STRING } },
                common_pitfalls: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ['guideTitle', 'timelineStatus', 'phases', 'compliance_notes', 'budget_hacks', 'common_pitfalls']
        };

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        const guide = JSON.parse(response.text.trim());
        
        // Add computed days for convenience
        return new Response(JSON.stringify({ ...guide, daysRemaining }), { status: 200, headers: { 'Content-Type': 'application/json' } });

    } catch (error: any) {
        console.error('Error generating exhibition guide:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}