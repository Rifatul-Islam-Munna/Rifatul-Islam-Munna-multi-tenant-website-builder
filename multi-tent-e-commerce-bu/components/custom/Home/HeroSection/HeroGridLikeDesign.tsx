import React from "react";

import Image from "next/image";

const heroGridData = {
  main: {
    tag: "New Arrivals",
    title: "Summer Collection 2024",
    description:
      "Discover the season’s most anticipated looks with lightweight fabrics and bold colors.",
    buttonLabel: "Explore Lookbook",
    image: {
      src: "/test.png",
      alt: "Summer collection main visual",
    },
  },
  rightTop: {
    tag: "Accessories",
    title: "Essential Gear",
    image: {
      src: "/test.png",
      alt: "Accessories essential gear",
    },
  },
  rightBottom: {
    tag: "Footwear",
    title: "Performance Running",
    image: {
      src: "/test.png",
      alt: "Performance running shoes",
    },
  },
};
const HeroGridLikeDesign = () => {
  const d = heroGridData;
  return (
    <section className="w-full  bg-background  h-fit">
      <div className="mx-auto  grid grid-cols-2  container flex-col gap-4 px-4 py-10  md:py-14 lg:py-18">
        {/* Left big card */}
        <div className="relative overflow-hidden rounded-2xl bg-black text-white">
          <div className="relative aspect-[16/9] sm:aspect-square">
            <Image
              src={d.main.image.src}
              alt={d.main.image.alt}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right column with two stacked cards */}
        <div className="flex flex-col gap-4">
          {/* Top card */}
          <div className="relative flex-1 overflow-hidden rounded-2xl bg-muted">
            <div className="relative h-full ">
              <Image
                src={d.rightTop.image.src}
                alt={d.rightTop.image.alt}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Bottom card */}
          <div className="relative flex-1 overflow-hidden rounded-2xl bg-muted">
            <div className="relative h-full ">
              <Image
                src={d.rightBottom.image.src}
                alt={d.rightBottom.image.alt}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroGridLikeDesign;
