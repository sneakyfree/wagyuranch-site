import type { Metadata } from "next";
import CategoryView from "@/components/CategoryView";

export const metadata: Metadata = {
  title: "Pregnancies",
  description: "Pregnancies from the WagyuRanch seedstock program — pedigrees, pricing, and export eligibility.",
};

export default function Page() {
  return <CategoryView category="pregnancy" />;
}
