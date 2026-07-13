import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://wagyuranch.com"),
  title: {
    default: "WagyuRanch.com — Elite Wagyu Seedstock & Genetics",
    template: "%s · WagyuRanch.com",
  },
  description:
    "A world-class Wagyu seedstock program and field guide to the breed — home of the incomparable Tajimax and one of the largest CSS/EU export-eligible fullblood semen selections anywhere.",
  openGraph: {
    type: "website",
    siteName: "WagyuRanch.com",
    title: "WagyuRanch.com — Elite Wagyu Seedstock & Genetics",
    description:
      "Home of Tajimax. Fullblood Wagyu and Akaushi genetics, and the definitive story of the breed's import history.",
  },
  icons: { icon: "/favicon.svg" },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "WagyuRanch.com",
  url: "https://wagyuranch.com",
  description:
    "Elite Wagyu and Akaushi seedstock producer and educational hub for the breed.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..600&family=Newsreader:ital,opsz,wght@0,6..72,400..600;1,6..72,400..500&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
