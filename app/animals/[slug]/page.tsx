import fs from "fs";
import path from "path";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDoc, docSlugs } from "@/lib/content";
import { Video, Pedigree } from "@/components/ui";
import Gallery from "@/components/Gallery";
import Reveal from "@/components/Reveal";
import { Emblem } from "@/components/Emblem";

function galleries(): Record<string, { url: string; alt?: string }[]> {
  const f = path.join(process.cwd(), "content", "animal_galleries.json");
  return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, "utf8")) : {};
}

export function generateStaticParams() {
  return docSlugs("animals").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc("animals", slug);
  const name = doc?.data.name || "Animal";
  return { title: `${name}${doc?.data.reg_no ? ` (${doc.data.reg_no})` : ""}`, description: doc?.data.tagline || doc?.data.description };
}

const BREED_LABEL: Record<string, string> = {
  black: "Japanese Black", akaushi: "Akaushi (Japanese Red)", polled: "Polled Fullblood",
};

export default async function AnimalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDoc("animals", slug);
  if (!doc) notFound();
  const d = doc.data;
  const videos: string[] = d.youtube_ids || d.videos || [];
  const hero = d.hero || d.hero_photo;
  const heroUrl = hero ? (hero.startsWith("/") ? hero : `/img/${hero}`) : null;
  const gallery = (galleries()[slug] || []).filter((g) => g.url !== heroUrl);

  // Pull the pedigree JSON out of the markdown → render it as a visual tree,
  // and strip the raw code block (and its heading) from the prose.
  let pedigree: any = null;
  const pm = doc.raw.match(/```json\s*([\s\S]*?)```/);
  if (pm) { try { pedigree = JSON.parse(pm[1]); } catch { pedigree = null; } }
  const html = doc.html
    .replace(/<pre[\s\S]*?<\/pre>/g, "")
    .replace(/<h2[^>]*>\s*Pedigree\s*<\/h2>/gi, "");

  const stats: [string, string][] = [];
  const A = (k: string, v: any) => { if (v != null && v !== "") stats.push([k, String(v)]); };
  A("Reg", d.reg_no);
  A("Frame", d.frame_score);
  A("SCD", d.scd);
  A("Carrier", d.carrier_status);
  A("Born", d.birth_date);

  return (
    <>
      <section className="dossier-hero">
        <div className={`wrap dossier-grid${heroUrl ? "" : " solo"}`}>
          <div className="dossier-info">
            <p className="eyebrow" style={{ color: "var(--gold-2)" }}>{BREED_LABEL[d.breed] || "Fullblood Wagyu"}</p>
            <h1 style={{ marginBottom: ".2rem" }}>{d.name}</h1>
            {d.reg_no && <div style={{ fontFamily: "var(--sans)", letterSpacing: ".06em", color: "#cbbfa8" }}>{d.reg_no}</div>}
            {d.tagline && <p className="lede" style={{ color: "#ece2d0", marginTop: "1.1rem", maxWidth: "50ch" }}>{d.tagline}</p>}
          </div>
          {heroUrl && (
            <figure className="dossier-photo" style={{ margin: 0 }}>
              <div className="dossier-photo-inner"><img src={heroUrl} alt={d.name} /></div>
            </figure>
          )}
        </div>
      </section>

      {stats.length > 0 && (
        <section className="section-sm band">
          <div className="wrap">
            <div className="statrow">
              {stats.map(([k, v]) => <div className="stat" key={k}><div className="k">{k}</div><div className="v">{v}</div></div>)}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="narrow">
          <Reveal><article className="prose" dangerouslySetInnerHTML={{ __html: html }} /></Reveal>
        </div>
      </section>

      {pedigree && (
        <section className="section band">
          <Reveal className="wrap">
            <p className="eyebrow">Pedigree</p>
            <h2 style={{ marginBottom: "1.6rem" }}>{d.name} — three generations</h2>
            <Pedigree tree={pedigree} title={d.name} />
            <p style={{ marginTop: "1rem", fontFamily: "var(--sans)", fontSize: ".82rem", color: "var(--ink-faint)" }}>
              <Emblem size={16} style={{ display: "inline", verticalAlign: "-3px", color: "var(--gold-deep)", marginRight: ".4rem" }} />
              Registrations verifiable through the American &amp; Australian Wagyu registries.
            </p>
          </Reveal>
        </section>
      )}

      {gallery.length > 0 && (
        <section className="section band">
          <div className="wrap">
            <p className="eyebrow">Gallery</p>
            <h2 style={{ marginBottom: "1.6rem" }}>{d.name} in photographs</h2>
            <Gallery photos={gallery} />
          </div>
        </section>
      )}

      {videos.length > 0 && (
        <section className="section">
          <div className="wrap">
            <p className="eyebrow center">Watch</p>
            <h2 className="center" style={{ marginBottom: "2rem" }}>{d.name} on video</h2>
            <div className="grid g2">{videos.map((v) => <Video key={v} id={v} title={d.name} />)}</div>
          </div>
        </section>
      )}

      <section className="section band-forest center">
        <div className="narrow">
          <p className="lede" style={{ color: "#e4ebdc" }}>Interested in {d.name} genetics?</p>
          <Link href="/contact/" className="btn btn-gold" style={{ marginTop: ".8rem" }}>Contact the ranch</Link>
        </div>
      </section>
    </>
  );
}
