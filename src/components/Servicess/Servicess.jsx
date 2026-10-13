import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Servicess.css";

const DEFAULT_SERVICES = [
  {
    id: "hospital-ot-doors",
    number: "01",
    title: "Hospital & OT Doors",
    description:
      "Engineered SS304 and HPL hinged and sliding doors ensuring high hygiene, seamless operation, and acoustic sealing for sterile healthcare spaces.",
    image: "/assets/images/services/OT.png",
    icon: "DoorOpen",
    href: "/hospital-doors",
  },
  {
    id: "hermetic-sliding-doors",
    number: "02",
    title: "Hermetic Sliding Doors",
    description:
      "Airtight automated and manual hermetically sealed door units designed to sustain sterile air pressure differentials in operating theaters.",
    image: "/assets/images/services/hermetic.png",
    icon: "SlidersHorizontal",
    href: "/hermetic-doors",
  },
  {
    id: "radiation-shielding-doors",
    number: "03",
    title: "Radiation Shielding Doors",
    description:
      "Lead-lined SS304 and HPL radiation barrier doors providing maximum safety and shielding for X-ray rooms and radiology departments.",
    image: "/assets/images/services/radiationservices.png",
    icon: "ShieldCheck",
    href: "/radiationshielding-doors",
  },
  {
    id: "surgical-pendants",
    number: "04",
    title: "Surgical Pendants",
    description:
      "Ceiling-mounted single and double arm surgical and anesthesia pendants designed for clutter-free utility and gas management.",
    image: "/assets/images/services/pendant.png",
    icon: "Activity",
    href: "/surgical-pendant",
  },
  {
    id: "surgical-scrub-sinks",
    number: "05",
    title: "Surgical Scrub Sinks",
    description:
      "Heavy-duty SS304 surgical scrub stations featuring hands-free foot controls and sensors for contamination-free pre-op hygiene.",
    image: "/assets/images/services/scrub.png",
    icon: "Droplets",
    href: "/surgical-scrub",
  },
  {
    id: "motor-control-panels",
    number: "06",
    title: "Motor Control Panels",
    description:
      "Precision-built electrical motor control panels and hospital automation systems engineered for reliable performance and safety.",
    image: "/assets/images/services/motorservice.png",
    icon: "Cpu",
    href: "/motorsliding-doors",
  },
];

function getServiceIcon(iconName) {
  switch (iconName) {
    case "DoorOpen":
      return (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="12" y1="2" x2="12" y2="22" />
          <circle cx="9" cy="12" r="1" />
          <circle cx="15" cy="12" r="1" />
        </svg>
      );
    case "SlidersHorizontal":
      return (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="18" rx="2" />
          <line x1="12" y1="3" x2="12" y2="21" />
          <path d="m8 10-3 2 3 2" />
          <path d="m16 10 3 2-3 2" />
        </svg>
      );
    case "ShieldCheck":
      return (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <circle cx="12" cy="11" r="2" />
          <path d="M12 7v2" />
          <path d="m9 15 1.5-2" />
          <path d="m15 15-1.5-2" />
        </svg>
      );
    case "Activity":
      return (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="2" x2="12" y2="8" />
          <line x1="7" y1="8" x2="17" y2="8" />
          <line x1="7" y1="8" x2="5" y2="15" />
          <line x1="17" y1="8" x2="19" y2="15" />
          <rect x="3" y="15" width="18" height="6" rx="2" />
        </svg>
      );
    case "Droplets":
      return (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" />
          <path d="M12 4v7" />
          <path d="M9 7h6" />
          <path d="M8 12h8" />
        </svg>
      );
    case "Cpu":
    default:
      return (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <circle cx="9" cy="8" r="1.5" />
          <circle cx="15" cy="8" r="1.5" />
          <circle cx="9" cy="14" r="1.5" />
          <circle cx="15" cy="14" r="1.5" />
          <line x1="8" y1="18" x2="16" y2="18" />
        </svg>
      );
  }
}

export default function Services() {
  const [services, setServices] = useState(DEFAULT_SERVICES);

  useEffect(() => {
    fetch('/api/services')
      .then((res) => {
        if (!res.ok) throw new Error('API failed');
        return res.json();
      })
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setServices(data.data);
        }
      })
      .catch((err) => {
        // Fallback to DEFAULT_SERVICES
        console.log('Loading default services:', err.message);
      });
  }, []);

  return (
    <section className="service-section">
      <div className="container">
        <div className="services-grid">
          {services.map((service, index) => {
            const formattedNumber =
              service.number || String(index + 1).padStart(2, "0");
            const linkHref =
              service.href ||
              (service.slug ? `/services/${service.slug}` : "#services");

            return (
              <div key={service.id || index} className="servicess-card">
                <div
                  className="servicess-card__bg"
                  style={{ backgroundImage: `url(${service.image})` }}
                >
                  <div className="servicess-card__overlay" />
                </div>

                <div className="servicess-card__content">
                  <div className="servicess-card__top">
                    <span className="servicess-card__number">{formattedNumber}</span>
                    <span className="servicess-card__dot" aria-hidden="true">
                      <span className="dot-inner" />
                    </span>
                  </div>

                  <h3 className="servicess-card__title">
                    <Link to={linkHref}>{service.title}</Link>
                  </h3>

                  <div className="servicess-card__divider" />

                  <p className="servicess-card__text">{service.description}</p>

                  <div className="servicess-card__icon">
                    {typeof service.icon === "string"
                      ? getServiceIcon(service.icon)
                      : service.icon || getServiceIcon("DoorOpen")}
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
