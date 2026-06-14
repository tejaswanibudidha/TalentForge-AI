export default function Badge({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full bg-surface-secondary px-3 py-1 text-sm font-semibold text-primary-violet ${className}`}>
      {children}
    </span>
  );
}
