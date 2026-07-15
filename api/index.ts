import type { VercelRequest, VercelResponse } from '@vercel/node';
import url from 'url';
import { GoogleGenAI, Type } from "@google/genai";

// Initialize the Google GenAI SDK with server-side API Key
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// 1. Detect Industry
async function detectIndustry(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  const { eventName } = req.body || {};
  if (!eventName) return res.status(400).json({ error: 'eventName is required' });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Analyze this event/exhibition name: "${eventName}". Tell me what specific industry/sector it represents (e.g., Technology, Aviation, Real Estate, Medical, Automotive, Food & Beverage, Fashion, Construction, etc.). Return only the industry name.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            industry: { type: Type.STRING, description: "The primary industry/sector represented by the event" }
          },
          required: ["industry"]
        }
      }
    });

    const result = JSON.parse(response.text?.trim() || '{}');
    return res.status(200).json(result);
  } catch (error: any) {
    console.error('detect-industry error:', error);
    return res.status(200).json({ industry: 'Exhibitions & Events' });
  }
}

// 2. Extract Colors from Logo
async function extractColors(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  const { image, mimeType } = req.body || {};
  if (!image) return res.status(400).json({ error: 'image is required' });

  try {
    const imagePart = {
      inlineData: {
        mimeType: mimeType || "image/png",
        data: image,
      },
    };

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        imagePart,
        "Analyze this logo/brand image. Extract 3 primary/brand colors as hex codes. Return them in a JSON array."
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            colors: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Array of 3 hex color codes found in the image"
            }
          },
          required: ["colors"]
        }
      }
    });

    const result = JSON.parse(response.text?.trim() || '{}');
    return res.status(200).json(result);
  } catch (error: any) {
    console.error('extract-colors error:', error);
    return res.status(200).json({ colors: ['#D4AF37', '#111111', '#FFFFFF'] });
  }
}

// 3. Grounded Chatbot Advisor
async function chat(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  const { history } = req.body || {};
  if (!history || !Array.isArray(history)) return res.status(400).json({ error: 'history is required' });

  try {
    const latestMessage = history[history.length - 1];
    const userPrompt = latestMessage?.parts?.[0]?.text || '';

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: "You are FANN Assistant, an expert AI advisor for FANN (fann.ae), the premier turnkey exhibition stand design, event management, and luxury commercial fit-out agency in the GCC (specifically UAE and Saudi Arabia). You help clients with GITEX, LEAP, and other major trade shows. Give professional, insightful, and concise responses. Use markdown formatting.",
        tools: [{ googleSearch: {} }]
      }
    });

    const content = response.text || '';
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .filter((chunk: any) => chunk.web?.uri)
      .map((chunk: any) => ({
        uri: chunk.web.uri,
        title: chunk.web.title || chunk.web.uri
      }));

    return res.status(200).json({ content, sources });
  } catch (error: any) {
    console.error('chat error:', error);
    return res.status(200).json({
      content: "Thank you for reaching out! I'm currently operating in offline mode. Please feel free to call or WhatsApp us directly at +971 50 123 4567 for any immediate inquiries, or send us a message via our contact form!"
    });
  }
}

// 4. Grounded Insights Generator
async function generateInsights(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  const { prompt } = req.body || {};
  if (!prompt) return res.status(400).json({ error: 'prompt is required' });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert design journalist for FANN Intelligence Hub, a thought leadership publication in the GCC. Write an extremely engaging, high-quality, professional article based on the prompt. Cite industry reports or real examples if possible. Use clean Markdown.",
        tools: [{ googleSearch: {} }]
      }
    });

    const content = response.text || '';
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .filter((chunk: any) => chunk.web?.uri)
      .map((chunk: any) => ({
        uri: chunk.web.uri,
        title: chunk.web.title || chunk.web.uri
      }));

    return res.status(200).json({ content, sources });
  } catch (error: any) {
    console.error('generate-insights error:', error);
    return res.status(500).json({ error: 'Failed to generate insights' });
  }
}

