"use client";
import Link from "next/link";
import { useState } from "react";

const LINKS = [
  { href: "/story/", label: "The Wagyu Story" },
  { href: "/semen/", label: "Semen" },
  { href: "/herd-bulls/", label: "Herd Bulls" },
  { href: "/donors/", label: "Donors" },
  { href: "/embryos/", label: "Embryos" },
  { href: "/pregnancies/", label: "Pregnancies" },
  { href: "/cattle/", label: "Cattle" },
  { href: "/bull-lease/", label: "Bull Lease" },
  { href: "/about/", label: "About" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="wrap bar">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          WagyuRanch<span className="dot">.</span><small>com</small>
        </Link>
        <button className="menu-btn" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          ☰
        </button>
        <nav className={`nav${open ? " open" : ""}`}>
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/contact/" className="cta" onClick={() => setOpen(false)}>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
