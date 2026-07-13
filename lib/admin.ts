import { API_BASE, type Item } from "@/lib/api";

const TOKEN_KEY = "wr_admin_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}
export function setToken(t: string) {
  localStorage.setItem(TOKEN_KEY, t);
}
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function authed(path: string, init: RequestInit = {}) {
  const token = getToken();
  const r = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      ...(init.headers || {}),
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (r.status === 401) {
    clearToken();
    throw new Error("Session expired — please log in again.");
  }
  if (!r.ok) {
    const t = await r.text();
    throw new Error(`${r.status}: ${t.slice(0, 200)}`);
  }
  return r.status === 204 ? null : r.json();
}

export const admin = {
  async login(password: string): Promise<void> {
    const r = await fetch(`${API_BASE}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!r.ok) throw new Error("Wrong password");
    const d = await r.json();
    setToken(d.access_token);
  },
  list: (category: string): Promise<Item[]> =>
    fetch(`${API_BASE}/api/inventory?category=${category}&include_unpublished=true`).then((r) => r.json()),
  create: (body: Partial<Item>): Promise<Item> =>
    authed(`/api/admin/inventory`, { method: "POST", body: JSON.stringify(body) }),
  update: (id: number, body: Partial<Item>): Promise<Item> =>
    authed(`/api/admin/inventory/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  remove: (id: number) =>
    authed(`/api/admin/inventory/${id}`, { method: "DELETE" }),
  push: (id: number): Promise<{ ok: boolean; message: string; wagyutank_listing_id?: number }> =>
    authed(`/api/admin/inventory/${id}/push-wagyutank`, { method: "POST" }),
  unlist: (id: number): Promise<{ ok: boolean; message: string }> =>
    authed(`/api/admin/inventory/${id}/unlist-wagyutank`, { method: "POST" }),
};