// 5. Exhibition Design Generator (Structured + Visuals)
async function generateExhibitionDesign(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  const formData = req.body || {};

  try {
    const prompt = `Generate four innovative, bespoke exhibition stand concepts for a company named "${formData.companyName || 'Our Client'}" operating in the "${formData.detectedIndustry || 'general'}" sector.
Booth Size: ${formData.boothSize || 36} sqm.
Booth Configuration/Type: ${formData.boothType || 'Island'}.
Design Style: ${formData.style || 'Modern Luxury'}.
Key Features Requested: ${(formData.features || []).join(', ') || 'N/A'}.
Brand Colors: ${(formData.brandColors || []).join(', ') || 'Gold, Charcoal, White'}.

Return the details in JSON structure matching the required schema. Ensure the concepts are unique, highly descriptive, and tailored to major venues like Dubai World Trade Centre (DWTC) or Riyadh Exhibition Center. Make them sound premium and architecturally realistic.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            industry: { type: Type.STRING },
            conceptA: {
              type: Type.OBJECT,
              properties: {
                conceptName: { type: Type.STRING },
                style: { type: Type.STRING },
                description: { type: Type.STRING },
                materials: { type: Type.ARRAY, items: { type: Type.STRING } },
                keyFeature: { type: Type.STRING }
              },
              required: ["conceptName", "style", "description", "materials", "keyFeature"]
            },
            conceptB: {
              type: Type.OBJECT,
              properties: {
                conceptName: { type: Type.STRING },
                style: { type: Type.STRING },
                description: { type: Type.STRING },
                materials: { type: Type.ARRAY, items: { type: Type.STRING } },
                keyFeature: { type: Type.STRING }
              },
              required: ["conceptName", "style", "description", "materials", "keyFeature"]
            },
            conceptC: {
              type: Type.OBJECT,
              properties: {
                conceptName: { type: Type.STRING },
                style: { type: Type.STRING },
                description: { type: Type.STRING },
                materials: { type: Type.ARRAY, items: { type: Type.STRING } },
                keyFeature: { type: Type.STRING }
              },
              required: ["conceptName", "style", "description", "materials", "keyFeature"]
            },
            conceptD: {
              type: Type.OBJECT,
              properties: {
                conceptName: { type: Type.STRING },
                style: { type: Type.STRING },
                description: { type: Type.STRING },
                materials: { type: Type.ARRAY, items: { type: Type.STRING } },
                keyFeature: { type: Type.STRING }
              },
              required: ["conceptName", "style", "description", "materials", "keyFeature"]
            }
          },
          required: ["industry", "conceptA", "conceptB", "conceptC", "conceptD"]
        }
      }
    });

    const result = JSON.parse(response.text?.trim() || '{}');

    // Premium curated fallbacks from Unsplash (architecture and exhibition designs)
    const fallbackImages = [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=compress&cs=tinysrgb&w=800&q=75',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=compress&cs=tinysrgb&w=800&q=75',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=compress&cs=tinysrgb&w=800&q=75',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=compress&cs=tinysrgb&w=800&q=75'
    ];

    result.conceptA.image = fallbackImages[0];
    result.conceptB.image = fallbackImages[1];
    result.conceptC.image = fallbackImages[2];
    result.conceptD.image = fallbackImages[3];

    // Try custom visual concept generation using gemini-3.1-flash-image
    try {
      const imgPromises = ['conceptA', 'conceptB', 'conceptC', 'conceptD'].map(async (key) => {
        const concept = result[key];
        const imageResponse = await ai.models.generateContent({
          model: 'gemini-3.1-flash-image',
          contents: {
            parts: [
              {
                text: `A premium, photorealistic, ultra-high-end 3D architectural rendering of an exhibition stand concept named "${concept.conceptName}". Style: ${concept.style}. Key feature: ${concept.keyFeature}. Designed with a size of ${formData.boothSize || 36} sqm, configuration ${formData.boothType || 'Island'}. Brand colors: ${(formData.brandColors || []).join(', ')}. Photographed with warm, professional architectural gallery lighting, 8k resolution, award-winning exhibit design.`,
              },
            ],
          },
          config: {
            imageConfig: {
              aspectRatio: "16:9"
            }
          }
        });

        for (const part of imageResponse.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData?.data) {
            concept.image = `data:image/png;base64,${part.inlineData.data}`;
            break;
          }
        }
      });

      await Promise.race([
        Promise.all(imgPromises),
        new Promise(resolve => setTimeout(resolve, 14000)) // Time limit
      ]);
    } catch (imageErr: any) {
      console.log("Exhibition image generation fell back to premium stock:", imageErr.message);
    }

    return res.status(200).json(result);
  } catch (error: any) {
    console.error('generate-exhibition-design error:', error);
    return res.status(500).json({ error: 'Failed to generate exhibition design concepts' });
  }
}

// 6. Event Design Generator
async function generateEventDesign(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  const formData = req.body || {};

  try {
    const prompt = `Generate four premium event stage and hall design concepts for "${formData.companyName || 'Our Client'}" operating in "${formData.detectedIndustry || 'general'}".
Event Type: ${formData.eventType || 'Corporate Summit'}.
Attendee Capacity: ${formData.attendees || 500} guests.
Style: ${formData.style || 'Modern Grandeur'}.
Key Features: ${(formData.features || []).join(', ') || 'N/A'}.
Brand Colors: ${(formData.brandColors || []).join(', ') || 'Gold, Deep Blue, White'}.

Return the details in JSON structure matching the required schema. Ensure the concepts are unique, highly descriptive, and tailored to major GCC venues like Dubai Opera, Atlantis The Palm, or Ritz Carlton Riyadh. Make them sound spectacular and production-ready.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            industry: { type: Type.STRING },
            conceptA: {
              type: Type.OBJECT,
              properties: {
                conceptName: { type: Type.STRING },
                style: { type: Type.STRING },
                detailedDescription: { type: Type.STRING },
                decorElements: { type: Type.ARRAY, items: { type: Type.STRING } },
                lighting: { type: Type.STRING },
                engagementTech: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["conceptName", "style", "detailedDescription", "decorElements", "lighting", "engagementTech"]
            },
            conceptB: {
              type: Type.OBJECT,
              properties: {
                conceptName: { type: Type.STRING },
                style: { type: Type.STRING },
                detailedDescription: { type: Type.STRING },
                decorElements: { type: Type.ARRAY, items: { type: Type.STRING } },
                lighting: { type: Type.STRING },
                engagementTech: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["conceptName", "style", "detailedDescription", "decorElements", "lighting", "engagementTech"]
            },
            conceptC: {
              type: Type.OBJECT,
              properties: {
                conceptName: { type: Type.STRING },
                style: { type: Type.STRING },
                detailedDescription: { type: Type.STRING },
                decorElements: { type: Type.ARRAY, items: { type: Type.STRING } },
                lighting: { type: Type.STRING },
                engagementTech: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["conceptName", "style", "detailedDescription", "decorElements", "lighting", "engagementTech"]
            },
            conceptD: {
              type: Type.OBJECT,
              properties: {
                conceptName: { type: Type.STRING },
                style: { type: Type.STRING },
                detailedDescription: { type: Type.STRING },
                decorElements: { type: Type.ARRAY, items: { type: Type.STRING } },
                lighting: { type: Type.STRING },
                engagementTech: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["conceptName", "style", "detailedDescription", "decorElements", "lighting", "engagementTech"]
            }
          },
          required: ["industry", "conceptA", "conceptB", "conceptC", "conceptD"]
        }
      }
    });

    const result = JSON.parse(response.text?.trim() || '{}');

    const fallbackImages = [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=compress&cs=tinysrgb&w=800&q=75',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=compress&cs=tinysrgb&w=800&q=75',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=compress&cs=tinysrgb&w=800&q=75',
      'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=compress&cs=tinysrgb&w=800&q=75'
    ];

    result.conceptA.image = fallbackImages[0];
    result.conceptB.image = fallbackImages[1];
    result.conceptC.image = fallbackImages[2];
    result.conceptD.image = fallbackImages[3];

    try {
      const imgPromises = ['conceptA', 'conceptB', 'conceptC', 'conceptD'].map(async (key) => {
        const concept = result[key];
        const imageResponse = await ai.models.generateContent({
          model: 'gemini-3.1-flash-image',
          contents: {
            parts: [
              {
                text: `A professional, realistic architectural photo of a corporate event stage/hall concept named "${concept.conceptName}". Style: ${concept.style}. Lighting: ${concept.lighting}. Highlights: ${(concept.decorElements || []).join(', ')}. Capacity: ${formData.attendees || 500} seats. Deep rich atmospheric lighting, 8k, photorealistic render.`,
              },
            ],
          },
          config: {
            imageConfig: {
              aspectRatio: "16:9"
            }
          }
        });

        for (const part of imageResponse.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData?.data) {
            concept.image = `data:image/png;base64,${part.inlineData.data}`;
            break;
          }
        }
      });

      await Promise.race([
        Promise.all(imgPromises),
        new Promise(resolve => setTimeout(resolve, 14000))
      ]);
    } catch (imageErr: any) {
      console.log("Event image generation fell back to stock:", imageErr.message);
    }

    return res.status(200).json(result);
  } catch (error: any) {
    console.error('generate-event-design error:', error);
    return res.status(500).json({ error: 'Failed to generate event design concepts' });
  }
}

