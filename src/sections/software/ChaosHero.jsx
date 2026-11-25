import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MaterialIcon from '../../components/MaterialIcon';

gsap.registerPlugin(ScrollTrigger);

function Ledger() {
  const rows = [
    ['12/3', 'Ahmed', '2 ctn oil', '4,500', true],
    ['12/3', 'Sana', 'Rice 5kg', '1,950', false],
    ['13/3', '??', 'Sugar', '800', true],
    ['13/3', 'Bilal', 'Tea', '—', false],
  ];
  return (
    <div className="w-72 rounded-md border border-line bg-surface p-4 font-mono text-[11px] leading-5 text-soft">
      <p className="mb-2 border-b border-line pb-1 text-[12px] text-ink">Ledger · March</p>
      {rows.map(([date, who, item, amt, crossed], i) => (
        <p
          key={i}
          className={`grid grid-cols-[34px_40px_1fr_40px] gap-1.5 border-b border-dashed border-line ${crossed ? 'line-through decoration-warn/60' : ''}`}
        >
          <span>{date}</span>
          <span>{who}</span>
          <span className="truncate">{item}</span>
          <span>{amt}</span>
        </p>
      ))}
    </div>
  );
}

function MissedChat() {
  return (
    <div className="w-60 rounded-xl border border-line bg-surface p-3 text-[12px]">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-medium text-wa">
          <MaterialIcon name="chat" size={14} />
          WhatsApp
        </span>
        <span className="rounded-full bg-warn-tint px-2 py-0.5 text-[11px] font-medium text-warn">3 unread</span>
      </div>
      <p className="mt-2 rounded-lg rounded-tl-sm bg-deep px-3 py-2 leading-snug text-ink">
        Can you send 2 cartons of cooking oil by 5?
      </p>
      <p className="mt-1 text-right font-mono text-[11px] text-muted">11:42 · ✓✓</p>
    </div>
  );
}

function StickyNote() {
  return (
    <div className="w-44 bg-note p-4 text-[13px] leading-snug text-ink">
      Oil running low!! Order before Tue. Ask supplier about the old bill.
    </div>
  );
}

function Receipt() {
  return (
    <div className="w-44 border border-line bg-surface px-3 py-3 font-mono text-[11px] leading-5 text-soft">
      <p className="text-center text-ink">CASH MEMO</p>
      <p className="mt-1 flex justify-between border-t border-dashed border-line pt-1">
        <span>Oil 3L ×2</span>
        <span>3,600</span>
      </p>
      <p className="flex justify-between">
        <span>Rice 5kg</span>
        <span>1,950</span>
      </p>
      <p className="flex justify-between border-t border-dashed border-line pt-1 text-ink">
        <span>Total</span>
        <span>5,550?</span>
      </p>
    </div>
  );
}

function Diary() {
  return (
    <div className="w-52 rounded-md border border-line bg-surface p-3 font-mono text-[11px] leading-5 text-soft">
      <p className="text-[12px] text-ink">Tue appointments</p>
      <p>10:00 Sara?</p>
      <p className="line-through">10:30 Omar</p>
      <p>10:30 Omar → 11?</p>
      <p className="text-warn">!! double booked 12:00</p>
    </div>
  );
}

// Each card hangs at its own depth and angle; scrolling the pinned hero flattens them into one frame.
const CARDS = [
  { Card: Ledger, x: -150, y: -80, z: -150, rx: 14, ry: 22, rz: -6 },
  { Card: MissedChat, x: 150, y: -110, z: 60, rx: -10, ry: -18, rz: 4 },
  { Card: Diary, x: 10, y: 0, z: -110, rx: 18, ry: 6, rz: 3 },
  { Card: Receipt, x: 160, y: 100, z: -40, rx: -14, ry: -20, rz: 7 },
  { Card: StickyNote, x: -120, y: 105, z: 120, rx: 8, ry: 14, rz: -8 },
];

