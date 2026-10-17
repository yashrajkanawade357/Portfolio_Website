import { Link } from "react-router-dom"
import { experience, focus, hackathons, skills, type Project } from "../data"
import { Reveal } from "../components/ui"

export function ProjectCard({ p }: { p: Project }) {
  return (
    <Link className="card" to={`/projects/${p.slug}`}>
      <div className="card-media">
        <img src={p.cover} alt={`${p.title} cover`} loading="lazy" />
        <span className="card-num" style={{ background: p.accent, color: p.accent === "#f5c518" ? "#111" : "#fff" }}>{p.number}</span>
      </div>
      <div className="card-meta"><span className="label muted">{p.category}{p.status && <span className="wip">{p.status}</span>}</span><span className="label muted">{p.year}</span></div>
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
          <div key={e.title + e.org}><span className="t">{e.title}</span><span className="o muted">{e.org}</span><span className="label muted">{e.when ?? ""}</span></div>
        ))}
      </div>
    </>
  )
}

/* what I'm focused on: one row per area, with the topics inside it */
export function Focus({ reveal = false }: { reveal?: boolean }) {
  return (
    <>
      <p className="label muted" style={{ marginBottom: 14 }}>What I'm focused on</p>
      {focus.map((f, i) => {
        const inner = (
          <>
            <span className="label muted">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="display">{f.title}</h3>
            <div>
              <p>{f.text}</p>
              <ul className="topics">{f.topics.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          </>
        )
        return reveal
          ? <Reveal key={f.title} className="focus-row">{inner}</Reveal>
          : <div key={f.title} className="focus-row">{inner}</div>
      })}
    </>
  )
}

/* skills, grouped */
export function Skills() {
  return (
    <>
      <p className="label muted" style={{ marginBottom: 14 }}>Skills & tools</p>
      <div className="skills">
        {skills.map((g) => (
          <div key={g.group} className="skill-group">
            <span className="label muted">{g.group}</span>
            <div className="chips">{g.items.map((it) => <span className="chip" key={it}>{it}</span>)}</div>
          </div>
        ))}
      </div>
    </>
  )
}
