"use client";

import ExpertiseSection from "./components/ExpertiseSection";
import ExperienceTimeline from "./components/Experience";
import Nav from "./components/navbar";
import Contact from "./components/Contact";
import About from "./components/About";
import Intro from "./components/Intro";
import Projects from "./components/projects/Projects";
import Splitter from "./components/Splitter";
import Curiosity from "./assets/Curiosity.png";
import Calm from "./assets/Calm.png";
import Passion from "./assets/Passion.png";

export default function Home() {
  return (
    <div className="bg-linear-to-br from-gray-900 to-gray-700 text-white ">
      <Nav />
      {/* HERO / INTRO */}
      <section>
        <Intro />
      </section>

      <section id="about-me">
        <About />
      </section>

      <section id="curiosity">
        <Splitter image={Curiosity} />
      </section>

      <section id="my-skills">
        <ExpertiseSection />
      </section>

      <section id="curiosity">
        <Splitter image={Calm} />
      </section>

      <section id="experience">
        <ExperienceTimeline />
      </section>

      <section id="curiosity">
        <Splitter image={Passion} />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="contact">
        <Contact />
      </section>

      <footer className="py-6 text-center text-gray-400 bg-neutral-900 border-t border-neutral-700">
        <p>© {new Date().getFullYear()} Greg Haji. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a
            href="https://github.com/yourusername"
            className="hover:text-amber-400"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            className="hover:text-amber-400"
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
}
