import { useEffect, useRef, useState, type ReactNode } from "react"
import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react"

/** Live hh:mm and a long date, refreshed every 15 s. */
export function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 15000)
    return () => window.clearInterval(id)
  }, [])
  const time = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
  const date = now.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })
  return { time, date }
}

export function useTitle(title: string) {
  useEffect(() => {
    document.title = title ? `${title} — Yashraj Kanawade` : "Yashraj Kanawade — CSE @ VIT Vellore"
  }, [title])
}

/** Counts from 0 to `to` the first time it scrolls into the device's screen. */
export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const value = useMotionValue(0)
  const text = useTransform(() => `${Math.round(value.get())}${suffix}`)
  useEffect(() => {
    if (!inView) return
    const c = animate(value, to, { duration: 1.4, ease: [0.16, 1, 0.3, 1] })
    return () => c.stop()
  }, [inView, to, value])
  return <motion.span ref={ref}>{text}</motion.span>
}

/** Rises in once it enters the screen. Starts visible for no-JS/reduced-motion paths via MotionConfig. */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ type: "spring", bounce: 0, visualDuration: 0.7, delay }}
    >
      {children}
    </motion.div>
  )
}
