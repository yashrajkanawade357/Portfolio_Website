# Yashraj Kanawade — portfolio

My portfolio, built inside a folding phone: it opens as you scroll and the whole site lives on its screen.

**Live:** https://yashrajkanawade.vercel.app/

- **Stack:** React 19, TypeScript, Vite, [Motion](https://motion.dev) for the fold and transitions, React Router.
- **Pages:** Home · Work (filterable) · project case studies · Archive (certificates) · About · Contact (form relayed by FormSubmit).
- **Hosting:** Vercel builds from this repo on every push to `main` (`vercel.json`).

## Run locally

```bash
npm install
npm run dev
```

Content lives in `src/data.ts`; images in `public/media/`.
