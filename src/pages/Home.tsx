import { Link } from "react-router-dom"
import { communities, numbers, person, projects } from "../data"
import { CountUp, Reveal, useTitle } from "../components/ui"
import { Focus, ProjectCard, Skills, Timeline } from "./parts"

export default function Home() {
  useTitle("")
  return (
    <>
      <section className="sec dark intro">
        <div>
          <p className="label muted">{person.roleLong}</p>
          <h1 className="display hero-name">{person.first}<br /><span className="accent">{person.last}</span></h1>
          <p className="lead">{person.tagline}</p>
          <div className="row">
            <Link className="btn btn-pulse" to="/work">See the work ↗</Link>
            <Link className="btn btn-ghost" to="/contact">Say hello</Link>
          </div>
        </div>
        <figure className="intro-photo">
          <img src="/media/photos/portrait-closeup.webp" alt="Yashraj Kanawade smiling, standing by a wall of potted plants" />
        </figure>
      </section>

      <section className="sec dark" style={{ paddingTop: 0 }}>
        <p className="label muted" style={{ marginBottom: 20 }}>So far, in numbers</p>
        <div className="numbers">
          {numbers.map((n) => (
            <div className="num" key={n.label}><b><CountUp to={n.value} suffix={n.suffix} /></b><span className="label">{n.label}</span></div>
          ))}
        </div>
      </section>

      <section className="sec light">
        <div className="sec-head">
          <h2 className="display h2">Selected work</h2>
          <Link className="link-arrow" to="/work">All projects ↗</Link>
        </div>
        <div className="cards">
          {projects.map((p, i) => <Reveal key={p.slug} delay={(i % 2) * 0.08}><ProjectCard p={p} /></Reveal>)}
        </div>
      </section>

      <section className="sec light">
        <Focus reveal />
      </section>

      <section className="sec light">
        <Skills />
      </section>

      <section className="sec light">
        <Timeline />
      </section>

      <section className="sec light">
        <p className="label muted" style={{ marginBottom: 14 }}>Communities</p>
        <div className="chips">{communities.map((c) => <span className="chip" key={c}>{c}</span>)}</div>
      </section>

      <Cta />
      <Foot />
    </>
  )
}

export function Cta({ line = "Have an idea that needs building?" }: { line?: string }) {
  return (
    <section className="sec dark cta">
      <h2 className="display">{line}</h2>
      <Link className="btn btn-pulse" to="/contact">Get in touch ↗</Link>
    </section>
  )
}

export function Foot() {
  return (
    <footer className="foot">
      <span>© 2026 {person.name} · Built with React & Motion</span>
      <span className="row" style={{ gap: 16 }}>
        <a href={person.github} target="_blank" rel="noreferrer">GitHub</a>
        <a href={person.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={`mailto:${person.email}`}>Email</a>
      </span>
    </footer>
  )
}
