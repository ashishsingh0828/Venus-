import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "./Project.css";



const CATEGORIES = [
  "All Projects",
  "Hospital & OT Doors",
  "Labs",
];

const PROJECTS = [
  // Hospital & OT Doors
  {
    id: 1,
    title: "Operation Theater SS Door",
    category: "Hospital & OT Doors",
    image: "/assets/images/Autoslides/operation-theater-sliding-doors.png",
  },
  {
    id: 2,
    title: "Hospital Automatic Hermetic OT Door",
    category: "Hospital & OT Doors",
    image: "/assets/images/Autoslides/automatic-hermetic-sliding-door.png",
  },
  {
    id: 3,
    title: "Hospital Hermetically Sealed OT Door",
    category: "Hospital & OT Doors",
    image: "/assets/images/Autoslides/hermetically-sealed-sliding-door.png",
  },
  {
    id: 4,
    title: "Hermetically Sealed Sliding Hospital Door",
    category: "Hospital & OT Doors",
    image:
      "/assets/images/Autoslides/hermetically-sealed-sliding-hospital-door.png",
  },
  {
    id: 5,
    title: "Lead Lined Doors",
    category: "Hospital & OT Doors",
    image: "/assets/images/Hospital door/leaned.png",
  },
  {
    id: 6,
    title: "HPL Hinge Lead Door",
    category: "Hospital & OT Doors",
    image: "/assets/images/Hospital door/HPL Hinge Lead Door.png",
  },
  {
    id: 7,
    title: "SS304 Hospital Hinged Door",
    category: "Hospital & OT Doors",
    image: "/assets/images/Hospital door/SS304 HOSPITAL HINGED DOOR.png",
  },
  {
    id: 8,
    title: "SS304 Single Leaf Hinged Door",
    category: "Hospital & OT Doors",
    image:
      "/assets/images/Hospital door/SS304 Single Leaf Hinged Door.png",
  },
  {
    id: 9,
    title: "HPL Hermetically Sealed Manual Sliding Lead Lined Door",
    category: "Hospital & OT Doors",
    image:
      "/assets/images/Hospital door/HPL Hermatically Sealed Manual Sliding Lead Lined Door.png",
  },
  {
    id: 10,
    title: "SS304 Hospital Door",
    category: "Hospital & OT Doors",
    image: "/assets/images/Hospital door/Ss 304 Hospital Door.png",
  },
  {
    id: 11,
    title: "SS304 Lead Single Leaf Hinged Door",
    category: "Hospital & OT Doors",
    image:
      "/assets/images/Hospital door/SS304 Lead Single Leaf Hinged Door.png",
  },
  {
    id: 12,
    title: "SS304 Double Leaf Lead Hinged Door",
    category: "Hospital & OT Doors",
    image:
      "/assets/images/Hospital door/SS304 Double Leaf Lead Hinged Door.png",
  },
  {
    id: 13,
    title: "Operation Theater Double Doors",
    category: "Hospital & OT Doors",
    image:
      "/assets/images/Hospital door/operation-theater-double-doors.png",
  },

  // Surgical Scrub Sinks
  {
    id: 14,
    title: "Foot Operated Automatic Surgical Scrub Sink For Hospital",
    category: "Hospital & OT Doors",
    image:
      "/assets/images/Surgical Scrub/Foot Operated Automatic Surgical Scrub Sink For Hospital.png",
  },
  {
    id: 15,
    title: "Stainless Steel Surgical Scrub Sink Station",
    category: "Hospital & OT Doors",
    image:
      "/assets/images/Surgical Scrub/stainless-steel-surgical-scrub-sink-station.png",
  },

  // Surgical Pendants
  {
    id: 16,
    title: "Double Arm Pendant",
    category: "Hospital & OT Doors",
    image: "/assets/images/Surgical Pendant/Double Arm Pendant.png",
  },
  {
    id: 17,
    title: "Single Arm Surgical Pendant",
    category: "Hospital & OT Doors",
    image:
      "/assets/images/Surgical Pendant/Single Arm Surgical Pendant.png",
  },
  {
    id: 18,
    title: "Anesthesia Straight Pendant",
    category: "Hospital & OT Doors",
    image:
      "/assets/images/Surgical Pendant/anesthesia-straight-pendant.png",
  },
  {
    id: 19,
    title: "Hospital Surgical Pendant",
    category: "Hospital & OT Doors",
    image:
      "/assets/images/Surgical Pendant/Hospital-surgical-pendant.png",
  },
   {
    id: 20,
    title: "Double Arm Pendant",
  category: "Labs",
    image: "/assets/images/Surgical Pendant/Double Arm Pendant.png",
  },
  {
    id: 21,
    title: "Single Arm Surgical Pendant",
   category: "Labs",
    image:
      "/assets/images/Surgical Pendant/Single Arm Surgical Pendant.png",
  },
  {
    id: 22,
    title: "Anesthesia Straight Pendant",
    category: "Labs",
    image:
      "/assets/images/Surgical Pendant/anesthesia-straight-pendant.png",
  },
  {
    id: 23,
    title: "Hospital Surgical Pendant",
    category: "Labs",
    image:
      "/assets/images/Surgical Pendant/Hospital-surgical-pendant.png",
  },

];

export default function ProjectsSection() {
  const [projectList, setProjectList] = useState(PROJECTS);
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && Array.isArray(data.data) && data.data.length > 0) {
          // Combine dynamic projects at the top, followed by any additional items
          const apiProjects = data.data.map((p) => ({
            id: p.id,
            slug: p.slug || p.id,
            title: p.title,
            category: p.category || "Hospital & OT Doors",
            image: p.image || "/assets/images/project/OT.png",
          }));
          setProjectList(apiProjects);
        }
      })
      .catch(() => {
        // Graceful fallback to static list
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(["All Projects"]);
    projectList.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    return Array.from(cats);
  }, [projectList]);

  const filtered = useMemo(() => {
    if (activeCategory === "All Projects") return projectList;
    return projectList.filter((p) => p.category === activeCategory);
  }, [activeCategory, projectList]);

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
            {categories.map((cat) => (
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
                <Link
                  to={`/project/${project.slug || project.id}`}
                  className="project-card"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="project-card__image">
                    <img src={project.image} alt={project.title} loading="lazy" />
                  </div>
                  <span className="project-card__go" aria-hidden="true">
                    <ArrowUpRight size={16} strokeWidth={2.25} />
                  </span>
                  <div className="project-card__body">
                    <p className="project-card__category">{project.category}</p>
                    <h3 className="project-card__title">{project.title}</h3>
                  </div>
                </Link>
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