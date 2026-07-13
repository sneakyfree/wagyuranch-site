"use client";
import { useEffect, useState, useCallback } from "react";
import { admin, getToken, clearToken } from "@/lib/admin";
import { CATEGORY_LABELS, type Item } from "@/lib/api";

const CATS = Object.keys(CATEGORY_LABELS);
const PUSHABLE = ["semen", "embryo"];
const BLANK: Partial<Item> = {
  category: "semen", name: "", breed: "black", status: "available",
  css_status: "unknown", pricing: [], photos: [], video_ids: [], export_regions: [],
  featured: false, published: true,
};

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [cat, setCat] = useState("semen");
  const [items, setItems] = useState<Item[]>([]);
  const [editing, setEditing] = useState<Partial<Item> | null>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => { setAuthed(!!getToken()); }, []);

  const load = useCallback(async (c: string) => {
    try { setItems(await admin.list(c)); } catch { setItems([]); }
  }, []);
  useEffect(() => { if (authed) load(cat); }, [authed, cat, load]);

  if (!authed) return <Login onOk={() => setAuthed(true)} />;

  return (
    <div className="wrap section" style={{ paddingTop: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h1 style={{ margin: 0, fontSize: "1.8rem" }}>Ranch Admin</h1>
        <button className="btn btn-ghost" onClick={() => { clearToken(); setAuthed(false); }}>Sign out</button>
      </div>

      {msg && <div className="notice" style={{ marginBottom: "1rem" }}>{msg}</div>}

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "2rem", alignItems: "start" }}>
        <nav style={{ display: "grid", gap: ".3rem" }}>
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              style={{
                textAlign: "left", padding: ".6rem .8rem", borderRadius: "var(--radius)",
                border: "1px solid " + (c === cat ? "var(--oxblood)" : "var(--line)"),
                background: c === cat ? "var(--paper-2)" : "var(--paper)",
                fontFamily: "var(--sans)", cursor: "pointer", color: "var(--ink)",
              }}>
              {CATEGORY_LABELS[c].plural}
            </button>
          ))}
          <button className="btn btn-primary" style={{ marginTop: ".6rem" }}
            onClick={() => setEditing({ ...BLANK, category: cat })}>+ Add {CATEGORY_LABELS[cat].label}</button>
        </nav>

        <div>
          <h3 style={{ marginBottom: "1rem" }}>{CATEGORY_LABELS[cat].plural} ({items.length})</h3>
          <div style={{ display: "grid", gap: ".6rem" }}>
            {items.map((it) => (
              <div key={it.id} style={rowStyle}>
                <div style={{ flex: 1 }}>
                  <strong>{it.name}</strong>
                  <span style={{ color: "var(--ink-faint)", fontFamily: "var(--sans)", fontSize: ".8rem", marginLeft: ".6rem" }}>
                    {it.reg_no || ""} · {it.status}{!it.published ? " · hidden" : ""}
                  </span>
                  {it.wagyutank_listing_id && (
                    <span style={{ marginLeft: ".6rem", fontSize: ".72rem", color: "var(--gold)", fontFamily: "var(--sans)" }}>
                      ● on WagyuTank #{it.wagyutank_listing_id}
                    </span>
                  )}
                </div>
                {PUSHABLE.includes(it.category) && (
                  it.wagyutank_listing_id
                    ? <button style={miniBtn} onClick={() => doUnlist(it)}>Unlist</button>
                    : <button style={miniBtn} onClick={() => doPush(it)}>Push to WagyuTank ↗</button>
                )}
                <button style={miniBtn} onClick={() => setEditing(it)}>Edit</button>
                <button style={{ ...miniBtn, color: "var(--oxblood)" }} onClick={() => doDelete(it)}>Delete</button>
              </div>
            ))}
            {items.length === 0 && <p style={{ color: "var(--ink-faint)" }}>No items yet.</p>}
          </div>
        </div>
      </div>

      {editing && (
        <Editor
          item={editing}
          onClose={() => setEditing(null)}
          onSaved={() => { setEditing(null); load(cat); }}
        />
      )}
    </div>
  );

  async function doPush(it: Item) {
    setMsg("Publishing to WagyuTank…");
    try { const r = await admin.push(it.id); setMsg(r.message); load(cat); }
    catch (e: any) { setMsg(e.message); }
  }
  async function doUnlist(it: Item) {
    setMsg("Removing from WagyuTank…");
    try { const r = await admin.unlist(it.id); setMsg(r.message); load(cat); }
    catch (e: any) { setMsg(e.message); }
  }
  async function doDelete(it: Item) {
    if (!confirm(`Delete "${it.name}"? This cannot be undone.`)) return;
    try { await admin.remove(it.id); load(cat); } catch (e: any) { setMsg(e.message); }
  }
}

