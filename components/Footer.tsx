import Link from "next/link";
import { Emblem } from "@/components/Emblem";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap foot-top">
        <div className="foot-brand">
          <Emblem size={58} className="emblem" />
          <p>
            A seedstock program and field guide to the Wagyu breed — home of the
            incomparable Tajimax and one of the largest CSS/EU export-eligible fullblood
            genetics selections anywhere.
          </p>
        </div>
        <div>
          <h4>The Breed</h4>
          <ul>
            <li><Link href="/story/">The Wagyu Story</Link></li>
            <li><Link href="/story/import-history/">Import History</Link></li>
            <li><Link href="/story/what-wagyu-means/">What Wagyu Means</Link></li>
            <li><Link href="/animals/tajimax/">Tajimax</Link></li>
            <li><Link href="/animals/kenhanafuji/">Kenhanafuji</Link></li>
          </ul>
        </div>
        <div>
          <h4>Genetics</h4>
          <ul>
            <li><Link href="/semen/">Semen</Link></li>
            <li><Link href="/embryos/">Embryos</Link></li>
            <li><Link href="/pregnancies/">Pregnancies</Link></li>
            <li><Link href="/cattle/">Cattle for Sale</Link></li>
            <li><Link href="/bull-lease/">Bull Lease</Link></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href="tel:+18012599358">801·259·9358</a></li>
            <li><a href="mailto:office@wagyuranch.com">office@wagyuranch.com</a></li>
            <li><Link href="/contact/">Send a message</Link></li>
            <li><Link href="/about/">About the ranch</Link></li>
          </ul>
        </div>
      </div>
      <div className="wrap foot-bottom">
        <span>© {new Date().getFullYear()} WagyuRanch.com · All rights reserved.</span>
        <span>Wagyu: The King of Beef.</span>
      </div>
    </footer>
  );
}
