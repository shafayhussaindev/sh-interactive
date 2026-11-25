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
    `Web Development Company | Websites, Web Apps, SaaS & AI Services | ${SITE}`,
    'SH Interactive builds custom websites, landing pages, web applications, SaaS products, ecommerce stores, POS and booking software, plus AI voiceover, AI video, AI logos and 3D modeling. Pakistan-based, serving clients worldwide.',
  ],
  '/services': [
    Services,
    `Web Development, Software & AI Services | ${SITE}`,
    'Website development, landing pages, custom web apps, SaaS development, portals and dashboards, ecommerce, admin panels, POS and inventory software, booking software, AI voiceover, AI images, AI logos, 3D modeling and AI video.',
  ],
  '/software': [
    Software,
    `Custom Business Software: POS, Inventory & Booking Systems | ${SITE}`,
    'Custom business software development: POS and billing software, inventory management systems, appointment booking and membership software, client portals and admin panels.',
  ],
  '/projects': [
    Projects,
    `Web Development Portfolio & Case Studies | ${SITE}`,
    'Web development portfolio by Shafay Hussain: live websites, ecommerce stores, landing pages and web apps, with case studies covering the problem, solution and architecture.',
  ],
  '/creative-lab': [
    CreativeLab,
    `AI Voiceover, AI Video, AI Logo Design & 3D Modeling | ${SITE}`,
    'AI creative services: realistic AI voiceover, AI video generation, AI image generation, AI logo design and brand kits, and 3D modeling and rendering in Blender.',
  ],
};

// Per-service structured data (Service + breadcrumbs + FAQ); %SITE_URL% is filled in by scripts/prerender.js.
const serviceSchema = (s) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: s.title,
      serviceType: s.title,
      description: s.seoDescription,
      url: `%SITE_URL%/services/${s.id}`,
      provider: { '@id': '%SITE_URL%/#business' },
      areaServed: 'Worldwide',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Services', item: '%SITE_URL%/services' },
        { '@type': 'ListItem', position: 2, name: s.title, item: `%SITE_URL%/services/${s.id}` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: s.faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
  ],
});

// Every indexable URL, used by the build to prerender HTML and write sitemap.xml (scripts/prerender.js).
export const PATHS = [...Object.keys(ROUTES), ...SERVICES.map((s) => `/services/${s.id}`)];

// Returns the page element (not a new component type, which would remount on every render).
export function resolve(path) {
  if (ROUTES[path]) {
    const [Page, title, description] = ROUTES[path];
    return [<Page />, title, description];
  }
  const service = SERVICES.find((s) => path === `/services/${s.id}`);
  if (service) return [<ServicePage service={service} />, `${service.seoTitle} | ${SITE}`, service.seoDescription, serviceSchema(service)];
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
