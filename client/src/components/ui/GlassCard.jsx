export default function GlassCard({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-3xl p-6 shadow-lg border border-slate-200 ${className}`}>
      {children}
    </div>
  );
}
