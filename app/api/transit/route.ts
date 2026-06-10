import { NextResponse } from "next/server";

const TRANSIT_API_KEY = process.env.TRANSIT_API_KEY || "";
const MONTREAL_LAT = 45.5017;
const MONTREAL_LON = -73.5673;

export async function GET() {
  if (!TRANSIT_API_KEY) {
    return NextResponse.json({ departures: getMockDepartures() });
  }

  try {
    const res = await fetch(
      `https://external.transitapp.com/v3/public/nearby_routes?lat=${MONTREAL_LAT}&lon=${MONTREAL_LON}&max_distance=500`,
      {
        headers: { apiKey: TRANSIT_API_KEY },
        next: { revalidate: 30 },
      }
    );

    if (!res.ok) {
      return NextResponse.json({ departures: getMockDepartures() });
    }

    const data = await res.json();
    const departures = parseTransitResponse(data);
    return NextResponse.json({ departures });
  } catch {
    return NextResponse.json({ departures: getMockDepartures() });
  }
}

interface Departure {
  route: string;
  headsign: string;
  minutes: number;
  color: string;
  type: "metro" | "bus" | "train";
}

function parseTransitResponse(data: Record<string, unknown>): Departure[] {
  const routes = (data as { routes?: Array<Record<string, unknown>> }).routes || [];
  const departures: Departure[] = [];

  for (const route of routes.slice(0, 8)) {
    const itineraries = (route.itineraries as Array<Record<string, unknown>>) || [];
    for (const itin of itineraries.slice(0, 1)) {
      const scheduleItems = (itin.schedule_items as Array<Record<string, unknown>>) || [];
      const next = scheduleItems[0];
      if (next && next.departure_time) {
        const mins = Math.max(
          0,
          Math.round(
            ((next.departure_time as number) * 1000 - Date.now()) / 60000
          )
        );
        departures.push({
          route: (route.route_short_name as string) || (route.route_long_name as string) || "?",
          headsign: (itin.headsign as string) || "",
          minutes: mins,
          color: `#${(route.route_color as string) || "003DA5"}`,
          type: route.route_type === 1 ? "metro" : route.route_type === 2 ? "train" : "bus",
        });
      }
    }
  }

  return departures.length > 0 ? departures : getMockDepartures();
}

function getMockDepartures(): Departure[] {
  return [
    { route: "1", headsign: "Angrignon", minutes: 3, color: "#003DA5", type: "metro" },
    { route: "2", headsign: "Henri-Bourassa", minutes: 5, color: "#FF6D00", type: "metro" },
    { route: "4", headsign: "Montmorency", minutes: 2, color: "#FFD700", type: "metro" },
    { route: "5", headsign: "Snowdon", minutes: 7, color: "#009EE0", type: "metro" },
    { route: "55", headsign: "St-Laurent", minutes: 4, color: "#003DA5", type: "bus" },
    { route: "80", headsign: "Du Parc", minutes: 6, color: "#003DA5", type: "bus" },
    { route: "165", headsign: "Côte-des-Neiges", minutes: 8, color: "#003DA5", type: "bus" },
    { route: "24", headsign: "Sherbrooke", minutes: 1, color: "#003DA5", type: "bus" },
  ];
}
