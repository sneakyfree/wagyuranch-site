import Link from "next/link";
import type { Item } from "@/lib/api";
import { priceFrom } from "@/lib/api";
import { Emblem } from "@/components/Emblem";

export function BreedChip({ breed }: { breed: string }) {
  const map: Record<string, [string, string]> = {
    black: ["chip-black", "Japanese Black"],
    akaushi: ["chip-akaushi", "Akaushi"],
    polled: ["chip-polled", "Polled"],
  };
  const [cls, label] = map[breed] || ["chip-status", breed];
  return <span className={`chip ${cls}`}>{label}</span>;
}

export function StatusChip({ status }: { status: string }) {
  const label: Record<string, string> = {
    available: "Available", coming_soon: "Coming Soon", sold: "Sold",
    sold_out: "Sold Out", reference: "Reference Sire",
  };
  if (status === "available") return null;
  const cls = status === "sold" || status === "sold_out" ? "chip-sold" : "chip-status";
  return <span className={`chip ${cls}`}>{label[status] || status}</span>;
}

export function Video({ id, title }: { id: string; title?: string }) {
  return (
    <div className="video">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title || "Video"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen loading="lazy"
      />
    </div>
  );
}

type Ped = { name?: string; reg?: string; sire?: Ped; dam?: Ped } | null | undefined;

export function Pedigree({ tree, title = "Pedigree" }: { tree: Ped; title?: string }) {
  if (!tree || (!tree.sire && !tree.dam)) return null;
  const cell = (n: Ped, cls: string) => (
    <div className={`ped-cell ${cls}`}>
      <span className="nm">{n?.name || "—"}</span>
      {n?.reg && <span className="rg">{n.reg}</span>}
    </div>
  );
  const side = (root: Ped, cls: string) => (
    <div className="ped-grid">
      <div className="ped-col">{cell(root, cls)}</div>
      <div className="ped-col">{cell(root?.sire, cls)}{cell(root?.dam, cls)}</div>
      <div className="ped-col">{cell(root?.sire?.sire, cls)}{cell(root?.sire?.dam, cls)}{cell(root?.dam?.sire, cls)}{cell(root?.dam?.dam, cls)}</div>
    </div>
  );
  return (
    <div className="ped">
      <div className="ped-title">{title}</div>
      <div style={{ display: "grid", gap: "10px" }}>
        {tree.sire && side(tree.sire, "sire")}
        {tree.dam && side(tree.dam, "dam")}
      </div>
    </div>
  );
}

export function PriceLadder({ pricing }: { pricing: Item["pricing"] }) {
  if (!pricing?.length) return null;
  return (
    <div className="ladder">
      {pricing.map((p, i) => {
        const exp = /css|export/i.test(p.label);
        const amt = typeof p.price === "number" ? `$${p.price.toLocaleString()}` : "Inquire";
        return (
          <div key={i} className={`ladder-row${exp ? " exp" : ""}`}>
            <span className="l">{p.label}</span>
            <span className="p">{amt}</span>
          </div>
        );
      })}
    </div>
  );
}

/** A lot (embryo/pregnancy) has no individual photo — render a designed sire × dam cross. */
function CrossCard({ item }: { item: Item }) {
  const label = item.category === "embryo" ? `Lot ${item.lot_number || ""}`.trim() : "Pregnancy";
  return (
    <div className={`cross-card ${item.breed}`}>
      <span className="x-tag">{label}</span>
      <span className="x-sire">{item.sire_name || "—"}</span>
      <span className="x-mult">×</span>
      <span className="x-dam">{item.dam_name || "—"}</span>
      <Emblem size={110} className="emblem-wm" />
    </div>
  );
}

export function ItemCard({ item }: { item: Item }) {
  const price = priceFrom(item);
  const photo = item.photos?.[0]?.url;
  const isLot = item.category === "embryo" || item.category === "pregnancy";
  const isRef = item.status === "reference";

  return (
    <div className="card">
      <Link href={`/item/${item.slug}/`}>
        <div className="card-media">
          {photo ? (
            <img src={photo} alt={item.photos[0]?.alt || item.name} />
          ) : isLot ? (
            <CrossCard item={item} />
          ) : (
            <div className="cross-card black">
              <Emblem size={64} style={{ color: "var(--gold-2)", marginBottom: ".6rem" }} />
              <span className="x-sire" style={{ fontSize: "1.25rem" }}>{item.name}</span>
              {item.reg_no && <span className="x-mult" style={{ margin: ".3rem 0 0" }}>{item.reg_no}</span>}
              <Emblem size={110} className="emblem-wm" />
            </div>
          )}
        </div>
        <div className="card-body">
          <div className="chips">
            <BreedChip breed={item.breed} />
            {item.css_status === "css" && <span className="chip chip-css">CSS Export</span>}
            <StatusChip status={item.status} />
          </div>
          <h3>{item.name}</h3>
          {item.reg_no && <div className="card-meta">{item.reg_no}</div>}
          {(item.headline || item.description) && (
            <p className="card-desc">
              {(item.headline || item.description || "").slice(0, 120)}
              {(item.headline || item.description || "").length > 120 ? "…" : ""}
            </p>
          )}
          <div className="card-foot">
            <span className="card-price">{price ? `from ${price}` : isRef ? "Reference sire" : "Inquire"}</span>
            <span className="card-more">View →</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
