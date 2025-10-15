import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/widgets/header";

export const LandingMainPage = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const back = "/back.jpg"; // фон из public

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 15;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 15;
    };

    const handleMouseLeave = () => {
      // при уходе курсора фон медленно возвращается в центр
      target.current.x = 0;
      target.current.y = 0;
    };

    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 0.05;
      current.current.y += (target.current.y - current.current.y) * 0.05;

      if (bgRef.current) {
        bgRef.current.style.backgroundPosition = `calc(50% + ${current.current.x}px) calc(50% + ${current.current.y}px)`;
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={bgRef}
      className="relative min-h-screen text-white font-[Montserrat] overflow-hidden"
      style={{
        backgroundImage: `url(${back})`,
        backgroundSize: "110%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* затемнение */}
      <div className="absolute inset-0 bg-black/70 animate-fade-in" />

      {/* HEADER */}
      <Header/>

      {/* HERO */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-4">
        <h1
          className="text-6xl md:text-8xl font-bold tracking-[0.25em] mb-4 uppercase text-cyan-100 drop-shadow-[0_0_25px_rgba(34,211,238,0.7)]"
          style={{
            animation:
              "slideUp 1s ease-out forwards, glowPulse 3s ease-in-out infinite",
          }}
        >
          TradeApp
        </h1>

        <p
          className="text-cyan-200/80 text-lg md:text-xl mb-8 drop-shadow-[0_0_12px_rgba(34,211,238,0.5)] opacity-0"
          style={{
            animation: "fadeIn 1s ease-out forwards",
            animationDelay: "0.4s",
          }}
        >
          Analyze. Improve. Win.
        </p>

        <Button
          size="lg"
          className="relative px-8 py-6 text-lg font-semibold rounded-full text-black bg-cyan-400 hover:bg-cyan-300 transition shadow-[0_0_25px_rgba(34,211,238,0.8)] opacity-0"
          style={{
            animation: "slideUp 1s ease-out forwards",
            animationDelay: "0.7s",
          }}
        >
          Get Started →
          <span className="absolute inset-0 blur-xl bg-cyan-400/40 -z-10 rounded-full"></span>
        </Button>
      </div>

      {/* BOTTOM PANEL */}
      <div
        className="absolute bottom-0 left-0 w-full bg-black/40 backdrop-blur-md flex flex-col sm:flex-row justify-center sm:justify-around items-center py-6 gap-6 text-center text-gray-200 z-20 border-t border-cyan-400/20 opacity-0"
        style={{
          animation: "fadeIn 1.2s ease-out forwards",
          animationDelay: "1s",
        }}
      >
        {[
          ["1200+", "Trades"],
          ["85%", "Win Rate"],
          ["20+", "Metrics"],
          ["5K+", "Screenshots"],
        ].map(([num, label]) => (
          <div key={label}>
            <span className="text-3xl font-bold text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
              {num}
            </span>
            <p className="text-sm tracking-wide text-gray-400 uppercase">
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* inline keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glowPulse {
          0%, 100% { text-shadow: 0 0 20px rgba(34,211,238,0.7), 0 0 40px rgba(34,211,238,0.4); }
          50% { text-shadow: 0 0 35px rgba(34,211,238,0.9), 0 0 60px rgba(34,211,238,0.6); }
        }
      `}</style>
    </div>
  );
};

export default LandingMainPage;
