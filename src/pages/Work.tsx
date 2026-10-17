import { useState } from "react"
import { Link } from "react-router-dom"
import { AnimatePresence, motion } from "motion/react"
import { categories, projects, type Category } from "../data"
import { useTitle } from "../components/ui"
import { ProjectCard } from "./parts"
import { Cta, Foot } from "./Home"

export default function Work() {
  useTitle("Work")
  const [filter, setFilter] = useState<Category | "All">("All")
  const shown = projects.filter((p) => filter === "All" || p.category === filter)
  return (
    <>
      <section className="sec light" style={{ paddingTop: "max(64px, 7cqw)" }}>
        <h1 className="display p-title" style={{ marginTop: 0 }}>Work</h1>
        <p className="label muted">Selected projects · 2025—26</p>
        <p className="lead" style={{ marginTop: 14 }}>AI products, full-stack platforms and hackathon builds. Open a project for the full story.</p>

        <div className="filters" role="group" aria-label="Filter projects">
          {(["All", ...categories] as const).map((c) => (
            <button key={c} aria-pressed={filter === c} onClick={() => setFilter(c)}>
              {filter === c && <motion.span layoutId="filter-pill" className="pill" transition={{ type: "spring", bounce: 0.2, visualDuration: 0.35 }} />}
              <span>{c}</span>
            </button>
          ))}
        </div>

        <motion.div className="cards" layout>
          <AnimatePresence mode="popLayout">
            {shown.map((p) => (
              <motion.div key={p.slug} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
                transition={{ type: "spring", bounce: 0.1, visualDuration: 0.4 }}>
                <ProjectCard p={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <section className="sec light">
        <p className="label muted" style={{ marginBottom: 14 }}>Index · No. · Project · Client · Year</p>
        <div className="index">
          {projects.map((p) => (
            <Link key={p.slug} to={`/projects/${p.slug}`}>
              <span className="label muted">{p.number}</span><b>{p.title}</b><span className="c muted">{p.client}</span><span className="label muted">{p.year}</span>
            </Link>
          ))}
        </div>
      </section>

      <Cta line="Got an idea that needs building?" />
      <Foot />
    </>
  )
}
