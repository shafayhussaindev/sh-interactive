import HeroPreview from '../components/HeroPreview';
import MaterialIcon from '../components/MaterialIcon';

export default function Hero() {
  return (
    <section id="top" className="grid-bg border-b border-line px-4 pb-16 pt-32 md:px-6 md:pb-24 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16">
          <div>
            <p className="hero-in inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-[13px] text-soft">
              <span className="led size-1.5 rounded-full bg-ok" />
              Available for new projects · Remote
            </p>
            <h1 className="hero-in mt-6 text-[clamp(2.75rem,6.4vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-balance">
              I design and build websites and web apps for businesses
            </h1>
          </div>
          <div className="lg:pb-3">
            <p className="hero-in text-lg text-soft">
              Conversion-focused landing pages, and full-stack apps with logins, dashboards and databases. Planned,
              built and deployed by me, Shafay Hussain.
            </p>
            <div className="hero-in mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="btn btn-primary">
                Start a project
                <MaterialIcon name="arrow_outward" size={18} />
              </a>
              <a href="/projects" className="btn btn-secondary">
                See selected work
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 md:mt-20">
          <HeroPreview />
        </div>
      </div>
    </section>
  );
}
