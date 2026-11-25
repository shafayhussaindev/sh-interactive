// The site's public origin, for canonical URLs, the sitemap and link-preview tags.
// SITE_URL wins (e.g. https://sh-interactive.net); on Vercel it falls back to the production domain.
export function siteUrlFromEnv() {
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return (process.env.SITE_URL || (vercel ? `https://${vercel}` : '')).replace(/\/$/, '');
}
