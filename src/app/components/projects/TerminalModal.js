"use client";
import { useState } from "react";
import Terminal from "./Terminal";
import ProjectViewer from "./ProjectViewer";
import { PROJECTS } from "./projects.data";

export default function TerminalModal({ onClose }) {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center text-left rounded-2xl">
      {!activeProject ? (
        <Terminal
          projects={PROJECTS}
          onOpenProject={setActiveProject}
          onClose={onClose}
        />
      ) : (
        <ProjectViewer
          project={activeProject}
          onBack={() => setActiveProject(null)}
        />
      )}
    </div>
  );
}
