import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import "./Gallery.css";

/**
 * Dummy dataset — swap `image` for real photos and `href` for real links
 * (a lightbox route, project page, or full-size image).
 */
export const GALLERY_ITEMS = [
  {
    id: "carpentry",
    image: "https://picsum.photos/seed/gallery-carpentry/700/860",
    alt: "Carpenter measuring a wood plank",
    caption: "Precision Carpentry",
    href: "/projects/carpentry",
  },
  {
    id: "power-tools",
    image: "https://picsum.photos/seed/gallery-power-tools/700/860",
    alt: "Power tool cutting through wood",
    caption: "Custom Cutting",
    href: "/projects/power-tools",
  },
  {
    id: "flooring-install",
    image: "https://picsum.photos/seed/gallery-flooring/700/860",
    alt: "Installer rolling out new flooring",
    caption: "Flooring Installation",
    href: "/projects/flooring-install",
  },
  {
    id: "tile-work",
    image: "https://picsum.photos/seed/gallery-tile/700/860",
    alt: "Close-up of tile installation",
    caption: "Tile & Stone Work",
    href: "/projects/tile-work",
  },
  {
    id: "finishing",
    image: "https://picsum.photos/seed/gallery-finishing/700/860",
    alt: "Finishing touches on hardwood floor",
    caption: "Final Finishing",
    href: "/projects/finishing",
  },
  {
    id: "consultation",
    image: "https://picsum.photos/seed/gallery-consult/700/860",
    alt: "Team reviewing a project plan on site",
    caption: "On-Site Consultation",
    href: "/projects/consultation",
  },
];

export default function GalleryGrid({ items = GALLERY_ITEMS }) {
  const [visibleIds, setVisibleIds] = useState(() => new Set());
  const tileRefs = useRef({});

  // Scroll-reveal: fade/slide each tile up the first time it enters view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.dataset.id;
          setVisibleIds((prev) => {
            const next = new Set(prev);
            next.add(id);
            return next;
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    Object.values(tileRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="gallery-grid" aria-label="Project gallery">
      <div className="gallery-grid__inner">
        {items.map((item, index) => (
          <a
            key={item.id}
            ref={(el) => (tileRefs.current[item.id] = el)}
            data-id={item.id}
            href={item.href}
            className={`gallery-tile ${visibleIds.has(item.id) ? "is-visible" : ""}`}
            style={{ transitionDelay: `${index * 90}ms` }}
            aria-label={`View project: ${item.caption}`}
          >
            <img
              src={item.image}
              alt={item.alt}
              className="gallery-tile__image"
              loading="lazy"
            />
            <span className="gallery-tile__scrim" aria-hidden="true" />
            <span className="gallery-tile__panel" aria-hidden="true">
              <span className="gallery-tile__panel-title">{item.caption}</span>
              <span className="gallery-tile__panel-btn">
                <ArrowRight size={18} strokeWidth={2} />
              </span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}