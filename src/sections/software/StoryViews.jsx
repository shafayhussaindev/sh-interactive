import { useState } from 'react';
import MaterialIcon from '../../components/MaterialIcon';

// The three states of the story's UI window. Every view renders flat and finished, so phones and
// reduced motion read it as-is; on desktop INTROS lift the `js-*` layers out along the Z axis.
// Nothing here uses overflow clipping, because clipping would flatten the 3D layers.

const INVENTORY = [
  ['Basmati rice 5kg', 142, 40],
  ['Cooking oil 3L', 18, 24],
  ['Sugar 1kg', 260, 80],
];

const ROW = 'grid grid-cols-[1fr_56px_92px] items-center gap-2 px-3 sm:grid-cols-[1fr_72px_72px_96px]';

export function StockView() {
  return (
    <div className="relative space-y-4 p-5">
      <div className="flex items-center justify-between">
        <p className="font-semibold">Inventory</p>
        <span className="flex items-center gap-1.5 text-[12px] text-soft">
          <span className="size-1.5 rounded-full bg-ok" />
          Live
        </span>
      </div>
      <div className="js-table layer-3d rounded-lg border border-line bg-surface text-[13px]">
        <div className={`${ROW} rounded-t-lg bg-deep py-2 font-mono text-[11px] text-muted`}>
          <span>Item</span>
          <span className="text-right">In stock</span>
          <span className="hidden text-right sm:block">Reorder</span>
          <span className="text-right">Status</span>
        </div>
        {INVENTORY.map(([item, qty, reorder]) => {
          const low = qty < reorder;
          return (
            <div
              key={item}
              className={`${ROW} border-t border-line py-2.5 ${low ? 'js-pop layer-3d rounded-lg bg-surface' : ''}`}
            >
              <span className="truncate">{item}</span>
              <span className={`text-right font-mono tabular-nums ${low ? 'js-oil text-warn' : ''}`}>{qty}</span>
              <span className="hidden text-right font-mono tabular-nums text-muted sm:block">{reorder}</span>
              <span className="text-right">
                {low ? (
                  <span className="js-warn layer-3d inline-flex items-center gap-1 rounded-full bg-warn-tint px-2 py-0.5 text-[11px] font-medium text-warn">
                    <MaterialIcon name="warning" size={12} />
                    Low stock
                  </span>
                ) : (
                  <span className="text-[12px] text-muted">OK</span>
                )}
              </span>
            </div>
          );
        })}
      </div>
      <div className="js-receipt layer-3d ml-auto w-64 rounded-xl border border-line bg-wa-tint p-3 text-[12px] lg:absolute lg:-bottom-10 lg:-right-16">
        <p className="flex items-center gap-1.5 font-medium text-wa">
          <MaterialIcon name="chat" size={14} />
          WhatsApp receipt sent
        </p>
        <div className="mt-2 space-y-0.5 font-mono text-[11px] text-soft">
          <p className="text-ink">Receipt #1042</p>
          <p className="flex justify-between">
            <span>2 × Cooking oil 3L</span>
            <span>Rs 3,600</span>
          </p>
          <p className="flex justify-between border-t border-line pt-1 text-ink">
            <span>Total</span>
            <span>Rs 3,600</span>
          </p>
        </div>
        <p className="mt-1 text-right font-mono text-[11px] text-wa">Delivered ✓✓</p>
      </div>
    </div>
  );
}

const DAY = [
  ['09:00', 'Ayesha Khan', 'Consultation', 'Reminder sent'],
  ['09:30', null],
  ['10:00', 'Daniel Brooks', 'Follow-up', 'SMS confirmed'],
  ['10:30', 'Mariam Ali', 'Treatment', null],
  ['11:00', null],
  ['11:30', 'Tom Fletcher', 'Consultation', 'Reminder sent'],
];

