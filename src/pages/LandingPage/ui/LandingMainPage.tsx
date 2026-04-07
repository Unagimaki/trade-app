import { Link } from "react-router-dom";

export default function LandingMainPage() {
  return (
    <section className="min-h-[calc(100vh-73px)] bg-[#020617] text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-20 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-cyan-300">Trading Journal</p>
          <h1 className="text-5xl font-semibold leading-tight text-white lg:text-7xl">
            Tables for trade records, screenshots and custom stats
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
            Create separate tables, configure columns for your workflow and keep the journal in one place.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/trades"
              className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-950 transition hover:bg-cyan-200"
            >
              Open tables
            </Link>
          </div>
        </div>

        <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:grid-cols-2">
          <div className="rounded-2xl border border-cyan-400/20 bg-[#0f172a] p-5">
            <div className="text-sm uppercase tracking-wide text-cyan-300">Tables</div>
            <div className="mt-3 text-3xl font-semibold">Flexible</div>
            <p className="mt-2 text-sm text-slate-400">Columns, rows, screenshots and editing in one flow.</p>
          </div>
          <div className="rounded-2xl border border-cyan-400/20 bg-[#0f172a] p-5">
            <div className="text-sm uppercase tracking-wide text-cyan-300">Structure</div>
            <div className="mt-3 text-3xl font-semibold">Simple</div>
            <p className="mt-2 text-sm text-slate-400">Separate list page and table page with direct routing by id.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
