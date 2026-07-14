import type { Metadata } from "next";
import CategoryView from "@/components/CategoryView";

export const metadata: Metadata = {
  title: "Embryos",
  description: "Embryos from the WagyuRanch seedstock program — pedigrees, pricing, and export eligibility.",
};

export default function Page() {
  return <CategoryView category="embryo" />;
}
