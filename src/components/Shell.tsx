import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  AnimatePresence, animate, motion, useMotionTemplate, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll,
  useSpring, useTransform, type MotionValue,
} from "motion/react"
import LockScreen from "./LockScreen"
import { LaunchContext, type Launch } from "./launch"
import { person } from "../data"
import { useClock } from "./ui"

/* pages sit left to right in nav order, so transitions slide the way you're going */
const ORDER = ["/", "/work", "/projects", "/archive", "/about", "/contact"]
const rank = (p: string) => {
  const i = ORDER.findIndex((o) => (o === "/" ? p === "/" : p.startsWith(o)))
  return i < 0 ? ORDER.length : i
}
const PAGE = {
  enter: (d: number) => ({ opacity: 0, x: d * 56 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d * -56 }),
}

/* a short tap on phones that support it (Android); ignored elsewhere */
export const tick = () => { try { if (matchMedia("(pointer: coarse)").matches) navigator.vibrate?.(8) } catch { /* unsupported */ } }

/* ── settings the visitor can change ─────────────────────────────── */
const SCENES = [["glow", "Glow"], ["orbit", "Orbit"]] as const
type Scene = (typeof SCENES)[number][0]
const FINISHES = {
  titanium: { frame: "#d9d6cf", edge: "#a6a29b", label: "Titanium" },
  graphite: { frame: "#3a3a3d", edge: "#1c1c1e", label: "Graphite" },
  coral: { frame: "#e48a6f", edge: "#b4604a", label: "Coral" },
  sage: { frame: "#a9baa3", edge: "#7c8f76", label: "Sage" },
} as const
type Finish = keyof typeof FINISHES

function useStored<T extends string>(key: string, initial: T, allowed: readonly string[]) {
  const [v, setV] = useState<T>(() => {
    try { const s = localStorage.getItem(key); return s && allowed.includes(s) ? (s as T) : initial } catch { return initial }
  })
  const set = (n: T) => { setV(n); try { localStorage.setItem(key, n) } catch { /* private mode */ } }
  return [v, set] as const
}

/* ── geometry ────────────────────────────────────────────────────── */
function useViewport() {
  const [v, setV] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }))
  useEffect(() => {
    let last = { w: window.innerWidth, h: window.innerHeight }
    const on = () => {
      const w = window.innerWidth, h = window.innerHeight
      // phones resize the viewport when the URL bar slides; only react to real changes
      if (w !== last.w || Math.abs(h - last.h) > 120) { last = { w, h }; setV(last) }
    }
    window.addEventListener("resize", on)
    return () => window.removeEventListener("resize", on)
  }, [])
  return v
}

