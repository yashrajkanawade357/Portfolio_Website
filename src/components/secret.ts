import { createContext, useContext } from "react"

/* the little reward: open every project and a notification says thanks */
export function markSeen(slug: string, all: string[]) {
  try {
    const seen = new Set<string>(JSON.parse(localStorage.getItem("yk-seen") || "[]"))
    seen.add(slug)
    localStorage.setItem("yk-seen", JSON.stringify([...seen]))
    if (localStorage.getItem("yk-award") || !all.every((s) => seen.has(s))) return
    localStorage.setItem("yk-award", "1")
    window.dispatchEvent(new Event("yk-award"))
  } catch { /* private mode */ }
}

/* the 404 page tells the shell to drop the signal bars */
export const SignalContext = createContext<(v: boolean) => void>(() => {})
export const useSignal = () => useContext(SignalContext)
