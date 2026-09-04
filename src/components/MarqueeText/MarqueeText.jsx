import './MarqueeText.css'

const marqueeItems = [
  'Exterior Paving',
  'Patio Installation',
  'Driveway Solutions',
  'Commercial Surfaces',
  'Stone Crafting',
  'Landscape Architecture',
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