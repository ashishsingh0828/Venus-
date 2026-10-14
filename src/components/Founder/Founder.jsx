import { useEffect, useRef, useState } from "react";
import { Mail } from "lucide-react";
import "./Founder.css";

function LinkedinIcon({ size = 17, strokeWidth = 1.8, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon({ size = 17, strokeWidth = 1.8, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

const STATS = [
  { id: 1, value: 4, suffix: "+", label: "Years of Excellence" },
  { id: 2, value: 500, suffix: "+", label: "OT Doors Delivered" },
  { id: 3, value: 100, suffix: "%", label: "Cleanroom Compliance" },
];

const FOUNDERS = [
  {
    id: 1,
    name: "Neeraj Sharma",
    role: "Managing Director",
    bio: "Neeraj oversees manufacturing excellence, mechanical engineering, and quality assurance in Faridabad, supervising the fabrication of hermetic seals, radiation barriers, and automated hospital door systems.",
    image:
       "/assets/images/Profile/first.png",
    links: { linkedin: "#", twitter: "#", mail: "mailto:support@venushospitaldoors.com" },
  },
  {
    id: 2,
    name: "Poonam",
    role: "Managing Director",
    bio: "Poonam spearheads corporate strategy, regulatory compliance, and business development at Venus Hospital Door Solutions, ensuring every product aligns with international healthcare standards and customer requirements.",
    image:
      "/assets/images/Profile/second.png",
    links: { linkedin: "#", twitter: "#", mail: "mailto:info@venushospitaldoors.com" },
  },
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

function Stat({ value, suffix, label, active, delay }) {
  const count = useCountUp(value, active);
  return (
    <div className="company-stat" style={{ transitionDelay: `${delay}ms` }}>
      <p className="company-stat__value">
        {count.toLocaleString()}
        <span>{suffix}</span>
      </p>
      <p className="company-stat__label">{label}</p>
    </div>
  );
}

function FounderCard({ founder, active, delay }) {
  const initials = founder.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <article
      className="founder-card"
      data-visible={active}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="founder-card__portrait">
        <img src={founder.image} alt={founder.name} loading="lazy" />
        <span className="founder-card__monogram" aria-hidden="true">
          {initials}
        </span>
      </div>

      <div className="founder-card__content">
        <span className="founder-card__mark" aria-hidden="true">
          &ldquo;
        </span>
        <h3 className="founder-card__name">{founder.name}</h3>
        <p className="founder-card__role">{founder.role}</p>
        <p className="founder-card__bio">{founder.bio}</p>

        <div className="founder-card__links">
          {founder.links.linkedin && (
            <a href={founder.links.linkedin} aria-label={`${founder.name} on LinkedIn`}>
              <LinkedinIcon size={17} strokeWidth={1.8} />
            </a>
          )}
          {founder.links.twitter && (
            <a href={founder.links.twitter} aria-label={`${founder.name} on Twitter`}>
              <TwitterIcon size={17} strokeWidth={1.8} />
            </a>
          )}
          {founder.links.mail && (
            <a href={founder.links.mail} aria-label={`Email ${founder.name}`}>
              <Mail size={17} strokeWidth={1.8} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function CompanyFoundersSection() {
  const [companyRef, companyInView] = useInView({ threshold: 0.3 });
  const [foundersRef, foundersInView] = useInView({ threshold: 0.15 });

  return (
    <>
      {/* ---------------- Company info ---------------- */}
      <section className="company-section" ref={companyRef}>
        <div className="company-section__grid">
          <div className="company-section__media" data-visible={companyInView}>
            <img
              src="/assets/images/services/motorservice.png"
              alt="Venus Hospital Door Solutions sterile manufacturing"
              loading="lazy"
            />
          </div>

          <div className="company-section__content" data-visible={companyInView}>
            <div className="company-section__eyebrow">
              <span aria-hidden="true" />
              About Venus Hospital Door Solutions
            </div>

            <h2 className="company-section__heading">
              Dedicated to Precision Hospital Entry &amp; Cleanroom Infrastructure
            </h2>

            <p className="company-section__text">
              Established in 2022 in Faridabad, Haryana, Venus Hospital Door Solutions
              operates as a premier manufacturer and supplier of hospital doors,
              hermetic operation theater doors, automatic sliding systems, surgical pendants,
              and motor control panels (MCP).
            </p>
            <p className="company-section__text">
              From lead-lined radiation shielding doors to stainless steel scrub stations,
              our team ensures every product conforms to stringent healthcare guidelines,
              delivering durability, infection prevention, and airtight acoustic performance.
            </p>

            <div className="company-section__stats">
              {STATS.map((stat, i) => (
                <Stat
                  key={stat.id}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  active={companyInView}
                  delay={i * 120}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Meet the founders ---------------- */}
      <section className="founders-section" ref={foundersRef}>
        <div className="founders-section__inner">
          <div className="founders-section__intro" data-visible={foundersInView}>
            <h2 className="founders-section__heading">
              Leadership Driving Healthcare Infrastructure
            </h2>
            <p className="founders-section__subtext">
              Guided by experienced leadership, Venus Hospital Door Solutions combines
              business governance with engineering precision to deliver reliable medical door systems.
            </p>
          </div>

          <div className="founders-section__grid">
            {FOUNDERS.map((founder, i) => (
              <FounderCard
                key={founder.id}
                founder={founder}
                active={foundersInView}
                delay={200 + i * 160}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}