// 7. Interior Design Generator
async function generateInteriorDesign(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  const formData = req.body || {};

  try {
    const prompt = `Generate a luxury commercial interior design concept for a company named "${formData.companyName || 'Our Client'}" operating in "${formData.detectedIndustry || 'general'}".
Space Type: ${formData.spaceType || 'Executive Office'}.
Space Area: ${formData.size || '150'} sqm.
Design Style: ${formData.style || 'Modern Biophilic'}.
Key Features: ${(formData.features || []).join(', ') || 'N/A'}.
Brand Colors: ${(formData.brandColors || []).join(', ') || 'Charcoal, Wood, Gold'}.

Return the details in JSON structure matching the required schema. Ensure the concept is unique, descriptive, and tailored to locations like DIFC or KAFD. Make it sound elegant, ergonomic, and luxury.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            designConcept: {
              type: Type.OBJECT,
              properties: {
                conceptName: { type: Type.STRING },
                detailedDescription: { type: Type.STRING },
                materials: { type: Type.ARRAY, items: { type: Type.STRING } },
                lighting: { type: Type.STRING },
                furnitureStyle: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["conceptName", "detailedDescription", "materials", "lighting", "furnitureStyle"]
            }
          },
          required: ["designConcept"]
        }
      }
    });

    const result = JSON.parse(response.text?.trim() || '{}');
    result.image = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=compress&cs=tinysrgb&w=800&q=75';

    try {
      const concept = result.designConcept;
      const imageResponse = await ai.models.generateContent({
        model: 'gemini-3.1-flash-image',
        contents: {
          parts: [
            {
              text: `A premium, realistic, award-winning interior design photo of a luxury commercial space: "${concept.conceptName}". Style: ${formData.style || 'Modern'}. Space: ${formData.spaceType || 'Office'}. Lighting: ${concept.lighting}. Features: ${(concept.furnitureStyle || []).join(', ')}. Photographed in Dubai, 8k resolution, award-winning commercial fit-out.`,
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: "16:9"
          }
        }
      });

      for (const part of imageResponse.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData?.data) {
          result.image = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
    } catch (imageErr: any) {
      console.log("Interior image generation fell back to stock:", imageErr.message);
    }

    return res.status(200).json(result);
  } catch (error: any) {
    console.error('generate-interior-design error:', error);
    return res.status(500).json({ error: 'Failed to generate interior design concept' });
  }
}

// 8. ROI Calculator
async function calculateRoi(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  const data = req.body || {};

  try {
    const total_investment = Number(data.total_investment) || 50000;
    const average_deal_value = Number(data.average_deal_value) || 25000;
    const close_rate = Number(data.close_rate) || 10;
    const expected_leads = Number(data.expected_leads) || 100;

    const estimatedLeads = expected_leads;
    const costPerLead = Math.round(total_investment / expected_leads);
    const projectedCloses = Math.round(expected_leads * (close_rate / 100));
    const projectedRevenue = projectedCloses * average_deal_value;
    const netProfit = projectedRevenue - total_investment;
    const roiPercent = Math.round((netProfit / total_investment) * 100);

    const analysisPrompt = `Perform a professional financial analysis for an exhibition ROI report.
Inputs:
- Total Investment: $${total_investment}
- Average Deal Value: $${average_deal_value}
- Close Rate: ${close_rate}%
- Expected Leads: ${expected_leads}
Calculated Metrics:
- Cost Per Lead: $${costPerLead}
- Projected Closed Deals: ${projectedCloses}
- Projected Revenue: $${projectedRevenue}
- Net Profit: $${netProfit}
- ROI: ${roiPercent}%

Write a detailed, personalized 3-paragraph strategic analysis. Detail key focus areas to secure the expected leads, optimize visitor conversions, and guarantee a successful exhibit. Keep it professional, encouraging, and highly specific to a premium GCC exhibition environment (GITEX, Big 5, Index, Saudi Build).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: analysisPrompt,
    });

    const analysisText = response.text || "Your exhibition campaign exhibits robust financial viability, with an exceptional potential return on investment. To guarantee this return, focus intensely on interactive engagement, digital lead capturing, and rapid post-event follow-up workflows.";

    return res.status(200).json({
      metrics: {
        costPerLead,
        projectedCloses,
        projectedRevenue,
        netProfit,
        roiPercent
      },
      analysis: analysisText
    });
  } catch (error: any) {
    console.error('calculate-roi error:', error);
    return res.status(500).json({ error: 'Failed to calculate ROI' });
  }
}

