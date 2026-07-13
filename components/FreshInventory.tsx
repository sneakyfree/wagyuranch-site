"use client";
import { useEffect, useState } from "react";
import { api, type Item } from "@/lib/api";
import { ItemCard } from "@/components/ui";

export default function FreshInventory() {
  const [items, setItems] = useState<Item[] | null>(null);

  useEffect(() => {
    Promise.all([api.inventory("semen"), api.inventory("embryo")])
      .then(([a, b]) => {
        const merged = [...a, ...b]
          .filter((i) => i.status !== "sold" && i.status !== "sold_out")
          .sort((x, y) => Number(y.featured) - Number(x.featured))
          .slice(0, 4);
        setItems(merged);
      })
      .catch(() => setItems([]));
  }, []);

  if (!items || items.length === 0) return null;

  return (
    <section className="section">
      <div className="wrap">
        <p className="eyebrow center">Available Now</p>
        <h2 className="center" style={{ marginBottom: "2rem" }}>Fresh from the tank</h2>
        <div className="grid grid-4">
          {items.map((i) => (
            <ItemCard key={i.id} item={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
