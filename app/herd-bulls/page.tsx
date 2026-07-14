import type { Metadata } from "next";
import CategoryView from "@/components/CategoryView";

export const metadata: Metadata = {
  title: "Herd Bulls",
  description: "Herd Bulls from the WagyuRanch seedstock program — pedigrees, pricing, and export eligibility.",
};

export default function Page() {
  return <CategoryView category="herd_bull" />;
}
