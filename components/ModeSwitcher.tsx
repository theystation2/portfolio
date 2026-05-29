"use client";

import { useState, useEffect } from "react";

type Mode = "minimalist" | "maximalist" | "agent";

const modeLabels: Record<Mode, string> = {
  minimalist: "minimalist",
  maximalist: "maximalist",
  agent: "agent",
};

const modeDescriptions: Record<Mode, string> = {
  minimalist: "Efficient, structured, schema-driven.",
  maximalist: "Dense, vibrant, fun for fun.",
  agent: "Machine-parseable, RAG-structured.",
};

export function ModeSwitcher() {
  const [mode, setMode] = useState<Mode>("minimalist");
  const [showDesc, setShowDesc] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("view_mode") as Mode | null;
    if (saved && saved in modeLabels) setMode(saved);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-mode", mode);
    localStorage.setItem("view_mode", mode);
    setShowDesc(true);
    const timer = setTimeout(() => setShowDesc(false), 2000);
    return () => clearTimeout(timer);
  }, [mode]);

  const cycle = () => {
    const modes: Mode[] = ["minimalist", "maximalist", "agent"];
    const next = modes[(modes.indexOf(mode) + 1) % modes.length];
    setMode(next);
  };

  return (
    <div className="fixed top-5 left-5 z-50">
      <button
        onClick={cycle}
        className="px-3 py-1.5 text-xs font-mono rounded-full border transition-all bg-[var(--surface)] border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
        aria-label={`Current view: ${mode}. Click to switch.`}
      >
        {modeLabels[mode]}
      </button>
      <p
        className={`mt-1.5 text-[10px] font-mono text-[var(--muted)] transition-opacity duration-300 max-w-[160px] leading-snug ${
          showDesc ? "opacity-70" : "opacity-0"
        }`}
      >
        {modeDescriptions[mode]}
      </p>
    </div>
  );
}
