import MaterialIcon from '../components/MaterialIcon';
import SmoothScrollProvider from '../components/SmoothScrollProvider';
import Nav from '../components/Nav';
import SectionHeading from '../components/SectionHeading';
import ServicePreview from '../components/ServicePreview';
import Footer from '../components/Footer';
import { SERVICES, servicePath } from '../data/services';

export default function ServicePage({ service }) {
  const others = SERVICES.filter((s) => s.id !== service.id && s.group === service.group).slice(0, 3);

  return (
    <SmoothScrollProvider>
      <Nav />
      <main>
        <section id="top" data-enter className="px-4 pb-24 pt-32 md:px-6 md:pt-40">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
            <div>
              <nav aria-label="Breadcrumb" className="hero-in eyebrow">
                <a href="/services" className="link-draw hover:text-ink">
                  Services
                </a>
                <span className="px-2">/</span>
                <span aria-current="page">{service.tag}</span>
              </nav>
              <h1
                className="hero-in mt-4 text-[clamp(2.25rem,4.4vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-balance"
              >
                {service.title}
              </h1>
              <p className="hero-in mt-6 max-w-[36rem] text-lg text-soft">
                {service.intro}
              </p>
              <div className="hero-in mt-10 flex flex-wrap gap-3">
                <a href="/contact" className="btn btn-primary">
                  Start a project
                  <MaterialIcon name="arrow_outward" size={18} />
                </a>
                <a href="#what-you-get" className="btn btn-secondary">
                  What you get
                </a>
              </div>
            </div>
            <div className="hero-in card group p-2">
              <ServicePreview service={service} className="h-64 md:h-72" />
            </div>
          </div>
        </section>

        <section className="px-4 py-24 md:px-6 md:py-32">
          <div className="mx-auto max-w-6xl">
            <SectionHeading label="How it works" title="What we do, step by step" />
            <ol className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
              {service.steps.map((step, i) => (
                <li key={step.title} className="reveal groove pt-6">
                  <p className="label">0{i + 1}</p>
                  <h3 className="mt-4 text-lg font-semibold leading-snug">{step.title}</h3>
                  <p className="mt-3 text-sm text-soft">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="what-you-get" className="px-4 py-24 md:px-6 md:py-32">
          <div className="mx-auto max-w-6xl">
            <SectionHeading label="What you get" title="Everything included in the build" />
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.deliverables.map((d, i) => (
                <li key={d.title} className="reveal card p-6">
                  <MaterialIcon name="check" size={20} className="text-muted" />
                  <h3 className="mt-8 font-semibold">{d.title}</h3>
                  <p className="mt-2 text-sm text-soft">{d.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-4 py-24 md:px-6 md:py-32">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
            <SectionHeading className="lg:col-span-5" label="Options" title="Features we can build in">
              Pick what your project needs. Anything not listed can be scoped during discovery.
            </SectionHeading>
            <div className="space-y-10 lg:col-span-7">
              <ul className="reveal grid border-t border-line sm:grid-cols-2 sm:gap-x-8">
                {service.features.map((f) => (
                  <li key={f} className="flex h-12 items-center gap-2 border-b border-line text-soft">
                    <MaterialIcon name="add" size={18} className="text-muted" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="reveal grid gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="label">Good fit for</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {service.fit.map((f) => (
                      <li key={f} className="tag">
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="label">Built with</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {service.stack.map((t) => (
                      <li key={t} className="tag">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-24 md:px-6 md:py-32">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
            <SectionHeading className="lg:col-span-5" label="FAQ" title="Common questions" />
            <dl className="reveal divide-y divide-line border-y border-line lg:col-span-7">
              {service.faq.map(({ q, a }) => (
                <div key={q} className="py-6">
                  <dt className="font-semibold">{q}</dt>
                  <dd className="mt-2 text-soft">{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="px-4 py-24 md:px-6 md:py-32">
          <div className="mx-auto max-w-6xl">
            <SectionHeading label="More services" title="Often paired with" />
            <ul className="mt-12 grid gap-4 md:grid-cols-3">
              {others.map((s, i) => (
                <li key={s.id} className="reveal">
                  <a
                    href={servicePath(s.id)}
                    className="card group flex h-full flex-col p-6 transition-colors"
                  >
                    <p className="eyebrow">{s.tag}</p>
                    <h3 className="mt-3 font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm text-soft">{s.short}</p>
                    <span className="mt-auto flex items-center gap-2 pt-6 text-sm text-soft transition-colors group-hover:text-ink">
                      View service
                      <MaterialIcon name="arrow_forward" size={16} />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </SmoothScrollProvider>
  );
}
