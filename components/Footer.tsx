import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <h4>WagyuRanch.com</h4>
          <p style={{ maxWidth: "36ch", color: "#c3b9a7" }}>
            A seedstock program and field guide to the Wagyu breed — home of the
            incomparable Tajimax and one of the largest CSS/EU export-eligible fullblood
            semen selections anywhere.
          </p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li><Link href="/story/">The Wagyu Story</Link></li>
            <li><Link href="/story/import-history/">Import History</Link></li>
            <li><Link href="/animals/tajimax/">Tajimax</Link></li>
            <li><Link href="/animals/kenhanafuji/">Kenhanafuji</Link></li>
            <li><Link href="/bull-lease/">Bull Lease</Link></li>
          </ul>
        </div>
        <div>
          <h4>Genetics</h4>
          <ul>
            <li><Link href="/semen/">Semen</Link></li>
            <li><Link href="/embryos/">Embryos</Link></li>
            <li><Link href="/pregnancies/">Pregnancies</Link></li>
            <li><Link href="/cattle/">Cattle for Sale</Link></li>
            <li><Link href="/contact/">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} WagyuRanch.com · All rights reserved.</span>
        <span>Wagyu: The King of Beef.</span>
      </div>
    </footer>
  );
}