export default function ChaosHero() {
  const section = useRef(null);
  const stage = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      { desktop: '(min-width: 1024px)', motion: '(prefers-reduced-motion: no-preference)', hover: '(hover: hover)' },
      ({ conditions: { desktop, motion, hover } }) => {
        const q = gsap.utils.selector(stage.current);
        const cards = q('.chaos-card');
        const frame = q('.chaos-frame')[0];
        const spread = desktop ? 1 : 0.55;

        // Place every card at its depth and angle (phones keep the depth at a tighter spread).
        cards.forEach((card, i) => {
          const c = CARDS[i];
          gsap.set(card, {
            xPercent: -50,
            yPercent: -50,
            x: c.x * spread,
            y: c.y * spread,
            z: motion ? c.z * spread : 0,
            rotationX: motion ? c.rx : 0,
            rotationY: motion ? c.ry : 0,
            rotation: motion ? c.rz : 0,
          });
        });
        gsap.set(frame, { xPercent: -50, yPercent: -50, z: -60, scale: 0.9, autoAlpha: 0 });
        if (!motion) return;

        // Idle float: each card bobs on its own slow, offset rhythm.
        q('.chaos-float').forEach((el, i) =>
          gsap.to(el, {
            y: i % 2 ? 9 : -9,
            rotation: i % 2 ? 1.2 : -1.2,
            duration: 3 + i * 0.4,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          }),
        );

        if (desktop) {
          // Converge: the hero pins while every card rotates flat and flies into one unified frame.
          gsap
            .timeline({
              scrollTrigger: { trigger: section.current, start: 'top top', end: '+=90%', pin: true, scrub: 0.8 },
            })
            .to(
              cards,
              { x: 0, y: 0, z: 0, rotationX: 0, rotationY: 0, rotation: 0, scale: 0.62, ease: 'power2.inOut', stagger: 0.04 },
              0,
            )
            .to(cards, { autoAlpha: 0, duration: 0.25, stagger: 0.03 }, 0.65)
            .to(frame, { autoAlpha: 1, z: 0, scale: 1, duration: 0.4, ease: 'power2.out' }, 0.55);
        } else {
          // Phones: no pinning; the cards rise out of depth as they enter.
          gsap.from(cards, { z: -160, rotationX: 24, autoAlpha: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08, delay: 0.3 });
        }

        // Mouse tilt: the whole 3D stage leans toward the pointer.
        if (!hover) return;
        const rx = gsap.quickTo(stage.current, 'rotationX', { duration: 0.9, ease: 'power3' });
        const ry = gsap.quickTo(stage.current, 'rotationY', { duration: 0.9, ease: 'power3' });
        const onMove = (e) => {
          ry((e.clientX / window.innerWidth - 0.5) * 16);
          rx(-(e.clientY / window.innerHeight - 0.5) * 12);
        };
        window.addEventListener('pointermove', onMove, { passive: true });
        return () => window.removeEventListener('pointermove', onMove);
      },
    );
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={section}
      id="top"
      className="overflow-hidden px-4 pb-24 pt-32 md:px-6 md:pt-40 lg:flex lg:min-h-svh lg:items-center lg:pb-16"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div>
          <p className="hero-in eyebrow">Business software</p>
          <h1 className="hero-in mt-4 text-[clamp(2.75rem,5.4vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-balance">
            Stop running your business out of four registers.
          </h1>
          <p className="hero-in mt-6 max-w-[34rem] text-lg text-soft">
            Paper ledgers, missed WhatsApp orders and sticky notes, replaced by one system built around how you
            actually work. Real systems, not templates with the logo swapped.
          </p>
          <div className="hero-in mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="btn btn-primary">
              Start a project
              <MaterialIcon name="arrow_outward" size={18} />
            </a>
            <a href="#story" className="btn btn-secondary">
              See how it works
            </a>
          </div>
        </div>

        <div aria-hidden="true" className="hero-in relative h-[320px] sm:h-[440px]">
          {/* Perspective lives on this wrapper, which also shrinks the cluster to fit small screens. */}
          <div className="stage-3d absolute inset-0 max-sm:scale-[0.68]">
          <div ref={stage} className="space-3d absolute inset-0">
            {/* The unified frame every card converges into. */}
            <div className="chaos-frame layer-3d absolute left-1/2 top-1/2 w-[340px] rounded-xl border border-line bg-surface shadow-[var(--shadow-float)]">
              <div className="flex h-9 items-center gap-1.5 rounded-t-xl border-b border-line bg-deep px-3">
                <span className="size-2 rounded-full bg-strong" />
                <span className="size-2 rounded-full bg-strong" />
                <span className="size-2 rounded-full bg-strong" />
                <span className="label ml-2">app.yourbusiness.com</span>
              </div>
              <div className="grid grid-cols-3 gap-2 p-4">
                {['Stock', 'Orders', 'Bookings'].map((label) => (
                  <div key={label} className="rounded-lg border border-line px-2 py-3 text-center">
                    <p className="label">{label}</p>
                    <span className="mx-auto mt-2 block size-1.5 rounded-full bg-ok" />
                  </div>
                ))}
              </div>
            </div>

            {CARDS.map(({ Card }, i) => (
              <div key={i} className="chaos-card layer-3d absolute left-1/2 top-1/2">
                <div className="chaos-float shadow-[var(--shadow-float)]">
                  <Card />
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
