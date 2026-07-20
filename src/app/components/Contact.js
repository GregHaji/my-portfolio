"use client";

import { useState } from "react";
import { FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa";

const SOCIALS = [
  {
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/in/gregory-haji-joannou-885553216/",
    label: "LinkedIn",
  },
  { icon: FaGithub, href: "https://github.com/GregHaji", label: "GitHub" },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/greg_haji/",
    label: "Instagram",
  },
];

export default function Contact() {
  const [status, setStatus] = useState("");
  const [focused, setFocused] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.target;
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.value,
          email: form.email.value,
          message: form.message.value,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        console.error(data.error);
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const fieldClass = (name) =>
    `w-full bg-transparent border-b py-2.5 text-sm text-[#1c1b17] outline-none transition-colors duration-300 [font-family:Jost,ui-sans-serif,system-ui] placeholder:[font-family:Playfair_Display,ui-serif,Georgia,serif] placeholder:italic placeholder:text-[#1c1b17]/35 ${
      focused === name ? "border-[#2e3d5c]" : "border-black/15"
    }`;

  return (
    <section
      id="contact"
      className="[font-family:Jost,ui-sans-serif,system-ui] relative w-full bg-[#f5f2ea] py-28 px-6 sm:px-12 md:px-16 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at 8% 90%, transparent 0 22px, rgba(28,27,23,0.035) 22px 23px), repeating-radial-gradient(circle at 94% 10%, transparent 0 26px, rgba(28,27,23,0.03) 26px 27px)",
        }}
      />

      <div className="relative max-w-4xl mx-auto">
        <p className="text-[11px] tracking-[0.16em] uppercase text-[#1c1b17]/40 mb-4">
          <span className="[font-family:Playfair_Display,ui-serif,Georgia,serif] italic text-[#2e3d5c] mr-2">
            /
          </span>
          Contact
        </p>
        <h2 className="[font-family:Playfair_Display,ui-serif,Georgia,serif] font-normal text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05] text-[#1c1b17] mb-4 max-w-lg">
          A letter to a distant friend.
        </h2>
        <p className="[font-family:Playfair_Display,ui-serif,Georgia,serif] italic text-lg text-[#1c1b17]/55 mb-16 max-w-md">
          Take a moment, write what&apos;s on your mind, and it will find its
          way to me.
        </p>

        <div className="relative rounded-3xl border border-black/10 bg-[#f5f2ea] p-8 sm:p-14 shadow-[0_20px_60px_-30px_rgba(28,27,23,0.2)]">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-14">
            {/* Form */}
            <div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  className={fieldClass("name")}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused("")}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  className={fieldClass("email")}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused("")}
                  required
                />
                <textarea
                  rows={5}
                  name="message"
                  placeholder="What's on your mind?"
                  className={`${fieldClass("message")} resize-none`}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused("")}
                  required
                />

                <div className="flex items-center gap-5 mt-2">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="flex items-center gap-2.5 text-[11px] tracking-[0.12em] uppercase text-[#f5f2ea] bg-[#1c1b17] hover:bg-[#2e3d5c] disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-full transition-colors duration-300"
                  >
                    {status === "sending" ? "Sending" : "Send"}
                    <span className="[font-family:Playfair_Display,ui-serif,Georgia,serif] italic">
                      →
                    </span>
                  </button>

                  {status === "success" && (
                    <span className="[font-family:Playfair_Display,ui-serif,Georgia,serif] italic text-sm text-[#2e3d5c]">
                      Delivered — thank you.
                    </span>
                  )}
                  {status === "error" && (
                    <span className="text-[11px] tracking-wide text-[#8a3b3b]">
                      Something went wrong — try again?
                    </span>
                  )}
                </div>
              </form>
            </div>

            {/* Elsewhere / details */}
            <div className="flex flex-col gap-9 border-t md:border-t-0 md:border-l border-black/10 pt-9 md:pt-0 md:pl-11">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="relative w-2.5 h-2.5 flex items-center justify-center">
                    <span className="absolute w-4 h-4 rounded-full border border-[#1c1b17]/[0.08]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2e3d5c]" />
                  </span>
                  <p className="text-[10px] tracking-[0.14em] uppercase text-[#1c1b17]/35">
                    Find me elsewhere
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  {SOCIALS.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 text-[#1c1b17]/60 hover:text-[#1c1b17] transition-colors duration-300"
                    >
                      <div className="w-8 h-8 flex items-center justify-center rounded-full border border-black/10 group-hover:border-black/25 transition-colors duration-300">
                        <Icon className="text-[12px]" />
                      </div>
                      <span className="text-[12px] tracking-wide">{label}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] tracking-[0.14em] uppercase text-[#1c1b17]/35 mb-3">
                  Currently
                </p>
                <p className="[font-family:Playfair_Display,ui-serif,Georgia,serif] italic text-[15px] text-[#1c1b17]/75 leading-relaxed">
                  Johannesburg, ZA
                  <br />
                  Open to new work
                  <br />
                  Usually replies within 24h
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-black/10 flex items-center justify-between flex-wrap gap-4">
          <span className="[font-family:Playfair_Display,ui-serif,Georgia,serif] italic text-xl text-[#1c1b17]">
            GH<span className="text-[#2e3d5c]">.</span>
          </span>
          <span className="text-[10px] tracking-[0.1em] uppercase text-[#1c1b17]/35">
            © {new Date().getFullYear()} Greg Haji — All rights reserved
          </span>
        </div>
      </div>
    </section>
  );
}
