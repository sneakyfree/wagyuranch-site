import Link from "next/link";
import type { Item } from "@/lib/api";
import { priceFrom } from "@/lib/api";

export function BreedTag({ breed }: { breed: string }) {
  const map: Record<string, [string, string]> = {
    black: ["tag-black", "Japanese Black"],
    akaushi: ["tag-akaushi", "Akaushi"],
    polled: ["tag-polled", "Polled"],
  };
  const [cls, label] = map[breed] || ["tag-status", breed];
  return <span className={`tag ${cls}`}>{label}</span>;
}

export function StatusTag({ status }: { status: string }) {
  const label: Record<string, string> = {
    available: "Available",
    coming_soon: "Coming Soon",
    sold: "Sold",
    sold_out: "Sold Out",
    reference: "Reference Sire",
  };
  const cls = status === "sold" || status === "sold_out" ? "tag-sold" : "tag-status";
  return <span className={`tag ${cls}`}>{label[status] || status}</span>;
}

export function Video({ id, title }: { id: string; title?: string }) {
  return (
    <div className="video-embed">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title || "Video"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}

type Ped = { name?: string; reg?: string; sire?: Ped; dam?: Ped } | null | undefined;

/** Flatten a nested pedigree tree into a 3-generation grid (sire block over dam block). */
export function Pedigree({ tree }: { tree: Ped }) {
  if (!tree || (!tree.sire && !tree.dam)) return null;
  const cell = (n: Ped, cls: string) =>
    n ? (
      <div className={`pedigree-cell ${cls}`}>
        <span className="nm">{n.name || "—"}</span>
        {n.reg && <span className="rg">{n.reg}</span>}
      </div>
    ) : (
      <div className={`pedigree-cell ${cls}`}>
        <span className="nm" style={{ color: "var(--ink-faint)" }}>—</span>
      </div>
    );

  const side = (root: Ped, cls: string) => (
    <div className="pedigree-row" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
      {cell(root, cls)}
      <div style={{ display: "grid" }}>
        {cell(root?.sire, cls)}
        {cell(root?.dam, cls)}
      </div>
      <div style={{ display: "grid" }}>
        {cell(root?.sire?.sire, cls)}
        {cell(root?.sire?.dam, cls)}
        {cell(root?.dam?.sire, cls)}
        {cell(root?.dam?.dam, cls)}
      </div>
    </div>
  );

  return (
    <div className="pedigree">
      {side(tree.sire, "sire")}
      {side(tree.dam, "dam")}
    </div>
  );
}

export function PriceLadder({ pricing }: { pricing: Item["pricing"] }) {
  if (!pricing?.length) return null;
  return (
    <div className="priceladder">
      {pricing.map((p, i) => {
        const isCss = /css|export/i.test(p.label);
        return (
          <div key={i} className={`priceladder-row${isCss ? " css" : ""}`}>
            <span className="lbl">{p.label}</span>
            <span className="amt">${p.price.toLocaleString()}</span>
          </div>
        );
      })}
    </div>
  );
}

export function ItemCard({ item }: { item: Item }) {
  const price = priceFrom(item);
  const photo = item.photos?.[0]?.url;
  return (
    <div className="card">
      <Link href={`/item/${item.slug}/`}>
        <div className="card-media">
          {photo ? (
            <img src={photo} alt={item.photos[0]?.alt || item.name} />
          ) : (
            <div
              style={{
                width: "100%", height: "100%", display: "flex",
                alignItems: "center", justifyContent: "center",
                fontFamily: "var(--display)", color: "var(--ink-faint)",
                background: "var(--paper-3)", fontSize: "1.1rem",
              }}
            >
              {item.name}
            </div>
          )}
        </div>
        <div className="card-body">
          <div style={{ display: "flex", gap: ".4rem", marginBottom: ".5rem", flexWrap: "wrap" }}>
            <BreedTag breed={item.breed} />
            {item.css_status === "css" && <span className="tag tag-css">CSS Export</span>}
            {(item.status === "sold" || item.status === "sold_out") && <StatusTag status={item.status} />}
          </div>
          <h3>{item.name}</h3>
          {item.reg_no && <div className="card-meta">{item.reg_no}</div>}
          {item.headline && (
            <p style={{ margin: ".5rem 0 0", fontSize: ".95rem", color: "var(--ink-soft)" }}>
              {item.headline}
            </p>
          )}
          {price && (
            <div style={{ marginTop: ".7rem", fontFamily: "var(--display)", color: "var(--oxblood)", fontWeight: 600 }}>
              from {price}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
