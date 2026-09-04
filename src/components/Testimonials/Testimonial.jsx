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
    name: "Guy Hawkins",
    role: "Property Owner",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=faces",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&h=1000&fit=crop",
    quote:
      "Venus Paving transformed our uneven gravel driveway into an immaculate cobblestone entrance. Their attention to grading and stone alignment was exceptional.",
  },
  {
    id: 2,
    name: "Courtney Henry",
    role: "Landscape Consultant",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop&crop=faces",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=900&h=1000&fit=crop",
    quote:
      "The crew walked us through every phase of the patio stone selection with genuine patience and skill. What used to be an unruly lawn is now our favorite living area.",
  },
  {
    id: 3,
    name: "Robert Fox",
    role: "Site Manager",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&h=160&fit=crop&crop=faces",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=1000&fit=crop",
    quote:
      "Clean stonework, honest quotes, and they finished the retaining walls ahead of schedule. Rare to find a hardscaping crew this reliable and detail-oriented.",
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
              What People Are Saying
              <br />
              About Venus Paving
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