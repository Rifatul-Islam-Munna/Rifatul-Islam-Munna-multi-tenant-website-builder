// components/shop-by-category/ShopByCategorySection1.tsx
"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const categories = [
  { id: 1, name: "Men" },
  { id: 2, name: "Women" },
  { id: 3, name: "Accessories" },
  { id: 4, name: "Sale", badge: "-50% OFF" },
];

const ShopByCategorySection1: React.FC = () => {
  return (
    <section className="w-full bg-background py-10">
      <div className="mx-auto flex container flex-col gap-4  px-4 md:px-0">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Shop by Category
          </h2>
          <button className="flex items-center gap-1 text-xs font-semibold text-sky-500 hover:text-sky-600 sm:text-sm">
            View all Product
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Cards */}
        <div className="grid gap-4 pt-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className="group relative overflow-hidden rounded-2xl bg-muted text-left shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/test.png"
                  alt={cat.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
                {cat.badge && (
                  <span className="absolute right-3 top-3 rounded-full bg-red-500 px-3 py-1 text-[10px] font-semibold text-white shadow-sm">
                    {cat.badge}
                  </span>
                )}
                <span className="absolute left-4 bottom-4 text-base font-semibold text-white sm:text-lg">
                  {cat.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategorySection1;
