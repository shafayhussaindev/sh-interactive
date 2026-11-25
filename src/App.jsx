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
    `${SITE} — Websites and web apps by Shafay Hussain`,
    'Custom websites, landing pages and full-stack web apps, designed, built and deployed by Shafay Hussain.',
  ],
  '/services': [
    Services,
    `Services — ${SITE}`,
    'Custom website development, web apps and dashboards, e-commerce and admin panels by Shafay Hussain.',
  ],
  '/software': [
    Software,
    `Business Software — ${SITE}`,
    'Business software for retail, bookings, portals and admin panels: stock, POS, appointments, records and more.',
  ],
  '/projects': [
    Projects,
    `Projects — ${SITE}`,
    'Selected projects by Shafay Hussain, with screenshots, live links and case studies.',
  ],
  '/creative-lab': [
    CreativeLab,
    `Creative Lab — ${SITE}`,
    'AI voiceover, AI logo and brand identity kits, 3D modeling and AI video generation by Shafay Hussain.',
  ],
};

// Returns the page element (not a new component type, which would remount on every render).
function resolve(path) {
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
