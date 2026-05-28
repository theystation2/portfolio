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
