"use client";

import { useState, useEffect } from "react";

type Mode = "minimalist" | "maximalist" | "agent";

const modeLabels: Record<Mode, string> = {
  minimalist: "minimalist",
  maximalist: "maximalist",
  agent: "agent",
};

export function ModeSwitcher() {
  const [mode, setMode] = useState<Mode>("minimalist");

  useEffect(() => {
    const saved = localStorage.getItem("view_mode") as Mode | null;
    if (saved && saved in modeLabels) setMode(saved);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-mode", mode);
    localStorage.setItem("view_mode", mode);
  }, [mode]);

  const cycle = () => {
    const modes: Mode[] = ["minimalist", "maximalist", "agent"];
    const next = modes[(modes.indexOf(mode) + 1) % modes.length];
    setMode(next);
  };

  return (
    <button
      onClick={cycle}
      className="fixed top-5 left-5 z-50 px-3 py-1.5 text-xs font-mono rounded-full border transition-all bg-[var(--surface)] border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
      aria-label={`Current view: ${mode}. Click to switch.`}
    >
      {modeLabels[mode]}
    </button>
  );
}
