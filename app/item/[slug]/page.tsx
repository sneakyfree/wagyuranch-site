import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { itemBySlug, itemSlugs } from "@/lib/inventory";
import { CATEGORY_LABELS } from "@/lib/api";
import { BreedChip, StatusChip, Pedigree, PriceLadder, Video } from "@/components/ui";
import { Emblem } from "@/components/Emblem";
import Gallery from "@/components/Gallery";

const CAT_ROUTE: Record<string, string> = {
  semen: "semen", embryo: "embryos", pregnancy: "pregnancies",
  herd_bull: "herd-bulls", donor: "donors", cattle_for_sale: "cattle",
};
const BREED_LABEL: Record<string, string> = {
  black: "Japanese Black", akaushi: "Akaushi (Japanese Red)", polled: "Polled Fullblood",
};

export function generateStaticParams() {
  return itemSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const it = itemBySlug(slug);
  if (!it) return { title: "Genetics" };
  return { title: `${it.name}${it.reg_no ? ` (${it.reg_no})` : ""}`, description: it.headline || it.description?.slice(0, 150) };
}

export default async function ItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const it = itemBySlug(slug);
  if (!it) notFound();

  const meta = CATEGORY_LABELS[it.category];
  const photos = it.photos || [];
  const attrs = it.attributes || {};
  const related = (attrs.related_photos as any[]) || [];
  // Own photo if we have one; otherwise lead with the sire/dam portrait, clearly captioned.
  const hero = photos[0]?.url || related[0]?.url;
  const heroCaption = photos[0]?.url ? null : (related[0]?.alt || null);
  const stats: [string, string][] = [];
  const A = (k: string, v: any) => { if (v) stats.push([k, String(v)]); };
  A("Frame", attrs.frame);
  A("SCD", attrs.scd);
  A("Carrier", attrs.carrier_status);
  A("Weight", attrs.weight_note && String(attrs.weight_note).length < 16 ? attrs.weight_note : null);
  A("Born", it.birth_date);

  return (
    <>
      <section className="dossier-hero">
        <div className={`wrap dossier-grid${hero ? "" : " solo"}`}>
          <div className="dossier-info">
            <div style={{ fontFamily: "var(--sans)", fontSize: ".74rem", letterSpacing: ".1em", textTransform: "uppercase", color: "#c9bda4", marginBottom: ".9rem" }}>
              <Link href={`/${CAT_ROUTE[it.category]}/`} style={{ color: "#e4d9c2" }}>{meta?.plural}</Link>
            </div>
            <div className="chips" style={{ marginBottom: ".8rem" }}>
              <BreedChip breed={it.breed} />
              {it.css_status === "css" && <span className="chip chip-css">CSS Export</span>}
              <StatusChip status={it.status} />
            </div>
            <h1 style={{ marginBottom: ".2rem" }}>{it.name}</h1>
            {it.reg_no && <div style={{ fontFamily: "var(--sans)", letterSpacing: ".06em", color: "#cbbfa8" }}>{it.reg_no}{it.tattoo ? ` · Tattoo ${it.tattoo}` : ""}</div>}
            {it.headline && <p className="lede" style={{ color: "#ece2d0", marginTop: "1.1rem", maxWidth: "52ch" }}>{it.headline}</p>}
          </div>
          {hero && (
            <figure className="dossier-photo" style={{ margin: 0 }}>
              <div className="dossier-photo-inner"><img src={hero} alt={photos[0]?.alt || heroCaption || it.name} /></div>
              {heroCaption && <figcaption>{heroCaption}</figcaption>}
            </figure>
          )}
        </div>
      </section>

      {stats.length > 0 && (
        <section className="section-sm band">
          <div className="wrap">
            <div className="statrow">
              {stats.map(([k, v]) => (
                <div className="stat" key={k}><div className="k">{k}</div><div className="v">{v}</div></div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap split" style={{ alignItems: "start" }}>
          <div>
            {it.description ? (
              <article className="prose">
                {it.description.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
              </article>
            ) : (
              <p className="lede">{it.headline}</p>
            )}

            {attrs.strain_notes && (
              <div className="notice" style={{ marginTop: "1.5rem" }}><strong>Bloodline · </strong>{attrs.strain_notes}</div>
            )}

            {photos.length > 1 && (
              <div style={{ marginTop: "2.4rem" }}>
                <p className="eyebrow">More of {it.name}</p>
                <Gallery photos={photos.slice(1)} />
              </div>
            )}

            {(() => { const bl = photos[0]?.url ? related : related.slice(1); return bl.length > 0 && (
              <div style={{ marginTop: "2.4rem" }}>
                <p className="eyebrow">The Bloodline</p>
                <div className="grid g2">
                  {bl.map((rp: any, i: number) => (
                    <figure key={i} style={{ margin: 0 }}>
                      <div style={{ borderRadius: "var(--radius)", overflow: "hidden", boxShadow: "var(--shadow-sm)", border: "1px solid var(--line)", background: "linear-gradient(160deg,#efe7d6,#e5d9c2)" }}>
                        <img src={rp.url} alt={rp.alt || ""} style={{ width: "100%", aspectRatio: "3/2", objectFit: "contain" }} />
                      </div>
                      <figcaption style={{ fontFamily: "var(--sans)", fontSize: ".8rem", color: "var(--ink-faint)", marginTop: ".5rem" }}>{rp.alt || rp.subject}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            ); })()}

            {it.video_ids?.length > 0 && (
              <div style={{ marginTop: "2.4rem" }}>
                <p className="eyebrow">Watch</p>
                <div className="grid g2">
                  {it.video_ids.map((v) => <Video key={v} id={v} title={it.name} />)}
                </div>
              </div>
            )}
          </div>

          <aside style={{ position: "sticky", top: "100px" }}>
            {it.pricing?.length > 0 && (
              <>
                <p className="eyebrow">Semen Pricing</p>
                <PriceLadder pricing={it.pricing} />
                {it.price_note && <p style={{ fontSize: ".85rem", color: "var(--ink-faint)", marginTop: ".5rem", fontFamily: "var(--sans)" }}>{it.price_note}</p>}
              </>
            )}

            <div className="facts" style={{ marginTop: it.pricing?.length ? "1.6rem" : 0 }}>
              {it.semen_location && <Fact k="Semen stored at" v={it.semen_location} />}
              {it.css_status !== "unknown" && <Fact k="Export" v={it.css_status === "css" ? "CSS / EU eligible" : "Domestic"} />}
              {it.export_regions?.length > 0 && <Fact k="Ships to" v={it.export_regions.join(", ")} />}
              {it.quantity != null && <Fact k="Available" v={`${it.quantity}${it.category === "embryo" ? " embryos" : ""}`} />}
              {it.embryo_grade && <Fact k="Grade" v={it.embryo_grade} />}
              {it.pregnancy_sex && <Fact k="Sex" v={it.pregnancy_sex} />}
              {it.eu_eligible && <Fact k="EU eligible" v="Yes" />}
            </div>

            <Link href="/contact/" className="btn btn-primary" style={{ marginTop: "1.6rem", width: "100%", justifyContent: "center" }}>
              Inquire about {it.name.length > 22 ? "this listing" : it.name}
            </Link>
          </aside>
        </div>
      </section>

      {it.pedigree && (
        <section className="section band">
          <div className="wrap">
            <p className="eyebrow">Pedigree</p>
            <h2 style={{ marginBottom: "1.6rem" }}>Three generations</h2>
            <Pedigree tree={it.pedigree} title={it.name} />
            <p style={{ marginTop: "1rem", fontFamily: "var(--sans)", fontSize: ".82rem", color: "var(--ink-faint)" }}>
              <Emblem size={16} style={{ display: "inline", verticalAlign: "-3px", color: "var(--gold-deep)", marginRight: ".4rem" }} />
              Registrations verifiable through the American &amp; Australian Wagyu registries.
            </p>
          </div>
        </section>
      )}
    </>
  );
}

function Fact({ k, v }: { k: string; v: string }) {
  return <div className="fact"><span className="k">{k}</span><span className="v">{v}</span></div>;
}
