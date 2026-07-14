import fs from "fs";
import path from "path";

const BASE = "https://wagyuranch.com";
const urls = [
  "/", "/story/", "/about/", "/contact/", "/bull-lease/",
  "/semen/", "/embryos/", "/herd-bulls/", "/donors/", "/cattle/",
];

function slugs(sub) {
  const dir = path.join(process.cwd(), "content", sub);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, ""));
}
for (const s of slugs("education")) urls.push(`/story/${s}/`);
for (const s of slugs("animals")) urls.push(`/animals/${s}/`);

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map((u) => `  <url><loc>${BASE}${u}</loc></url>`).join("\n") +
  `\n</urlset>\n`;

fs.mkdirSync("public", { recursive: true });
fs.writeFileSync("public/sitemap.xml", xml);
fs.writeFileSync("public/robots.txt", `User-agent: *\nAllow: /\nSitemap: ${BASE}/sitemap.xml\n`);
console.log(`sitemap: ${urls.length} urls`);
