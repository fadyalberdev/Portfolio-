export default function Arrow({ className = "", direction = "up-right" }: { className?: string; direction?: "up-right" | "down" | "right" }) {
  const rot = direction === "down" ? "rotate-[135deg]" : direction === "right" ? "rotate-45" : "";
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={`h-3.5 w-3.5 transition-transform duration-300 ${rot} ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 12 12 4M5.5 4H12v6.5" />
    </svg>
  );
}
