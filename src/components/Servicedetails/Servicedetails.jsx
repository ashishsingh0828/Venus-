import React, { useState } from "react";
import "./ServiceDetails.css";
import ProductsSlider from "../ProductSlider/ProductSlider";

const CATEGORIES = [
  { label: "Hospital & OT Doors", count: "01", active: true, href: "#hospital-ot-doors" },
  { label: "Hermetic Sliding Doors", count: "02", href: "#hermetic-sliding-doors" },
  { label: "Radiation Shielding Doors", count: "03", href: "#radiation-shielding-doors" },
  { label: "Surgical Pendants", count: "04", href: "#surgical-pendants" },
  { label: "Surgical Scrub Sinks", count: "05", href: "#surgical-scrub-sinks" },
  { label: "Motor Control Panels", count: "06", href: "#motor-control-panels" },
];

const BENEFITS = [
  "High-grade SS304 & HPL build",
  "Acoustic & airtight perimeter seals",
  "Seamless sterile flush finish",
  "Tailored single & double leaf sizing",
];

const FAQS = [
  {
    q: "What leaf configurations are available for Hospital & OT doors?",
    a: "We manufacture single leaf, double leaf, and unequal leaf configurations in both stainless steel (SS304) and high-pressure laminate (HPL) finishes to suit wide stretcher access and compact cleanroom entryways.",
  },
  {
    q: "How do these doors help maintain sterile hospital environments?",
    a: "Our doors feature flush seamless designs, non-porous antimicrobial surfaces, and heavy-duty silicone perimeter gaskets that prevent particulate accumulation and withstand rigorous clinical chemical disinfection.",
  },
  {
    q: "Can vision panels and automated kick plates be integrated?",
    a: "Yes. All doors can be custom-fitted with double-glazed flush vision panels, radiation-shielded glass (if required), automatic touchless sensor openers, and heavy-duty stainless steel kick plates.",
  },
  {
    q: "Are the door frames compatible with modular OT wall panels?",
    a: "Yes, our wrap-around and flush-mount subframes are engineered specifically to lock seamlessly into modular OT partition wall panels as well as standard brick/concrete walls.",
  },
  {
    q: "What standards and durability testing do your doors comply with?",
    a: "Every unit is fabricated in accordance with healthcare hygiene norms, cycle-tested for high-frequency clinical traffic, and backed by a comprehensive structural and hardware warranty.",
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

export default function ServiceDetails() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIndex((current) => (current === idx ? -1 : idx));
  };

  return (
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
              <a className="sd-contact-number" href="tel:+2085550112">
                +208-555-0112
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
                    "url(/assets/images/hospital&OT.png)",
                }}
              />

              <div className="sd-post-content">
                <h1 className="sd-title-1">Hospital &amp; OT Doors</h1>
                <p className="sd-paragraph">
                  Our clinical doors are precision-engineered for sterile operation
                  theatres, ICUs, and critical healthcare corridors where air hygiene,
                  infection control, and reliable traffic handling are essential. Fabricated
                  with premium SS304 grade stainless steel and high-pressure laminate
                  (HPL) facings, each door provides high structural rigidity and chemical
                  resistance against aggressive medical cleansers.
                </p>

                <h2 className="sd-title-2">Engineered Cleanliness &amp; Accessibility</h2>
                <p className="sd-paragraph">
                  Designed to support demanding workflow conditions, our door assemblies
                  feature seamless flush frame integrations that eliminate dust traps.
                  Whether configured as single-leaf, double-leaf, or unequal-leaf hinged
                  doors, every unit integrates continuous perimeter seals to preserve
                  controlled room pressure and reduce acoustic transmission.
                </p>

                <div className="sd-feature-row">
                  <div className="sd-feature-image">
                    <img
                      src="/assets/images/Otsecond.png"
                      alt="Hospital and OT door installation detail"
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
                  From custom dimensioning and wall-mount subframe integration to
                  high-durability hardware installation, our team ensures every door
                  meets strict healthcare regulations, delivering smooth operation and
                  lasting cleanroom integrity.
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
  );
}