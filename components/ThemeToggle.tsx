"use client";

import { useState, useEffect } from "react";

type Theme = "dark" | "light";
type Vision = "normal" | "deuteranopia" | "protanopia" | "tritanopia";
type FontSize = "small" | "default" | "large" | "xl";

const visionLabels: Record<Vision, string> = {
  normal: "Normal",
  deuteranopia: "Deuteranopia",
  protanopia: "Protanopia",
  tritanopia: "Tritanopia",
};

const fontSizeLabels: Record<FontSize, string> = {
  small: "S",
  default: "M",
  large: "L",
  xl: "XL",
};

const fontSizeValues: Record<FontSize, string> = {
  small: "87.5%",
  default: "100%",
  large: "112.5%",
  xl: "125%",
};

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [vision, setVision] = useState<Vision>("normal");
  const [fontSize, setFontSize] = useState<FontSize>("default");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const savedVision = localStorage.getItem("vision") as Vision | null;
    const savedFontSize = localStorage.getItem("font_size") as FontSize | null;
    const savedMotion = localStorage.getItem("reduced_motion");
    if (savedTheme) setTheme(savedTheme);
    if (savedVision) setVision(savedVision);
    if (savedFontSize) setFontSize(savedFontSize);
    if (savedMotion === "true") setReducedMotion(true);

    const hasVisited = localStorage.getItem("has_visited");
    if (!hasVisited) {
      setOpen(true);
      localStorage.setItem("has_visited", "true");
    }
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

  useEffect(() => {
    document.documentElement.style.fontSize = fontSizeValues[fontSize];
    localStorage.setItem("font_size", fontSize);
  }, [fontSize]);

  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.setAttribute("data-reduced-motion", "true");
    } else {
      document.documentElement.removeAttribute("data-reduced-motion");
    }
    localStorage.setItem("reduced_motion", String(reducedMotion));
  }, [reducedMotion]);

  return (
    <div className="fixed bottom-5 right-5 z-[10003]">
      {open && (
        <div className="accessibility-panel absolute bottom-12 right-0 bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 shadow-xl min-w-[220px] space-y-4">
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
              font size
            </span>
            <div className="flex gap-1">
              {(Object.keys(fontSizeLabels) as FontSize[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setFontSize(s)}
                  className={`px-3 py-1.5 text-xs rounded-md font-medium transition-all ${
                    fontSize === s
                      ? "bg-[var(--toggle-active)] text-white"
                      : "bg-[var(--toggle-bg)] text-[var(--muted)] border border-[var(--toggle-border)] hover:text-[var(--foreground)]"
                  }`}
                  aria-label={`Font size ${s}`}
                >
                  {fontSizeLabels[s]}
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
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wide text-[var(--muted)] block mb-2">
              motion
            </span>
            <button
              onClick={() => setReducedMotion(!reducedMotion)}
              className={`px-3 py-1.5 text-xs rounded-md font-medium transition-all ${
                reducedMotion
                  ? "bg-[var(--toggle-active)] text-white"
                  : "bg-[var(--toggle-bg)] text-[var(--muted)] border border-[var(--toggle-border)] hover:text-[var(--foreground)]"
              }`}
              aria-pressed={reducedMotion}
            >
              {reducedMotion ? "Reduced" : "Full"}
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className={`accessibility-toggle px-3 py-1.5 text-xs font-mono rounded-full border transition-all ${
          open
            ? "bg-[var(--toggle-active)] border-[var(--toggle-active)] text-white shadow-lg"
            : "bg-[var(--surface)] border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
        }`}
        aria-label="Accessibility settings"
        aria-expanded={open}
      >
        accessibility
      </button>
    </div>
  );
}
