import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <header
      className={`z-50 w-full flex items-center justify-between px-8 py-4 transition-all duration-300
        ${isLanding ? "absolute top-0 left-0" : "sticky top-0"} 
        bg-transparent text-white`}
    >
      {/* ЛОГОТИП */}
      <Link
        to="/"
        className="text-2xl font-bold tracking-wider drop-shadow-[0_0_10px_rgba(56,189,248,0.8)]"
      >
        TRADE<span className="text-cyan-400">APP</span>
      </Link>

      {/* НАВИГАЦИЯ */}
      <nav className="hidden md:flex gap-6 text-sm uppercase tracking-wide">
        <Link to="/" className="hover:text-cyan-400 transition">
          Home
        </Link>
        <Link to="/about" className="hover:text-cyan-400 transition">
          About
        </Link>
        <Link to="/trades" className="hover:text-cyan-400 transition">
          Journal
        </Link>
        <Link to="/curve" className="hover:text-cyan-400 transition">
          Curve
        </Link>
      </nav>

      {/* КНОПКА */}
      <Button
        className="bg-transparent border border-cyan-400/40 text-white hover:bg-cyan-400/20 backdrop-blur-sm"
        variant="outline"
      >
        Join Now
      </Button>
    </header>
  );
};
