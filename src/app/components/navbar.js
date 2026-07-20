import { useState, useEffect, useRef, useCallback } from "react";

const NAV_ITEMS = [
  { name: "About", id: "about-me" },
  { name: "Skills", id: "my-skills" },
  { name: "Experience", id: "experience" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
];

const RING_RADIUS = 14;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export default function Nav() {
  const [activeId, setActiveId] = useState(NAV_ITEMS[0].id);
  const [mounted, setMounted] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const lastYRef = useRef(0);
  const reducedMotion = usePrefersReducedMotion();

  function usePrefersReducedMotion() {
    const [reduced, setReduced] = useState(false);
    useEffect(() => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReduced(mq.matches);
      const handler = (e) => setReduced(e.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }, []);
    return reduced;
  }

  useEffect(() => {
    setMounted(true);
    lastYRef.current = window.scrollY;
  }, []);

  // Hide on scroll-down, reveal on scroll-up, track reading progress
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastYRef.current;

        if (y < 80) {
          setHidden(false);
        } else if (Math.abs(delta) > 6) {
          setHidden(delta > 0);
        }
        lastYRef.current = y;

        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        setProgress(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active-section tracking
  useEffect(() => {
    const observers = [];
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { threshold: 0.35, rootMargin: "-15% 0px -50% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Close menu on outside click / Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onPointer = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 92;
      window.scrollTo({ top: y, behavior: reducedMotion ? "auto" : "smooth" });
    }
    setMenuOpen(false);
  };

  const ringOffset = RING_CIRCUMFERENCE * (1 - progress);

  return (
    <div className="[font-family:'Inter',ui-sans-serif,system-ui]">
      <div className="fixed top-0 inset-x-0 z-50 flex justify-end pt-5 px-4 pointer-events-none">
        <nav
          ref={menuRef}
          className={`pointer-events-auto relative flex items-center gap-2 rounded-full border border-black/10 bg-[#f5f2ea]/90 backdrop-blur-md py-1.5 pl-5 pr-1.5 shadow-[0_8px_30px_-14px_rgba(0,0,0,0.35)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] 
            mounted ? "opacity-100" : "opacity-0 -translate-y-4"
          `}
        >
          <button
            onClick={() => scrollToSection(NAV_ITEMS[0].id)}
            className="[font-family:'Fraunces',ui-serif,Georgia,serif] font-medium text-[15px] tracking-tight text-[#1c1b17] flex items-baseline gap-0.5 bg-transparent border-none p-0 pr-2 cursor-pointer focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-[#2e3d5c] focus-visible:outline-offset-4 focus-visible:rounded-sm"
          >
            Gregory H<span className="italic text-[#2e3d5c]">.</span>
          </button>

          <span className="w-px h-4 bg-black/10" />

          <div className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-haspopup="true"
              className="relative w-9 h-9 rounded-full flex items-center justify-center bg-transparent border-none cursor-pointer hover:bg-black/5 transition-colors duration-300 focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-[#2e3d5c] focus-visible:outline-offset-2"
            >
              <svg
                viewBox="0 0 32 32"
                className="absolute inset-0 w-full h-full -rotate-90"
                aria-hidden="true"
              >
                <circle
                  cx="16"
                  cy="16"
                  r={RING_RADIUS}
                  fill="none"
                  stroke="rgba(28,27,23,0.1)"
                  strokeWidth="1.2"
                />
                <circle
                  cx="16"
                  cy="16"
                  r={RING_RADIUS}
                  fill="none"
                  stroke="#2e3d5c"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeDasharray={RING_CIRCUMFERENCE}
                  strokeDashoffset={ringOffset}
                  className="transition-[stroke-dashoffset] duration-150 ease-linear"
                />
              </svg>
              <span className="relative flex flex-col items-center justify-center gap-[5px]">
                <span
                  className={`block h-px bg-[#1c1b17] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    menuOpen ? "w-3.5 translate-y-[3px] rotate-45" : "w-3.5"
                  }`}
                />
                <span
                  className={`block h-px bg-[#1c1b17] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    menuOpen ? "w-3.5 -translate-y-[3px] -rotate-45" : "w-2.5"
                  }`}
                />
              </span>
            </button>

            <div
              role="menu"
              className={`absolute top-full right-0 mt-3 w-56 origin-top-right rounded-2xl border border-black/10 bg-[#f5f2ea]/95 backdrop-blur-md shadow-[0_20px_40px_-16px_rgba(0,0,0,0.35)] p-2 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                menuOpen
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
              }`}
            >
              {NAV_ITEMS.map((item, i) => {
                const isActive = activeId === item.id;
                return (
                  <button
                    key={item.id}
                    role="menuitem"
                    onClick={() => scrollToSection(item.id)}
                    aria-current={isActive ? "true" : undefined}
                    style={{
                      transitionDelay: menuOpen ? `${i * 40 + 60}ms` : "0ms",
                    }}
                    className={`w-full flex items-center gap-2 text-left bg-transparent border-none rounded-lg px-3 py-2.5 cursor-pointer text-[13px] tracking-wide transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-black/5 focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-[#2e3d5c] ${
                      menuOpen
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-2"
                    } ${isActive ? "text-[#2e3d5c] font-medium" : "text-[#1c1b17]/70"}`}
                  >
                    <span className="[font-family:'Fraunces',ui-serif,Georgia,serif] italic text-[#1c1b17]/30 w-3">
                      {isActive ? "/" : "\u00A0"}
                    </span>
                    {item.name}
                  </button>
                );
              })}
              <div className="mt-1 pt-2 px-3 border-t border-black/10 text-[10px] tracking-[0.1em] uppercase text-[#1c1b17]/35">
                Johannesburg, ZA
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
