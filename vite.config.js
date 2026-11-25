import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

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

// Link-preview tags need absolute URLs. Uses SITE_URL if set (e.g. https://yourdomain.com),
// otherwise the production domain Vercel provides during its builds.
function siteUrl() {
  return {
    name: 'site-url',
    transformIndexHtml(html) {
      const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
      const url = (process.env.SITE_URL || (vercel ? `https://${vercel}` : '')).replace(/\/$/, '');
      return html.replaceAll('%SITE_URL%', url);
    },
  };
}

// Single-page React app: every route (/services, /projects…) is served by index.html and routed in src/App.jsx.
export default defineConfig({
  plugins: [react(), tailwindcss(), apiDev(), siteUrl()],
});
