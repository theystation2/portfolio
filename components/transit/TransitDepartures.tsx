"use client";

import { useState, useEffect } from "react";

interface Departure {
  route: string;
  headsign: string;
  minutes: number;
  color: string;
  type: "metro" | "bus" | "train";
}

export function TransitDepartures() {
  const [departures, setDepartures] = useState<Departure[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("/api/transit")
      .then((res) => res.json())
      .then((data) => setDepartures(data.departures || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (departures.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % departures.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [departures.length]);

  useEffect(() => {
    if (departures.length === 0) return;
    const tick = setInterval(() => {
      setDepartures((prev) =>
        prev.map((d) => ({
          ...d,
          minutes: Math.max(0, d.minutes - 1),
        }))
      );
    }, 60000);
    return () => clearInterval(tick);
  }, [departures.length]);

  if (departures.length === 0) return null;

  const current = departures[currentIndex];

  return (
    <div className="transit-departures">
      <div className="transit-departure-item" key={currentIndex}>
        <span
          className="transit-departure-badge"
          style={{ backgroundColor: current.color }}
        >
          {current.route}
        </span>
        <span className="transit-departure-headsign">{current.headsign}</span>
        <span className="transit-departure-eta">
          {current.minutes === 0 ? "NOW" : `${current.minutes}m`}
        </span>
      </div>
      <span className="transit-departure-label">Montreal — live</span>
    </div>
  );
}
