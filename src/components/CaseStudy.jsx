import { useEffect, useRef } from 'react';
import MaterialIcon from './MaterialIcon';
import ProjectShot from './ProjectShot';

export default function CaseStudy({ project, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current.open) ref.current.showModal();
  }, []);

  const close = () => ref.current.close();

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && close()}
      aria-labelledby="case-title"
      className="sheet"
      data-lenis-prevent
    >
      <div className="min-h-full px-6 py-6 md:px-10 md:py-8">
        <div className="flex items-center justify-between">
          <span className="eyebrow">
            {project.index} · {project.category}
          </span>
          <button
            type="button"
            onClick={close}
            aria-label="Close case study"
            className="key grid size-9 place-items-center rounded-lg text-soft hover:text-ink"
          >
            <MaterialIcon name="close" size={20} />
          </button>
        </div>

        <h2 id="case-title" className="mt-10 text-3xl font-semibold leading-tight tracking-[-0.02em] text-balance">
          {project.title}
        </h2>
        <p className="mt-4 text-soft">{project.summary}</p>
        {project.image && <ProjectShot project={project} eager className="mt-8" />}

        <dl className="mt-8 grid grid-cols-3 gap-4 rounded-[10px] border border-line p-4">
          {project.metrics.map((m) => (
            <div key={m.label} className="flex flex-col-reverse gap-1">
              <dt className="label">{m.label}</dt>
              <dd className="text-xl font-medium tabular-nums">{m.value}</dd>
            </div>
          ))}
        </dl>

        <h3 className="label mt-10">Challenge</h3>
        <p className="mt-2 leading-relaxed">{project.challenge}</p>

        <h3 className="label mt-8">Solution</h3>
        <p className="mt-2 leading-relaxed">{project.solution}</p>

        <h3 className="label mt-8">Architecture</h3>
        <ul className="mt-2 divide-y divide-line border-y border-line">
          {project.architecture.map((item) => (
            <li key={item} className="py-3 text-sm text-soft">
              {item}
            </li>
          ))}
        </ul>

        <p className="label mt-8">{project.tags.join(' · ')}</p>

        <div className="mt-10 flex flex-wrap gap-3">
        {project.url && (
          <a href={project.url} target="_blank" rel="noreferrer" className="btn btn-secondary">
            Visit live site
            <MaterialIcon name="arrow_outward" size={18} />
          </a>
        )}
        <a href="/contact" className="btn btn-primary">
          Discuss a similar build
          <MaterialIcon name="arrow_outward" size={18} />
        </a>
        </div>
      </div>
    </dialog>
  );
}
