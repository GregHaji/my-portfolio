"use client";

import { useEffect, useRef, useState } from "react";

const EXPERIENCES = [
  {
    title: "Eduvos",
    role: "BSc Software Engineering",
    duration: "2020 — 2022",
    status: "Graduated",
    description:
      "Graduated cum laude with a strong foundation in object-oriented programming, data structures, and algorithms — complemented by hands-on work building React web apps and a cross-platform Flutter app on Firebase and MySQL.",
    tools: [
      "Java",
      "React",
      "Flutter",
      "Firebase",
      "MySQL",
      "OOP",
      "Data Structures",
    ],
    side: "left",
  },
  {
    title: "Curo Pumps",
    role: "Software Engineering Intern",
    duration: "2022 — 2024",
    status: "Deployed",
    description:
      "Built a full-stack, production-ready pump selection and quotation system — real-time hydraulic calculations, configuration validation, and professional quotation generation — using Next.js, Node/Express, MongoDB, and Auth0.",
    tools: [
      "Next.js",
      "Tailwind CSS",
      "Express.js",
      "MongoDB",
      "Auth0",
      "Vercel",
    ],
    side: "right",
  },
  {
    title: "Metavaro",
    role: "Full Stack Developer",
    duration: "2024 — 2025",
    status: "Active",
    description:
      "Building full-stack web applications with Next.js and PostgreSQL, including a custom 360° interactive vehicle viewer with responsive, real-time interaction to sharpen product visualization.",
    tools: [
      "Next.js",
      "PostgreSQL",
      "GSAP",
      "Three.js",
      "Express.js",
      "REST APIs",
    ],
    side: "left",
  },
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

function TimelineLine() {
  const [ref, visible] = useReveal(0.05);
  return (
    <div
      ref={ref}
      className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-black/10 origin-top transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{ transform: `scaleY(${visible ? 1 : 0})` }}
    />
  );
}

function ExperienceCard({ exp, index }) {
  const [ref, visible] = useReveal();
  const fromLeft = exp.side === "left";

  return (
    <div
      className={`flex w-full ${exp.side === "right" ? "md:justify-end" : "md:justify-start"} justify-center`}
    >
      <div
        ref={ref}
        style={{ transitionDelay: `${index * 120}ms` }}
        className={`relative w-full md:w-[46%] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          visible
            ? "opacity-100 translate-x-0"
            : `opacity-0 ${fromLeft ? "-translate-x-6" : "translate-x-6"}`
        }`}
      >
        {/* Timeline node */}
        <div
          className={`hidden md:flex absolute top-8 w-3 h-3 items-center justify-center ${
            exp.side === "right" ? "-left-[30px]" : "-right-[30px]"
          }`}
        >
          <div className="absolute w-4 h-4 rounded-full border border-[#1c1b17]/[0.08]" />
          <div className="w-2 h-2 rounded-full bg-[#2e3d5c]" />
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-black/10 bg-[#f5f2ea] p-7 transition-colors duration-300 hover:border-black/20">
          <div className="flex items-center justify-between mb-5">
            <span className="[font-family:Jost,ui-sans-serif,system-ui] text-[10px] tracking-[0.14em] uppercase text-[#1c1b17]/40">
              {exp.duration}
            </span>
            <span className="[font-family:Jost,ui-sans-serif,system-ui] flex items-center gap-1.5 text-[10px] tracking-[0.14em] uppercase text-[#1c1b17]/55">
              <span
                className={`w-1.5 h-1.5 rounded-full bg-[#2e3d5c] ${
                  exp.status === "Active" ? "animate-pulse" : ""
                }`}
              />
              {exp.status}
            </span>
          </div>

          <h3 className="[font-family:Playfair_Display,ui-serif,Georgia,serif] text-3xl text-[#1c1b17] leading-none mb-1.5">
            {exp.title}
          </h3>
          <p className="[font-family:Jost,ui-sans-serif,system-ui] text-[13px] tracking-wide text-[#1c1b17]/50 mb-5">
            {exp.role}
          </p>

          <p className="[font-family:Jost,ui-sans-serif,system-ui] text-[13px] leading-relaxed text-[#1c1b17]/60 border-l border-black/10 pl-4 mb-6">
            {exp.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {exp.tools.map((tool) => (
              <span
                key={tool}
                className="[font-family:Jost,ui-sans-serif,system-ui] text-[11px] tracking-wide text-[#1c1b17]/70 border border-black/10 rounded-full px-2.5 py-1"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      className="[font-family:Jost,ui-sans-serif,system-ui] relative w-full bg-[#f5f2ea] py-28 px-6 sm:px-12 md:px-16"
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-20 max-w-2xl">
          <p className="text-[11px] tracking-[0.16em] uppercase text-[#1c1b17]/40 mb-4">
            <span className="[font-family:Playfair_Display,ui-serif,Georgia,serif] italic text-[#2e3d5c] mr-2">
              /
            </span>
            Experience
          </p>
          <h2 className="[font-family:Playfair_Display,ui-serif,Georgia,serif] font-normal text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05] text-[#1c1b17]">
            Three stops, so far.
          </h2>
        </div>

        <div className="relative">
          <TimelineLine />

          <div className="flex flex-col gap-12">
            {EXPERIENCES.map((exp, i) => (
              <ExperienceCard key={exp.title} exp={exp} index={i} />
            ))}
          </div>

          <div className="hidden md:flex absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8 flex-col items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1c1b17]/20" />
            <p className="[font-family:Playfair_Display,ui-serif,Georgia,serif] italic text-xs text-[#1c1b17]/35">
              still walking
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
