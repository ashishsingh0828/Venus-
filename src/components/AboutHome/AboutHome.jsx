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
    const end = 4
    const stepTime = 180

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
              src="/assets/images/Profile/about.png"
              alt="Venus Hospital Door Solutions Manufacturing"
              className="featured-image"
            />
            <div className="count-box">
              <h2>
                <span className="counter-number">{count}</span>+
              </h2>
              <p>
                years of <br /> excellence
              </p>
            </div>
          </div>
        </div>

        <div className={`about-content-col ${isVisible ? 'slide-up-delay' : ''}`}>
          <div className="about-content">
            <span className="sub-title">About Venus Hospital Door Solutions</span>
            <h2 className="title">Precision Engineering for Critical Healthcare Spaces</h2>

            <p className="desc">
              Established in 2022 in Faridabad, Haryana, Venus Hospital Door Solutions
              is a specialized manufacturer and supplier of high-performance Hospital Doors,
              Hermetic Operation Theater Doors, Automatic Sliding Doors, Motor Control Panels,
              and Surgical Pendants engineered to maintain pristine cleanroom standards.
            </p>

            <div className="feature-columns">
              <ul className="feature-list">
                <li>
                  <span className="icon-circle">
                    <ArrowUpRight size={16} />
                  </span>
                  <span>SS304 &amp; HPL Cleanroom Finish</span>
                </li>
                <li>
                  <span className="icon-circle">
                    <ArrowUpRight size={16} />
                  </span>
                  <span>Hermetic &amp; Radiation Shielding</span>
                </li>
              </ul>

              <ul className="feature-list">
                <li>
                  <span className="icon-circle">
                    <ArrowUpRight size={16} />
                  </span>
                  <span>In-House Factory Manufacturing</span>
                </li>
                <li>
                  <span className="icon-circle">
                    <ArrowUpRight size={16} />
                  </span>
                  <span>Custom Healthcare Engineering</span>
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
                  <span className="label">Call For Inquiries</span>
                  <a href="tel:+919810730153" className="number">
                    +91 98107 30153
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