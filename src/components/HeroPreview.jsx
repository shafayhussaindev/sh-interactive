import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DOMAIN = 'portal.northside-clinic.com';

const NAV = ['Overview', 'Bookings', 'Patients', 'Billing', 'Reports', 'Settings'];

const STATS = [
  { key: 'booked', label: 'Booked this week', value: 86 },
  { key: 'pending', label: 'Pending', value: 7 },
  { key: 'util', label: 'Utilisation', value: 82, suffix: '%' },
  { key: 'noshow', label: 'No-shows', value: 3 },
];

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const LINE = '0,92 50,78 100,84 150,58 200,62 250,36 300,28';

const ROWS = [
  ['09:00', 'Ayesha Khan', 'Consultation', 'Confirmed'],
  ['09:30', 'Daniel Brooks', 'Follow-up', 'Confirmed'],
  ['10:15', 'Mariam Ali', 'Consultation', 'Pending'],
  ['11:00', 'Tom Fletcher', 'Treatment', 'Confirmed'],
];

// Bookings that "arrive" while the hero is on screen, one every few seconds.
const INCOMING = [
  ['11:45', 'Sara Malik', 'Follow-up', 'Confirmed'],
  ['12:30', 'Bilal Ahmed', 'Consultation', 'Pending'],
  ['13:15', 'Emma Clarke', 'Treatment', 'Confirmed'],
  ['14:00', 'Hassan Raza', 'Follow-up', 'Confirmed'],
  ['14:45', 'Zoe Turner', 'Consultation', 'Confirmed'],
  ['15:30', 'Omar Siddiqui', 'Treatment', 'Pending'],
];
const ARRIVAL_MS = 7000;

// Syntax-coloured tokens: [text, colour class].
const K = 'text-[var(--code-key)]';
const F = 'text-[var(--code-fn)]';
const S = 'text-[var(--code-str)]';
const N = 'text-[var(--code-num)]';
const T = 'text-panel-text';
const CODE = [
  [['export async function ', K], ['createBooking', F], ['(req, res) {', T]],
  [['  const ', K], ['slot = ', T], ['await ', K], ['db.slots.', T], ['lock', F], ['(req.body.slotId);', T]],
  [['  if ', K], ['(!slot) ', T], ['return ', K], ['res.', T], ['status', F], ['(', T], ['409', N], [');', T]],
  [['  const ', K], ['booking = ', T], ['await ', K], ['db.bookings.', T], ['insert', F], ['(req.body);', T]],
  [['  await ', K], ['notify.', T], ['sms', F], ['(booking.phone, ', T], ["'confirmed'", S], [');', T]],
  [['  return ', K], ['res.', T], ['status', F], ['(', T], ['201', N], [').', T], ['json', F], ['(booking);', T]],
  [['}', T]],
];

const LOG = [
  ['✓', 'build passed', '41s'],
  ['✓', 'tests', '128 passed'],
  ['✓', 'migrations', '3 applied'],
];

