"use client";

import { useState, useEffect, useRef } from "react";

type Mode = "minimalist" | "maximalist" | "agent";

const modes: Mode[] = ["minimalist", "maximalist", "agent"];

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
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("view_mode") as Mode | null;
    if (saved && saved in modeLabels) setMode(saved);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-mode", mode);
    localStorage.setItem("view_mode", mode);
  }, [mode]);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const select = (m: Mode) => {
    setMode(m);
    setOpen(false);
  };

  return (
    <div className="fixed top-5 left-5 z-50" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-1.5 text-xs font-mono rounded-full border transition-all bg-[var(--surface)] border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
        aria-label={`Current view: ${mode}. Click to switch.`}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {modeLabels[mode]}
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-1.5 min-w-[160px] rounded-lg border bg-[var(--surface)] border-[var(--border)] shadow-lg overflow-hidden"
          role="listbox"
          aria-activedescendant={`mode-${mode}`}
        >
          {modes.map((m) => (
            <button
              key={m}
              id={`mode-${m}`}
              role="option"
              aria-selected={m === mode}
              onClick={() => select(m)}
              className={`w-full text-left px-3 py-2 text-xs font-mono transition-colors ${
                m === mode
                  ? "text-[var(--accent)] bg-[var(--accent)]/10"
                  : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--border)]/30"
              }`}
            >
              <span className="block">{modeLabels[m]}</span>
              <span className="block text-[10px] opacity-60 mt-0.5">{modeDescriptions[m]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
