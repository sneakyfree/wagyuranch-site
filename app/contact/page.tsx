import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach WagyuRanch.com about semen, embryos, pregnancies, cattle, and bull leases.",
};

export default function Contact() {
  return (
    <>
      <section className="section-tight band">
        <div className="wrap">
          <p className="eyebrow">Get in touch</p>
          <h1>Contact the ranch</h1>
          <p className="lede measure">
            Questions on genetics, pricing, export eligibility, or a bull lease? Reach out —
            we answer every serious inquiry.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid grid-2" style={{ gap: "3rem", alignItems: "start" }}>
          <div>
            <h3>Grant Whitmer</h3>
            <p style={{ color: "var(--ink-soft)" }}>
              Owner, WagyuRanch.com
            </p>
            <div style={{ marginTop: "1.2rem", fontFamily: "var(--sans)", fontSize: ".95rem", lineHeight: 2 }}>
              <div><strong>Email</strong> · <a href="mailto:office@wagyuranch.com">office@wagyuranch.com</a></div>
              <div><strong>Phone / Text</strong> · <a href="tel:+18012599358">801-259-9358</a></div>
            </div>
            <div className="notice" style={{ marginTop: "1.6rem" }}>
              To order semen or embryos, email with the bull (or dam × sire) and quantity you
              want and we'll send a quick quote.
            </div>
          </div>

          <form
            action="mailto:office@wagyuranch.com"
            method="post"
            encType="text/plain"
            style={{ display: "grid", gap: ".9rem" }}
          >
            <label style={labelStyle}>Name<input name="name" style={inputStyle} required /></label>
            <label style={labelStyle}>Email<input name="email" type="email" style={inputStyle} required /></label>
            <label style={labelStyle}>What are you interested in?<input name="subject" style={inputStyle} /></label>
            <label style={labelStyle}>Message<textarea name="message" rows={5} style={inputStyle} /></label>
            <button type="submit" className="btn btn-primary" style={{ justifySelf: "start" }}>Send</button>
          </form>
        </div>
      </section>
    </>
  );
}

const labelStyle: React.CSSProperties = {
  display: "grid", gap: ".35rem", fontFamily: "var(--sans)", fontSize: ".82rem",
  fontWeight: 600, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--ink-soft)",
};
const inputStyle: React.CSSProperties = {
  fontFamily: "var(--body)", fontSize: "1rem", padding: ".7rem .8rem",
  border: "1px solid var(--line)", borderRadius: "var(--radius)", background: "var(--paper)", color: "var(--ink)",
};
