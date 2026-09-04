import { ShieldCheck, Flame, Repeat2, HeartHandshake } from "lucide-react";
import "./Value.css";



const VALUES = [
  {
    id: 1,
    title: "Integrity",
    description:
      "There are many variations of passages of Lorem Ipsum available,xyz there isn't anything but the",
    icon: ShieldCheck,
  },
  {
    id: 2,
    title: "Passion",
    description:
      "There are many variations of passages of Lorem Ipsum available,xyz there isn't anything but the",
    icon: Flame,
  },
  {
    id: 3,
    title: "Adaptability",
    description:
      "There are many variations of passages of Lorem Ipsum available,xyz there isn't anything but the",
    icon: Repeat2,
  },
  {
    id: 4,
    title: "Care",
    description:
      "There are many variations of passages of Lorem Ipsum available,xyz there isn't anything but the",
    icon: HeartHandshake,
  },
];

export default function ValuesSection() {
  return (
    <section className="values-section">
      <div className="values-section__inner">
        <h2 className="values-section__heading">Our Values</h2>

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