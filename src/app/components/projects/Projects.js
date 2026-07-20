"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { PROJECTS } from "./projects.data";

function useReveal(threshold = 0.15) {
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

function useHasHoverPointer() {
  const [hasHover, setHasHover] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setHasHover(mq.matches);
    const handler = (e) => setHasHover(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return hasHover;
}

/**
 * Shoji panel: a solid card that slides away on hover/tap to reveal the
 * image behind it directly — no mask, no blur, just a clean slide.
 */
function ShojiPanel({ open, direction, index }) {
  return (
    <div
      className={`absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-[#efebe1] border-black/10 transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        direction === "left" ? "border-r" : "border-l"
      } ${
        open
          ? direction === "left"
            ? "-translate-x-full"
            : "translate-x-full"
          : "translate-x-0"
      }`}
    >
      <div className="relative w-9 h-9 flex items-center justify-center">
        <span className="absolute w-full h-full rounded-full border border-[#1c1b17]/[0.08]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#2e3d5c]" />
      </div>
      <span className="[font-family:Playfair_Display,ui-serif,Georgia,serif] italic text-3xl text-[#1c1b17]/25">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="[font-family:Jost,ui-sans-serif,system-ui] text-[10px] tracking-[0.14em] uppercase text-[#1c1b17]/35">
        Hover to reveal
      </span>
    </div>
  );
}

function ProjectFrame({ proj, direction, index }) {
  const hasHover = useHasHoverPointer();
  const [hovered, setHovered] = useState(false);
  const [tapped, setTapped] = useState(false);
  const [current, setCurrent] = useState(0);
  const open = hasHover ? hovered : tapped;

  const prevImg = (e) => {
    e.stopPropagation();
    setCurrent((c) => (c === 0 ? proj.images.length - 1 : c - 1));
  };
  const nextImg = (e) => {
    e.stopPropagation();
    setCurrent((c) => (c === proj.images.length - 1 ? 0 : c + 1));
  };

  return (
    <div
      role={hasHover ? undefined : "button"}
      tabIndex={hasHover ? undefined : 0}
      onMouseEnter={() => hasHover && setHovered(true)}
      onMouseLeave={() => hasHover && setHovered(false)}
      onClick={() => !hasHover && setTapped((v) => !v)}
      onKeyDown={(e) => {
        if (!hasHover && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          setTapped((v) => !v);
        }
      }}
      className="relative w-full aspect-[16/8] rounded-2xl overflow-hidden border border-black/10 bg-[#efebe1] cursor-pointer select-none"
    >
      <Image
        src={proj.images[current]}
        alt={`${proj.title} screenshot ${current + 1}`}
        fill
        className="object-cover"
      />

      <ShojiPanel open={open} direction={direction} index={index} />

      {open && proj.images.length > 1 && (
        <>
          <button
            onClick={prevImg}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 flex items-center justify-center rounded-full border border-black/10 bg-[#f5f2ea]/90 backdrop-blur-sm text-[#1c1b17] hover:border-black/25 transition-colors duration-200"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={nextImg}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 flex items-center justify-center rounded-full border border-black/10 bg-[#f5f2ea]/90 backdrop-blur-sm text-[#1c1b17] hover:border-black/25 transition-colors duration-200"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
            {proj.images.map((_, i) => (
              <span
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? "16px" : "5px",
                  height: "5px",
                  background: i === current ? "#2e3d5c" : "rgba(28,27,23,0.25)",
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ProjectBlock({ proj, index }) {
  const [ref, visible] = useReveal();
  const direction = index % 2 === 0 ? "left" : "right";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 90}ms` }}
      className={`w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <ProjectFrame proj={proj} direction={direction} index={index} />

      <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-14 mt-8">
        <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-4 md:w-32 shrink-0">
          <span className="[font-family:Jost,ui-sans-serif,system-ui] flex items-center gap-1.5 text-[10px] tracking-[0.14em] uppercase text-[#1c1b17]/55 border border-black/10 rounded-full px-2.5 py-1">
            <span
              className={`w-1.5 h-1.5 rounded-full bg-[#2e3d5c] ${
                proj.status === "LIVE" ? "animate-pulse" : ""
              }`}
            />
            {proj.status === "LIVE" ? "Live" : "In progress"}
          </span>
          <span className="[font-family:Jost,ui-sans-serif,system-ui] text-[10px] tracking-[0.14em] uppercase text-[#1c1b17]/35">
            {proj.year}
          </span>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div>
            <h3 className="[font-family:Playfair_Display,ui-serif,Georgia,serif] font-normal text-4xl md:text-5xl text-[#1c1b17] leading-none mb-1.5">
              {proj.title}
            </h3>
            <p className="[font-family:Jost,ui-sans-serif,system-ui] text-[11px] tracking-[0.14em] uppercase text-[#1c1b17]/40">
              {proj.role}
            </p>
          </div>

          <p className="[font-family:Jost,ui-sans-serif,system-ui] text-[13px] leading-relaxed text-[#1c1b17]/60 border-l border-black/10 pl-4 max-w-2xl">
            {proj.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {proj.stack.map((tag) => (
              <span
                key={tag}
                className="[font-family:Jost,ui-sans-serif,system-ui] text-[11px] tracking-wide text-[#1c1b17]/70 border border-black/10 rounded-full px-2.5 py-1"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-3 flex-wrap mt-1">
            {proj.link && (
              <a
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                className="[font-family:Jost,ui-sans-serif,system-ui] group flex items-center gap-2 text-[11px] tracking-[0.1em] uppercase text-[#1c1b17] border border-black/10 hover:border-black/25 px-3.5 py-2 rounded-full transition-all duration-200"
              >
                Live demo
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}

            <a
              href="https://github.com/GregHaji"
              target="_blank"
              rel="noopener noreferrer"
              className="[font-family:Jost,ui-sans-serif,system-ui] flex items-center gap-2 text-[11px] tracking-[0.1em] uppercase text-[#1c1b17]/60 hover:text-[#1c1b17] border border-black/10 hover:border-black/25 px-3.5 py-2 rounded-full transition-all duration-200"
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const list = Object.values(PROJECTS);

  return (
    <section
      id="projects"
      className="[font-family:Jost,ui-sans-serif,system-ui] relative w-full bg-[#f5f2ea] py-28 px-6 sm:px-12 md:px-16 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at 96% 8%, transparent 0 22px, rgba(28,27,23,0.03) 22px 23px)",
        }}
      />

      <div className="relative max-w-4xl mx-auto">
        <div className="mb-20">
          <p className="text-[11px] tracking-[0.16em] uppercase text-[#1c1b17]/40 mb-4">
            <span className="[font-family:Playfair_Display,ui-serif,Georgia,serif] italic text-[#2e3d5c] mr-2">
              /
            </span>
            Projects
          </p>
          <h2 className="[font-family:Playfair_Display,ui-serif,Georgia,serif] font-normal text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05] text-[#1c1b17]">
            A few things I&apos;ve built.
          </h2>
        </div>

        <div className="flex flex-col gap-24">
          {list.map((proj, i) => (
            <ProjectBlock key={proj.id} proj={proj} index={i} />
          ))}
        </div>

        <div className="flex justify-center mt-20">
          <div className="w-1.5 h-1.5 rounded-full bg-[#1c1b17]/20" />
        </div>
      </div>
    </section>
  );
}
