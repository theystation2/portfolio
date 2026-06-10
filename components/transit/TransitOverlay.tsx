"use client";

import { useState, useEffect, useCallback } from "react";
import { projects } from "@/lib/projects";
import { TransitIntro } from "./TransitIntro";
import { TransitRouteMap } from "./TransitRouteMap";
import { TransitStopCard } from "./TransitStopCard";
import { TransitDepartures } from "./TransitDepartures";
import { MontrealMap } from "./MontrealMap";
import { TransitCaseStudy } from "./TransitCaseStudy";

interface Stop {
  id: string;
  name: string;
  stationName: string;
  subtitle: string;
  slug?: string;
  isTerminal?: boolean;
}

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

const STOPS: Stop[] = [
  { id: "origin", name: "Your screen", stationName: STATION_NAMES[0], subtitle: "Origin", isTerminal: true },
  ...projects.map((p, i) => ({
    id: p.slug,
    name: p.title.split("—")[0].trim(),
    stationName: STATION_NAMES[i + 1],
    subtitle: p.role,
    slug: p.slug,
  })),
  { id: "destination", name: "Jack H", stationName: STATION_NAMES[7], subtitle: "Terminal", isTerminal: true },
];

export function TransitOverlay({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<"intro" | "journey">("intro");
  const [currentStop, setCurrentStop] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [exploringSlug, setExploringSlug] = useState<string | null>(null);

  const handleIntroComplete = useCallback(() => {
    setPhase("journey");
  }, []);

  const goToStop = useCallback(
    (index: number) => {
      if (index === currentStop || transitioning) return;
      setExploringSlug(null);
      setTransitioning(true);
      setTimeout(() => {
        setCurrentStop(index);
        setTransitioning(false);
      }, 350);
    },
    [currentStop, transitioning]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (phase !== "journey") return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goToStop(Math.min(currentStop + 1, STOPS.length - 1));
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goToStop(Math.max(currentStop - 1, 0));
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, phase, currentStop, goToStop]);

  return (
    <div className="transit-overlay">
      {phase === "intro" && <TransitIntro onComplete={handleIntroComplete} />}

      {phase === "journey" && (
        <div className="transit-journey">
          <div className="transit-header">
            <button onClick={onClose} className="transit-exit-btn">
              ← Sortie
            </button>
            <div className="transit-line-badge">
              <span className="transit-line-number">J</span>
              <span className="transit-line-name">Ligne Portfolio</span>
            </div>
            <TransitDepartures />
          </div>

          <div className="transit-main">
            <div className="transit-map-panel">
              <MontrealMap
                currentStop={currentStop}
                totalStops={STOPS.length}
                onStopClick={goToStop}
              />
            </div>

            <div className="transit-info-panel">
              <TransitRouteMap
                stops={STOPS}
                currentStop={currentStop}
                onStopClick={goToStop}
                stationNames={STATION_NAMES}
              />

              <div className={`transit-content ${transitioning ? "transit-content-exit" : "transit-content-enter"}`}>
                {exploringSlug ? (
                  <TransitCaseStudy
                    slug={exploringSlug}
                    onBack={() => setExploringSlug(null)}
                  />
                ) : STOPS[currentStop].isTerminal ? (
                  <div className="transit-terminal-card">
                    {currentStop === 0 ? (
                      <>
                        <div className="transit-terminal-icon">🚇</div>
                        <h2>Écran-Central</h2>
                        <p className="transit-terminal-welcome">Bienvenue à bord de la Ligne Portfolio.</p>
                        <p className="transit-terminal-subtitle">
                          Tap a stop on the map or use arrow keys.
                        </p>
                        <div className="transit-next-departure">
                          <span className="transit-next-label">Prochain arrêt</span>
                          <span className="transit-next-name">{STOPS[1].stationName}</span>
                          <span className="transit-next-eta">1 min</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="transit-terminal-icon">🏁</div>
                        <h2>Terminus Jack</h2>
                        <p className="transit-terminal-welcome">Fin de la ligne. Merci d&apos;avoir voyagé.</p>
                        <p className="transit-terminal-subtitle">End of the line. Thanks for riding with me.</p>

                        <div className="transit-terminus-resume">
                          <div className="transit-terminus-resume-header">
                            <span className="transit-terminus-resume-label">CV</span>
                            <span className="transit-terminus-resume-name">Jack Horton · Montréal</span>
                          </div>
                          <p className="transit-terminus-resume-profile">
                            Content designer with a doctorate in English. 10+ years of experience. Comfortable in frontier AI technologies with multiple public deployments, local apps, and custom workflows.
                          </p>
                          <div className="transit-terminus-resume-roles">
                            <div className="transit-terminus-role">
                              <span className="transit-terminus-role-title">Content designer</span>
                              <span className="transit-terminus-role-co">Stripe</span>
                              <span className="transit-terminus-role-year">2022–now</span>
                            </div>
                            <div className="transit-terminus-role">
                              <span className="transit-terminus-role-title">Content lead</span>
                              <span className="transit-terminus-role-co">Wealthsimple</span>
                              <span className="transit-terminus-role-year">2022</span>
                            </div>
                            <div className="transit-terminus-role">
                              <span className="transit-terminus-role-title">Senior content designer</span>
                              <span className="transit-terminus-role-co">Shopify</span>
                              <span className="transit-terminus-role-year">2017–2021</span>
                            </div>
                            <div className="transit-terminus-role">
                              <span className="transit-terminus-role-title">Professor</span>
                              <span className="transit-terminus-role-co">University of Ottawa</span>
                              <span className="transit-terminus-role-year">2014–2019</span>
                            </div>
                          </div>
                          <div className="transit-terminus-resume-edu">
                            PhD, English — University of Ottawa, 2019
                          </div>
                        </div>

                        <div className="transit-terminal-actions">
                          <a href="mailto:jackphorton@proton.me" className="transit-action-btn">
                            Dire bonjour
                          </a>
                          <a href="/resume" className="transit-action-btn transit-action-secondary">
                            Full resume
                          </a>
                          <button onClick={onClose} className="transit-action-btn transit-action-secondary">
                            Sortie
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <TransitStopCard
                    project={projects[currentStop - 1]}
                    stopNumber={currentStop}
                    totalStops={STOPS.length}
                    onNext={() => goToStop(currentStop + 1)}
                    onExplore={(slug) => setExploringSlug(slug)}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="transit-footer">
            <button
              onClick={() => goToStop(Math.max(currentStop - 1, 0))}
              disabled={currentStop === 0}
              className="transit-nav-btn"
            >
              ← Précédent
            </button>
            <span className="transit-stop-indicator">
              {STOPS[currentStop].stationName}
            </span>
            <button
              onClick={() => goToStop(Math.min(currentStop + 1, STOPS.length - 1))}
              disabled={currentStop === STOPS.length - 1}
              className="transit-nav-btn"
            >
              Suivant →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
