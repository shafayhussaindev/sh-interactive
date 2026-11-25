// Runs after `vite build`: writes a real HTML file for every route (dist/services.html, …) with that
// page's content, title, description and canonical URL, plus 404.html, sitemap.xml and robots.txt.
// Crawlers and link previews read these directly; in the browser React takes over as usual.
// Vercel serves /services from services.html ("cleanUrls" in vercel.json) and 404.html for unknown URLs.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { siteUrlFromEnv } from '../site-url.js';

const DIST = 'dist';
const SSR = 'dist-ssr/entry-server.js';
const NOT_FOUND = '/404'; // not a route, so it renders the not-found page
const site = siteUrlFromEnv();
const escape = (text) => text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

globalThis.location = { pathname: '/' }; // the nav reads the current path while rendering
const { PATHS, render } = await import(`../${SSR}`);
const template = readFileSync(join(DIST, 'index.html'), 'utf8');

for (const path of [...PATHS, NOT_FOUND]) {
  globalThis.location.pathname = path;
  const { html, title, description } = render(path);
  const url = `${site}${path}`;
  const head =
    path === NOT_FOUND
      ? '<meta name="robots" content="noindex" />'
      : site
        ? `<link rel="canonical" href="${url}" />`
        : '';
  const page = template
    .replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`)
    .replace(/(name="description" content=")[^"]*/, `$1${escape(description)}`)
    .replace(/(property="og:title" content=")[^"]*/, `$1${escape(title)}`)
    .replace(/(property="og:description" content=")[^"]*/, `$1${escape(description)}`)
    .replace(/(property="og:url" content=")[^"]*/, `$1${url}`)
    .replace('</head>', `  ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  const file = join(DIST, path === '/' ? 'index.html' : `${path.slice(1)}.html`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, page);
}

if (site) {
  const urls = PATHS.map((p) => `  <url><loc>${site}${p}</loc></url>`).join('\n');
  writeFileSync(
    join(DIST, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  );
}
writeFileSync(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n${site ? `Sitemap: ${site}/sitemap.xml\n` : ''}`);
rmSync('dist-ssr', { recursive: true, force: true });
console.log(`prerendered ${PATHS.length} pages + 404${site ? ` for ${site}` : ' (no SITE_URL: skipped canonical + sitemap)'}`);