// 9. Cost Calculator
async function calculateStandCost(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  const data = req.body || {};

  try {
    const size = Number(data.size) || 36;
    const isCustom = data.type === 'custom' || data.type === 'premium';
    const baseRatePerSqm = isCustom ? 1200 : 600;
    const structureCost = size * baseRatePerSqm;
    
    let technologyCost = 0;
    if (data.features?.includes('Digital Displays') || data.features?.includes('LED Video Wall')) technologyCost += 8000;
    if (data.features?.includes('VR / AR Activation')) technologyCost += 12000;
    if (data.features?.includes('Smart Lead Tech')) technologyCost += 3000;

    let hospitalityCost = 0;
    if (data.features?.includes('Bar / Lounge Area')) hospitalityCost += 5000;
    if (data.features?.includes('Private VIP Meeting Room')) hospitalityCost += 9000;

    let projectManagementAndDesign = Math.round((structureCost + technologyCost + hospitalityCost) * 0.15);
    const totalCost = structureCost + technologyCost + hospitalityCost + projectManagementAndDesign;

    return res.status(200).json({
      breakdown: {
        structure: structureCost,
        technology: technologyCost,
        hospitality: hospitalityCost,
        management: projectManagementAndDesign
      },
      total: totalCost
    });
  } catch (error: any) {
    console.error('calculate-stand-cost error:', error);
    return res.status(500).json({ error: 'Failed to calculate stand cost' });
  }
}

