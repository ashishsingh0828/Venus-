import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, PhoneCall } from 'lucide-react'
import './AboutHome.css'

export default function AboutHome() {
  const [isVisible, setIsVisible] = useState(false)
  const [count, setCount] = useState(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let start = 0
    const end = 10
    const stepTime = 120

    const timer = setInterval(() => {
      start += 1
      setCount(start)
      if (start >= end) clearInterval(timer)
    }, stepTime)

    return () => clearInterval(timer)
  }, [isVisible])

  return (
    <section ref={sectionRef} className="about-section-4">
      <div className="about-wrapper-grid">
        <div className={`about-image-col ${isVisible ? 'slide-up' : ''}`}>
          <div className="about-img-box">
            <img
              src="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80"
              alt="Paving Craftsmanship"
              className="featured-image"
            />
            <div className="count-box">
              <h2>
                <span className="counter-number">{count}</span>+
              </h2>
              <p>
                years of <br /> experience
              </p>
            </div>
          </div>
        </div>

        <div className={`about-content-col ${isVisible ? 'slide-up-delay' : ''}`}>
          <div className="about-content">
            <span className="sub-title">About Us</span>
            <h2 className="title">Why Choose Us</h2>

            <p className="desc">
              We are a professional outdoor paving company dedicated to transforming
              driveways, patios, and outdoor spaces with high-quality long-lasting
              results, functional, and visually appealing paving solutions tailored to
              each client’s needs.
            </p>

            <div className="feature-columns">
              <ul className="feature-list">
                <li>
                  <span className="icon-circle">
                    <ArrowUpRight size={16} />
                  </span>
                  <span>Expert Craftsmanship</span>
                </li>
                <li>
                  <span className="icon-circle">
                    <ArrowUpRight size={16} />
                  </span>
                  <span>Reliable &amp; On-Time Service</span>
                </li>
              </ul>

              <ul className="feature-list">
                <li>
                  <span className="icon-circle">
                    <ArrowUpRight size={16} />
                  </span>
                  <span>Premium Quality Materials</span>
                </li>
                <li>
                  <span className="icon-circle">
                    <ArrowUpRight size={16} />
                  </span>
                  <span>Durable &amp; Long-Lasting Results</span>
                </li>
              </ul>
            </div>

            <div className="about-action-group">
              <a href="/about" className="theme-btn">
                <span>More About Us</span>
              </a>

              <div className="call-info">
                <div className="call-icon">
                  <PhoneCall size={20} />
                </div>
                <div className="call-text">
                  <span className="label">Call For Details</span>
                  <a href="tel:+8801234567980" className="number">
                    +880 1234 567980
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}