const STOCK = [
  ['Basmati rice 5kg', 142, 40],
  ['Cooking oil 3L', 18, 24],
  ['Sugar 1kg', 260, 80],
  ['Green tea 950g', 35, 30],
];

// A stock list catching a low item before it runs out. Quantities carry data-num so a parent can
// count them up; while the card (nearest `.group`) is hovered, one more unit of the low item sells.
export default function StockPreview() {
  const low = STOCK.find(([, qty, reorder]) => qty < reorder);
  return (
    <div aria-hidden="true" className="flex h-full flex-col well rounded-lg p-4 text-[12px] leading-4">
      <div className="grid grid-cols-[1fr_64px_72px] gap-2 pb-2 font-mono text-muted">
        <span>Item</span>
        <span className="text-right">In stock</span>
        <span className="text-right">Reorder at</span>
      </div>
      {STOCK.map(([item, qty, reorder]) => {
        const isLow = qty < reorder;
        return (
          <div
            key={item}
            className={`-mx-2 grid grid-cols-[1fr_64px_72px] gap-2 rounded-[6px] px-2 py-2 ${isLow ? 'bg-warn-tint' : ''}`}
          >
            <span className="truncate text-soft">{item}</span>
            <span className={`text-right font-mono tabular-nums ${isLow ? 'text-warn' : 'text-ink'}`}>
              {isLow ? (
                <>
                  <span data-num={qty} className="group-hover:hidden">
                    {qty}
                  </span>
                  <span className="hidden group-hover:inline-block group-hover:animate-[preview-pop_400ms_var(--ease)]">
                    {qty - 1}
                  </span>
                </>
              ) : (
                <span data-num={qty}>{qty}</span>
              )}
            </span>
            <span className="text-right font-mono tabular-nums text-muted">{reorder}</span>
          </div>
        );
      })}
      <p className="mt-auto flex items-center gap-2 border-t border-line pt-3 text-soft">
        <span className="size-2 shrink-0 rounded-full bg-warn text-warn group-hover:animate-[alert-ring_900ms_var(--ease)]" />
        {low[0]} is below its reorder level
      </p>
    </div>
  );
}
