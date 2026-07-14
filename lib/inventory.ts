import fs from "fs";
import path from "path";
import type { Item } from "@/lib/api";

// Read the build-time baked inventory (written by scripts-fetch-inventory.mjs).
// Everything renders from this — static, fast, never a runtime error.
let _data: { byCategory: Record<string, Item[]>; all: Item[] } | null = null;

function load() {
  if (_data) return _data;
  const file = path.join(process.cwd(), "content", "inventory.json");
  if (fs.existsSync(file)) {
    _data = JSON.parse(fs.readFileSync(file, "utf8"));
  } else {
    _data = { byCategory: {}, all: [] };
  }
  return _data!;
}

export function itemsByCategory(category: string): Item[] {
  return load().byCategory[category] || [];
}

export function allItems(): Item[] {
  return load().all || [];
}

export function itemBySlug(slug: string): Item | null {
  return load().all.find((i) => i.slug === slug) || null;
}

export function itemSlugs(): string[] {
  return load().all.map((i) => i.slug);
}

export function featuredItems(cats: string[], limit: number): Item[] {
  const pool = load().all.filter(
    (i) => cats.includes(i.category) && i.status !== "sold" && i.status !== "sold_out"
  );
  pool.sort((a, b) => Number(b.featured) - Number(a.featured));
  return pool.slice(0, limit);
}
