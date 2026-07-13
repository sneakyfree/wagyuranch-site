export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://api.wagyuranch.com";

export type Item = {
  id: number;
  category: string;
  subtype?: string | null;
  name: string;
  slug: string;
  reg_no?: string | null;
  tattoo?: string | null;
  breed: string;
  birth_date?: string | null;
  headline?: string | null;
  description?: string | null;
  pedigree?: any;
  sire_name?: string | null;
  sire_reg?: string | null;
  dam_name?: string | null;
  dam_reg?: string | null;
  attributes?: Record<string, any>;
  css_status: string;
  export_regions: string[];
  pricing: { label: string; price: number; currency?: string }[];
  price_note?: string | null;
  currency: string;
  semen_location?: string | null;
  quantity?: number | null;
  straws_per_unit?: number | null;
  embryo_grade?: string | null;
  embryo_sex?: string | null;
  eu_eligible?: boolean;
  lot_number?: string | null;
  private_treaty?: boolean;
  pregnancy_sex?: string | null;
  photos: { url: string; alt?: string; caption?: string }[];
  video_ids: string[];
  status: string;
  featured: boolean;
  published?: boolean;
  sort_order?: number;
  wagyutank_listing_id?: number | null;
};

export const CATEGORY_LABELS: Record<string, { label: string; plural: string; blurb: string }> = {
  semen: { label: "Semen", plural: "Semen", blurb: "Straws from breed-changing sires — domestic and CSS/EU export-eligible." },
  embryo: { label: "Embryos", plural: "Embryos", blurb: "Elite fullblood and EU-eligible embryos by lot." },
  pregnancy: { label: "Pregnancies", plural: "Pregnancies", blurb: "Calve out DNA-verified fullblood Wagyu on your own ranch this year." },
  herd_bull: { label: "Herd Bulls", plural: "Herd Bulls", blurb: "The working sires behind the program." },
  donor: { label: "Donors", plural: "Donor Dams", blurb: "The elite females at the heart of the herd." },
  cattle_for_sale: { label: "Cattle for Sale", plural: "Cattle for Sale", blurb: "Fullblood and F1 bulls, heifers, cows and feeders." },
};

async function get<T>(path: string): Promise<T> {
  const r = await fetch(`${API_BASE}${path}`, { cache: "no-store" });
  if (!r.ok) throw new Error(`API ${path} -> ${r.status}`);
  return r.json();
}

export const api = {
  inventory: (category?: string) =>
    get<Item[]>(`/api/inventory${category ? `?category=${category}` : ""}`),
  item: (slug: string) => get<Item>(`/api/inventory/${slug}`),
  categories: () => get<Record<string, number>>(`/api/categories`),
  config: () => get<any>(`/api/config`),
};

export function priceFrom(item: Item): string | null {
  if (!item.pricing?.length) return null;
  const min = Math.min(...item.pricing.map((p) => p.price).filter((n) => typeof n === "number"));
  if (!isFinite(min)) return null;
  return `$${min.toLocaleString()}`;
}
