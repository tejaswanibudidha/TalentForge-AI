import AnimatedCard from './ui/AnimatedCard';

export default function PostCard({ post }) {
  return (
    <AnimatedCard className="transition">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{post.title}</h3>
          <p className="text-sm text-slate-600">{post.author} · {post.role}</p>
        </div>
        <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
      <p className="mt-4 text-sm text-slate-600">{post.content}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags?.map((tag) => (
          <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">#{tag}</span>
        ))}
      </div>
    </AnimatedCard>
  );
}
