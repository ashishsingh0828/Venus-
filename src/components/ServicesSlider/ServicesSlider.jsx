import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, A11y } from "swiper/modules";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  DoorOpen,
  SlidersHorizontal,
  ShieldCheck,
  Activity,
  Droplets,
  Cpu,
} from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./ServicesSlider.css";

const ICON_MAP = {
  DoorOpen,
  SlidersHorizontal,
  ShieldCheck,
  Activity,
  Droplets,
  Cpu,
};

export const SERVICES = [
  {
    id: "hospital-ot-doors",
    image: "/assets/images/services/OT.png",
    icon: DoorOpen,
    title: "Hospital & OT Doors",
    description:
      "Precision-built SS304 and HPL single, double, and unequal leaf hinged doors built for hygienic, heavy clinical traffic.",
    href: "/hospital-doors",
  },
  {
    id: "hermetic-doors",
    image: "/assets/images/services/hermetic.png",
    icon: SlidersHorizontal,
    title: "Hermetic Doors",
    description:
      "Airtight manual and automated cleanroom sliding doors engineered to sustain positive air pressure differentials in operating theaters.",
    href: "/hermetic-doors",
  },
  {
    id: "radiation-shielding-doors",
    image: "/assets/images/services/radiationservices.png",
    icon: ShieldCheck,
    title: "Radiation Shielding Doors",
    description:
      "Certified lead-lined SS304 and HPL barrier doors providing dependable radiation protection for X-ray and CT scan rooms.",
    href: "/radiationshielding-doors",
  },
  {
    id: "surgical-pendants",
    image: "/assets/images/services/pendant.png",
    icon: Activity,
    title: "Surgical Pendants",
    description:
      "Ceiling-mounted single and double arm pendants for streamlined medical gas distribution and equipment cable management.",
    href: "/surgical-pendant",
  },
  {
    id: "surgical-scrub-sinks",
    image: "/assets/images/services/scrub.png",
    icon: Droplets,
    title: "Surgical Scrub Sinks",
    description:
      "Hands-free, foot-operated and sensor-based stainless steel surgical scrub sink stations for contamination-free pre-op prep.",
    href: "/surgical-scrub",
  },
  {
    id: "motor-control-panels",
    image: "/assets/images/services/motorservice.png",
    icon: Cpu,
    title: "Motor Control Panels",
    description:
      "Custom Motor Control Panels (MCP) and automated door drive assemblies designed for seamless hospital automation.",
    href: "/motorsliding-doors",
  },
];

export default function ServicesSlider({ services: propServices }) {
  const [sliderServices, setSliderServices] = useState(propServices || SERVICES);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginationRef = useRef(null);

  useEffect(() => {
    if (propServices) {
      setSliderServices(propServices);
      return;
    }

    fetch('/api/services')
      .then((res) => {
        if (!res.ok) throw new Error('API request failed');
        return res.json();
      })
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const mapped = data.data.map((item) => {
            const IconComponent =
              typeof item.icon === 'string' && ICON_MAP[item.icon]
                ? ICON_MAP[item.icon]
                : DoorOpen;

            return {
              id: item.id,
              image: item.image || '/assets/images/services/OT.png',
              icon: IconComponent,
              title: item.title,
              description: item.description,
              href: item.href || (item.slug ? `/services/${item.slug}` : '/services'),
            };
          });
          setSliderServices(mapped);
        }
      })
      .catch((err) => {
        console.log('Using static services slider fallback:', err.message);
      });
  }, [propServices]);

  return (
    <section className="services-slider" aria-label="Our services">
      <div className="services-slider__header">
        <div className="services-slider__heading">
          <span className="services-slider__eyebrow">Our Products &amp; Solutions</span>
          <h2 className="services-slider__title">What We Manufacture</h2>
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
        loop={sliderServices.length > 3}
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
        {sliderServices.map((service) => {
          const Icon = service.icon || DoorOpen;
          return (
            <SwiperSlide key={service.id}>
              <article className="service-card">
                <img
                  src={service.image}
                  alt={service.title}
                  className="service-card__image"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = '/assets/images/services/OT.png';
                  }}
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
