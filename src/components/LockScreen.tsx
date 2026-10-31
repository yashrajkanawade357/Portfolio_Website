import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AnimatePresence, motion } from "motion/react"
import { person, projects } from "../data"
import { useClock } from "./ui"

const vyora = projects.find((p) => p.slug === "vyora")!
const sindhu = projects.find((p) => p.slug === "project-sindhu")!

/* first visit only: the phone boots before the lock screen lights up */
function useBoot() {
  const [booting, setBooting] = useState(() => {
    try { return !localStorage.getItem("yk-booted") && !matchMedia("(prefers-reduced-motion: reduce)").matches } catch { return false }
  })
  const done = () => { setBooting(false); try { localStorage.setItem("yk-booted", "1") } catch { /* private mode */ } }
  useEffect(() => {
    if (!booting) return
    const t = setTimeout(done, 1900)
    return () => clearTimeout(t)
  }, [booting])
  return [booting, done] as const
}

export default function LockScreen({ onUnfold, style }: { onUnfold: () => void; style: React.CSSProperties }) {
  const { time, date } = useClock()
  const [booting, skip] = useBoot()
  return (
    <div className="lock" style={style}>
      <img className="lock-photo" src="/media/photos/portrait-studio.webp" alt="" />
      <div className="lock-shade" />
      <motion.div
        className="lock-inner"
        initial={false}
        animate={booting ? { opacity: 0, y: 12 } : { opacity: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.15, visualDuration: 0.6 }}
      >
        <div className="lock-date">{date}</div>
        <div className="lock-time" aria-label={`Local time ${time}`}>{time}</div>
        <div className="lock-who">{person.name} · {person.role}</div>

        <div className="lock-notes">
          <Link className="note" to={`/projects/${vyora.slug}`}>
            <img src={vyora.cover} alt="" />
            <span><b>Vyora is live</b><small>AI study platform</small></span>
            <time>now</time>
          </Link>
          <Link className="note" to={`/projects/${sindhu.slug}`}>
            <img src={sindhu.cover} alt="" />
            <span><b>Project Sindhu — in progress</b><small>SIH 2026 · Jamgaon, Beed</small></span>
            <time>wip</time>
          </Link>
        </div>

        <div className="lock-bar">
          <a className="lock-icon" href={person.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <img src="/media/icons/linkedin.png" alt="" />
          </a>
          <button className="lock-hint" onClick={onUnfold}>Scroll to unfold ↓</button>
          <a className="lock-icon" href={person.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <img src="/media/icons/github.png" alt="" />
          </a>
        </div>
      </motion.div>

      <AnimatePresence>
        {booting && (
          <motion.button className="boot" onClick={skip} aria-label="Skip intro" exit={{ opacity: 0, transition: { duration: 0.45 } }}>
            <motion.span
              className="boot-mark"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >YK</motion.span>
            <span className="boot-bar"><motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.4, duration: 1.25, ease: [0.6, 0, 0.3, 1] }} /></span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

