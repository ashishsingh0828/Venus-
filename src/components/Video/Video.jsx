import { useCallback, useEffect, useRef, useState } from "react";
import { Play, Pause, X, ArrowRight } from "lucide-react";
import "./Video.css";

export default function VideoHero({
  eyebrow = "Get More Update",
  title = "Need Certified Cleanroom & Hermetic OT Door Solutions? Connect With Us",
  ctaLabel = "Join With Us",
  ctaHref = "/contact",
  backgroundImage = "/assets/images/breaadcrumb.png",
  videoSrc = "/assets/images/video.mp4",
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const backdropRef = useRef(null);

  const openModal = () => setIsModalOpen(true);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    const video = videoRef.current;
    if (video) video.pause();
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;
    const video = videoRef.current;
    if (!video) return;

    const playPromise = video.play();
    if (playPromise?.catch) {
      playPromise.catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  }, [isModalOpen]);

  // Lock page scroll while the modal is open
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isModalOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, closeModal]);

  const handleBackdropClick = (e) => {
    // Only close when the click lands on the backdrop itself, not the video frame
    if (e.target === backdropRef.current) closeModal();
  };

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  return (
    <section className="video-hero">
      <img
        src={backgroundImage}
        alt=""
        className="video-hero__bg"
        aria-hidden="true"
      />
      <div className="video-hero__scrim" aria-hidden="true" />

      <div className="video-hero__container">
        <div className="video-hero__play-row">
          <button
            type="button"
            className="video-hero__play"
            onClick={openModal}
            aria-label="Play video"
          >
            <span className="video-hero__play-inner">
              <Play size={20} strokeWidth={0} fill="currentColor" />
            </span>
          </button>
        </div>

        <div className="video-hero__content">
          <h2 className="video-hero__title">{title}</h2>
          <p className="video-hero__eyebrow">{eyebrow}</p>
         <div className="center">
             <a href={ctaHref} className="video-hero__cta">
            <span>{ctaLabel}</span>
            <span className="video-hero__cta-divider" aria-hidden="true" />
            <ArrowRight size={18} strokeWidth={2} />
          </a>
         </div>
        </div>
      </div>

      {/* -------- Video lightbox -------- */}
      <div
        ref={backdropRef}
        className={`video-modal ${isModalOpen ? "is-open" : ""}`}
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isModalOpen}
      >
        <div className="video-modal__frame">
          <button
            type="button"
            className="video-modal__close"
            onClick={closeModal}
            aria-label="Close video"
          >
            <X size={20} strokeWidth={2} />
          </button>

          {isModalOpen && (
            <video
              ref={videoRef}
              className="video-modal__video"
              src={videoSrc}
              controls={false}
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            />
          )}

          <button
            type="button"
            className="video-modal__toggle"
            onClick={togglePlayback}
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? (
              <Pause size={18} strokeWidth={0} fill="currentColor" />
            ) : (
              <Play size={18} strokeWidth={0} fill="currentColor" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}