"use client";
import { useState } from "react";

export default function Gallery({ photos }: { photos: { url: string; alt?: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  if (!photos?.length) return null;
  return (
    <>
      <div className="gallery">
        {photos.map((p, i) => (
          <a key={i} href={p.url} onClick={(e) => { e.preventDefault(); setOpen(i); }}>
            <img src={p.url} alt={p.alt || ""} loading="lazy" />
          </a>
        ))}
      </div>
      {open !== null && (
        <div
          onClick={() => setOpen(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(16,12,8,.92)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "4vh 4vw", cursor: "zoom-out" }}
        >
          <img src={photos[open].url} alt={photos[open].alt || ""} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: 4, boxShadow: "0 20px 80px rgba(0,0,0,.6)" }} />
          {photos.length > 1 && (
            <div style={{ position: "absolute", bottom: 24, left: 0, right: 0, textAlign: "center", color: "#cbbfa8", fontFamily: "var(--sans)", fontSize: ".8rem", letterSpacing: ".1em" }}>
              {open + 1} / {photos.length}
            </div>
          )}
        </div>
      )}
    </>
  );
}
