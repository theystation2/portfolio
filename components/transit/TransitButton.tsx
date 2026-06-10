"use client";

import { useState, useEffect } from "react";
import { TransitOverlay } from "./TransitOverlay";

export function TransitButton() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (active) {
      document.documentElement.setAttribute("data-transit", "true");
    } else {
      document.documentElement.removeAttribute("data-transit");
    }
  }, [active]);

  return (
    <>
      <button
        onClick={() => setActive(true)}
        className={`transit-activate-btn ${active ? "opacity-0 pointer-events-none" : ""}`}
        aria-label="Activate transit mode"
        title="Transit mode"
      >
        <div className="transit-activate-inner">
          <svg width="24" height="18" viewBox="0 0 24 18" fill="none" className="transit-activate-icon">
            <rect x="4" y="2" width="16" height="12" rx="4" fill="#003DA5" />
            <rect x="7" y="5" width="10" height="4" rx="1" fill="#0a0a14" />
            <circle cx="8.5" cy="12.5" r="1.5" fill="white" />
            <circle cx="15.5" cy="12.5" r="1.5" fill="white" />
            <rect x="6" y="14" width="12" height="1.5" rx="0.75" fill="#003DA5" opacity="0.5" />
          </svg>
          <span className="transit-activate-label">Transit mode</span>
        </div>
        <span className="transit-activate-pulse" />
      </button>

      {active && <TransitOverlay onClose={() => setActive(false)} />}
    </>
  );
}
