import Link from "next/link";
import { featuredItems, itemsByCategory } from "@/lib/inventory";
import { ItemCard } from "@/components/ui";
import { Emblem } from "@/components/Emblem";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import ParallaxHero from "@/components/ParallaxHero";

const HERO = "/img/656fa51f1a0c2be674514484dac0f035.jpg";

const HERO_ANIMALS = [
  { slug: "kenhanafuji", name: "Kenhanafuji", tag: "FB2461", blurb: "The International Bull of Mystery — Kedaka × Shimane, zero Tajima.", img: "/img/foundation/FB2461.jpg" },
  { slug: "big-al", name: "Big Al", tag: "FB2998", blurb: "The first fullblood Akaushi born outside Japan.", img: "/img/big-al-prime.jpg" },
];

const FOUNDATION = [
  { reg: "FB1615", name: "Michifuku", role: "First import · 1993" },
  { reg: "FB103", name: "Mazda", role: "Tottori" },
  { reg: "FB2461", name: "Kenhanafuji", role: "Fujiyoshi × Kedaka" },
  { reg: "FB104", name: "Mt Fuji", role: "Original import" },
  { reg: "FB2126", name: "Itomichi ½", role: "Shimane" },
  { reg: "FB2100", name: "Kikuyasu 400", role: "Tajima" },
  { reg: "FB6538", name: "Shigefuku J1822", role: "Marbling" },
  { reg: "FB2101", name: "Fukutsuru 068", role: "#1 marbling sire" },
];

const CATEGORIES = [
  { href: "/semen/", label: "Semen", blurb: "Domestic & CSS/EU export-eligible straws." },
  { href: "/embryos/", label: "Embryos", blurb: "Elite fullblood & EU-eligible lots." },
  { href: "/donors/", label: "Donors", blurb: "The elite females behind the herd." },
  { href: "/cattle/", label: "Cattle for Sale", blurb: "Fullblood & F1 bulls, heifers, cows." },
];

