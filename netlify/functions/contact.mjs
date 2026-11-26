// Netlify version of POST /api/contact. Same checks and email as api/contact.js (Vercel), which holds the logic.
// Set RESEND_API_KEY (and optionally CONTACT_TO, CONTACT_FROM) in Netlify → Site configuration → Environment variables.
import { handleContact } from '../../api/contact.js';

export default async (req, context) => {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed.' }, { status: 405, headers: { Allow: 'POST' } });
  }

  let body;
  try {
    const raw = await req.text();
    if (raw.length > 20000) throw new Error('Body too large');
    body = JSON.parse(raw || '{}');
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const [status, payload] = await handleContact(body, context.ip || 'unknown');
  return Response.json(payload, { status });
};

// Served at the same address the form posts to, so the site code is identical on both hosts.
export const config = { path: '/api/contact' };
