"use client";

import { useEffect, useRef, useState } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiGreensock,
  SiThreedotjs,
  SiMui,
  SiNodedotjs,
  SiExpress,
  SiJest,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiFirebase,
  SiVercel,
  SiNetlify,
  SiDocker,
  SiGithubactions,
  SiAmazons3,
} from "react-icons/si";

const CATEGORIES = [
  {
    num: "01",
    label: "Frontend",
    tools: ["React", "Next.js", "Tailwind CSS", "GSAP", "Three.js", "MUI"],
    note: "Responsive, accessible interfaces, built with modern tooling and a close eye on motion.",
  },
  {
    num: "02",
    label: "Backend",
    tools: ["Node.js", "Express", "Jest", "Husky", "REST APIs"],
    note: "APIs and services designed for clarity, with tests and hooks keeping the code honest.",
  },
  {
    num: "03",
    label: "Database",
    tools: ["PostgreSQL", "MySQL", "SQL Server", "MongoDB", "Firebase"],
    note: "Relational and NoSQL, chosen deliberately for the shape of the data at hand.",
  },
  {
    num: "04",
    label: "Deployment",
    tools: ["Vercel", "Netlify", "Docker", "GitHub Actions", "Amazon S3"],
    note: "Shipping and scaling with automated, repeatable pipelines.",
  },
];

const ALL_TOOLS = [
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "GSAP", icon: SiGreensock },
  { name: "Three.js", icon: SiThreedotjs },
  { name: "MUI", icon: SiMui },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Express", icon: SiExpress },
  { name: "Jest", icon: SiJest },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "MySQL", icon: SiMysql },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Firebase", icon: SiFirebase },
  { name: "Vercel", icon: SiVercel },
  { name: "Netlify", icon: SiNetlify },
  { name: "Docker", icon: SiDocker },
  { name: "GitHub Actions", icon: SiGithubactions },
  { name: "Amazon S3", icon: SiAmazons3 },
];

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

function Marquee() {
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const rafRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const track = trackRef.current;
    if (!track) return;

    const step = () => {
      if (!pausedRef.current) {
        offsetRef.current -= 0.4;
        const half = track.scrollWidth / 2;
        if (Math.abs(offsetRef.current) >= half) offsetRef.current = 0;
        track.style.transform = `translateX(${offsetRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reducedMotion]);

  const loop = [...ALL_TOOLS, ...ALL_TOOLS];

  return (
    <div
      className="relative overflow-hidden border-y border-black/10 py-8"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div
        ref={trackRef}
        className={`flex items-center gap-14 w-max ${
          reducedMotion ? "flex-wrap justify-center gap-8" : ""
        }`}
      >
        {(reducedMotion ? ALL_TOOLS : loop).map((tool, i) => {
          const Icon = tool.icon;
          return (
            <div
              key={`${tool.name}-${i}`}
              className="flex items-center gap-2 shrink-0 text-[#1c1b17]/35 hover:text-[#1c1b17] transition-colors duration-300"
            >
              <Icon className="w-5 h-5" aria-hidden="true" />
              <span className="[font-family:Jost,ui-sans-serif,system-ui] text-[13px] tracking-wide whitespace-nowrap">
                {tool.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Card({ category, index }) {
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
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 90}ms` }}
      className={`group rounded-2xl border border-black/10 bg-[#f5f2ea] p-7 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-black/20 hover:-translate-y-1 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="flex items-baseline justify-between mb-6">
        <span className="[font-family:Playfair_Display,ui-serif,Georgia,serif] italic text-[#2e3d5c] text-sm">
          {category.num}
        </span>
        <span className="[font-family:Jost,ui-sans-serif,system-ui] text-[10px] tracking-[0.16em] uppercase text-[#1c1b17]/35">
          Stack
        </span>
      </div>

      <h3 className="[font-family:Playfair_Display,ui-serif,Georgia,serif] font-normal text-2xl text-[#1c1b17] mb-4">
        {category.label}
      </h3>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {category.tools.map((tool) => (
          <span
            key={tool}
            className="[font-family:Jost,ui-sans-serif,system-ui] text-[11px] tracking-wide text-[#1c1b17]/70 border border-black/10 rounded-full px-2.5 py-1"
          >
            {tool}
          </span>
        ))}
      </div>

      <p className="[font-family:Jost,ui-sans-serif,system-ui] text-[13px] leading-relaxed text-[#1c1b17]/55 border-t border-black/10 pt-4">
        {category.note}
      </p>
    </div>
  );
}

export default function Skills() {
  return (
    <section
      id="my-skills"
      className="[font-family:Jost,ui-sans-serif,system-ui] relative w-full bg-[#f5f2ea] py-28 px-6 sm:px-12 md:px-16"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header — split like a threshold: structure on the left, open air on the right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-10 lg:gap-14 mb-16">
          <div>
            <p className="text-[11px] tracking-[0.16em] uppercase text-[#1c1b17]/40 mb-4">
              <span className="[font-family:Playfair_Display,ui-serif,Georgia,serif] italic text-[#2e3d5c] mr-2">
                /
              </span>
              Skills
            </p>
            <h2 className="[font-family:Playfair_Display,ui-serif,Georgia,serif] font-normal text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05] text-[#1c1b17]">
              Tools I reach for, and the reasons I trust them.
            </h2>
          </div>

          <div className="hidden lg:block bg-black/10" />

          <div className="flex items-end">
            <p className="[font-family:Playfair_Display,ui-serif,Georgia,serif] italic text-lg leading-relaxed text-[#1c1b17]/55 max-w-sm">
              Assembled with the same curiosity that started it all — not just
              what works, but why.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {CATEGORIES.map((cat, i) => (
            <Card key={cat.label} category={cat} index={i} />
          ))}
        </div>

        <Marquee />
      </div>
    </section>
  );
}
