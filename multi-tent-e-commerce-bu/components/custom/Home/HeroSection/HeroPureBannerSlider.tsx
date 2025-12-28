import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

const heroSliderData = {
  slides: [
    {
      id: 1,
      image: {
        src: "/test.png",
        alt: "Seasonal sale banner",
      },
    },
    {
      id: 2,
      image: {
        src: "/test.png",
        alt: "New arrivals banner",
      },
    },
    {
      id: 3,
      image: {
        src: "/test.png",
        alt: "Member exclusive offer banner",
      },
    },
  ],
};
const HeroPureBannerSlider = () => {
  const d = heroSliderData;
  return (
    <section className="w-full  bg-background">
      <div className="mx-auto  container px-4 py-10 md:py-14 lg:py-18">
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={16}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          className="w-full"
        >
          {d.slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative overflow-hidden rounded-2xl">
                <div className="relative aspect-[16/6] sm:aspect-[16/5] lg:aspect-[16/4]">
                  <Image
                    src={slide.image.src}
                    alt={slide.image.alt}
                    fill
                    className="object-cover"
                    priority={slide.id === 1}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HeroPureBannerSlider;
