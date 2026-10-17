import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "motion/react"
import { certificates, person } from "../data"
import { useTitle } from "../components/ui"
import { Foot } from "./Home"

export default function Archive() {
  useTitle("Archive")
  const [open, setOpen] = useState<number | null>(null)
  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null)
      if (e.key === "ArrowRight") setOpen((o) => (o === null ? o : (o + 1) % certificates.length))
      if (e.key === "ArrowLeft") setOpen((o) => (o === null ? o : (o - 1 + certificates.length) % certificates.length))
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])
  const c = open === null ? null : certificates[open]

  return (
    <>
      <section className="sec light" style={{ paddingTop: "max(64px, 7cqw)" }}>
        <h1 className="display p-title" style={{ marginTop: 0 }}>Archive</h1>
        <p className="label muted">Certificates · courses · hackathons</p>
        <p className="lead" style={{ margin: "14px 0 28px" }}>Every course finished and every hackathon entered, kept on one wall. Sixteen certificates and counting.</p>
        <div className="certs">
          {certificates.map((cert, i) => (
            <button key={cert.img} className="cert" onClick={() => setOpen(i)} aria-label={`View certificate: ${cert.title}`}>
              <motion.div className="frame" layoutId={`cert-${i}`}><img src={cert.img} alt="" loading="lazy" /></motion.div>
              <b>{cert.title}</b>
              <small className="label muted">{cert.issuer} · 2026</small>
            </button>
          ))}
        </div>
      </section>

      <section className="sec dark cta">
        <h2 className="display">Want the full story?</h2>
        <a className="btn btn-pulse" href={person.linkedin} target="_blank" rel="noreferrer">See my LinkedIn ↗</a>
      </section>
      <Foot />

      {createPortal(
        <AnimatePresence>
          {c && (
            <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label={c.title}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
              <figure onClick={(e) => e.stopPropagation()}>
                <motion.img layoutId={`cert-${open}`} src={c.img} alt={c.title} />
                <figcaption><b>{c.title}</b> <span className="label" style={{ opacity: 0.7 }}>· {c.issuer} · {c.kind}</span></figcaption>
              </figure>
              <button className="close" onClick={() => setOpen(null)} autoFocus>Close ✕</button>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
