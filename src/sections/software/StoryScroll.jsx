import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '../../components/SectionHeading';
import { STORY } from '../../data/software';
import { ANGLES, INTROS, VIEW_LABELS, VIEWS } from './StoryViews';

gsap.registerPlugin(Flip, ScrollTrigger);

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Window({ view, step, winRef, className = '', children }) {
  return (
    <div ref={winRef} className={`rounded-xl border border-line bg-surface shadow-[var(--shadow-float)] ${className}`}>
      <div className="flex h-10 items-center gap-4 rounded-t-xl border-b border-line bg-deep px-4">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-strong" />
          <span className="size-2.5 rounded-full bg-strong" />
          <span className="size-2.5 rounded-full bg-strong" />
        </span>
        <span className="label truncate">app.yourbusiness.com/{VIEW_LABELS[view]}</span>
        <span className="label ml-auto tabular-nums">{step + 1}/3</span>
      </div>
      {children}
    </div>
  );
}

// Desktop: three narrative blocks scroll on the left while an angled 3D dashboard stays pinned on the
// right. Each block swings the dashboard into its view (Flip handles the size change) and lifts that
// view's key widgets out along the Z axis.
// Phones: each block is followed by its own flat window that rises out of depth as it enters.
export default function StoryScroll() {
  const container = useRef(null);
  const steps = useRef([]);
  const sticky = useRef(null);
  const dash = useRef(null);
  const win = useRef(null);
  const flipState = useRef(null);
  const [view, setView] = useState({ stage: 0, n: 0 });
  const viewRef = useRef(view);
  viewRef.current = view;

  const go = useCallback((stage) => {
    const cur = viewRef.current;
    if (cur.n && cur.stage === stage) return;
    if (cur.stage !== stage) flipState.current = Flip.getState(win.current);
    setView({ stage, n: cur.n + 1 });
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      gsap.set(dash.current, ANGLES[STORY[0].view]);
      steps.current.forEach((el, i) =>
        ScrollTrigger.create({
          trigger: el,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => self.isActive && go(i),
        }),
      );
      if (reduced()) return;


      // As the story ends, the dashboard recedes so the cards below can take over.
      gsap.to(sticky.current, {
        scale: 0.86,
        rotationX: 14,
        transformPerspective: 1400,
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: { trigger: container.current, start: 'bottom 85%', end: 'bottom 30%', scrub: true },
      });
    });

    // Phones: no pinning; each window rises out of depth once as it enters.
    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray('.js-mobile-window', container.current).forEach((el) =>
        gsap.from(el, {
          z: -120,
          rotationX: 18,
          autoAlpha: 0,
          transformPerspective: 1000,
          duration: 0.9,
          ease: 'brand',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }),
      );
    });

    return () => mm.revert();
  }, [go]);

  // Each step change: Flip the window's size, swing the dashboard in from edge-on to the view's angle,
  // then run the view's Z-axis pop-outs.
  useLayoutEffect(() => {
    if (!view.n || !win.current?.offsetParent) return;
    const motion = !reduced();
    const key = STORY[view.stage].view;
    const ctx = gsap.context(() => {
      if (flipState.current) {
        Flip.from(flipState.current, { duration: motion ? 0.7 : 0, ease: 'power3.inOut', scale: false });
        flipState.current = null;
      }
      if (!motion) {
        gsap.set(dash.current, ANGLES[key]);
        return;
      }
      gsap.fromTo(
        dash.current,
        { rotationY: ANGLES[key].rotationY - 64, rotationX: ANGLES[key].rotationX },
        { ...ANGLES[key], duration: 0.9, ease: 'brand' },
      );
      INTROS[key](gsap, gsap.utils.selector(win.current));
    }, win);
    return () => ctx.revert();
  }, [view]);

  const Current = VIEWS[STORY[view.stage].view];

  return (
    <section id="story" ref={container} className="overflow-x-clip border-y border-line bg-surface px-4 md:px-6">
      <div className="mx-auto max-w-6xl pt-24 md:pt-32">
        <SectionHeading label="How it works" title="From four registers to one system" />

        <div className="mt-8 lg:mt-0 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <div>
            {STORY.map((s, i) => {
              const StepView = VIEWS[s.view];
              return (
                <article
                  key={s.view}
                  ref={(el) => (steps.current[i] = el)}
                  className="flex flex-col justify-center py-12 lg:min-h-[115svh] lg:py-0"
                >
                  <p className="eyebrow">{s.eyebrow}</p>
                  <h3 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-balance">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-[46ch] text-lg text-soft">{s.body}</p>
                  <div className="mt-8 lg:hidden">
                    <Window view={s.view} step={i} className="js-mobile-window">
                      <StepView />
                    </Window>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="hidden lg:block">
            <div ref={sticky} className="stage-3d sticky top-[max(96px,calc(50svh-250px))] pb-32">
              <div className="preserve-3d">
                <div ref={dash} className="space-3d layer-3d">
                  <Window view={STORY[view.stage].view} step={view.stage} winRef={win}>
                    <div key={view.n}>
                      <Current />
                    </div>
                  </Window>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
