import React, { useState } from "react";
import "./ServiceDetails.css";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import ServiceProjectsSlider from "../ProductSlider/ServiceProjectsSlider";

const CATEGORIES = [
  { label: "Hospital & OT Doors", count: "01", href: "#hospital-ot-doors" },
  { label: "Hermetic Sliding Doors", count: "02", href: "#hermetic-sliding-doors" },
  { label: "Radiation Shielding Doors", count: "03", active: true, href: "#radiation-shielding-doors" },
  { label: "Surgical Pendants", count: "04", href: "#surgical-pendants" },
  { label: "Surgical Scrub Sinks", count: "05", href: "#surgical-scrub-sinks" },
  { label: "Motor Control Panels", count: "06", href: "#motor-control-panels" },
];

const BENEFITS = [
  "Certified 99.9% pure lead-lined core",
  "AERB compliant radiation attenuation",
  "Heavy-duty continuous overlap shielding",
  "SS304 & high-pressure laminate finishes",
];

const FAQS = [
  {
    q: "What lead equivalencies are available for your radiation shielding doors?",
    a: "We manufacture doors with lead shielding thickness ranging from 1mm Pb up to 4mm Pb (or higher on custom demand) to suit X-ray rooms, CT scan suites, fluoroscopy, and linear accelerator facilities.",
  },
  {
    q: "How do you prevent radiation leakage around the door frame and joints?",
    a: "Our assemblies incorporate continuous lead lining throughout the door leaf, subframe, and architrave. We engineer a minimum 20mm lead overlap between the leaf and frame, ensuring no direct line of sight for radiation leakage.",
  },
  {
    q: "Are these doors available in both sliding and hinged configurations?",
    a: "Yes. We fabricate single and double leaf hinged lead-lined doors with heavy-duty pivot hinges, as well as manual and automated hermetically sealed sliding lead-lined doors for wide equipment access.",
  },
  {
    q: "Can radiation-shielded lead glass vision panels be incorporated?",
    a: "Yes. We install certified lead glass vision panels with matching lead equivalence (Pb rating), fully framed with internal lead gaskets to maintain unbroken radiation protection.",
  },
  {
    q: "How do you ensure smooth operation given the heavy weight of lead doors?",
    a: "Our doors utilize reinforced internal steel skeletons, heavy-duty floor pivots, continuous gear hinges, or high-torque German overhead sliding tracks designed specifically for loads exceeding 200–400 kg.",
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

export default function RadiationShieldingDoorDetails() {
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
                    "url(/assets/images/radiation.png)",
                }}
              />

              <div className="sd-post-content">
                <h1 className="sd-title-1">Radiation Shielding &amp; Lead-Lined Doors</h1>
                <p className="sd-paragraph">
                  Venus Hospital Door Solutions manufactures certified lead-lined radiation
                  shielding doors designed for diagnostic imaging suites, X-ray departments,
                  CT scan rooms, and cath labs. Every assembly is precision-crafted with high-purity
                  chemical lead sheets sandwiched inside heavy-duty SS304 stainless steel or HPL
                  facings to provide complete, gap-free radiation attenuation and protect healthcare
                  personnel.
                </p>

                <h2 className="sd-title-2">Certified Protection &amp; Structural Integrity</h2>
                <p className="sd-paragraph">
                  Radiation containment requires zero tolerance for leakage. Our door leaves,
                  matched wrap-around frames, and meeting stiles are completely lined with continuous
                  lead sheets, ensuring overlap protection that eliminates gaps at the hinges,
                  locksets, and perimeter gaps. Available in manual or motorized sliding and hinged
                  arrangements, each system features heavy-duty load-bearing hardware designed for
                  effortless long-term use despite high material mass.
                </p>

                <div className="sd-feature-row">
                  <div className="sd-feature-image">
                    <img
                      src="/assets/images/rsecond.png"
                      alt="Lead-lined radiation door installation detail"
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
                  From precise site dimensioning and lead thickness calculation to factory
                  fabrication in Faridabad and on-site integration with lead glass viewing ports,
                  we deliver turnkey radiation barrier installations compliant with strict radiological
                  safety regulations.
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
    <ServiceProjectsSlider serviceId="radiation-shielding-doors" />
  </>
  );
}