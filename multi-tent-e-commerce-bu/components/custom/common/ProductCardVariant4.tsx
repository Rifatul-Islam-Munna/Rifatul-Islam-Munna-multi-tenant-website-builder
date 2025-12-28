// ProductCardVariant4.tsx
"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/staticData/ProductData";

interface Props {
  product: Product;
  onViewDetails?: (product: Product) => void;
}

const ProductCardVariant4: React.FC<Props> = ({ product, onViewDetails }) => {
  return (
    <article className="group relative flex w-full flex-col overflow-hidden rounded-lg border bg-background">
      <div className="relative w-full bg-muted">
        <div className="relative aspect-[3/3]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-[1.03]"
          />
        </div>

        {/* only visible on hover */}
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
          <div className="pointer-events-auto mb-3 flex w-[90%] flex-col gap-1 rounded-lg bg-black/70 px-3 py-2 text-sm text-white">
            <div className="flex items-center justify-between gap-2">
              <span className="line-clamp-3 font-semibold">{product.name}</span>
              <span className="font-semibold">
                {product.currency}
                {product.price.toFixed(0)}
              </span>
            </div>
            {product.oldPrice && (
              <span className="text-[10px] text-slate-200 line-through">
                {product.currency}
                {product.oldPrice.toFixed(0)}
              </span>
            )}
            <button
              onClick={() => onViewDetails?.(product)}
              className="mt-1 inline-flex items-center justify-center gap-1 rounded-full bg-white px-3 py-1 text-[10px] font-semibold text-black"
            >
              View details
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCardVariant4;
