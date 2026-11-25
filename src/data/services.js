// Each service has its own page at /services/<id> (routed in src/App.jsx, rendered by src/pages/ServicePage.jsx).
// Every page targets one search phrase: `seoTitle` and `seoDescription` become the <title> and meta description,
// `title` is the visible H1, and `faq` answers the questions people type into Google about that service.
// `preview` picks a coded preview from components/ServicePreview.jsx; without one, `icon` is shown instead.

export const GROUPS = ['Websites', 'Web Apps & Software', 'AI & Creative'];

export const SERVICES = [
  // ── Websites ──────────────────────────────────────────────────────────────
  {
    id: 'websites',
    group: 'Websites',
    tag: 'Core',
    icon: 'web',
    title: 'Custom Website Development',
    seoTitle: 'Website Development Services | Custom Business Website Design',
    seoDescription:
      'Professional website design and development for small businesses, clinics and startups. Fast, mobile-friendly, SEO-ready custom websites built from scratch. Remote, worldwide.',
    short: 'Built from scratch for your business',
    intro:
      'A website designed and coded around your business, your customers and the one action you want visitors to take, whether that is a call, a booking or an enquiry. Every page is built from scratch, loads fast on phones, and is yours to keep.',
    steps: [
      {
        title: 'Discovery',
        body: 'Your goals, audience, competitors and the action each page should drive are agreed first, then turned into a sitemap and content plan.',
      },
      {
        title: 'Design',
        body: 'Desktop and mobile layouts are designed in your brand with real copy instead of placeholder text, and reviewed with you before any code is written.',
      },
      {
        title: 'Build',
        body: 'Pages are hand-coded for speed and accessibility, with forms, analytics and SEO set up as part of the build, on a staging link you can check at any time.',
      },
      {
        title: 'Launch',
        body: 'Speed and SEO are checked, the site goes live on your domain, and you get a walkthrough of how to update it yourself.',
      },
    ],
    deliverables: [
      { title: 'Designed pages', body: 'Home, services, about and contact, or whatever your sitemap needs, designed for desktop and mobile.' },
      { title: 'Responsive build', body: 'Hand-coded pages that load fast and work on every screen size, from phones to wide monitors.' },
      { title: 'SEO foundations', body: 'Page titles, meta descriptions, structured data and a sitemap, so search engines understand every page.' },
      { title: 'Lead capture', body: 'Contact and enquiry forms that arrive in your inbox, with spam protection built in.' },
      { title: 'Analytics', body: 'Visitor and conversion tracking, so you can see which pages actually bring in enquiries.' },
      { title: 'Content you can edit', body: 'A simple way to change text and images without touching code or waiting on a developer.' },
    ],
    features: [
      'Multi-page business sites',
      'Blog or news section',
      'Portfolio and galleries',
      'Booking and enquiry forms',
      'Maps and reviews embeds',
      'Multilingual pages',
      'WhatsApp chat button',
      'Website redesign',
    ],
    fit: ['Service businesses', 'Clinics and studios', 'Startups launching', 'Brands outgrowing a template'],
    stack: ['React', 'Vite', 'Tailwind CSS', 'GSAP'],
    faq: [
      {
        q: 'How long does it take to build a business website?',
        a: 'Most business websites take two to four weeks from discovery to launch, depending on the number of pages and how ready the content is.',
      },
      {
        q: 'Will my website be mobile-friendly and SEO-optimized?',
        a: 'Yes. Every page is designed for phones first and ships with titles, meta descriptions, structured data, a sitemap and fast load times.',
      },
      {
        q: 'Can I update the website myself after launch?',
        a: 'Yes. You get a simple way to edit text and images, plus a walkthrough, so routine changes never need a developer.',
      },
    ],
  },
  {
    id: 'landing-pages',
    group: 'Websites',
    tag: 'Conversion',
    icon: 'web',
    preview: 'websites',
    title: 'Landing Page Design & Development',
    seoTitle: 'Landing Page Design Services | High-Converting Landing Pages',
    seoDescription:
      'High-converting landing page design and development for ads, product launches and lead generation. Fast-loading, mobile-first pages with A/B-ready layouts and analytics.',
    short: 'One page, one goal, built to convert',
    intro:
      'A single page built around one offer and one action: sign up, book a call or buy. Designed for the traffic you are paying for, from Google Ads, Meta ads or a launch email, so more of those visitors turn into leads and customers.',
    steps: [
      {
        title: 'Offer and audience',
        body: 'The offer, the audience and the traffic source are pinned down, so the headline speaks to exactly the people clicking your ad.',
      },
      {
        title: 'Copy and wireframe',
        body: 'The page is structured as an argument: headline, proof, benefits, objections and a clear call to action, written before it is designed.',
      },
      {
        title: 'Design and build',
        body: 'The page is designed in your brand and hand-coded to load in about a second on mobile, because every second of delay costs conversions.',
      },
      {
        title: 'Track and improve',
        body: 'Conversion tracking and ad pixels are connected, so you can see what works and test new headlines or sections.',
      },
    ],
    deliverables: [
      { title: 'Conversion copy', body: 'Headline, benefits and call to action written for your offer and audience.' },
      { title: 'Mobile-first design', body: 'Designed for phones first, where most ad traffic lands.' },
      { title: 'Fast build', body: 'A lightweight, hand-coded page that scores well on Core Web Vitals.' },
      { title: 'Lead forms', body: 'Forms, booking widgets or checkout links that send leads straight to you.' },
      { title: 'Tracking', body: 'Google Analytics, Google Ads and Meta Pixel conversion events set up and tested.' },
      { title: 'Variants', body: 'Layouts ready for A/B testing different headlines, offers or sections.' },
    ],
    features: [
      'Product launch pages',
      'Lead generation pages',
      'Ad campaign landing pages',
      'Webinar and event sign-up',
      'Waitlist pages',
      'App download pages',
      'Scroll animations',
      'Interactive 3D product views',
    ],
    fit: ['Paid ad campaigns', 'Product launches', 'Coaches and consultants', 'SaaS sign-ups'],
    stack: ['React', 'Vite', 'Tailwind CSS', 'GSAP'],
    faq: [
      {
        q: 'What makes a landing page high-converting?',
        a: 'One clear offer, a headline that matches the ad, proof such as reviews or results, a short form and a page that loads fast on mobile.',
      },
      {
        q: 'How is a landing page different from a website?',
        a: 'A website covers your whole business. A landing page focuses on a single campaign or offer and removes everything that distracts from one action.',
      },
      {
        q: 'Can you connect the landing page to my ads and CRM?',
        a: 'Yes. Google Ads, Meta Pixel and analytics events are set up, and leads can go to email, a spreadsheet or your CRM.',
      },
    ],
  },
  {
    id: 'ecommerce',
    group: 'Websites',
    tag: 'Commerce',
    icon: 'inventory_2',
    title: 'E-commerce Website Development',
    seoTitle: 'Ecommerce Website Development | Online Store Design & Shopify',
    seoDescription:
      'Custom ecommerce website development and online store design: product catalogue, cart, secure checkout, payment gateways, cash on delivery, WhatsApp ordering and Shopify storefronts.',
    short: 'Catalogue, cart, checkout or WhatsApp',
    intro:
      'Online stores and ordering flows built around how you actually sell: full card checkout, cash on delivery, or orders that arrive straight in WhatsApp. Customers browse, order and pay without friction, and you manage everything from one place.',
    steps: [
      {
        title: 'Plan the catalogue',
        body: 'Products, categories, variants, delivery areas and payment methods are mapped, so the store matches how you sell today.',
      },
      {
        title: 'Design the shopping flow',
        body: 'Product pages, cart and checkout are designed for phones first, keeping the number of steps to an order as small as possible.',
      },
      {
        title: 'Build and connect',
        body: 'The store is built with payments, order notifications and stock connected, on a staging link where you can place test orders.',
      },
      {
        title: 'Launch',
        body: 'Test orders are run end to end, your products are loaded, and you are shown how to manage orders and stock.',
      },
    ],
    deliverables: [
      { title: 'Product catalogue', body: 'Categories, search, filters, variants like size and colour, and product photos.' },
      { title: 'Cart and checkout', body: 'A short, mobile-friendly checkout with guest ordering, delivery details and an order summary.' },
      { title: 'Payments', body: 'Card payments through a payment gateway, cash on delivery, or both.' },
      { title: 'WhatsApp ordering', body: 'Orders sent to your WhatsApp with items, totals and customer details already filled in.' },
      { title: 'Order management', body: 'A dashboard to see new orders, update their status and keep track of stock.' },
      { title: 'Notifications', body: 'Order confirmations by email for customers, and an alert for you on every new order.' },
    ],
    features: [
      'Headless Shopify storefronts',
      'Discount codes',
      'Delivery zones and fees',
      'Low-stock alerts',
      'Customer accounts',
      'Order tracking page',
      'Printable invoices',
      'Bulk product import',
    ],
    fit: ['Retail brands', 'Restaurants and food', 'Local shops going online', 'Wholesale ordering'],
    stack: ['React', 'Node', 'Shopify', 'Payment gateways'],
    faq: [
      {
        q: 'Do you build Shopify stores or custom ecommerce websites?',
        a: 'Both. A headless Shopify storefront gives you Shopify checkout with a custom design, and a fully custom store suits unusual ordering flows.',
      },
      {
        q: 'Can customers pay by card and cash on delivery?',
        a: 'Yes. Card payments through a payment gateway, cash on delivery and WhatsApp ordering can all run side by side.',
      },
      {
        q: 'Can I manage products and orders myself?',
        a: 'Yes. Every store includes a dashboard for products, stock, orders and order status.',
      },
    ],
  },

  // ── Web Apps & Software ───────────────────────────────────────────────────
  {
    id: 'web-apps',
    group: 'Web Apps & Software',
    tag: 'Software',
    icon: 'deployed_code',
    title: 'Custom Web Application Development',
    seoTitle: 'Custom Web Application Development Services | Full-Stack Web Apps',
    seoDescription:
      'Full-stack custom web application development: logins, roles, dashboards, APIs and databases. Replace spreadsheets and manual work with web software built for your business.',
    short: 'Software with a login in front of it',
    intro:
      'Software that runs in the browser behind a login: booking systems, internal tools, workflow apps and business software. Built to replace spreadsheets, email chains and manual steps with one system your team and customers actually use.',
    steps: [
      {
        title: 'Discovery and architecture',
        body: 'Users, roles and workflows are mapped, then turned into a data model, an API plan and a list of screens before development starts.',
      },
      {
        title: 'Prototype',
        body: 'The key screens are designed and clicked through with you, so the workflow is right before any of it is built.',
      },
      {
        title: 'Build in increments',
        body: 'Frontend, API, database and authentication are built feature by feature, on a staging app you can log into and test every week.',
      },
      {
        title: 'Test and deploy',
        body: 'Permissions, edge cases and performance are tested, then the app is deployed with monitoring and handed over with documentation.',
      },
    ],
    deliverables: [
      { title: 'Accounts and roles', body: 'Sign up, login, password reset and role-based permissions, so each user sees only what they should.' },
      { title: 'Dashboards and reports', body: 'Charts, tables, filters and exports built around the numbers your business runs on.' },
      { title: 'API', body: 'A documented REST or GraphQL API that the app, and any future mobile app, can build on.' },
      { title: 'Database', body: 'A SQL database designed around your data, with versioned migrations so it can grow safely.' },
      { title: 'Integrations', body: 'Payments, email, calendars, CRMs or any service with an API, connected to the app.' },
      { title: 'Documentation', body: 'Setup notes, an architecture overview and API docs, so the system is never a black box.' },
    ],
    features: [
      'Workflow automation',
      'Booking and scheduling',
      'Invoicing and payments',
      'File uploads',
      'Email notifications',
      'Audit logs',
      'AI features and chat',
      'Data import and export',
    ],
    fit: ['Internal tools', 'Startups', 'Operations teams', 'Replacing spreadsheets'],
    stack: ['React', 'Node', '.NET', 'SQL'],
    faq: [
      {
        q: 'What is a custom web application?',
        a: 'Software that runs in a browser, built around your exact workflow, with its own logins, data and screens, instead of a generic off-the-shelf tool.',
      },
      {
        q: 'How long does custom web app development take?',
        a: 'A focused first version usually takes four to ten weeks. Larger systems are delivered in stages so you can use parts of it early.',
      },
      {
        q: 'Do I own the source code?',
        a: 'Yes. You own the code, the database and the documentation once the project is paid for.',
      },
    ],
  },
  {
    id: 'saas',
    group: 'Web Apps & Software',
    tag: 'Product',
    icon: 'deployed_code',
    preview: 'web-apps',
    title: 'SaaS Application Development',
    seoTitle: 'SaaS Development Services | Build Your SaaS Product & MVP',
    seoDescription:
      'SaaS application development from MVP to launch: multi-tenant architecture, subscriptions and billing, user onboarding, dashboards and APIs. Build and launch your SaaS product.',
    short: 'From MVP to paying subscribers',
    intro:
      'Your software idea built as a subscription product: sign-up, onboarding, plans and billing, a multi-tenant database and the core feature your customers pay for. Start with a lean MVP to validate the idea, then grow it on an architecture that scales.',
    steps: [
      {
        title: 'Scope the MVP',
        body: 'The smallest version that proves people will pay is defined, along with pricing plans, user roles and what comes later.',
      },
      {
        title: 'Architecture',
        body: 'Multi-tenant data model, authentication, billing and API are designed up front, so the product can grow without a rewrite.',
      },
      {
        title: 'Build and iterate',
        body: 'Features ship weekly to a staging app, so you can show early users and investors real progress.',
      },
      {
        title: 'Launch and scale',
        body: 'Deployed with monitoring, backups and analytics, ready for your first customers and for the next round of features.',
      },
    ],
    deliverables: [
      { title: 'Multi-tenant app', body: 'Separate workspaces for each customer account, with their own users, data and settings.' },
      { title: 'Subscriptions and billing', body: 'Pricing plans, free trials, upgrades and recurring payments through Stripe or a local gateway.' },
      { title: 'Onboarding', body: 'Sign-up, email verification, team invites and a first-run experience that gets users to value fast.' },
      { title: 'Product dashboard', body: 'The core screens your customers log in for, designed to be clear on day one.' },
      { title: 'Admin console', body: 'A back office to see accounts, plans, usage and revenue, and to support customers.' },
      { title: 'API and webhooks', body: 'A documented API so customers and integrations can connect to your product.' },
    ],
    features: [
      'MVP development',
      'Stripe subscriptions',
      'Usage-based billing',
      'Team accounts and invites',
      'Role-based access',
      'Transactional emails',
      'Product analytics',
      'AI-powered features',
    ],
    fit: ['Founders with an idea', 'Startups', 'Agencies productising a service', 'Businesses selling software'],
    stack: ['React', 'Node', 'PostgreSQL', 'Stripe'],
    faq: [
      {
        q: 'How much does it cost to build a SaaS MVP?',
        a: 'It depends on the core feature and integrations. After a short discovery call you get a fixed quote for a lean MVP, with later features scoped separately.',
      },
      {
        q: 'What is multi-tenant SaaS architecture?',
        a: 'One application serving many customer accounts, each with its own isolated data, users and settings. It keeps hosting costs low as you grow.',
      },
      {
        q: 'Can you add subscriptions and recurring billing?',
        a: 'Yes. Plans, trials, upgrades, invoices and failed-payment handling are built in with Stripe or a local payment gateway.',
      },
    ],
  },
  {
    id: 'portals-dashboards',
    group: 'Web Apps & Software',
    tag: 'Data & Access',
    icon: 'manage_search',
    preview: 'web-apps',
    title: 'Client Portals & Dashboard Development',
    seoTitle: 'Customer Portal & Dashboard Development | Custom Web Portals',
    seoDescription:
      'Custom customer portals, client portals, student and parent portals, and business dashboards. Secure logins, role-based access, live reports and searchable databases.',
    short: 'Secure access to the data people need',
    intro:
      'A secure portal where customers, students, parents, members or staff log in to see their own information, and a dashboard where you see the whole business at a glance. Built around your data, with access limited to exactly what each person should see.',
    steps: [
      {
        title: 'Map users and data',
        body: 'Who logs in, what each role can see and do, and where the data comes from are defined first.',
      },
      {
        title: 'Design the views',
        body: 'Portal screens and dashboard reports are designed around the questions each user actually asks.',
      },
      {
        title: 'Build and connect',
        body: 'The portal is built and connected to your database, spreadsheets or existing systems, with secure authentication.',
      },
      {
        title: 'Roll out',
        body: 'Accounts are created or invited in bulk, and users get a short guide to logging in.',
      },
    ],
    deliverables: [
      { title: 'Secure login', body: 'Accounts, password reset and optional two-factor authentication.' },
      { title: 'Role-based access', body: 'Each user sees only their own records, while managers see everything they are responsible for.' },
      { title: 'Live dashboards', body: 'KPIs, charts and tables that update from your data in real time.' },
      { title: 'Search and filters', body: 'Fast search across records, listings or documents with filters that match how people look things up.' },
      { title: 'Documents and downloads', body: 'Invoices, reports, results or files people can view and download.' },
      { title: 'Notifications', body: 'Email or WhatsApp alerts when something new is available.' },
    ],
    features: [
      'Client portals',
      'Student and parent portals',
      'Employee portals',
      'KPI and sales dashboards',
      'Property and vehicle listings',
      'Fee and results lookup',
      'CSV and PDF exports',
      'Spreadsheet sync',
    ],
    fit: ['Academies and schools', 'Agencies', 'Estate agents', 'Dealerships'],
    stack: ['React', 'Node', '.NET', 'SQL'],
    faq: [
      {
        q: 'What is a client portal?',
        a: 'A private website where your clients log in to see their projects, invoices, documents or results, instead of asking you by email.',
      },
      {
        q: 'Can the dashboard use data from my existing spreadsheets or software?',
        a: 'Yes. Data can be imported, synced from spreadsheets or pulled from any system that has an API.',
      },
      {
        q: 'Is the portal secure?',
        a: 'Yes. Encrypted connections, hashed passwords, role-based permissions and audit logs are standard.',
      },
    ],
  },
  {
    id: 'admin',
    group: 'Web Apps & Software',
    tag: 'Back office',
    icon: 'dashboard_customize',
    title: 'Admin Panel Development',
    seoTitle: 'Admin Panel Development | Custom CMS & Back Office Dashboards',
    seoDescription:
      'Custom admin panel and CMS development for your website or business. Edit content, manage products, bookings and users yourself, without paying a developer for every change.',
    short: 'So you stop paying a developer for edits',
    intro:
      'A private control panel for your website or business. Edit pages, manage products, bookings and users, and run day-to-day operations yourself, instead of paying a developer every time something needs to change.',
    steps: [
      {
        title: 'Map what changes',
        body: 'Everything you currently ask a developer to change, and every routine task your team does by hand, is listed and prioritised.',
      },
      {
        title: 'Design the panel',
        body: 'Screens are designed for the people who will use them every day, with clear forms, tables and permissions.',
      },
      {
        title: 'Build and connect',
        body: 'The panel is built and connected to your website or database, so a change goes live the moment you save it.',
      },
      {
        title: 'Train and hand over',
        body: 'Your team gets a walkthrough and a short written guide, and staff accounts are set up with the right access.',
      },
    ],
    deliverables: [
      { title: 'Content editing', body: 'Change text, images and pages on your website from simple forms, with drafts before publishing.' },
      { title: 'Record management', body: 'Tables to add, edit, search and filter products, bookings, customers or any records you keep.' },
      { title: 'Staff accounts and roles', body: 'Separate logins for your team, with access limited to what each person needs.' },
      { title: 'Media library', body: 'Upload, organise and reuse images and files across the site.' },
      { title: 'Reports and exports', body: 'Summaries of the numbers you check most often, and CSV exports for everything else.' },
      { title: 'Activity history', body: 'A record of who changed what and when, so nothing goes missing unnoticed.' },
    ],
    features: [
      'Draft and publish',
      'Bulk edits',
      'Approval workflows',
      'Custom forms',
      'Import from spreadsheets',
      'Email notifications',
      'Search across records',
      'Admin for an existing site',
    ],
    fit: ['Teams editing content often', 'Operations-heavy businesses', 'Multi-staff workflows', 'Custom business processes'],
    stack: ['React', 'Node', '.NET', 'SQL'],
    faq: [
      {
        q: 'Can you add an admin panel to my existing website?',
        a: 'Yes. A dashboard can be connected to the site you already have, usually in two to three weeks.',
      },
      {
        q: 'What is the difference between an admin panel and a CMS?',
        a: 'A CMS edits website content. A custom admin panel can do that and also manage products, bookings, users and any business data you keep.',
      },
      {
        q: 'Can different staff have different permissions?',
        a: 'Yes. Each staff account gets a role that limits what they can see and change, and every change is logged.',
      },
    ],
  },
  {
    id: 'pos-inventory',
    group: 'Web Apps & Software',
    tag: 'Retail',
    icon: 'inventory_2',
    preview: 'ecommerce',
    title: 'Retail POS & Inventory Management Software',
    seoTitle: 'Custom POS Software & Inventory Management System for Retail',
    seoDescription:
      'Custom point of sale (POS) and inventory management software for shops, restaurants, pharmacies and wholesalers: billing, stock control, low-stock alerts, suppliers and sales reports.',
    short: 'Billing, stock and suppliers in one system',
    intro:
      'A point of sale and inventory management system built around your counter, your stock and your suppliers. Every sale updates stock in real time, low-stock alerts arrive before the shelf is empty, and billing keeps working even when the internet does not.',
    steps: [
      {
        title: 'Walk the shop floor',
        body: 'How you bill, receive stock, track suppliers and close the day is mapped, including the shortcuts your staff already rely on.',
      },
      {
        title: 'Design the counter',
        body: 'The billing screen is designed for speed: barcode scanning, quick search and as few taps per sale as possible.',
      },
      {
        title: 'Build and import',
        body: 'The system is built and your products, prices and opening stock are imported from spreadsheets or your old software.',
      },
      {
        title: 'Go live',
        body: 'Staff are trained at the counter, the first days are supported closely, and reports are checked against your books.',
      },
    ],
    deliverables: [
      { title: 'POS billing', body: 'Fast counter billing with barcode scanning, discounts, returns and printed or WhatsApp receipts.' },
      { title: 'Inventory management', body: 'Live stock levels across products, variants and locations, updated with every sale and delivery.' },
      { title: 'Low-stock alerts', body: 'Reorder levels per item, with alerts before you run out.' },
      { title: 'Supplier ledgers', body: 'Purchases, payments and balances for every supplier in one place.' },
      { title: 'Sales reports', body: 'Daily closing, profit, best sellers and slow movers, exportable to Excel.' },
      { title: 'Offline mode', body: 'Billing keeps working without internet and syncs when the connection returns.' },
    ],
    features: [
      'Barcode and label printing',
      'Multi-branch stock',
      'Restaurant and kitchen orders',
      'Pharmacy batch and expiry tracking',
      'Customer credit (khata)',
      'Staff shifts and permissions',
      'Purchase orders',
      'Tax invoices and returns',
    ],
    fit: ['Shops and supermarkets', 'Restaurants', 'Pharmacies', 'Wholesale'],
    stack: ['React', 'Node', '.NET', 'SQL'],
    faq: [
      {
        q: 'Why choose custom POS software over an off-the-shelf POS?',
        a: 'Custom POS fits how you already work, has no per-terminal monthly fees and can include features generic systems lack, like supplier ledgers or customer credit.',
      },
      {
        q: 'Does the POS system work offline?',
        a: 'Yes. Billing continues without internet and stock syncs automatically when the connection comes back.',
      },
      {
        q: 'How long does a POS and inventory system take to build?',
        a: 'Typically three to six weeks, including importing your products and training your staff.',
      },
    ],
  },
  {
    id: 'booking-membership',
    group: 'Web Apps & Software',
    tag: 'Scheduling & CRM',
    icon: 'event_available',
    title: 'Booking & Membership Management Software',
    seoTitle: 'Appointment Booking & Membership Software | Gym, Clinic, Salon',
    seoDescription:
      'Online appointment booking and membership management software for clinics, salons, gyms and spas: scheduling, automated reminders, member records, renewals and patient histories.',
    short: 'Appointments, members and records',
    intro:
      'Booking and membership software that replaces paper registers and missed calls. Clients book a slot online, reminders go out on their own, memberships renew on time, and every client or patient history is one search away.',
    steps: [
      {
        title: 'Map your day',
        body: 'Services, staff, rooms, opening hours, membership plans and the records you keep are mapped first.',
      },
      {
        title: 'Design booking and records',
        body: 'The public booking page and the staff calendar are designed so booking takes under a minute on both sides.',
      },
      {
        title: 'Build and migrate',
        body: 'The system is built and your existing clients, members and history are moved over from registers or spreadsheets.',
      },
      {
        title: 'Launch',
        body: 'The booking link goes live on your website and social profiles, and staff are trained on the calendar.',
      },
    ],
    deliverables: [
      { title: 'Online booking', body: 'A booking page where clients pick a service, staff member and time slot, on any device.' },
      { title: 'Staff calendar', body: 'A shared calendar of appointments by staff member and room, with drag-to-reschedule.' },
      { title: 'Automated reminders', body: 'WhatsApp, SMS or email reminders that cut no-shows without anyone chasing.' },
      { title: 'Membership management', body: 'Plans, renewals, expiry alerts, attendance and payment status for every member.' },
      { title: 'Client and patient records', body: 'Histories, notes, visits and documents in one searchable record per person.' },
      { title: 'Payments and invoices', body: 'Deposits, packages and invoices, with outstanding balances tracked.' },
    ],
    features: [
      'Gym membership software',
      'Clinic appointment system',
      'Salon and spa booking',
      'Class and session scheduling',
      'Check-in and attendance',
      'Packages and prepaid sessions',
      'Waitlists',
      'Google Calendar sync',
    ],
    fit: ['Clinics', 'Salons and spas', 'Gyms', 'Academies'],
    stack: ['React', 'Node', '.NET', 'SQL'],
    faq: [
      {
        q: 'Can clients book appointments online 24/7?',
        a: 'Yes. Clients book from your website or a link on WhatsApp and Instagram, and only see slots that are actually free.',
      },
      {
        q: 'Does it send appointment reminders automatically?',
        a: 'Yes. Reminders go out by WhatsApp, SMS or email before each appointment and before a membership expires.',
      },
      {
        q: 'Can you move our existing member records into the system?',
        a: 'Yes. Records from spreadsheets or old software are imported, so you start with your full history.',
      },
    ],
  },

  // ── AI & Creative ─────────────────────────────────────────────────────────
  {
    id: 'ai-voiceover',
    group: 'AI & Creative',
    tag: 'Audio',
    icon: 'record_voice_over',
    title: 'AI Voiceover Services',
    seoTitle: 'AI Voiceover Services | Realistic AI Voice Over for Videos & Ads',
    seoDescription:
      'Realistic AI voiceover for explainer videos, ads, YouTube, reels and product demos. Natural AI voices in multiple accents and languages, directed line by line and delivered mastered.',
    short: 'Natural narration for videos, ads and demos',
    intro:
      'Voiceovers generated from your script with realistic AI voices, then directed line by line for pacing, emphasis and pronunciation, so it sounds read, not recited. Delivered mastered and ready to drop into your edit, in a fraction of the time and cost of a studio session.',
    steps: [
      { title: 'Script', body: 'Your script is polished for spoken delivery: shorter sentences, natural pauses and correct pronunciations.' },
      { title: 'Voice casting', body: 'A shortlist of voices in the tone, gender, accent and language you need is sent for you to pick.' },
      { title: 'Direction', body: 'The voiceover is generated and tuned line by line for pacing, emphasis and emotion.' },
      { title: 'Master and deliver', body: 'Audio is cleaned, levelled and mastered, then timed to your video cuts.' },
    ],
    deliverables: [
      { title: 'Script polish', body: 'Your script rewritten where needed so it sounds natural out loud.' },
      { title: 'Voice options', body: 'A choice of voices, tones and accents, including multilingual versions.' },
      { title: 'Mastered audio', body: 'Broadcast-clean WAV and MP3 files, levelled for social, YouTube and ads.' },
      { title: 'Timed cuts', body: 'Versions timed for 15, 30 and 60 second edits.' },
      { title: 'Revisions', body: 'Line-level fixes for pronunciation, pacing or emphasis.' },
      { title: 'Commercial use', body: 'Audio cleared for use in ads, websites and client work.' },
    ],
    features: [
      'Explainer video voiceover',
      'YouTube narration',
      'Ad and reel voiceover',
      'E-learning and course narration',
      'IVR and phone greetings',
      'Urdu, Arabic and English voices',
      'Character voices',
      'Podcast intros',
    ],
    fit: ['Explainer videos', 'Ads and reels', 'Product demos', 'Online courses'],
    stack: ['AI voice models', 'Script direction', 'Audio mastering', 'Video sync'],
    faq: [
      {
        q: 'Does AI voiceover sound realistic?',
        a: 'Modern AI voices are very natural when they are directed properly. Each line is tuned for pacing and emphasis so it does not sound robotic.',
      },
      {
        q: 'Which languages and accents are available?',
        a: 'English in American, British and other accents, plus Urdu, Arabic, Hindi and many other languages.',
      },
      {
        q: 'Can I use the AI voiceover in commercial ads?',
        a: 'Yes. Every voiceover is delivered cleared for commercial use in ads, websites and client projects.',
      },
    ],
  },
  {
    id: 'ai-image-generation',
    group: 'AI & Creative',
    tag: 'Visuals',
    icon: 'auto_fix_high',
    title: 'AI Image Generation Services',
    seoTitle: 'AI Image Generation Services | AI Product Photos & Brand Visuals',
    seoDescription:
      'Custom AI image generation for brands: AI product photography, lifestyle scenes, social media visuals, ad creatives and website hero images, art-directed and retouched by hand.',
    short: 'Brand visuals instead of stock photos',
    intro:
      'Images generated and art-directed to a consistent style, then retouched and sized for where they will live. Product photos without a photoshoot, lifestyle scenes, ad creatives and hero artwork that look like your brand, not like every other stock photo.',
    steps: [
      { title: 'Brief and style', body: 'Your brand, audience and where the images will be used are turned into a visual style and shot list.' },
      { title: 'Generate', body: 'Images are generated and iterated with AI models until composition, lighting and mood are right.' },
      { title: 'Retouch', body: 'Hands, text, products and details are fixed by hand so nothing looks obviously AI-made.' },
      { title: 'Deliver', body: 'Final images are exported in every size and format you need, with the style system to make more.' },
    ],
    deliverables: [
      { title: 'AI product photography', body: 'Your product placed in realistic studio or lifestyle scenes, no photoshoot needed.' },
      { title: 'Hero imagery', body: 'Art-directed images for website headers, landing pages and banners.' },
      { title: 'Social media visuals', body: 'Post, story and carousel images in a consistent brand style.' },
      { title: 'Ad creatives', body: 'Image variations for testing on Meta, Google and TikTok ads.' },
      { title: 'Style system', body: 'A documented visual style so future images stay on-brand.' },
      { title: 'Web-optimized exports', body: 'Sized and compressed files that keep your pages fast.' },
    ],
    features: [
      'AI product photos',
      'Lifestyle and model shots',
      'Background replacement',
      'Packaging and product mockups',
      'Illustrations and concept art',
      'Thumbnails and banners',
      'Image upscaling',
      'Photo retouching',
    ],
    fit: ['E-commerce stores', 'Social media', 'Product pages', 'Ads'],
    stack: ['AI image models', 'Art direction', 'Retouching', 'Web optimization'],
    faq: [
      {
        q: 'Can AI generate photos of my actual product?',
        a: 'Yes. Your real product is placed into AI-generated scenes, so the product stays accurate while the setting changes.',
      },
      {
        q: 'Will the images look AI-generated?',
        a: 'Every image is retouched by hand to fix hands, text and details, so the final set looks like a real photoshoot.',
      },
      {
        q: 'Can I use AI images commercially?',
        a: 'Yes. Images are delivered for commercial use on your website, social media, ads and packaging.',
      },
    ],
  },
  {
    id: 'ai-logo-brand-kit',
    group: 'AI & Creative',
    tag: 'Identity',
    icon: 'palette',
    title: 'AI Logo Design & Brand Kits',
    seoTitle: 'AI Logo Design & Brand Identity Kits | Logo, Colors & Guidelines',
    seoDescription:
      'AI-assisted logo design and complete brand identity kits: vector logo, color palette, typography, social media assets and brand guidelines. Professional branding for new businesses.',
    short: 'A logo and the brand system around it',
    intro:
      'Logo directions explored with AI, then refined and redrawn by hand as clean vector marks. The chosen logo ships with a complete brand kit, colors, fonts, social assets and guidelines, so every page, post and profile looks like the same company.',
    steps: [
      { title: 'Brand brief', body: 'Your name, audience, competitors and personality are captured in a short brand brief.' },
      { title: 'Explore', body: 'Dozens of logo directions are explored with AI and the strongest are shortlisted for you.' },
      { title: 'Refine', body: 'Your chosen direction is redrawn as a clean, scalable vector logo and tested at every size.' },
      { title: 'Brand kit', body: 'Colors, fonts, social assets and a guideline document are built around the final logo.' },
    ],
    deliverables: [
      { title: 'Vector logo', body: 'Primary logo, icon and wordmark in SVG, PNG, PDF and favicon sizes.' },
      { title: 'Color palette', body: 'Primary and secondary colors with HEX, RGB and CMYK values.' },
      { title: 'Typography', body: 'A font pairing for headings and body text, web-ready.' },
      { title: 'Social media kit', body: 'Profile pictures, cover images and post templates for every platform.' },
      { title: 'Brand guidelines', body: 'A guideline PDF showing how to use the logo, colors and fonts correctly.' },
      { title: 'Stationery', body: 'Business card, letterhead and email signature designs.' },
    ],
    features: [
      'Logo design',
      'Rebranding',
      'Brand style guide',
      'Social media branding',
      'Business card design',
      'Packaging labels',
      'App icons',
      'Brand mockups',
    ],
    fit: ['New businesses', 'Rebrands', 'Product launches', 'Social media'],
    stack: ['AI exploration', 'Vector redraw', 'Typography', 'Brand systems'],
    faq: [
      {
        q: 'Is an AI logo unique and can I trademark it?',
        a: 'AI is used only to explore ideas. The final logo is redrawn by hand as an original vector mark, so it is unique to your business.',
      },
      {
        q: 'What is included in a brand kit?',
        a: 'Logo files, color palette, fonts, social media assets, stationery and a brand guideline document.',
      },
      {
        q: 'What file formats will I get?',
        a: 'SVG, PNG, PDF and favicon files, in color, black and white versions, ready for print and web.',
      },
    ],
  },
  {
    id: '3d-modeling',
    group: 'AI & Creative',
    tag: '3D',
    icon: 'view_in_ar',
    title: '3D Modeling Services',
    seoTitle: '3D Modeling Services | 3D Product Modeling, Rendering & Web 3D',
    seoDescription:
      'Professional 3D modeling and rendering services in Blender: 3D product models, photoreal product renders, interactive 3D viewers and 3D configurators for websites.',
    short: 'Products and scenes, for renders or the web',
    intro:
      'Detailed 3D models built in Blender from your photos, sketches or CAD references. Use them for photoreal product renders, or as lightweight interactive 3D models that customers can spin and explore on your website.',
    steps: [
      { title: 'References', body: 'Photos, sketches, dimensions or CAD files of your product are collected and checked.' },
      { title: 'Model', body: 'The product is modeled in Blender with accurate proportions and clean topology.' },
      { title: 'Materials and lighting', body: 'Realistic textures, materials and studio lighting are set up for renders or real-time use.' },
      { title: 'Render or ship to web', body: 'You get high-resolution renders, an optimized web model, or both.' },
    ],
    deliverables: [
      { title: '3D product model', body: 'An accurate, clean 3D model of your product or object.' },
      { title: 'Photoreal renders', body: 'Studio and lifestyle product renders in high resolution.' },
      { title: 'Web-ready GLB', body: 'Compressed GLB/glTF models that load fast in the browser.' },
      { title: 'Interactive 3D viewer', body: 'A 3D viewer on your site that customers can rotate and zoom.' },
      { title: '360° turntables', body: 'Rotating product animations for pages, ads and social media.' },
      { title: 'Source files', body: 'The original .blend files, so the model can be reused.' },
    ],
    features: [
      '3D product rendering',
      '3D product configurators',
      'Product animations',
      'Architectural visualization',
      'Furniture modeling',
      'AR-ready models',
      'Packaging mockups',
      'Three.js websites',
    ],
    fit: ['Product pages', 'Launch pages', 'Configurators', 'Ads and mockups'],
    stack: ['Blender', 'Three.js', 'glTF / GLB', 'WebGL'],
    faq: [
      {
        q: 'Can you make a 3D model from photos of my product?',
        a: 'Yes. Photos from several angles plus basic dimensions are enough to build an accurate model.',
      },
      {
        q: 'Can the 3D model be shown on my website?',
        a: 'Yes. Models are optimized to load fast and shown in an interactive viewer or a full 3D configurator.',
      },
      {
        q: 'Do I get the source files?',
        a: 'Yes. You receive the .blend source files as well as the GLB and render exports.',
      },
    ],
  },
  {
    id: 'ai-video-generation',
    group: 'AI & Creative',
    tag: 'Motion',
    icon: 'movie',
    title: 'AI Video Generation Services',
    seoTitle: 'AI Video Generation Services | AI Video Ads, Product & Social Videos',
    seoDescription:
      'AI video generation for brands: AI video ads, product videos, reels, TikToks and website hero videos. Generated with AI, then edited with music, captions and voiceover.',
    short: 'Brand films, product clips and social videos',
    intro:
      'Scenes generated with AI video tools, then cut, color-matched and paced into a finished video with music, captions and voiceover. Video ads, product clips and social content built around your product, at a fraction of the cost of a traditional shoot.',
    steps: [
      { title: 'Brief and storyboard', body: 'Your message, platform and length are turned into a script, storyboard and shot list.' },
      { title: 'Generate scenes', body: 'Each shot is generated and iterated with AI video models until motion and style match.' },
      { title: 'Edit', body: 'Shots are cut together, color-matched and paced, with music, sound effects, captions and voiceover.' },
      { title: 'Deliver', body: 'The final video is exported in vertical, square and widescreen versions for every platform.' },
    ],
    deliverables: [
      { title: 'Script and storyboard', body: 'A clear plan for every shot before anything is generated.' },
      { title: 'Finished edit', body: 'An edited video with music, captions, sound design and voiceover.' },
      { title: 'All formats', body: '9:16 for reels and TikTok, 1:1 for feeds and 16:9 for YouTube and websites.' },
      { title: 'Ad variations', body: 'Different hooks and lengths for testing in paid campaigns.' },
      { title: 'Website hero loop', body: 'A short, compressed background video that keeps your page fast.' },
      { title: 'Commercial use', body: 'Video cleared for use in ads, websites and social media.' },
    ],
    features: [
      'AI video ads',
      'Product videos',
      'Instagram reels and TikToks',
      'YouTube intros and shorts',
      'Explainer videos',
      'AI avatar videos',
      'Animated logos',
      'Website background videos',
    ],
    fit: ['Social media', 'Hero backgrounds', 'Product launches', 'Ads'],
    stack: ['AI video models', 'Editing', 'Color grading', 'Motion graphics'],
    faq: [
      {
        q: 'What kind of videos can AI generate?',
        a: 'Product showcases, lifestyle scenes, ads, reels, explainers and cinematic brand films, edited into a finished piece.',
      },
      {
        q: 'How long does an AI video take to make?',
        a: 'A short ad or reel usually takes a few days from storyboard to final edit.',
      },
      {
        q: 'Can you add voiceover and captions?',
        a: 'Yes. Every video can include AI voiceover, music, sound effects and burned-in captions.',
      },
    ],
  },
];

export const servicePath = (id) => `/services/${id}`;
