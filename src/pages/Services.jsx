import MaterialIcon from '../components/MaterialIcon';
import SmoothScrollProvider from '../components/SmoothScrollProvider';
import Nav from '../components/Nav';
import SectionHeading from '../components/SectionHeading';
import ServicePreview from '../components/ServicePreview';
import Contact from '../sections/Contact';
import { SERVICES, servicePath } from '../data/services';

export default function Services() {
  return (
    <SmoothScrollProvider>
      <Nav />
      <main>
        <section id="top" className="px-4 pb-24 pt-32 md:px-6 md:pt-40">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              as="h1"
              label="Services"
              title="What I build for businesses"
              size="text-[clamp(2.25rem,4.2vw,3.5rem)]"
            >
              Four kinds of projects, each planned, designed, built and deployed by me, from the first sketch to launch
              day. Open one to see exactly what the work involves and what you get.
            </SectionHeading>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((s, i) => (
                <a
                  key={s.id}
                  href={servicePath(s.id)}
                  className="reveal card group flex flex-col p-2 transition-colors"
                >
                  <ServicePreview id={s.id} />
                  <div className="flex flex-1 flex-col p-4">
                    <p className="eyebrow">{s.tag}</p>
                    <h2 className="mt-3 text-lg font-semibold leading-snug">{s.title}</h2>
                    <p className="mt-2 text-sm text-soft">{s.short}</p>
                    <span className="mt-auto flex items-center gap-2 pt-6 text-sm text-soft transition-colors group-hover:text-ink">
                      View service
                      <MaterialIcon name="arrow_forward" size={16} />
                    </span>
                  </div>
                </a>
              ))}
            </div>

            <p className="reveal mt-8 text-sm text-muted">
              Looking for stock, billing, booking or records software?{' '}
              <a href="/software" className="text-soft underline-offset-4 transition-colors hover:text-ink hover:underline">
                See business software
              </a>
            </p>
          </div>
        </section>
      </main>

      <Contact />
    </SmoothScrollProvider>
  );
}
