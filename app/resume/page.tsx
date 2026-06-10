import Link from "next/link";
import { PrintButton } from "./PrintButton";

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
        <div className="flex items-center justify-between mt-3">
          <p className="text-sm text-[var(--muted)]">
            Jack Horton &middot; Montreal, QC
          </p>
          <PrintButton />
        </div>
      </header>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24 space-y-12">
        {/* Profile */}
        <section>
          <SectionLabel>profile</SectionLabel>
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            Montréal-based content designer with a doctorate in English. Training in knowledge management, teaching, and 10+ years of content design experience. Comfortable in frontier AI technologies with multiple public deployments, local apps, and custom workflows.
          </p>
        </section>

        {/* Experience */}
        <section>
          <SectionLabel>experience [abridged]</SectionLabel>

          <Role
            title="Content designer"
            company="Stripe"
            period="Aug 2022 – present"
            description="AI systems, support tooling, dev ops, and systems work (now), including content automation, governance implementation, and local development. Content at scale, lead content designer in revenue space, and general jack-of-all-trades (then), including audits, friction logging, production-ready prototyping, string iteration, content guidance, self-serve documentation."
          />

          <Role
            title="Content lead"
            company="Wealthsimple"
            period="May – Aug 2022"
          />

          <Role
            title="Lead content designer"
            company="Wealthsimple"
            period="2021 – May 2022"
          />

          <Role
            title="Senior content designer"
            company="Shopify"
            period="2020 – 2021"
          />

          <Role
            title="Researcher"
            company="Shopify"
            period="2018 – 2019"
          />

          <Role
            title="Content designer"
            company="Shopify"
            period="2017 – 2019"
          />

          <Role
            title="Customer support agent"
            company="Shopify"
            period="2016 – 2017"
          />

          <Role
            title="Professor"
            company="University of Ottawa"
            period="2014 – 2019"
            description="Associate teacher in speculative fiction and queer cinema."
          />
        </section>

        {/* Education */}
        <section>
          <SectionLabel>education</SectionLabel>

          <Role
            title="PhD, English"
            company="University of Ottawa, Canada"
            period="2019"
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
