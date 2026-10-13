import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "./ProductsSlider.css";

const PRODUCTS = [
  {
    id: "lead-lined-doors",
    name: "Lead Lined Doors",
    price: "₹ 65,000/Piece",
    image: "/assets/images/Hospital door/leaned.png",
  },
  {
    id: "hpl-hinge-lead-door",
    name: "HPL Hinge Lead Door",
    price: "₹ 70,000/Piece",
    image: "/assets/images/Hospital door/HPL Hinge Lead Door.png",
  },
  {
    id: "ss304-hospital-hinged-door",
    name: "SS304 HOSPITAL HINGED DOOR",
    price: "₹ 60,000/Piece",
    image: "/assets/images/Hospital door/SS304 HOSPITAL HINGED DOOR.png",
  },
  {
    id: "ss304-single-leaf-hinged-door",
    name: "SS304 Single Leaf Hinged Door",
    price: "₹ 48,000/Piece",
    image: "/assets/images/Hospital door/SS304 Single Leaf Hinged Door.png",
  },
  {
    id: "hpl-hermatically-sealed-manual-sliding-lead-lined-door",
    name: "HPL Hermatically Sealed Manual Sliding Lead Lined Door",
    price: "₹ 90,000/Piece",
    image: "/assets/images/Hospital door/HPL Hermatically Sealed Manual Sliding Lead Lined Door.png",
  },
    {
    id: "Ss 304 Hospital Door",
    name: "Ss 304 Hospital Door",
    price: "₹ 55,000/Piece",
    image: "/assets/images/Hospital door/Ss 304 Hospital Door.png",
  },
   {
    id: "SS304 Lead Single Leaf Hinged Door",
    name: "SS304 Lead Single Leaf Hinged Door",
    price: "₹ 68,000/Piece",
    image: "/assets/images/Hospital door/SS304 Lead Single Leaf Hinged Door.png",
  },
   {
    id: "SS304 Double Leaf Lead Hinged Door",
    name: "SS304 Double Leaf Lead Hinged Door",
    price: "₹ 95,000/Piece",
    image: "/assets/images/Hospital door/SS304 Double Leaf Lead Hinged Door.png",
  },
    {
    id: "operation-theater-double-doors",
    name: "operation-theater-double-doors",
    price: "₹ 25,000/Piece",
    image: "/assets/images/Hospital door/operation-theater-double-doors.png",
  },
];

export default function ProductsSlider({
  products = PRODUCTS,
  eyebrow = "Our Products",
  title = "Flooring, Chosen Well",
}) {
  const [isVisible, setIsVisible] = useState(false);
  const headerRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [navReady, setNavReady] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setNavReady(true);
  }, []);

  return (
    <section className="products-slider" aria-label="Products">
      <div className="products-slider__header" ref={headerRef}>
        <div className={`products-slider__heading ${isVisible ? "is-visible" : ""}`}>
          <span className="products-slider__eyebrow">{eyebrow}</span>
          <h2 className="products-slider__title">{title}</h2>
        </div>

        <div className={`products-slider__controls ${isVisible ? "is-visible" : ""}`}>
          <button
            type="button"
            ref={prevRef}
            className="products-slider__arrow products-slider__arrow--prev"
            aria-label="Previous product"
          >
            <ChevronLeft size={18} strokeWidth={2} />
          </button>
          <button
            type="button"
            ref={nextRef}
            className="products-slider__arrow products-slider__arrow--next"
            aria-label="Next product"
          >
            <ChevronRight size={18} strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="products-slider__swiper">
        {navReady && (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            loop
            speed={650}
            spaceBetween={24}
            slidesPerView={1.15}
            autoplay={{ delay: 3800, disableOnInteraction: false, pauseOnMouseEnter: true }}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            pagination={{ el: ".products-slider__pagination", clickable: true, bulletClass: "products-slider__dot", bulletActiveClass: "products-slider__dot-active" }}
            breakpoints={{
              560: { slidesPerView: 1.6, spaceBetween: 20 },
              820: { slidesPerView: 2.3, spaceBetween: 24 },
              1120: { slidesPerView: 3.1, spaceBetween: 28 },
              1440: { slidesPerView: 4, spaceBetween: 28 },
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <article className="product-card">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-card__image"
                    loading="lazy"
                  />
                  <div className="product-card__scrim" />

                  <div className="product-card__panel">
                    <h3 className="product-card__title">{product.name}</h3>
                    <div className="product-card__footer">
                      <span className="product-card__price">{product.price}</span>
                      <a
                        href="/contact"
                        className="product-card__cta"
                        aria-label={`Enquire about ${product.name}`}
                      >
                        <ArrowUpRight size={18} strokeWidth={2} />
                      </a>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <div className="products-slider__pagination" role="tablist" aria-label="Products" />
      </div>
    </section>
  );
}