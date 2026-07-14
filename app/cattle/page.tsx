import type { Metadata } from "next";
import CategoryView from "@/components/CategoryView";

export const metadata: Metadata = {
  title: "Cattle for Sale",
  description: "Cattle for Sale from the WagyuRanch seedstock program — pedigrees, pricing, and export eligibility.",
};

export default function Page() {
  return <CategoryView category="cattle_for_sale" />;
}
