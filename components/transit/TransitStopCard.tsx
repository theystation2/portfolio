"use client";

import type { Project } from "@/lib/projects";

interface Props {
  project: Project;
  stopNumber: number;
  totalStops: number;
  onNext: () => void;
  onExplore: (slug: string) => void;
}

export function TransitStopCard({ project, stopNumber, totalStops, onNext, onExplore }: Props) {
  const readingTime = Math.max(2, Math.ceil(project.description.length / 80));

  return (
    <div className="transit-stop-card">
      <div className="transit-stop-card-header">
        <div className="transit-stop-arriving">
          <span className="transit-stop-arriving-label">Now arriving</span>
          <span className="transit-stop-arriving-number">Stop {stopNumber}</span>
        </div>
        <div className="transit-stop-eta">
          <span className="transit-eta-number">{readingTime}</span>
          <span className="transit-eta-unit">min read</span>
        </div>
      </div>

      <div className="transit-stop-card-body">
        <h2 className="transit-stop-title">{project.title}</h2>
        <p className="transit-stop-description">{project.description}</p>

        <div className="transit-stop-meta">
          <div className="transit-stop-meta-item">
            <span className="transit-stop-meta-label">Role</span>
            <span className="transit-stop-meta-value">{project.role}</span>
          </div>
          <div className="transit-stop-meta-item">
            <span className="transit-stop-meta-label">Year</span>
            <span className="transit-stop-meta-value">{project.year}</span>
          </div>
        </div>

        <div className="transit-stop-labels">
          {project.tags.map((tag) => (
            <span key={tag} className="transit-stop-pill">{tag}</span>
          ))}
        </div>
      </div>

      <div className="transit-stop-card-footer">
        <button
          onClick={() => onExplore(project.slug)}
          className="transit-stop-explore-btn"
        >
          Explore this stop →
        </button>
        {stopNumber < totalStops - 2 && (
          <button onClick={onNext} className="transit-stop-next-btn">
            Continue journey
          </button>
        )}
      </div>
    </div>
  );
}
