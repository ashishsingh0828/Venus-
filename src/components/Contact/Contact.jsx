import { useEffect, useRef, useState } from 'react'
import { MapPin, Mail, PhoneCall, ArrowRight, ChevronDown } from 'lucide-react'
import './Contact.css'

export default function ContactInfo() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const contactRef = useRef(null)

  const subjects = [
    'Exterior Paving',
    'Patio Solutions',
    'Commercial Project',
    'Price Inquiry',
    'Complaints & Feedback',
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    if (contactRef.current) {
      observer.observe(contactRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={contactRef} className="contact-page-wrapper">
      <div className="contact-cards-container">
        <div className={`contact-info-grid ${isVisible ? 'fade-in-up' : ''}`}>
          <div className="contact-info-card">
            <div className="card-icon">
              <MapPin size={28} />
            </div>
            <h3 className="card-title">Our Address</h3>
            <p className="card-desc">
              4517 Washington Ave. Manchester, Kentucky 39495
            </p>
          </div>

          <div className="contact-info-card highlighted">
            <div className="card-icon">
              <Mail size={28} />
            </div>
            <h3 className="card-title">info@example.com</h3>
            <p className="card-desc">
              Email us anytime for any kind of query.
            </p>
          </div>

          <div className="contact-info-card">
            <div className="card-icon">
              <PhoneCall size={28} />
            </div>
            <h3 className="card-title">Hot: +208-666-01112</h3>
            <p className="card-desc">
              24/7/365 priority Live Chat and ticketing support.
            </p>
          </div>
        </div>
      </div>

      <div className="contact-map-section">
        <div className="map-embed-wrapper">
          <iframe
            title="Google Map Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3603.089339929686!2d89.05573007608758!3d25.435276522015172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fcb92fb4d9696d%3A0x74b18fed6b93e5e5!2sNobabgonj%20National%20garden!5e0!3m2!1sen!2sbd!4v1727839220309!5m2!1sen!2sbd"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="contact-form-overlay-container">
          <div className={`contact-form-card ${isVisible ? 'fade-in-form' : ''}`}>
            <h2>Get in Touch</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <input type="text" placeholder="Full Name" required />
              </div>

              <div className="form-group">
                <input type="email" placeholder="Email Address" required />
              </div>

              <div className="form-group" ref={dropdownRef}>
                <div
                  className={`custom-select-trigger ${isOpen ? 'active' : ''} ${
                    selectedSubject ? 'selected' : ''
                  }`}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span>{selectedSubject || 'Select Subject'}</span>
                  <ChevronDown
                    size={20}
                    className={`select-arrow ${isOpen ? 'rotated' : ''}`}
                  />
                </div>

                {isOpen && (
                  <ul className="custom-select-menu">
                    {subjects.map((subj, index) => (
                      <li
                        key={index}
                        className={`custom-option ${
                          selectedSubject === subj ? 'active-option' : ''
                        }`}
                        onClick={() => {
                          setSelectedSubject(subj)
                          setIsOpen(false)
                        }}
                      >
                        {subj}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="form-group">
                <textarea
                  rows="4"
                  placeholder="Write your message here..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="theme-btn form-submit-btn">
                <span>SUBMIT NOW</span>
                <ArrowRight size={20} className="btn-arrow" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}