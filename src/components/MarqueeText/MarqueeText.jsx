import './MarqueeText.css'

const marqueeItems = [
  'Hospital & OT Doors',
  'Hermetically Sealed Doors',
  'Lead-Lined Radiation Doors',
  'Automatic Sliding Systems',
  'Surgical Pendants',
  'Surgical Scrub Sinks',
  'Motor Control Panels',
]

export default function MarqueeText() {
  return (
    <section className="marquee-wrapper-modern">
      <div className="marquee-track">
        <div className="marquee-content">
          {marqueeItems.map((text, i) => (
            <div key={`m1-${i}`} className="marquee-node">
              <span className="marquee-text-outline">{text}</span>
              <span className="marquee-separator">
                <img src="/assets/images/star.png" alt="star" />
              </span>
            </div>
          ))}
        </div>

        <div className="marquee-content" aria-hidden="true">
          {marqueeItems.map((text, i) => (
            <div key={`m2-${i}`} className="marquee-node">
              <span className="marquee-text-outline">{text}</span>
              <span className="marquee-separator">
                <img src="/assets/images/star.png" alt="star" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}