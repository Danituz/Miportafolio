"use client";

import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  Autoplay,
  EffectCards,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { cn } from "@/lib/utils";

type CarouselImage = {
  src: string;
  alt: string;
};

type ProjectSwiperProps = {
  images: CarouselImage[];
  isDark?: boolean;
  autoplay?: boolean;
};

function ProjectSwiper({
  images,
  isDark = true,
  autoplay = true,
}: ProjectSwiperProps) {
  const css = `
  .Carousal_002 {
    padding-bottom: 50px !important;
  }
  .Carousal_002 .swiper-pagination-bullet {
    background: ${isDark ? "rgba(255,255,255,0.55)" : "rgba(30,41,59,0.55)"};
    opacity: 1;
  }
  .Carousal_002 .swiper-pagination-bullet-active {
    background: ${isDark ? "#ffffff" : "#1e1b4b"};
  }
  `;

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="relative w-full max-w-5xl"
    >
      <style>{css}</style>

      <Swiper
        spaceBetween={32}
        autoplay={false}
        effect="cards"
        grabCursor
        loop
        pagination={{ clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        className="Carousal_002 h-[320px] w-[280px] sm:h-[360px] sm:w-[360px] md:w-[420px] lg:h-[420px] lg:w-[500px]"
        modules={[EffectCards, Autoplay, Pagination, Navigation]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="overflow-hidden rounded-3xl border border-indigo-100/30 bg-black/30">
            <img
              className="h-full w-full object-cover"
              src={image.src}
              alt={image.alt}
            />
          </SwiperSlide>
        ))}
        <div className="pointer-events-none absolute inset-y-1/2 flex w-full -translate-y-1/2 items-center justify-between px-1">
          <div className="pointer-events-auto swiper-button-prev flex h-10 w-10 items-center justify-center rounded-full border border-indigo-200/50 bg-black/40 text-indigo-50 backdrop-blur after:hidden">
            <ChevronLeftIcon className="h-5 w-5" />
          </div>
          <div className="pointer-events-auto swiper-button-next flex h-10 w-10 items-center justify-center rounded-full border border-indigo-200/50 bg-black/40 text-indigo-50 backdrop-blur after:hidden">
            <ChevronRightIcon className="h-5 w-5" />
          </div>
        </div>
      </Swiper>
    </motion.div>
  );
}

export { ProjectSwiper };
