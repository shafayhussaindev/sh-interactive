// Each service has its own page at /services/<id> (routed in src/App.jsx, rendered by src/pages/ServicePage.jsx).
export const SERVICES = [
  {
    id: 'websites',
    tag: 'Core',
    title: 'Custom Website Development',
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
      'Campaign landing pages',
      'Multi-page business sites',
      'Blog or news section',
      'Portfolio and galleries',
      'Booking and enquiry forms',
      'Maps and reviews embeds',
      'Multilingual pages',
      'WhatsApp chat button',
    ],
    fit: ['Service businesses', 'Clinics and studios', 'Startups launching', 'Brands outgrowing a template'],
    stack: ['React', 'Vite', 'Tailwind CSS', 'GSAP'],
  },
  {
    id: 'web-apps',
    tag: 'Software',
    title: 'Web Apps, Portals & Dashboards',
    short: 'Software with a login in front of it',
    intro:
      'Software that runs in the browser behind a login: client portals, booking systems, internal tools and SaaS dashboards. Built to replace spreadsheets, email chains and manual steps with one system your team and customers actually use.',
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
      'Client portals',
      'Booking and scheduling',
      'Invoicing and payments',
      'File uploads',
      'Email notifications',
      'Audit logs',
      'Multi-tenant SaaS',
      'Data import and export',
    ],
    fit: ['Client portals', 'Booking systems', 'Internal tools', 'SaaS products'],
    stack: ['React', 'Node', '.NET', 'SQL'],
  },
  {
    id: 'ecommerce',
    tag: 'Commerce',
    title: 'E-commerce & Ordering',
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
      'Discount codes',
      'Delivery zones and fees',
      'Low-stock alerts',
      'Customer accounts',
      'Order tracking page',
      'Printable invoices',
      'Bulk product import',
    ],
    fit: ['Retail brands', 'Restaurants and food', 'Local shops going online', 'Wholesale ordering'],
    stack: ['React', 'Node', 'SQL', 'Payment gateways'],
  },
  {
    id: 'admin',
    tag: 'Back office',
    title: 'Admin Panels & Dedicated Software',
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
    ],
    fit: ['Teams editing content often', 'Operations-heavy businesses', 'Multi-staff workflows', 'Custom business processes'],
    stack: ['React', 'Node', '.NET', 'SQL'],
  },
];

export const servicePath = (id) => `/services/${id}`;
