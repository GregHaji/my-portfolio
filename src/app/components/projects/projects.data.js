import OrbitHero from "./projectsImages/orbitHero.png";
import OrbitDashboard from "./projectsImages/orbitDashboard.png";
import OrbitSpider from "./projectsImages/orbitSpider.png";

import PumpTools from "./projectsImages/pumpTools.png";
import PumpSelector from "./projectsImages/pumpSelector.png";
import PumpQuotes from "./projectsImages/pumpQuotes.png";
import PumpHero from "./projectsImages/pumpHero.png";

import DogHero from "./projectsImages/doghero.png";

export const PROJECTS = {
  selector: {
    id: "selector",
    title: "Pump Selection Engine",
    description:
      "Engineering-grade pump selection tool using performance curves, efficiency calculations, and real-world constraints. Fully deployed and accessible online.",
    stack: [
      "Next.js",
      "MongoDB",
      "Tailwind",
      "GSAP",
      "Auth0",
      "Express.js",
      "Node.js",
      "Chartjs",
    ],
    images: [PumpHero, PumpSelector, PumpQuotes, PumpTools],
    featuredImage: PumpSelector,
    year: 2024,
    role: "Fullstack Developer",
    status: "LIVE",
    link: "https://app.curopumps.com/",
  },
  orbit: {
    id: "orbit",
    title: "AI Agent",
    description:
      "Frontend interface for an AI agent that autonomously manages tasks using LLMs and tool integrations. Chat with the agent and monitor its actions in real-time, with integrated dashboards for task tracking and performance metrics.",
    stack: ["Next.js", "Tailwind", "Swagger", "ReactBits"],
    images: [OrbitHero, OrbitDashboard, OrbitSpider],
    featuredImage: OrbitHero,
    year: 2025,
    role: "Fullstack Developer",
    status: "WIP",
    link: null,
  },

  herodog: {
    id: "herodog",
    title: "AI Image Generator",
    description:
      "AI image generator using Stable Diffusion and Gemini. Creates visually stunning and realistic images from text prompts, providing a unique and engaging user experience.",
    stack: ["Next.js", "PostgreSQL", "Tailwind", "GSAP"],
    images: [DogHero],
    featuredImage: DogHero,
    year: 2025,
    role: "Frontend Developer",
    status: "WIP",
    link: null,
  },
};

export default PROJECTS;
