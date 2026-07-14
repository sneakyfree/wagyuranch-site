"use client";
import { useMemo, useState } from "react";
import type { Item } from "@/lib/api";
import { ItemCard } from "@/components/ui";
import Reveal from "@/components/Reveal";

const BREEDS = [
  { key: "all", label: "All" },
  { key: "black", label: "Japanese Black" },
  { key: "akaushi", label: "Akaushi" },
  { key: "polled", label: "Polled" },
];

export default function CategoryGrid({ items, showFilters = true }: { items: Item[]; showFilters?: boolean }) {
  const [breed, setBreed] = useState("all");
  const [cssOnly, setCssOnly] = useState(false);

  const breedsPresent = useMemo(() => new Set(items.map((i) => i.breed)), [items]);
  const hasCss = useMemo(() => items.some((i) => i.css_status === "css"), [items]);

  const filtered = items.filter(
    (i) => (breed === "all" || i.breed === breed) && (!cssOnly || i.css_status === "css")
  );

  const canFilter = showFilters && items.length > 3 && (breedsPresent.size > 1 || hasCss);

  return (
    <>
      {canFilter && (
        <div className="filters">
          {BREEDS.filter((b) => b.key === "all" || breedsPresent.has(b.key)).map((b) => (
            <button key={b.key} className={`filter-chip${breed === b.key ? " active" : ""}`} onClick={() => setBreed(b.key)}>
              {b.label}
            </button>
          ))}
          {hasCss && (
            <button className={`filter-chip${cssOnly ? " active" : ""}`} onClick={() => setCssOnly((v) => !v)}>
              CSS / EU Export
            </button>
          )}
        </div>
      )}

      <p className="card-meta" style={{ marginBottom: "1.4rem" }}>{filtered.length} listed</p>

      {filtered.length === 0 ? (
        <div className="notice">No matches — try a different filter.</div>
      ) : (
        <div className="grid g3">
          {filtered.map((i, idx) => (
            <Reveal key={i.id} delay={Math.min(idx, 6) * 60}><ItemCard item={i} /></Reveal>
          ))}
        </div>
      )}
    </>
  );
}
