import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { siteUrlFromEnv } from './site-url.js';

// In `npm run dev`, serve /api/contact from api/contact.js the way Vercel does in production.
function apiDev() {
  return {
    name: 'api-dev',
    configureServer(server) {
      Object.assign(process.env, loadEnv(server.config.mode, process.cwd(), ''));
      server.middlewares.use('/api/contact', async (req, res) => {
        const { default: handler } = await server.ssrLoadModule('/api/contact.js');
        handler(req, res);
      });
    },
  };
}

// Link-preview tags need absolute URLs (see site-url.js).
function siteUrl() {
  return {
    name: 'site-url',
    transformIndexHtml(html) {
      return html.replaceAll('%SITE_URL%', siteUrlFromEnv());
    },
  };
}

// Single-page React app: every route (/services, /projects…) is served by index.html and routed in src/App.jsx.
export default defineConfig({
  plugins: [react(), tailwindcss(), apiDev(), siteUrl()],
});
