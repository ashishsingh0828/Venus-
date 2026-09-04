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
  { id: 1, value: 12, suffix: "+", label: "Years in business" },
  { id: 2, value: 5000, suffix: "+", label: "Projects completed" },
  { id: 3, value: 40, suffix: "+", label: "Skilled craftspeople" },
];

const FOUNDERS = [
  {
    id: 1,
    name: "Elena Whitfield",
    role: "Co-Founder & Creative Director",
    bio: "Elena trained as an interior architect before turning her attention to flooring, convinced the ground beneath a room shapes everything above it. She leads material sourcing and every showroom you'll walk through.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=700&h=860&fit=crop&crop=faces",
    links: { linkedin: "#", twitter: "#", mail: "mailto:elena@florem.example" },
  },
  {
    id: 2,
    name: "Marcus Odei",
    role: "Co-Founder & Head of Craft",
    bio: "Marcus spent nine years laying floors before he ever managed one. He still visits every job site in the first week, and the standards he set on day one are the ones the whole crew works to today.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=700&h=860&fit=crop&crop=faces",
    links: { linkedin: "#", twitter: "#", mail: "mailto:marcus@florem.example" },
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
              src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1100&h=1300&fit=crop"
              alt="A Florem craftsperson fitting timber flooring"
              loading="lazy"
            />
          </div>

          <div className="company-section__content" data-visible={companyInView}>
            <div className="company-section__eyebrow">
              <span aria-hidden="true" />
              About Florem
            </div>

            <h2 className="company-section__heading">
              Twelve years of crafting floors people love to walk on
            </h2>

            <p className="company-section__text">
              Florem started as a two-person workshop fitting reclaimed timber into
              old apartments, one room at a time. We're larger now, but the job
              hasn't changed: choose honest materials, cut them precisely, and lay
              them so well you forget they were ever installed.
            </p>
            <p className="company-section__text">
              Every project still passes through the same hands that started this
              company — from the first site visit to the last coat of finish.
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
              The two people who still sign off every floor
            </h2>
            <p className="founders-section__subtext">
              Florem is still run by the pair who started it — one from the design
              side, one from the trade. Between them, every job gets both.
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