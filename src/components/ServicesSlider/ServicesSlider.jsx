import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, A11y } from "swiper/modules";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Square,
  Waves,
  Grid3x3,
  Fence,
  Lightbulb,
} from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./ServicesSlider.css";

export const SERVICES = [
  {
    id: "driveway-paving",
    image: "https://picsum.photos/seed/driveway-paving/700/900",
    icon: LayoutGrid,
    title: "Driveway Paving",
    description:
      "Our team uses premium materials and modern paving techniques to ensure every project lasts for decades.",
    href: "/services/driveway-paving",
  },
  {
    id: "walkway-installation",
    image: "https://picsum.photos/seed/walkway-installation/700/900",
    icon: Square,
    title: "Walkway Installation",
    description:
      "Custom-cut stone walkways that tie your landscaping together with clean, durable lines.",
    href: "/services/walkway-installation",
  },
  {
    id: "patio-pavers",
    image: "https://picsum.photos/seed/patio-pavers/700/900",
    icon: Grid3x3,
    title: "Patio Pavers",
    description:
      "Turn any backyard into an outdoor living space with a patio built to handle real use.",
    href: "/services/patio-pavers",
  },
  {
    id: "stone-pathways",
    image: "https://picsum.photos/seed/stone-pathways/700/900",
    icon: Waves,
    title: "Stone Pathways",
    description:
      "Hand-set natural stone pathways designed to weather beautifully, season after season.",
    href: "/services/stone-pathways",
  },
  {
    id: "retaining-walls",
    image: "https://picsum.photos/seed/retaining-walls/700/900",
    icon: Fence,
    title: "Retaining Walls",
    description:
      "Structural and decorative retaining walls engineered for long-term slope stability.",
    href: "/services/retaining-walls",
  },
  {
    id: "outdoor-lighting",
    image: "https://picsum.photos/seed/outdoor-lighting/700/900",
    icon: Lightbulb,
    title: "Outdoor Lighting",
    description:
      "Low-voltage lighting design that extends your hardscaping into the evening hours.",
    href: "/services/outdoor-lighting",
  },
];

export default function ServicesSlider({ services = SERVICES }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginationRef = useRef(null);

  return (
    <section className="services-slider" aria-label="Our services">
      <div className="services-slider__header">
        <div className="services-slider__heading">
          <span className="services-slider__eyebrow">Our Services</span>
          <h2 className="services-slider__title">What We Do</h2>
        </div>

        <div className="services-slider__controls">
          <div ref={paginationRef} className="services-slider__pagination" />
          <div className="services-slider__arrows">
            <button
              ref={prevRef}
              type="button"
              className="services-slider__arrow"
              aria-label="Previous service"
            >
              <ChevronLeft size={18} strokeWidth={2} />
            </button>
            <button
              ref={nextRef}
              type="button"
              className="services-slider__arrow"
              aria-label="Next service"
            >
              <ChevronRight size={18} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      <Swiper
        modules={[Pagination, Navigation, Autoplay, A11y]}
        spaceBetween={24}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        watchOverflow
        a11y={{ enabled: true }}
        breakpoints={{
          640: { slidesPerView: 1.5, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
        pagination={{
          el: null,
          clickable: true,
          renderBullet: (_index, className) =>
            `<span class="${className} services-slider__dot"></span>`,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.params.pagination.el = paginationRef.current;
        }}
        navigation={{ prevEl: null, nextEl: null }}
        className="services-slider__swiper"
      >
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <SwiperSlide key={service.id}>
              <article className="service-card">
                <img
                  src={service.image}
                  alt={service.title}
                  className="service-card__image"
                  loading="lazy"
                />
                <div className="service-card__scrim" />

                <span className="service-card__badge" aria-hidden="true">
                  <Icon size={20} strokeWidth={1.75} />
                </span>

                <div className="service-card__panel">
                  <h3 className="service-card__title">{service.title}</h3>
                  <p className="service-card__description">{service.description}</p>
                  <a
                    href={service.href}
                    className="service-card__cta"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    <ArrowUpRight size={18} strokeWidth={2} />
                  </a>
                </div>
              </article>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}