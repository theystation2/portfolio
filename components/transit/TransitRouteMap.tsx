"use client";

interface Stop {
  id: string;
  name: string;
  stationName: string;
  subtitle: string;
  slug?: string;
  isTerminal?: boolean;
}

interface Props {
  stops: Stop[];
  currentStop: number;
  onStopClick: (index: number) => void;
  stationNames: string[];
}

function BusIcon() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" className="transit-bus-icon">
      <rect x="1" y="1" width="18" height="10" rx="3" fill="white" />
      <rect x="3" y="3" width="5" height="4" rx="1" fill="#003DA5" opacity="0.3" />
      <rect x="10" y="3" width="5" height="4" rx="1" fill="#003DA5" opacity="0.3" />
      <circle cx="5" cy="12" r="1.5" fill="white" />
      <circle cx="15" cy="12" r="1.5" fill="white" />
    </svg>
  );
}

export function TransitRouteMap({ stops, currentStop, onStopClick }: Props) {
  const progress = (currentStop / (stops.length - 1)) * 100;

  return (
    <div className="transit-route-map">
      <div className="transit-route-line-track">
        <div
          className="transit-route-line-progress"
          style={{ width: `${progress}%` }}
        />
        <div
          className="transit-route-bus"
          style={{ left: `${progress}%` }}
        >
          <BusIcon />
        </div>
      </div>
      <div className="transit-route-stops">
        {stops.map((stop, i) => (
          <button
            key={stop.id}
            onClick={() => onStopClick(i)}
            className={`transit-route-stop ${
              i === currentStop ? "active" : ""
            } ${i < currentStop ? "visited" : ""} ${
              stop.isTerminal ? "terminal" : ""
            }`}
            title={stop.stationName}
          >
            <div className="transit-route-stop-dot" />
            <span className="transit-route-stop-label">
              {stop.stationName}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