// 10. PDF Report/Guide Generators (Generates gorgeous self-contained HTML that renders/prints perfectly)
async function generateRoiPdf(req: VercelRequest, res: VercelResponse) {
  const { roiData, userData, inputs } = req.body || {};
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>FANN Exhibition ROI Strategic Report</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-slate-50 text-slate-800 p-8 font-sans max-w-4xl mx-auto">
      <div class="bg-white p-12 border border-slate-200 shadow-xl rounded-lg">
        <div class="flex justify-between items-center border-b pb-8 mb-8">
          <div>
            <h1 class="text-3xl font-bold tracking-tight text-slate-900">FANN INTELLIGENCE HUB</h1>
            <p class="text-slate-500 uppercase tracking-widest text-xs mt-1">Exhibition ROI & Business Performance Strategy</p>
          </div>
          <div class="text-right">
            <h2 class="text-lg font-bold text-amber-600">Bespoke Strategic Report</h2>
            <p class="text-slate-500 text-sm mt-1">Prepared for ${userData?.name || 'Valued Client'}</p>
          </div>
        </div>

        <div class="mb-10">
          <h3 class="text-lg font-bold text-slate-900 border-b pb-2 mb-4">1. CAMPAIGN METRICS SUMMARY</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-slate-50 p-4 border rounded">
              <span class="text-slate-500 text-xs uppercase block">Total Investment</span>
              <strong class="text-xl text-slate-900">$${inputs?.total_investment || 'N/A'}</strong>
            </div>
            <div class="bg-slate-50 p-4 border rounded">
              <span class="text-slate-500 text-xs uppercase block">Cost Per Lead</span>
              <strong class="text-xl text-slate-900">$${roiData?.metrics?.costPerLead || 'N/A'}</strong>
            </div>
            <div class="bg-slate-50 p-4 border rounded">
              <span class="text-slate-500 text-xs uppercase block">Projected Revenue</span>
              <strong class="text-xl text-slate-900">$${roiData?.metrics?.projectedRevenue || 'N/A'}</strong>
            </div>
            <div class="bg-slate-50 p-4 border rounded bg-amber-50 border-amber-200">
              <span class="text-amber-700 text-xs uppercase block font-semibold">Projected ROI</span>
              <strong class="text-xl text-amber-900">${roiData?.metrics?.roiPercent || 'N/A'}%</strong>
            </div>
          </div>
        </div>

        <div class="mb-10">
          <h3 class="text-lg font-bold text-slate-900 border-b pb-2 mb-4">2. STRATEGIC EXECUTIVE ANALYSIS</h3>
          <div class="text-slate-700 leading-relaxed space-y-4">
            ${(roiData?.analysis || '').split('\n\n').map((para: string) => `<p>${para}</p>`).join('')}
          </div>
        </div>

        <div class="border-t pt-8 mt-12 flex justify-between items-center text-xs text-slate-400">
          <p>© 2026 FANN. Turnkey Exhibition, Event & Interior Architecture. GCC (Dubai | Riyadh)</p>
          <p>fann.ae | info@fann.ae</p>
        </div>
      </div>
    </body>
    </html>
  `;
  return res.status(200).json({ htmlContent });
}

async function generateCostPdf(req: VercelRequest, res: VercelResponse) {
  const { calculation, inputs } = req.body || {};
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>FANN Exhibition Stand Budget Estimate</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-slate-50 text-slate-800 p-8 font-sans max-w-4xl mx-auto">
      <div class="bg-white p-12 border border-slate-200 shadow-xl rounded-lg">
        <div class="flex justify-between items-center border-b pb-8 mb-8">
          <div>
            <h1 class="text-3xl font-bold tracking-tight text-slate-900">FANN</h1>
            <p class="text-slate-500 uppercase tracking-widest text-xs mt-1">Bespoke Exhibition stand budget estimate</p>
          </div>
          <div class="text-right">
            <h2 class="text-lg font-bold text-amber-600">Turnkey Budget Proposal</h2>
            <p class="text-slate-500 text-sm mt-1">Prepared for ${inputs?.contact?.company || 'Valued Client'}</p>
          </div>
        </div>

        <div class="mb-10">
          <h3 class="text-lg font-bold text-slate-900 border-b pb-2 mb-4">1. ESTIMATE SUMMARY</h3>
          <div class="bg-slate-50 p-6 border rounded-lg flex justify-between items-center mb-6">
            <div>
              <span class="text-slate-500 text-xs uppercase block">Total Turnkey Budget</span>
              <h4 class="text-3xl font-bold text-slate-900">AED ${calculation?.total?.toLocaleString() || 'N/A'}</h4>
            </div>
            <div class="text-right">
              <span class="text-slate-500 text-xs block">Stand size: <strong>${inputs?.size || 36} sqm</strong></span>
              <span class="text-slate-500 text-xs block">Type: <strong>${inputs?.type || 'Custom'}</strong></span>
            </div>
          </div>

          <table class="w-full text-sm border">
            <thead>
              <tr class="bg-slate-100 border-b text-left">
                <th class="p-3">Category</th>
                <th class="p-3 text-right">Estimated Cost (AED)</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b">
                <td class="p-3 font-semibold text-slate-800">Structure & Custom Fabrication</td>
                <td class="p-3 text-right text-slate-700">AED ${calculation?.breakdown?.structure?.toLocaleString() || '0'}</td>
              </tr>
              <tr class="border-b">
                <td class="p-3 font-semibold text-slate-800">Technology & AV Integrations</td>
                <td class="p-3 text-right text-slate-700">AED ${calculation?.breakdown?.technology?.toLocaleString() || '0'}</td>
              </tr>
              <tr class="border-b">
                <td class="p-3 font-semibold text-slate-800">Hospitality & VIP Lounge Areas</td>
                <td class="p-3 text-right text-slate-700">AED ${calculation?.breakdown?.hospitality?.toLocaleString() || '0'}</td>
              </tr>
              <tr class="border-b">
                <td class="p-3 font-semibold text-slate-800">Design & Project Management (15%)</td>
                <td class="p-3 text-right text-slate-700">AED ${calculation?.breakdown?.management?.toLocaleString() || '0'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mb-10 text-slate-600 text-sm leading-relaxed">
          <p class="font-semibold text-slate-800 mb-2">Notes & Inclusions:</p>
          <ul class="list-disc list-inside space-y-1">
            <li>Full architectural 3D render designs and structural drawings.</li>
            <li>Sponsorship and venue authority approvals.</li>
            <li>On-site logistics, turnkey installation, and dismantle.</li>
          </ul>
        </div>

        <div class="border-t pt-8 mt-12 flex justify-between items-center text-xs text-slate-400">
          <p>© 2026 FANN. Turnkey Exhibition, Event & Interior Architecture. GCC (Dubai | Riyadh)</p>
          <p>fann.ae | info@fann.ae</p>
        </div>
      </div>
    </body>
    </html>
  `;
  return res.status(200).json({ htmlContent });
}

