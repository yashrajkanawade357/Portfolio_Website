import { Link } from "react-router-dom"
import { person, projects } from "../data"
import { useClock } from "./ui"

const vyora = projects.find((p) => p.slug === "vyora")!
const sindhu = projects.find((p) => p.slug === "project-sindhu")!

export default function LockScreen({ onUnfold, style }: { onUnfold: () => void; style: React.CSSProperties }) {
  const { time, date } = useClock()
  return (
    <div className="lock" style={style}>
      <img className="lock-photo" src="/media/photos/portrait-studio.webp" alt="" />
      <div className="lock-shade" />
      <div className="lock-inner">
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
      </div>
    </div>
  )
}
