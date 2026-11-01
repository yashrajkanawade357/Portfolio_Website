// Runs after `vite build`. Link previews (LinkedIn, WhatsApp, X) and search engines read the raw HTML
// without running the app, so every route gets its own copy of index.html with the right title,
// description and preview card. Also writes sitemap.xml and robots.txt.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs"
import { join, resolve } from "node:path"
import { person, projects, certificates } from "../src/data.ts"

const SITE = "https://yashrajkanawade.vercel.app"
const DIST = resolve(import.meta.dirname, "..", "dist")
const base = readFileSync(join(DIST, "index.html"), "utf8")
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;")

const pages = [
  { path: "/", title: `${person.name} — CSE @ VIT Vellore`, card: "home",
    desc: `CSE student at VIT Vellore building AI/ML and full-stack projects: ${projects.slice(0, 3).map((p) => p.title).join(", ")} and more. A portfolio inside a phone that unfolds.` },
  { path: "/work", title: `Work — ${person.name}`, card: "work",
    desc: `${projects.length} projects across AI/ML, civic tech and full-stack web: ${projects.map((p) => p.title).join(", ")}.` },
  { path: "/about", title: `About — ${person.name}`, card: "about",
    desc: "CSE student at VIT Vellore (Class of 2029) working where software engineering meets AI: architecture, NLP and deep learning. Experience, events, hackathons and skills." },
  { path: "/archive", title: `Archive — ${person.name}`, card: "archive",
    desc: `${certificates.length} certificates in AI, development and data, from Google, Udemy, Coursera, VIT and more.` },
  { path: "/contact", title: `Contact — ${person.name}`, card: "contact",
    desc: `Have an idea, a role or a project in mind? Write to ${person.name} at ${person.email}.` },
  ...projects.map((p) => ({
    path: `/projects/${p.slug}`, title: `${p.title} — ${person.name}`, card: `project-${p.slug}`, type: "article",
    desc: `${p.summary}${p.status ? ` (${p.status.toLowerCase()})` : ""} Built with ${p.stack.join(", ")}.`,
  })),
]

const set = (html, re, value) => {
  if (!re.test(html)) throw new Error(`seo: tag not found ${re}`)
  return html.replace(re, `$1${value}$2`)
}

for (const pg of pages) {
  const url = SITE + (pg.path === "/" ? "/" : pg.path)
  const img = `${SITE}/og/${pg.card}.png`
  if (!existsSync(resolve(import.meta.dirname, "..", "public", "og", `${pg.card}.png`))) throw new Error(`seo: missing card og/${pg.card}.png — run node scripts/og-cards.mjs`)
  let h = base
  h = set(h, /(<title>)[^<]*(<\/title>)/, esc(pg.title))
  h = set(h, /(<meta name="description" content=")[^"]*(")/, esc(pg.desc))
  h = set(h, /(<link rel="canonical" href=")[^"]*(")/, url)
  h = set(h, /(<meta property="og:type" content=")[^"]*(")/, pg.type ?? "website")
  h = set(h, /(<meta property="og:title" content=")[^"]*(")/, esc(pg.title))
  h = set(h, /(<meta property="og:description" content=")[^"]*(")/, esc(pg.desc))
  h = set(h, /(<meta property="og:url" content=")[^"]*(")/, url)
  h = set(h, /(<meta property="og:image" content=")[^"]*(")/, img)
  h = set(h, /(<meta property="og:image:alt" content=")[^"]*(")/, esc(pg.title))
  h = set(h, /(<meta name="twitter:title" content=")[^"]*(")/, esc(pg.title))
  h = set(h, /(<meta name="twitter:description" content=")[^"]*(")/, esc(pg.desc))
  h = set(h, /(<meta name="twitter:image" content=")[^"]*(")/, img)
  const dir = join(DIST, ...pg.path.split("/").filter(Boolean))
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, "index.html"), h)
}

const today = new Date().toISOString().slice(0, 10)
writeFileSync(join(DIST, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${SITE}${p.path === "/" ? "/" : p.path}</loc><lastmod>${today}</lastmod><priority>${p.path === "/" ? "1.0" : p.path.startsWith("/projects") ? "0.7" : "0.8"}</priority></url>`).join("\n")}
</urlset>
`)
writeFileSync(join(DIST, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`)
console.log(`seo: ${pages.length} pages, sitemap.xml, robots.txt`)
