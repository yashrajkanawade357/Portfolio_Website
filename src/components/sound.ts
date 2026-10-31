import { useSyncExternalStore } from "react"

/* tiny UI sounds, synthesised with Web Audio (no files). Off until the visitor turns them on. */
type Kind = "tap" | "click" | "ping" | "whoosh"

let ctx: AudioContext | null = null
let noise: AudioBuffer | null = null
let on = (() => { try { return localStorage.getItem("yk-sound") === "on" } catch { return false } })()
const subs = new Set<() => void>()

export function setSound(v: boolean) {
  on = v
  try { localStorage.setItem("yk-sound", v ? "on" : "off") } catch { /* private mode */ }
  subs.forEach((f) => f())
  if (v) play("tap")
}

export const useSound = () =>
  useSyncExternalStore((f) => { subs.add(f); return () => { subs.delete(f) } }, () => on, () => false)

function tone(c: AudioContext, freq: number, end: number, at: number, dur: number, vol: number, type: OscillatorType = "sine") {
  const o = c.createOscillator(), g = c.createGain()
  o.type = type
  o.frequency.setValueAtTime(freq, at)
  o.frequency.exponentialRampToValueAtTime(end, at + dur)
  g.gain.setValueAtTime(vol, at)
  g.gain.exponentialRampToValueAtTime(0.0001, at + dur)
  o.connect(g).connect(c.destination)
  o.start(at); o.stop(at + dur + 0.02)
}

function burst(c: AudioContext, at: number, dur: number, vol: number, filter: BiquadFilterType, from: number, to: number) {
  if (!noise) {
    noise = c.createBuffer(1, c.sampleRate * 0.5, c.sampleRate)
    const d = noise.getChannelData(0)
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
  }
  const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain()
  s.buffer = noise
  f.type = filter
  f.frequency.setValueAtTime(from, at)
  f.frequency.exponentialRampToValueAtTime(to, at + dur)
  g.gain.setValueAtTime(vol, at)
  g.gain.exponentialRampToValueAtTime(0.0001, at + dur)
  s.connect(f).connect(g).connect(c.destination)
  s.start(at); s.stop(at + dur + 0.02)
}

export function play(kind: Kind) {
  if (!on) return
  try {
    ctx ??= new AudioContext()
    if (ctx.state === "suspended") void ctx.resume()
    const t = ctx.currentTime + 0.005
    if (kind === "tap") tone(ctx, 900, 620, t, 0.06, 0.04)
    if (kind === "click") { burst(ctx, t, 0.035, 0.22, "bandpass", 2200, 1600); tone(ctx, 140, 70, t, 0.08, 0.12) }
    if (kind === "ping") { tone(ctx, 1320, 1300, t, 0.28, 0.05); tone(ctx, 1760, 1740, t + 0.09, 0.32, 0.05) }
    if (kind === "whoosh") burst(ctx, t, 0.26, 0.07, "lowpass", 380, 2400)
  } catch { /* audio unavailable */ }
}
