import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

function Meta({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-mono text-[10px] uppercase tracking-wide text-[var(--muted)] opacity-60 shrink-0">
        {k}
      </span>
      <span className="text-sm text-[var(--foreground)]">{v}</span>
    </div>
  );
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  if (project.slug === "billing-ia") {
    return <BillingIACaseStudy project={project} />;
  }

  if (project.slug === "ucr-triage") {
    return <UCRTriageCaseStudy project={project} />;
  }

  if (project.slug === "skills-personal-software") {
    return <SkillsPersonalSoftware project={project} />;
  }

  if (project.slug === "strings-content-projects") {
    return <StringsContentProjects project={project} />;
  }

  return (
    <div className="flex flex-col flex-1">
      <header className="w-full max-w-3xl mx-auto px-6 pt-16 pb-8">
        <Link
          href="/"
          className="text-xs font-mono text-[var(--accent)] hover:text-[var(--accent-warm)] transition-colors mb-8 inline-block"
        >
          &larr; index
        </Link>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[var(--gradient-from)] via-[var(--gradient-via)] to-[var(--gradient-to)] bg-clip-text text-transparent">
          {project.title}
        </h1>
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 py-4 border-y border-[var(--border)]">
          <Meta k="role" v={project.role} />
          <Meta k="year" v={project.year} />
          <Meta
            k="tags"
            v={project.tags.length > 0 ? project.tags.join(", ") : "—"}
          />
        </div>
      </header>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-8">
          <p className="text-[var(--foreground)] opacity-90 leading-relaxed text-[15px]">
            {project.content || project.description}
          </p>
          <div className="mt-8 pt-6 border-t border-[var(--border)]">
            <p className="text-xs font-mono text-[var(--muted)] opacity-50">
              // full case study content loading...
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

function TldrSummary({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg px-5 py-4 mt-6">
      <span className="text-[10px] font-mono uppercase tracking-wide text-[var(--accent)] opacity-70">
        tl;dr
      </span>
      <p className="mt-1.5 text-sm text-[var(--foreground)] opacity-85 leading-relaxed">
        {children}
      </p>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent)] opacity-70">
        {children}
      </span>
      <div className="flex-1 h-px bg-[var(--border)]" />
    </div>
  );
}

function PrincipleCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-5 relative overflow-hidden">
      <span className="absolute top-3 right-4 font-mono text-[10px] text-[var(--muted)] opacity-40">
        {number}
      </span>
      <h4 className="text-sm font-semibold text-[var(--foreground)] mb-2">
        {title}
      </h4>
      <p className="text-xs text-[var(--muted)] leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function NavDiagram() {
  const globalItems = ["Home", "Balances", "Product catalog", "Transactions", "Customers"];
  const billingTabs = ["Overview", "Subscriptions", "Invoices", "Usage", "Retention"];
  const subsTabs = ["Subscriptions", "Contracts"];
  const usageTabs = ["Overview", "Meters", "Credits", "Alerts"];

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 font-mono text-[11px]">
      <div className="text-[var(--muted)] mb-3 text-[10px] uppercase tracking-wide">Navigation structure</div>
      <div className="flex gap-8">
        <div className="space-y-1">
          <div className="text-[var(--accent)] text-[9px] uppercase tracking-wide mb-2">Global nav</div>
          {globalItems.map((item) => (
            <div key={item} className="text-[var(--foreground)] opacity-80 py-0.5">{item}</div>
          ))}
          <div className="text-[var(--foreground)] font-semibold py-0.5 mt-1 border-l-2 border-[var(--accent)] pl-2">Billing</div>
        </div>
        <div className="space-y-1 border-l border-[var(--border)] pl-6">
          <div className="text-[var(--accent-warm)] text-[9px] uppercase tracking-wide mb-2">Billing tabs (workloads)</div>
          {billingTabs.map((tab) => (
            <div key={tab} className={`py-0.5 ${tab === "Subscriptions" || tab === "Usage" ? "text-[var(--foreground)] font-medium" : "text-[var(--foreground)] opacity-60"}`}>{tab}</div>
          ))}
        </div>
        <div className="space-y-4 border-l border-[var(--border)] pl-6">
          <div>
            <div className="text-[var(--accent-cool)] text-[9px] uppercase tracking-wide mb-2">Subscriptions (objects)</div>
            {subsTabs.map((tab) => (
              <div key={tab} className="text-[var(--foreground)] opacity-70 py-0.5">{tab}</div>
            ))}
          </div>
          <div>
            <div className="text-[var(--accent-cool)] text-[9px] uppercase tracking-wide mb-2">Usage (objects)</div>
            {usageTabs.map((tab) => (
              <div key={tab} className="text-[var(--foreground)] opacity-70 py-0.5">{tab}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContractsTableViz() {
  const rows = [
    { customer: "Acme Corp", source: "Stripe", term: "24 mo", value: "$14,376", status: "Active" },
    { customer: "TechGiant Inc", source: "Metronome", term: "12 mo", value: "$7,188", status: "Active" },
    { customer: "Rocket Startup", source: "Metronome", term: "18 mo", value: "$48,000", status: "Active" },
    { customer: "StartupCo", source: "Stripe", term: "12 mo", value: "$5,988", status: "Renewal" },
  ];

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden">
      <div className="px-5 py-3 border-b border-[var(--border)] flex items-center justify-between">
        <span className="text-xs font-medium text-[var(--foreground)]">Subscriptions &rsaquo; Contracts</span>
        <span className="text-[10px] font-mono text-[var(--muted)]">single canonical home</span>
      </div>
      <table className="w-full text-[11px]">
        <thead>
          <tr className="border-b border-[var(--border)]">
            <th className="text-left px-5 py-2 font-mono text-[10px] text-[var(--muted)] uppercase tracking-wide">Customer</th>
            <th className="text-left px-5 py-2 font-mono text-[10px] text-[var(--muted)] uppercase tracking-wide">Source</th>
            <th className="text-left px-5 py-2 font-mono text-[10px] text-[var(--muted)] uppercase tracking-wide">Term</th>
            <th className="text-left px-5 py-2 font-mono text-[10px] text-[var(--muted)] uppercase tracking-wide">Value</th>
            <th className="text-left px-5 py-2 font-mono text-[10px] text-[var(--muted)] uppercase tracking-wide">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.customer} className="border-b border-[var(--border)] last:border-0">
              <td className="px-5 py-2.5 text-[var(--foreground)]">{r.customer}</td>
              <td className="px-5 py-2.5">
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${r.source === "Metronome" ? "bg-[var(--accent)]/10 text-[var(--accent)]" : "bg-[var(--tag-bg)] text-[var(--muted)]"}`}>
                  {r.source}
                </span>
              </td>
              <td className="px-5 py-2.5 text-[var(--muted)]">{r.term}</td>
              <td className="px-5 py-2.5 text-[var(--foreground)]">{r.value}</td>
              <td className="px-5 py-2.5 text-[var(--muted)]">{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AgentCardsViz() {
  const agents = [
    { icon: "📈", name: "Revenue health", desc: "Synthesizes subscriptions, usage, and invoices to explain revenue movements" },
    { icon: "🔔", name: "Collections", desc: "Combines retry history, invoice status, and churn signals" },
    { icon: "⚡", name: "Usage anomaly", desc: "Watches meters and contract thresholds proactively" },
    { icon: "🔄", name: "Lifecycle", desc: "Flags contracts nearing end date and expansion opportunities" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {agents.map((a) => (
        <div key={a.name} className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 hover:border-[var(--accent)] transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">{a.icon}</span>
            <span className="text-xs font-semibold text-[var(--foreground)]">{a.name}</span>
          </div>
          <p className="text-[10px] text-[var(--muted)] leading-relaxed">{a.desc}</p>
        </div>
      ))}
    </div>
  );
}

function BillingIACaseStudy({ project }: { project: typeof projects[number] }) {
  return (
    <div className="flex flex-col flex-1">
      <header className="w-full max-w-3xl mx-auto px-6 pt-16 pb-8">
        <Link
          href="/"
          className="text-xs font-mono text-[var(--accent)] hover:text-[var(--accent-warm)] transition-colors mb-8 inline-block"
        >
          &larr; index
        </Link>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[var(--gradient-from)] via-[var(--gradient-via)] to-[var(--gradient-to)] bg-clip-text text-transparent">
          {project.title}
        </h1>
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 py-4 border-y border-[var(--border)]">
          <Meta k="role" v={project.role} />
          <Meta k="year" v={project.year} />
          <Meta k="tags" v={project.tags.join(", ")} />
          <Meta k="status" v="in progress" />
        </div>
        <TldrSummary>
          Redesigned Stripe&rsquo;s billing navigation from fragmented surfaces into a principled IA — three design principles, workload-based tabs, and agent-ready overview pages that scale as the product grows.
        </TldrSummary>
      </header>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24 space-y-12">

        {/* Context */}
        <section>
          <SectionLabel>context</SectionLabel>
          <div className="space-y-4">
            <p className="text-[15px] text-[var(--foreground)] opacity-90 leading-relaxed">
              Stripe&rsquo;s billing product has grown from a subscriptions tool into a full revenue platform —
              spanning recurring billing, usage-based pricing, contracts, invoicing, and retention. As the
              product surface expanded, the dashboard&rsquo;s information architecture didn&rsquo;t keep pace.
              Users reported difficulty navigating between billing concepts, and research consistently
              surfaced &ldquo;fragmentation&rdquo; as a pain point.
            </p>
            <p className="text-[15px] text-[var(--foreground)] opacity-90 leading-relaxed">
              Simultaneously, the acquisition of a usage-based billing platform introduced new objects
              (meters, contracts with commit/consume semantics, credit grants) that needed to live
              coherently alongside existing subscription primitives. The question wasn&rsquo;t just
              &ldquo;where do we put things&rdquo; — it was &ldquo;what&rsquo;s the organizing logic
              that scales as we keep adding?&rdquo;
            </p>
          </div>
        </section>

        {/* Challenge */}
        <section>
          <SectionLabel>the challenge</SectionLabel>
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 space-y-3">
            <p className="text-sm text-[var(--foreground)] opacity-90 leading-relaxed">
              Design a billing information architecture that:
            </p>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li className="flex gap-2"><span className="text-[var(--accent)]">→</span> Unifies native and acquired billing objects without fragmenting the experience</li>
              <li className="flex gap-2"><span className="text-[var(--accent)]">→</span> Scales as new billing models (hybrid, usage-based, contract-first) are introduced</li>
              <li className="flex gap-2"><span className="text-[var(--accent)]">→</span> Serves both human operators and programmatic agents entering the same surfaces</li>
              <li className="flex gap-2"><span className="text-[var(--accent)]">→</span> Provides a clear mental model that maps to how billing operators think about their work</li>
            </ul>
          </div>
        </section>

        {/* Approach */}
        <section>
          <SectionLabel>approach</SectionLabel>
          <div className="space-y-4">
            <p className="text-[15px] text-[var(--foreground)] opacity-90 leading-relaxed">
              Rather than starting from the object model (what exists in the system) or the feature list
              (what we&rsquo;ve built), I started from operator jobs. What is a billing operator actually
              <em> doing</em> when they open the dashboard? They&rsquo;re managing recurring relationships.
              They&rsquo;re monitoring consumption. They&rsquo;re collecting money. They&rsquo;re preventing churn.
            </p>
            <p className="text-[15px] text-[var(--foreground)] opacity-90 leading-relaxed">
              These jobs became the organizing structure — not the API objects underneath them. This led
              to a set of principles derived from both user research (navigation studies, card sorts,
              workload concept testing) and the practical constraint that any architecture we ship must
              also be navigable by AI agents performing billing operations on behalf of users.
            </p>
          </div>
        </section>

        {/* Principles */}
        <section>
          <SectionLabel>principles</SectionLabel>
          <div className="grid gap-3">
            <PrincipleCard
              number="01"
              title="One object, one home."
              description="If it's the same concept, it lives in one place — even if it's relevant to multiple contexts. An object's provenance (which system created it) is metadata, not a reason to duplicate its location."
            />
            <PrincipleCard
              number="02"
              title="Tabs are workloads, sub-tabs are objects."
              description="Top-level tabs represent what you're doing (managing subscriptions, monitoring usage). Sub-tabs within them represent what you're looking at while doing that work (contracts, meters, credits)."
            />
            <PrincipleCard
              number="03"
              title="The overview is a unifier and a launchpad."
              description="The top-level surface synthesizes across sub-workloads into a single coherent state. It ships with ready-made agents scoped to those workloads — so humans and programmatic actors both enter through one surface."
            />
          </div>
        </section>

        {/* Manifestation: Navigation */}
        <section>
          <SectionLabel>manifestation: navigation structure</SectionLabel>
          <p className="text-sm text-[var(--muted)] mb-4 leading-relaxed">
            The nav separates universal platform tasks (balances, transactions, customers) from the
            billing workload, which expands to reveal its sub-workloads. Each sub-workload contains
            only the objects relevant to that job.
          </p>
          <NavDiagram />
        </section>

        {/* Manifestation: One object, one home */}
        <section>
          <SectionLabel>manifestation: contracts as a single home</SectionLabel>
          <div className="space-y-4">
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              Contracts exist in both the native billing system and the acquired usage-based platform.
              Rather than splitting them across two tabs (forcing operators to check two places), they
              live exclusively under Subscriptions with a source badge indicating provenance. The
              acquired platform&rsquo;s contracts appear with a &ldquo;Metronome&rdquo; badge; native contracts
              show &ldquo;Stripe.&rdquo; Same table, same interactions, different origin — surfaced, not hidden.
            </p>
            <ContractsTableViz />
          </div>
        </section>

        {/* Manifestation: Agents */}
        <section>
          <SectionLabel>manifestation: agent-ready overview</SectionLabel>
          <div className="space-y-4">
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              The billing overview isn&rsquo;t a vanity dashboard — it&rsquo;s the canonical entry
              point for both a human glancing at their billing health and an agent resolving a support
              ticket. Pre-built agents ship with the workload, each scoped to cross-workload synthesis
              that only the overview surface can provide.
            </p>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              If the architecture forces an agent to visit three sub-tabs to assemble a customer&rsquo;s
              billing picture, the architecture is wrong. The overview provides that picture in one read.
            </p>
            <AgentCardsViz />
          </div>
        </section>

        {/* Research backing */}
        <section>
          <SectionLabel>research backing</SectionLabel>
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 space-y-3">
            <p className="text-sm text-[var(--foreground)] opacity-90 leading-relaxed">
              These principles are grounded in existing research across the billing and dashboard
              navigation programs:
            </p>
            <ul className="space-y-2 text-xs font-mono text-[var(--muted)]">
              <li>&ldquo;Demystifying how users navigate Billing&rdquo; — navigation patterns study</li>
              <li>&ldquo;Dashboard core surfaces: from fragmentation to integration&rdquo; — synthesis finding</li>
              <li>&ldquo;Aligning the Payments workload to user mental models&rdquo; — precedent for workload-based IA</li>
              <li>&ldquo;Hybrid businesses need unified revenue metrics across subscriptions and UBB&rdquo; — unifier validation</li>
              <li>&ldquo;What did users think about the navigation and workloads?&rdquo; — concept test results</li>
            </ul>
          </div>
        </section>

        {/* Impact */}
        <section>
          <SectionLabel>impact</SectionLabel>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 text-center">
              <div className="text-lg font-bold text-[var(--accent)]">3</div>
              <div className="text-[10px] font-mono text-[var(--muted)] mt-1">design principles adopted</div>
            </div>
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 text-center">
              <div className="text-lg font-bold text-[var(--accent)]">12+</div>
              <div className="text-[10px] font-mono text-[var(--muted)] mt-1">billing objects placed</div>
            </div>
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 text-center">
              <div className="text-lg font-bold text-[var(--accent)]">1</div>
              <div className="text-[10px] font-mono text-[var(--muted)] mt-1">unified nav model</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-[var(--muted)] leading-relaxed">
            The IA framework was adopted as the canonical navigation model for billing. Separately, related
            SaaS pricing content strategy work contributed to a projected $2.5&ndash;3M/month revenue uplift.
          </p>
        </section>

        {/* What's next */}
        <section>
          <SectionLabel>what&rsquo;s next</SectionLabel>
          <div className="space-y-4">
            <p className="text-[15px] text-[var(--foreground)] opacity-90 leading-relaxed">
              The prototype is live internally and being used as a conversation tool with billing
              leadership. Open questions remain around how deeply the agent layer integrates with
              existing operational workflows, and whether the &ldquo;one home&rdquo; principle holds
              as more acquired objects enter the system.
            </p>
            <p className="text-[15px] text-[var(--foreground)] opacity-90 leading-relaxed">
              The broader bet: that an IA designed simultaneously for human and machine consumers
              will outperform one designed for humans alone and retrofitted for agents later. We&rsquo;re
              testing that thesis in production.
            </p>
          </div>
        </section>

        <footer className="pt-8 border-t border-[var(--border)]">
          <p className="text-xs font-mono text-[var(--muted)] opacity-50">
            // interactive prototype available internally · principles doc in review
          </p>
        </footer>
      </main>
    </div>
  );
}

// ─── UCR Triage Case Study ────────────────────────────────────────────────────

function TriageFlowDiagram() {
  const steps = [
    { label: "Communication created", type: "trigger", detail: "Jira ticket enters queue" },
    { label: "LLM triage handler", type: "process", detail: "Evaluates intent, audience, content type" },
    { label: "Classification", type: "decision", detail: "Route, flag, or approve" },
    { label: "Team notification", type: "output", detail: "Slack + assignee routing" },
  ];

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
      <div className="text-[var(--muted)] mb-4 text-[10px] font-mono uppercase tracking-wide">Triage pipeline</div>
      <div className="flex flex-col gap-2">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                step.type === "trigger" ? "bg-[var(--accent)]/20 text-[var(--accent)]" :
                step.type === "process" ? "bg-[var(--accent-warm)]/20 text-[var(--accent-warm)]" :
                step.type === "decision" ? "bg-[var(--accent-cool)]/20 text-[var(--accent-cool)]" :
                "bg-[var(--tag-bg)] text-[var(--muted)]"
              }`}>
                {String(i + 1).padStart(2, "0")}
              </div>
              {i < steps.length - 1 && <div className="w-px h-4 bg-[var(--border)]" />}
            </div>
            <div className="flex-1 flex items-baseline justify-between gap-4 py-1.5">
              <span className="text-xs font-medium text-[var(--foreground)]">{step.label}</span>
              <span className="text-[10px] font-mono text-[var(--muted)] opacity-60">{step.detail}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InfraStackViz() {
  const layers = [
    { label: "Feature flag", items: ["enable_ucr_triage_handler"], desc: "Controls rollout + kill switch" },
    { label: "Handler", items: ["jira_llm_hook"], desc: "Evaluates ticket on creation/update" },
    { label: "Routing", items: ["project.yaml", "flags.yaml"], desc: "Determines team, channel, urgency" },
    { label: "Notification", items: ["Slack channel", "Email group"], desc: "Surfaces results to reviewers" },
  ];

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
      <div className="text-[var(--muted)] mb-4 text-[10px] font-mono uppercase tracking-wide">System layers</div>
      <div className="space-y-3">
        {layers.map((layer) => (
          <div key={layer.label} className="flex items-start gap-4">
            <span className="text-[10px] font-mono text-[var(--accent)] uppercase tracking-wide w-24 shrink-0 pt-0.5">
              {layer.label}
            </span>
            <div className="flex-1 flex items-center gap-2 flex-wrap">
              {layer.items.map((item) => (
                <span key={item} className="text-[10px] font-mono px-2 py-1 rounded bg-[var(--tag-bg)] text-[var(--foreground)] border border-[var(--border)]">
                  {item}
                </span>
              ))}
              <span className="text-[10px] text-[var(--muted)] ml-1">{layer.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BeforeAfterViz() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5">
        <div className="text-[10px] font-mono uppercase tracking-wide text-[var(--accent-warm)] mb-3">Before</div>
        <ul className="space-y-2 text-xs text-[var(--muted)]">
          <li className="flex gap-2"><span className="opacity-40">·</span> Manual triage by designers</li>
          <li className="flex gap-2"><span className="opacity-40">·</span> Tickets sit in queue for hours/days</li>
          <li className="flex gap-2"><span className="opacity-40">·</span> No consistent classification criteria</li>
          <li className="flex gap-2"><span className="opacity-40">·</span> Reviewer context-switches constantly</li>
          <li className="flex gap-2"><span className="opacity-40">·</span> Noise spread across general channels</li>
        </ul>
      </div>
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5">
        <div className="text-[10px] font-mono uppercase tracking-wide text-[var(--accent)] mb-3">After</div>
        <ul className="space-y-2 text-xs text-[var(--muted)]">
          <li className="flex gap-2"><span className="text-[var(--accent)]">→</span> LLM evaluates on ticket creation</li>
          <li className="flex gap-2"><span className="text-[var(--accent)]">→</span> Classification in seconds, not hours</li>
          <li className="flex gap-2"><span className="text-[var(--accent)]">→</span> Principled rules of engagement applied</li>
          <li className="flex gap-2"><span className="text-[var(--accent)]">→</span> Humans review decisions, not raw tickets</li>
          <li className="flex gap-2"><span className="text-[var(--accent)]">→</span> Isolated testing channel for validation</li>
        </ul>
      </div>
    </div>
  );
}

function SkillCard({
  title,
  type,
  description,
  details,
}: {
  title: string;
  type: string;
  description: string;
  details: string[];
}) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 relative overflow-hidden">
      <div className="absolute top-4 right-4 text-[10px] font-mono px-2 py-0.5 rounded-md bg-[var(--tag-bg)] text-[var(--tag-text)] border border-[var(--border)]">
        {type}
      </div>
      <h3 className="text-base font-semibold text-[var(--foreground)] mb-2 pr-20">
        {title}
      </h3>
      <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">
        {description}
      </p>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {details.map((d) => (
          <span key={d} className="text-[10px] font-mono text-[var(--foreground)] opacity-60">
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}

function DashboardBar({ height, accent }: { height: number; accent?: boolean }) {
  return (
    <div
      className={`rounded-sm w-full ${accent ? "bg-[var(--accent)]" : "bg-[var(--accent)] opacity-60"}`}
      style={{ height: `${height}%` }}
    />
  );
}

function DashboardLineChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - (d / max) * 80 - 10;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function DashboardVisualization() {
  const tokenData = [45, 60, 52, 80, 95, 140, 120, 180, 160, 200, 150, 130, 170, 190, 210, 185];
  const sessionsData = [3, 5, 4, 8, 12, 15, 20, 25, 18, 22, 30, 28, 35, 40, 38, 42];
  const jiraData = [6, 4, 8, 5, 7, 3, 9, 6, 8, 4, 7, 5, 10, 8, 6, 7];
  const prsData = [2, 1, 3, 2, 4, 3, 5, 2, 3, 4, 6, 3, 5, 4, 7, 5];
  const meetingsData = [12, 14, 10, 16, 13, 11, 15, 12, 14, 10, 13, 16, 11, 14, 12, 15];
  const ucrData = [4, 6, 3, 5, 7, 4, 8, 5, 6, 4, 7, 5, 8, 6, 9, 7];

  return (
    <div className="mt-4 bg-[var(--background)] border border-[var(--border)] rounded-xl p-4 overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-mono uppercase tracking-wide text-[var(--muted)] opacity-60">
          live dashboard · 16 weeks
        </span>
        <span className="text-[10px] font-mono text-[var(--muted)] opacity-40">
          hubble/63368
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {/* AI Token Usage - line chart */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-3">
          <span className="text-[9px] font-mono uppercase tracking-wide text-[var(--muted)] block mb-2">
            AI tokens/week
          </span>
          <div className="h-12">
            <DashboardLineChart data={tokenData} color="var(--accent)" />
          </div>
          <span className="text-[10px] font-mono text-[var(--accent)] mt-1 block">210K peak</span>
        </div>

        {/* AI Tool Sessions - bar chart */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-3">
          <span className="text-[9px] font-mono uppercase tracking-wide text-[var(--muted)] block mb-2">
            tool sessions
          </span>
          <div className="h-12 flex items-end gap-[2px]">
            {sessionsData.slice(-10).map((d, i) => (
              <DashboardBar key={i} height={(d / 42) * 100} accent={i >= 7} />
            ))}
          </div>
          <span className="text-[10px] font-mono text-[var(--accent)] mt-1 block">42 peak</span>
        </div>

        {/* Jira Tickets Resolved */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-3">
          <span className="text-[9px] font-mono uppercase tracking-wide text-[var(--muted)] block mb-2">
            jira resolved
          </span>
          <div className="h-12 flex items-end gap-[2px]">
            {jiraData.slice(-10).map((d, i) => (
              <DashboardBar key={i} height={(d / 10) * 100} />
            ))}
          </div>
          <span className="text-[10px] font-mono text-[var(--accent)] mt-1 block">10 peak</span>
        </div>

        {/* PRs Merged */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-3">
          <span className="text-[9px] font-mono uppercase tracking-wide text-[var(--muted)] block mb-2">
            PRs merged
          </span>
          <div className="h-12 flex items-end gap-[2px]">
            {prsData.slice(-10).map((d, i) => (
              <DashboardBar key={i} height={(d / 7) * 100} accent={i >= 8} />
            ))}
          </div>
          <span className="text-[10px] font-mono text-[var(--accent)] mt-1 block">7 peak</span>
        </div>

        {/* Weekly Meeting Load */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-3">
          <span className="text-[9px] font-mono uppercase tracking-wide text-[var(--muted)] block mb-2">
            meetings/week
          </span>
          <div className="h-12 flex items-end gap-[2px]">
            {meetingsData.slice(-10).map((d, i) => (
              <DashboardBar key={i} height={(d / 16) * 100} />
            ))}
          </div>
          <span className="text-[10px] font-mono text-[var(--accent-warm)] mt-1 block">16 peak</span>
        </div>

        {/* UCR Tickets Touched */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-3">
          <span className="text-[9px] font-mono uppercase tracking-wide text-[var(--muted)] block mb-2">
            UCR tickets
          </span>
          <div className="h-12 flex items-end gap-[2px]">
            {ucrData.slice(-10).map((d, i) => (
              <DashboardBar key={i} height={(d / 9) * 100} />
            ))}
          </div>
          <span className="text-[10px] font-mono text-[var(--accent)] mt-1 block">9 peak</span>
        </div>
      </div>
    </div>
  );
}

function FunnelBar({ label, count, pct }: { label: string; count: number; pct: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[9px] font-mono text-[var(--muted)] w-28 text-right shrink-0 truncate">
        {label}
      </span>
      <div className="flex-1 h-5 bg-[var(--background)] rounded-sm overflow-hidden relative">
        <div
          className="h-full bg-[var(--accent)] rounded-sm opacity-80"
          style={{ width: `${pct}%` }}
        />
        <span className="absolute inset-0 flex items-center justify-center text-[9px] font-mono text-white mix-blend-difference">
          {count.toLocaleString()} ({pct}%)
        </span>
      </div>
    </div>
  );
}

function TaxOnboardingMetrics() {
  return (
    <div className="mt-4 bg-[var(--background)] border border-[var(--border)] rounded-xl p-4 overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-mono uppercase tracking-wide text-[var(--muted)] opacity-60">
          onboarding funnels · post-launch
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Fine-tune: with product categorization */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-3">
          <span className="text-[9px] font-mono uppercase tracking-wide text-[var(--muted)] block mb-2">
            Fine-tune monitoring (with categorization)
          </span>
          <div className="space-y-1.5">
            <FunnelBar label="WELCOME" count={1790} pct={100} />
            <FunnelBar label="REVIEW_ADDRESS" count={1789} pct={100} />
            <FunnelBar label="BACKUP_TAX_CODE" count={1790} pct={100} />
            <FunnelBar label="CATEGORIZE" count={1790} pct={100} />
            <FunnelBar label="COMPLETED" count={1755} pct={98} />
          </div>
          <span className="text-[10px] font-mono text-[var(--accent)] mt-2 block">98% completion</span>
        </div>

        {/* Start Collection funnel */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-3">
          <span className="text-[9px] font-mono uppercase tracking-wide text-[var(--muted)] block mb-2">
            Start collection steps
          </span>
          <div className="space-y-1.5">
            <FunnelBar label="HOW_TAX_WORKS" count={3108} pct={100} />
            <FunnelBar label="JURISDICTION" count={2866} pct={92} />
            <FunnelBar label="RECOMMENDATION" count={2705} pct={87} />
            <FunnelBar label="INTEGRATION" count={2338} pct={75} />
            <FunnelBar label="ALL_DONE" count={2279} pct={73} />
          </div>
          <span className="text-[10px] font-mono text-[var(--accent)] mt-2 block">73% full activation</span>
        </div>

        {/* Fine-tune: no product categorization */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-3">
          <span className="text-[9px] font-mono uppercase tracking-wide text-[var(--muted)] block mb-2">
            Fine-tune monitoring (no categorization)
          </span>
          <div className="space-y-1.5">
            <FunnelBar label="WELCOME" count={2109} pct={100} />
            <FunnelBar label="REVIEW_ADDRESS" count={1810} pct={86} />
            <FunnelBar label="BACKUP_TAX_CODE" count={1761} pct={83} />
            <FunnelBar label="COMPLETED" count={1707} pct={81} />
          </div>
          <span className="text-[10px] font-mono text-[var(--accent)] mt-2 block">81% completion</span>
        </div>

        {/* Tax Collection Status */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-3">
          <span className="text-[9px] font-mono uppercase tracking-wide text-[var(--muted)] block mb-2">
            Collection status distribution
          </span>
          <div className="h-20 flex items-end gap-2 px-2">
            <div className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-[var(--accent)] opacity-70 rounded-sm" style={{ height: "90%" }} />
              <span className="text-[8px] font-mono text-[var(--muted)]">NOT</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-[var(--accent)] opacity-50 rounded-sm" style={{ height: "55%" }} />
              <span className="text-[8px] font-mono text-[var(--muted)]">SELL+COLL</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-[var(--accent)] opacity-60 rounded-sm" style={{ height: "52%" }} />
              <span className="text-[8px] font-mono text-[var(--muted)]">SELL+NOT</span>
            </div>
          </div>
          <span className="text-[10px] font-mono text-[var(--muted)] mt-2 block opacity-60">last 30 days · reportable merchants</span>
        </div>
      </div>
    </div>
  );
}

function SkillsPersonalSoftware({ project }: { project: typeof projects[number] }) {
  return (
    <div className="flex flex-col flex-1">
      <header className="w-full max-w-3xl mx-auto px-6 pt-16 pb-8">
        <Link
          href="/"
          className="text-xs font-mono text-[var(--accent)] hover:text-[var(--accent-warm)] transition-colors mb-8 inline-block"
        >
          &larr; index
        </Link>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[var(--gradient-from)] via-[var(--gradient-via)] to-[var(--gradient-to)] bg-clip-text text-transparent">
          {project.title}
        </h1>
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 py-4 border-y border-[var(--border)]">
          <Meta k="role" v={project.role} />
          <Meta k="year" v={project.year} />
          <Meta k="tags" v={project.tags.join(", ")} />
        </div>
        <TldrSummary>
          Personal software and Claude-native tooling — a macOS context app, CI validation skills, session memory systems, and rapid prototyping pipelines. Working tools that treat the designer as a system participant.
        </TldrSummary>
      </header>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24 space-y-12">

        <section>
          <p className="text-[15px] text-[var(--foreground)] opacity-90 leading-relaxed">
            I build personal software and Claude-native tooling to solve my own workflow problems —
            then share what generalizes. These aren&rsquo;t portfolio pieces in the traditional sense;
            they&rsquo;re working tools I use daily. The thread connecting them: context-aware software
            that treats the developer (or designer) as a system participant, not just an end user.
          </p>
        </section>

        {/* Strata */}
        <section>
          <SectionLabel>strata</SectionLabel>
          <SkillCard
            title="Strata"
            type="macOS app"
            description="A native floating panel that aggregates work context — calendar, email, pull requests, Jira tickets, Figma files, and Claude sessions with cost tracking — into a persistent sidebar. Built as an AI Day project in Swift 6.2 and SwiftUI, shared internally at Stripe where others have forked it for their own workflows."
            details={[
              "Swift 6.2 / SwiftUI",
              "NSPanel floating window",
              "launchd polling",
              "drag-to-reorder sections",
              "collapse-to-strip mode",
            ]}
          />
          <div className="mt-4 space-y-3">
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              The design principle: your work context shouldn&rsquo;t require six browser tabs and a
              mental model of which tool holds which information. A single surface, always visible,
              showing what matters right now. The &ldquo;Now/Next&rdquo; framing at the top replaces
              a todo list with temporal awareness — what&rsquo;s happening in the next 30 minutes,
              and what&rsquo;s after that.
            </p>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              Built natively because Electron would fight macOS window management. The panel sits
              at a window level that avoids Spaces/Mission Control interference while remaining
              permanently accessible via a global hotkey.
            </p>
          </div>
        </section>

        {/* Greenlight */}
        <section>
          <SectionLabel>greenlight</SectionLabel>
          <SkillCard
            title="Greenlight"
            type="Claude skill"
            description="A pre-push validation skill that translates PR diffs into plain-English manifests, then checks whether supporting pieces (feature flags, registry entries, package imports, test files) are present. Catches architectural gaps before CI does — saving 10-20 minute feedback loops per push."
            details={[
              "pre-push hook",
              "diff → manifest translation",
              "missing-piece detection",
              "CI failure prevention",
            ]}
          />
          <div className="mt-4 space-y-3">
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              The insight: most CI failures for a non-engineer shipping code aren&rsquo;t logic errors —
              they&rsquo;re missing supporting infrastructure that the code itself doesn&rsquo;t reference
              directly. A new handler needs a project.yaml entry. A flag needs a flags.yaml declaration.
              These are knowable before push if you check.
            </p>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              Greenlight reads the diff, identifies what kind of change it is, and verifies the
              ecosystem around it is complete. The result: significantly fewer wasted CI runs and
              a tighter feedback loop between &ldquo;I think this is done&rdquo; and &ldquo;this is
              actually done.&rdquo;
            </p>
          </div>
        </section>

        {/* Session memory */}
        <section>
          <SectionLabel>structured session memory</SectionLabel>
          <SkillCard
            title="Persistent memory system"
            type="Claude pattern"
            description="A file-based memory architecture that builds context across conversations — user preferences, project state, feedback patterns, and external references. Designed so Claude can resume mid-task without re-explaining context, and accumulate judgment about how to work with me specifically."
            details={[
              "4 memory types",
              "frontmatter + index",
              "cross-linking via [[refs]]",
              "auto-eviction of stale state",
            ]}
          />
          <div className="mt-4 space-y-3">
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              The core design decision: separate what&rsquo;s durable (user preferences, validated
              approaches, external resource locations) from what&rsquo;s ephemeral (current task state,
              debugging steps). Memories are typed — <em>user</em>, <em>feedback</em>, <em>project</em>,
              <em>reference</em> — so they can be selectively loaded based on relevance rather than
              dumped wholesale into context.
            </p>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              The feedback type is particularly valuable: it captures corrections and confirmations
              with a &ldquo;why&rdquo; annotation, so the system can generalize from specific incidents
              rather than just memorizing rules. &ldquo;Don&rsquo;t mock the database&rdquo; becomes
              useful when you know <em>why</em> — a prior migration failure — because you can judge
              whether the rule applies in a new context.
            </p>
          </div>
        </section>

        {/* Protodash workflow */}
        <section>
          <SectionLabel>protodash → vercel pipeline</SectionLabel>
          <SkillCard
            title="Rapid prototyping workflow"
            type="workflow"
            description="A pipeline from Claude Code to real design system components (Sail) running on a remote devbox, with one-click Vercel deployment for external sharing. Lets a designer build production-fidelity prototypes without a local frontend environment or design system setup."
            details={[
              "Claude Code → devbox SSH",
              "real Sail components",
              "Vercel deploy for sharing",
              "no local env needed",
            ]}
          />
          <div className="mt-4 space-y-3">
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              The problem: prototyping tools (Figma, static mocks) don&rsquo;t capture interaction patterns,
              real data flows, or component behavior. But setting up a full frontend environment is a
              multi-hour yak shave for someone whose primary tool is language, not webpack.
            </p>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              This workflow eliminates that gap. Claude Code writes components using the real design system,
              runs them on a remote devbox (bypassing local setup entirely), and deploys to Vercel for
              stakeholder review. The prototype the billing IA case study references was built this way —
              real components, real interactions, deployed in under an hour.
            </p>
          </div>
        </section>

        {/* Dante eval */}
        <section>
          <SectionLabel>dante rule evaluation framework</SectionLabel>
          <SkillCard
            title="Dante eval"
            type="Claude skill"
            description="A structured evaluation harness for testing proposed UX writing rule changes against a live corpus. Runs dual-pass rewrites, blinded judge scoring with position-swap debiasing, cluster fixture regression testing, and produces SHIP/REVISE/REJECT recommendations with Cohen's kappa inter-rater reliability."
            details={[
              "50-ticket random corpus",
              "cluster fixture regression",
              "blinded dual-judge pass",
              "golden set validation",
              "automated results logging",
            ]}
          />
          <div className="mt-4 space-y-3">
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              The problem: changing a single content rule in a system with 70+ interacting rules
              can improve one surface while regressing another. Manual review catches obvious
              regressions but misses interactions between rule clusters (voice vs. brevity,
              positive framing vs. error clarity, terminology vs. natural language).
            </p>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              The eval pre-classifies each proposed rule by type and blast radius, selects
              targeted fixture tickets that exercise known cluster tension points, and runs a
              blinded judge that scores output quality without knowing which version applied the
              new rule. Position-swapping across two passes eliminates anchoring bias. A golden
              set of 16 human-labeled pairs validates the judge&rsquo;s calibration independently.
            </p>
          </div>
        </section>

        {/* Google Docs table writing */}
        <section>
          <SectionLabel>google docs table writing</SectionLabel>
          <SkillCard
            title="Computed-index table formula"
            type="guide"
            description="A mathematical formula for writing tables to Google Docs in a single API call — bypassing the 'insertion index must be inside the bounds of an existing paragraph' error that blocks standard append operations for table content."
            details={[
              "cell_index = table_start + 3 + row*(cols*2+1) + col*2",
              "2 API calls total",
              "no intermediate reads",
              "deterministic cell layout",
            ]}
          />
          <div className="mt-4 space-y-3">
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              Google Docs API&rsquo;s append operations fail on tables. The workaround: empty tables
              have deterministic internal structure, so you can compute every cell&rsquo;s character
              index mathematically and populate the entire table in a single batch — insert the table
              structure, then fill all cells with reversed-index text operations. No need to read the
              document back between steps.
            </p>
          </div>
        </section>

        {/* Personal productivity dashboard */}
        <section>
          <SectionLabel>personal productivity dashboard</SectionLabel>
          <SkillCard
            title="Hubble productivity dashboard"
            type="guide"
            description="A self-serve guide for any Stripe employee to build a personal productivity dashboard — 7 widgets covering AI token usage, tool sessions, Jira throughput, PRs merged, meeting load, UCR advisory work, and active coding days. All parameterised by LDAP."
            details={[
              "7 SQL widgets",
              "weekly time-series",
              "cross-tool activity view",
              "Kai-automatable refresh",
            ]}
          />
          <DashboardVisualization />
          <div className="mt-4 space-y-3">
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              Built to answer the question: &ldquo;what does my work actually look like quantitatively?&rdquo;
              Particularly useful for designers and other non-engineering roles where output
              isn&rsquo;t captured by commit counts alone. The dashboard surfaces AI tool adoption,
              advisory/review load (Jira comments on others&rsquo; tickets), and meeting burden alongside
              traditional engineering metrics.
            </p>
          </div>
        </section>

        {/* Thread */}
        <section>
          <SectionLabel>the thread</SectionLabel>
          <div className="space-y-4">
            <p className="text-[15px] text-[var(--foreground)] opacity-90 leading-relaxed">
              These projects share a thesis: the best developer tooling doesn&rsquo;t abstract
              away complexity — it makes the right information available at the right moment so you
              can make better decisions faster. Strata does this for work context. Greenlight does
              it for shipping readiness. The memory system does it for conversational continuity.
              The eval framework does it for rule governance.
            </p>
            <p className="text-[15px] text-[var(--foreground)] opacity-90 leading-relaxed">
              As a designer who ships code, these tools represent the same practice applied
              reflexively: designing systems that reduce cognitive load and surface what matters.
              The medium is different (Swift, Claude skills, deployment pipelines) but the job is the same.
            </p>
          </div>
        </section>

        <footer className="pt-8 border-t border-[var(--border)]">
          <p className="text-xs font-mono text-[var(--muted)] opacity-50">
            // all tools actively used · strata shared internally at stripe
          </p>
        </footer>
      </main>
    </div>
  );
}

function StringsContentProjects({ project }: { project: typeof projects[number] }) {
  return (
    <div className="flex flex-col flex-1">
      <header className="w-full max-w-3xl mx-auto px-6 pt-16 pb-8">
        <Link
          href="/"
          className="text-xs font-mono text-[var(--accent)] hover:text-[var(--accent-warm)] transition-colors mb-8 inline-block"
        >
          &larr; index
        </Link>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[var(--gradient-from)] via-[var(--gradient-via)] to-[var(--gradient-to)] bg-clip-text text-transparent">
          {project.title}
        </h1>
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 py-4 border-y border-[var(--border)]">
          <Meta k="role" v={project.role} />
          <Meta k="year" v={project.year} />
          <Meta k="tags" v={project.tags.join(", ")} />
        </div>
        <TldrSummary>
          Systems-level design work — standardizing 10,000+ dashboard labels, building automated voice audits, and creating evaluation infrastructure that measures whether writing quality is improving or regressing over time.
        </TldrSummary>
      </header>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24 space-y-12">

        <section>
          <p className="text-[15px] text-[var(--foreground)] opacity-90 leading-relaxed">
            Design at scale isn&rsquo;t just writing strings — it&rsquo;s building the systems
            that ensure thousands of strings stay coherent, evaluable, and improvable over time. These
            projects span from taxonomic work (what do we call things and why) to automated quality
            measurement (how do we know if our writing is getting better or worse).
          </p>
        </section>

        {/* Label standardization */}
        <section>
          <SectionLabel>label standardization</SectionLabel>
          <SkillCard
            title="Billing label standardization"
            type="content system"
            description="A taxonomy and governance framework for every label type in the Stripe Dashboard — action filters, filters, columns, badges, and signposts. Established naming principles, character limits, and consistency rules across 10,000+ strings spanning billing, payments, connect, and checkout surfaces."
            details={[
              "5 label types defined",
              "per-type character limits",
              "Sail guide published",
              "cross-surface audit",
            ]}
          />
          <div className="mt-4 space-y-3">
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              The problem: labels across the dashboard had grown organically. The same concept used
              different names in different surfaces. Filters didn&rsquo;t map to badges. Column headers
              inherited API field names verbatim. Action filters used inconsistent grammar (some nouns,
              some verbs, some adjectives).
            </p>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              The output was three-part: a recommendations doc establishing principles (clear, connected,
              consistent), a Sail guide giving engineers actionable rules per component type, and a
              spreadsheet auditing existing labels against the standard. The principles: labels must work
              standalone (clear), map to sibling elements on the same page (connected), and match identical
              concepts used elsewhere in the product (consistent).
            </p>
          </div>
          <div className="mt-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5">
            <div className="text-[10px] font-mono uppercase tracking-wide text-[var(--muted)] mb-3">Example rules</div>
            <div className="space-y-2 text-xs text-[var(--muted)]">
              <div className="flex gap-3">
                <span className="text-[var(--accent)] shrink-0">Action filters:</span>
                <span>35 chars max, 1–2 words, must include noun, first filter always &ldquo;All [noun]&rdquo;</span>
              </div>
              <div className="flex gap-3">
                <span className="text-[var(--accent)] shrink-0">Filters:</span>
                <span>20 chars for readability / 33 max, 4 words or less, alphabetized, don&rsquo;t inherit API titles</span>
              </div>
              <div className="flex gap-3">
                <span className="text-[var(--accent)] shrink-0">Badges:</span>
                <span>Nouns only, map to filter/action filter for continuity, refer to object status not Stripe actions</span>
              </div>
            </div>
          </div>
        </section>

        {/* Golden sets */}
        <section>
          <SectionLabel>golden sets &amp; quality evaluation</SectionLabel>
          <SkillCard
            title="UCR golden set validation"
            type="evaluation system"
            description="A calibration framework for automated content quality judges — 16 human-labeled copy pairs (6 improvements, 4 equivalents, 6 synthetic regressions) drawn from real communications review data. Measures whether an LLM judge can reliably discriminate copy quality against human ground truth, producing Cohen's kappa as the health metric."
            details={[
              "16 labeled pairs",
              "3 verdict categories",
              "Cohen's kappa scoring",
              "monthly health checks",
              "synthetic regression pairs",
            ]}
          />
          <div className="mt-4 space-y-3">
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              If you&rsquo;re using an LLM to evaluate content quality, you need to know whether the
              judge itself is reliable. The golden set answers this: run the judge against pairs where
              a human designer already determined the quality delta, and measure agreement.
              If kappa drops below 0.4, the judge needs recalibration before any eval results can be trusted.
            </p>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              The synthetic regression pairs are constructed by inverting soft improvements (delta +2 or +3) —
              presenting the approved copy as baseline and the weaker submitted version as the &ldquo;proposed
              change.&rdquo; This tests the judge&rsquo;s sensitivity to quality decreases, not just its
              ability to spot improvements.
            </p>
          </div>
        </section>

        {/* Voice audit */}
        <section>
          <SectionLabel>sentence-level voice audit</SectionLabel>
          <SkillCard
            title="200-string voice audit across 8 product areas"
            type="audit"
            description="A quantitative voice analysis scoring ~200 sentences from the Stripe codebase against 8 dimensions (active voice, clarity, positive framing, tone match, directness, empathy, authority, personality). Surfaced systematic patterns: passive voice concentrates in risk/compliance, empathy appears only in success states, and zero consistent personality exists across content types."
            details={[
              "200 sentences sampled",
              "8 product areas",
              "8 scoring dimensions",
              "Dante-scored + annotated",
            ]}
          />
          <div className="mt-4 space-y-3">
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              The audit revealed that Stripe doesn&rsquo;t have one voice — it has two strong personalities
              (warm/confident onboarding, clinical/passive risk) and then a large middle that defaults
              to neutral system-speak. The key finding: Stripe uses active voice for good news and
              passive voice for bad news. This is precisely backwards — bad news requires more clarity,
              not less.
            </p>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              The recommendation: define three tones rather than one voice. <em>Utility</em> for task-focused
              surfaces where personality adds noise. <em>Advisor</em> for choice points where users
              need opinionated guidance. <em>Candor</em> for negative states where directness and empathy
              matter most. The failure mode being addressed: risk and error surfaces default to utility
              tone when they need candor.
            </p>
          </div>
          <div className="mt-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-[var(--border)]">
              <span className="text-[10px] font-mono uppercase tracking-wide text-[var(--muted)]">Score summary (subset)</span>
            </div>
            <table className="w-full text-[11px]">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left px-5 py-2 font-mono text-[10px] text-[var(--muted)] uppercase tracking-wide">Surface</th>
                  <th className="text-left px-5 py-2 font-mono text-[10px] text-[var(--muted)] uppercase tracking-wide">Active</th>
                  <th className="text-left px-5 py-2 font-mono text-[10px] text-[var(--muted)] uppercase tracking-wide">Empathy</th>
                  <th className="text-left px-5 py-2 font-mono text-[10px] text-[var(--muted)] uppercase tracking-wide">Personality</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { surface: "Onboarding flows", active: "3/3", empathy: "3/3", personality: "3/3" },
                  { surface: "Emails (positive)", active: "3/3", empathy: "3/3", personality: "3/3" },
                  { surface: "Billing overview", active: "3/3", empathy: "1/3", personality: "2/3" },
                  { surface: "Risk/compliance", active: "1/3", empathy: "0/3", personality: "0/3" },
                  { surface: "Error states", active: "1/3", empathy: "0/3", personality: "0/3" },
                ].map((r) => (
                  <tr key={r.surface} className="border-b border-[var(--border)] last:border-0">
                    <td className="px-5 py-2 text-[var(--foreground)]">{r.surface}</td>
                    <td className="px-5 py-2 text-[var(--muted)]">{r.active}</td>
                    <td className="px-5 py-2 text-[var(--muted)]">{r.empathy}</td>
                    <td className="px-5 py-2 text-[var(--muted)]">{r.personality}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Voice & tone meta-analysis */}
        <section>
          <SectionLabel>voice &amp; tone meta-analysis</SectionLabel>
          <SkillCard
            title="Cross-product voice & tone research synthesis"
            type="meta-analysis"
            description="A synthesis of all existing tone and voice research across Stripe — pulling from 12 product-area content audits, 18 Dovetail research queries, and participant verbatims — to identify the five systemic voice failures that no single product study had surfaced individually."
            details={[
              "12 product areas",
              "18 Dovetail queries",
              "5 systemic findings",
              "3-tone recommendation",
            ]}
          />
          <div className="mt-4 space-y-3">
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              The five findings: Stripe is <em>non-committal where it should be opinionated</em> (users
              want guidance, not options menus). <em>Clinical where it should be empathetic</em> (risk
              comms arrive without emotional acknowledgment). <em>Softened where it should be direct</em>
              (sugarcoating backfires — tested and confirmed in research). <em>Inauthentically positive
              in low-stakes contexts</em> (performative warmth undermines trust). And <em>register-inconsistent
              across surfaces</em> (legal says one thing, dashboard says another, emails say a third).
            </p>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              The key participant quote that crystallizes the problem: &ldquo;I use a daily payout because
              I don&rsquo;t trust Stripe for keeping money. I learned about how Stripe blocks user accounts
              from Twitter.&rdquo; Silence is a tone choice — absence of proactive communication reads
              as indifference.
            </p>
          </div>
          <div className="mt-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5">
            <div className="text-[10px] font-mono uppercase tracking-wide text-[var(--muted)] mb-3">Findings summary</div>
            <div className="space-y-2 text-xs text-[var(--muted)]">
              {[
                { finding: "Non-committal where it should be opinionated", dimension: "Authority" },
                { finding: "Clinical where it should be empathetic", dimension: "Emotional register" },
                { finding: "Softened where it should be direct", dimension: "Directness" },
                { finding: "Inauthentically positive in low-stakes contexts", dimension: "Authenticity" },
                { finding: "Register-inconsistent across surfaces", dimension: "Consistency" },
              ].map((f) => (
                <div key={f.dimension} className="flex items-start gap-3">
                  <span className="text-[var(--accent)] shrink-0 text-[10px] font-mono w-20">{f.dimension}</span>
                  <span>{f.finding}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tax onboarding redesign */}
        <section>
          <SectionLabel>tax onboarding redesign</SectionLabel>
          <SkillCard
            title="Stripe Tax onboarding & activation"
            type="design sprint"
            description="Co-led a design sprint to rebuild Stripe Tax's onboarding from scratch — replacing a confusing, disjointed setup flow with a guided experience that takes users from intent to compliance. Users described the old experience as 'the anti-TurboTax.' The new flow was prototyped, user-validated, and shipped in H1 2026."
            details={[
              "1-week design sprint",
              "cross-functional (PM, Eng, Design)",
              "user-validated prototype",
              "shipped H1 2026",
            ]}
          />
          <TaxOnboardingMetrics />
          <div className="mt-4 space-y-3">
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              The core design challenge was sequencing: users didn&rsquo;t understand what a registration
              was, when they needed one, or what actions were required vs. optional. The new flow
              introduces progressive disclosure — explaining concepts as they become relevant, setting
              expectations on time and documents needed, and providing clear &ldquo;what happens next&rdquo;
              guidance at each step.
            </p>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              The 98% completion rate on the fine-tune monitoring flow (with product categorization)
              represents a near-zero-friction path through what was previously the most confusing
              part of tax setup. The start collection funnel shows 73% of merchants reaching full
              activation — a significant improvement over the previous experience where users frequently
              abandoned or made critical setup errors.
            </p>
          </div>
        </section>

        {/* Impact */}
        <section>
          <SectionLabel>impact</SectionLabel>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 text-center">
              <div className="text-lg font-bold text-[var(--accent)]">10,000+</div>
              <div className="text-[10px] font-mono text-[var(--muted)] mt-1">labels standardized</div>
            </div>
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 text-center">
              <div className="text-lg font-bold text-[var(--accent)]">12</div>
              <div className="text-[10px] font-mono text-[var(--muted)] mt-1">product areas audited</div>
            </div>
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 text-center">
              <div className="text-lg font-bold text-[var(--accent)]">κ &gt; 0.4</div>
              <div className="text-[10px] font-mono text-[var(--muted)] mt-1">eval reliability threshold</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-[var(--muted)] leading-relaxed">
            Label taxonomy adopted as the canonical source for dashboard navigation terms. Voice audit
            methodology generalized across 12 product areas. Eval framework in active use for rule change governance.
          </p>
        </section>

        {/* Thread */}
        <section>
          <SectionLabel>the thread</SectionLabel>
          <div className="space-y-4">
            <p className="text-[15px] text-[var(--foreground)] opacity-90 leading-relaxed">
              These projects span four years but share a posture: design is systems work.
              Labels aren&rsquo;t just words — they&rsquo;re a wayfinding layer that breaks when
              inconsistent. Voice isn&rsquo;t just tone — it&rsquo;s a measurable quality dimension
              with systematic failure patterns. Evaluation isn&rsquo;t just review — it&rsquo;s an
              infrastructure problem that needs calibration, regression testing, and reliability metrics.
            </p>
            <p className="text-[15px] text-[var(--foreground)] opacity-90 leading-relaxed">
              The through-line: treating content decisions as engineering problems that deserve
              the same rigor — version control, automated testing, quantitative measurement,
              and principled governance.
            </p>
          </div>
        </section>

        <footer className="pt-8 border-t border-[var(--border)]">
          <p className="text-xs font-mono text-[var(--muted)] opacity-50">
            // label guide shipped to sail · voice audit informing 2026 tone guidelines · eval framework in production
          </p>
        </footer>
      </main>
    </div>
  );
}

function UCRTriageCaseStudy({ project }: { project: typeof projects[number] }) {
  return (
    <div className="flex flex-col flex-1">
      <header className="w-full max-w-3xl mx-auto px-6 pt-16 pb-8">
        <Link
          href="/"
          className="text-xs font-mono text-[var(--accent)] hover:text-[var(--accent-warm)] transition-colors mb-8 inline-block"
        >
          &larr; index
        </Link>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[var(--gradient-from)] via-[var(--gradient-via)] to-[var(--gradient-to)] bg-clip-text text-transparent">
          {project.title}
        </h1>
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 py-4 border-y border-[var(--border)]">
          <Meta k="role" v={project.role} />
          <Meta k="year" v={project.year} />
          <Meta k="tags" v={project.tags.join(", ")} />
          <Meta k="status" v="shipping" />
        </div>
        <TldrSummary>
          Designed and built an LLM-powered triage system that classifies incoming communications tickets by intent and complexity, replacing a manual review bottleneck with structured evaluation rules that execute designer judgment at scale.
        </TldrSummary>
      </header>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24 space-y-12">

        {/* Context */}
        <section>
          <SectionLabel>context</SectionLabel>
          <div className="space-y-4">
            <p className="text-[15px] text-[var(--foreground)] opacity-90 leading-relaxed">
              Every user-facing communication at a large fintech — emails, in-app messages, SMS,
              push notifications — goes through a review process before it ships. This ensures
              regulatory compliance, brand consistency, and content quality. The volume is massive:
              hundreds of communications are created or modified weekly across dozens of product teams.
            </p>
            <p className="text-[15px] text-[var(--foreground)] opacity-90 leading-relaxed">
              The design team was the bottleneck. Every ticket landed in the same queue,
              regardless of complexity. A one-word copy change sat alongside a full regulatory
              rewrite. Triage was manual, inconsistent, and ate into the time designers could
              spend on actual design work.
            </p>
          </div>
        </section>

        {/* Challenge */}
        <section>
          <SectionLabel>the challenge</SectionLabel>
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 space-y-3">
            <p className="text-sm text-[var(--foreground)] opacity-90 leading-relaxed">
              Build an automated triage system that:
            </p>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li className="flex gap-2"><span className="text-[var(--accent)]">→</span> Classifies incoming communications tickets by intent, audience, and complexity</li>
              <li className="flex gap-2"><span className="text-[var(--accent)]">→</span> Routes work to the right reviewer (or approves low-risk changes automatically)</li>
              <li className="flex gap-2"><span className="text-[var(--accent)]">→</span> Applies consistent &ldquo;rules of engagement&rdquo; that the team has defined but never systematized</li>
              <li className="flex gap-2"><span className="text-[var(--accent)]">→</span> Ships incrementally with a kill switch and isolated testing before production rollout</li>
            </ul>
          </div>
        </section>

        {/* Approach */}
        <section>
          <SectionLabel>approach</SectionLabel>
          <div className="space-y-4">
            <p className="text-[15px] text-[var(--foreground)] opacity-90 leading-relaxed">
              I treated this as a design problem first and an engineering problem second.
              The core question wasn&rsquo;t &ldquo;can we use an LLM to read tickets&rdquo; — it was
              &ldquo;what are the actual decision criteria that a skilled designer applies
              when triaging, and can we codify them?&rdquo;
            </p>
            <p className="text-[15px] text-[var(--foreground)] opacity-90 leading-relaxed">
              This meant articulating the implicit rules the team had been applying by feel:
              What makes a communication &ldquo;low risk&rdquo;? What signals require senior review?
              When should a ticket be bounced back to the requesting team before it ever reaches
              design? These rules became the system&rsquo;s prompt architecture — structured,
              testable, versionable.
            </p>
            <p className="text-[15px] text-[var(--foreground)] opacity-90 leading-relaxed">
              The engineering side followed naturally: a feature flag controlling rollout, a handler
              triggered on ticket creation, classification logic, and routing rules that map to
              existing team infrastructure (project ownership, Slack channels, escalation paths).
            </p>
          </div>
        </section>

        {/* Flow diagram */}
        <section>
          <SectionLabel>manifestation: triage pipeline</SectionLabel>
          <p className="text-sm text-[var(--muted)] mb-4 leading-relaxed">
            The system operates as a four-stage pipeline triggered by ticket creation. Each stage
            is independently testable, and the feature flag can halt the pipeline at any point.
          </p>
          <TriageFlowDiagram />
        </section>

        {/* Before/After */}
        <section>
          <SectionLabel>manifestation: before and after</SectionLabel>
          <BeforeAfterViz />
        </section>

        {/* Infrastructure */}
        <section>
          <SectionLabel>manifestation: system infrastructure</SectionLabel>
          <div className="space-y-4">
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              Shipping an automation system into an existing org requires more than code. It requires
              operational infrastructure that isolates testing noise, routes alerts to the right
              humans, and provides a clear audit trail. Each layer was stood up deliberately:
            </p>
            <InfraStackViz />
          </div>
        </section>

        {/* Design decisions */}
        <section>
          <SectionLabel>key design decisions</SectionLabel>
          <div className="space-y-4">
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-5">
              <h4 className="text-sm font-semibold text-[var(--foreground)] mb-2">
                Rules of engagement as structured prompts
              </h4>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                The team&rsquo;s implicit triage criteria were codified into structured evaluation rules
                rather than freeform prompt instructions. This makes them auditable, versionable, and
                testable — a designer can read the rules and verify they match team practice
                without understanding the underlying model.
              </p>
            </div>
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-5">
              <h4 className="text-sm font-semibold text-[var(--foreground)] mb-2">
                Isolated testing before production
              </h4>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                A dedicated Slack channel and email group were created exclusively for automation
                output during validation. This means the team&rsquo;s primary channels stay clean,
                and false positives during testing don&rsquo;t create noise in production workflows.
                The system earns trust before it gets production permissions.
              </p>
            </div>
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-5">
              <h4 className="text-sm font-semibold text-[var(--foreground)] mb-2">
                Humans review decisions, not tickets
              </h4>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                The system doesn&rsquo;t remove humans from the loop — it changes what they review.
                Instead of reading every raw ticket and deciding what to do, designers now review
                the system&rsquo;s classification and either confirm or override. The cognitive load
                shifts from &ldquo;what is this?&rdquo; to &ldquo;is this right?&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* Impact */}
        <section>
          <SectionLabel>impact</SectionLabel>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 text-center">
              <div className="text-lg font-bold text-[var(--accent)]">100s</div>
              <div className="text-[10px] font-mono text-[var(--muted)] mt-1">tickets/week classified</div>
            </div>
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 text-center">
              <div className="text-lg font-bold text-[var(--accent)]">hours→min</div>
              <div className="text-[10px] font-mono text-[var(--muted)] mt-1">triage time reduction</div>
            </div>
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 text-center">
              <div className="text-lg font-bold text-[var(--accent)]">0</div>
              <div className="text-[10px] font-mono text-[var(--muted)] mt-1">manual triage by designers</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-[var(--muted)] leading-relaxed">
            Shifted the team from reactive ticket processing to oversight and rule governance. Designers now
            spend time defining quality criteria instead of doing first-pass classification.
          </p>
        </section>

        {/* Design angle */}
        <section>
          <SectionLabel>the design angle</SectionLabel>
          <div className="space-y-4">
            <p className="text-[15px] text-[var(--foreground)] opacity-90 leading-relaxed">
              This project reframes what &ldquo;design&rdquo; means in an era of automation.
              The traditional framing: designers write and review copy. The expanded framing:
              designers define the rules by which language is evaluated, classified, and routed —
              whether those rules are applied by a person or a machine.
            </p>
            <p className="text-[15px] text-[var(--foreground)] opacity-90 leading-relaxed">
              The LLM is not replacing the designer. It&rsquo;s executing the designer&rsquo;s
              judgment at scale. The designer&rsquo;s job shifts upstream: from
              &ldquo;review this ticket&rdquo; to &ldquo;define what good review looks like and
              verify the system applies it correctly.&rdquo;
            </p>
          </div>
        </section>

        {/* What's next */}
        <section>
          <SectionLabel>what&rsquo;s next</SectionLabel>
          <div className="space-y-4">
            <p className="text-[15px] text-[var(--foreground)] opacity-90 leading-relaxed">
              The system is in pre-production testing with live tickets routed to an isolated channel.
              Next steps: measuring classification accuracy against human triage decisions, expanding
              the rules of engagement to cover edge cases surfaced during testing, and defining
              the confidence threshold at which the system can approve low-risk changes without
              human confirmation.
            </p>
            <p className="text-[15px] text-[var(--foreground)] opacity-90 leading-relaxed">
              The longer arc: if this pattern works for communications review, it generalizes to
              any content governance workflow — style guide enforcement, terminology consistency,
              accessibility compliance. The same &ldquo;codify implicit judgment, automate
              classification, shift humans to oversight&rdquo; pattern applies.
            </p>
          </div>
        </section>

        <footer className="pt-8 border-t border-[var(--border)]">
          <p className="text-xs font-mono text-[var(--muted)] opacity-50">
            // system in pre-production validation · shipping incrementally
          </p>
        </footer>
      </main>
    </div>
  );
}