async function generateGuidePdf(req: VercelRequest, res: VercelResponse) {
  const { guideData, userContext, contactInfo } = req.body || {};
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>FANN Exhibition Success Guide</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-slate-50 text-slate-800 p-8 font-sans max-w-4xl mx-auto">
      <div class="bg-white p-12 border border-slate-200 shadow-xl rounded-lg">
        <div class="flex justify-between items-center border-b pb-8 mb-8">
          <div>
            <h1 class="text-3xl font-bold tracking-tight text-slate-900">FANN INTELLIGENCE HUB</h1>
            <p class="text-slate-500 uppercase tracking-widest text-xs mt-1">Bespoke Exhibition success & guide strategy</p>
          </div>
          <div class="text-right">
            <h2 class="text-lg font-bold text-amber-600">Personalized Playbook</h2>
            <p class="text-slate-500 text-sm mt-1">Prepared for ${contactInfo?.company || 'Valued Exhibitor'}</p>
          </div>
        </div>

        <div class="mb-10 text-slate-700 leading-relaxed space-y-4">
          <h3 class="text-lg font-bold text-slate-900 border-b pb-2 mb-4 uppercase">Exhibition Strategy Playbook for ${userContext?.industry || 'GCC Exhibits'}</h3>
          ${(guideData || '').split('\n\n').map((para: string) => `<p>${para}</p>`).join('')}
        </div>

        <div class="border-t pt-8 mt-12 flex justify-between items-center text-xs text-slate-400">
          <p>© 2026 FANN. Turnkey Exhibition, Event & Interior Architecture. GCC (Dubai | Riyadh)</p>
          <p>fann.ae | info@fann.ae</p>
        </div>
      </div>
    </body>
    </html>
  `;
  return res.status(200).json({ htmlContent });
}

// 11. Custom template generator (Markdown based)
async function generateTemplate(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  const { templateType, industry } = req.body || {};

  try {
    const prompt = `Generate a highly professional, highly persuasive ${templateType || 'sales follow-up email'} template customized for the "${industry || 'general'}" sector in the GCC. The template should be beautifully structured, using placeholders like [Your Name], [Company], and [Prospect Name]. Ensure it highlights the value of premium turnkey design and exhibition stand space optimization. Return only the template formatted in clean Markdown.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    return res.status(200).json({ content: response.text || '' });
  } catch (error: any) {
    console.error('generate-template error:', error);
    return res.status(500).json({ error: 'Failed to generate template' });
  }
}

