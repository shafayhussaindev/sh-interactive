// Size goes through inline style: Google's unlayered .material-symbols-outlined rule beats Tailwind's layered utilities.
export default function MaterialIcon({ name, size = 20, className = '' }) {
  return (
    <span className={`material-symbols-outlined select-none ${className}`} style={{ fontSize: size }} aria-hidden="true">
      {name}
    </span>
  );
}