export function BookingsView() {
  return (
    <div className="space-y-4 p-5">
      <div className="flex items-center justify-between">
        <p className="font-semibold">Tuesday</p>
        <span className="font-mono text-[12px] text-soft">4 booked · 2 open</span>
      </div>
      <ol className="space-y-1.5">
        {DAY.map(([time, name, service, badge]) => (
          <li key={time} className="grid grid-cols-[48px_1fr] items-center gap-3">
            <span className="font-mono text-[12px] tabular-nums text-muted">{time}</span>
            {name ? (
              <div className="js-slot layer-3d flex items-center justify-between gap-2 rounded-lg border border-line border-l-2 border-l-accent bg-surface px-3 py-2 text-[13px]">
                <span className="truncate">
                  <span className="font-medium">{name}</span>
                  <span className="text-soft"> · {service}</span>
                </span>
                {badge && (
                  <span className="js-reminder layer-3d shrink-0 rounded-full bg-tint px-2 py-0.5 text-[11px] font-medium text-accent">
                    {badge}
                  </span>
                )}
              </div>
            ) : (
              <div className="h-9 rounded-lg border border-dashed border-line" />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

const LISTINGS = [
  { name: 'Basmati rice 5kg', old: '1,950', price: '2,100', live: true },
  { name: 'Cooking oil 3L', price: '1,800', live: true },
  { name: 'Green tea 950g', price: '1,250', live: false },
];

function RoleChip({ children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-line bg-surface px-2 py-0.5 font-mono text-[11px] text-soft">
      <MaterialIcon name="person" size={12} />
      {children}
    </span>
  );
}

export function AdminView() {
  const [live, setLive] = useState(LISTINGS.map((l) => l.live));
  const toggle = (i) => setLive((prev) => prev.map((v, j) => (j === i ? !v : v)));

  return (
    <div className="relative p-5">
      {/* Pane 1: the owner's admin view. */}
      <div className="js-pane-admin layer-3d space-y-3">
        <div className="flex items-center justify-between gap-2">
          <RoleChip>Role · Admin</RoleChip>
          <span className="js-published layer-3d inline-flex items-center gap-1 rounded-full bg-tint px-2 py-0.5 text-[11px] font-medium text-accent">
            <MaterialIcon name="check" size={12} />
            Published · just now
          </span>
        </div>
        {LISTINGS.map((l, i) => (
          <div key={l.name} className="flex items-center gap-3 rounded-lg border border-line bg-surface px-3 py-2 text-[13px]">
            <span className="flex-1 truncate">{l.name}</span>
            <span className="font-mono tabular-nums">
              {l.old && <span className="js-old mr-1.5 text-muted line-through">Rs {l.old}</span>}
              <span className={l.old ? 'js-new rounded bg-tint px-1 text-accent' : ''}>Rs {l.price}</span>
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={live[i]}
              aria-label={`Show ${l.name} on the website`}
              onClick={() => toggle(i)}
              className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${live[i] ? 'bg-accent' : 'bg-strong'}`}
            >
              <span
                className={`absolute left-0.5 top-0.5 size-4 rounded-full bg-white shadow transition-transform ${live[i] ? 'translate-x-4' : ''}`}
              />
            </button>
          </div>
        ))}
        <div className="rounded-lg border border-line bg-deep p-3">
          <p className="font-mono text-[11px] text-muted">yourshop.com · updates as you switch</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {LISTINGS.map((l, i) =>
              live[i] ? (
                <li key={l.name} className="rounded-md bg-surface px-2 py-1 text-[12px]">
                  {l.name} · <span className={`font-mono font-medium ${l.old ? 'js-site-price' : ''}`}>Rs {l.price}</span>
                </li>
              ) : null,
            )}
          </ul>
        </div>
      </div>

      {/* Pane 2: what a parent sees in their portal, layered in front on desktop as a glass pane. */}
      <div className="js-pane-portal glass layer-3d mt-4 w-full rounded-xl p-4 shadow-[var(--shadow-float)] lg:absolute lg:-bottom-12 lg:-right-14 lg:mt-0 lg:w-64">
        <RoleChip>Role · Parent</RoleChip>
        <p className="mt-3 text-[13px] font-semibold">Hamza · Grade 7</p>
        <dl className="mt-2 space-y-1.5 text-[12px]">
          <div className="flex justify-between">
            <dt className="text-soft">Fees due</dt>
            <dd className="font-mono tabular-nums">Rs 12,500</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-soft">Term 2 results</dt>
            <dd className="text-ok">Published</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-soft">Attendance</dt>
            <dd className="font-mono tabular-nums">96%</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export const VIEWS = { stock: StockView, bookings: BookingsView, admin: AdminView };
export const VIEW_LABELS = { stock: 'inventory', bookings: 'bookings', admin: 'admin' };

// Per-view dashboard angle (degrees). Admin turns further so its stacked panes read as layers.
export const ANGLES = {
  stock: { rotationY: -12, rotationX: 4 },
  bookings: { rotationY: -12, rotationX: 4 },
  admin: { rotationY: -22, rotationX: 6 },
};

const LIFT = '0 26px 44px -18px rgba(16, 24, 40, 0.35)';
const SPRING = 'brand'; // no overshoot: settles like the rest of the site

// Desktop entrances: layers rise along Z with deepening shadows. `q` is a scoped selector.
export const INTROS = {
  stock: (gsap, q) => {
    const oil = q('.js-oil')[0];
    const counter = { v: 26 };
    gsap
      .timeline()
      // Tilt the table toward the viewer (top edge forward) so no part of it sinks behind the window surface.
      .to(q('.js-table'), { rotationX: -8, z: 14, transformOrigin: '50% 100%', duration: 0.7, ease: 'brand' }, 0)
      .to(counter, { v: 18, duration: 0.9, ease: 'power2.inOut', snap: { v: 1 }, onUpdate: () => (oil.textContent = counter.v) }, 0.1)
      .to(q('.js-pop'), { z: 70, boxShadow: LIFT, duration: 0.7, ease: 'brand' }, 0.7)
      .fromTo(q('.js-warn'), { z: 0, scale: 0.5, autoAlpha: 0 }, { z: 30, scale: 1, autoAlpha: 1, duration: 0.6, ease: SPRING }, 0.95)
      .fromTo(
        q('.js-receipt'),
        { x: -40, z: 0, rotationY: 0, autoAlpha: 0 },
        { x: 0, z: 80, rotationY: 10, autoAlpha: 1, boxShadow: LIFT, duration: 0.8, ease: 'brand' },
        1.1,
      );
  },
  bookings: (gsap, q) => {
    gsap
      .timeline()
      .fromTo(q('.js-slot'), { z: 0, autoAlpha: 0 }, { z: 40, autoAlpha: 1, boxShadow: LIFT, duration: 0.9, ease: SPRING, stagger: 0.12 })
      .fromTo(q('.js-reminder'), { z: 0, scale: 0.4 }, { z: 50, scale: 1, duration: 0.8, ease: SPRING, stagger: 0.1 }, 0.5);
  },
  admin: (gsap, q) => {
    gsap
      .timeline()
      .fromTo(q('.js-new'), { y: 6, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.35, ease: 'brand' }, 0.3)
      .fromTo(q('.js-site-price'), { backgroundColor: 'var(--accent-tint)' }, { backgroundColor: 'transparent', duration: 1 }, 0.6)
      .fromTo(q('.js-published'), { z: 0, scale: 0.5, autoAlpha: 0 }, { z: 40, scale: 1, autoAlpha: 1, duration: 0.7, ease: SPRING }, 0.7)
      .fromTo(
        q('.js-pane-portal'),
        { z: 0, x: -50, autoAlpha: 0 },
        { z: 90, x: 0, autoAlpha: 1, boxShadow: LIFT, duration: 0.9, ease: 'brand' },
        0.4,
      );
  },
};
