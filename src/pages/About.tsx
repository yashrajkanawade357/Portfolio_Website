import { Link } from "react-router-dom"
import { about, communities, experience, focus, hackathons, numbers, person } from "../data"
import { CountUp, Reveal, useTitle } from "../components/ui"
import { Cta, Foot } from "./Home"

export default function About() {
  useTitle("About")
  return (
    <>
      <section className="sec dark about-hero">
        <figure><img src="/media/photos/about-hero.webp" alt="Yashraj Kanawade standing with arms crossed by a wall of potted plants" /></figure>
        <div>
          <p className="label muted">About</p>
          <h1 className="display">Stay curious,<br /><span className="accent">keep building.</span></h1>
          <p className="lead">I'm {person.name}, a Computer Science and Engineering student at VIT Vellore, graduating in 2029. I enjoy understanding how technology works and building things that solve real problems, with a focus on software engineering and AI/ML and a growing interest in quantum cryptography.</p>
          <div className="row" style={{ marginTop: 22 }}><Link className="btn btn-pulse" to="/contact">Let's connect ↗</Link></div>
        </div>
      </section>

      <section className="sec dark" style={{ paddingTop: 0 }}>
        <p className="label muted" style={{ marginBottom: 20 }}>In numbers</p>
        <div className="numbers">
          {numbers.map((n) => <div className="num" key={n.label}><b><CountUp to={n.value} suffix={n.suffix} /></b><span className="label">{n.label}</span></div>)}
        </div>
      </section>

      <section className="sec light">
        <div className="sec-head"><h2 className="display h2">My journey</h2><span className="label muted">Based in {person.basedIn}</span></div>
        <div className="essay">
          {about.map((a) => (
            <Reveal key={a.h}><div><h3 className="label">{a.h}</h3><p>{a.p}</p></div></Reveal>
          ))}
        </div>
      </section>

      <section className="sec light">
        <p className="label muted" style={{ marginBottom: 14 }}>What I'm focused on</p>
        {focus.map((f, i) => (
          <div key={f.title} className="focus-row">
            <span className="label muted">{String(i + 1).padStart(2, "0")}</span><h3 className="display">{f.title}</h3><p>{f.text}</p>
          </div>
        ))}
      </section>

      <section className="sec light">
        <p className="label muted" style={{ marginBottom: 14 }}>Experience & hackathons</p>
        <div className="lines">
          {[...experience, ...hackathons].map((e) => (
            <div key={e.title + e.org}><span className="t">{e.title}</span><span className="o muted">{e.org}</span><span className="label muted">{e.when}</span></div>
          ))}
        </div>
        <p className="label muted" style={{ margin: "30px 0 14px" }}>Communities</p>
        <div className="chips">{communities.map((c) => <span className="chip" key={c}>{c}</span>)}</div>
      </section>

      <Cta line="Let's build something useful." />
      <Foot />
    </>
  )
}
