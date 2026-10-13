import { ShieldCheck, Flame, Repeat2, HeartHandshake } from "lucide-react";
import "./Value.css";

const VALUES = [
  {
    id: 1,
    title: "Clinical Hygiene & Safety",
    description:
      "Upholding strict healthcare cleanroom tolerances, airtight perimeter sealing, and certified radiation attenuation.",
    icon: ShieldCheck,
  },
  {
    id: 2,
    title: "Engineering Precision",
    description:
      "Manufacturing heavy-duty SS304 and HPL door solutions engineered to endure high-frequency hospital operation.",
    icon: Flame,
  },
  {
    id: 3,
    title: "Tailored Adaptability",
    description:
      "Customizing single, double, unequal leaf dimensions and control panel integrations for specific modular OT setups.",
    icon: Repeat2,
  },
  {
    id: 4,
    title: "Healthcare Commitment",
    description:
      "Delivering prompt on-site support, reliable deliveries, and dependable products built to protect doctors and patients.",
    icon: HeartHandshake,
  },
];

export default function ValuesSection() {
  return (
    <section className="values-section">
      <div className="values-section__inner">
        <h2 className="values-section__heading">Our Core Values</h2>

        <div className="values-grid">
          {VALUES.map(({ id, title, description, icon: Icon }, i) => (
            <div
              key={id}
              className="value-item"
              style={{ animationDelay: `${120 + i * 90}ms` }}
            >
              <span className="value-item__icon">
                <Icon size={30} strokeWidth={1.75} />
              </span>
              <div className="value-item__body">
                <h3 className="value-item__title">{title}</h3>
                <p className="value-item__text">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}