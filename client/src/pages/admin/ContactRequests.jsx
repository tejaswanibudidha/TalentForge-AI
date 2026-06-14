import { useData } from '../../context/DataContext';

export default function ContactRequests() {
  const { contacts } = useData();

  return (
    <div className="mx-auto max-w-6xl space-y-6 py-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-white">Contact Requests</h1>
        <p className="text-slate-400">All messages submitted through the TalentForge contact form.</p>
      </div>
      <div className="grid gap-4">
        {contacts.length ? contacts.map((request) => (
          <div key={request.id} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white">{request.subject}</h2>
                <p className="mt-1 text-sm text-slate-300">From {request.name} • {request.email}</p>
              </div>
              <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold uppercase text-white">{new Date(request.submittedAt).toLocaleDateString()}</span>
            </div>
            <p className="mt-4 text-slate-300">{request.message}</p>
          </div>
        )) : (
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-10 text-center text-slate-400">No contact requests found yet.</div>
        )}
      </div>
    </div>
  );
}
