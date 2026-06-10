"use client";

import { useState, useEffect } from "react";

const STATION_NAMES = [
  "Écran-Central",
  "Alloy–Facturation",
  "Dante–Modèle",
  "Architecture–Billing",
  "Triage–Comms",
  "Atelier–Personnel",
  "Cordes–Systèmes",
  "Terminus Jack",
];

const LINE_COLORS = ["#009EE0", "#F58220", "#008449", "#FFE400", "#781B7D", "#009EE0", "#F58220", "#008449"];

export function TransitIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);
  const [visibleStops, setVisibleStops] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 900),
      setTimeout(() => setPhase(3), 1500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (phase !== 3) return;
    const interval = setInterval(() => {
      setVisibleStops((prev) => {
        if (prev >= STATION_NAMES.length) {
          clearInterval(interval);
          setTimeout(() => setReady(true), 300);
          return prev;
        }
        return prev + 1;
      });
    }, 140);
    return () => clearInterval(interval);
  }, [phase]);

  return (
    <div className="transit-intro">
      <div className={`transit-intro-bg ${phase >= 1 ? "active" : ""}`} />

      <div className="transit-intro-deco">
        <div className="transit-intro-deco-line" style={{ background: "#008449", top: "20%", left: "-5%", width: "40%", transform: "rotate(-8deg)" }} />
        <div className="transit-intro-deco-line" style={{ background: "#F58220", top: "70%", right: "-5%", width: "35%", transform: "rotate(5deg)" }} />
        <div className="transit-intro-deco-line" style={{ background: "#009EE0", top: "45%", left: "-10%", width: "30%", transform: "rotate(-3deg)" }} />
        <div className="transit-intro-deco-line" style={{ background: "#781B7D", bottom: "15%", right: "-8%", width: "25%", transform: "rotate(12deg)" }} />
      </div>

      <div className="transit-intro-content">
        {phase >= 1 && (
          <div className={`transit-intro-badge ${phase >= 2 ? "expanded" : ""}`}>
            <div className="transit-intro-line-circle">J</div>
            {phase >= 2 && (
              <span className="transit-intro-line-text">Ligne Portfolio</span>
            )}
          </div>
        )}

        {phase >= 3 && (
          <div className="transit-intro-route">
            <div className="transit-intro-route-line" />
            {STATION_NAMES.map((station, i) => (
              <div
                key={station}
                className={`transit-intro-stop ${i < visibleStops ? "visible" : ""} ${
                  i === 0 || i === STATION_NAMES.length - 1 ? "terminal" : ""
                }`}
              >
                <div
                  className="transit-intro-stop-dot"
                  style={{ background: i < visibleStops ? LINE_COLORS[i] : undefined }}
                />
                <span
                  className="transit-intro-stop-name"
                  style={{ color: i < visibleStops ? LINE_COLORS[i] : undefined }}
                >
                  {station}
                </span>
              </div>
            ))}
          </div>
        )}

        {ready && (
          <button onClick={onComplete} className="transit-intro-board-btn">
            Bienvenue à bord
          </button>
        )}
      </div>
    </div>
  );
}
