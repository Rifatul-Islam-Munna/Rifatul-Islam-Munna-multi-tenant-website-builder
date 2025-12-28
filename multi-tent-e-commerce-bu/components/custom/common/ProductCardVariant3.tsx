// ProductCardVariant3.tsx
"use client";

import React from "react";
import Image from "next/image";
import { Eye, ShoppingCart } from "lucide-react";
import type { Product } from "@/staticData/ProductData";

interface Props {
  product: Product;
  onQuickView?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

const ProductCardVariant3: React.FC<Props> = ({
  product,
  onQuickView,
  onAddToCart,
}) => {
  return (
    <article className="group flex w-full flex-col overflow-hidden rounded-lg border bg-background">
      <div className="relative w-full bg-muted">
        <div className="relative aspect-[3/3]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
          />
        </div>

        {/* dim overlay + centered quick view */}
        <button
          onClick={() => onQuickView?.(product)}
          className="absolute inset-0 flex items-center justify-center bg-black/0 text-[12px] font-medium text-white opacity-0 transition-all group-hover:bg-black/40 group-hover:opacity-100"
        >
          <span className="flex items-center gap-2 rounded-full bg-black/70 px-4 py-1.5">
            <Eye className="h-3.5 w-3.5" />
            Quick view
          </span>
        </button>
      </div>

      <div className="flex items-center justify-between px-2.5 py-1.5 text-sm">
        <div className="flex flex-col leading-tight">
          <span className="line-clamp-3 font-medium">{product.name}</span>
          <span className="font-semibold">
            {product.currency}
            {product.price.toFixed(0)}
          </span>
        </div>
        <button
          onClick={() => onAddToCart?.(product)}
          className="flex h-7 w-7 items-center justify-center rounded-full border text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <ShoppingCart className="h-5 w-5" />
        </button>
      </div>
    </article>
  );
};

export default ProductCardVariant3;
