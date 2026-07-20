"use client";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faUsers,
  faLightbulb,
  faFire,
} from "@fortawesome/free-solid-svg-icons";

const TRAITS = [
  {
    icon: faBrain,
    label: "Fast learner",
    desc: "Adapts quickly to new technologies and patterns, comfortable learning on the fly.",
  },
  {
    icon: faUsers,
    label: "Team player",
    desc: "Collaborates across teams and values shared ownership of solutions.",
  },
  {
    icon: faLightbulb,
    label: "Problem solver",
    desc: "Breaks complex problems into clean, maintainable solutions.",
  },
  {
    icon: faFire,
    label: "Curious",
    desc: "Driven by a genuine love for technology, always exploring something new.",
  },
];

const STATS = [
  { val: "12+", label: "Completed projects" },
  { val: "130+", label: "Commits in 2025" },
  { val: "3+", label: "Years experience" },
];

function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Trait({ trait, index }) {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 100}ms` }}
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      <div className="relative w-11 h-11 mb-4">
        <div className="absolute -inset-2 rounded-full border border-[#1c1b17]/[0.06]" />
        <div className="relative w-11 h-11 rounded-full border border-black/10 bg-[#efebe1] flex items-center justify-center text-[#2e3d5c]">
          <FontAwesomeIcon icon={trait.icon} className="w-4 h-4" />
        </div>
      </div>
      <p className="[font-family:Playfair_Display,ui-serif,Georgia,serif] italic text-lg text-[#1c1b17] mb-1.5">
        {trait.label}
      </p>
      <p className="[font-family:Jost,ui-sans-serif,system-ui] text-[13px] leading-relaxed text-[#1c1b17]/55 max-w-[24ch]">
        {trait.desc}
      </p>
    </div>
  );
}

function Stat({ stat, index }) {
  const [ref, visible] = useReveal();
  const offset = index % 2 === 1 ? "lg:ml-6" : "";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 100}ms` }}
      className={`${offset} flex items-center gap-4 py-5 border-b border-black/10 last:border-b-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
      }`}
    >
      <span className="[font-family:Playfair_Display,ui-serif,Georgia,serif] text-3xl text-[#1c1b17] leading-none">
        {stat.val}
      </span>
      <span className="[font-family:Jost,ui-sans-serif,system-ui] text-[11px] tracking-[0.08em] uppercase text-[#1c1b17]/45 leading-tight max-w-[9ch]">
        {stat.label}
      </span>
    </div>
  );
}

export default function About() {
  const [quoteRef, quoteVisible] = useReveal(0.3);

  return (
    <section
      id="about-me"
      className="[font-family:Jost,ui-sans-serif,system-ui] relative w-full bg-[#f5f2ea] py-28 px-6 sm:px-12 md:px-16 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at 6% 12%, transparent 0 22px, rgba(28,27,23,0.035) 22px 23px), repeating-radial-gradient(circle at 95% 90%, transparent 0 26px, rgba(28,27,23,0.03) 26px 27px)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <p className="text-[11px] tracking-[0.16em] uppercase text-[#1c1b17]/40 mb-14">
          <span className="[font-family:Playfair_Display,ui-serif,Georgia,serif] italic text-[#2e3d5c] mr-2">
            /
          </span>
          About
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-16">
          {/* MAIN — pull quote + traits */}
          <div>
            <div
              ref={quoteRef}
              className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                quoteVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <h2 className="[font-family:Playfair_Display,ui-serif,Georgia,serif] italic font-normal text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[1.08] text-[#1c1b17] mb-8 max-w-[18ch]">
                A curious kid to a full stack developer.
              </h2>
              <p className="text-sm leading-relaxed text-[#1c1b17]/60 max-w-lg">
                At seven, I built my first PC, and that curiosity became a
                lasting habit. Today I&apos;m a full stack developer with 3+
                years of experience across teams and projects, still approaching
                every build the same way: experimenting, learning, and pushing
                toward something more considered.
              </p>
            </div>

            <div className="h-px bg-black/10 my-14" />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-10">
              {TRAITS.map((t, i) => (
                <Trait key={t.label} trait={t} index={i} />
              ))}
            </div>
          </div>

          {/* SIDE — stats */}
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-[11px] tracking-[0.14em] uppercase text-[#1c1b17]/35 mb-2">
              In numbers
            </p>
            <div>
              {STATS.map((s, i) => (
                <Stat key={s.label} stat={s} index={i} />
              ))}
            </div>
            <p className="[font-family:Playfair_Display,ui-serif,Georgia,serif] italic text-sm text-[#1c1b17]/50 mt-8">
              — currently building, Johannesburg
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
