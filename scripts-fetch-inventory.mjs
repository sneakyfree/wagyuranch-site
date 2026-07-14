// Prebuild: pull all inventory from the API and bake it into content/inventory.json
// so every page renders real content as static HTML — no runtime fetch, no error states.
import fs from "fs";

const API = process.env.NEXT_PUBLIC_API_BASE || "https://api.wagyuranch.com";
const CATS = ["semen", "embryo", "pregnancy", "herd_bull", "donor", "cattle_for_sale"];

async function main() {
  const byCategory = {};
  const all = [];
  for (const c of CATS) {
    try {
      const r = await fetch(`${API}/api/inventory?category=${c}`);
      const items = r.ok ? await r.json() : [];
      byCategory[c] = items;
      all.push(...items);
    } catch (e) {
      console.warn(`inventory bake: ${c} failed (${e.message}) — using empty`);
      byCategory[c] = [];
    }
  }
  fs.mkdirSync("content", { recursive: true });
  fs.writeFileSync("content/inventory.json", JSON.stringify({ byCategory, all }, null, 2));
  console.log(`inventory baked: ${all.length} items across ${CATS.length} categories`);
}
main();
