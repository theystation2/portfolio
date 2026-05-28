import Link from "next/link";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <header className="w-full max-w-3xl mx-auto px-6 pt-16 pb-12">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">
          Jack Horton
        </h1>
        <p className="mt-3 text-lg text-[var(--muted)] max-w-xl leading-relaxed">
          Content designer building clarity into complex systems. Currently at
          Stripe, working on billing, developer tools, and operational
          automation.
        </p>
        <div className="flex gap-4 mt-5 text-sm">
          <a
            href="mailto:jack@stripe.com"
            className="text-[var(--accent)] hover:underline"
          >
            Email
          </a>
          <a
            href="https://linkedin.com/in/jackhorton"
            className="text-[var(--accent)] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </header>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <h2 className="text-xs font-medium uppercase tracking-widest text-[var(--muted)] mb-6">
          Selected work
        </h2>
        <div className="flex flex-col gap-4">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="block bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 hover:border-[var(--accent)] hover:shadow-sm transition-all group"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--muted)] leading-relaxed">
                    {project.description}
                  </p>
                  {project.tags.length > 0 && (
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-md bg-[var(--background)] text-[var(--muted)] border border-[var(--border)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-xs text-[var(--muted)] whitespace-nowrap shrink-0 pt-0.5">
                  {project.year}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="mt-auto py-8 text-center text-xs text-[var(--muted)]">
        Built with Next.js
      </footer>
    </div>
  );
}
