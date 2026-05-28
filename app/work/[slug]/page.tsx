import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
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
          className="text-sm text-[var(--accent)] hover:underline mb-6 inline-block"
        >
          &larr; Back
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
          {project.title}
        </h1>
        <div className="flex gap-4 mt-3 text-sm text-[var(--muted)]">
          <span>{project.role}</span>
          <span>&middot;</span>
          <span>{project.year}</span>
        </div>
      </header>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-8">
          <p className="text-[var(--muted)] leading-relaxed">
            {project.content || project.description}
          </p>
          <p className="mt-6 text-sm text-[var(--muted)] italic">
            Full case study content coming soon.
          </p>
        </div>
      </main>
    </div>
  );
}
