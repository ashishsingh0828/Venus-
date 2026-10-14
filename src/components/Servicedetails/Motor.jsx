import React, { useState } from "react";
import "./ServiceDetails.css";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import AutoSlider from "../ProductSlider/AutoSlider";
import ServiceProjectsSlider from "../ProductSlider/ServiceProjectsSlider";

const CATEGORIES = [
  { label: "Hospital & OT Doors", count: "01", href: "#hospital-ot-doors" },
  { label: "Hermetic Sliding Doors", count: "02", href: "#hermetic-sliding-doors" },
  { label: "Radiation Shielding Doors", count: "03", href: "#radiation-shielding-doors" },
  { label: "Surgical Pendants", count: "04", href: "#surgical-pendants" },
  { label: "Surgical Scrub Sinks", count: "05", href: "#surgical-scrub-sinks" },
  { label: "Motor Control Panels", count: "06", active: true, href: "#motor-control-panels" },
];

const BENEFITS = [
  "High-torque brushless DC drive automation",
  "Programmable interlock & BMS integration",
  "Smart anti-pinch & safety obstacle detection",
  "Built-in battery backup & emergency override",
];

const FAQS = [
  {
    q: "What types of doors are compatible with your motorized sliding drives and MCPs?",
    a: "Our Motor Control Panels and automated drive assemblies power heavy hermetic OT doors, single/double leaf sliding hospital doors, lead-lined radiation doors, and cleanroom airlock entrances.",
  },
  {
    q: "How does the panel handle interlocking between multiple doors?",
    a: "Our MCP systems include programmable logic controllers (PLC) or microprocessor relays that support two-door or multi-door interlock logic, preventing cleanroom cross-contamination by ensuring only one door opens at a time.",
  },
  {
    q: "What sensors and trigger mechanisms can be connected to the control panel?",
    a: "The panel integrates with contactless microwave radars, foot-pedal switches, optical safety through-beam photocells, elbow push switches, and access-control card/biometric readers.",
  },
  {
    q: "What safety features protect patients and staff from moving doors?",
    a: "Our motorized controllers feature continuous motor torque feedback. If the door meets an obstacle during closing, it auto-reverses within milliseconds without causing impact or injury.",
  },
  {
    q: "How does the motorized system behave during power outages?",
    a: "The system is equipped with an integrated UPS/battery backup that completes cycle closures or holds open per fire safety programming, along with an easy mechanical freewheeling clutch for manual slide operation.",
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

export default function MotorSlidingDoorDetails() {
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
                      "url(/assets/images/msecond.png)",
                  }}
                />

                <div className="sd-post-content">
                  <h1 className="sd-title-1">Motorized Sliding Doors &amp; Control Panels (MCP)</h1>
                  <p className="sd-paragraph">
                    Venus Hospital Door Solutions manufactures robust Motor Control Panels
                    (MCP) and motorized automated sliding systems engineered specifically for
                    sterile healthcare corridors, modular operation theaters, and cleanroom barrier
                    zones. Built in our Faridabad facility, our automation systems combine
                    quiet brushless DC motors, smart microprocessor drive cards, and powder-coated
                    enclosures built to handle intensive around-the-clock hospital operations.
                  </p>

                  <h2 className="sd-title-2">Smart Hospital Automation &amp; Dynamic Control</h2>
                  <p className="sd-paragraph">
                    Engineered to drive both lightweight HPL and heavy lead-shielded sliding leaves,
                    our motor control systems deliver soft acceleration and deceleration profiling
                    that prevents track wear and mechanical slamming. Panels feature programmable
                    inputs for two-door cleanroom interlocking, fire-alarm emergency unlocking,
                    touchless sensor arrays, and BMS (Building Management System) telemetry.
                  </p>

                  <div className="sd-feature-row">
                    <div className="sd-feature-image">
                      <img
                        src="/assets/images/mcd.png"
                        alt="Motorized sliding door mechanism and control panel"
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
                    From custom electrical wiring schematic design and drive track matching to
                    emergency battery integration and on-site testing, we deliver reliable,
                    safe, and fully compliant motorized sliding entry automation for modern hospitals.
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
      <ServiceProjectsSlider serviceId="motor-control-panels" fallback={AutoSlider} />
    </>
  );
}