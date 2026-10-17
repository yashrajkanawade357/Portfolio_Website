import { Link } from "react-router-dom"
import type { Project } from "../data"

export function ProjectCard({ p }: { p: Project }) {
  return (
    <Link className="card" to={`/projects/${p.slug}`}>
      <div className="card-media">
        <img src={p.cover} alt={`${p.title} cover`} loading="lazy" />
        <span className="card-num" style={{ background: p.accent, color: p.accent === "#f5c518" ? "#111" : "#fff" }}>{p.number}</span>
      </div>
      <div className="card-meta"><span className="label muted">{p.category}</span><span className="label muted">{p.year}</span></div>
      <h3 className="display">{p.title}</h3>
      <p>{p.summary}</p>
    </Link>
  )
}
