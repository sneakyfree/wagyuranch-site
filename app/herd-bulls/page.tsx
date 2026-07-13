import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Herd Bulls",
  description: "Herd Bulls from the WagyuRanch seedstock program.",
};

export default function Page() {
  return <CategoryPage category="herd_bull" />;
}
