import { Suspense } from "react";
import ItemDetail from "@/components/ItemDetail";

export const metadata = { title: "Genetics" };

export default function Page() {
  return (
    <Suspense fallback={<div className="wrap section">Loading…</div>}>
      <ItemDetail />
    </Suspense>
  );
}
