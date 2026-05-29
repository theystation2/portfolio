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
            title="Staff Content Designer"
            company="Stripe"
            period="Aug 2024 – present"
            description="Design lead for billing, tax, reporting, and accounting. Information architecture, content systems, and operational automation."
            highlights={[
              "Led billing IA redesign — navigation principles, object placement, and agent-ready overview surfaces",
              "Designed automated communications triage system — LLM-evaluated pipeline replacing manual review",
              "Built structured evaluation framework for UX writing rule changes (blinded judging, regression testing)",
              "SaaS pricing content strategy — $2.5–3M/month projected revenue uplift",
              "Label standardization taxonomy and Sail design system contributions",
              "Cross-product voice & tone meta-analysis across 12 product areas",
            ]}
          />

          <Role
            title="Content Designer"
            company="Stripe"
            period="Aug 2022 – Aug 2024"
            description="Design for Revenue & Finance Automation. Billing, tax, reporting, Sigma, and accounting surfaces."
          />

          <Role
            title="Senior Content Designer"
            company="Wealthsimple"
            period="Aug 2021 – Jul 2022"
            description="Design for fintech products — investing, savings, and tax filing. Writing for complex financial concepts in a consumer-friendly register."
          />

          <Role
            title="Senior Content Designer"
            company="Shopify"
            period="Mar 2021 – Aug 2021"
            description="Design for core commerce surfaces. Merchant-facing admin, checkout, and payments."
          />

          <Role
            title="Content Designer"
            company="Shopify"
            period="Nov 2019 – Mar 2021"
            description="Internal research, experience mapping, workflow development, prototyping, content best-practices, taxonomies, hierarchies, and knowledge management."
          />

          <Role
            title="Content Strategist — Knowledge Management"
            company="Shopify"
            period="Jan 2017 – Nov 2019"
            description="Design for internal tooling — wikis, support information, support tooling such as chat and call functionality."
          />

          <Role
            title="Adjunct Professor"
            company="University of Ottawa"
            period="Sep 2016 – Jan 2020"
            description="Taught university-level writing, rhetoric, and literary analysis while completing doctoral research in English literature."
          />

          <Role
            title="Graduate Teaching Assistant"
            company="University of Ottawa"
            period="Sep 2014 – Nov 2019"
            description="Teaching assistant for undergraduate English and writing courses throughout doctoral program."
          />
        </section>

        {/* Education */}
        <section>
          <SectionLabel>education</SectionLabel>

          <Role
            title="PhD, English Literature"
            company="University of Ottawa"
            period="2014 – 2020"
            description="Doctoral research in American transcendentalism. Focus on rhetoric, language philosophy, and the relationship between form and meaning."
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
