import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "motion/react"
import { person, skills } from "../data"
import { useScreen } from "./screen"
import { Rise } from "./ui"

/* the teardown: scroll pulls the phone apart, and every layer is a part of what I do */
const LAYERS = [
  { id: "glass", part: "Cover glass", group: "Design", line: "What you see first" },
  { id: "display", part: "Display", group: "Web", line: "Where it comes alive" },
  { id: "board", part: "Logic board", group: "AI / ML", line: "Where the thinking happens" },
  { id: "battery", part: "Battery", group: "Languages", line: "What it runs on" },
  { id: "frame", part: "Frame", group: "DevOps & tools", line: "What holds it together" },
  { id: "back", part: "Back plate", group: "Backend & data", line: "What's behind it all" },
] as const
const N = LAYERS.length
const TILT = 60, TURN = -30

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const ss = (a: number, b: number, x: number) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t) }
/* lean into the angled view, pull apart, hold, then put it back together on the way out */
const lean = (p: number) => ss(0, 0.28, p) * (1 - ss(0.9, 1, p))
const apart = (p: number) => ss(0.08, 0.5, p) * (1 - ss(0.86, 0.99, p))
const lift = (i: number, gap: number, p: number) => ((N - 1) / 2 - i) * gap * apart(p)

export default function Exploded() {
  const { scrolled, height } = useScreen()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const top = useMotionValue(0)
  // hover (or tap) a layer or its label: that pair lifts and lights up, the rest step back
  const [hot, setHot] = useState<number | null>(null)

  // where this section starts inside the screen's content
  useLayoutEffect(() => {
    const el = ref.current
    const content = el?.closest<HTMLElement>(".screen-content")
    if (!el || !content) return
    const measure = () => {
      let y = 0
      for (let n: HTMLElement | null = el; n && n !== content; n = n.offsetParent as HTMLElement | null) y += n.offsetTop
      top.set(y)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(content)
    return () => ro.disconnect()
  }, [top])

  // the stage stays pinned for `range` px of scrolling while the phone comes apart
  const range = reduce ? 0 : Math.round(height * 1.7)
  const gap = clamp(height * 0.11, 50, 86)
  const p = useTransform(() => (range ? clamp((scrolled.get() - top.get()) / range) : 0.7))
  const pinY = useTransform(() => clamp(scrolled.get() - top.get(), 0, range))
  const rotateX = useTransform(() => TILT * lean(p.get()))
  const rotateZ = useTransform(() => TURN * lean(p.get()))
  const hint = useTransform(() => 1 - ss(0.02, 0.12, p.get()))

  return (
    <section ref={ref} className="sec dark exploded" style={{ height: height + range }} aria-label="What I'm made of">
      <motion.div className="ex-stage" style={{ height, y: pinY }}>
        <div className="ex-head">
          <p className="label muted">Teardown · {person.first}</p>
          <h2 className="display"><Rise text="Built in" /> <span className="accent"><Rise text="layers." delay={0.2} /></span></h2>
          <p>Take the phone apart and you find what I work with. Six layers, one for each part of the stack.</p>
          <motion.p className="label ex-hint" style={{ opacity: hint }}>Keep scrolling ↓</motion.p>
        </div>

        <div className={hot === null ? "ex-scene" : "ex-scene has-hot"} aria-hidden>
          <motion.div className="ex-phone" style={{ rotateX, rotateZ }}>
            {LAYERS.map((l, i) => <Layer key={l.id} id={l.id} i={i} gap={gap} p={p} hot={hot === i} onHot={setHot} />)}
          </motion.div>
        </div>

        <ol className={hot === null ? "ex-labels" : "ex-labels has-hot"}>
          {LAYERS.map((l, i) => <Label key={l.id} i={i} gap={gap} p={p} part={l.part} group={l.group} line={l.line} hot={hot === i} onHot={setHot} />)}
        </ol>
      </motion.div>
    </section>
  )
}

type Hot = { hot: boolean; onHot: (i: number | null) => void }

function Layer({ id, i, gap, p, hot, onHot }: { id: (typeof LAYERS)[number]["id"]; i: number; gap: number; p: MotionValue<number> } & Hot) {
  const pop = useSpring(hot ? 1 : 0, { stiffness: 260, damping: 22 })
  useEffect(() => { pop.set(hot ? 1 : 0) }, [hot, pop])
  const z = useTransform(() => lift(i, gap, p.get()) + pop.get() * 16 * apart(p.get()))
  const scale = useTransform(() => 1 + pop.get() * 0.045 * apart(p.get()))
  return (
    <motion.div className={`ex-layer ex-${id}${hot ? " hot" : ""}`} style={{ z, scale }} onPointerEnter={() => onHot(i)} onPointerLeave={() => onHot(null)}>
      {id === "display" && <><i className="bar" /><b>{person.first}</b><b className="accent">{person.last}</b><i className="line" /><i className="line short" /><i className="pill" /></>}
      {id === "board" && <><i className="chip main">AI</i><i className="chip" /><i className="chip small" /><i className="trace" /><i className="trace two" /></>}
      {id === "battery" && <><i className="cell"><b>100%</b></i><i className="level" /></>}
      {id === "frame" && <><i className="rib" /><i className="btn-a" /><i className="btn-b" /></>}
      {id === "back" && <><i className="cam"><u /><u /><u /></i><b>YK</b></>}
    </motion.div>
  )
}

function Label({ i, gap, p, part, group, line, hot, onHot }: { i: number; gap: number; p: MotionValue<number>; part: string; group: string; line: string } & Hot) {
  // a layer lifted along the phone's own axis moves straight up on screen by lift × sin(tilt)
  const y = useTransform(() => -lift(i, gap, p.get()) * Math.sin((TILT * lean(p.get()) * Math.PI) / 180))
  const opacity = useTransform(() => ss(0.35 + i * 0.05, 0.75 + i * 0.04, apart(p.get())))
  const items = skills.find((s) => s.group === group)?.items.slice(0, 5).join(" · ")
  return (
    <motion.li className={hot ? "ex-label hot" : "ex-label"} style={{ y, opacity }} onPointerEnter={() => onHot(i)} onPointerLeave={() => onHot(null)} onClick={() => onHot(hot ? null : i)}>
      <span className="label muted">{String(i + 1).padStart(2, "0")} · {part}<span className="ex-line"> · {line}</span></span>
      <b>{group}</b>
      <small>{items}</small>
    </motion.li>
  )
}
