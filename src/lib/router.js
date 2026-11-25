import { useEffect, useSyncExternalStore } from 'react';
import { flushSync } from 'react-dom';

// A small client-side router: one React app, clean URLs (/services, /projects…), History API underneath.

const listeners = new Set();
const notify = () => listeners.forEach((fn) => fn());

function subscribe(fn) {
  listeners.add(fn);
  window.addEventListener('popstate', fn);
  return () => {
    listeners.delete(fn);
    window.removeEventListener('popstate', fn);
  };
}

export function usePathname() {
  return useSyncExternalStore(subscribe, () => location.pathname);
}

// Old multi-page URLs (/services.html, /index.html) and trailing slashes map onto the clean ones.
export function normalize(path) {
  const clean = path.replace(/\/index\.html$/, '/').replace(/\.html$/, '').replace(/(.)\/$/, '$1');
  return clean || '/';
}

export function navigate(to, { replace = false } = {}) {
  const url = new URL(to, location.href);
  const next = url.pathname + url.search + url.hash;
  // Redirects (e.g. /services.html → /services) happen during render: swap the URL quietly, no transition.
  if (replace) {
    history.replaceState(null, '', next);
    notify();
    return;
  }
  const change = () => {
    history.pushState(null, '', next);
    flushSync(notify);
  };
  const animate = document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (animate) document.startViewTransition(change);
  else change();
}

// Turns clicks on links to other pages of this site into in-app navigation. Links to a section on the
// current page (/#work while on /) and anything external, new-tab or modified are left to the browser.
export function useLinkInterception() {
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target.closest('a[href]');
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
      const url = new URL(link.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      e.preventDefault();
      navigate(url.href);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
}
