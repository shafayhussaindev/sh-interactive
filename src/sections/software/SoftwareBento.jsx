import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MaterialIcon from '../../components/MaterialIcon';
import SectionHeading from '../../components/SectionHeading';
import StockPreview from '../../components/StockPreview';
import { SOFTWARE } from '../../data/software';

gsap.registerPlugin(ScrollTrigger);

const HOVER = '(hover: hover) and (prefers-reduced-motion: no-preference)';

// Hover: an accent spotlight follows the pointer along the card's border. The card itself stays flat.
function useSpotlight(card, blob) {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(HOVER, () => {
      const el = card.current;
      const bx = gsap.quickTo(blob.current, 'x', { duration: 0.35, ease: 'brand' });
      const by = gsap.quickTo(blob.current, 'y', { duration: 0.35, ease: 'brand' });
      const move = (e) => {
        const r = el.getBoundingClientRect();
        bx(e.clientX - r.left);
        by(e.clientY - r.top);
      };
      el.addEventListener('pointermove', move);
      return () => el.removeEventListener('pointermove', move);
    });
    return () => mm.revert();
  }, [card, blob]);
}

function Card({ item }) {
  const card = useRef(null);
  const blob = useRef(null);
  useSpotlight(card, blob);
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
              <a href={item.page} className="link-draw">
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
                <a href="/contact" className="link-draw inline-flex items-center gap-1 text-sm font-medium text-ink">
                  Discuss
                  <MaterialIcon name="arrow_forward" size={16} />
                </a>
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
          // The cards rise into their bento slots, scrubbed with the scroll. Flat: no rotation.
          gsap.fromTo(
            cards,
            { y: 64, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              ease: 'brand',
              stagger: 0.12,
              scrollTrigger: { trigger: grid.current, start: 'top 100%', end: 'top 45%', scrub: 0.7 },
            },
          );
          // The stock widget arrives from where the dashboard was pinned (up and to the right).
          gsap.fromTo(
            grid.current.querySelector('.js-fly'),
            { x: 120, y: -160 },
            {
              x: 0,
              y: 0,
              ease: 'brand',
              scrollTrigger: { trigger: grid.current, start: 'top 105%', end: 'top 40%', scrub: 0.7 },
            },
          );
        } else {
          // Phones: each card rises once as it enters, no pinning.
          cards.forEach((card) =>
            gsap.from(card, {
              y: 24,
              autoAlpha: 0,
              duration: 0.8,
              ease: 'brand',
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
                ease: 'brand',
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
          <a href="/services" className="link-draw text-soft hover:text-ink">
            See web services
          </a>
        </p>
      </div>
    </section>
  );
}
