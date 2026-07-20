"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProjectViewer({ project, onBack }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [glitching, setGlitching] = useState(false);

  // lock background scroll only
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const glitchTo = (next) => {
    setGlitching(true);
    setTimeout(() => {
      setActiveIndex(next);
      setTimeout(() => setGlitching(false), 120);
    }, 60);
  };

  // Dynamic color based on status
  const statusColor =
    project.status === "LIVE"
      ? "text-emerald-400"
      : project.status === "WIP"
        ? "text-yellow-400"
        : "text-gray-400";

  return (
    <div className="fixed inset-0 z-50 bg-[#050608] font-mono text-green-400">
      {/* ───────── BACKGROUND FX ───────── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(34,197,94,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(16,185,129,0.12),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.04] bg-[url('/noise.png')] mix-blend-overlay" />
        <div className="absolute inset-0 shadow-[inset_0_0_240px_rgba(0,0,0,0.9)]" />
      </div>

      {/* ───────── SCROLL CONTAINER ───────── */}
      <div className="relative z-10 h-full overflow-y-auto px-10 py-14 scrollbar-none">
        {/* ───────── HEADER ───────── */}
        <div className="mb-16 max-w-5xl">
          <button
            onClick={onBack}
            className="mb-8 inline-flex items-center gap-2 border border-emerald-400/60 px-4 py-2 text-sm text-emerald-300 hover:bg-emerald-400 hover:text-black transition"
          >
            ← BACK TO TERMINAL
          </button>

          <div className="flex flex-wrap items-center gap-4 mb-2">
            <h3 className="text-4xl tracking-tight text-emerald-300">
              {project.title}
            </h3>
            <span
              className={`text-xs px-2 py-1 rounded border ${statusColor} border-current`}
            >
              {project.status}
            </span>
          </div>

          <p className="max-w-3xl text-green-200/80 leading-relaxed mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
            <span className="text-green-300/90">Year: {project.year}</span>
            <span className="text-green-300/90">Role: {project.role}</span>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 underline transition"
              >
                Live Project
              </a>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <span
                key={t}
                className="text-xs px-3 py-1 border border-green-400/40 text-green-300 bg-green-400/5"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ───────── CAROUSEL ───────── */}
        <div className="">
          <div className="relative flex flex-col items-center pb-32">
            {/* MAIN FRAME */}
            <div className="relative w-[68vw] max-w-[1050px] aspect-video mb-12">
              <Image
                src={project.images[activeIndex]}
                alt=""
                priority
                className={`object-cover rounded-xl border border-emerald-400/60 shadow-[0_0_60px_rgba(16,185,129,0.45)] transition-transform duration-500 ${
                  glitching ? "animate-glitch" : ""
                }`}
              />

              {/* CRT SCANLINES */}
              <div className="pointer-events-none absolute inset-0 rounded-xl bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.05)_50%)] bg-[length:100%_3px] opacity-40" />

              {/* FILE LABEL */}
              <div className="absolute bottom-3 left-3 text-xs bg-black/80 px-3 py-1 border border-emerald-400">
                &gt; frame_{activeIndex + 1}.png
              </div>
            </div>

            {/* CONTROLS */}
            <div className="flex gap-10 mt-6 text-sm">
              <button
                onClick={() =>
                  glitchTo(
                    (activeIndex - 1 + project.images.length) %
                      project.images.length,
                  )
                }
                className="hover:text-emerald-300 transition"
              >
                ◀ PREV
              </button>

              <button
                onClick={() =>
                  glitchTo((activeIndex + 1) % project.images.length)
                }
                className="hover:text-emerald-300 transition"
              >
                NEXT ▶
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
