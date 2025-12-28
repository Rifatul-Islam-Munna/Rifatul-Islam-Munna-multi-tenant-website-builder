// ProductCardVariant1.tsx
"use client";

import React from "react";
import Image from "next/image";
import type { Product } from "@/staticData/ProductData";

interface Props {
  product: Product;
}

const ProductCardVariant1: React.FC<Props> = ({ product }) => {
  return (
    <article className="flex w-full flex-col overflow-hidden rounded-lg border bg-background">
      <div className="relative w-full bg-muted">
        <div className="relative aspect-[3/3]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 border-t bg-background px-2.5 py-2">
        <div className="flex flex-col leading-tight">
          <span className="line-clamp-3 text-sm font-semibold">
            {product.name}
          </span>
        </div>
        <div className="flex flex-col items-end leading-tight text-sm">
          <span className="font-semibold">
            {product.currency}
            {product.price.toFixed(0)}
          </span>
          {product.oldPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {product.currency}
              {product.oldPrice.toFixed(0)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCardVariant1;
