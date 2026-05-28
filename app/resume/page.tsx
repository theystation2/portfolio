import Link from "next/link";

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
      </header>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-8">
          <p className="text-xs font-mono text-[var(--muted)] opacity-50">
            // content coming soon
          </p>
        </div>
      </main>
    </div>
  );
}
