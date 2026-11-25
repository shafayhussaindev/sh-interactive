import MaterialIcon from '../components/MaterialIcon';
import SmoothScrollProvider from '../components/SmoothScrollProvider';
import Nav from '../components/Nav';
import SectionHeading from '../components/SectionHeading';
import Contact from '../sections/Contact';
import { LAB } from '../data/content';

export default function CreativeLab() {
  return (
    <SmoothScrollProvider>
      <Nav />
      <main>
        <section id="top" className="px-4 pb-24 pt-32 md:px-6 md:pt-40">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              as="h1"
              label="Creative lab"
              title="Voice, brand, visuals, 3D and video, made for your business"
              size="text-[clamp(2.25rem,4.2vw,3.5rem)]"
            >
              Creative work produced with AI tools and finished by hand. Order it on its own, or bundle it into a website
              or app so it launches with assets made for it.
            </SectionHeading>

            <ul className="mt-12 flex flex-wrap gap-2">
              {LAB.map((s) => (
                <li key={s.id} className="reveal">
                  <a
                    href={`#${s.id}`}
                    className="key flex h-12 items-center gap-3 rounded-lg px-4 text-sm text-soft hover:text-ink"
                  >
                    <MaterialIcon name={s.icon} size={18} className="text-muted" />
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-12 space-y-4">
              {LAB.map((s, i) => (
                <article
                  key={s.id}
                  id={s.id}
                  className="reveal card grid scroll-mt-28 gap-10 p-6 md:p-10 lg:grid-cols-12"
                >
                  <div className="flex flex-col lg:col-span-7">
                    <div className="flex items-center gap-3">
                      <MaterialIcon name={s.icon} size={22} className="text-accent" />
                      <span className="eyebrow">
                        0{i + 1} · {s.tag}
                      </span>
                    </div>
                    <h2 className="mt-8 text-2xl font-semibold leading-tight tracking-[-0.02em] md:text-3xl">{s.title}</h2>
                    <p className="mt-3 text-lg text-ink">{s.short}</p>
                    <p className="mt-4 max-w-[60ch] leading-relaxed text-soft">{s.body}</p>
                    <ul className="mt-6 flex flex-wrap gap-2 lg:mt-auto lg:pt-8">
                      {s.fit.map((f) => (
                        <li key={f} className="tag">
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col lg:col-span-5">
                    <h3 className="label">What you get</h3>
                    <ul className="mt-3 divide-y divide-line border-y border-line">
                      {s.deliverables.map((d) => (
                        <li key={d} className="flex items-center gap-3 py-3 text-sm">
                          <MaterialIcon name="check" size={16} className="text-ok" />
                          {d}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <a href={s.page} className="btn btn-secondary">
                        Full details
                        <MaterialIcon name="arrow_forward" size={18} />
                      </a>
                      <a href="#contact" className="btn btn-secondary">
                        Discuss this service
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
    </SmoothScrollProvider>
  );
}
