"use client";

import { useState, useEffect } from "react";

type Theme = "dark" | "light";
type Vision = "normal" | "deuteranopia" | "protanopia" | "tritanopia";

const visionLabels: Record<Vision, string> = {
  normal: "Normal",
  deuteranopia: "Deuteranopia",
  protanopia: "Protanopia",
  tritanopia: "Tritanopia",
};

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [vision, setVision] = useState<Vision>("normal");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const savedVision = localStorage.getItem("vision") as Vision | null;
    if (savedTheme) setTheme(savedTheme);
    if (savedVision) setVision(savedVision);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (vision === "normal") {
      document.documentElement.removeAttribute("data-vision");
    } else {
      document.documentElement.setAttribute("data-vision", vision);
    }
    localStorage.setItem("vision", vision);
  }, [vision]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="absolute bottom-12 right-0 bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 shadow-xl min-w-[200px] space-y-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wide text-[var(--muted)] block mb-2">
              theme
            </span>
            <div className="flex gap-1">
              {(["dark", "light"] as Theme[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`px-3 py-1.5 text-xs rounded-md font-medium transition-all ${
                    theme === t
                      ? "bg-[var(--toggle-active)] text-white"
                      : "bg-[var(--toggle-bg)] text-[var(--muted)] border border-[var(--toggle-border)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wide text-[var(--muted)] block mb-2">
              vision
            </span>
            <div className="flex flex-col gap-1">
              {(Object.keys(visionLabels) as Vision[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setVision(v)}
                  className={`px-3 py-1.5 text-xs rounded-md font-medium text-left transition-all ${
                    vision === v
                      ? "bg-[var(--toggle-active)] text-white"
                      : "bg-[var(--toggle-bg)] text-[var(--muted)] border border-[var(--toggle-border)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {visionLabels[v]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center hover:border-[var(--accent)] transition-colors shadow-lg"
        aria-label="Display settings"
      >
        <svg
          className="w-4 h-4 text-[var(--muted)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>
    </div>
  );
}
