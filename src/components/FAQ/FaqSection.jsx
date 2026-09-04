import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import "./faqSection.css";


const FAQS = [
  {
    id: 1,
    question: "Which Kinds Of Tiles Can You Get From A Tile Company?",
    answer:
      "There are many variations of passages of Lorem Ipsum available, lore xyz there isn't anything but the majority have suffered alteration in some form, lor by ipsu injected humour,",
  },
  {
    id: 2,
    question: "What Is The Best Way To Select Tiles For My Project?",
    answer:
      "Consider the room's traffic, moisture exposure, and existing finishes first, then narrow your options down by size, texture, and maintenance before choosing a colour or pattern.",
  },
  {
    id: 3,
    question: "Exist Any Options for Eco-Friendly Tile?",
    answer:
      "Yes — recycled porcelain, reclaimed stone, and low-fire ceramic lines all cut embodied carbon while holding up to the same wear as standard tile.",
  },
  {
    id: 4,
    question: "Are There Any Choices for Eco-Friendly Tile?",
    answer:
      "Our eco range includes recycled glass mosaics and clay bodies fired at lower temperatures, both certified against major sustainability standards.",
  },
  {
    id: 5,
    question: "There Any Choices for Eco-Friendly Tile?",
    answer:
      "Ask your project consultant for the current eco-friendly catalogue — availability varies by region and finish.",
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
            What Are The Most
            <br />
            Common Questions?
          </h2>

          <p className="faq-section__lede">
            There are many variations of passages of Lorem Ipsum available,lore xyz
            there isn&rsquo;t anything but the majority have suffered alteration in some
            form,lor by ipsu injected humour,
          </p>

          <div className="faq-stat-card">
            <span className="faq-stat-card__icon">
              <DotGridIcon />
            </span>
            <div className="faq-stat-card__body">
              <p className="faq-stat-card__figure">
                <span className="faq-stat-card__number">5K+</span> Project Complete
              </p>
              <p className="faq-stat-card__text">
                There are many variations a of passages of a Lorem Ipsum
                available,lore xyz there isn&rsquo;t anything but the majority
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