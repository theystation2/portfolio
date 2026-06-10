"use client";

interface Props {
  currentStop: number;
  totalStops: number;
  onStopClick: (index: number) => void;
}

const STOP_POSITIONS = [
  { x: 180, y: 340, label: "Écran-Central" },
  { x: 260, y: 280, label: "Alloy–Facturation" },
  { x: 340, y: 230, label: "Dante–Modèle" },
  { x: 430, y: 200, label: "Architecture–Billing" },
  { x: 520, y: 180, label: "Triage–Comms" },
  { x: 600, y: 160, label: "Atelier–Personnel" },
  { x: 680, y: 145, label: "Cordes–Systèmes" },
  { x: 760, y: 130, label: "Terminus Jack" },
];

const LINE_COLORS = ["#009EE0", "#F58220", "#008449", "#FFE400", "#781B7D", "#009EE0", "#F58220", "#008449"];

export function MontrealMap({ currentStop, totalStops, onStopClick }: Props) {
  return (
    <div className="transit-map-container">
      <svg
        viewBox="0 0 940 460"
        className="transit-map-svg"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Montreal island silhouette */}
        <path
          d="M 80 280 Q 100 240 140 220 Q 180 200 220 190 Q 280 170 340 155 Q 420 135 500 125 Q 580 115 660 110 Q 740 108 800 115 Q 840 120 870 140 Q 890 160 880 190 Q 870 220 850 250 Q 830 280 800 300 Q 760 320 720 330 Q 660 345 600 350 Q 520 360 440 365 Q 360 370 280 368 Q 200 365 150 350 Q 110 335 90 310 Q 78 295 80 280 Z"
          fill="rgba(0, 158, 224, 0.04)"
          stroke="rgba(0, 158, 224, 0.15)"
          strokeWidth="1.5"
        />

        {/* River outline */}
        <path
          d="M 60 360 Q 200 390 400 395 Q 600 398 800 380 Q 880 370 920 360"
          fill="none"
          stroke="rgba(0, 158, 224, 0.08)"
          strokeWidth="40"
        />

        {/* Grid lines for map feel */}
        {[150, 250, 350, 450, 550, 650, 750].map((x) => (
          <line
            key={`vg-${x}`}
            x1={x} y1={80} x2={x} y2={420}
            stroke="rgba(255,255,255,0.02)"
            strokeWidth="0.5"
          />
        ))}
        {[150, 200, 250, 300, 350].map((y) => (
          <line
            key={`hg-${y}`}
            x1={80} y1={y} x2={880} y2={y}
            stroke="rgba(255,255,255,0.02)"
            strokeWidth="0.5"
          />
        ))}

        {/* Route line connecting stops */}
        <path
          d={`M ${STOP_POSITIONS.map((p) => `${p.x} ${p.y}`).join(" L ")}`}
          fill="none"
          stroke="rgba(0, 158, 224, 0.3)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Animated progress line */}
        <path
          d={`M ${STOP_POSITIONS.slice(0, currentStop + 1).map((p) => `${p.x} ${p.y}`).join(" L ")}`}
          fill="none"
          stroke="#009EE0"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transit-map-progress-line"
        />

        {/* Stops */}
        {STOP_POSITIONS.map((pos, i) => {
          const isVisited = i < currentStop;
          const isActive = i === currentStop;
          const color = LINE_COLORS[i];

          return (
            <g
              key={pos.label}
              onClick={() => onStopClick(i)}
              className="transit-map-stop-group"
              style={{ cursor: "pointer" }}
            >
              {/* Glow for active stop */}
              {isActive && (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="20"
                  fill={color}
                  opacity="0.2"
                  className="transit-map-stop-glow"
                />
              )}

              {/* Stop circle */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isActive ? 12 : i === 0 || i === totalStops - 1 ? 10 : 8}
                fill={isVisited || isActive ? color : "#1a1a2e"}
                stroke={isVisited || isActive ? color : "#2a2a3e"}
                strokeWidth={isActive ? 3 : 2}
              />

              {/* Inner dot for terminals */}
              {(i === 0 || i === totalStops - 1) && (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="4"
                  fill={isVisited || isActive ? "#0a0a14" : "#555"}
                />
              )}

              {/* Label */}
              <text
                x={pos.x}
                y={pos.y + (i % 2 === 0 ? -20 : 28)}
                textAnchor="middle"
                className={`transit-map-label ${isActive ? "active" : ""} ${isVisited ? "visited" : ""}`}
                fill={isActive ? "white" : isVisited ? "#6b7fa0" : "#444"}
                fontSize={isActive ? "12" : "10"}
                fontWeight={isActive ? "800" : "600"}
                fontFamily="var(--font-nunito), system-ui, sans-serif"
              >
                {pos.label}
              </text>
            </g>
          );
        })}

        {/* Bus at current position */}
        <g
          transform={`translate(${STOP_POSITIONS[currentStop].x - 12}, ${STOP_POSITIONS[currentStop].y - 30})`}
          className="transit-map-bus"
        >
          <rect x="2" y="2" width="20" height="14" rx="4" fill="white" />
          <rect x="5" y="5" width="6" height="5" rx="1" fill="#009EE0" opacity="0.6" />
          <rect x="13" y="5" width="6" height="5" rx="1" fill="#009EE0" opacity="0.6" />
          <circle cx="7" cy="17" r="2" fill="white" />
          <circle cx="17" cy="17" r="2" fill="white" />
        </g>
      </svg>
    </div>
  );
}
