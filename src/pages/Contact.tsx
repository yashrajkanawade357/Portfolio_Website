import { useState, type FormEvent } from "react"
import { person } from "../data"
import { useTitle } from "../components/ui"
import { Foot } from "./Home"

type State = "idle" | "sending" | "sent" | "error"

export default function Contact() {
  useTitle("Contact")
  const [state, setState] = useState<State>("idle")
  const [copied, setCopied] = useState(false)

  // FormSubmit relays the message to my inbox (no backend needed)
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    if (data.get("_honey")) return
    setState("sending")
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${person.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.get("name"), email: data.get("email"), message: data.get("message"),
          _subject: `Portfolio message from ${data.get("name")}`, _template: "table", _captcha: "false",
        }),
      })
      const out = await res.json().catch(() => ({}))
      setState(res.ok && String(out.success) === "true" ? "sent" : "error")
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
              <a className="email" href={`mailto:${person.email}`}>{person.email.split("@")[0]}<wbr />@{person.email.split("@")[1]}</a>
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
              <form className="form" onSubmit={submit}>
                <p hidden><label>Leave this empty <input name="_honey" tabIndex={-1} autoComplete="off" /></label></p>
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
          <figure className="contact-photo"><img src="/media/photos/contact-hero.webp" alt="Yashraj Kanawade with arms open, smiling" /></figure>
        </div>
      </section>
      <Foot />
    </>
  )
}
