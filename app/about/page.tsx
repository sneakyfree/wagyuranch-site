import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "WagyuRanch.com is a seedstock program dedicated to improving and promoting the Wagyu breed worldwide.",
};

export default function About() {
  return (
    <>
      <section className="section-tight band">
        <div className="wrap">
          <p className="eyebrow">About</p>
          <h1>Dedicated to the breed</h1>
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow">
          <div className="prose">
            <p>
              WagyuRanch.com is dedicated to improving and promoting Wagyu cattle around the
              world. From the beginning the program developed two distinct herds at once: a
              no-holds-barred, high-marbling terminal-sire herd, and a more balanced herd built
              on maternal traits and growth — bred together to move the breed forward without
              compromise.
            </p>
            <p>
              We are the home of the incomparable <Link href="/animals/tajimax/">Tajimax</Link>,
              and carry one of the largest CSS/EU export-eligible fullblood Wagyu semen
              selections available anywhere — alongside elite embryos, DNA-verified pregnancies,
              and fullblood and F1 cattle.
            </p>
            <p>
              Just as important as the genetics is the record. WagyuRanch has always been a place
              to <em>learn</em> about the breed — its strains, its history, and the remarkable
              story of how Wagyu and Akaushi cattle first reached America. That story lives on in
              <Link href="/story/"> The Wagyu Story</Link>.
            </p>
          </div>
          <div className="pullquote">
            <p>"Wagyu: The King of Beef."</p>
            <cite>WagyuRanch.com</cite>
          </div>
          <div className="center">
            <Link href="/contact/" className="btn btn-primary">Contact the ranch</Link>
          </div>
        </div>
      </section>
    </>
  );
}
