import React, { useState } from "react";
import "./ServiceDetails.css";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import SurgicalScrub from "../ProductSlider/Scrub";
import ServiceProjectsSlider from "../ProductSlider/ServiceProjectsSlider";

const CATEGORIES = [
  { label: "Hospital & OT Doors", count: "01", href: "#hospital-ot-doors" },
  { label: "Hermetic Sliding Doors", count: "02", href: "#hermetic-sliding-doors" },
  { label: "Radiation Shielding Doors", count: "03", href: "#radiation-shielding-doors" },
  { label: "Surgical Pendants", count: "04", href: "#surgical-pendants" },
  { label: "Surgical Scrub Sinks", count: "05", active: true, href: "#surgical-scrub-sinks" },
  { label: "Motor Control Panels", count: "06", href: "#motor-control-panels" },
];

const BENEFITS = [
  "Heavy-duty SS304 medical-grade finish",
  "Hands-free foot & infrared sensor controls",
  "Anti-splash deep curved bowl geometry",
  "Integrated thermostatic mixing & soap dispensers",
];

const FAQS = [
  {
    q: "What configurations of surgical scrub sinks do you manufacture?",
    a: "We manufacture single-bay, double-bay, and triple-bay stainless steel (SS304) surgical scrub sinks available in wall-mounted or floor-standing designs with ergonomic foot or sensor actuators.",
  },
  {
    q: "How is contamination prevented during handwashing?",
    a: "Our units eliminate hand contact through foot-operated valves, knee-push panels, or infrared touchless sensors. Deep inclined basins and curved anti-splash sidewalls prevent water droplets from bouncing back onto sterilized arms.",
  },
  {
    q: "Can thermostatic temperature control and soap dispensers be integrated?",
    a: "Yes. Every scrub sink can be fitted with thermostatic mixing valves for consistent warm water delivery, alongside automated touchless or foot-activated surgical scrub soap and disinfectant dispensers.",
  },
  {
    q: "Is the stainless steel construction resistant to hospital disinfectants?",
    a: "Yes, our sinks are crafted entirely from premium SS304 stainless steel with smooth, seamless satin-matte finishing that resists pitting, iodine stains, chlorhexidine, and harsh clinical sanitizers.",
  },
  {
    q: "Do you supply water filtration or UV sterilizer attachments?",
    a: "We offer optional pre-filtration sediment cartridges and in-line medical-grade UV water sterilization modules to guarantee particulate- and microbe-free water supply for pre-op scrubbing.",
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

export default function SurgicalScrubSinkDetails() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIndex((current) => (current === idx ? -1 : idx));
  };

  return (
    <>
      <Breadcrumb />
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
                      "url(/assets/images/scrub.png)",
                  }}
                />

                <div className="sd-post-content">
                  <h1 className="sd-title-1">Surgical Scrub Sinks &amp; Stations</h1>
                  <p className="sd-paragraph">
                    Venus Hospital Door Solutions fabricates heavy-duty stainless steel surgical
                    scrub sinks and pre-op hygiene stations engineered specifically for operation
                    theaters, trauma centers, and clinical preparation suites. Manufactured in
                    Faridabad using medical-grade SS304 stainless steel, each unit delivers absolute
                    sterility, seamless radius corners that eliminate dirt accumulation, and
                    hands-free operation essential for aseptic protocols.
                  </p>

                  <h2 className="sd-title-2">Aseptic Design &amp; Touchless Performance</h2>
                  <p className="sd-paragraph">
                    Our scrub stations feature deep sloped basins and splash-dampening geometries
                    that prevent wastewater from rebounding onto surgeons and nurses during pre-operative
                    scrubbing. Configurable with touch-free infrared sensors, foot-pedal switches, or
                    knee-operated front panels, every station integrates smooth aerated flow nozzles,
                    thermostatic water regulators, and corrosion-proof soap distribution channels.
                  </p>

                  <div className="sd-feature-row">
                    <div className="sd-feature-image">
                      <img
                        src="/assets/images/sscrub.png"
                        alt="Stainless steel surgical scrub sink station"
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
                    From 1-bay, 2-bay, and 3-bay modular formats to custom wall-hung and pedestal
                    configurations, our surgical scrub sink stations are fabricated to meet stringent
                    hospital infection-control regulations with effortless maintenance and long service life.
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
      <ServiceProjectsSlider serviceId="surgical-scrub-sinks" fallback={SurgicalScrub} />
    </>
  );
}