function geometry(w: number, h: number) {
  const portrait = w < 760 || w / h < 0.9
  // real phones: the device fills the whole screen, with just a thin frame
  if (w < 600) return { portrait, phone: true, W: w - 8, H: h - 8, b: 5, r: 36 }
  if (portrait) {
    const W = Math.round(Math.min(600, w - 60))
    const H = Math.round(Math.min(h - 96, W * 2.1))
    return { portrait, phone: false, W, H, b: 9, r: 34 }
  }
  const W = Math.round(Math.min(1300, w * 0.92, (h - 120) / 0.64))
  return { portrait, phone: false, W, H: Math.round(W * 0.64), b: 12, r: 30 }
}

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/* ── the shell: page chrome + the folding device ─────────────────── */
export default function Shell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const fold = pathname === "/"
  const vp = useViewport()
  const g = geometry(vp.w, vp.h)
  const reduce = useReducedMotion()
  const [scene, setScene] = useStored<Scene>("yk-scene", "glow", SCENES.map((s) => s[0]))
  const [finish, setFinish] = useStored<Finish>("yk-finish", "titanium", Object.keys(FINISHES))

  const sw = g.W - 2 * g.b
  const sh = g.H - 2 * g.b
  const unfold = fold ? Math.round(vp.h * (g.portrait ? 0.85 : 1.15)) : 0

  // the screen's content is taller than the screen; page scroll moves it inside
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentH, setContentH] = useState(0)
  useLayoutEffect(() => {
    const el = contentRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setContentH(el.offsetHeight))
    ro.observe(el)
    setContentH(el.offsetHeight)
    return () => ro.disconnect()
  }, [])
  const dist = Math.max(0, contentH - sh)

  // geometry as motion values, so the scroll transforms follow resizes
  const unfoldMV = useMotionValue(unfold)
  const distMV = useMotionValue(dist)
  const quarterMV = useMotionValue(g.W / 4)
  const heightMV = useMotionValue(g.H)
  useEffect(() => { unfoldMV.set(unfold); distMV.set(dist); quarterMV.set(g.W / 4); heightMV.set(g.H) },
    [unfold, dist, g.W, g.H, unfoldMV, distMV, quarterMV, heightMV])

  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  const { scrollY } = useScroll()
  const smooth = useSpring(scrollY, { stiffness: 260, damping: 38, mass: 0.35 })
  const s = reduce ? scrollY : smooth

  const u = useTransform(() => { const un = unfoldMV.get(); return un > 0 ? clamp(s.get() / un) : 1 })
  const ue = useTransform(() => ease(u.get()))
  const leafRot = useTransform(() => 180 * (1 - ue.get()))
  const devX = useTransform(() => -quarterMV.get() * (1 - ue.get()))
  const wake = useTransform(() => clamp((u.get() - 0.8) / 0.2))
  const contentY = useTransform(() => -clamp(s.get() - unfoldMV.get(), 0, distMV.get()))
  const lockY = useTransform(() => -heightMV.get() * 1.04 * ue.get())
  const nameOpacity = useTransform(() => 1 - clamp(u.get() / 0.45))
  const nameRight = useTransform(() => u.get() * quarterMV.get())
  const nameLeft = useTransform(() => -u.get() * quarterMV.get())
  const shadowScale = useTransform(() => 0.5 + 0.5 * ue.get())

  const [open, setOpen] = useState(!fold)
  useEffect(() => setOpen(u.get() > 0.6), [fold, u])

  // the hinge "clicks" when it reaches flat: a tiny settle and a light sweep across the screen
  const settle = useMotionValue(1)
  const sweep = useMotionValue(-120)
  const sweepX = useMotionTemplate`${sweep}%`
  const locked = useRef(true)
  useMotionValueEvent(u, "change", (v) => {
    setOpen(v > 0.6)
    if (!fold || g.portrait || reduce) return
    if (v < 0.9) locked.current = false
    else if (v >= 0.999 && !locked.current) {
      locked.current = true
      animate(settle, [1, 1.012, 1], { duration: 0.42, ease: "easeOut" })
      sweep.set(-120)
      animate(sweep, 120, { duration: 0.9, ease: [0.3, 0, 0.2, 1] })
    }
  })

  // on a laptop the phone leans toward the cursor and light glints off the glass
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness: 90, damping: 18 })
  const sy = useSpring(py, { stiffness: 90, damping: 18 })
  const tiltY = useTransform(() => (sx.get() - 0.5) * 9)
  const tiltX = useTransform(() => (0.5 - sy.get()) * 7)
  const glare = useMotionTemplate`radial-gradient(70% 90% at ${useTransform(() => sx.get() * 100)}% ${useTransform(() => sy.get() * 100)}%, rgba(255,255,255,.13), rgba(255,255,255,0) 60%)`
  const tilt = !g.portrait && !reduce
  useEffect(() => {
    if (!tilt || !matchMedia("(pointer: fine)").matches) return
    const move = (e: PointerEvent) => { px.set(e.clientX / window.innerWidth); py.set(e.clientY / window.innerHeight) }
    const leave = () => { px.set(0.5); py.set(0.5) }
    window.addEventListener("pointermove", move)
    document.documentElement.addEventListener("pointerleave", leave)
    return () => { window.removeEventListener("pointermove", move); document.documentElement.removeEventListener("pointerleave", leave) }
  }, [tilt, px, py])

  // page transitions: slide in the direction of travel
  const prevPath = useRef(pathname)
  const dir = rank(pathname) >= rank(prevPath.current) ? 1 : -1
  useEffect(() => { prevPath.current = pathname }, [pathname])

  // opening a project card: its image grows to fill the screen, then the page loads underneath
  const navigate = useNavigate()
  const screenRef = useRef<HTMLDivElement>(null)
  const [launching, setLaunching] = useState<null | { src: string; to: string; tint: string; x: number; y: number; w: number; h: number }>(null)
  const launch: Launch = (src, from, to, tint) => {
    const scr = screenRef.current
    if (!scr || reduce || launching) return false
    const s = scr.getBoundingClientRect(), r = from.getBoundingClientRect()
    const k = scr.offsetWidth / s.width
    setLaunching({ src, to, tint, x: (r.left - s.left) * k, y: (r.top - s.top) * k, w: r.width * k, h: r.height * k })
    tick()
    // the page swaps in underneath while the image is still settling
    setTimeout(() => navigate(to), 380)
    return true
  }
  useEffect(() => {
    if (!launching || pathname !== launching.to) return
    const t = setTimeout(() => setLaunching(null), 420)
    return () => clearTimeout(t)
  }, [pathname, launching])

  const unfoldNow = () => window.scrollTo({ top: unfold, behavior: reduce ? "auto" : "smooth" })

  // keyboard users: bring a focused link inside the screen into view
  const onFocus = (e: React.FocusEvent) => {
    const c = contentRef.current
    if (!c) return
    const top = (e.target as HTMLElement).getBoundingClientRect().top - c.getBoundingClientRect().top
    const want = unfold + clamp(top - sh * 0.35, 0, dist)
    if (Math.abs(window.scrollY - want) > 30) window.scrollTo({ top: want })
  }

  // "KANAWADE" is the longer half; ~0.5em per letter in the condensed black face
  const nameSize = Math.min(((vp.w - g.W / 2) / 2 - 64) / (8 * 0.5), vp.h * 0.36)
  const lockStyle: CSSProperties = { inset: g.b, borderRadius: g.r - g.b }

  return (
    <div className={`app scene-${scene}`} style={{ "--frame": FINISHES[finish].frame, "--edge": FINISHES[finish].edge } as CSSProperties}>
      <SceneLayer scene={scene} />

      {g.phone && <LaptopHint />}

      {!g.phone && <header className="topbar">
        <Link to="/" className="logo">{person.name}</Link>
        <div className="switch" role="group" aria-label="Background">
          {SCENES.map(([id, label]) => (
            <button key={id} aria-pressed={scene === id} onClick={() => setScene(id)}>
              {scene === id && <motion.span layoutId="scene-pill" className="pill" transition={{ type: "spring", bounce: 0.2, visualDuration: 0.35 }} />}
              <span>{label}</span>
            </button>
          ))}
        </div>
      </header>}

      <div className="track" style={{ height: vp.h + unfold + dist }}>
        <div className="stage">
          {fold && !g.portrait && (
            <>
              <motion.div className="name" aria-hidden style={{ fontSize: nameSize, right: `calc(50% + ${g.W / 4 + 22}px)`, x: nameLeft, opacity: nameOpacity }}>{person.first}</motion.div>
              <motion.div className="name" aria-hidden style={{ fontSize: nameSize, left: `calc(50% + ${g.W / 4 + 22}px)`, x: nameRight, opacity: nameOpacity }}>{person.last}</motion.div>
            </>
          )}
          <motion.div className="shadow" style={{ width: g.W * 0.95, top: `calc(50% + ${g.H / 2 + 4}px)`, scaleX: g.portrait ? 1 : shadowScale }} />

          <motion.div
            className="device"
            style={{ width: g.W, height: g.H, x: g.portrait ? 0 : devX, scale: settle, ...(tilt ? { rotateX: tiltX, rotateY: tiltY } : {}) }}
            initial={{ y: 70 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", bounce: 0.15, visualDuration: 0.9 }}
          >
            {g.portrait ? (
              <div className="face" style={{ borderRadius: g.r }}>
                <div className="glass off" style={{ inset: g.b, borderRadius: g.r - g.b }} />
              </div>
            ) : (
              <>
                {/* right half: always flat, the inner screen's right side */}
                {/* once open, it tucks 2px under the left half so no hairline shows at the hinge */}
                <div className="leaf" style={{ left: g.W / 2 - (open ? 2 : 0), width: g.W / 2 + (open ? 2 : 0), transform: "translateZ(-1px)" }}>
                  <div className="face" style={{ borderRadius: `0 ${g.r}px ${g.r}px 0` }}>
                    <div className="glass off" style={{ inset: `${g.b}px ${g.b}px ${g.b}px ${open ? 2 : 0}px`, borderRadius: `0 ${g.r - g.b}px ${g.r - g.b}px 0` }} />
                    <span className="side-btn" style={{ right: -3, top: "22%", height: 46 }} />
                    <span className="side-btn" style={{ right: -3, top: "32%", height: 28 }} />
                  </div>
                </div>
                {/* left half: swings on the hinge; its outside is the cover screen */}
                <motion.div className="leaf" style={{ left: 0, width: g.W / 2, rotateY: leafRot, originX: 1, originY: 0.5 }}>
                  <div className="face" style={{ borderRadius: `${g.r}px 0 0 ${g.r}px` }}>
                    <div className="glass off" style={{ inset: `${g.b}px 0 ${g.b}px ${g.b}px`, borderRadius: `${g.r - g.b}px 0 0 ${g.r - g.b}px` }} />
                  </div>
                  <div className="face back" style={{ borderRadius: g.r }} inert={open}>
                    {fold && <LockScreen onUnfold={unfoldNow} style={lockStyle} />}
                    {fold && tilt && <Glare bg={glare} style={lockStyle} />}
                  </div>
                </motion.div>
              </>
            )}

            {/* the inner screen: wakes once the device is open */}
            <motion.div
              ref={screenRef}
              className="screen"
              style={{ left: g.b, top: g.b, width: sw, height: sh, borderRadius: g.r - g.b, opacity: g.portrait ? 1 : wake, pointerEvents: open || g.portrait ? "auto" : "none" }}
            >
              <motion.div ref={contentRef} className="screen-content" style={{ y: contentY }} onFocus={onFocus}>
                <LaunchContext.Provider value={launch}>
                  <AnimatePresence mode="wait" initial={false} custom={dir}>
                    <motion.div
                      key={pathname} custom={dir} variants={PAGE} initial="enter" animate="center" exit="exit"
                      transition={{ x: { type: "spring", bounce: 0, visualDuration: 0.34 }, opacity: { duration: 0.22 } }}
                    >
                      {children}
                    </motion.div>
                  </AnimatePresence>
                </LaunchContext.Provider>
              </motion.div>
              {tilt && <Glare bg={glare} />}
              {tilt && <motion.div className="sweep" aria-hidden style={{ x: sweepX }} />}
              {!g.phone && <StatusBar />}
              <div className="screen-fade" />
              <ScreenNav pathname={pathname} />

              <AnimatePresence>
                {launching && (
                  <motion.div
                    className="launch" aria-hidden
                    style={{ background: launching.tint }}
                    initial={{ left: launching.x, top: launching.y, width: launching.w, height: launching.h, borderRadius: 16 }}
                    animate={{ left: 0, top: 0, width: sw, height: sh, borderRadius: g.r - g.b }}
                    exit={{ opacity: 0, transition: { duration: 0.35 } }}
                    transition={{ type: "spring", bounce: 0.1, visualDuration: 0.42 }}
                  >
                    <img src={launching.src} alt="" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* phones: the cover screen slides up to reveal the inside */}
            {g.portrait && fold && (
              <div style={{ position: "absolute", inset: g.b, borderRadius: g.r - g.b, overflow: "hidden", transform: "translateZ(4px)" }} inert={open}>
                <motion.div style={{ position: "absolute", inset: 0, y: lockY }}>
                  <LockScreen onUnfold={unfoldNow} style={{ inset: 0 }} />
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {!g.portrait && (
        <div className="finishes" role="group" aria-label="Device finish">
          {(Object.keys(FINISHES) as Finish[]).map((f) => (
            <button key={f} aria-label={FINISHES[f].label} aria-pressed={finish === f} style={{ background: FINISHES[f].frame }} onClick={() => setFinish(f)} />
          ))}
        </div>
      )}
    </div>
  )
}

/* phones get the full-screen layout; mention once that the fold lives on bigger screens */
function LaptopHint() {
  const [show, setShow] = useState(() => { try { return !localStorage.getItem("yk-hint") } catch { return false } })
  const close = () => { setShow(false); try { localStorage.setItem("yk-hint", "1") } catch { /* private mode */ } }
  useEffect(() => {
    if (!show) return
    const t = setTimeout(close, 7000)
    return () => clearTimeout(t)
  }, [show])
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="hint" role="status"
          initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
          transition={{ type: "spring", bounce: 0.2, visualDuration: 0.4, delay: 0.8 }}
        >
          <span>Open on a laptop to watch the phone unfold.</span>
          <button onClick={close} aria-label="Dismiss">✕</button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Glare({ bg, style }: { bg: MotionValue<string>; style?: CSSProperties }) {
  return <motion.div className="glare" aria-hidden style={{ ...style, background: bg }} />
}

function StatusBar() {
  const { time } = useClock()
  return (
    <div className="statusbar" aria-hidden>
      <span>{time}</span>
      <span>5G<i className="bat" /></span>
    </div>
  )
}

const NAV = [["/", "Home"], ["/work", "Work"], ["/archive", "Archive"], ["/about", "About"], ["/contact", "Contact"]] as const

function ScreenNav({ pathname }: { pathname: string }) {
  return (
    <nav className="screen-nav" aria-label="Main">
      {NAV.map(([to, label]) => {
        const active = to === "/" ? pathname === "/" : pathname.startsWith(to) || (to === "/work" && pathname.startsWith("/projects"))
        return (
          <Link key={to} to={to} aria-current={active ? "page" : undefined} onClick={tick}>
            {active && <motion.span layoutId="nav-pill" className="pill" transition={{ type: "spring", bounce: 0.2, visualDuration: 0.35 }} />}
            <span>{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

function SceneLayer({ scene }: { scene: Scene }) {
  if (scene === "glow")
    return (
      <div className="scene" aria-hidden>
        <motion.div className="glow-blob" style={{ background: "#f5c518", left: "-8%", top: "-18%" }}
          animate={{ x: [0, 90, 0], y: [0, 50, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="glow-blob" style={{ background: "#e48a6f", right: "-10%", bottom: "-24%" }}
          animate={{ x: [0, -70, 0], y: [0, -40, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} />
      </div>
    )
  if (scene === "orbit")
    return (
      <div className="scene" aria-hidden>
        <svg className="orbit-svg" viewBox="-100 -100 200 200">
          {[26, 40, 56, 74, 94].map((r, i) => (
            <motion.g key={r} animate={{ rotate: i % 2 ? -360 : 360 }} transition={{ duration: 70 + i * 25, repeat: Infinity, ease: "linear" }}>
              <circle r={r} fill="none" stroke="rgba(244,243,240,.09)" strokeWidth={0.18} />
              <circle cx={r} cy={0} r={i === 2 ? 0.9 : 0.55} fill={i === 2 ? "#f5c518" : "rgba(244,243,240,.6)"} />
            </motion.g>
          ))}
        </svg>
      </div>
    )
  return null
}
