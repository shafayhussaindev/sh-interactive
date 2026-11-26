// POST /api/contact: emails a project inquiry from the site's contact form to you, via Resend.
// Runs as a Vercel serverless function, as a Netlify function (netlify/functions/contact.mjs), and in
// `npm run dev` through the Vite plugin in vite.config.js.
//
// Environment variables (set in the host's environment variable settings, or .env locally):
//   RESEND_API_KEY  required, from resend.com → API Keys
//   CONTACT_TO      inbox that receives inquiries (default below)
//   CONTACT_FROM    sender; "onboarding@resend.dev" works until you verify your own domain in Resend

import { SCOPES } from '../src/data/content.js';

const DEFAULT_TO = 'shafay666@hotmail.com';
const DEFAULT_FROM = 'SH Interactive <onboarding@resend.dev>';
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// ponytail: in-memory rate limit, per server instance (resets on cold start). Move to a shared store (Upstash, Netlify Blobs) if spam gets through.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

// Returns { ok: true, data } with trimmed values, or { ok: false, error } with a message safe to show the visitor.
export function validate(body) {
  if (!body || typeof body !== 'object') return { ok: false, error: 'Invalid request.' };
  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const brief = String(body.brief ?? '').trim();
  const scope = Array.isArray(body.scope) ? body.scope.filter((s) => SCOPES.includes(s)) : [];

  if (!name || name.length > 100) return { ok: false, error: 'Please enter your name.' };
  if (!EMAIL.test(email) || email.length > 200) return { ok: false, error: 'Please enter a valid email address.' };
  if (scope.length === 0) return { ok: false, error: 'Pick at least one thing you need.' };
  if (brief.length < 20) return { ok: false, error: 'Please write a little more about the project (20 characters or more).' };
  if (brief.length > 5000) return { ok: false, error: 'Please keep the brief under 5,000 characters.' };
  return { ok: true, data: { name, email, brief, scope } };
}

async function readJson(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body);
  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 20000) throw new Error('Body too large');
  }
  return JSON.parse(raw || '{}');
}

function send(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

// The host-independent part: spam trap, rate limit, checks and the Resend call.
// Returns [status, payload]; the Vercel handler below and netlify/functions/contact.mjs both use it.
export async function handleContact(body, ip) {
  const fail = { error: 'The message could not be sent right now. Please email or WhatsApp instead.' };

  // Spam trap: a hidden field people never see. Bots that fill it get a normal-looking success and no email.
  if (body.company) return [200, { ok: true }];
  if (rateLimited(ip)) return [429, { error: 'Too many messages in a short time. Please try again later or email directly.' }];

  const result = validate(body);
  if (!result.ok) return [400, { error: result.error }];
  const { name, email, brief, scope } = result.data;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY is not set');
    return [500, { error: 'The form is not set up yet. Please email or WhatsApp instead.' }];
  }

  const text = `New project inquiry from the website

Name: ${name}
Email: ${email}
Needs: ${scope.join(', ')}

${brief}
`;
  const html = `
    <h2 style="margin:0 0 12px">New project inquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}<br>
    <strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a><br>
    <strong>Needs:</strong> ${escapeHtml(scope.join(', '))}</p>
    <p style="white-space:pre-wrap">${escapeHtml(brief)}</p>
    <p style="color:#80869a;font-size:12px">Sent from the contact form. Reply to this email to answer ${escapeHtml(name)} directly.</p>`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || DEFAULT_FROM,
        to: [process.env.CONTACT_TO || DEFAULT_TO],
        reply_to: email,
        subject: `New project inquiry — ${name}`,
        text,
        html,
      }),
    });
    if (!response.ok) {
      console.error('[contact] Resend error', response.status, await response.text());
      return [502, fail];
    }
    return [200, { ok: true }];
  } catch (error) {
    console.error('[contact] network error', error);
    return [502, fail];
  }
}

// Vercel (and `npm run dev`): Node-style (req, res).
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return send(res, 405, { error: 'Method not allowed.' });
  }

  let body;
  try {
    body = await readJson(req);
  } catch {
    return send(res, 400, { error: 'Invalid request.' });
  }

  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
  const [status, payload] = await handleContact(body, ip);
  return send(res, status, payload);
}
