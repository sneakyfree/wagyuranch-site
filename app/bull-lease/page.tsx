import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bull Lease",
  description:
    "Lease a soundness-tested Wagyu bull anywhere in the USA — low birth-weight cross calves, and we buy back the offspring at a premium.",
};

export default function BullLease() {
  return (
    <>
      <section className="section-tight band">
        <div className="wrap">
          <p className="eyebrow">Services</p>
          <h1>Bull Lease Program</h1>
          <p className="lede measure">
            Put Wagyu on your cows without buying a bull — and let us take the calves back.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow prose">
          <p>
            Our bull-lease program is built for dairies and commercial beef operations that want
            Wagyu-cross calves without the cost and hassle of owning a herd sire. We deliver a
            soundness-tested Wagyu bull anywhere in the United States, and we work with the largest
            feedlot buyers of Wagyu-cross calves in the country.
          </p>
          <ul>
            <li>Cross calves are typically born <strong>20–40% lighter</strong> at birth — easier calving on your cows.</li>
            <li>On feed, Wagyu-cross calves grade <strong>90–100% Prime</strong> over 1,500 lb.</li>
            <li>We <strong>buy back all resulting offspring at a premium</strong>.</li>
          </ul>
          <p>
            It's a low-risk way to add marbling and value to your calf crop. Call or email to talk
            through your herd and timing.
          </p>
        </div>
        <div className="wrap narrow center" style={{ marginTop: "1.5rem" }}>
          <Link href="/contact/" className="btn btn-primary">Ask about a lease</Link>
        </div>
      </section>
    </>
  );
}
