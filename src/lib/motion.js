import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const EASE = 'power3.out';

// Splits a heading into masked lines that rise into place. autoSplit re-splits after font
// loads and resizes, and SplitText reverts with the surrounding matchMedia context.
function maskReveal(el, vars) {
  SplitText.create(el, {
    type: 'lines',
    mask: 'lines',
    autoSplit: true,
    onSplit: (self) => {
      gsap.set(el, { autoAlpha: 1 });
      return gsap.from(self.lines, { yPercent: 105, duration: 0.85, ease: EASE, stagger: 0.08, ...vars });
    },
  });
}

// Hero load stagger, section-header reveals and batched card reveals for the current page.
// Elements opt in with the classes `hero-in`, `reveal-head` and `reveal`.
export function initReveals() {
  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.utils.toArray('h1.hero-in').forEach((el) => maskReveal(el, { delay: 0.05 }));
    gsap.fromTo(
      '.hero-in:not(h1)',
      { y: 16, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.7, ease: EASE, stagger: 0.08, delay: 0.25 },
    );

    gsap.utils.toArray('h1.reveal-head, h2.reveal-head').forEach((el) =>
      maskReveal(el, { scrollTrigger: { trigger: el, start: 'top 85%', once: true } }),
    );

    gsap.utils.toArray('.reveal-head:not(h1):not(h2)').forEach((el) => {
      gsap.fromTo(
        el,
        { y: 18, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.65, ease: EASE, scrollTrigger: { trigger: el, start: 'top 85%', once: true } },
      );
    });

    gsap.set('.reveal', { y: 22, autoAlpha: 0 });
    ScrollTrigger.batch('.reveal', {
      start: 'top 85%',
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, { y: 0, autoAlpha: 1, duration: 0.7, ease: EASE, stagger: 0.08, overwrite: true }),
    });
  });

  return () => mm.revert();
}

// Scrubbed left-to-right wipe of the solid ink layer over the hollow statement.
export function initHollowFill(container) {
  const mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.fromTo(
      container.querySelector('.hollow-fill'),
      { clipPath: 'inset(0 100% 0 0)' },
      {
        clipPath: 'inset(0 0% 0 0)',
        ease: 'none',
        scrollTrigger: { trigger: container, start: 'top 78%', end: 'bottom 42%', scrub: 0.6 },
      },
    );
  });
  return () => mm.revert();
}
