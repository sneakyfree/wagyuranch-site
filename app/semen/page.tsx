import type { Metadata } from "next";
import CategoryView from "@/components/CategoryView";

export const metadata: Metadata = {
  title: "Semen",
  description: "Semen from the WagyuRanch seedstock program — pedigrees, pricing, and export eligibility.",
};

export default function Page() {
  return <CategoryView category="semen" />;
}
