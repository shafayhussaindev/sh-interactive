// The site's public origin, for canonical URLs, the sitemap and link-preview tags.
// SITE_URL wins (e.g. https://sh-interactive.net); otherwise the address the host provides during its build:
// URL on Netlify, VERCEL_PROJECT_PRODUCTION_URL on Vercel.
export function siteUrlFromEnv() {
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return (process.env.SITE_URL || process.env.URL || (vercel ? `https://${vercel}` : '')).replace(/\/$/, '');
}
