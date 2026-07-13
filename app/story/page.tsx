import Link from "next/link";
import type { Metadata } from "next";
import { getDocs } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Wagyu Story",
  description:
    "What Wagyu really means, the strains of the breed, and the first-person story of how Wagyu and Akaushi cattle reached America.",
};

export default function StoryHub() {
  const docs = getDocs("education");
  return (
    <>
      <section className="hero" style={{ background: "var(--ink)" }}>
        <div className="hero-media">
          <img src="/img/b956282c799218fe61c82d2cc53dd0b8.jpg" alt="Wagyu cattle" />
        </div>
        <div className="wrap hero-inner" style={{ padding: "6rem 0" }}>
          <p className="eyebrow" style={{ color: "var(--gold-soft)" }}>A field guide to the breed</p>
          <h1>The Wagyu Story</h1>
          <p className="lede" style={{ color: "#e7ddcc" }}>
            Where Wagyu came from, what the strains mean, and how the breed reached America —
            told with the record and the firsthand memory kept carefully apart.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow">
          <div className="grid" style={{ gap: "1.4rem" }}>
            {docs.map((d) => (
              <Link key={d.slug} href={`/story/${d.slug}/`} className="card" style={{ display: "block" }}>
                <div className="card-body" style={{ padding: "1.4rem 1.6rem" }}>
                  <h3 style={{ marginBottom: ".3rem" }}>{d.data.title || d.slug}</h3>
                  {d.data.description && (
                    <p style={{ margin: 0, color: "var(--ink-soft)" }}>{d.data.description}</p>
                  )}
                  <div style={{ marginTop: ".7rem", fontFamily: "var(--sans)", fontSize: ".74rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--oxblood)" }}>
                    Read →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
