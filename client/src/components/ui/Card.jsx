export default function Card({ children, className = '' }) {
  return (
    <div className={`rounded-24 bg-white p-6 shadow-lg ${className}`}>
      {children}
    </div>
  );
}
