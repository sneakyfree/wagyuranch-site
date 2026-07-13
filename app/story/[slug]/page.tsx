import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDoc, docSlugs } from "@/lib/content";

export function generateStaticParams() {
  return docSlugs("education").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc("education", slug);
  return {
    title: doc?.data.title || "The Wagyu Story",
    description: doc?.data.description,
  };
}

export default async function StoryDoc({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDoc("education", slug);
  if (!doc) notFound();

  return (
    <>
      <section className="section-tight band">
        <div className="wrap narrow">
          <div style={{ fontFamily: "var(--sans)", fontSize: ".75rem", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: ".6rem" }}>
            <Link href="/story/">The Wagyu Story</Link>
          </div>
          <h1>{doc.data.title}</h1>
          {doc.data.description && <p className="lede">{doc.data.description}</p>}
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow">
          <article className="prose" dangerouslySetInnerHTML={{ __html: doc.html }} />
          <hr className="rule" style={{ margin: "3rem 0 1.5rem" }} />
          <Link href="/story/" className="btn btn-ghost">← All chapters</Link>
        </div>
      </section>
    </>
  );
}
