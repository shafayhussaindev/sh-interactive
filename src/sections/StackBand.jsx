const STACK = ['React', 'Node.js', '.NET', 'PostgreSQL', 'SQL Server', 'REST & GraphQL', 'Tailwind CSS', 'GSAP', 'Three.js', 'Vite'];

// Proof band under the hero: the stack every project ships on, as an endless logo-strip belt.
export default function StackBand() {
  return (
    <section aria-label="Technology stack" className="border-b border-line bg-surface px-4 md:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 py-8 md:flex-row md:items-center md:gap-10">
        <p className="eyebrow shrink-0">Stack I ship with</p>
        <div className="belt min-w-0 flex-1 overflow-hidden">
          <p className="sr-only">{STACK.join(', ')}</p>
          {/* Two identical halves, each wider than the belt; the track slides by exactly one half. */}
          <ul aria-hidden="true" className="belt-track flex w-max">
            {[...STACK, ...STACK, ...STACK, ...STACK].map((item, i) => (
              <li key={i} className="mr-12 shrink-0 text-lg font-semibold tracking-[-0.02em] text-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
