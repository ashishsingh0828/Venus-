import React from "react";
import "./Servicess.css";

const SERVICES_DATA = [
  {
    id: 1,
    number: "01",
    title: "Industrial Flooring",
    description:
      "There are many variations passages of Lorem Ipsum available, but the majority have suffered",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="14" height="14" rx="2" />
        <path d="M8 3h12a2 2 0 0 1 2 2v12" />
        <path d="m5 11 8 8" />
        <path d="m5 15 4 4" />
        <path d="m9 11 4 4" />
      </svg>
    ),
  },
  {
    id: 2,
    number: "02",
    title: "Tiling & Concrete",
    description:
      "There are many variations passages of Lorem Ipsum available, but the majority have suffered",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 12h18" />
        <path d="M12 3v18" />
        <path d="m3 3 18 18" />
        <path d="m21 3-18 18" />
      </svg>
    ),
  },
  {
    id: 3,
    number: "03",
    title: "Oak Flooring",
    description:
      "There are many variations passages of Lorem Ipsum available, but the majority have suffered",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="m2 9 10-7 10 7-10 7L2 9Z" />
        <path d="m2 15 10 7 10-7" />
        <path d="m6 12 6 4.2 6-4.2" />
      </svg>
    ),
  },
  {
    id: 4,
    number: "04",
    title: "Vinyl Plank",
    description:
      "There are many variations passages of Lorem Ipsum available, but the majority have suffered",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="6" rx="1" />
        <rect x="3" y="14" width="18" height="6" rx="1" />
        <line x1="8" y1="4" x2="8" y2="10" />
        <line x1="16" y1="14" x2="16" y2="20" />
      </svg>
    ),
  },
  {
    id: 5,
    number: "05",
    title: "Carpets & rugs",
    description:
      "There are many variations passages of Lorem Ipsum available, but the majority have suffered",
    image:
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16v16H4z" />
        <path d="M4 8h16" />
        <path d="M4 16h16" />
        <path d="M8 4v16" />
        <path d="M16 4v16" />
      </svg>
    ),
  },
  {
    id: 6,
    number: "06",
    title: "Vein Patterns",
    description:
      "There are many variations passages of Lorem Ipsum available, but the majority have suffered",
    image:
      "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=800&auto=format&fit=crop&q=80",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21c3-6 4-11 9-11s6 5 9 11" />
        <path d="M12 10V3" />
        <path d="M7 16l5-4" />
        <path d="M17 16l-5-4" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section className="service-section">
      <div className="container">
        <div className="services-grid">
          {SERVICES_DATA.map((service) => (
            <div key={service.id} className="servicess-card">
              {/* Sliding Dark Layer with Background Image */}
              <div
                className="servicess-card__bg"
                style={{ backgroundImage: `url(${service.image})` }}
              >
                <div className="servicess-card__overlay" />
              </div>

              {/* Card Foreground Content */}
              <div className="servicess-card__content">
                <div className="servicess-card__top">
                  <span className="servicess-card__number">{service.number}</span>
                  <span className="servicess-card__dot" aria-hidden="true">
                    <span className="dot-inner" />
                  </span>
                </div>

                <h3 className="servicess-card__title">
                  <a href="#services">{service.title}</a>
                </h3>

                <div className="servicess-card__divider" />

                <p className="servicess-card__text">{service.description}</p>

                <div className="servicess-card__icon">{service.icon}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}