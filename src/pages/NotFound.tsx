import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useTitle } from "../components/ui"
import { useSignal } from "../components/secret"
import { AppGrid } from "./parts"

export default function NotFound() {
  useTitle("Not found")
  const setSignal = useSignal()
  useEffect(() => { setSignal(false); return () => setSignal(true) }, [setSignal])
  return (
    <section className="sec dark nosignal" style={{ paddingTop: "max(64px, 7cqw)" }}>
      <div className="ns-dialog" role="alert">
        <span className="ns-bars" aria-hidden><i /><i /><i /><i /></span>
        <p className="label muted">404 · No signal</p>
        <h1 className="display">This page didn't <span className="accent">unfold.</span></h1>
        <p className="muted">The link may be old, or the page has moved. Open one of these instead:</p>
        <Link className="btn btn-pulse" to="/">Back home</Link>
      </div>
      <AppGrid />
    </section>
  )
}
