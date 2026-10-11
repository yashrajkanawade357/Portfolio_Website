# Portfolio Website — Yashraj Kanawade

B.Tech CSE @ VIT · Software Engineer & AI/ML enthusiast.

**Live:** https://yashrajkanawadeportfolio.netlify.app/

A living-green 3D portfolio: a welcome screen of drifting pollen hands over to an
interactive moss world, followed by About, Stack, Work, Activity, Credentials,
Community and Contact.

- **Hero:** the ThreeUI *Sylva* landing page (Living Green), used as authored — moss
  root, ferns and flowers, a landing butterfly, liquid-metal controls.
- **Sections:** a tech-stack orbit and a contribution grove (Three.js), paper project
  cards with live demo links, and ambient pollen.
- **Sound:** synthesized with the Web Audio API — a wind gust on Enter and soft plucks,
  plus a forest ambience on the hero's play button. Off by default.

## Run locally

A static site with no build step. Serve the folder:

```bash
python -m http.server 5178
```

Then open http://localhost:5178.

## Files

| Path | Purpose |
| --- | --- |
| `index.html` | the whole site |
| `inner-green-assets/` | the hero's Three.js runtime, card images and Lexend font |
| `og-image.png` | link-preview card |
| `THIRD-PARTY-NOTICES.md` | licences for ThreeUI (MIT), Lexend (OFL) and Three.js (MIT) |