// The hero's product moment: the clinic portal, the code behind it and the deploy that shipped it,
// animated once on load (chart draws, counters run, code types, deploy goes live).
export default function HeroPreview() {
  const root = useRef(null);
  const [rows, setRows] = useState(() => ROWS.map((row, id) => ({ id, row })));
  const [toast, setToast] = useState(null);

  // Live loop: a new booking lands in the table, its counter ticks and a notification shows.
  // Runs only while the hero is visible and the tab is in front.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = root.current;
    let n = 0;
    let timer = null;
    let onScreen = true;

    const bump = (key) => {
      const node = el.querySelector(`[data-stat="${key}"]`);
      node.textContent = Number.parseInt(node.textContent, 10) + 1;
      gsap.fromTo(node, { y: -6, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4, ease: 'brand' });
    };
    const arrive = () => {
      const row = INCOMING[n % INCOMING.length];
      const id = ROWS.length + n;
      n += 1;
      setRows((prev) => [...prev.slice(-(ROWS.length - 1)), { id, row, fresh: true }]);
      setToast({ id, name: row[1], time: row[0] });
      bump(row[3] === 'Confirmed' ? 'booked' : 'pending');
    };
    const sync = () => {
      if (onScreen && !document.hidden) timer ??= setInterval(arrive, ARRIVAL_MS);
      else {
        clearInterval(timer);
        timer = null;
      }
    };
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    io.observe(el);
    document.addEventListener('visibilitychange', sync);
    return () => {
      clearInterval(timer);
      io.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  useEffect(() => {
    const el = root.current;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(el);
      const tl = gsap.timeline({ delay: 0.6, defaults: { ease: 'brand' } });

      tl.fromTo(
        q('.chart'),
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.4, ease: 'power2.inOut' },
        0,
      );

      q('[data-count]').forEach((node) => {
        const end = Number(node.dataset.count);
        const counter = { v: 0 };
        tl.to(
          counter,
          {
            v: end,
            duration: 1.2,
            snap: { v: 1 },
            onUpdate: () => (node.textContent = counter.v + (node.dataset.suffix || '')),
          },
          0,
        );
      });

      tl.fromTo(
        q('.code-line'),
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 0.32, ease: 'steps(14)', stagger: 0.2 },
        0.4,
      )
        .fromTo(q('.log-line'), { autoAlpha: 0, y: 4 }, { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.35 }, '>-0.1')
        .fromTo(q('.deploy-pending'), { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.2 }, '>0.2')
        .fromTo(q('.deploy-live'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, '<');

      // Depth: the floating panels drift up a little faster than the dashboard as the hero scrolls away.
      const depth = { trigger: el, start: 'top 60%', end: 'bottom top', scrub: true };
      gsap.to(q('.depth-near'), { y: -30, ease: 'none', scrollTrigger: depth });
      gsap.to(q('.depth-mid'), { y: -18, ease: 'none', scrollTrigger: depth });
    });
    return () => mm.revert();
  }, []);

  return (
    <div
      ref={root}
      role="img"
      aria-label="A clinic booking portal with this week's bookings chart and today's appointments, the API code behind it, and the deploy log that put it live"
      className="hero-in relative pb-28 lg:pb-20"
    >
      {/* App window */}
      <div className="relative overflow-hidden rounded-xl border border-line bg-surface shadow-[var(--shadow-float)]">
        {toast && (
          <p
            key={toast.id}
            className="toast absolute bottom-3 right-3 z-10 flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-[12px] shadow-[var(--shadow-float)]"
          >
            <span className="led size-1.5 rounded-full bg-ok" />
            <span className="font-medium">New booking</span>
            <span className="text-soft">
              {toast.name} · {toast.time}
            </span>
          </p>
        )}
        <div className="flex h-10 items-center gap-4 border-b border-line bg-deep px-4">
          <span className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-strong" />
            <span className="size-2.5 rounded-full bg-strong" />
            <span className="size-2.5 rounded-full bg-strong" />
          </span>
          <span className="label mx-auto truncate rounded-md border border-line bg-surface px-3 py-0.5">
            {DOMAIN}/bookings
          </span>
        </div>

        <div className="grid md:grid-cols-[176px_1fr]">
          <aside className="hidden border-r border-line p-3 md:block">
            <div className="flex items-center gap-2 px-2 py-1.5">
              <span className="grid size-6 place-items-center rounded-md bg-ink text-[11px] font-semibold text-white">N</span>
              <span className="text-sm font-medium">Northside Clinic</span>
            </div>
            <ul className="mt-4 space-y-0.5 text-sm">
              {NAV.map((item) => (
                <li
                  key={item}
                  className={`rounded-md px-2 py-1.5 ${item === 'Bookings' ? 'bg-deep font-medium text-ink' : 'text-soft'}`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </aside>

          <div className="min-w-0 p-4 md:p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-base font-semibold">Bookings</p>
              <div className="flex items-center gap-2">
                <span className="hidden rounded-md border border-line p-0.5 text-[12px] sm:flex">
                  <span className="rounded px-2 py-0.5 text-soft">Day</span>
                  <span className="rounded bg-deep px-2 py-0.5 font-medium">Week</span>
                  <span className="rounded px-2 py-0.5 text-soft">Month</span>
                </span>
                <span className="rounded-md bg-accent px-2.5 py-1 text-[12px] font-medium text-white">New booking</span>
              </div>
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-lg border border-line px-3 py-2.5">
                  <dt className="label truncate">{s.label}</dt>
                  <dd
                    data-stat={s.key}
                    data-count={s.value}
                    data-suffix={s.suffix}
                    className="mt-1 text-xl font-semibold tabular-nums tracking-[-0.02em]"
                  >
                    {s.value}
                    {s.suffix}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-3 rounded-lg border border-line p-3">
              <div className="flex items-baseline justify-between">
                <p className="text-[13px] font-medium">Bookings per day</p>
                <p className="label">This week</p>
              </div>
              <svg viewBox="0 0 300 100" preserveAspectRatio="none" className="chart mt-2 h-24 w-full" aria-hidden="true">
                {[25, 50, 75].map((y) => (
                  <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="var(--border-subtle)" vectorEffect="non-scaling-stroke" />
                ))}
                <polygon points={`${LINE} 300,100 0,100`} fill="var(--accent-primary)" fillOpacity="0.07" />
                <polyline
                  points={LINE}
                  fill="none"
                  stroke="var(--accent-primary)"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <div className="mt-1 grid grid-cols-7 font-mono text-[11px] text-muted">
                {DAYS.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
            </div>

            <ul className="mt-3 divide-y divide-line">
              {rows.map(({ id, row: [time, name, service, status], fresh }, i) => (
                <li
                  key={id}
                  className={`${i < rows.length - 2 ? 'hidden sm:grid' : 'grid'} ${fresh ? 'row-in' : ''} h-10 grid-cols-[44px_1fr_auto] items-center gap-3 text-[13px] sm:grid-cols-[44px_1fr_104px_92px]`}
                >
                  <span className="font-mono text-[12px] tabular-nums text-muted">{time}</span>
                  <span className="truncate font-medium">{name}</span>
                  <span className="hidden truncate text-soft sm:block">{service}</span>
                  <span className="flex items-center gap-2 text-soft">
                    <span className={`led size-1.5 rounded-full ${status === 'Confirmed' ? 'bg-ok' : 'bg-strong'}`} />
                    {status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Code editor */}
      <div className="depth-near panel absolute -left-10 bottom-0 hidden w-[430px] overflow-hidden rounded-xl shadow-[var(--shadow-float)] xl:block">
        <div className="flex h-9 items-center gap-2 border-b border-panel-line bg-panel-raised px-3 text-[12px] text-panel-muted">
          <span className="rounded-md bg-panel px-2 py-0.5 text-panel-text">bookings.controller.js</span>
          <span>routes.js</span>
        </div>
        <pre className="px-4 py-3 text-[12px] leading-[22px]">
          {CODE.map((tokens, i) => (
            <div key={i} className="flex">
              <span className="w-6 shrink-0 select-none text-panel-muted/60">{i + 1}</span>
              <span className="code-line whitespace-pre">
                {tokens.map(([text, cls], j) => (
                  <span key={j} className={cls}>
                    {text}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </pre>
      </div>

      {/* Deploy terminal */}
      <div className="depth-mid panel absolute bottom-0 right-4 w-[min(320px,88%)] overflow-hidden rounded-xl shadow-[var(--shadow-float)] lg:-right-6">
        <div className="flex h-9 items-center justify-between border-b border-panel-line bg-panel-raised px-3 text-[12px]">
          <span className="text-panel-muted">deploy · production</span>
          <span className="relative">
            <span className="deploy-pending text-panel-muted invisible">Deploying…</span>
            <span className="deploy-live absolute right-0 top-0 flex items-center gap-1.5 whitespace-nowrap text-[var(--code-ok)]">
              <span className="size-1.5 rounded-full bg-[var(--code-ok)]" />
              Live
            </span>
          </span>
        </div>
        <div className="px-4 py-3 text-[12px] leading-6">
          <p className="text-panel-muted">$ npm run deploy</p>
          {LOG.map(([mark, step, detail]) => (
            <p key={step} className="log-line grid grid-cols-[16px_1fr_auto] gap-2">
              <span className="text-[var(--code-ok)]">{mark}</span>
              <span>{step}</span>
              <span className="text-panel-muted">{detail}</span>
            </p>
          ))}
          <p className="log-line grid grid-cols-[16px_auto_1fr] gap-2">
            <span className="text-[var(--code-num)]">→</span>
            <span>live</span>
            <span className="truncate text-right text-[var(--code-num)]">{DOMAIN}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
