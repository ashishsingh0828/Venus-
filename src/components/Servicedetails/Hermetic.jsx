import React, { useState } from "react";
import "./ServiceDetails.css";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import ServiceProjectsSlider from "../ProductSlider/ServiceProjectsSlider";

const CATEGORIES = [
  { label: "Hospital & OT Doors", count: "01", href: "#hospital-ot-doors" },
  { label: "Hermetic Sliding Doors", count: "02", active: true, href: "#hermetic-sliding-doors" },
  { label: "Radiation Shielding Doors", count: "03", href: "#radiation-shielding-doors" },
  { label: "Surgical Pendants", count: "04", href: "#surgical-pendants" },
  { label: "Surgical Scrub Sinks", count: "05", href: "#surgical-scrub-sinks" },
  { label: "Motor Control Panels", count: "06", href: "#motor-control-panels" },
];

const BENEFITS = [
  "True airtight hermetic sealing",
  "Automated touchless motion sensor control",
  "Acoustic isolation & draft resistance",
  "SS304 & HPL panel construction",
];

const FAQS = [
  {
    q: "How does the hermetic sealing mechanism work on sliding doors?",
    a: "When closing, the door track drops inward and downward by 10mm to 15mm, pressing the continuous high-grade silicone perimeter gasket firmly against the wall frame and floor to establish an airtight seal.",
  },
  {
    q: "Can these hermetic doors be operated both automatically and manually?",
    a: "Yes. We offer microprocessor-driven automatic hermetic sliding doors with radar/foot-sensor actuators as well as ultra-smooth manual sliding systems fitted with ergonomic recessed handles.",
  },
  {
    q: "How do hermetic doors help maintain differential pressure in operation theatres?",
    a: "By providing an airtight seal around all four edges, they eliminate air leakage, ensuring positive pressure inside sterile OT zones or negative pressure in quarantine/isolation suites is continuously sustained.",
  },
  {
    q: "What vision panel options are available for hermetic doors?",
    a: "We integrate double-glazed, flush-mounted safety glass vision panels with optional motorized internal Venetian blinds or lead-equivalent radiation glass without compromising hermetic integrity.",
  },
  {
    q: "What happens to automatic hermetic doors during a power failure?",
    a: "Our automatic systems feature built-in battery backup modules for uninterrupted operation, as well as an emergency mechanical release that allows easy manual opening with minimal resistance.",
  },
];

function PlusIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 1v12M1 7h12" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M6.46 12.41a.29.29 0 0 1-.2-.09L.93 6.55a.28.28 0 0 1 .2-.48h2.57a.28.28 0 0 1 .2.09l1.78 2.05c.19-.41.57-1.1 1.22-1.93.97-1.24 2.76-3.06 5.84-4.7a.27.27 0 0 1 .3.02c.09.06.14.16.13.27a.27.27 0 0 1-.1.19c-.01.01-1.2.94-2.56 2.66-1.26 1.57-2.94 4.15-3.76 7.47a.28.28 0 0 1-.27.22z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function HermeticDoorDetails() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIndex((current) => (current === idx ? -1 : idx));
  };

  return (
   <>
   <Breadcrumb/>
    <section className="sd-section">
      <div className="sd-container">
        <div className="sd-grid">
          {/* Sidebar */}
          <aside className="sd-sidebar">
            <div className="sd-widget">
              <h3 className="sd-widget-title">All Services</h3>
              <ul className="sd-category-list">
                {CATEGORIES.map((cat) => (
                  <li
                    key={cat.label}
                    className={`sd-category-item${cat.active ? " is-active" : ""}`}
                  >
                    <a href={cat.href}>
                      <span>{cat.label}</span>
                      <span className="sd-category-count">({cat.count})</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sd-contact-card">
              <div className="sd-contact-icon">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <p className="sd-contact-label">Need help? Call here</p>
              <a className="sd-contact-number" href="tel:+919810730153">
                +91 98107 30153
              </a>
              <a className="sd-contact-number" href="tel:+919582516661" style={{ fontSize: '15px', marginTop: '4px' }}>
                +91 95825 16661
              </a>
            </div>
          </aside>

          {/* Main content */}
          <div className="sd-main">
            <article className="sd-post">
              <div
                className="sd-post-thumb"
                style={{
                  backgroundImage:
                    "url(/assets/images/hermetical.png)",
                }}
              />

              <div className="sd-post-content">
                <h1 className="sd-title-1">Hermetically Sealed Sliding Doors</h1>
                <p className="sd-paragraph">
                  Our hermetically sealed doors are engineered specifically for critical
                  clinical environments where airtight integrity, microbiological control,
                  and exact room pressure control are required. Using high-efficiency track
                  mechanisms, each door leaf glides along an overhead extrusion and drops
                  inward upon closing, compressing heavy-duty perimeter silicone gaskets
                  against the subframe to prevent air infiltration.
                </p>

                <h2 className="sd-title-2">Airtight Containment &amp; Automation</h2>
                <p className="sd-paragraph">
                  Fabricated with corrosion-resistant SS304 stainless steel or antibacterial
                  HPL facings over high-density polyurethane cores, these doors withstand
                  frequent chemical sterilization and high-traffic healthcare demands. Available
                  with touchless motion, elbow, or foot-sensor automation, they ensure smooth,
                  hands-free movement for surgical staff, patient stretchers, and diagnostic equipment.
                </p>

                <div className="sd-feature-row">
                  <div className="sd-feature-image">
                    <img
                      src="/assets/images/hsecond.png"
                      alt="Hermetically sealed sliding door installation"
                    />
                  </div>
                  <div className="sd-benefits">
                    <p className="sd-benefits-label">
                      Benefits with our service
                    </p>
                    <ul className="sd-checklist">
                      {BENEFITS.map((benefit) => (
                        <li key={benefit}>
                          <span className="sd-check-icon">
                            <CheckIcon />
                          </span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="sd-paragraph sd-paragraph-last">
                  From custom track dimensioning to microprocessor drive calibration and
                  emergency battery fallback setup, Venus Hospital Door Solutions delivers
                  turnkey hermetic entry systems tailored for operating theaters, ICUs,
                  and pharmaceutical cleanrooms.
                </p>
              </div>
            </article>

            <div className="sd-faq-heading">
              <h2>Common questions</h2>
            </div>

            <div className="sd-faq-list">
              {FAQS.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={item.q}
                    className={`sd-faq-item${isOpen ? " is-open" : ""}`}
                  >
                    <h3 className="sd-faq-header">
                      <button
                        type="button"
                        className="sd-faq-trigger"
                        aria-expanded={isOpen}
                        aria-controls={`sd-faq-panel-${idx}`}
                        onClick={() => toggleFaq(idx)}
                      >
                        <span>{item.q}</span>
                        <span className="sd-faq-icon">
                          <PlusIcon />
                        </span>
                      </button>
                    </h3>
                    <div
                      id={`sd-faq-panel-${idx}`}
                      className="sd-faq-panel"
                      role="region"
                    >
                      <div className="sd-faq-panel-inner">
                        <p>{item.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
    <ServiceProjectsSlider serviceId="hermetic-sliding-doors" />
   </>
  );
}