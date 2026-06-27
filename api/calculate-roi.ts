
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
        const apiKey = process.env.API_KEY || process.env.GOOGLE_CLOUD_API_KEY;
        if (!apiKey) throw new Error("API key not configured");
        
        const ai = new GoogleGenAI({ apiKey });

        // Validate input (basic check)
        if (!body.event_name || !body.total_investment) {
             return new Response(JSON.stringify({ error: 'Missing required inputs.' }), { status: 400 });
        }

        const prompt = `
        Act as a Senior Financial Analyst for the Dubai Exhibition Industry.
        Perform a deep-dive ROI simulation for the following client:
        
        **Context:**
        - Event: ${body.event_name} (${body.industry})
        - Duration: ${body.duration_days} days
        - Total Investment: AED ${body.total_investment}
        - Stand Cost: AED ${body.stand_cost}
        - Goals: ${body.visitors_expected} visitors, ${body.leads_expected} leads
        - Sales Data: Avg Deal AED ${body.avg_deal_value}, Close Rate ${body.close_rate_percent}%, Cycle ${body.sales_cycle_months}mo, LTV AED ${body.customer_ltv}

        **Task:**
        Calculate 3 scenarios (Conservative, Realistic, Optimistic) across 4 ROI dimensions:
        1. **Cash ROI:** (Immediate Revenue - Cost) / Cost * 100
        2. **Pipeline ROI:** Weighted value of qualified leads over sales cycle.
        3. **Brand ROI:** Estimated media value of impressions (Assume CPM typical for Dubai events ~AED 150-300).
        4. **Network ROI:** Estimated value of partnerships/strategic meetings.

        **Benchmarks:**
        Compare their metrics (e.g., CPL) to standard averages for the ${body.industry} industry in Dubai.

        **Output:**
        Return ONLY JSON matching this exact schema:
        `;

        const roiMetricsSchema = {
            type: Type.OBJECT,
            properties: {
                net_profit: { type: Type.NUMBER },
                roi_percentage: { type: Type.NUMBER },
                payback_period_months: { type: Type.NUMBER },
                cost_per_lead: { type: Type.NUMBER },
                cost_per_acquisition: { type: Type.NUMBER },
                break_even_deals: { type: Type.NUMBER }
            }
        };

        const roiModelSchema = {
            type: Type.OBJECT,
            properties: {
                cash_roi: roiMetricsSchema,
                pipeline_roi: { type: Type.OBJECT, properties: { projected_value: { type: Type.NUMBER }, ltv_impact: { type: Type.NUMBER } } },
                brand_roi: { type: Type.OBJECT, properties: { impressions: { type: Type.NUMBER }, media_value: { type: Type.NUMBER } } },
                network_roi: { type: Type.OBJECT, properties: { partnership_value: { type: Type.NUMBER } } }
            }
        };

        const scenarioSchema = {
            type: Type.OBJECT,
            properties: {
                label: { type: Type.STRING },
                metrics: roiModelSchema,
                probability: { type: Type.NUMBER }
            }
        };

        const responseSchema = {
            type: Type.OBJECT,
            properties: {
                scenarios: {
                    type: Type.OBJECT,
                    properties: {
                        conservative: scenarioSchema,
                        realistic: scenarioSchema,
                        optimistic: scenarioSchema
                    },
                    required: ['conservative', 'realistic', 'optimistic']
                },
                benchmarks: {
                    type: Type.OBJECT,
                    properties: {
                        industry_avg_cpl: { type: Type.NUMBER },
                        industry_avg_conversion: { type: Type.NUMBER },
                        verdict: { type: Type.STRING, description: "A 1-sentence comparison (e.g., 'Your CPL is 15% lower than average...')." }
                    }
                },
                strategic_advice: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 specific tips to improve ROI for this specific event/industry." }
            },
            required: ['scenarios', 'benchmarks', 'strategic_advice']
        };

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        const result = JSON.parse(response.text.trim());
        return new Response(JSON.stringify(result), { status: 200, headers: { 'Content-Type': 'application/json' } });

    } catch (error: any) {
        console.error('ROI Calculation Error:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
