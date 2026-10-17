import { useState, type FormEvent } from "react"
import { person } from "../data"
import { useTitle } from "../components/ui"
import { Foot } from "./Home"

type State = "idle" | "sending" | "sent" | "error"

export default function Contact() {
  useTitle("Contact")
  const [state, setState] = useState<State>("idle")
  const [copied, setCopied] = useState(false)

  // Netlify Forms: post url-encoded fields to "/" with the form's name
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState("sending")
    const data = new FormData(e.currentTarget)
    data.set("form-name", "contact")
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      })
      setState(res.ok ? "sent" : "error")
    } catch { setState("error") }
  }

  async function copy() {
    try { await navigator.clipboard.writeText(person.email); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { /* ignore */ }
  }

  return (
    <>
      <section className="sec light contact" style={{ paddingTop: "max(64px, 7cqw)" }}>
        <div className="contact-grid">
          <div>
            <p className="label muted">Contact</p>
            <h1 className="display">Let's build something <span style={{ color: "#c79d00" }}>useful.</span></h1>
            <div className="row">
              <a className="email" href={`mailto:${person.email}`}>{person.email}</a>
              <button className="btn btn-ghost" onClick={copy} style={{ padding: "8px 14px" }}>{copied ? "Copied ✓" : "Copy"}</button>
            </div>
            <div className="row" style={{ marginTop: 18 }}>
              <a className="btn btn-ink" href={person.github} target="_blank" rel="noreferrer">GitHub ↗</a>
              <a className="btn btn-ink" href={person.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a className="btn btn-ink" href="https://vyora-3d282.web.app/" target="_blank" rel="noreferrer">Vyora ↗</a>
            </div>

            <h2 className="label" style={{ margin: "40px 0 4px" }}>Write to me</h2>
            <p className="label muted" style={{ marginBottom: 10 }}>I usually reply within a day or two</p>
            {state === "sent" ? (
              <p className="form"><span className="ok">Thanks, your message is on its way. I'll get back to you soon.</span></p>
            ) : (
              <form className="form" name="contact" method="POST" onSubmit={submit}>
                <input type="hidden" name="form-name" value="contact" />
                <p hidden><label>Leave this empty <input name="bot-field" /></label></p>
                <label><span className="label muted">Your name</span><input name="name" required autoComplete="name" /></label>
                <label><span className="label muted">Email</span><input name="email" type="email" required autoComplete="email" /></label>
                <label><span className="label muted">Your message</span><textarea name="message" required /></label>
                {state === "error" && <span className="err">That didn't send. Email me directly at {person.email}.</span>}
                <button className="btn btn-pulse" type="submit" disabled={state === "sending"} style={{ justifySelf: "start" }}>
                  {state === "sending" ? "Sending…" : "Send message ↗"}
                </button>
              </form>
            )}
          </div>
          <figure className="contact-photo"><img src="/media/photos/contact-welcome.jpg" alt="Yashraj Kanawade with arms open, smiling" /></figure>
        </div>
      </section>
      <Foot />
    </>
  )
}