export default function Home() {
  const fresh = featuredItems(["semen", "embryo"], 4);
  const semenCount = itemsByCategory("semen").length;

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <ParallaxHero src={HERO} alt="A fullblood Wagyu on pasture at WagyuRanch" />
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
        <div className="scroll-cue"><span>Scroll</span><span className="line" /></div>
      </section>

      {/* Animated stat band */}
      <section className="band-ink">
        <div className="statband">
          <div className="cell"><div className="big"><CountUp to={semenCount} suffix="+" /></div><div className="cap">Elite sires in the tank</div></div>
          <div className="cell"><div className="big"><CountUp to={30} suffix="+ yrs" /></div><div className="cap">With the breed</div></div>
          <div className="cell"><div className="big"><CountUp to={62.5} decimals={1} suffix="%" /></div><div className="cap">Tajima in Tajimax</div></div>
          <div className="cell"><div className="big"><CountUp to={100} suffix="%" /></div><div className="cap">Fullblood · DNA-verified</div></div>
        </div>
      </section>

      {/* Positioning */}
      <section className="section-sm band">
        <div className="wrap center">
          <Reveal>
            <p className="kicker" style={{ justifyContent: "center" }}>Two herds, one standard</p>
            <p className="lede measure mx-auto" style={{ marginTop: "1.1rem" }}>
              A no-holds-barred, high-marbling terminal-sire program and a balanced maternal ×
              growth program — bred together to move the breed forward without compromise.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Tajimax spotlight */}
      <section className="section">
        <div className="wrap">
          <Reveal className="spotlight">
            <div className="spotlight-img">
              <span className="spotlight-badge">The flagship</span>
              <img src="/img/foundation/FB16684.jpg" alt="Tajimax (FB16684)" />
            </div>
            <div>
              <div className="sec-num" style={{ marginBottom: "1rem" }}><span className="n">01</span></div>
              <p className="eyebrow">Home of Tajimax · FB16684</p>
              <h2>The largest-framed high-Tajima fullblood outside Japan.</h2>
              <p style={{ color: "var(--ink-soft)", maxWidth: "48ch" }}>
                2,200+ lbs, frame score 9, SCD carrier-free, and at least 62.5% Tajima — a bull
                that lets you inject extreme frame, growth and high-marbling Tajima blood without
                sacrificing Tajima percentage. Used heavily around the world.
              </p>
              <Link href="/animals/tajimax/" className="btn btn-primary" style={{ marginTop: "1.2rem" }}>Meet Tajimax</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Hero animals */}
      <section className="section band">
        <div className="wrap">
          <Reveal className="sec-head center">
            <p className="eyebrow">Meet the Animals</p>
            <h2>Bloodlines with a story</h2>
          </Reveal>
          <div className="grid g2" style={{ maxWidth: 820, margin: "0 auto" }}>
            {HERO_ANIMALS.map((a, i) => (
              <Reveal key={a.slug} delay={i * 90} className="card">
                <Link href={`/animals/${a.slug}/`}>
                  <div className="card-media"><img src={a.img} alt={a.name} /></div>
                  <div className="card-body">
                    <h3>{a.name}</h3>
                    <div className="card-meta">{a.tag}</div>
                    <p className="card-desc">{a.blurb}</p>
                    <div className="card-foot"><span className="card-more">Full profile →</span></div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Story teaser with Ken quote */}
      <section className="section band-ink">
        <div className="wrap split">
          <Reveal>
            <div className="sec-num" style={{ marginBottom: "1rem" }}><span className="n" style={{ color: "var(--gold-2)" }}>02</span></div>
            <p className="eyebrow" style={{ color: "var(--gold-2)" }}>The reason breeders come here</p>
            <h2>The story of the breed, told by someone who was there.</h2>
            <p style={{ color: "#e2d8c7", maxWidth: "48ch" }}>
              How the first Wagyu and Akaushi cattle left Japan and reached America — preserved
              in full, in the words of Ken Kurosawatsu, son of the man who selected the original
              Akaushi out of Kumamoto.
            </p>
            <Link href="/story/import-history/" className="btn btn-gold" style={{ marginTop: "1.4rem" }}>
              Read the import history
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <blockquote style={{ fontFamily: "var(--display)", fontSize: "clamp(1.4rem,2.6vw,1.9rem)", fontStyle: "italic", lineHeight: 1.4, color: "#f0e6d3", borderLeft: "3px solid var(--gold)", paddingLeft: "1.4rem", margin: 0 }}>
              "Let's get the story straight once and for all."
              <span style={{ display: "block", fontFamily: "var(--sans)", fontStyle: "normal", fontSize: ".8rem", letterSpacing: ".14em", textTransform: "uppercase", color: "#b7ab93", marginTop: "1.2rem" }}>
                — Ken Kurosawatsu, Wagyu Sekai Inc.
              </span>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Foundation bloodlines showcase */}
      <section className="section">
        <div className="wrap">
          <Reveal className="sec-head center">
            <p className="eyebrow">The Genetic Foundation</p>
            <h2>The import bulls behind every straw</h2>
            <p className="lede measure mx-auto" style={{ fontSize: "1.1rem", marginTop: ".6rem" }}>
              Every animal in the program traces to the legendary sires that left Japan in the
              1990s. These are the bloodlines you're building on.
            </p>
          </Reveal>
          <Reveal className="found-rail" delay={80}>
            {FOUNDATION.map((f) => (
              <div className="found-item" key={f.reg}>
                <div className="found-portrait"><img src={`/img/foundation/${f.reg}.jpg`} alt={f.name} /></div>
                <div className="found-name">{f.name}</div>
                <div className="found-role">{f.role}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Fresh genetics */}
      {fresh.length > 0 && (
        <section className="section band">
          <div className="wrap">
            <Reveal className="sec-head center">
              <p className="eyebrow">Available Now</p>
              <h2>Fresh from the tank</h2>
            </Reveal>
            <div className="grid g4">
              {fresh.map((i, idx) => <Reveal key={i.id} delay={idx * 80}><ItemCard item={i} /></Reveal>)}
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="section">
        <div className="wrap">
          <Reveal className="sec-head center">
            <p className="eyebrow">Genetics for Sale</p>
            <h2>Buy from the program</h2>
          </Reveal>
          <div className="grid g4">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.href} delay={i * 70}>
                <Link href={c.href} className="card" style={{ display: "block", height: "100%" }}>
                  <div className="card-body" style={{ padding: "1.7rem 1.5rem" }}>
                    <h3 style={{ fontSize: "1.4rem" }}>{c.label}</h3>
                    <p className="card-desc">{c.blurb}</p>
                    <div className="card-foot"><span className="card-more">View →</span></div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust band */}
      <section className="section band-forest">
        <div className="wrap center">
          <Reveal>
            <Emblem size={64} style={{ color: "var(--gold-2)", margin: "0 auto 1.4rem" }} />
            <h2 style={{ maxWidth: "20ch", margin: "0 auto .6rem" }}>Export-eligible genetics, verified pedigrees, straight from the breeder.</h2>
            <p className="measure mx-auto" style={{ color: "#d3dbcb" }}>
              Every straw and embryo is documented with full pedigree and CSS/EU export status,
              stored at leading facilities, and backed by a breeder who has spent a lifetime with
              these bloodlines.
            </p>
            <Link href="/contact/" className="btn btn-gold" style={{ marginTop: "1.6rem" }}>Talk to the ranch</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
