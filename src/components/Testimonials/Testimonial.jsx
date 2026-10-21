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
    name: "Medicareplus Healthcare Pvt Ltd",
    rating: 5,
    avatar:
      "https://api.dicebear.com/7.x/bottts/svg?seed=medicareplus",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&h=1000&fit=crop",
    quote:
      "Venus Hospital Door Solutions installed hermetically sealed sliding doors across our surgical suites. The airtight performance, seamless flush frames, and silent automation have significantly improved our OT sterile containment.",
  },
  {
    id: 2,
    name: "Kashi Medical System Pvt Ltd",
    rating: 5,
    avatar:
      "https://api.dicebear.com/7.x/bottts/svg?seed=kashi",
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=900&h=1000&fit=crop",
    quote:
      "Their motorized lead-lined radiation shielding doors and ICU partition systems met all AERB compliance checks seamlessly. Excellent fabrication precision and robust build quality.",
  },
  {
    id: 3,
    name: "Param Medical Pvt Ltd",
    rating: 5,
    avatar:
      "https://api.dicebear.com/7.x/bottts/svg?seed=param",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=900&h=1000&fit=crop",
    quote:
      "From dual-arm surgical ceiling pendants to automatic sensor scrub sinks, Venus delivered top-tier healthcare equipment that withstands demanding 24/7 continuous clinical duty cycles.",
  },
  {
    id: 4,
    name: "AIIMS, Safdarjung",
    rating: 5,
    avatar:
      "https://api.dicebear.com/7.x/bottts/svg?seed=aiims",
    image:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=900&h=1000&fit=crop",
    quote:
      "Handling high-volume public hospital traffic demands sheer durability. The automated hermetic OT doors and crash-resistant barrier frames have functioned flawlessly without downtime.",
  },
  {
    id: 5,
    name: "Tata Hospital, Ranchi",
    rating: 5,
    avatar:
      "https://api.dicebear.com/7.x/bottts/svg?seed=tata",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=900&h=1000&fit=crop",
    quote:
      "Venus provided end-to-end support for our oncology and cleanroom setups. Their flush glazing, antimicrobial coatings, and touchless access sensors meet the highest international infection control protocols.",
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