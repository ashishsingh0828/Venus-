import { useEffect, useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import "./Gallery.css";

export const FALLBACK_PROJECTS = [
  {
    id: "aiims-modular-ot-hermetic-doors",
    slug: "aiims-modular-ot-hermetic-doors",
    title: "AIIMS Modular OT Hermetic Doors",
    category: "Hermetic Sliding Doors",
    client: "AIIMS New Delhi",
    location: "New Delhi, India",
    year: "2024",
    image: "/assets/images/Autoslides/automatic-hermetic-sliding-door.png",
  },
  {
    id: "apollo-radiation-shielding-doors",
    slug: "apollo-radiation-shielding-doors",
    title: "Apollo Hospital Radiation Shielding Doors",
    category: "Radiation Shielding Doors",
    client: "Apollo Multi-Specialty Hospital",
    location: "Faridabad & NCR",
    year: "2024",
    image: "/assets/images/Hospital door/leaned.png",
  },
  {
    id: "max-super-speciality-ss304-cleanroom-doors",
    slug: "max-super-speciality-ss304-cleanroom-doors",
    title: "Max Healthcare SS304 Cleanroom Doors",
    category: "Hospital & OT Doors",
    client: "Max Super Speciality Hospital",
    location: "Gurugram, Haryana",
    year: "2025",
    image: "/assets/images/Hospital door/SS304 HOSPITAL HINGED DOOR.png",
  },
  {
    id: "medanta-surgical-pendants-scrub-stations",
    slug: "medanta-surgical-pendants-scrub-stations",
    title: "Medanta Surgical Pendants & Scrub Sinks",
    category: "Surgical Pendants & Scrub Sinks",
    client: "Medanta The Medicity",
    location: "Gurugram, India",
    year: "2024",
    image: "/assets/images/Surgical Scrub/2-bay-surgical-scrub-sink.png",
  },
  {
    id: "fortis-motorized-airlock-system",
    slug: "fortis-motorized-airlock-system",
    title: "Fortis Escorts Motorized Airlock System",
    category: "Motor Automation",
    client: "Fortis Escorts Heart Institute",
    location: "New Delhi, India",
    year: "2025",
    image: "/assets/images/motor/motor-sliding.png",
  },
  {
    id: "manipal-hpl-hermetic-sliding-doors",
    slug: "manipal-hpl-hermetic-sliding-doors",
    title: "Manipal Hospital HPL Hermetic Doors",
    category: "Hermetic Sliding Doors",
    client: "Manipal Hospitals",
    location: "Dwarka, New Delhi",
    year: "2025",
    image: "/assets/images/Hospital door/HPL Hermatically Sealed Manual Sliding Lead Lined Door.png",
  },
];

export default function GalleryGrid() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleIds, setVisibleIds] = useState(() => new Set());
  const tileRefs = useRef({});

  // Fetch live dynamic projects from API
  useEffect(() => {
    let isMounted = true;
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && Array.isArray(data.data) && data.data.length > 0) {
          setProjects(data.data);
        }
      })
      .catch(() => {
        // Fallback to initial dataset
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const set = new Set(["All"]);
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory, projects]);

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.dataset.id;
          if (id) {
            setVisibleIds((prev) => new Set(prev).add(id));
          }
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    Object.values(tileRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [filteredProjects]);

  return (
    <section className="gallery-grid" aria-label="Project showcase">
      {/* Category Filter Pills */}
      <div className="gallery-filters-container">
        <div className="gallery-filters-wrapper">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`gallery-filter-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="gallery-grid__inner">
        {filteredProjects.map((project, index) => {
          const itemKey = project.id || project.slug || `proj-${index}`;
          const isVisible = visibleIds.has(itemKey);
          const detailUrl = `/project/${project.slug || project.id}`;

          return (
            <Link
              key={itemKey}
              ref={(el) => (tileRefs.current[itemKey] = el)}
              data-id={itemKey}
              to={detailUrl}
              className={`gallery-tile ${isVisible ? "is-visible" : ""}`}
              style={{ transitionDelay: `${(index % 6) * 80}ms` }}
              aria-label={`View project details: ${project.title}`}
            >
              <img
                src={project.image}
                alt={project.title}
                className="gallery-tile__image"
                loading="lazy"
                onError={(e) => {
                  e.target.src = "/assets/images/project/OT.png";
                }}
              />
              <span className="gallery-tile__scrim" aria-hidden="true" />

              <div className="gallery-tile__badge">
                <span>{project.category || "Hospital Project"}</span>
              </div>

              <div className="gallery-tile__panel">
                <div className="gallery-tile__meta">
                  <h3 className="gallery-tile__panel-title">{project.title}</h3>
                  {project.client && (
                    <p className="gallery-tile__panel-client">
                      <MapPin size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
                      {project.client} {project.location ? `· ${project.location}` : ""}
                    </p>
                  )}
                </div>
                <span className="gallery-tile__panel-btn" aria-hidden="true">
                  <ArrowRight size={18} strokeWidth={2.5} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
