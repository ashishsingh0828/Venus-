import { Link } from 'react-router-dom'
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Layers,
} from 'lucide-react'
import './Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer-wood-section">
      <div className="footer-cta-container">
        <div className="footer-cta-box">
          <div className="cta-left">
            <h3>Ready to Build Your Dream Outdoor Space?</h3>
            <p>
              Get in touch with our expert paving consultants for a tailored solution and estimate.
            </p>
          </div>
          <div className="cta-right">
            <Link to="/contact" className="theme-btn cta-btn">
              <span>GET IN TOUCH</span>
              <ArrowRight size={18} className="cta-arrow" />
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-main-content">
        <div className="footer-inner-container">
          <div className="footer-four-columns">
            <div className="footer-col brand-col">
              <div className="brand-header">
                <div className="brand-logo-icon">
                  <Layers size={32} />
                </div>
                <div className="brand-titles">
                  <h2>VENUS</h2>
                  <span>Floor &amp; Paving Services</span>
                </div>
              </div>
              <p className="brand-paragraph">
                Venus is dedicated to outdoor paving and flooring craftsmanship. We
                transform driveways, walkways, and patios with durable, visually
                appealing solutions built to endure.
              </p>
              <div className="social-square-list">
                <a href="#facebook" aria-label="Facebook">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a href="#twitter" aria-label="Twitter">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
                <a href="#linkedin" aria-label="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-col links-col">
              <h3 className="widget-header">OUR PRODUCTS</h3>
              <div className="header-divider"></div>
              <ul className="footer-list">
                <li><Link to="/services">Driveway Paving</Link></li>
                <li><Link to="/services">Stone Pathways</Link></li>
                <li><Link to="/services">Patio Pavers</Link></li>
                <li><Link to="/services">Walkway Solutions</Link></li>
                <li><Link to="/services">Retaining Walls</Link></li>
              </ul>
            </div>

            <div className="footer-col info-col">
              <h3 className="widget-header">CONTACT INFO</h3>
              <div className="header-divider"></div>
              <ul className="contact-details">
                <li>
                  <Phone size={18} className="info-icon" />
                  <a href="tel:+13209876543">+1 (320) 987-6543</a>
                </li>
                <li>
                  <Mail size={18} className="info-icon" />
                  <a href="mailto:info@venuspaving.com">info@venuspaving.com</a>
                </li>
                <li>
                  <MapPin size={18} className="info-icon" />
                  <span>4841 Smith Avenue, Amarillo, Texas 79101</span>
                </li>
              </ul>
            </div>

            <div className="footer-col newsletter-col">
              <h3 className="widget-header">NEWSLETTER</h3>
              <div className="header-divider"></div>
              <p className="newsletter-text">
                Subscribe to our newsletter for updates, materials catalog, and seasonal offers.
              </p>
              <form
                className="newsletter-form"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Your Mail"
                  required
                />
                <button type="submit">SEARCH</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-copyright-bar">
        <div className="footer-inner-container">
          <p>&copy; Copyrights {currentYear} Venus All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}