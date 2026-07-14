import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDoc, docSlugs } from "@/lib/content";
import { Emblem } from "@/components/Emblem";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return docSlugs("education").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc("education", slug);
  return { title: doc?.data.title || "The Wagyu Story", description: doc?.data.description };
}

export default async function StoryDoc({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDoc("education", slug);
  if (!doc) notFound();
  const isHistory = slug === "import-history";

  return (
    <>
      <section className="hero hero-tall" style={{ background: "var(--ink)" }}>
        <div className="hero-media">
          <img src="/img/b956282c799218fe61c82d2cc53dd0b8.jpg" alt="" />
        </div>
        <div className="wrap hero-inner" style={{ paddingBottom: "clamp(3rem,7vw,5rem)" }}>
          <div style={{ fontFamily: "var(--sans)", fontSize: ".74rem", letterSpacing: ".14em", textTransform: "uppercase", color: "#c9bda4", marginBottom: "1rem" }}>
            <Link href="/story/" style={{ color: "#e4d9c2" }}>The Wagyu Story</Link>
          </div>
          <h1 className="rise" style={{ maxWidth: "20ch" }}>{doc.data.title}</h1>
          {doc.data.description && <p className="lede rise rise-2" style={{ color: "#ece2d0", maxWidth: "62ch" }}>{doc.data.description}</p>}
        </div>
      </section>

      {isHistory && (
        <section className="section-sm band">
          <div className="wrap narrow">
            <Reveal style={{ display: "flex", gap: "1.1rem", alignItems: "flex-start" }}>
              <Emblem size={40} style={{ color: "var(--gold-deep)", flex: "none", marginTop: ".2rem" }} />
              <p style={{ margin: 0, fontFamily: "var(--sans)", fontSize: ".95rem", color: "var(--ink-soft)", lineHeight: 1.6 }}>
                <strong style={{ color: "var(--ink)" }}>A primary source.</strong> The account below is
                preserved in full and unedited — testimony from a family that was present when Wagyu
                and Akaushi left Japan. It is meant to still be here a hundred years from now.
              </p>
            </Reveal>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap narrow">
          <Reveal>
            <article className="prose longform" dangerouslySetInnerHTML={{ __html: doc.html }} />
          </Reveal>
          <div className="ornament" style={{ margin: "3rem auto 2rem" }}><Emblem size={26} /></div>
          <div className="center">
            <Link href="/story/" className="btn btn-ghost">← All chapters</Link>
          </div>
        </div>
      </section>
    </>
  );
}
