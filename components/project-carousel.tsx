"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Github } from "lucide-react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CarouselImage = {
  src: string;
  alt: string;
};

type ProjectCarouselProps = {
  images: CarouselImage[];
  isDark?: boolean;
};

function ProjectCarousel({ images, isDark = true }: ProjectCarouselProps) {
  const css = `
  .ProjectCarousel {
    padding: 0 16px 48px !important;
    overflow: visible;
  }
  .ProjectCarousel .swiper-pagination-bullet {
    background: ${isDark ? "rgba(255,255,255,0.45)" : "rgba(30,41,59,0.45)"};
    opacity: 1;
  }
  .ProjectCarousel .swiper-pagination-bullet-active {
    background: ${isDark ? "#ffffff" : "#1e1b4b"};
  }
  .ProjectCarousel .swiper-button-next,
  .ProjectCarousel .swiper-button-prev {
    width: 44px;
    height: 44px;
    border-radius: 9999px;
    border: 1px solid ${isDark ? "rgba(255,255,255,0.18)" : "rgba(30,41,59,0.18)"};
    background: ${isDark ? "rgba(12,15,24,0.55)" : "rgba(255,255,255,0.85)"};
    color: ${isDark ? "#e0e7ff" : "#111827"};
    backdrop-filter: blur(8px);
  }
  .ProjectCarousel .swiper-button-next::after,
  .ProjectCarousel .swiper-button-prev::after {
    display: none;
  }
  `;

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 24 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="relative mx-auto w-full max-w-6xl"
    >
      <style>{css}</style>

      <Swiper
        spaceBetween={24}
        effect="coverflow"
        grabCursor
        loop
        centeredSlides
        slidesPerView={1.02}
        breakpoints={{
          640: { slidesPerView: 1.05 },
          960: { slidesPerView: 1.08 },
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: -12,
          depth: 220,
          modifier: 1.8,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        autoplay={false}
        className="ProjectCarousel h-[420px] w-full max-w-5xl sm:h-[480px] lg:h-[540px]"
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="!h-full w-full">
            <div className="relative h-full w-full">
              <div
                aria-hidden
                className={cn(
                  "absolute inset-2 -left-6 -top-4 hidden h-[90%] rounded-3xl border sm:block",
                  isDark ? "border-indigo-100/25" : "border-indigo-900/10",
                )}
              />
              <div
                className={cn(
                  "relative flex h-full w-full flex-col overflow-hidden rounded-3xl border shadow-[0_35px_70px_rgba(0,0,0,0.38)] sm:flex-row",
                  isDark
                    ? "border-indigo-100/25 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
                    : "border-indigo-900/15 bg-white/95",
                )}
              >
                <div className="flex flex-1 flex-col gap-4 p-6 sm:max-w-[48%] sm:p-8">
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-200">
                    Proyecto
                  </div>
                  <h3
                    className={cn(
                      "font-ferron text-4xl uppercase leading-tight text-indigo-100 sm:text-5xl",
                      !isDark && "text-indigo-900",
                    )}
                  >
                    {image.alt}
                  </h3>
                  <p
                    className={cn(
                      "text-sm leading-relaxed text-indigo-100/80",
                      !isDark && "text-slate-600",
                    )}
                  >
                    Interfaz cuidada con detalles y animaciones suaves. Explora el proyecto o revisa el código en GitHub.
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <Button
                      variant="outline"
                      className={cn(
                        "border-indigo-300/60 px-4 text-xs font-semibold uppercase text-indigo-50 hover:border-indigo-200 hover:text-indigo-50",
                        !isDark &&
                          "border-indigo-200 text-indigo-900 hover:border-indigo-300 hover:text-indigo-800",
                      )}
                      asChild
                    >
                      <a href="#proyectos">Ver más</a>
                    </Button>
                    <a
                      href="https://github.com/danieltuz"
                      target="_blank"
                      rel="noreferrer"
                      className={cn(
                        "flex size-10 items-center justify-center rounded-full border border-indigo-300/60 text-indigo-50 transition hover:border-indigo-200 hover:text-indigo-50",
                        !isDark &&
                          "border-indigo-200 text-indigo-800 hover:border-indigo-300 hover:text-indigo-900",
                      )}
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-center p-6 sm:p-8">
                  <div className="w-full max-w-[520px] overflow-hidden rounded-2xl border border-indigo-100/30 bg-black/30 shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
                    <img
                      className="h-full w-full object-cover"
                      src={image.src}
                      alt={image.alt}
                    />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="pointer-events-none absolute inset-y-1/2 flex w-full -translate-y-1/2 items-center justify-between px-1 sm:px-3">
          <button
            className="pointer-events-auto swiper-button-prev flex items-center justify-center"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            className="pointer-events-auto swiper-button-next flex items-center justify-center"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </Swiper>
    </motion.div>
  );
}

export { ProjectCarousel };
