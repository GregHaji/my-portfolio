"use client";

import Image from "next/image";
import { PROJECTS } from "./projects.data";

// A little rotation per card, like photos tossed on a desk. Deterministic —
// same card always gets the same tilt, no randomness/hydration weirdness.
const TILTS = [-3, 2, -1.5, 3, -2, 1.5];

export default function Projects() {
  const list = Object.values(PROJECTS);

  return (
    <section
      id="projects"
      className="[font-family:Jost,ui-sans-serif,system-ui] relative w-full bg-[#f5f2ea] py-28 px-6 sm:px-12 md:px-16"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-20 max-w-2xl">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-16">
          {list.map((proj, i) => {
            const tilt = TILTS[i % TILTS.length];
            return (
              <div
                key={proj.id}
                className="group rounded-lg bg-[#fbf9f4] border border-black/10 p-3 pb-5 shadow-[0_10px_30px_-15px_rgba(28,27,23,0.3)] transition-transform duration-300 ease-out hover:!rotate-0 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(28,27,23,0.35)]"
                style={{ transform: `rotate(${tilt}deg)` }}
              >
                <div className="relative w-full aspect-video rounded-sm overflow-hidden bg-[#efebe1]">
                  <Image
                    src={proj.images[0]}
                    alt={proj.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="pt-4 px-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full bg-[#2e3d5c] ${
                        proj.status === "LIVE" ? "animate-pulse" : ""
                      }`}
                    />
                    <span className="text-[10px] tracking-[0.12em] uppercase text-[#1c1b17]/40">
                      {proj.status === "LIVE" ? "Live" : "In progress"} ·{" "}
                      {proj.year}
                    </span>
                  </div>

                  <h3 className="[font-family:Playfair_Display,ui-serif,Georgia,serif] text-2xl text-[#1c1b17] leading-tight mb-1">
                    {proj.title}
                  </h3>
                  <p className="text-[11px] tracking-[0.1em] uppercase text-[#1c1b17]/40 mb-3">
                    {proj.role}
                  </p>

                  <p className="text-[13px] leading-relaxed text-[#1c1b17]/60 mb-4">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {proj.stack.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] tracking-wide text-[#1c1b17]/60 border border-black/10 rounded-full px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] tracking-[0.08em] uppercase text-[#1c1b17] underline decoration-black/20 underline-offset-4 hover:decoration-black/50 transition-colors duration-200"
                      >
                        Live demo
                      </a>
                    )}
                    <a
                      href="https://github.com/GregHaji"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] tracking-[0.08em] uppercase text-[#1c1b17]/60 underline decoration-black/10 underline-offset-4 hover:text-[#1c1b17] hover:decoration-black/40 transition-colors duration-200"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
