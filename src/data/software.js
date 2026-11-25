// Business software on /software.

// The three-step scroll story; each step morphs the pinned UI window into its view.
export const STORY = [
  {
    view: 'stock',
    eyebrow: '01 · Retail & Stock',
    title: 'Know you are running low before the shelf is empty',
    body: 'Every sale updates stock in real time. When an item drops below its reorder level you get an alert, and the customer gets their receipt on WhatsApp.',
  },
  {
    view: 'bookings',
    eyebrow: '02 · Bookings & Records',
    title: 'A day that fills itself in',
    body: 'Clients book a slot, it lands on the timeline, and reminders go out on their own, so the diary stays accurate without anyone chasing it.',
  },
  {
    view: 'admin',
    eyebrow: '03 · Portals & Admin',
    title: 'Change prices and listings yourself, live',
    body: 'A private admin panel where a price edit or a listing toggle goes live on your site the moment you save. No developer, no code.',
  },
];

// The four consolidated cards. Order matters: desktop reads wide + narrow, then narrow + wide.
export const SOFTWARE = [
  {
    id: 'retail',
    icon: 'inventory_2',
    tag: 'Most requested',
    title: 'Retail, POS & Inventory',
    body: 'Live stock counts, supplier ledgers, counter billing that works offline, and digital or kitchen order tracking in one system.',
    fit: ['Shops', 'Restaurants', 'Pharmacies', 'Wholesale'],
    weeks: [3, 6],
    wide: true,
    preview: true,
  },
  {
    id: 'bookings',
    icon: 'event_available',
    tag: 'Scheduling & CRM',
    title: 'Bookings, Memberships & Records',
    body: 'Slot scheduling, automated reminders, expiry tracking, and centralized client or patient histories instead of scattered registers.',
    fit: ['Clinics', 'Salons', 'Gyms', 'Spas'],
    weeks: [2, 6],
  },
  {
    id: 'portals',
    icon: 'manage_search',
    tag: 'Databases & Access',
    title: 'Portals & Searchable Catalogues',
    body: 'Custom databases with role-based access, whether parents checking fees and results or buyers filtering property and vehicle listings.',
    fit: ['Academies', 'Institutes', 'Estate Agents', 'Dealerships'],
    weeks: [4, 8],
  },
  {
    id: 'admin-only',
    icon: 'dashboard_customize',
    tag: 'For an existing site',
    title: 'Admin Panel Only',
    body: 'A clean dashboard bolted onto the website you already have, so you can edit content and manage data yourself instead of messaging a developer.',
    fit: ['Already have a website'],
    weeks: [2, 3],
    wide: true,
  },
];
