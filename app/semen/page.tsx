import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Semen",
  description: "Semen from the WagyuRanch seedstock program.",
};

export default function Page() {
  return <CategoryPage category="semen" />;
}
