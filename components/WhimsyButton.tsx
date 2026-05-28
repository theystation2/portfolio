"use client";

import { useState, useEffect } from "react";

export function WhimsyButton() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (active) {
      document.documentElement.setAttribute("data-whimsy", "true");
    } else {
      document.documentElement.removeAttribute("data-whimsy");
    }
  }, [active]);

  return (
    <button
      onClick={() => setActive(!active)}
      className={`fixed bottom-5 left-5 z-50 px-3 py-1.5 text-xs font-mono rounded-full border transition-all ${
        active
          ? "bg-yellow-400 border-yellow-500 text-black animate-bounce shadow-[0_0_20px_rgba(250,204,21,0.8)]"
          : "bg-[var(--surface)] border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
      }`}
    >
      {active ? "✨ whimsy ✨" : "whimsy"}
    </button>
  );
}
