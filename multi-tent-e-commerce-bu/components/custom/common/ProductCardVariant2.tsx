// ProductCardVariant2.tsx
"use client";

import React from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/staticData/ProductData";

interface Props {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCardVariant2: React.FC<Props> = ({ product, onAddToCart }) => {
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

      <div className="flex items-center justify-between gap-2 px-2.5 py-2">
        <div className="flex flex-col">
          <span className="text-sm font-medium line-clamp-3">
            {product.name}
          </span>
          <div className="flex items-baseline gap-1 text-sm">
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

        {/* icon add to cart */}
        <button
          onClick={() => onAddToCart?.(product)}
          className="flex h-8 w-8 items-center justify-center rounded-full border text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <ShoppingCart className="h-3.5 w-3.5" />
        </button>
      </div>
    </article>
  );
};

export default ProductCardVariant2;
