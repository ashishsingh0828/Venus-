import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import "./Fact.css";


const STATS = [
  { id: 1, value: 1000, suffix: "+", label: "Saving Water by Recycling" },
  { id: 2, value: 6, suffix: "+", label: "Exclusive Display Centers" },
  { id: 3, value: 160, suffix: "+", label: "Dealers" },
  { id: 4, value: 12, suffix: "+", label: "Product Categories" },
  { id: 5, value: 2000, suffix: "+", label: "Project Completion" },
];

const CHECKLIST = [
  "More Expensive",
  "Less Maintenance",
  "Heat-Resistant",
  "Elegant Vein Patterns",
];

function useInView(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return [ref, inView];
}

function useCountUp(target, active, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    let raf;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return value;
}

function FactStat({ value, suffix, label, active, delay }) {
  const count = useCountUp(value, active);
  return (
    <div
      className="fact-stat"
      data-visible={active}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <p className="fact-stat__value">
        {count.toLocaleString()}
        <span>{suffix}</span>
      </p>
      <p className="fact-stat__label">{label}</p>
    </div>
  );
}

export default function FactsExpertiseSection() {
  const [factsRef, factsInView] = useInView({ threshold: 0.3 });
  const [expertiseRef, expertiseInView] = useInView({ threshold: 0.25 });

  const row1 = STATS.slice(0, 3);
  const row2 = STATS.slice(3);

  return (
    <section className="facts-expertise">
      {/* ---------------- Fact & Figures ---------------- */}
      <div className="facts" ref={factsRef}>
        <h2 className="facts__heading">Fact &amp; Figures</h2>

        <div className="facts__row">
          {row1.map((stat, i) => (
            <FactStat key={stat.id} {...stat} active={factsInView} delay={i * 100} />
          ))}
        </div>
        <div className="facts__row facts__row--second">
          {row2.map((stat, i) => (
            <FactStat
              key={stat.id}
              {...stat}
              active={factsInView}
              delay={(row1.length + i) * 100}
            />
          ))}
        </div>
      </div>

      {/* ---------------- Expertise ---------------- */}
      <div className="expertise" ref={expertiseRef}>
        <div className="expertise__grid">
          <div className="expertise__content" data-visible={expertiseInView}>
            <div className="expertise__eyebrow">
              <span aria-hidden="true" />
              Expertise
            </div>

            <h2 className="expertise__heading">
              Skilled Flooring Installers For Your House
            </h2>

            <p className="expertise__text">
              There are many variations of passages of Lorem Ipsum available,lore
              xyz there isn&rsquo;t anything but the majority have suffered
              alteration in some form,lor by ipsu injected humour, or randomised
              words which don&rsquo;t look even slightly
            </p>

            <ul className="expertise__checklist">
              {CHECKLIST.map((item) => (
                <li key={item}>
                  <span className="expertise__check" aria-hidden="true">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="expertise__media" data-visible={expertiseInView}>
            <div className="expertise__collage">
              <div className="expertise__photo expertise__photo--tall">
                <img
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=700&h=900&fit=crop"
                  alt="Installer fitting wall tile"
                  loading="lazy"
                />
              </div>
              <div className="expertise__photo expertise__photo--short">
                <img
                  src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=700&h=760&fit=crop"
                  alt="Installer measuring flooring material"
                  loading="lazy"
                />
              </div>

              <div className="expertise__badge">
                <p className="expertise__badge-value">
                  25<span>+</span>
                </p>
                <p className="expertise__badge-label">Years Of Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}