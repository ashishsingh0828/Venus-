import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "./Insta.css";

function InstagramIcon({ size = 26, strokeWidth = 1.75, className = "" }) {
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
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export const GALLERY_IMAGES = [
  { id: "g1", image: "https://picsum.photos/seed/floor-gallery-1/500/500", href: "https://instagram.com" },
  { id: "g2", image: "https://picsum.photos/seed/floor-gallery-2/500/500", href: "https://instagram.com" },
  { id: "g3", image: "https://picsum.photos/seed/floor-gallery-3/500/500", href: "https://instagram.com" },
  { id: "g4", image: "https://picsum.photos/seed/floor-gallery-4/500/500", href: "https://instagram.com" },
  { id: "g5", image: "https://picsum.photos/seed/floor-gallery-5/500/500", href: "https://instagram.com" },
  { id: "g6", image: "https://picsum.photos/seed/floor-gallery-6/500/500", href: "https://instagram.com" },
  { id: "g7", image: "https://picsum.photos/seed/floor-gallery-7/500/500", href: "https://instagram.com" },
  { id: "g8", image: "https://picsum.photos/seed/floor-gallery-8/500/500", href: "https://instagram.com" },
  { id: "g9", image: "https://picsum.photos/seed/floor-gallery-9/500/500", href: "https://instagram.com" },
  { id: "g10", image: "https://picsum.photos/seed/floor-gallery-10/500/500", href: "https://instagram.com" },
];

export default function HeroWithGallery({
  eyebrow = "Let Us Change Your Home Look",
  title = "A Whole Approach To Realizing Your Flooring Goals",
  ctaLabel = "Explore More",
  ctaHref = "#services",
  heroImage = "https://picsum.photos/seed/hero-worker/640/780",
  images = GALLERY_IMAGES,
}) {
  return (
    <section className="hero-gallery">
      <div className="hero-gallery__container">
        <div className="hero-gallery__box">
          <span className="hero-gallery__ring" aria-hidden="true" />

          <div className="hero-gallery__media">
            <img
              src={heroImage}
              alt="Flooring specialist at work"
              className="hero-gallery__image"
            />
          </div>

          <div className="hero-gallery__content">
            <p className="hero-gallery__eyebrow">
              <span className="hero-gallery__eyebrow-mark" aria-hidden="true" />
              {eyebrow}
              <span className="hero-gallery__eyebrow-mark" aria-hidden="true" />
            </p>
            <h2 className="hero-gallery__title">{title}</h2>
            <a href={ctaHref} className="hero-gallery__cta">
              <span>{ctaLabel}</span>
              <span className="hero-gallery__cta-divider" aria-hidden="true" />
              <ArrowRight size={18} strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>

      <div className="hero-gallery__marble">
        <Swiper
          modules={[Autoplay]}
          loop
          loopAdditionalSlides={6}
          speed={900}
          spaceBetween={0}
          slidesPerView={2}
          autoplay={{
            delay: 2200,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            480: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
          className="hero-gallery__swiper"
        >
          {images.map((item) => (
            <SwiperSlide key={item.id}>
              <a
                href={item.href}
                className="hero-gallery__tile"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View this post on Instagram"
              >
                <img
                  src={item.image}
                  alt="Gallery photo"
                  className="hero-gallery__tile-image"
                  loading="lazy"
                />
                <span className="hero-gallery__tile-overlay" aria-hidden="true">
                  <InstagramIcon size={26} strokeWidth={1.75} />
                </span>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}