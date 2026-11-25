import MaterialIcon from '../components/MaterialIcon';
import SectionHeading from '../components/SectionHeading';
import { LAB } from '../data/content';

// Home page summary of the creative services; the full detail lives on /creative-lab.
export default function CreativeLab() {
  return (
    <section id="lab" className="px-4 py-24 md:px-6 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading label="Creative lab" title="Voice, brand, visuals, 3D and video">
            Creative work you can order on its own or bundle into any website or app, so it launches with assets made
            for it instead of stock.
          </SectionHeading>
          <a href="/creative-lab" className="reveal btn btn-secondary mt-8">
            Explore the creative lab
            <MaterialIcon name="arrow_forward" size={18} />
          </a>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:col-span-7">
          {LAB.map((item) => (
            <a key={item.id} href={`/creative-lab#${item.id}`} className="reveal card group flex flex-col p-6 md:last:odd:col-span-2">
              <div className="flex items-center justify-between">
                <MaterialIcon name={item.icon} size={20} className="text-muted" />
                <span className="eyebrow">{item.tag}</span>
              </div>
              <h3 className="mt-10 text-lg font-semibold leading-snug">{item.title}</h3>
              <p className="mt-3 text-sm text-soft">{item.short}</p>
              <span className="mt-auto flex items-center gap-2 pt-6 text-sm text-soft transition-colors group-hover:text-ink">
                View details
                <MaterialIcon name="arrow_forward" size={16} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
