const LINKS = [
  ['Services', '/services'],
  ['Software', '/software'],
  ['Projects', '/projects'],
  ['Creative Lab', '/creative-lab'],
  ['Contact', '/contact'],
];

// Site footer on every page: the pages, the copyright and a way back up. The form lives on /contact.
export default function Footer() {
  return (
    <footer className="px-4 md:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 border-t border-line py-10 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {LINKS.map(([label, href]) => (
              <li key={href}>
                <a href={href} className="link-draw text-soft hover:text-ink">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <span>SH // Interactive · © {new Date().getFullYear()} Shafay Hussain</span>
          <a href="#top" className="link-draw hover:text-ink">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
