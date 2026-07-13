import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Cattle for Sale",
  description: "Cattle for Sale from the WagyuRanch seedstock program.",
};

export default function Page() {
  return <CategoryPage category="cattle_for_sale" />;
}
