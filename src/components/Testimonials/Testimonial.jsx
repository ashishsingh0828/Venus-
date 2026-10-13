import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import { Star, ArrowLeft, ArrowRight, Quote } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";
import "./Testimonial.css";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Dr. Arvind Mehta",
    role: "OT In-Charge & Surgeon",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=160&h=160&fit=crop&crop=faces",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&h=1000&fit=crop",
    quote:
      "Venus Hospital Door Solutions installed hermetically sealed sliding doors across our surgical suites. The airtight performance, seamless flush frames, and silent automation have significantly improved our OT sterile containment.",
  },
  {
    id: 2,
    name: "Rajesh Kulkarni",
    role: "Hospital Infrastructure Consultant",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=faces",
    image:
      "/assets/images/services/hermetic.png",
    quote:
      "Their custom SS304 lead-lined radiation doors for our radiology wing exceeded inspection standards. Excellent fabrication quality, timely delivery from their Faridabad plant, and precise on-site subframe alignment.",
  },
  {
    id: 3,
    name: "Vikram Singhania",
    role: "Biomedical Project Director",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&h=160&fit=crop&crop=faces",
    image:
      "/assets/images/services/motorservice.png",
    quote:
      "From dual-arm surgical ceiling pendants to automatic foot-operated scrub sinks and motor control panels, Venus delivered durable healthcare equipment that easily withstands demanding 24/7 hospital duty cycles.",
  },
];

export default function Testimonial() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="testimonials-section" aria-label="Client testimonials">
      <div className="testimonials-section__inner">
        <header className="testimonials-section__header">
          <div className="testimonials-section__eyebrow">
            <span className="testimonials-section__eyebrow-mark" aria-hidden="true" />
            <span>Client Testimonials</span>
            <span className="testimonials-section__eyebrow-mark" aria-hidden="true" />
          </div>

          <div className="testimonials-section__heading-row">
            <h2 className="testimonials-section__heading">
              Trusted by Healthcare
              <br />
              &amp; Hospital Specialists
            </h2>

            <div className="testimonials-section__arrows">
              <button
                ref={prevRef}
                type="button"
                className="testimonials-section__arrow"
                aria-label="Previous testimonial"
              >
                <ArrowLeft size={18} strokeWidth={2} />
              </button>
              <button
                ref={nextRef}
                type="button"
                className="testimonials-section__arrow"
                aria-label="Next testimonial"
              >
                <ArrowRight size={18} strokeWidth={2} />
              </button>
            </div>
          </div>
        </header>

        <Swiper
          modules={[Navigation, Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={700}
          loop
          autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          className="testimonials-section__swiper"
        >
          {TESTIMONIALS.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="testimonial-slide">
                <div className="testimonial-slide__media">
                  <img src={t.image} alt={t.name} loading="lazy" />
                </div>

                <div className="testimonial-card">
                  <div className="testimonial-card__top">
                    <img
                      className="testimonial-card__avatar"
                      src={t.avatar}
                      alt={t.name}
                    />
                    <div className="testimonial-card__person">
                      <p className="testimonial-card__name">{t.name}</p>
                      <p className="testimonial-card__role">{t.role}</p>
                    </div>
                    <Quote
                      className="testimonial-card__quote-icon"
                      aria-hidden="true"
                      strokeWidth={1.5}
                    />
                  </div>

                  <div className="testimonial-card__stars" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < t.rating ? "currentColor" : "none"}
                        className={
                          i < t.rating
                            ? "star star--filled"
                            : "star star--empty"
                        }
                      />
                    ))}
                  </div>

                  <p className="testimonial-card__text">{t.quote}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}