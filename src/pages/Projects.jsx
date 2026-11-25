import { useState } from 'react';
import CaseStudy from '../components/CaseStudy';
import MaterialIcon from '../components/MaterialIcon';
import Nav from '../components/Nav';
import SectionHeading from '../components/SectionHeading';
import SmoothScrollProvider from '../components/SmoothScrollProvider';
import Contact from '../sections/Contact';
import ProjectShot from '../components/ProjectShot';
import { PROJECTS } from '../data/content';

// Project showcase. To add a project, add an entry to PROJECTS in src/data/content.js;
// it appears here and opens its own case study.
export default function Projects() {
  const [active, setActive] = useState(null);

  return (
    <SmoothScrollProvider>
      <Nav />
      <main>
        <section id="top" className="px-4 pb-24 pt-32 md:px-6 md:pt-40">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              as="h1"
              label="Projects"
              title="Projects I have built and shipped"
              size="text-[clamp(2.25rem,4.2vw,3.5rem)]"
            >
              Websites, web apps and business software, from first sketch to production. Open any project for the full
              case study: the problem, the solution and how it was built.
            </SectionHeading>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {PROJECTS.map((p, i) => (
                <article
                  key={p.index}
                  className="gloss-card reveal group relative flex flex-col overflow-hidden rounded-xl p-4 md:p-5"
                >
                  <span aria-hidden="true" className="sheen-track">
                    <span className="sheen-band" />
                  </span>
                  <ProjectShot project={p} eager={i < 2} />
                  <div className="flex flex-1 flex-col px-1 pt-5">
                    <p className="eyebrow">
                      {p.index} · {p.category}
                    </p>
                    <h2 className="mt-3 text-xl font-semibold leading-tight tracking-[-0.01em]">{p.title}</h2>
                    <p className="mt-3 text-soft">{p.summary}</p>
                    <p className="label mt-4">{p.tags.join(' · ')}</p>
                    <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-line pt-4">
                      {p.metrics.map((m) => (
                        <div key={m.label} className="flex flex-col-reverse gap-1">
                          <dt className="label">{m.label}</dt>
                          <dd className="text-xl font-medium tabular-nums">{m.value}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="relative z-10 mt-auto flex flex-wrap items-center gap-3 pt-6">
                      <button type="button" onClick={() => setActive(p)} className="btn btn-sm btn-primary">
                        Read case study
                        <MaterialIcon name="arrow_forward" size={16} />
                      </button>
                      <a href={p.url} target="_blank" rel="noreferrer" className="btn btn-sm btn-secondary">
                        Visit live site
                        <MaterialIcon name="arrow_outward" size={16} />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Contact />
      {active && <CaseStudy key={active.index} project={active} onClose={() => setActive(null)} />}
    </SmoothScrollProvider>
  );
}
