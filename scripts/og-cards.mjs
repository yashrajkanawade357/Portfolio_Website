// Draws the link-preview cards (1200×630) for every page and project into public/og/.
// Run after adding or changing a project:  node scripts/og-cards.mjs
// Needs Google Chrome installed (set CHROME to its path if it isn't in the default place).
import { execFileSync } from "node:child_process"
import { mkdtempSync, mkdirSync, writeFileSync, existsSync } from "node:fs"
import { tmpdir } from "node:os"
import { join, resolve } from "node:path"
import { pathToFileURL } from "node:url"
import { person, projects, certificates } from "../src/data.ts"

const ROOT = resolve(import.meta.dirname, "..")
const OUT = join(ROOT, "public", "og")
const CHROME = process.env.CHROME ?? "C:/Program Files/Google/Chrome/Application/chrome.exe"
const SITE = "yashrajkanawade.vercel.app"
const media = (p) => pathToFileURL(join(ROOT, "public", p)).href
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

const FONTS = `<link href="https://fonts.googleapis.com/css2?family=Sofia+Sans+Extra+Condensed:wght@800;900&family=Geist:wght@400;500;600&family=Geist+Mono:wght@500&display=block" rel="stylesheet">`
const BASE = `
*{margin:0;padding:0;box-sizing:border-box} html,body{width:1200px;height:630px;overflow:hidden}
body{position:relative;background:#f4f3f0;color:#111;font-family:Geist,system-ui,sans-serif}
.blob{position:absolute;width:620px;height:620px;border-radius:50%;filter:blur(90px);opacity:.55}
.b1{background:#f5c518;left:-200px;top:-260px}.b2{background:#e48a6f;right:-220px;bottom:-300px}
.mono{font:500 15px "Geist Mono",monospace;letter-spacing:.06em;text-transform:uppercase;color:#6d6a63}
.display{font-family:"Sofia Sans Extra Condensed",sans-serif;font-weight:900;text-transform:uppercase;line-height:.86;letter-spacing:-.005em}`

// the home card: the folded phone between the two halves of the name
function homeCard() {
  return `<!doctype html><html><head><meta charset="utf-8">${FONTS}<style>${BASE}
.name{position:absolute;top:50%;translate:0 -54%;font-size:104px;white-space:nowrap}
.l{right:calc(50% + 176px)} .r{left:calc(50% + 176px)}
.phone{position:absolute;left:50%;top:44px;translate:-50% 0;width:300px;height:470px;border-radius:44px;background:#d9d6cf;padding:11px;
  box-shadow:0 40px 60px -30px rgba(0,0,0,.45),inset 0 0 0 1px rgba(0,0,0,.08)}
.scr{position:relative;width:100%;height:100%;border-radius:34px;overflow:hidden;background:#0a0a0a;color:#fff}
.scr img{position:absolute;left:0;right:0;bottom:0;width:100%;height:76%;object-fit:cover;object-position:center top}
.scr .shade{position:absolute;inset:0;background:linear-gradient(180deg,#0a0a0a 24%,transparent 42%,transparent 70%,rgba(0,0,0,.6))}
.top{position:absolute;left:0;right:0;top:30px;text-align:center}
.top .who{font:500 12px "Geist Mono",monospace;letter-spacing:.08em;opacity:.85}
.top .big{font-size:72px;margin-top:6px}
.pill{position:absolute;left:50%;bottom:20px;translate:-50% 0;padding:9px 16px;border-radius:999px;background:rgba(255,255,255,.9);color:#111;font:600 13px Geist;white-space:nowrap}
.foot{position:absolute;left:0;right:0;bottom:30px;text-align:center}
.foot b{color:#111} .dot{display:inline-block;width:8px;height:8px;border-radius:50%;background:#f5c518;margin:0 10px;vertical-align:2px}
</style></head><body><div class="blob b1"></div><div class="blob b2"></div>
<div class="name display l">${esc(person.first)}</div><div class="name display r">${esc(person.last)}</div>
<div class="phone"><div class="scr"><img src="${media("media/photos/portrait-studio.webp")}"><div class="shade"></div>
<div class="top"><div class="who">${esc(person.name.toUpperCase())}</div><div class="big display">VIT'29</div></div>
<div class="pill">Scroll to unfold ↓</div></div></div>
<div class="foot mono"><b>CSE @ VIT Vellore</b><span class="dot"></span>Software engineering × AI/ML<span class="dot"></span>${SITE}</div>
</body></html>`
}

