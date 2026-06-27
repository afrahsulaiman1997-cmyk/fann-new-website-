import type { VercelRequest, VercelResponse } from '@vercel/node';
import url from 'url';

// Import all handlers
import analyzeBrand from '../api_handlers/analyze-brand';
import analyzeEventIndustry from '../api_handlers/analyze-event-industry';
import analyzeShowStyle from '../api_handlers/analyze-show-style';
import calculateRoi from '../api_handlers/calculate-roi';
import calculateStandCost from '../api_handlers/calculate-stand-cost';
import chat from '../api_handlers/chat';
import detectIndustry from '../api_handlers/detect-industry';
import editImage from '../api_handlers/edit-image';
import extractColors from '../api_handlers/extract-colors';
import generateCostPdf from '../api_handlers/generate-cost-pdf';
import generateEventDesign from '../api_handlers/generate-event-design';
import generateExhibitionDesign from '../api_handlers/generate-exhibition-design';
import generateExhibitionGuide from '../api_handlers/generate-exhibition-guide';
import generateGuidePdf from '../api_handlers/generate-guide-pdf';
import generateImages from '../api_handlers/generate-images';
import generateInsights from '../api_handlers/generate-insights';
import generateInteriorDesign from '../api_handlers/generate-interior-design';
import generateRoiPdf from '../api_handlers/generate-roi-pdf';
import generateTemplate from '../api_handlers/generate-template';
import generateVideo from '../api_handlers/generate-video';
import llms from '../api_handlers/llms';
import robots from '../api_handlers/robots';
import sendContactForm from '../api_handlers/send-contact-form';
import sendInquiry from '../api_handlers/send-inquiry';
import sendProposal from '../api_handlers/send-proposal';
import sitemap from '../api_handlers/sitemap';
import submitLead from '../api_handlers/submit-lead';

const routes: Record<string, { handler: any; type: 'node' | 'edge' }> = {
  'analyze-brand': { handler: analyzeBrand, type: 'edge' },
  'analyze-event-industry': { handler: analyzeEventIndustry, type: 'node' },
  'analyze-show-style': { handler: analyzeShowStyle, type: 'node' },
  'calculate-roi': { handler: calculateRoi, type: 'edge' },
  'calculate-stand-cost': { handler: calculateStandCost, type: 'node' },
  'chat': { handler: chat, type: 'edge' },
  'detect-industry': { handler: detectIndustry, type: 'node' },
  'edit-image': { handler: editImage, type: 'node' },
  'extract-colors': { handler: extractColors, type: 'node' },
  'generate-cost-pdf': { handler: generateCostPdf, type: 'node' },
  'generate-event-design': { handler: generateEventDesign, type: 'node' },
  'generate-exhibition-design': { handler: generateExhibitionDesign, type: 'node' },
  'generate-exhibition-guide': { handler: generateExhibitionGuide, type: 'edge' },
  'generate-guide-pdf': { handler: generateGuidePdf, type: 'node' },
  'generate-images': { handler: generateImages, type: 'node' },
  'generate-insights': { handler: generateInsights, type: 'node' },
  'generate-interior-design': { handler: generateInteriorDesign, type: 'edge' },
  'generate-roi-pdf': { handler: generateRoiPdf, type: 'node' },
  'generate-template': { handler: generateTemplate, type: 'edge' },
  'generate-video': { handler: generateVideo, type: 'node' },
  'llms': { handler: llms, type: 'node' },
  'robots': { handler: robots, type: 'node' },
  'send-contact-form': { handler: sendContactForm, type: 'node' },
  'send-inquiry': { handler: sendInquiry, type: 'node' },
  'send-proposal': { handler: sendProposal, type: 'node' },
  'sitemap': { handler: sitemap, type: 'node' },
  'submit-lead': { handler: submitLead, type: 'node' },
};

// Adapter to run Edge/Web API handlers on standard Node.js serverless environment
async function handleEdge(handler: (req: Request) => Promise<Response>, req: VercelRequest, res: VercelResponse) {
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers.host || 'localhost';
  const urlStr = `${protocol}://${host}${req.url}`;
  
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value) {
      if (Array.isArray(value)) {
        value.forEach(v => headers.append(key, v));
      } else {
        headers.set(key, value);
      }
    }
  }

  let body: any = null;
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    if (typeof req.body === 'object' && req.body !== null) {
      body = JSON.stringify(req.body);
    } else {
      body = req.body;
    }
  }

  const webReq = new Request(urlStr, {
    method: req.method,
    headers,
    body,
  });

  const webRes = await handler(webReq);
  
  res.status(webRes.status);
  webRes.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });
  
  const text = await webRes.text();
  res.send(text);
}

export default async function mainHandler(req: VercelRequest, res: VercelResponse) {
  try {
    const parsedUrl = url.parse(req.url || '', true);
    const pathname = parsedUrl.pathname || '';
    
    // Extract route name, checking query parameter first (for rewritten assets like /robots.txt -> /api/index?route=robots)
    let routeName = parsedUrl.query.route as string;
    if (!routeName) {
      routeName = pathname.replace(/^\/api\//, '').replace(/\/$/, '');
    }

    const routeConfig = routes[routeName];
    if (!routeConfig) {
      return res.status(404).json({ error: `API route /api/${routeName} not found` });
    }

    if (routeConfig.type === 'edge') {
      return await handleEdge(routeConfig.handler, req, res);
    } else {
      return await routeConfig.handler(req, res);
    }
  } catch (error: any) {
    console.error('Unified API router error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