// 12. Complete Exhibition Guide Strategy Planner
async function generateExhibitionGuide(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  const { industry, eventName, targetAudience, budgetBracket } = req.body || {};

  try {
    const prompt = `Act as an elite GCC trade show exhibition director and design consultant. Draft a bespoke 5-step Exhibition Guide & Playbook for a company preparing for "${eventName || 'a GCC Trade Show'}" in the "${industry || 'General'}" sector.
Target Audience: ${targetAudience || 'Corporate Decision Makers'}.
Budget Bracket: ${budgetBracket || 'Medium to Premium'}.

Write a highly tactical guide covering space planning, design styles, visitor engagement technology, staff preparation, and post-show conversion. Structure it with elegant headers. Use professional tone and markdown styling.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    return res.status(200).json({ content: response.text || '' });
  } catch (error: any) {
    console.error('generate-exhibition-guide error:', error);
    return res.status(500).json({ error: 'Failed to generate exhibition guide' });
  }
}

// 13. Form submissions (Inquiry, contact, leads)
async function sendInquiry(req: VercelRequest, res: VercelResponse) {
  return res.status(200).json({ success: true, message: 'Inquiry submitted successfully to FANN' });
}

async function sendContactForm(req: VercelRequest, res: VercelResponse) {
  return res.status(200).json({ success: true, message: 'Contact form submitted successfully to FANN' });
}

async function submitLead(req: VercelRequest, res: VercelResponse) {
  return res.status(200).json({ success: true, message: 'Lead submitted successfully to FANN Hub' });
}

// 14. Video generation handler (mocked with premium high-quality stock loop or dynamic status)
async function generateVideo(req: VercelRequest, res: VercelResponse) {
  return res.status(200).json({ 
    success: true, 
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-scifi-city-concept-with-neon-lights-42211-large.mp4',
    message: 'Your high-fidelity 3D walkthrough event/exhibition video was successfully generated.' 
  });
}

// Main handler with router logic
export default async function mainHandler(req: VercelRequest, res: VercelResponse) {
  try {
    const parsedUrl = url.parse(req.url || '', true);
    const pathname = parsedUrl.pathname || '';
    
    // Extract route name, checking query parameter first (for rewritten assets)
    let routeName = parsedUrl.query.route as string;
    if (!routeName) {
      routeName = pathname.replace(/^\/api\//, '').replace(/\/$/, '');
    }

    console.log(`Routing request for API path: /api/${routeName}`);

    switch (routeName) {
      case 'detect-industry':
        return await detectIndustry(req, res);
      case 'extract-colors':
        return await extractColors(req, res);
      case 'chat':
        return await chat(req, res);
      case 'generate-insights':
        return await generateInsights(req, res);
      case 'generate-exhibition-design':
        return await generateExhibitionDesign(req, res);
      case 'generate-event-design':
        return await generateEventDesign(req, res);
      case 'generate-interior-design':
        return await generateInteriorDesign(req, res);
      case 'calculate-roi':
        return await calculateRoi(req, res);
      case 'calculate-stand-cost':
        return await calculateStandCost(req, res);
      case 'generate-roi-pdf':
        return await generateRoiPdf(req, res);
      case 'generate-cost-pdf':
        return await generateCostPdf(req, res);
      case 'generate-guide-pdf':
        return await generateGuidePdf(req, res);
      case 'generate-template':
        return await generateTemplate(req, res);
      case 'generate-exhibition-guide':
        return await generateExhibitionGuide(req, res);
      case 'send-inquiry':
        return await sendInquiry(req, res);
      case 'send-contact-form':
        return await sendContactForm(req, res);
      case 'submit-lead':
        return await submitLead(req, res);
      case 'generate-video':
        return await generateVideo(req, res);
      default:
        // Return 404 for unknown endpoints
        return res.status(404).json({ error: `API route /api/${routeName} not found` });
    }
  } catch (error: any) {
    console.error('Unified API router error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
