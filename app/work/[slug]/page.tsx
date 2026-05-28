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
