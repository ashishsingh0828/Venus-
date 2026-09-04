import { useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "./Project.css";



const CATEGORIES = ["All Projects", "Residential", "Commercial", "Paving", "Vinyl Sheet"];

const PROJECTS = [
  {
    id: 1,
    title: "Hearth & Oak Living Room",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&h=1100&fit=crop",
  },
  {
    id: 2,
    title: "New Office Floor",
    category: "Commercial",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&h=1100&fit=crop",
  },
  {
    id: 3,
    title: "Driveway Paving Work",
    category: "Paving",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=1100&fit=crop",
  },
  {
    id: 4,
    title: "Vinyl Sheet Suite",
    category: "Vinyl Sheet",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900&h=1100&fit=crop",
  },
  {
    id: 5,
    title: "Bath Marble Finish",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=900&h=1100&fit=crop",
  },
  {
    id: 6,
    title: "Bamboo Hallway",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=900&h=1100&fit=crop",
  },
  {
    id: 7,
    title: "Showroom Concrete Seal",
    category: "Commercial",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&h=1100&fit=crop",
  },
  {
    id: 8,
    title: "Courtyard Stone Paving",
    category: "Paving",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=1100&fit=crop",
  },
];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const filtered = useMemo(() => {
    if (activeCategory === "All Projects") return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="projects-section">
      <div className="projects-section__scrim" aria-hidden="true" />

      <div className="projects-section__inner">
        <header className="projects-section__header">
          <div className="projects-section__heading-block">
            <h2 className="projects-section__heading">Recent Projects</h2>
            <span className="projects-section__underline" aria-hidden="true" />
          </div>

          <nav className="projects-section__filters" aria-label="Filter projects by category">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`projects-section__filter${
                  cat === activeCategory ? " projects-section__filter--active" : ""
                }`}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={cat === activeCategory}
              >
                {cat}
              </button>
            ))}
          </nav>
        </header>

        <div className="projects-section__carousel">
          <Swiper
            key={activeCategory}
            modules={[Navigation, FreeMode]}
            freeMode={{ enabled: true, momentumRatio: 0.6 }}
            slidesPerView={1.15}
            spaceBetween={20}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
              560: { slidesPerView: 1.6, spaceBetween: 20 },
              820: { slidesPerView: 2.4, spaceBetween: 22 },
              1100: { slidesPerView: 3.3, spaceBetween: 24 },
              1400: { slidesPerView: 4.2, spaceBetween: 26 },
            }}
            className="projects-swiper"
          >
            {filtered.map((project, i) => (
              <SwiperSlide key={project.id}>
                <a
                  href="#"
                  className="project-card"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="project-card__image">
                    <img src={project.image} alt="" loading="lazy" />
                  </div>
                  <span className="project-card__go" aria-hidden="true">
                    <ArrowUpRight size={16} strokeWidth={2.25} />
                  </span>
                  <div className="project-card__body">
                    <p className="project-card__category">{project.category}</p>
                    <h3 className="project-card__title">{project.title}</h3>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="projects-section__arrows">
            <button
              ref={prevRef}
              type="button"
              className="projects-section__arrow"
              aria-label="Previous projects"
            >
              <ArrowLeft size={18} strokeWidth={2} />
            </button>
            <button
              ref={nextRef}
              type="button"
              className="projects-section__arrow"
              aria-label="Next projects"
            >
              <ArrowRight size={18} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}