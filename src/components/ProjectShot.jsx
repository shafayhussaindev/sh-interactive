// A project screenshot in a slim browser frame showing the site's domain.
export default function ProjectShot({ project, className = '', eager = false }) {
  const domain = new URL(project.url).hostname;
  return (
    <figure className={`overflow-hidden rounded-lg border border-line bg-surface ${className}`}>
      <div className="flex h-8 items-center gap-1.5 border-b border-line bg-deep px-3">
        <span className="size-2 rounded-full bg-strong" />
        <span className="size-2 rounded-full bg-strong" />
        <span className="size-2 rounded-full bg-strong" />
        <span className="label ml-2 truncate">{domain}</span>
      </div>
      <div className="zoom-media">
        <img
          src={project.image}
          alt={project.alt}
          width="1440"
          height="688"
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="block aspect-[1440/688] w-full object-cover object-top"
        />
      </div>
    </figure>
  );
}
