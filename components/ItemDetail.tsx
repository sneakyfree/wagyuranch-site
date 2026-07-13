"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { api, type Item, CATEGORY_LABELS } from "@/lib/api";
import { BreedTag, StatusTag, Video, Pedigree, PriceLadder } from "@/components/ui";

export default function ItemDetail() {
  const params = useSearchParams();
  const slug = params.get("slug") || "";
  const [item, setItem] = useState<Item | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    if (!slug) return;
    api.item(slug).then(setItem).catch(() => setErr(true));
  }, [slug]);

  if (err) return <div className="wrap section"><div className="notice">This item could not be found. <Link href="/semen/">Browse genetics →</Link></div></div>;
  if (!item) return <div className="wrap section" style={{ color: "var(--ink-faint)" }}>Loading…</div>;

  const catMeta = CATEGORY_LABELS[item.category];
  const photo = item.photos?.[0]?.url;
  const attrs = item.attributes || {};

  return (
    <>
      <section className="section-tight band">
        <div className="wrap">
          <div style={{ fontFamily: "var(--sans)", fontSize: ".75rem", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: ".6rem" }}>
            <Link href={`/${item.category === "semen" ? "semen" : item.category === "embryo" ? "embryos" : item.category === "herd_bull" ? "herd-bulls" : item.category === "donor" ? "donors" : item.category === "pregnancy" ? "pregnancies" : "cattle"}/`}>
              {catMeta?.plural}
            </Link>
          </div>
          <div style={{ display: "flex", gap: ".5rem", marginBottom: ".6rem", flexWrap: "wrap" }}>
            <BreedTag breed={item.breed} />
            {item.css_status === "css" && <span className="tag tag-css">CSS Export</span>}
            <StatusTag status={item.status} />
          </div>
          <h1 style={{ marginBottom: ".2rem" }}>{item.name}</h1>
          {item.reg_no && <div className="card-meta" style={{ fontSize: ".95rem" }}>{item.reg_no}{item.tattoo ? ` · Tattoo ${item.tattoo}` : ""}</div>}
          {item.headline && <p className="lede" style={{ marginTop: ".8rem", maxWidth: "60ch" }}>{item.headline}</p>}
        </div>
      </section>

      <section className="section">
        <div className="wrap grid" style={{ gridTemplateColumns: "1.3fr 1fr", gap: "2.5rem", alignItems: "start" }}>
          <div>
            {photo && <img src={photo} alt={item.photos[0]?.alt || item.name} style={{ borderRadius: "var(--radius)", boxShadow: "var(--shadow)", width: "100%" }} />}
            {item.description && (
              <div className="prose" style={{ marginTop: "1.6rem", maxWidth: "none" }}>
                {item.description.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
              </div>
            )}
            {item.video_ids?.length > 0 && (
              <div style={{ marginTop: "2rem" }}>
                <p className="eyebrow">Watch</p>
                <div className="grid grid-2">
                  {item.video_ids.map((v) => <Video key={v} id={v} title={item.name} />)}
                </div>
              </div>
            )}
          </div>

          <aside>
            {item.pricing?.length > 0 && (
              <>
                <p className="eyebrow">Pricing</p>
                <PriceLadder pricing={item.pricing} />
                {item.price_note && <p style={{ fontSize: ".85rem", color: "var(--ink-faint)", marginTop: ".5rem" }}>{item.price_note}</p>}
              </>
            )}

            <div style={{ marginTop: "1.5rem" }}>
              {item.semen_location && <FactRow k="Semen stored at" v={item.semen_location} />}
              {item.css_status && item.css_status !== "unknown" && <FactRow k="Export status" v={item.css_status === "css" ? "CSS / EU eligible" : "Domestic"} />}
              {item.export_regions?.length > 0 && <FactRow k="Export to" v={item.export_regions.join(", ")} />}
              {item.birth_date && <FactRow k="Born" v={item.birth_date} />}
              {item.straws_per_unit && <FactRow k="Straws / unit" v={String(item.straws_per_unit)} />}
              {item.quantity != null && <FactRow k="Available" v={String(item.quantity)} />}
              {item.embryo_grade && <FactRow k="Grade" v={item.embryo_grade} />}
              {item.embryo_sex && <FactRow k="Sex" v={item.embryo_sex} />}
              {item.eu_eligible && <FactRow k="EU eligible" v="Yes" />}
              {Object.entries(attrs).map(([k, v]) =>
                v ? <FactRow key={k} k={k.replace(/_/g, " ")} v={String(v)} /> : null
              )}
            </div>

            <Link href="/contact/" className="btn btn-primary" style={{ marginTop: "1.5rem", width: "100%", textAlign: "center" }}>
              Inquire about {item.name}
            </Link>
          </aside>
        </div>
      </section>

      {item.pedigree && (
        <section className="section band">
          <div className="wrap">
            <p className="eyebrow">Pedigree</p>
            <h2 style={{ marginBottom: "1.2rem" }}>{item.name} — three generations</h2>
            <Pedigree tree={item.pedigree} />
          </div>
        </section>
      )}
    </>
  );
}

function FactRow({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", padding: ".5rem 0", borderBottom: "1px solid var(--line-soft)", fontFamily: "var(--sans)", fontSize: ".88rem" }}>
      <span style={{ color: "var(--ink-faint)", textTransform: "capitalize" }}>{k}</span>
      <span style={{ color: "var(--ink)", fontWeight: 500, textAlign: "right" }}>{v}</span>
    </div>
  );
}
