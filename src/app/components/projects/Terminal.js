"use client";
import { useEffect, useRef, useState } from "react";

export default function Terminal({ projects, onOpenProject, onClose }) {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const ref = useRef(null);
  const booted = useRef(false);
  const running = useRef(false);

  const getRandomIndex = useRef((max) => Math.floor(Math.random() * max));

  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  const typeLine = async (text) => {
    let line = "";
    setLines((l) => [...l, ""]);
    for (const c of text) {
      line += c;
      setLines((l) => [...l.slice(0, -1), line]);
      await delay(20);
    }
  };

  const boot = async () => {
    for (const l of [
      "BOOTING SYSTEM...",
      "LOADING PROJECT REGISTRY...",
      "READY — TYPE 'help'",
    ]) {
      await typeLine(l);
      await delay(400);
    }
  };

  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    setTimeout(boot, 0);
  }, []);

  useEffect(() => {
    ref.current?.scrollTo(0, ref.current.scrollHeight);
  }, [lines]);

  const run = async (cmd) => {
    if (!cmd || running.current) return;
    running.current = true;

    setLines((l) => [...l, "", `C: System/User> ${cmd}`]);
    await delay(200);

    const output = async (messages) => {
      for (const m of messages) {
        setLines((l) => [...l, m]);
        await delay(120);
      }
      setLines((l) => [...l, ""]);
    };

    if (cmd === "help") {
      await output([
        "AVAILABLE COMMANDS:",
        "> hi              → receive a greeting",
        "> projects        → list all projects",
        "> open <project>  → open a project",
        "> about           → system info",
        "> clear           → clear terminal",
        "> exit            → close terminal",
      ]);
      running.current = false;
      return;
    }

    if (cmd === "projects") {
      await output([
        "REGISTERED PROJECTS:",
        ...Object.keys(projects).map((p) => `• ${p}`),
        "",
        "Type: open <project-name>",
      ]);
      running.current = false;
      return;
    }

    if (cmd.startsWith("open ")) {
      const key = cmd.replace("open ", "").trim();
      if (!projects[key]) {
        await output(["ERROR: PROJECT NOT FOUND"]);
      } else {
        await output(["INITIALIZING PROJECT...", "LOADING MODULES..."]);
        setTimeout(() => onOpenProject(projects[key]), 700);
      }
      running.current = false;
      return;
    }

    if (cmd === "about") {
      await output([
        "SYSTEM INFO:",
        "• Developer: Greg",
        "• Interface: Portfolio User Terminal",
        "• Purpose: Showcase selected works",
      ]);
      running.current = false;
      return;
    }

    if (cmd === "exit") {
      await output(["EXITING..."]);
      running.current = false;
      onClose();
      return;
    }

    if (cmd === "hi") {
      const greetings = [
        "Hello, User! Welcome to my portfolio terminal.",
        "Hi there! Ready to explore some projects?",
        "Hello Worl... ERR!",
      ];

      const greeting = greetings[getRandomIndex.current(greetings.length)];

      await output([greeting]);
      running.current = false;
      return;
    }

    if (cmd === "clear") {
      setLines([]);
      await delay(200);
      running.current = false;
      run("help");
      return;
    }

    await output(["UNKNOWN COMMAND — type 'help'"]);
    running.current = false;
  };

  return (
    <div className="bg-neutral-950 border border-green-500 w-full max-w-4xl rounded-lg shadow-green-500/30 shadow-2xl font-mono">
      <div className="flex justify-between px-4 py-2 bg-neutral-800 text-green-400 rounded-t-lg">
        <span>TERMINAL_</span>
        <button onClick={onClose} className="text-red-400">
          ✕
        </button>
      </div>

      <div
        ref={ref}
        className="p-6 h-[400px] overflow-y-auto text-sm text-green-400 scrollbar-none"
      >
        {lines.map((l, i) => (
          <p key={i}>{l}</p>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          run(input.trim());
          setInput("");
        }}
        className="flex items-center px-6 py-4 border-t border-green-500 text-green-400"
      >
        <span className="mr-2">$</span>
        <input
          className="bg-transparent outline-none w-full caret-green-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
        />
      </form>
    </div>
  );
}
