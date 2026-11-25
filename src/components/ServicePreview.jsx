import MaterialIcon from './MaterialIcon';

// Small coded previews of what each service produces. Text stays at 11px or above.
// Each plays a one-shot demo while its card (the nearest `.group`) is hovered.

function Website() {
  return (
    <div className="flex h-full flex-col p-4">
      <div className="flex items-center justify-between">
        <span className="h-1.5 w-8 rounded-full bg-soft/60" />
        <span className="flex gap-2">
          <span className="h-1 w-5 rounded-full bg-muted/50" />
          <span className="h-1 w-5 rounded-full bg-muted/50" />
          <span className="h-1 w-5 rounded-full bg-muted/50" />
        </span>
      </div>
      <div className="mt-6 grid flex-1 grid-cols-[1fr_72px] gap-4">
        <div>
          <span className="block h-2.5 w-[90%] rounded-full bg-ink/80" />
          <span className="mt-2 block h-2.5 w-[64%] rounded-full bg-ink/80" />
          <span className="mt-4 block h-1.5 w-[80%] rounded-full bg-muted/50" />
          <span className="mt-2 block h-1.5 w-[56%] rounded-full bg-muted/50" />
          {/* Hover: the call-to-action gets pressed. */}
          <span className="mt-4 block h-5 w-16 rounded-[4px] bg-accent group-hover:animate-[preview-press_500ms_var(--ease)]" />
        </div>
        <div className="rounded-md bg-raised" />
      </div>
    </div>
  );
}

function WebApp() {
  return (
    <div className="grid h-full grid-cols-[44px_1fr]">
      <div className="space-y-3 border-r border-line p-3">
        <span className="block h-1.5 rounded-full bg-soft/70" />
        <span className="block h-1.5 rounded-full bg-muted/40" />
        <span className="block h-1.5 rounded-full bg-muted/40" />
        <span className="block h-1.5 rounded-full bg-muted/40" />
      </div>
      <div className="flex flex-col p-3">
        <div className="grid grid-cols-3 gap-2">
          {[
            ['Users', '1,284'],
            ['Active', '312'],
            ['MRR', '$8.4k'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-[6px] bg-surface px-2 py-1">
              <p className="text-[11px] leading-4 text-muted">{label}</p>
              <p className="text-[13px] font-medium tabular-nums">{value}</p>
            </div>
          ))}
        </div>
        {/* Hover: the chart redraws from left to right. */}
        <svg
          viewBox="0 0 200 60"
          preserveAspectRatio="none"
          className="mt-3 min-h-14 w-full flex-1 group-hover:animate-[preview-draw_900ms_var(--ease)]"
          aria-hidden="true"
        >
          <line x1="0" y1="20" x2="200" y2="20" stroke="var(--border-subtle)" vectorEffect="non-scaling-stroke" />
          <line x1="0" y1="40" x2="200" y2="40" stroke="var(--border-subtle)" vectorEffect="non-scaling-stroke" />
          <polyline
            points="0,50 25,46 50,48 75,36 100,38 125,27 150,29 175,16 200,12"
            fill="none"
            stroke="var(--accent-primary)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
  );
}

function Store() {
  return (
    <div className="flex h-full gap-2 p-3">
      <div className="grid flex-1 grid-cols-2 gap-2">
        {[
          ['Linen shirt', '$48'],
          ['Canvas tote', '$24'],
        ].map(([name, price], i) => (
          <div
            key={name}
            className={`flex flex-col rounded-[6px] bg-surface p-1.5 ${i === 1 ? 'group-hover:outline group-hover:outline-1 group-hover:outline-accent' : ''}`}
          >
            <span className="flex-1 rounded-[4px] bg-raised" />
            <p className="mt-1.5 truncate text-[11px] leading-4 text-soft">{name}</p>
            <p className="text-[11px] font-medium leading-4 tabular-nums">{price}</p>
          </div>
        ))}
      </div>
      {/* Hover: the tote goes into the cart. */}
      <div className="flex w-20 flex-col rounded-[6px] border border-line bg-surface p-2">
        <p className="text-[11px] leading-4 text-muted">Cart</p>
        <p className="mt-1 text-[13px] font-medium tabular-nums">
          <span className="group-hover:hidden">$72</span>
          <span className="hidden group-hover:inline-block group-hover:animate-[preview-pop_400ms_var(--ease)]">$96</span>
        </p>
        <p className="text-[11px] leading-4 text-muted">
          <span className="group-hover:hidden">2 items</span>
          <span className="hidden group-hover:inline">3 items</span>
        </p>
        <span className="mt-auto grid h-6 place-items-center rounded-[4px] bg-accent text-[11px] font-medium text-white">
          Checkout
        </span>
      </div>
    </div>
  );
}

function Admin() {
  return (
    <div className="p-3 text-[11px] leading-4">
      <div className="grid grid-cols-[1fr_auto] px-2 pb-2 text-muted">
        <span>Page</span>
        <span>Status</span>
      </div>
      {[
        ['Home', 'Published'],
        ['Services', 'Published'],
        ['Pricing', 'Draft'],
        ['Contact', 'Published'],
      ].map(([page, status]) => (
        <div
          key={page}
          className={`grid grid-cols-[1fr_auto] rounded-[6px] px-2 py-1.5 ${status === 'Draft' ? 'bg-surface' : ''}`}
        >
          <span className="text-soft">{page}</span>
          {status === 'Draft' ? (
            /* Hover: the draft gets published. */
            <span>
              <span className="text-accent group-hover:hidden">Draft</span>
              <span className="hidden text-ok group-hover:inline-block group-hover:animate-[preview-pop_400ms_var(--ease)]">
                Published
              </span>
            </span>
          ) : (
            <span className="text-muted">{status}</span>
          )}
        </div>
      ))}
    </div>
  );
}

const PREVIEWS = { websites: Website, 'web-apps': WebApp, ecommerce: Store, admin: Admin };

// Takes a service from data/services.js; services without a coded preview show their icon.
export default function ServicePreview({ service, className = 'h-40' }) {
  const Preview = PREVIEWS[service.preview || service.id];
  return (
    <div aria-hidden="true" className={`well overflow-hidden rounded-lg ${className}`}>
      {Preview ? (
        <Preview />
      ) : (
        <div className="grid h-full place-items-center">
          <MaterialIcon name={service.icon} size={56} className="text-muted transition-colors group-hover:text-accent" />
        </div>
      )}
    </div>
  );
}
