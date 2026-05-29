"use client";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="text-xs font-mono text-[var(--accent)] hover:text-[var(--accent-warm)] transition-colors print:hidden"
    >
      download pdf ↓
    </button>
  );
}
