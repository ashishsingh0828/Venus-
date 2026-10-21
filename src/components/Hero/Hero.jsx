import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from "lucide-react";
import "./Hero.css";

export const SLIDES = [
  {
    id: "hermetic-doors",
    video: "/assets/images/Profile/image.png",
    poster: "/assets/images/Profile/image.png",
    badge: "Hermetic & OT Solutions",
    title: "Precision engineered\nhermetic sliding doors",
    description:
      "Airtight sealing systems engineered for operation theatres, isolation wards, and sterile cleanroom environments.",
    primaryCta: { label: "Request a quote", href: "/contact" },
    secondaryCta: { label: "Explore doors", href: "/contact" },
  },
  {
  id: "surgical-pendants",
  video: "/assets/images/Profile/hero2.png", 
  poster: "/assets/images/Profile/hero2.png", 
  badge: "OR Workflow & Infrastructure",
  title: "Precision surgical\npendant systems",
  description:
    "Ceiling-mounted supply units engineered to streamline gas, power, and data routing for clutter-free, sterile operating environments.",
  primaryCta: { label: "Request configuration", href: "/contact" },
  secondaryCta: { label: "Explore pendant range", href: "/contact" },
},
  {
    id: "modular-theatres",
    video: "/assets/images/Profile/hero.png",
    poster: "/assets/images/Profile/hero.png",
    badge: "Modular Infrastructure",
    title: "Surgical pendants &\nscrub stations",
    description:
      "Complete medical utility units, scrub sinks, and motor control panels built to international healthcare benchmarks.",
    primaryCta: { label: "Talk to an engineer", href: "/contact" },
    secondaryCta: { label: "View catalog", href: "/contact" },
  },
];

export default function HeroSlider({ slides = SLIDES }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const videoRefs = useRef([]);
  const rafId = useRef(null);
  const slideCount = slides.length;

  const clearTimers = useCallback(() => {
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

    if (!video) return clearTimers;

    video.muted = isMuted;

    if (isPlaying) {
      const playPromise = video.play();
      if (playPromise?.catch) {
        playPromise.catch(() => {
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {});
        });
      }
    }

    const tick = () => {
      if (video.duration) {
        setProgress(Math.min(video.currentTime / video.duration, 1));
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return clearTimers;
  }, [activeIndex, isPlaying, isMuted, clearTimers]);

  const handleEnded = () => goNext();

  const togglePlayback = () => {
    const video = videoRefs.current[activeIndex];
    setIsPlaying((wasPlaying) => {
      const next = !wasPlaying;
      if (video) {
        if (next) video.play().catch(() => {});
        else video.pause();
      }
      return next;
    });
  };

  const toggleMute = () => {
    const video = videoRefs.current[activeIndex];
    setIsMuted((prev) => {
      const next = !prev;
      if (video) video.muted = next;
      return next;
    });
  };

  const activeSlide = slides[activeIndex];

  return (
    <section className="hero-slider" aria-label="Featured solutions">
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
              muted={isMuted}
              playsInline
              preload={Math.abs(index - activeIndex) <= 1 ? "auto" : "none"}
              onEnded={index === activeIndex ? handleEnded : undefined}
            />
          </div>
        ))}
        <div className="hero-slider__overlay" />
      </div>

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

      <div className="hero-slider__controls">
        <button
          type="button"
          className="hero-slider__play-toggle"
          onClick={togglePlayback}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Pause size={14} strokeWidth={2} /> : <Play size={14} strokeWidth={2} />}
        </button>

        <button
          type="button"
          className="hero-slider__play-toggle"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? <VolumeX size={14} strokeWidth={2} /> : <Volume2 size={14} strokeWidth={2} />}
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