import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import "./Hero.css";

/**
 * Slide dataset shape:
 * {
 *   id: string,
 *   video: string,        // mp4 source
 *   poster: string,       // fallback / loading image
 *   badge: string,        // small eyebrow tag
 *   title: string,        // headline (can include a <br /> break point via '\n')
 *   description: string,
 *   primaryCta: { label: string, href: string },
 *   secondaryCta: { label: string, href: string },
 * }
 */
export const SLIDES = [
  {
    id: "refinishing",
    video: "/videos/hero-refinishing.mp4",
    poster: "/images/hero-refinishing.jpg",
    badge: "Hardwood Refinishing",
    title: "Bring your\nfloors back to life",
    description:
      "Sand, stain, and seal — we restore worn hardwood to a showroom finish in as little as two days.",
    primaryCta: { label: "Get a free estimate", href: "#contact" },
    secondaryCta: { label: "See the process", href: "#services" },
  },
  {
    id: "installation",
    video: "/videos/hero-installation.mp4",
    poster: "/images/hero-installation.jpg",
    badge: "New Installation",
    title: "Precision flooring,\nbuilt to last",
    description:
      "From oak to engineered luxury vinyl, our crews install with a level of care that shows for decades.",
    primaryCta: { label: "Get a free estimate", href: "#contact" },
    secondaryCta: { label: "View materials", href: "#projects" },
  },
  {
    id: "commercial",
    video: "/videos/hero-commercial.mp4",
    poster: "/images/hero-commercial.jpg",
    badge: "Commercial Projects",
    title: "Floors that hold up\nto real traffic",
    description:
      "Retail, offices, and hospitality — durable finishes scheduled around your business, not ours.",
    primaryCta: { label: "Talk to our team", href: "#contact" },
    secondaryCta: { label: "See our work", href: "#projects" },
  },
];

const FALLBACK_DURATION_MS = 8000;

export default function HeroSlider({ slides = SLIDES }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const videoRefs = useRef([]);
  const fallbackTimer = useRef(null);
  const rafId = useRef(null);

  const slideCount = slides.length;

  const clearTimers = useCallback(() => {
    if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
    if (rafId.current) cancelAnimationFrame(rafId.current);
  }, []);

  const goToSlide = useCallback(
    (index) => {
      clearTimers();
      setProgress(0);
      setActiveIndex(((index % slideCount) + slideCount) % slideCount);
    },
    [clearTimers, slideCount]
  );

  const goNext = useCallback(() => goToSlide(activeIndex + 1), [activeIndex, goToSlide]);
  const goPrev = useCallback(() => goToSlide(activeIndex - 1), [activeIndex, goToSlide]);

  // Drive playback + progress tracking for the active slide
  useEffect(() => {
    const video = videoRefs.current[activeIndex];
    clearTimers();
    setProgress(0);

    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === activeIndex) return;
      v.pause();
      v.currentTime = 0;
    });

    if (!video) {
      // No video element (e.g. failed source) — use a flat fallback timer
      fallbackTimer.current = setTimeout(goNext, FALLBACK_DURATION_MS);
      return clearTimers;
    }

    if (isPlaying) {
      const playPromise = video.play();
      if (playPromise?.catch) playPromise.catch(() => {});
    }

    // Fallback in case metadata/ended never fires (blocked autoplay, bad source)
    fallbackTimer.current = setTimeout(goNext, FALLBACK_DURATION_MS);

    const tick = () => {
      if (video.duration) {
        setProgress(Math.min(video.currentTime / video.duration, 1));
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, isPlaying]);

  const handleEnded = () => goNext();

  const handleError = () => {
    // Source failed to load — don't get stuck, move on shortly after
    clearTimers();
    fallbackTimer.current = setTimeout(goNext, 1200);
  };

  const togglePlayback = () => {
    const video = videoRefs.current[activeIndex];
    setIsPlaying((wasPlaying) => {
      const next = !wasPlaying;
      if (video) {
        if (next) video.play().catch(() => {});
        else video.pause();
      }
      if (next) {
        fallbackTimer.current = setTimeout(goNext, FALLBACK_DURATION_MS);
      } else if (fallbackTimer.current) {
        clearTimeout(fallbackTimer.current);
      }
      return next;
    });
  };

  const activeSlide = slides[activeIndex];

  return (
    <section className="hero-slider" aria-label="Featured work">
      {/* Video layers */}
      <div className="hero-slider__stage">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slider__layer ${index === activeIndex ? "is-active" : ""}`}
            aria-hidden={index !== activeIndex}
          >
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              className="hero-slider__video"
              src={slide.video}
              poster={slide.poster}
              muted
              playsInline
              autoPlay={index === activeIndex}
              preload={Math.abs(index - activeIndex) <= 1 ? "auto" : "none"}
              onEnded={index === activeIndex ? handleEnded : undefined}
              onError={index === activeIndex ? handleError : undefined}
            />
          </div>
        ))}
        <div className="hero-slider__overlay" />
      </div>

      {/* Content */}
      <div className="hero-slider__content">
        <div className="hero-slider__inner" key={activeSlide.id}>
          <span className="hero-slider__badge">{activeSlide.badge}</span>
          <h1 className="hero-slider__title">
            {activeSlide.title.split("\n").map((line, i) => (
              <span className="hero-slider__title-line" key={i}>
                {line}
              </span>
            ))}
          </h1>
          <p className="hero-slider__description">{activeSlide.description}</p>
          <div className="hero-slider__ctas">
            <a href={activeSlide.primaryCta.href} className="hero-slider__cta hero-slider__cta--primary">
              {activeSlide.primaryCta.label}
            </a>
            <a href={activeSlide.secondaryCta.href} className="hero-slider__cta hero-slider__cta--secondary">
              {activeSlide.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        type="button"
        className="hero-slider__arrow hero-slider__arrow--prev"
        onClick={goPrev}
        aria-label="Previous slide"
      >
        <ChevronLeft size={22} strokeWidth={1.75} />
      </button>
      <button
        type="button"
        className="hero-slider__arrow hero-slider__arrow--next"
        onClick={goNext}
        aria-label="Next slide"
      >
        <ChevronRight size={22} strokeWidth={1.75} />
      </button>

      {/* Progress / pagination */}
      <div className="hero-slider__controls">
        <button
          type="button"
          className="hero-slider__play-toggle"
          onClick={togglePlayback}
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? <Pause size={14} strokeWidth={2} /> : <Play size={14} strokeWidth={2} />}
        </button>

        <div className="hero-slider__progress-track" role="tablist" aria-label="Slides">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Go to slide: ${slide.badge}`}
              className={`hero-slider__progress-seg ${index === activeIndex ? "is-active" : ""} ${
                index < activeIndex ? "is-complete" : ""
              }`}
              onClick={() => goToSlide(index)}
            >
              <span
                className="hero-slider__progress-fill"
                style={{
                  transform: `scaleX(${
                    index === activeIndex ? progress : index < activeIndex ? 1 : 0
                  })`,
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}