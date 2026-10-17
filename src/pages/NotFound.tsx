import { Link } from "react-router-dom"
import { useTitle } from "../components/ui"

export default function NotFound() {
  useTitle("Not found")
  return (
    <section className="sec dark cta" style={{ minHeight: "60vh", alignContent: "center", paddingTop: "max(64px, 7cqw)" }}>
      <p className="label muted">404</p>
      <h1 className="display" style={{ fontSize: "max(56px, 10cqw)" }}>This page didn't <span className="accent">unfold.</span></h1>
      <Link className="btn btn-pulse" to="/">Back home</Link>
    </section>
  )
}
