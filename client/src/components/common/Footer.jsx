function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-50 px-4 py-8 text-sm text-slate-600 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <div className="text-slate-700">© 2026 TalentForge AI. Built for modern recruiting teams.</div>
        <div className="flex gap-6">
          <div className="cursor-pointer hover:underline text-slate-600">Privacy</div>
          <div className="cursor-pointer hover:underline text-slate-600">Terms</div>
          <div className="cursor-pointer hover:underline text-slate-600">Support</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
