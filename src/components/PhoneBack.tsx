import { certificates, person, projects } from "../data"

/* the back of the phone: camera island, an engraved mark and a spec sheet. Seen when the phone is flipped. */
export default function PhoneBack({ radius, depth }: { radius: number; depth: number }) {
  const shipped = projects.filter((p) => !p.status).length
  return (
    <div
      className="face rear" aria-hidden
      // mirrored by the flip, so the square (hinge) edge is on this element's right
      style={{ borderRadius: `${radius}px 0 0 ${radius}px`, transform: `rotateY(180deg) translateZ(${depth}px)` }}
    >
      <div className="rear-cam"><i /><i /><i /><u /></div>
      <div className="rear-mark">YK</div>
      <div className="rear-spec">
        <span>Model YK-29 · B.Tech CSE · VIT Vellore</span>
        <span>{shipped} projects shipped · {certificates.length} certificates · Class of 2029</span>
        <span>Designed and assembled by {person.name}</span>
      </div>
    </div>
  )
}
