import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import MaterialIcon from './MaterialIcon';

const LINKS = [
  ['Services', '/services'],
  ['Software', '/software'],
  ['Projects', '/projects'],
  ['Creative Lab', '/creative-lab'],
];

const current = (href) =>
  href === location.pathname || (href === '/services' && location.pathname.startsWith('/services/'))
    ? 'page'
    : undefined;

// Liquid pill: it sits behind the hovered link, or the active one when nothing is hovered.
// When it travels, the trailing edge follows a beat behind the leading one, so the pill stretches
// a little (never across the whole bar), then settles with a small wobble.
function useLiquidPill(list, pill, target) {
  const pos = useRef(null);

  useLayoutEffect(() => {
    const ul = list.current;
    const el = pill.current;
    const place = (instant) => {
      const link = ul.querySelector(`a[href="${target}"]`);
      if (!link) {
        // Stop any slide in progress before forgetting the position, so nothing freezes half-stretched.
        if (pos.current) gsap.killTweensOf(pos.current);
        pos.current = null;
        gsap.to(el, { autoAlpha: 0, duration: 0.2 });
        return;
      }
      // Measured against the list itself (offsetLeft would be relative to the link's own <li>).
      const box = ul.getBoundingClientRect();
      const rect = link.getBoundingClientRect();
      const l = rect.left - box.left;
      const r = box.right - rect.right;
      const still = instant || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!pos.current || still) {
        if (pos.current) gsap.killTweensOf(pos.current);
        pos.current = { l, r };
        el.style.left = `${l}px`;
        el.style.right = `${r}px`;
        gsap.to(el, { autoAlpha: 1, duration: 0.2 });
        return;
      }
      const p = pos.current;
      const apply = () => {
        el.style.left = `${p.l}px`;
        el.style.right = `${p.r}px`;
      };
      const toRight = l > p.l;
      const slide = { duration: 0.38, ease: 'brand', onUpdate: apply, overwrite: 'auto' };
      gsap.to(p, { l, ...slide, delay: toRight ? 0.03 : 0 });
      gsap.to(p, { r, ...slide, delay: toRight ? 0 : 0.03 });
      gsap.fromTo(el, { scaleY: 0.9 }, { scaleY: 1, duration: 0.6, ease: 'brand' });
      gsap.to(el, { autoAlpha: 1, duration: 0.2 });
    };

    place(false);
    const onResize = () => place(true);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [list, pill, target]);
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const list = useRef(null);
  const pill = useRef(null);
  const activeHref = LINKS.find(([, href]) => current(href))?.[1];
  const target = hovered ?? activeHref;
  useLiquidPill(list, pill, target);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-3 z-40 px-3 md:top-4 md:px-6">
      <nav className="nav-bar nav-surface mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full pl-5 pr-2">
        <a href="/#top" onClick={close} className="flex items-center">
          <img src="/logo.png" alt="SH Interactive" width="56" height="24" className="h-6 w-auto" />
        </a>
        <ul
          ref={list}
          onPointerLeave={() => setHovered(null)}
          onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHovered(null)}
          className="relative hidden items-center lg:flex"
        >
          <span ref={pill} aria-hidden="true" className="nav-pill pointer-events-none absolute inset-y-0 opacity-0" />
          {LINKS.map(([label, href]) => (
            <li key={href} className="relative">
              <a
                href={href}
                aria-current={current(href)}
                data-lit={href === target || undefined}
                onPointerEnter={() => setHovered(href)}
                onFocus={() => setHovered(href)}
                className="block rounded-full px-3.5 py-2 text-sm text-soft transition-colors duration-200 data-[lit]:text-ink"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a href="/contact" className="btn btn-sm btn-primary hidden rounded-full sm:inline-flex">
            Start a project
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="key grid size-10 place-items-center rounded-full text-soft hover:text-ink lg:hidden"
          >
            <MaterialIcon name={open ? 'close' : 'menu'} size={20} />
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="nav-surface menu-in mx-auto mt-2 max-w-6xl rounded-3xl bg-page px-4 pb-4 pt-2 lg:hidden">
          <ul>
            {LINKS.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={close}
                  aria-current={current(href)}
                  className="flex h-12 items-center border-b border-line text-base text-soft transition-colors hover:text-ink aria-[current=page]:text-ink"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a href="/contact" onClick={close} className="btn btn-primary mt-4 w-full justify-center rounded-full sm:hidden">
            Start a project
          </a>
        </div>
      )}
    </header>
  );
}
