import React, { useState } from "react";
import "./ServiceDetails.css";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import SurgicalPendantSlider from "../ProductSlider/SurgicalPendantSlider";
import ServiceProjectsSlider from "../ProductSlider/ServiceProjectsSlider";

const CATEGORIES = [
  { label: "Hospital & OT Doors", count: "01", href: "#hospital-ot-doors" },
  { label: "Hermetic Sliding Doors", count: "02", href: "#hermetic-sliding-doors" },
  { label: "Radiation Shielding Doors", count: "03", href: "#radiation-shielding-doors" },
  { label: "Surgical Pendants", count: "04", active: true, href: "#surgical-pendants" },
  { label: "Surgical Scrub Sinks", count: "05", href: "#surgical-scrub-sinks" },
  { label: "Motor Control Panels", count: "06", href: "#motor-control-panels" },
];

const BENEFITS = [
  "Single & double articulated arm reach",
  "Integrated medical gas & power terminal units",
  "Smooth 330° pneumatic/mechanical braking",
  "High load-bearing modular equipment shelves",
];

const FAQS = [
  {
    q: "What configurations of surgical pendants do you manufacture?",
    a: "We manufacture single arm surgical pendants, double arm articulated pendants, straight anesthesia pendants, and rigid hospital pendants tailored for operation theaters, ICUs, and emergency surgical suites.",
  },
  {
    q: "How are medical gases and high-voltage power separated within the pendant?",
    a: "Our pendant columns feature segregated multi-compartment internal ducts that completely isolate medical gas pipes from electrical conduits, data cables, and monitor wiring to comply with hospital safety codes.",
  },
  {
    q: "What braking systems are used to hold the pendant securely in place?",
    a: "Depending on your OT requirements, we provide precision friction-dampened mechanical brakes or pneumatic braking systems that lock the arm securely at any desired angle with fingertip push-button controls.",
  },
  {
    q: "Can the pendant support heavy anesthesia machines and surgical monitors?",
    a: "Yes. Our ceiling-suspended columns and articulated arms are fabricated from heavy-gauge extruded aluminum alloys, rated to carry payloads from 150 kg up to 300+ kg across adjustable equipment shelves and monitor arms.",
  },
  {
    q: "Do you supply ceiling interface plates and custom drop-down lengths?",
    a: "Yes. Every pendant includes a heavy-duty structural ceiling mount plate engineered for concrete slabs or false ceiling sub-structures, with custom drop tube lengths adapted to your exact OT ceiling height.",
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

export default function SurgicalPendantDetails() {
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
                      "url(/assets/images/surgicalpendant.png)",
                  }}
                />

                <div className="sd-post-content">
                  <h1 className="sd-title-1">Surgical &amp; Anesthesia Pendants</h1>
                  <p className="sd-paragraph">
                    Venus Hospital Door Solutions engineers ceiling-suspended surgical
                    and anesthesia pendants designed to maximize floor space, eliminate trailing
                    cables, and deliver essential clinical utilities directly to the operating
                    team. Manufactured in Faridabad with high-tensile extruded aluminum profiles,
                    our pendant systems integrate medical gas outlets, high-voltage electrical
                    sockets, data interfaces, and heavy-duty equipment shelving into a single,
                    ergonomic workstation.
                  </p>

                  <h2 className="sd-title-2">Articulated Reach &amp; Utility Integration</h2>
                  <p className="sd-paragraph">
                    Whether configured with single-arm rotation or multi-jointed double arms,
                    our pendants feature 330-degree rotation angles with precision pneumatic or
                    mechanical braking systems that ensure drift-free positioning during critical
                    surgeries. With internal channel segregation separating high-pressure gases from
                    communication and power lines, every unit delivers certified safety, seamless
                    maneuverability, and smooth infection-control wipe-down maintenance.
                  </p>

                  <div className="sd-feature-row">
                    <div className="sd-feature-image">
                      <img
                        src="/assets/images/pendant.png"
                        alt="Surgical pendant installation in operation theater"
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
                    From initial structural load calculations and custom drop-tube heights to
                    terminal unit calibration and on-site testing in your modular OT, we deliver
                    durable, turnkey pendant installations built for demanding healthcare duty cycles.
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
      <ServiceProjectsSlider serviceId="surgical-pendants" fallback={SurgicalPendantSlider} />
    </>
  );
}