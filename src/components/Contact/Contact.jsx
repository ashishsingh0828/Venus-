import { useEffect, useRef, useState } from 'react'
import { MapPin, PhoneCall, Clock, ArrowRight, ChevronDown, CheckCircle2, AlertCircle } from 'lucide-react'
import './Contact.css'

export default function ContactInfo() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  // Form State
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // { type: 'success' | 'error', text: '' }

  const dropdownRef = useRef(null)
  const contactRef = useRef(null)

  const subjects = [
    'Hospital & OT Doors',
    'Hermetic Sliding Doors',
    'Radiation Shielding Doors',
    'Surgical Pendants',
    'Surgical Scrub Sinks',
    'Motor Control Panels (MCP)',
    'Wholesale & Bulk Orders',
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject: selectedSubject || 'General Inquiry',
          message,
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Something went wrong. Please try again.')
      }

      setSubmitStatus({
        type: 'success',
        text: data.message || 'Thank you! Your message has been sent successfully.',
      })

      // Reset form fields
      setName('')
      setEmail('')
      setPhone('')
      setSelectedSubject('')
      setMessage('')
    } catch (err) {
      setSubmitStatus({
        type: 'error',
        text: err.message || 'Unable to submit your message. Please check your connection and try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div ref={contactRef} className="contact-page-wrapper">
      <div className="contact-cards-container">
        <div className={`contact-info-grid ${isVisible ? 'fade-in-up' : ''}`}>
          <div className="contact-info-card">
            <div className="card-icon">
              <MapPin size={28} />
            </div>
            <h3 className="card-title">Factory &amp; Office</h3>
            <p className="card-desc">
              Plot No 77, Sector 58, Adjoining Neelkamal Water Plant, Transport Nagar, Ballabgarh, Faridabad, Haryana 121004
            </p>
          </div>

          <div className="contact-info-card highlighted">
            <div className="card-icon">
              <PhoneCall size={28} />
            </div>
            <h3 className="card-title">
              <a href="tel:+919810730153" style={{ color: 'inherit', textDecoration: 'none' }}>
                +91 98107 30153
              </a>
            </h3>
            <p className="card-desc">
              Direct technical assistance &amp; commercial quotations.
            </p>
          </div>

          <div className="contact-info-card">
            <div className="card-icon">
              <Clock size={28} />
            </div>
            <h3 className="card-title">Business Hours</h3>
            <p className="card-desc">
              Open · Closes 5:00 PM
            </p>
          </div>
        </div>
      </div>

      <div className="contact-map-section">
        <div className="map-embed-wrapper">
          <iframe
            title="Venus Hospital Door Solutions Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3512.215902872569!2d77.3026491!3d28.322067199999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdbeb6a721603%3A0x5caa296006acecb7!2sVenus%20Hospital%20Door%20Solutions!5e0!3m2!1sen!2sin!4v1788849547791!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="contact-form-overlay-container">
          <div className={`contact-form-card ${isVisible ? 'fade-in-form' : ''}`}>
            <h2>Get in Touch</h2>

            {submitStatus && (
              <div
                className={`contact-alert ${
                  submitStatus.type === 'success'
                    ? 'contact-alert-success'
                    : 'contact-alert-error'
                }`}
              >
                {submitStatus.type === 'success' ? (
                  <CheckCircle2 size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}
                <span>{submitStatus.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  placeholder="Phone Number (e.g. +91 98107 30153)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="form-group" ref={dropdownRef}>
                <div
                  className={`custom-select-trigger ${isOpen ? 'active' : ''} ${
                    selectedSubject ? 'selected' : ''
                  }`}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span>{selectedSubject || 'Select Product / Service'}</span>
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
                  placeholder="Specify dimensions, leaf type, or project specifications... *"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="theme-btn form-submit-btn"
                disabled={isSubmitting}
                style={{ opacity: isSubmitting ? 0.7 : 1 }}
              >
                <span>{isSubmitting ? 'SUBMITTING...' : 'SUBMIT INQUIRY'}</span>
                <ArrowRight size={20} className="btn-arrow" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
