// components/shop-by-category/ShopByCategorySection3.tsx
"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const simpleCategories = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Fashion" },
  { id: 3, name: "Home" },
  { id: 4, name: "Beauty" },
  { id: 5, name: "Sports" },
  { id: 6, name: "Kids" },
];

const ShopByCategorySection3: React.FC = () => {
  return (
    <section className="w-full bg-background py-10">
      <div className="mx-auto flex  container flex-col gap-4  px-4 md:px-0">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Shop by Category
          </h2>
          <button className="flex items-center gap-1 text-xs font-semibold text-sky-500 hover:text-sky-600 sm:text-sm">
            View All Product
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Cards: horizontal scroll on mobile, row/grid on larger */}
        <div className="mt-3 flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:gap-5 lg:grid-cols-6 lg:overflow-visible">
          {simpleCategories.map((cat) => (
            <button
              key={cat.id}
              className="group flex min-w-[150px] max-w-[190px] flex-col items-center gap-2 rounded-xl bg-transparent text-center transition-transform hover:-translate-y-1 md:min-w-0"
            >
              <div className="relative w-full overflow-hidden rounded-2xl bg-muted shadow-sm">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/test.png"
                    alt={cat.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <span className="text-sm font-semibold text-foreground">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategorySection3;
