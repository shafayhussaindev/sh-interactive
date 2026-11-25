import { useEffect, useRef } from 'react';
import { initHollowFill } from '../lib/motion';

const STATEMENT =
  'I build the whole thing. The interface people use, the API and database behind it, and the deploy that keeps it running.';

export default function Manifesto() {
  const ref = useRef(null);

  useEffect(() => initHollowFill(ref.current), []);

  return (
    <section className="px-4 py-24 md:px-6 md:py-32">
      <div
        ref={ref}
        className="relative mx-auto max-w-4xl text-center text-[clamp(1.75rem,3.2vw,2.75rem)] font-medium leading-[1.2] tracking-[-0.025em] text-balance"
      >
        <p className="hollow" aria-hidden="true">
          {STATEMENT}
        </p>
        <p className="hollow-fill absolute inset-0">{STATEMENT}</p>
      </div>
    </section>
  );
}