// every other card: words on the left, a picture on the right
function sideCard({ chip, chipColor, kicker, title, text, status, image, shape = "wide", imgPos = "center" }) {
  const long = title.length > 10
  return `<!doctype html><html><head><meta charset="utf-8">${FONTS}<style>${BASE}
.left{position:absolute;left:64px;top:62px;bottom:56px;width:${shape === "tall" ? 640 : 500}px;display:flex;flex-direction:column}
.meta{display:flex;align-items:center;gap:14px}
.chip{min-width:52px;height:52px;padding:0 10px;border-radius:13px;display:grid;place-items:center;color:#fff;font:900 32px "Sofia Sans Extra Condensed"}
.wip{padding:6px 12px;border-radius:999px;background:rgba(245,197,24,.35);font:500 13px "Geist Mono";letter-spacing:.06em;color:#111}
h1{font-size:${long ? 92 : 118}px;margin-top:26px}
p{margin-top:22px;font-size:23px;line-height:1.42;color:#4b4842;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.by{margin-top:auto;display:flex;align-items:center;gap:14px}
.by img{width:52px;height:52px;border-radius:50%;object-fit:cover;object-position:center 20%}
.by b{display:block;font-size:19px} .by small{display:block;margin-top:3px}
.pic{position:absolute;overflow:hidden;background:#ddd;box-shadow:0 40px 70px -30px rgba(0,0,0,.45),inset 0 0 0 1px rgba(0,0,0,.06)}
.pic img{width:100%;height:100%;object-fit:cover;object-position:${imgPos}}
.wide{right:56px;top:50%;width:560px;height:350px;translate:0 -50%;border-radius:22px;transform:perspective(1400px) rotateY(-9deg)}
.tall{right:80px;top:50%;width:330px;height:440px;translate:0 -50%;border-radius:26px;transform:perspective(1400px) rotateY(-9deg)}
.grid{right:56px;top:50%;width:560px;height:400px;translate:0 -50%;display:grid;grid-template-columns:1fr 1fr;gap:14px;background:none;box-shadow:none;overflow:visible;transform:perspective(1400px) rotateY(-9deg)}
.grid img{border-radius:16px;box-shadow:0 24px 40px -22px rgba(0,0,0,.45)}
</style></head><body><div class="blob b1"></div><div class="blob b2"></div>
<div class="left">
  <div class="meta">${chip ? `<span class="chip" style="background:${chipColor}">${esc(chip)}</span>` : ""}<span class="mono">${esc(kicker)}</span>${status ? `<span class="wip">${esc(status.toUpperCase())}</span>` : ""}</div>
  <h1 class="display">${esc(title)}</h1>
  <p>${esc(text)}</p>
  <div class="by"><img src="${media("media/photos/portrait-studio.webp")}"><span><b>${esc(person.name)}</b><small class="mono">${SITE}</small></span></div>
</div>
${Array.isArray(image)
  ? `<div class="pic grid">${image.map((i) => `<img src="${media(i.replace(/^\//, ""))}">`).join("")}</div>`
  : `<div class="pic ${shape}"><img src="${media(image.replace(/^\//, ""))}"></div>`}
</body></html>`
}

const cards = {
  home: homeCard(),
  work: sideCard({ kicker: "Selected work · 2025—26", title: "Selected work", text: `${projects.length} projects across AI/ML, civic tech and full-stack web, from ${projects.slice(0, 3).map((p) => p.title).join(", ")} and more.`, image: projects.slice(0, 4).map((p) => p.cover), shape: "grid" }),
  about: sideCard({ kicker: "About", title: "Stay curious, keep building.", text: "CSE student at VIT Vellore working where software engineering meets AI: architecture, NLP and deep learning.", image: "/media/photos/about-hero.webp", shape: "tall", imgPos: "center 20%" }),
  contact: sideCard({ kicker: "Contact", title: "Let's build something useful.", text: `Have an idea, a role or a project in mind? Write to ${person.email}.`, image: "/media/photos/contact-hero.webp", shape: "tall", imgPos: "center 20%" }),
  archive: sideCard({ kicker: "Archive · Certificates", title: "Certificates", text: `${certificates.length} certificates in AI, development and data, from Google, Udemy, Coursera, VIT and more.`, image: certificates.slice(0, 4).map((c) => c.img), shape: "grid" }),
}
for (const p of projects) {
  cards[`project-${p.slug}`] = sideCard({
    chip: p.number, chipColor: p.accent, kicker: `${p.category} · ${p.year}`, title: p.title, text: p.summary, status: p.status, image: p.cover,
  })
}

if (!existsSync(CHROME)) throw new Error(`Chrome not found at ${CHROME}. Set CHROME=/path/to/chrome`)
mkdirSync(OUT, { recursive: true })
const tmp = mkdtempSync(join(tmpdir(), "og-"))
for (const [name, html] of Object.entries(cards)) {
  const file = join(tmp, `${name}.html`)
  writeFileSync(file, html)
  execFileSync(CHROME, [
    "--headless=new", "--hide-scrollbars", "--force-device-scale-factor=1", "--window-size=1200,630",
    "--allow-file-access-from-files", "--virtual-time-budget=6000", `--user-data-dir=${join(tmp, "profile")}`,
    `--screenshot=${join(OUT, `${name}.png`)}`, pathToFileURL(file).href,
  ], { stdio: "ignore" })
  console.log("card", name)
}
