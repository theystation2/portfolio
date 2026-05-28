export type Project = {
  slug: string;
  title: string;
  description: string;
  role: string;
  year: string;
  tags: string[];
  content?: string;
};

export const projects: Project[] = [
  {
    slug: "billing-ia",
    title: "Billing information architecture",
    description:
      "Redesigning how operators navigate billing — from fragmented surfaces to a principled IA with workload-based tabs and agent-ready overviews.",
    role: "Content design lead",
    year: "2026",
    tags: ["IA", "Navigation", "UBB", "Agents"],
  },
  {
    slug: "ucr-triage",
    title: "User communications review automation",
    description:
      "Designing the content and interaction model for automated triage of user-facing communications at scale — shifting a manual review process into a principled automation system.",
    role: "Content design + systems",
    year: "2026",
    tags: ["Automation", "Ops tooling", "Content systems", "LLM"],
  },
  {
    slug: "placeholder-1",
    title: "Case study coming soon",
    description: "Details to be added.",
    role: "—",
    year: "—",
    tags: [],
  },
];
