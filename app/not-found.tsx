import Link from "next/link";
import { Emblem } from "@/components/Emblem";

export default function NotFound() {
  return (
    <section className="section center" style={{ minHeight: "60vh", display: "flex", alignItems: "center" }}>
      <div className="wrap">
        <Emblem size={72} style={{ color: "var(--oxblood)", margin: "0 auto 1.6rem" }} />
        <p className="eyebrow">Off the trail</p>
        <h1 style={{ marginBottom: ".4rem" }}>This page has drifted.</h1>
        <p className="lede measure mx-auto">
          The page you're looking for isn't here — but the herd is close by.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "1.6rem", flexWrap: "wrap" }}>
          <Link href="/" className="btn btn-primary">Back to the ranch</Link>
          <Link href="/semen/" className="btn btn-ghost">Browse genetics</Link>
        </div>
      </div>
    </section>
  );
}
