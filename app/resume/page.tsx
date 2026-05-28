import Link from "next/link";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent)] opacity-70">
        {children}
      </span>
      <div className="flex-1 h-px bg-[var(--border)]" />
    </div>
  );
}

function Role({
  title,
  company,
  period,
  description,
  highlights,
}: {
  title: string;
  company: string;
  period: string;
  description?: string;
  highlights?: string[];
}) {
  return (
    <div className="mb-8 last:mb-0">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-[var(--foreground)]">
            {title}
          </h3>
          <p className="text-sm text-[var(--muted)] mt-0.5">{company}</p>
        </div>
        <span className="text-[10px] font-mono text-[var(--muted)] opacity-60 shrink-0 pt-1">
          {period}
        </span>
      </div>
      {description && (
        <p className="text-xs text-[var(--muted)] leading-relaxed mt-2">
          {description}
        </p>
      )}
      {highlights && highlights.length > 0 && (
        <ul className="mt-2 space-y-1">
          {highlights.map((h) => (
            <li
              key={h}
              className="text-xs text-[var(--muted)] leading-relaxed flex gap-2"
            >
              <span className="text-[var(--accent)] shrink-0">·</span>
              {h}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ResumePage() {
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
          Resume
        </h1>
        <p className="mt-3 text-sm text-[var(--muted)]">
          Jack Horton &middot; Montreal, QC
        </p>
      </header>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24 space-y-12">
        {/* Experience */}
        <section>
          <SectionLabel>experience</SectionLabel>

          <Role
            title="Senior Content Designer"
            company="Stripe"
            period="2022 – present"
            description="Content design lead for Revenue & Finance Automation (billing, tax, reporting, accounting). Leading information architecture, content systems, and operational automation across Stripe's billing platform."
            highlights={[
              "Led billing information architecture redesign — defining principles for navigation, object placement, and agent-ready surfaces across subscriptions, usage-based billing, invoicing, and retention",
              "Designed and shipped automated communications triage system (UCR) — codifying content review rules into LLM-evaluated pipeline, shifting team from manual ticket review to decision oversight",
              "Built Dante rule evaluation framework — structured eval harness for testing UX writing rule changes with blinded judging, cluster regression testing, and golden set calibration",
              "Drove SaaS pricing content strategy across lifecycle touchpoints — frameworks projected $2.5–3M/month revenue uplift",
              "Created label standardization taxonomy and Sail guide governing 10,000+ dashboard strings",
              "Led cross-product voice & tone meta-analysis synthesizing research across 12 product areas",
              "Shaped accounting product vision and reporting futures UX strategy",
              "Contributed multiple components and guides to Sail design system (tooltips, callouts, starter guides, contextual education, data visualization)",
            ]}
          />

          <Role
            title="Senior Content Designer"
            company="Shopify"
            period="2020 – 2022"
            description="Content design for core commerce surfaces. Focused on merchant-facing admin, checkout, and payments experiences."
            highlights={[
              "Information architecture and content strategy for merchant admin",
              "UX writing across checkout, payments, and shipping flows",
              "Contributed to Polaris design system content guidelines",
            ]}
          />

          <Role
            title="Content Designer"
            company="Wealthsimple"
            period="2019 – 2020"
            description="Content design for fintech products — investing, savings, and tax filing. Writing for complex financial concepts in a consumer-friendly register."
            highlights={[
              "UX writing for investing flows, account onboarding, and tax product",
              "Established content patterns for financial literacy and regulatory disclosure",
            ]}
          />

          <Role
            title="Content Designer / Writing Instructor"
            company="University of Ottawa"
            period="2016 – 2019"
            description="Dual role: taught university-level writing and rhetoric while completing doctoral research. Designed curriculum for undergraduate writing courses and contributed to departmental content and communications."
            highlights={[
              "Taught academic writing, rhetoric, and literary analysis",
              "Designed course materials and assessment frameworks",
              "Doctoral research in English literature (American transcendentalism)",
            ]}
          />
        </section>

        {/* Education */}
        <section>
          <SectionLabel>education</SectionLabel>

          <Role
            title="PhD, English Literature"
            company="University of Ottawa"
            period="2016 – 2019"
            description="Doctoral research in American transcendentalism. Focus on rhetoric, language philosophy, and the relationship between form and meaning."
          />

          <Role
            title="Earlier education"
            company="United Kingdom"
            period="prior to 2016"
            description="Undergraduate and postgraduate study in English literature before relocating to Canada."
          />
        </section>

        {/* What I do */}
        <section>
          <SectionLabel>what I do</SectionLabel>
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[var(--muted)]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wide text-[var(--accent)] block mb-2">
                  Information architecture
                </span>
                <p className="leading-relaxed">
                  Defining when and where we communicate — hierarchy, density, navigation, wayfinding.
                </p>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wide text-[var(--accent)] block mb-2">
                  Content systems
                </span>
                <p className="leading-relaxed">
                  Building the infrastructure that keeps content coherent at scale — taxonomies, evaluation frameworks, governance.
                </p>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wide text-[var(--accent)] block mb-2">
                  UX writing
                </span>
                <p className="leading-relaxed">
                  The words on the screen — clear, direct, and designed for both human readers and programmatic consumers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tools */}
        <section>
          <SectionLabel>tools &amp; technologies</SectionLabel>
          <div className="flex flex-wrap gap-1.5">
            {[
              "Figma",
              "Claude Code",
              "Swift / SwiftUI",
              "TypeScript / React",
              "Next.js",
              "Sourcegraph",
              "Jira",
              "Dovetail",
              "Hubble (SQL)",
              "Vercel",
              "Git",
            ].map((tool) => (
              <span
                key={tool}
                className="text-[10px] font-mono px-2 py-1 rounded-md bg-[var(--tag-bg)] text-[var(--tag-text)] border border-[var(--border)]"
              >
                {tool}
              </span>
            ))}
          </div>
        </section>

        <footer className="pt-8 border-t border-[var(--border)]">
          <p className="text-xs font-mono text-[var(--muted)] opacity-50">
            // references available on request
          </p>
        </footer>
      </main>
    </div>
  );
}