function Login({ onOk }: { onOk: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  return (
    <div className="wrap section" style={{ maxWidth: 420 }}>
      <h1 style={{ fontSize: "1.6rem" }}>Ranch Admin</h1>
      <p style={{ color: "var(--ink-soft)" }}>Owner login.</p>
      <form onSubmit={async (e) => { e.preventDefault(); try { await admin.login(pw); onOk(); } catch { setErr("Wrong password"); } }}>
        <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Password"
          style={{ ...inputStyle, width: "100%", marginBottom: ".8rem" }} autoFocus />
        {err && <p style={{ color: "var(--oxblood)", fontSize: ".9rem" }}>{err}</p>}
        <button className="btn btn-primary" type="submit">Sign in</button>
      </form>
    </div>
  );
}

function Editor({ item, onClose, onSaved }: { item: Partial<Item>; onClose: () => void; onSaved: () => void }) {
  const [f, setF] = useState<Partial<Item>>({ ...item });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const set = (k: keyof Item, v: any) => setF((p) => ({ ...p, [k]: v }));

  const isCattle = f.category === "cattle_for_sale";
  const isEmbryo = f.category === "embryo";
  const isPreg = f.category === "pregnancy";

  async function save() {
    setSaving(true); setErr("");
    try {
      const body: any = { ...f };
      if (body.id) await admin.update(body.id, body);
      else await admin.create(body);
      onSaved();
    } catch (e: any) { setErr(e.message); } finally { setSaving(false); }
  }

  return (
    <div style={backdrop} onClick={onClose}>
      <div style={modal} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h2 style={{ margin: 0, fontSize: "1.4rem" }}>{f.id ? "Edit" : "New"} {CATEGORY_LABELS[f.category!]?.label}</h2>
          <button style={miniBtn} onClick={onClose}>✕</button>
        </div>
        {err && <div className="notice" style={{ marginBottom: ".8rem" }}>{err}</div>}

        <div style={grid2}>
          <Field label="Name"><input style={inputStyle} value={f.name || ""} onChange={(e) => set("name", e.target.value)} /></Field>
          <Field label="Category">
            <select style={inputStyle} value={f.category} onChange={(e) => set("category", e.target.value)}>
              {CATS.map((c) => <option key={c} value={c}>{CATEGORY_LABELS[c].label}</option>)}
            </select>
          </Field>
          <Field label="Reg #"><input style={inputStyle} value={f.reg_no || ""} onChange={(e) => set("reg_no", e.target.value)} /></Field>
          <Field label="Breed">
            <select style={inputStyle} value={f.breed} onChange={(e) => set("breed", e.target.value)}>
              <option value="black">Japanese Black</option>
              <option value="akaushi">Akaushi (Red)</option>
              <option value="polled">Polled</option>
            </select>
          </Field>
          <Field label="Status">
            <select style={inputStyle} value={f.status} onChange={(e) => set("status", e.target.value)}>
              {["available", "coming_soon", "sold", "sold_out", "reference"].map((s) => <option key={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="CSS status">
            <select style={inputStyle} value={f.css_status} onChange={(e) => set("css_status", e.target.value)}>
              {["unknown", "domestic", "css"].map((s) => <option key={s}>{s}</option>)}
            </select>
          </Field>
          {isCattle && <Field label="Subtype (bull/heifer/cow/steer/f1)"><input style={inputStyle} value={f.subtype || ""} onChange={(e) => set("subtype", e.target.value)} /></Field>}
          {isEmbryo && <Field label="Lot #"><input style={inputStyle} value={f.lot_number || ""} onChange={(e) => set("lot_number", e.target.value)} /></Field>}
          {(isEmbryo || isPreg) && <Field label="Sire reg"><input style={inputStyle} value={f.sire_reg || ""} onChange={(e) => set("sire_reg", e.target.value)} /></Field>}
          {(isEmbryo || isPreg) && <Field label="Dam reg"><input style={inputStyle} value={f.dam_reg || ""} onChange={(e) => set("dam_reg", e.target.value)} /></Field>}
          {isPreg && <Field label="Sex"><input style={inputStyle} value={f.pregnancy_sex || ""} onChange={(e) => set("pregnancy_sex", e.target.value)} /></Field>}
          <Field label="Semen / storage location"><input style={inputStyle} value={f.semen_location || ""} onChange={(e) => set("semen_location", e.target.value)} /></Field>
          <Field label="Quantity"><input style={inputStyle} type="number" value={f.quantity ?? ""} onChange={(e) => set("quantity", e.target.value ? +e.target.value : null)} /></Field>
        </div>

        <Field label="Headline"><input style={inputStyle} value={f.headline || ""} onChange={(e) => set("headline", e.target.value)} /></Field>
        <Field label="Description"><textarea style={{ ...inputStyle, minHeight: 100 }} value={f.description || ""} onChange={(e) => set("description", e.target.value)} /></Field>

        <Field label="Pricing ladder">
          <ListEditor
            rows={(f.pricing || []).map((p) => ({ label: p.label, price: String(p.price) }))}
            cols={[{ k: "label", ph: "Label (e.g. Conventional Domestic)" }, { k: "price", ph: "Price", w: 100 }]}
            onChange={(rows) => set("pricing", rows.filter((r) => r.label).map((r) => ({ label: r.label, price: Number(r.price) || 0, currency: "USD" })))}
          />
        </Field>

        <Field label="Photos (url + alt)">
          <ListEditor
            rows={(f.photos || []).map((p) => ({ url: p.url, alt: p.alt || "" }))}
            cols={[{ k: "url", ph: "/img/name.jpg or full URL" }, { k: "alt", ph: "Alt text" }]}
            onChange={(rows) => set("photos", rows.filter((r) => r.url).map((r) => ({ url: r.url, alt: r.alt })))}
          />
        </Field>

        <div style={grid2}>
          <Field label="YouTube IDs (comma-separated)">
            <input style={inputStyle} value={(f.video_ids || []).join(", ")} onChange={(e) => set("video_ids", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} />
          </Field>
          <Field label="Export regions (comma-separated)">
            <input style={inputStyle} value={(f.export_regions || []).join(", ")} onChange={(e) => set("export_regions", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} />
          </Field>
        </div>

        <div style={{ display: "flex", gap: "1.5rem", margin: "1rem 0", fontFamily: "var(--sans)", fontSize: ".9rem" }}>
          <label><input type="checkbox" checked={!!f.featured} onChange={(e) => set("featured", e.target.checked)} /> Featured</label>
          <label><input type="checkbox" checked={f.published !== false} onChange={(e) => set("published", e.target.checked)} /> Published (visible)</label>
        </div>

        <div style={{ display: "flex", gap: ".8rem", marginTop: "1rem" }}>
          <button className="btn btn-primary" onClick={save} disabled={saving}>{saving ? "Saving…" : "Save"}</button>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

function ListEditor({ rows, cols, onChange }: {
  rows: Record<string, string>[];
  cols: { k: string; ph: string; w?: number }[];
  onChange: (rows: Record<string, string>[]) => void;
}) {
  const upd = (i: number, k: string, v: string) => {
    const next = rows.map((r, j) => (j === i ? { ...r, [k]: v } : r));
    onChange(next);
  };
  const add = () => onChange([...rows, Object.fromEntries(cols.map((c) => [c.k, ""]))]);
  const del = (i: number) => onChange(rows.filter((_, j) => j !== i));
  return (
    <div>
      {rows.map((r, i) => (
        <div key={i} style={{ display: "flex", gap: ".4rem", marginBottom: ".4rem" }}>
          {cols.map((c) => (
            <input key={c.k} style={{ ...inputStyle, flex: c.w ? "none" : 1, width: c.w }} placeholder={c.ph}
              value={r[c.k] || ""} onChange={(e) => upd(i, c.k, e.target.value)} />
          ))}
          <button style={miniBtn} onClick={() => del(i)}>✕</button>
        </div>
      ))}
      <button style={miniBtn} onClick={add} type="button">+ Add row</button>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "block", marginBottom: ".8rem" }}>
      <div style={{ fontFamily: "var(--sans)", fontSize: ".72rem", fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: ".3rem" }}>{label}</div>
      {children}
    </label>
  );
}

const rowStyle: React.CSSProperties = { display: "flex", alignItems: "center", gap: ".5rem", padding: ".7rem .9rem", border: "1px solid var(--line)", borderRadius: "var(--radius)", background: "var(--paper)" };
const miniBtn: React.CSSProperties = { fontFamily: "var(--sans)", fontSize: ".78rem", padding: ".35rem .6rem", border: "1px solid var(--line)", borderRadius: "var(--radius)", background: "var(--paper)", cursor: "pointer", color: "var(--ink)" };
const inputStyle: React.CSSProperties = { fontFamily: "var(--body)", fontSize: ".95rem", padding: ".5rem .6rem", border: "1px solid var(--line)", borderRadius: "var(--radius)", background: "var(--paper)", color: "var(--ink)", width: "100%" };
const grid2: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" };
const backdrop: React.CSSProperties = { position: "fixed", inset: 0, background: "rgba(20,16,10,.55)", zIndex: 100, display: "flex", alignItems: "flex-start", justifyContent: "center", overflowY: "auto", padding: "3vh 1rem" };
const modal: React.CSSProperties = { background: "var(--paper)", borderRadius: "var(--radius)", padding: "1.6rem", maxWidth: 720, width: "100%", boxShadow: "var(--shadow)" };
