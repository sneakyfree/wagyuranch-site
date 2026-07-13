import Link from "next/link";
import FreshInventory from "@/components/FreshInventory";

const HERO = "/img/656fa51f1a0c2be674514484dac0f035.jpg";

const HERO_ANIMALS = [
  { slug: "tajimax", name: "Tajimax", tag: "FB16684", blurb: "The largest framed high-Tajima fullblood outside Japan.", img: "/img/00c511cb22e497c1ef45c65e2c05b9c8.jpg" },
  { slug: "kenhanafuji", name: "Kenhanafuji", tag: "FB2461", blurb: "The International Bull of Mystery — 100% Kedaka × Shimane, zero Tajima.", img: "/img/9a79d8dbc914e62a8eb60a3d2707002a.jpg" },
  { slug: "big-al", name: "Big Al", tag: "FB2998", blurb: "The first fullblood Akaushi born outside Japan.", img: "/img/2218db1b2374f0e2d75c9d64041361de.jpg" },
];

const CATEGORIES = [
  { href: "/semen/", label: "Semen", blurb: "Domestic & CSS/EU export-eligible straws." },
  { href: "/embryos/", label: "Embryos", blurb: "Elite fullblood & EU-eligible lots." },
  { href: "/pregnancies/", label: "Pregnancies", blurb: "Calve out fullbloods on your ranch." },
  { href: "/cattle/", label: "Cattle for Sale", blurb: "Fullblood & F1 bulls, heifers, cows." },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-media">
          <img src={HERO} alt="A fullblood Wagyu on pasture at WagyuRanch" />
        </div>
        <div className="wrap hero-inner">
          <p className="eyebrow">Elite Wagyu Genetics</p>
          <h1>The King of Beef, documented.</h1>
          <p className="lede">
            A world-class seedstock program and the definitive field guide to the Wagyu
            breed — home of the incomparable <strong style={{ color: "#f2e7d4" }}>Tajimax</strong>,
            and one of the largest CSS/EU export-eligible fullblood semen selections anywhere.
          </p>
          <div className="hero-cta">
            <Link href="/story/" className="btn btn-gold">Read the Wagyu story</Link>
            <Link href="/semen/" className="btn btn-ghost" style={{ color: "#f2e7d4", borderColor: "#f2e7d4" }}>
              Browse genetics
            </Link>
          </div>
        </div>
      </section>

      {/* Positioning line */}
      <section className="section-tight band">
        <div className="wrap center">
          <p className="kicker-rule">Home of Tajimax</p>
          <p className="lede measure" style={{ margin: "1rem auto 0" }}>
            Two herds, one standard: a no-holds-barred high-marbling terminal-sire program,
            and a balanced maternal × growth program — both bred to move the breed forward.
          </p>
        </div>
      </section>

      {/* Hero animals */}
      <section className="section">
        <div className="wrap">
          <p className="eyebrow center">Meet the Animals</p>
          <h2 className="center" style={{ marginBottom: "2rem" }}>Bloodlines with a story</h2>
          <div className="grid grid-3">
            {HERO_ANIMALS.map((a) => (
              <div className="card" key={a.slug}>
                <Link href={`/animals/${a.slug}/`}>
                  <div className="card-media"><img src={a.img} alt={a.name} /></div>
                  <div className="card-body">
                    <h3>{a.name}</h3>
                    <div className="card-meta">{a.tag}</div>
                    <p style={{ margin: ".5rem 0 0", fontSize: ".95rem", color: "var(--ink-soft)" }}>{a.blurb}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story teaser */}
      <section className="section band-ink">
        <div className="wrap grid grid-2" style={{ alignItems: "center", gap: "3rem" }}>
          <div>
            <p className="eyebrow" style={{ color: "var(--gold-soft)" }}>The real goal</p>
            <h2>The story of the breed, told by someone who was there.</h2>
            <p style={{ color: "#e2d8c7", maxWidth: "46ch" }}>
              How the first Wagyu and Akaushi cattle left Japan and reached America — the
              1993 shipments, the quarantines, the lawsuits, the legends. A first-person
              account, carefully separated into what the record documents and what the
              breeders remember.
            </p>
            <Link href="/story/import-history/" className="btn btn-gold" style={{ marginTop: "1rem" }}>
              The import history
            </Link>
          </div>
          <div>
            <img
              src="/img/b77ae7f9fa37ab51f90a23370be8899f.jpg"
              alt="Wagyu cattle on pasture"
              style={{ borderRadius: "var(--radius)", boxShadow: "var(--shadow)" }}
            />
          </div>
        </div>
      </section>

      {/* Fresh inventory (live) */}
      <FreshInventory />

      {/* Category entries */}
      <section className="section band">
        <div className="wrap">
          <p className="eyebrow center">Genetics for Sale</p>
          <h2 className="center" style={{ marginBottom: "2rem" }}>Buy from the program</h2>
          <div className="grid grid-4">
            {CATEGORIES.map((c) => (
              <Link key={c.href} href={c.href} className="card" style={{ display: "block" }}>
                <div className="card-body">
                  <h3 style={{ fontSize: "1.3rem" }}>{c.label}</h3>
                  <p style={{ margin: ".4rem 0 0", fontSize: ".92rem", color: "var(--ink-soft)" }}>{c.blurb}</p>
                  <div style={{ marginTop: ".8rem", fontFamily: "var(--sans)", fontSize: ".74rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--oxblood)" }}>
                    View →
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
