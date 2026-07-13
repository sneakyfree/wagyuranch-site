import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const ROOT = path.join(process.cwd(), "content");

export type Doc = {
  slug: string;
  data: Record<string, any>;
  html: string;
  raw: string;
};

marked.setOptions({ gfm: true, breaks: false });

function readDir(sub: string): string[] {
  const dir = path.join(ROOT, sub);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
}

export function getDoc(sub: string, slug: string): Doc | null {
  const file = path.join(ROOT, sub, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { slug, data, html: marked.parse(content) as string, raw: content };
}

export function getDocs(sub: string): Doc[] {
  return readDir(sub)
    .map((f) => getDoc(sub, f.replace(/\.md$/, "")))
    .filter((d): d is Doc => !!d)
    .sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
}

export function docSlugs(sub: string): string[] {
  return readDir(sub).map((f) => f.replace(/\.md$/, ""));
}
