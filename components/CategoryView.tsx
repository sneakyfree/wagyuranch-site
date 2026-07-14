import { itemsByCategory } from "@/lib/inventory";
import { CATEGORY_LABELS } from "@/lib/api";
import { ItemCard } from "@/components/ui";

const HERO_IMG: Record<string, string> = {
  semen: "/img/b956282c799218fe61c82d2cc53dd0b8.jpg",
  embryo: "/img/b77ae7f9fa37ab51f90a23370be8899f.jpg",
  pregnancy: "/img/656fa51f1a0c2be674514484dac0f035.jpg",
  herd_bull: "/img/02e687328d7592716c5b39e4a081bcef.jpg",
  donor: "/img/1a841561f3ee26b4dea954e2d6a4a860.jpg",
  cattle_for_sale: "/img/9a79d8dbc914e62a8eb60a3d2707002a.jpg",
};

export default function CategoryView({ category }: { category: string }) {
  const meta = CATEGORY_LABELS[category];
  const items = itemsByCategory(category).filter((i) => i.published !== false);
  const hero = HERO_IMG[category];

  return (
    <>
      <section className="hero hero-tall">
        {hero && <div className="hero-media"><img src={hero} alt={meta?.plural} /></div>}
        <div className="wrap hero-inner">
          <p className="eyebrow rise">Genetics for Sale</p>
          <h1 className="rise rise-2">{meta?.plural}</h1>
          <p className="lede rise rise-3">{meta?.blurb}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          {items.length === 0 ? (
            <div className="notice mx-auto" style={{ maxWidth: 640 }}>
              Nothing is listed here at the moment — new {meta?.label.toLowerCase()} is added
              regularly. <a href="/contact/">Reach out</a> and we'll tell you what's coming.
            </div>
          ) : (
            <>
              <p className="card-meta" style={{ marginBottom: "1.4rem" }}>{items.length} listed</p>
              <div className="grid g3">
                {items.map((i) => <ItemCard key={i.id} item={i} />)}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
