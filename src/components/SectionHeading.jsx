export default function SectionHeading({
  label,
  title,
  children,
  as: Heading = 'h2',
  size = 'text-[clamp(2rem,3.6vw,3rem)]',
  className = '',
}) {
  return (
    <div className={className}>
      <p className="reveal-head eyebrow">{label}</p>
      <Heading className={`reveal-head mt-4 font-semibold leading-[1.08] tracking-[-0.035em] text-balance ${size}`}>
        {title}
      </Heading>
      {children && <p className="reveal-head mt-5 max-w-[62ch] text-base text-soft md:text-lg">{children}</p>}
    </div>
  );
}
