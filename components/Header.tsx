"use client";
import Link from "next/link";
import { useState } from "react";
import { Emblem } from "@/components/Emblem";

const LINKS = [
  { href: "/story/", label: "The Story" },
  { href: "/semen/", label: "Semen" },
  { href: "/herd-bulls/", label: "Herd Bulls" },
  { href: "/donors/", label: "Donors" },
  { href: "/embryos/", label: "Embryos" },
  { href: "/pregnancies/", label: "Pregnancies" },
  { href: "/cattle/", label: "Cattle" },
  { href: "/bull-lease/", label: "Bull Lease" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="utility">
        <div className="wide">
          <div className="u-left">
            <span>Elite Wagyu &amp; Akaushi Seedstock</span>
            <span>Home of Tajimax · FB16684</span>
          </div>
          <div>
            <a href="tel:+18012599358">801·259·9358</a>
            <span style={{ opacity: .4, margin: "0 .7rem" }}>|</span>
            <a href="mailto:office@wagyuranch.com">office@wagyuranch.com</a>
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="wrap bar">
          <Link href="/" className="brand-lock" onClick={() => setOpen(false)}>
            <Emblem size={50} className="emblem" />
            <span className="brand-word">
              <span className="name">Wagyu Ranch</span>
              <span className="sub">Elite Seedstock</span>
            </span>
          </Link>
          <button className="menu-btn" onClick={() => setOpen((o) => !o)} aria-label="Menu">☰</button>
          <nav className={`nav${open ? " open" : ""}`}>
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
            ))}
            <Link href="/contact/" className="cta" onClick={() => setOpen(false)}>Inquire</Link>
          </nav>
        </div>
      </header>
    </>
  );
}
