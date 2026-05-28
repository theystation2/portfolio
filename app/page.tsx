import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";

function SchemaLine({ k, v }: { k: string; v: string }) {
  return (
    <span className="font-mono text-xs text-[var(--muted)] leading-relaxed">
      <span className="text-[var(--accent)] opacity-60">{k}:</span>{" "}
      <span className="text-[var(--foreground)] opacity-80">{v}</span>
    </span>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <header className="w-full max-w-3xl mx-auto px-6 pt-20 pb-16">
        <div className="flex items-start justify-between gap-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-[var(--gradient-from)] via-[var(--gradient-via)] to-[var(--gradient-to)] bg-clip-text text-transparent">
              Jack Horton
            </h1>
            <p className="mt-4 text-lg text-[var(--foreground)] opacity-90 max-w-lg leading-relaxed">
              Content designer. 10+ years. Based in Montreal.
            </p>
            <p className="mt-2 text-sm text-[var(--muted)] max-w-lg leading-relaxed">
              Currently at Stripe, working on billing, developer tools, and
              operational automation. Building for a future where users are
              sometimes human and sometimes machine.
            </p>
          </div>
          <div className="hidden sm:flex flex-col gap-1 pt-2 shrink-0 text-right">
            <SchemaLine k="role" v="content designer" />
            <SchemaLine k="org" v="stripe" />
            <SchemaLine k="focus" v="[billing, devtools, ops]" />
            <SchemaLine k="status" v="employed / available" />
          </div>
        </div>
        <div className="flex gap-4 mt-6 text-sm">
          <a
            href="mailto:jackphorton@proton.me"
            className="text-[var(--accent)] hover:text-[var(--accent-warm)] transition-colors"
          >
            email
          </a>
          <span className="text-[var(--border)]">/</span>
          <a
            href="https://www.linkedin.com/in/jack-horton-84a285140/"
            className="text-[var(--accent)] hover:text-[var(--accent-warm)] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin
          </a>
          <span className="text-[var(--border)]">/</span>
          <a
            href="/resume"
            className="text-[var(--accent)] hover:text-[var(--accent-warm)] transition-colors"
          >
            resume
          </a>
        </div>
      </header>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--muted)]">
              about
            </h2>
            <div className="flex-1 h-px bg-[var(--border)]" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-x-8 gap-y-6">
            <div className="flex flex-col gap-1.5">
              <div className="block"><SchemaLine k="experience" v="10+ years" /></div>
              <div className="block"><SchemaLine k="location" v="montreal" /></div>
              <div className="block"><SchemaLine k="education" v="phd, english literature" /></div>
              <div className="block mt-2"><SchemaLine k="passions" v="animals, literacy" /></div>
              <div className="block"><SchemaLine k="why_good" v="i genuinely, genuinely care" /></div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-mono text-[var(--muted)] opacity-60">
                what my colleagues think of me:
              </span>
              <Image
                src="/colleagues.jpg"
                alt="AI-generated claymation portrait surrounded by cats in hats"
                width={180}
                height={180}
                className="rounded-xl border border-[var(--border)] shadow-lg"
              />
            </div>
          </div>
        </section>

        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--muted)]">
            selected_work
          </h2>
          <div className="flex-1 h-px bg-[var(--border)]" />
          <span className="text-xs font-mono text-[var(--muted)] opacity-50">
            {projects.length} entries
          </span>
        </div>
        <div className="flex flex-col gap-4">
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="block bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 hover:border-[var(--accent)] hover:shadow-[0_0_20px_rgba(167,139,250,0.08)] transition-all group relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 font-mono text-[10px] text-[var(--muted)] opacity-40 group-hover:opacity-70 transition-opacity">
                [{String(i).padStart(2, "0")}]
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-3 mt-4">
                    {project.tags.length > 0 && (
                      <div className="flex gap-1.5 flex-wrap">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[var(--tag-bg)] text-[var(--tag-text)] border border-[var(--border)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[var(--border)]">
                <SchemaLine k="role" v={project.role} />
                <span className="text-[var(--border)]">·</span>
                <SchemaLine k="year" v={project.year} />
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="mt-auto py-10 text-center">
        <p className="text-xs font-mono text-[var(--muted)] opacity-40">
          human_readable: true · machine_readable: true
        </p>
      </footer>
    </div>
  );
}
