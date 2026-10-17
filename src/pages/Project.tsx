import { Link, useParams } from "react-router-dom"
import { projects } from "../data"
import { Reveal, useTitle } from "../components/ui"
import { Foot } from "./Home"
import NotFound from "./NotFound"

export default function Project() {
  const { slug } = useParams()
  const i = projects.findIndex((p) => p.slug === slug)
  const p = projects[i]
  useTitle(p ? p.title : "Not found")
  if (!p) return <NotFound />
  const next = projects[(i + 1) % projects.length]
  return (
    <>
      <section className="sec light" style={{ paddingTop: "max(64px, 7cqw)" }}>
        <p className="label muted">{p.number} · {p.category}</p>
        <h1 className="display p-title">{p.title}</h1>
        <dl className="p-meta">
          <div><dt className="label muted">Client</dt><dd>{p.client}</dd></div>
          <div><dt className="label muted">Year</dt><dd>{p.year}</dd></div>
          <div><dt className="label muted">Role</dt><dd>{p.role}</dd></div>
          <div><dt className="label muted">Built with</dt><dd>{p.stack.join(", ")}</dd></div>
        </dl>
        <p className="p-summary">{p.summary}</p>
        <Reveal className="p-img"><img src={p.cover} alt={`${p.title}`} /></Reveal>
        <div className="p-body">{p.body.map((t) => <p key={t.slice(0, 24)}>{t}</p>)}</div>
        {p.live && <a className="btn btn-ink" href={p.live} target="_blank" rel="noreferrer" style={{ marginBottom: 28 }}>Visit the live site ↗</a>}
        <Reveal className="p-img"><img src={p.still} alt={`${p.title}, another view`} loading="lazy" /></Reveal>
      </section>
      <section className="sec light">
        <div className="p-next">
          <Link className="link-arrow" to="/work">← All work</Link>
          <Link to={`/projects/${next.slug}`} style={{ textAlign: "right" }}>
            <span className="label muted">Next project</span>
            <span className="display" style={{ display: "block", fontSize: "max(34px, 5cqw)" }}>{next.title} ›</span>
          </Link>
        </div>
      </section>
      <Foot />
    </>
  )
}
