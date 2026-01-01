// components/shop-by-category/ShopByCategorySection2.tsx
"use client";

import React from "react";
import Image from "next/image";

const productCategories = [
  { id: 1, name: "Half-Sleeve T-shirt" },
  { id: 2, name: "Designer Short Sleeve" },
  { id: 3, name: "Sports T-shirt" },
  { id: 4, name: "Polo" },
  { id: 5, name: "Cut & Stitch Polo" },
  { id: 6, name: "Half Sleeve Raglan" },
];

const ShopByCategorySection2: React.FC = () => {
  return (
    <section className="w-full bg-background py-10">
      <div className="mx-auto flex container flex-col gap-4  px-4 md:px-0">
        {/* Header */}
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Shop by Category
        </h2>

        {/* Horizontal scroll on small, grid on large */}
        <div className="mt-3 flex gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-6 lg:gap-5 lg:overflow-visible">
          {productCategories.map((item) => (
            <button
              key={item.id}
              className="group relative min-w-40 max-w-55 flex-1 rounded-xl border bg-muted/40 text-center transition-transform hover:-translate-y-1  lg:min-w-0"
            >
              <div className="relative mx-auto mt-4 aspect-3/4 w-[80%] overflow-hidden rounded-xl bg-background">
                <Image
                  src="/test.png"
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
                <span className="rounded bg-white px-3 py-1 text-[11px] font-semibold shadow-sm">
                  {item.name}
                </span>
              </div>
              <div className="h-4" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategorySection2;
