import { Link, useLocation } from "react-router-dom";

const linkClassName = (active: boolean) =>
  [
    "text-sm uppercase tracking-wide transition-colors",
    active ? "text-cyan-300" : "text-slate-300 hover:text-cyan-300",
  ].join(" ");

export const Header = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#020617]/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold tracking-[0.2em] text-white">
          TRADE<span className="text-cyan-300">APP</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link to="/" className={linkClassName(location.pathname === "/")}>
            Home
          </Link>
          <Link
            to="/trades"
            className={linkClassName(location.pathname === "/trades" || location.pathname.startsWith("/trades/"))}
          >
            Tables
          </Link>
        </nav>
      </div>
    </header>
  );
};
