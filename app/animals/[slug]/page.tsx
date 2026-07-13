import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDoc, docSlugs } from "@/lib/content";
import { Video } from "@/components/ui";

export function generateStaticParams() {
  return docSlugs("animals").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc("animals", slug);
  const name = doc?.data.name || "Animal";
  return {
    title: `${name}${doc?.data.reg_no ? ` (${doc.data.reg_no})` : ""}`,
    description: doc?.data.tagline || doc?.data.description,
  };
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

  return (
    <>
      <section className="hero" style={{ background: "var(--ink)" }}>
        {hero && (
          <div className="hero-media">
            <img src={hero.startsWith("/") ? hero : `/img/${hero}`} alt={d.name} />
          </div>
        )}
        <div className="wrap hero-inner" style={{ padding: "5.5rem 0" }}>
          <p className="eyebrow" style={{ color: "var(--gold-soft)" }}>
            {BREED_LABEL[d.breed] || "Fullblood Wagyu"}
          </p>
          <h1 style={{ marginBottom: ".2rem" }}>{d.name}</h1>
          {d.reg_no && <div style={{ fontFamily: "var(--sans)", letterSpacing: ".08em", color: "#cdbfa8" }}>{d.reg_no}</div>}
          {d.tagline && <p className="lede" style={{ color: "#e7ddcc", marginTop: "1rem" }}>{d.tagline}</p>}
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow">
          <article className="prose" dangerouslySetInnerHTML={{ __html: doc.html }} />
        </div>
      </section>

      {videos.length > 0 && (
        <section className="section band">
          <div className="wrap">
            <p className="eyebrow center">Watch</p>
            <h2 className="center" style={{ marginBottom: "2rem" }}>{d.name} on video</h2>
            <div className="grid grid-2">
              {videos.map((v) => <Video key={v} id={v} title={d.name} />)}
            </div>
          </div>
        </section>
      )}

      <section className="section-tight center">
        <div className="wrap narrow">
          <p className="lede">Interested in {d.name} genetics?</p>
          <Link href="/contact/" className="btn btn-primary" style={{ marginTop: ".5rem" }}>Contact the ranch</Link>
        </div>
      </section>
    </>
  );
}
