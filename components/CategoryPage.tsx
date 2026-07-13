"use client";
import { useEffect, useState } from "react";
import { api, type Item, CATEGORY_LABELS } from "@/lib/api";
import { ItemCard } from "@/components/ui";

export default function CategoryPage({ category }: { category: string }) {
  const [items, setItems] = useState<Item[] | null>(null);
  const [err, setErr] = useState(false);
  const meta = CATEGORY_LABELS[category];

  useEffect(() => {
    api.inventory(category).then(setItems).catch(() => setErr(true));
  }, [category]);

  return (
    <>
      <section className="section-tight band">
        <div className="wrap">
          <p className="eyebrow">{meta?.label}</p>
          <h1 style={{ marginBottom: ".3rem" }}>{meta?.plural}</h1>
          <p className="lede measure">{meta?.blurb}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          {err && (
            <div className="notice">Inventory is briefly unavailable — please check back shortly or contact us directly.</div>
          )}
          {!items && !err && <p style={{ color: "var(--ink-faint)" }}>Loading…</p>}
          {items && items.length === 0 && (
            <div className="notice">
              Nothing listed here at the moment. New {meta?.label.toLowerCase()} is added regularly —
              or reach out and we'll tell you what's coming.
            </div>
          )}
          {items && items.length > 0 && (
            <div className="grid grid-3">
              {items.map((i) => (
                <ItemCard key={i.id} item={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
