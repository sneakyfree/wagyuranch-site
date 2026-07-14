import Link from "next/link";
import { featuredItems } from "@/lib/inventory";
import { ItemCard } from "@/components/ui";
import { Emblem } from "@/components/Emblem";

const HERO = "/img/656fa51f1a0c2be674514484dac0f035.jpg";

const HERO_ANIMALS = [
  { slug: "tajimax", name: "Tajimax", tag: "FB16684", blurb: "The largest-framed high-Tajima fullblood outside Japan.", img: "/img/tajimax-on-cows.jpg" },
  { slug: "kenhanafuji", name: "Kenhanafuji", tag: "FB2461", blurb: "The International Bull of Mystery — Kedaka × Shimane, zero Tajima.", img: "/img/kitaguni-jr-5-8-brother.jpg" },
  { slug: "big-al", name: "Big Al", tag: "FB2998", blurb: "The first fullblood Akaushi born outside Japan.", img: "/img/big-al-prime.jpg" },
];

const CATEGORIES = [
  { href: "/semen/", label: "Semen", blurb: "Domestic & CSS/EU export-eligible straws." },
  { href: "/embryos/", label: "Embryos", blurb: "Elite fullblood & EU-eligible lots." },
  { href: "/pregnancies/", label: "Pregnancies", blurb: "Calve out fullbloods on your ranch." },
  { href: "/cattle/", label: "Cattle for Sale", blurb: "Fullblood & F1 bulls, heifers, cows." },
];

export default function Home() {
  const fresh = featuredItems(["semen", "embryo"], 4);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-media"><img src={HERO} alt="A fullblood Wagyu on pasture at WagyuRanch" /></div>
        <div className="wrap hero-inner">
          <p className="eyebrow rise">Elite Wagyu &amp; Akaushi Genetics</p>
          <h1 className="rise rise-2">The King of Beef, documented.</h1>
          <p className="lede rise rise-3">
            A world-class seedstock program and the definitive field guide to the Wagyu
            breed — home of the incomparable <strong style={{ color: "#f2e7d4", fontWeight: 500 }}>Tajimax</strong>,
            and one of the largest CSS/EU export-eligible fullblood selections anywhere.
          </p>
          <div className="hero-cta rise rise-3">
            <Link href="/story/" className="btn btn-gold">Read the Wagyu story</Link>
            <Link href="/semen/" className="btn btn-light">Browse genetics</Link>
          </div>
        </div>
      </section>

      {/* Positioning */}
      <section className="section-sm band">
        <div className="wrap center">
          <p className="kicker" style={{ justifyContent: "center" }}>Two herds, one standard</p>
          <p className="lede measure mx-auto" style={{ marginTop: "1.1rem" }}>
            A no-holds-barred, high-marbling terminal-sire program and a balanced maternal ×
            growth program — bred together to move the breed forward without compromise.
          </p>
        </div>
      </section>

      {/* Hero animals */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head center">
            <p className="eyebrow">Meet the Animals</p>
            <h2>Bloodlines with a story</h2>
          </div>
          <div className="grid g3">
            {HERO_ANIMALS.map((a) => (
              <div className="card" key={a.slug}>
                <Link href={`/animals/${a.slug}/`}>
                  <div className="card-media"><img src={a.img} alt={a.name} /></div>
                  <div className="card-body">
                    <h3>{a.name}</h3>
                    <div className="card-meta">{a.tag}</div>
                    <p className="card-desc">{a.blurb}</p>
                    <div className="card-foot"><span className="card-more">Full profile →</span></div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story split */}
      <section className="section band-ink">
        <div className="wrap split">
          <div>
            <p className="eyebrow" style={{ color: "var(--gold-2)" }}>The real reason breeders come here</p>
            <h2>The story of the breed, told by someone who was there.</h2>
            <p style={{ color: "#e2d8c7", maxWidth: "48ch" }}>
              How the first Wagyu and Akaushi cattle left Japan and reached America — the
              1993 shipments, the quarantines, the lawsuits, the legends. A first-person
              account, carefully separated into what the record documents and what the
              breeders remember.
            </p>
            <Link href="/story/import-history/" className="btn btn-gold" style={{ marginTop: "1.4rem" }}>
              Read the import history
            </Link>
          </div>
          <div className="split-img frame-gold">
            <img src="/img/b77ae7f9fa37ab51f90a23370be8899f.jpg" alt="Wagyu cattle on pasture" />
          </div>
        </div>
      </section>

      {/* Fresh genetics */}
      {fresh.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="sec-head center">
              <p className="eyebrow">Available Now</p>
              <h2>Fresh from the tank</h2>
            </div>
            <div className="grid g4">
              {fresh.map((i) => <ItemCard key={i.id} item={i} />)}
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="section band">
        <div className="wrap">
          <div className="sec-head center">
            <p className="eyebrow">Genetics for Sale</p>
            <h2>Buy from the program</h2>
          </div>
          <div className="grid g4">
            {CATEGORIES.map((c) => (
              <Link key={c.href} href={c.href} className="card" style={{ padding: 0 }}>
                <div className="card-body" style={{ padding: "1.6rem 1.4rem" }}>
                  <h3 style={{ fontSize: "1.4rem" }}>{c.label}</h3>
                  <p className="card-desc">{c.blurb}</p>
                  <div className="card-foot"><span className="card-more">View →</span></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust band */}
      <section className="section band-forest">
        <div className="wrap center">
          <Emblem size={64} style={{ color: "var(--gold-2)", margin: "0 auto 1.4rem" }} />
          <h2 style={{ maxWidth: "20ch", margin: "0 auto .6rem" }}>Export-eligible genetics, verified pedigrees, straight from the breeder.</h2>
          <p className="measure mx-auto" style={{ color: "#d3dbcb" }}>
            Every straw and embryo is documented with full pedigree and CSS/EU export status,
            stored at leading facilities, and backed by a breeder who has spent a lifetime with
            these bloodlines.
          </p>
          <Link href="/contact/" className="btn btn-gold" style={{ marginTop: "1.6rem" }}>Talk to the ranch</Link>
        </div>
      </section>
    </>
  );
}
