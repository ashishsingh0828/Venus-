import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import "./FaqSection.css";

const FAQS = [
  {
    id: 1,
    question: "What types of hospital and OT doors do you manufacture?",
    answer:
      "We manufacture SS304 hospital hinged doors, HPL single and double leaf doors, hermetically sealed sliding doors, unequal leaf hinged doors, and fire-rated PCGI cleanroom doors engineered for sterile healthcare facilities.",
  },
  {
    id: 2,
    question: "Do you supply lead-lined radiation shielding doors?",
    answer:
      "Yes. We specialize in radiation protection solutions including lead-lined SS304 hinged doors, HPL hinge lead doors, and hermetically sealed manual sliding lead-lined doors tailored for X-ray, CT scan, and radiology suites.",
  },
  {
    id: 3,
    question: "How do hermetically sealed doors ensure sterile OT conditions?",
    answer:
      "Our hermetic doors feature heavy-duty perimeter silicone gaskets and precision track drops that create an airtight barrier upon closing, sustaining positive/negative pressure differentials and preventing airborne contamination.",
  },
  {
    id: 4,
    question: "What configurations are available for surgical scrub sinks and pendants?",
    answer:
      "We manufacture hands-free foot-operated automatic surgical scrub sinks and SS304 scrub stations, alongside single arm, double arm, and anesthesia straight ceiling pendants with integrated medical gas and power outlets.",
  },
  {
    id: 5,
    question: "Do you provide custom fabrication and motor control panels (MCP)?",
    answer:
      "Yes, as an OEM manufacturer based in Faridabad, Haryana, we provide custom sizing, hardware integration, and dedicated Motor Control Panels (MCP) engineered for hospital automation and automated sliding door systems.",
  },
];

function DotGridIcon() {
  return (
    <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M8 20 C8 12 12 8 20 8" />
        <path d="M44 8 C52 8 56 12 56 20" />
        <path d="M56 44 C56 52 52 56 44 56" />
        <path d="M20 56 C12 56 8 52 8 44" />
      </g>
      {[14, 26, 38, 50].map((cy) =>
        [14, 26, 38, 50].map((cx) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.2" fill="currentColor" />
        ))
      )}
    </svg>
  );
}

export default function FaqSection() {
  const [openId, setOpenId] = useState(FAQS[0].id);

  const toggle = (id) => setOpenId((current) => (current === id ? null : id));

  return (
    <section className="faq-section">
      <div className="faq-section__inner">
        <div className="faq-section__intro">
          <div className="faq-section__eyebrow">
            <span className="faq-section__eyebrow-mark" aria-hidden="true" />
            <span>Our FAQ</span>
          </div>

          <h2 className="faq-section__heading">
            Frequently Asked
            <br />
            Questions
          </h2>

          <p className="faq-section__lede">
            Explore technical details and specifications regarding our hospital doors,
            cleanroom systems, radiation barriers, and operation theater infrastructure.
          </p>

          <div className="faq-stat-card">
            <span className="faq-stat-card__icon">
              <DotGridIcon />
            </span>
            <div className="faq-stat-card__body">
              <p className="faq-stat-card__figure">
                <span className="faq-stat-card__number">500+</span> OT Doors Delivered
              </p>
              <p className="faq-stat-card__text">
                Supplying verified medical entry systems and sterile infrastructure 
                to top hospitals and healthcare centers across India.
              </p>
            </div>
          </div>
        </div>

        <div className="faq-accordion" role="presentation">
          {FAQS.map((item, index) => {
            const isOpen = openId === item.id;
            const number = String(index + 1).padStart(2, "0");

            return (
              <div
                key={item.id}
                className={`faq-item${isOpen ? " faq-item--open" : ""}`}
              >
                <h3 className="faq-item__header">
                  <button
                    type="button"
                    className="faq-item__trigger"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${item.id}`}
                    id={`faq-trigger-${item.id}`}
                    onClick={() => toggle(item.id)}
                  >
                    <span className="faq-item__question">
                      {number}. {item.question}
                    </span>
                    <span className="faq-item__icon" aria-hidden="true">
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                </h3>

                <div
                  id={`faq-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${item.id}`}
                  className="faq-item__panel"
                >
                  <div className="faq-item__panel-inner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}