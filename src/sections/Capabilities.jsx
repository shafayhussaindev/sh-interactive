import MaterialIcon from '../components/MaterialIcon';
import SectionHeading from '../components/SectionHeading';
import { CAPABILITIES } from '../data/content';

// A live API request log: the precision detail inside the full-stack card.
const REQUESTS = [
  ['GET', '/api/bookings', '200', '38ms'],
  ['POST', '/api/bookings', '201', '52ms'],
  ['PATCH', '/api/users/:id', '403', '11ms'],
];

function RequestLog() {
  return (
    <div aria-hidden="true" className="panel mt-6 overflow-hidden rounded-lg text-[12px] leading-6">
      {REQUESTS.map(([method, path, status, time]) => (
        <p key={method + path} className="grid grid-cols-[52px_1fr_36px_40px] gap-2 border-b border-panel-line px-4 py-1 last:border-0">
          <span className="text-[var(--code-fn)]">{method}</span>
          <span className="truncate">{path}</span>
          <span className={status.startsWith('2') ? 'text-[var(--code-ok)]' : 'text-[var(--code-key)]'}>{status}</span>
          <span className="text-right text-panel-muted">{time}</span>
        </p>
      ))}
    </div>
  );
}

export default function Capabilities() {
  return (
    <section id="capabilities" className="px-4 py-24 md:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="Capabilities" title="Software first, built to scale">
          Websites, landing pages and full-stack applications, engineered as one system from the database to the last
          interaction.
        </SectionHeading>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {CAPABILITIES.map((c, i) => (
            <article
              key={c.title}
              className={`reveal card flex flex-col p-6 md:p-8 ${c.wide ? 'md:col-span-2' : 'md:min-h-[360px]'}`}
            >
              <MaterialIcon name={c.icon} size={20} className="text-muted" />
              {c.icon === 'deployed_code' && <RequestLog />}
              <h3 className={`text-xl font-semibold ${c.wide ? 'mt-10' : 'mt-auto pt-16'}`}>{c.title}</h3>
              <p className="mt-3 max-w-xl text-soft">{c.body}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {c.points.map((p) => (
                  <li key={p} className="tag">
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="reveal mt-8 flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
          <a href="/services" className="btn btn-secondary shrink-0 self-start md:self-auto">
            Explore all services
            <MaterialIcon name="arrow_forward" size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
