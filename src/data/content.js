// The business is run remotely, so there is deliberately no street address.
export const CONTACT = {
  email: 'shafay666@hotmail.com',
  phone: '+92 344 6644032',
  github: 'https://github.com/shafayhussaindev',
  linkedin: 'https://www.linkedin.com/in/shafay-h-b6ab61378',
};

export const telHref = (phone) => `tel:${phone.replace(/\s/g, '')}`;
export const whatsappHref = (phone) => `https://wa.me/${phone.replace(/\D/g, '')}`;

export const CAPABILITIES = [
  {
    icon: 'deployed_code',
    title: 'Full-Stack Web Applications',
    body: 'Custom web apps engineered end to end: RESTful and GraphQL APIs, authentication, role-based dashboards and database architecture designed to scale with your users.',
    points: ['REST / GraphQL APIs', 'Auth & RBAC', 'Admin dashboards', 'SQL schema design', 'Third-party integrations'],
  },
  {
    icon: 'web',
    title: 'Custom Websites & Landing Pages',
    body: 'High-speed, responsive marketing websites and interactive landing pages built for brand authority and conversion, with SEO and analytics wired in from day one.',
    points: ['Core Web Vitals', 'Conversion-led layouts', 'CMS-ready', 'SEO & analytics'],
  },
  {
    icon: 'animation',
    title: 'Interactive Frontend & Scroll Motion',
    body: 'GSAP choreography, 60fps smooth scrolling, micro-interactions and responsive UI systems that make a product feel engineered rather than assembled.',
    points: ['GSAP / ScrollTrigger', 'Three.js & WebGL', 'Design systems', 'Micro-interactions'],
    wide: true,
  },
];

// Live projects, shown on /projects.
// Every detail here was read from the live site; `metrics` are facts about the build, not business results.
// Screenshots live in public/projects/.
export const PROJECTS = [
  {
    index: '01',
    category: 'Insight Platform',
    title: 'Consumer Goods Intelligence',
    url: 'https://cgi-gilt.vercel.app/',
    image: '/projects/consumer-goods-intelligence.webp',
    alt: 'Consumer Goods Intelligence home page: a hiker overlooking mountains at dusk behind the headline "Making sense of digital transformation in consumer goods"',
    summary:
      'A publishing platform that makes digital transformation in consumer goods understandable, covering Digital Product Passports, ESG transparency, supply-chain visibility and the virtual factory.',
    tags: ['React', 'Vite', 'Lenis'],
    metrics: [
      { value: '7', label: 'focus areas' },
      { value: '4', label: 'industry shifts' },
      { value: 'Live', label: 'on Vercel' },
    ],
    challenge:
      'People building consumer goods face new regulation and data demands at once, and most of the material explaining it is dense and full of jargon.',
    solution:
      'A clear, editorial site in plain English: the four forces reshaping the industry, the seven focus areas it publishes on, and a direct route to follow the work on LinkedIn.',
    architecture: [
      'React single-page site built with Vite',
      'Lenis smooth scrolling',
      'Sections for The Shift, What We Do and Focus Areas',
      'Cookie consent with accept, reject and settings',
      'Deployed on Vercel',
    ],
  },
  {
    index: '02',
    category: 'Product Launch',
    title: 'DEFY. Sneaker Concept Landing Page',
    url: 'https://3d-shoes-ruddy.vercel.app/',
    image: '/projects/defy-sneaker-concept.webp',
    alt: 'DEFY sneaker concept page: a blue 3D sneaker beside the headline "Defy the ordinary"',
    summary:
      'An independent sneaker concept page with an interactive 3D shoe, scroll-driven storytelling, a colorway and size picker, and a four-piece concept lineup.',
    tags: ['React', 'Vite', 'Three.js', 'Tailwind CSS'],
    metrics: [
      { value: '3D', label: 'interactive model' },
      { value: '4', label: 'concept colorways' },
      { value: '12', label: 'size options' },
    ],
    challenge:
      'Show what a premium product launch page can feel like: a product people can look at from every angle, not a flat photo.',
    solution:
      'A dark, editorial launch page built around a real-time 3D sneaker, with scroll-led chapters on the design, a product panel with colorway and size selection, and a concept collection.',
    architecture: [
      'React and Vite',
      'Three.js real-time 3D product view',
      'Scroll-driven storytelling chapters',
      'Colorway and size selection UI',
      'Tailwind CSS, deployed on Vercel',
    ],
  },
  {
    index: '03',
    category: 'Compliance Tool',
    title: 'PPWR Packaging Readiness Checklist',
    url: 'https://ppwr-landing-page.vercel.app/',
    image: '/projects/ppwr-checklist.webp',
    alt: 'PPWR checklist landing page in German, with a 3D shipping box beside the headline about creating a personal PPWR checklist',
    summary:
      'A bilingual landing page and checklist builder that helps companies prepare for the EU Packaging Regulation (PPWR): which supplier evidence to collect, who to involve and what to check.',
    tags: ['React', 'Vite', 'EN / DE'],
    metrics: [
      { value: '2', label: 'languages' },
      { value: '6', label: 'app views previewed' },
      { value: 'Local', label: 'answers stay in browser' },
    ],
    challenge:
      'Packaging teams need to prepare for the PPWR, but it is hard to know which supplier documents to request and where to start.',
    solution:
      'A free personal checklist built from a short set of questions, a downloadable sample PDF, previews of the companion app and market-specific guidance for Germany and the wider EU.',
    architecture: [
      'React and Vite',
      'English and German versions',
      'Checklist builder with answers kept in the browser',
      'Sample PDF download',
      'Previews of six application views',
    ],
  },
  {
    index: '04',
    category: 'E-commerce',
    title: 'Boutique Déstockage',
    url: 'https://boutique-destockage.vercel.app/',
    image: '/projects/boutique-destockage.webp',
    alt: 'Boutique Déstockage store home page with the headline "Beautiful intimates, quietly priced" and shop buttons',
    summary:
      'A headless lingerie and intimates store built on the Shopify Storefront API, with collections, sale pricing, new arrivals, best sellers and a newsletter signup.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Shopify'],
    metrics: [
      { value: '4', label: 'collections' },
      { value: '60%', label: 'max sale discount' },
      { value: 'Headless', label: 'Shopify storefront' },
    ],
    challenge:
      'A destocking boutique needs an elegant store that sells end-of-line pieces without looking like a discount warehouse.',
    solution:
      'A refined, editorial storefront: shop by category, new arrivals and best sellers with original and sale prices side by side, connected to Shopify for products and checkout.',
    architecture: [
      'React and Vite storefront',
      'Shopify Storefront API (demo mode uses sample data)',
      'Collections for bras, underwear, lingerie and loungewear',
      'Sale pricing with original price shown',
      'Tailwind CSS, deployed on Vercel',
    ],
  },
];

