"use client";

import { useState, useEffect } from "react";

interface Props {
  slug: string;
  onBack: () => void;
}

export function TransitCaseStudy({ slug, onBack }: Props) {
  const [html, setHtml] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/work/${slug}`)
      .then((res) => res.text())
      .then((text) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");
        const main = doc.querySelector("main") || doc.querySelector(".flex.flex-col.flex-1");
        if (main) {
          main.querySelectorAll("a[href='/']").forEach((el) => el.remove());
          main.querySelectorAll("[class*='pt-16']").forEach((el) => {
            el.classList.remove("pt-16");
            el.classList.add("pt-4");
          });
          setHtml(main.innerHTML);
        } else {
          setHtml(doc.body.innerHTML);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  return (
    <div className="transit-case-study">
      <button onClick={onBack} className="transit-case-study-back">
        ← Retour à l&apos;arrêt
      </button>
      {loading && (
        <div className="transit-case-study-loading">
          <div className="transit-case-study-spinner" />
          <span>Chargement...</span>
        </div>
      )}
      {!loading && html && (
        <div
          className="transit-case-study-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </div>
  );
}
