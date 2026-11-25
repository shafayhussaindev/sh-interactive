import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MaterialIcon from '../../components/MaterialIcon';
import SectionHeading from '../../components/SectionHeading';
import StockPreview from '../../components/StockPreview';
import { SOFTWARE } from '../../data/software';

gsap.registerPlugin(ScrollTrigger);

const HOVER = '(hover: hover) and (prefers-reduced-motion: no-preference)';

// "Discuss →" drifts toward the pointer while hovered and eases back on leave.
function Discuss() {
  const ref = useRef(null);
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(HOVER, () => {
      const el = ref.current;
      const x = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' });
      const y = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' });
      const move = (e) => {
        const r = el.getBoundingClientRect();
        x((e.clientX - r.left - r.width / 2) * 0.35);
        y((e.clientY - r.top - r.height / 2) * 0.35);
      };
      const leave = () => {
        x(0);
        y(0);
      };
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      return () => {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerleave', leave);
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <a
      ref={ref}
      href="#contact"
      className="-m-2 inline-flex items-center gap-1 rounded-lg p-2 text-sm font-medium text-ink transition-colors hover:text-accent"
    >
      Discuss
      <MaterialIcon name="arrow_forward" size={16} />
    </a>
  );
}

// Hover: the card tilts up to ±4° toward the pointer and an accent spotlight tracks it along the border.
function useTiltSpotlight(card, blob) {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(HOVER, () => {
      const el = card.current;
      gsap.set(el, { transformPerspective: 900 });
      const rx = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3' });
      const ry = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3' });
      const bx = gsap.quickTo(blob.current, 'x', { duration: 0.35, ease: 'power3' });
      const by = gsap.quickTo(blob.current, 'y', { duration: 0.35, ease: 'power3' });
      const move = (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        rx((0.5 - py) * 8);
        ry((px - 0.5) * 8);
        bx(e.clientX - r.left);
        by(e.clientY - r.top);
      };
      const leave = () => {
        rx(0);
        ry(0);
      };
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      return () => {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerleave', leave);
      };
    });
    return () => mm.revert();
  }, [card, blob]);
}

function Card({ item }) {
  const card = useRef(null);
  const blob = useRef(null);
  useTiltSpotlight(card, blob);
  const [from, to] = item.weeks;

  return (
    <div className={`js-bento layer-3d ${item.wide ? 'md:col-span-2' : ''}`}>
      <article ref={card} className="spot-card layer-3d h-full">
        <span aria-hidden="true" className="spot-ring">
          <span ref={blob} className="spot-blob" />
        </span>
        <div className={`spot-body grid gap-6 p-6 ${item.preview ? 'lg:grid-cols-2' : ''}`}>
          <div className="flex flex-col">
            <div className="flex items-center justify-between gap-4">
              <MaterialIcon name={item.icon} size={20} className="text-muted" />
              <span className="eyebrow">{item.tag}</span>
            </div>
            <h3 className={`mt-10 font-semibold leading-snug ${item.wide ? 'text-xl tracking-[-0.01em]' : 'text-lg'}`}>
              <a href={item.page} className="underline-offset-4 hover:underline">
                {item.title}
              </a>
            </h3>
            <p className="mt-3 max-w-xl text-soft">{item.body}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {item.fit.map((f) => (
                <li key={f} className="tag">
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-6">
              <div className="flex items-center justify-between gap-4 border-t border-line pt-4">
                <span className="text-sm tabular-nums text-muted">
                  Typically <span data-num={from}>{from}</span>–<span data-num={to}>{to}</span> weeks
                </span>
                <Discuss />
              </div>
            </div>
          </div>
          {item.preview && (
            <div className="js-fly layer-3d group">
              <StockPreview />
            </div>
          )}
        </div>
      </article>
    </div>
  );
}

export default function SoftwareBento() {
  const grid = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      { desktop: '(min-width: 1024px)', motion: '(prefers-reduced-motion: no-preference)' },
      ({ conditions: { desktop, motion } }) => {
        if (!motion) return;
        const cards = gsap.utils.toArray('.js-bento', grid.current);

        if (desktop) {
          // The exploded layers fly out of 3D space and rotate flat into their bento slots, scrubbed.
          gsap.fromTo(
            cards,
            {
              y: 140,
              z: -260,
              rotationX: 28,
              rotationY: (i) => (i % 2 ? -16 : 16),
              autoAlpha: 0,
              transformPerspective: 1400,
            },
            {
              y: 0,
              z: 0,
              rotationX: 0,
              rotationY: 0,
              autoAlpha: 1,
              ease: 'power2.out',
              stagger: 0.12,
              scrollTrigger: { trigger: grid.current, start: 'top 100%', end: 'top 45%', scrub: 0.7 },
            },
          );
          // The stock widget arrives from where the dashboard was pinned (up and to the right).
          gsap.fromTo(
            grid.current.querySelector('.js-fly'),
            { x: 180, y: -260, z: 200, rotationY: -22, rotationX: 8, transformPerspective: 1400 },
            {
              x: 0,
              y: 0,
              z: 0,
              rotationY: 0,
              rotationX: 0,
              ease: 'power2.out',
              scrollTrigger: { trigger: grid.current, start: 'top 105%', end: 'top 40%', scrub: 0.7 },
            },
          );
        } else {
          // Phones: each card rises out of depth once as it enters, no pinning.
          cards.forEach((card) =>
            gsap.from(card, {
              z: -120,
              rotationX: 16,
              autoAlpha: 0,
              transformPerspective: 1000,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 88%', once: true },
            }),
          );
        }

        // Tabular numbers count up once the grid is in view.
        ScrollTrigger.create({
          trigger: grid.current,
          start: 'top 70%',
          once: true,
          onEnter: () =>
            grid.current.querySelectorAll('[data-num]').forEach((node) => {
              const counter = { v: 0 };
              gsap.to(counter, {
                v: Number(node.dataset.num),
                duration: 1.1,
                ease: 'power2.out',
                snap: { v: 1 },
                onUpdate: () => (node.textContent = counter.v),
              });
            }),
        });
      },
    );
    return () => mm.revert();
  }, []);

  return (
    <section className="px-4 py-24 md:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="What I build" title="Four systems, shaped around your business">
          Not on the list? It almost certainly still fits.
        </SectionHeading>
        <div ref={grid} className="stage-3d mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SOFTWARE.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
        <p className="reveal mt-8 text-sm text-muted">
          Need a website, store or web app instead?{' '}
          <a href="/services" className="text-soft underline-offset-4 transition-colors hover:text-ink hover:underline">
            See web services
          </a>
        </p>
      </div>
    </section>
  );
}
