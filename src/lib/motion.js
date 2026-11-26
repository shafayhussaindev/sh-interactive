import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

// The one easing curve for the whole site, the same as --ease in index.css: a fast, settled
// deceleration with no overshoot. Registered globally as 'brand' so every gsap tween can name it.
CustomEase.create('brand', '0.22, 1, 0.36, 1');
export const EASE = 'brand';

// Splits a heading into masked lines that rise into place. autoSplit re-splits after font
// loads and resizes, and SplitText reverts with the surrounding matchMedia context.
function maskReveal(el, vars) {
  SplitText.create(el, {
    type: 'lines',
    mask: 'lines',
    autoSplit: true,
    onSplit: (self) => {
      gsap.set(el, { autoAlpha: 1 });
      return gsap.from(self.lines, { yPercent: 105, duration: 0.9, ease: EASE, stagger: 0.07, ...vars });
    },
  });
}

// Hero load stagger, section-header reveals and batched card reveals for the current page.
// Elements opt in with the classes `hero-in`, `reveal-head` and `reveal`.
export function initReveals() {
  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.utils.toArray('h1.hero-in').forEach((el) => maskReveal(el, { delay: 0.05 }));
    // Hero entrance, once on load: each [data-enter] hero's pieces rise 12px in reading order.
    gsap.fromTo(
      '[data-enter] .hero-in:not(h1)',
      { y: 12, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.8, ease: EASE, stagger: 0.07, delay: 0.25, clearProps: 'transform' },
    );

    gsap.utils
      .toArray('h1.reveal-head, h2.reveal-head')
      .forEach((el) => maskReveal(el, { scrollTrigger: { trigger: el, start: 'top 85%', once: true } }));

    gsap.utils.toArray('.reveal-head:not(h1):not(h2)').forEach((el) => {
      gsap.fromTo(
        el,
        { y: 12, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: EASE,
          clearProps: 'transform',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        },
      );
    });

    // clearProps hands each element back to CSS once it has arrived, so hover lifts (a.card:hover) apply.
    gsap.set('.reveal', { y: 16, autoAlpha: 0 });
    ScrollTrigger.batch('.reveal', {
      start: 'top 85%',
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: EASE,
          stagger: 0.06,
          overwrite: true,
          clearProps: 'transform',
        }),
    });
  });

  // Depth: product visuals marked [data-parallax="<px>"] drift that many pixels against the scroll,
  // so they read as sitting behind the text. Visuals only (never text), transform only, desktop only.
  mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
    gsap.utils.toArray('[data-parallax]').forEach((el) => {
      const distance = Number(el.dataset.parallax) || 24;
      gsap.fromTo(
        el,
        { y: -distance },
        {
          y: distance,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
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