// Creative services, shown on /creative-lab (and summarised in the home page's Creative lab section).
export const LAB = [
  {
    id: 'voiceover',
    page: '/services/ai-voiceover',
    icon: 'record_voice_over',
    tag: 'Audio',
    title: 'AI Voiceover',
    short: 'Natural, studio-clean narration for videos, ads, explainers and product demos.',
    body: 'Voiceovers generated from your script, then directed line by line for pacing, emphasis and pronunciation, so it sounds read, not recited. Delivered mastered and ready to drop into your edit.',
    deliverables: ['Script polish for spoken delivery', 'Choice of voices, tones and accents', 'Mastered WAV and MP3 files', 'Timed versions for 15s, 30s and 60s cuts'],
    fit: ['Explainer videos', 'Ads and reels', 'Product demos', 'Website intros'],
  },
  {
    id: 'brand',
    page: '/services/ai-logo-brand-kit',
    icon: 'palette',
    tag: 'Identity',
    title: 'AI Logo & Brand Identity Kits',
    short: 'A logo and the system around it: colors, type and assets your brand can use everywhere.',
    body: 'Logo directions explored with AI, then refined and redrawn as clean vector marks. The chosen mark ships with a complete kit, so every page, post and profile looks like the same company.',
    deliverables: ['Logo in SVG, PNG and favicon sizes', 'Color palette and type pairing', 'Social profile and cover assets', 'One-page brand guideline PDF'],
    fit: ['New businesses', 'Rebrands', 'Product launches', 'Social media'],
  },
  {
    id: 'images',
    page: '/services/ai-image-generation',
    icon: 'auto_fix_high',
    tag: 'Visuals',
    title: 'AI Image Generation & Visual Systems',
    short: 'Brand visuals, product mockups and hero artwork, made for you instead of stock photos.',
    body: 'Images generated and art-directed to a consistent style, then retouched and sized for where they will live. You get a set that looks like one brand, plus the style system to make more.',
    deliverables: ['Art-directed hero imagery', 'Product mockups and scenes', 'Reusable brand style system', 'Web-optimized exports'],
    fit: ['Websites', 'Social media', 'Product pages', 'Ads'],
  },
  {
    id: 'modeling',
    page: '/services/3d-modeling',
    icon: 'view_in_ar',
    tag: '3D',
    title: '3D Modeling',
    short: 'Products, props and scenes modeled in Blender, for renders or for the browser.',
    body: 'Detailed 3D models built from your photos, sketches or references. Use them for photoreal product renders, or as lightweight interactive models that load fast on a website.',
    deliverables: ['Web-ready GLB models, compressed', 'Photoreal product renders', 'Interactive 3D viewer for your site', 'Source .blend files'],
    fit: ['Product pages', 'Launch pages', 'Configurators', 'Ads and mockups'],
  },
  {
    id: 'video',
    page: '/services/ai-video-generation',
    icon: 'movie',
    tag: 'Motion',
    title: 'AI Video Generation',
    short: 'Short brand films, product clips and social videos, generated and edited to a brief.',
    body: 'Scenes generated with AI video tools, then cut, color-matched and paced into a finished piece with music, captions and voiceover. Built around your product, not stock footage.',
    deliverables: ['Storyboard and shot list', 'Edited video with music and captions', 'Vertical, square and wide versions', 'Website hero loop, optimized'],
    fit: ['Social media', 'Hero backgrounds', 'Product launches', 'Ads'],
  },
];

export const PROCESS = [
  {
    title: 'Discovery & System Architecture',
    body: 'Goals, users and constraints mapped into a system diagram, data model and delivery roadmap before any code is written.',
    output: 'Architecture doc · Schema · Roadmap',
  },
  {
    title: 'UI/UX & Motion Prototyping',
    body: 'Wireframes to high-fidelity screens, with motion prototyped early so interaction is designed in, not bolted on.',
    output: 'Design system · Motion specs',
  },
  {
    title: 'Full-Stack Development',
    body: 'Frontend, APIs, auth and database built in weekly increments on a live staging URL you can review at any time.',
    output: 'Staging builds · Weekly demos',
  },
  {
    title: 'Performance Audit & Deployment',
    body: 'Lighthouse, Core Web Vitals and load testing, then CI/CD deployment, monitoring and a clean handover.',
    output: 'Production deploy · Docs · Handover',
  },
];

export const SCOPES = ['Landing Page / Website', 'Full-Stack Web App', 'Business Software', 'AI Voiceover', 'Logo & Brand Kit', 'AI Images', '3D Modeling', 'AI Video'];
