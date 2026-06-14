function ForgotPassword() {
  return (
    <div className="mx-auto max-w-xl rounded-3xl border border-slate-800 bg-slate-900/90 p-10 shadow-2xl shadow-slate-950/40">
      <h2 className="text-3xl font-semibold text-white">Forgot Password</h2>
      <p className="mt-2 text-slate-400">Enter your email to receive password reset instructions.</p>
      <form className="mt-8 space-y-6">
        <input type="email" placeholder="Email address" className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-brand" />
        <button type="submit" className="w-full rounded-2xl bg-brand px-5 py-3 text-base font-semibold text-white transition hover:bg-brand-dark">Send Reset Link</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
