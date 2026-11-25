import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';
import { initReveals } from '../lib/motion';

gsap.registerPlugin(ScrollTrigger);

// Lenis smooth scrolling on GSAP's ticker (one animation loop), plus the page's scroll reveals.
// With reduced motion the browser's native scrolling is left alone.
export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const cleanupReveals = initReveals();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return cleanupReveals;

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.9, anchors: { offset: -80 } });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    document.fonts.ready.then(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      cleanupReveals();
    };
  }, []);

  return children;
}
