import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Embryos",
  description: "Embryos from the WagyuRanch seedstock program.",
};

export default function Page() {
  return <CategoryPage category="embryo" />;
}
