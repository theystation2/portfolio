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
    slug: "alloy",
    title: "Project Alloy — unified usage-based billing",
    description:
      "Designing the domain model, information architecture, and experience principles for unifying Stripe Billing and Metronome into one agentic-first platform — one UX, one API, no seams.",
    role: "Design — IA, naming, ontology",
    year: "2026",
    tags: ["UBB", "Domain model", "Agents", "IA", "Naming"],
  },
  {
    slug: "billing-ia",
    title: "Billing information architecture",
    description:
      "Redesigning how operators navigate billing — from fragmented surfaces to a principled IA with workload-based tabs and agent-ready overviews.",
    role: "Design lead",
    year: "2026",
    tags: ["IA", "Navigation", "UBB", "Agents"],
  },
  {
    slug: "ucr-triage",
    title: "User communications review automation",
    description:
      "Designing the content and interaction model for automated triage of user-facing communications at scale — shifting a manual review process into a principled automation system.",
    role: "Design + systems",
    year: "2026",
    tags: ["Automation", "Ops tooling", "Content systems", "LLM"],
  },
  {
    slug: "dante-content-model",
    title: "Dante — AI content design model",
    description:
      "Building and refining an AI model that writes, reviews, and enforces UX writing standards across Stripe — from rule design and training to infrastructure that has fixed 18,000+ string violations at scale.",
    role: "Model design + infrastructure",
    year: "2024–2026",
    tags: ["AI model", "Content systems", "Evals", "Automation"],
  },
  {
    slug: "skills-personal-software",
    title: "Skills & personal software",
    description:
      "Side projects and Claude-native tooling — building context-aware software for myself and shipping reusable patterns for others.",
    role: "Designer + engineer",
    year: "2025–2026",
    tags: ["Swift", "Claude Code", "Automation", "Side projects"],
  },
  {
    slug: "strings-content-projects",
    title: "Strings & other content projects",
    description:
      "Systems-level content work — from standardizing 10,000+ dashboard labels to building automated voice audits and quality evaluation infrastructure.",
    role: "Design lead",
    year: "2023–2026",
    tags: ["Voice", "Labels", "Evaluation", "Systems"],
  },
];
