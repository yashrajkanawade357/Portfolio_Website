import { Link } from "react-router-dom"
import { experience, hackathons, type Project } from "../data"

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

/* experience and hackathons, as two separate lists */
export function Timeline() {
  return (
    <>
      <p className="label muted" style={{ marginBottom: 14 }}>Experience</p>
      <div className="lines">
        {experience.map((e) => (
          <div key={e.title + e.org}>
            <span className="t">{e.title}<small className="d muted">{e.detail}</small></span>
            <span className="o muted">{e.org}</span><span className="label muted">{e.when}</span>
          </div>
        ))}
      </div>
      <p className="label muted" style={{ margin: "34px 0 14px" }}>Hackathons</p>
      <div className="lines">
        {hackathons.map((e) => (
          <div key={e.title + e.org}><span className="t">{e.title}</span><span className="o muted">{e.org}</span><span className="label muted">{e.when}</span></div>
        ))}
      </div>
    </>
  )
}
