import { Fragment, useEffect, useLayoutEffect } from 'react';
import Home from './pages/Home';
import Services from './pages/Services';
import ServicePage from './pages/ServicePage';
import Software from './pages/Software';
import Projects from './pages/Projects';
import CreativeLab from './pages/CreativeLab';
import NotFound from './pages/NotFound';
import { SERVICES } from './data/services';
import { navigate, normalize, useLinkInterception, usePathname } from './lib/router';

const SITE = 'SH // Interactive';

// path → [page component, document title, meta description]
const ROUTES = {
  '/': [
    Home,
    `Shafay Hussain — Software Engineer & Web Developer | ${SITE}`,
    'Shafay Hussain is a software engineer and full-stack web developer in Pakistan, building custom websites, web apps and business software for clients worldwide.',
  ],
  '/services': [
    Services,
    `Web Development Services: Websites, Web Apps & E-commerce | ${SITE}`,
    'Hire a web developer for custom website development, full-stack web apps and dashboards, e-commerce stores and admin panels. Fixed scope, remote, worldwide.',
  ],
  '/software': [
    Software,
    `Custom Business Software Development: POS, Inventory & Booking | ${SITE}`,
    'Custom business software built by a software developer: POS and billing, inventory and stock management, appointment booking, client portals and admin panels.',
  ],
  '/projects': [
    Projects,
    `Projects & Case Studies | ${SITE}`,
    'Software engineering and web development projects by Shafay Hussain: live sites, screenshots and case studies covering the problem, solution and architecture.',
  ],
  '/creative-lab': [
    CreativeLab,
    `AI Voiceover, Logo Design, 3D Modeling & AI Video | ${SITE}`,
    'Creative services from SH Interactive: AI voiceover, AI logo and brand identity kits, AI image generation, 3D modeling in Blender and AI video generation.',
  ],
};

// Every indexable URL, used by the build to prerender HTML and write sitemap.xml (scripts/prerender.js).
export const PATHS = [...Object.keys(ROUTES), ...SERVICES.map((s) => `/services/${s.id}`)];

// Returns the page element (not a new component type, which would remount on every render).
export function resolve(path) {
  if (ROUTES[path]) {
    const [Page, title, description] = ROUTES[path];
    return [<Page />, title, description];
  }
  const service = SERVICES.find((s) => path === `/services/${s.id}`);
  if (service) return [<ServicePage service={service} />, `${service.title} — ${SITE}`, service.intro];
  return [<NotFound />, `Page not found — ${SITE}`, ''];
}

export default function App() {
  useLinkInterception();
  const path = usePathname();
  const clean = normalize(path);

  // Old .html links and trailing slashes are rewritten to the clean URL in place.
  useLayoutEffect(() => {
    if (clean !== path) navigate(clean + location.search + location.hash, { replace: true });
  }, [clean, path]);

  const [page, title, description] = resolve(clean);

  useEffect(() => {
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, [title, description]);

  // New page: start at the top, or at the #section the link pointed to.
  useLayoutEffect(() => {
    const target = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) requestAnimationFrame(() => target.scrollIntoView());
    else window.scrollTo(0, 0);
  }, [clean]);

  // `key` remounts the page on every route change, so its scroll engine and animations start fresh.
  return <Fragment key={clean}>{page}</Fragment>;
}
