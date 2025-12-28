// components/product-cards/ProductCard.tsx
"use client";

import React from "react";
import { sampleProducts, type Product } from "@/staticData/ProductData";
import ProductCardVariant1 from "./ProductCardVariant1";
import ProductCardVariant2 from "./ProductCardVariant2";
import ProductCardVariant3 from "./ProductCardVariant3";
import ProductCardVariant4 from "./ProductCardVariant4";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type VariantKey = 1 | 2 | 3 | 4;

interface ProductCardProps {
  products?: Product[];
  variant?: VariantKey; // 1: price strip, 2: title+cart icon, 3: quick view, 4: hover details
  title?: string;
  isHeaderShown?: boolean;
  isAllProductShown?: boolean;
}

/* Skeleton grid */
const ProductCardSkeleton: React.FC = () => (
  <section className="w-full bg-background py-10">
    <div className="container mx-auto max-w-6xl space-y-4 px-4">
      <Skeleton className="h-4 w-40" />
      <div className="grid gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 rounded-lg border bg-muted/30 p-2"
          >
            <Skeleton className="h-32 w-full rounded-md" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ProductCard: React.FC<ProductCardProps> = ({
  products = sampleProducts,
  variant = 1,
  title,
  isHeaderShown = true,
  isAllProductShown = true,
}) => {
  const heading =
    title ??
    (variant === 1
      ? "Products"
      : variant === 2
      ? "Products"
      : variant === 3
      ? "Products"
      : "Products");

  const isLoading = !products || products.length === 0;

  if (isLoading) {
    return <ProductCardSkeleton />;
  }

  const renderCard = (product: Product) => {
    switch (variant) {
      case 2:
        return (
          <ProductCardVariant2
            key={product.id}
            product={product}
            onAddToCart={(prod) => console.log("Add to cart", prod)}
          />
        );
      case 3:
        return (
          <ProductCardVariant3
            key={product.id}
            product={product}
            onQuickView={(prod) => console.log("Quick view", prod)}
            onAddToCart={(prod) => console.log("Add to cart", prod)}
          />
        );
      case 4:
        return (
          <ProductCardVariant4
            key={product.id}
            product={product}
            onViewDetails={(prod) => console.log("View details", prod)}
          />
        );
      case 1:
      default:
        return <ProductCardVariant1 key={product.id} product={product} />;
    }
  };

  return (
    <section className="w-full bg-background py-10">
      <div className=" mx-auto  container space-y-4   px-4 md:px-0">
        <div className=" w-full flex justify-between items-center">
          <h2
            className={cn(
              " text-xl md:text-2xl font-semibold  text-accent-foreground",
              {
                hidden: !isHeaderShown,
              }
            )}
          >
            {heading}
          </h2>

          <Button
            variant={"ghost"}
            className={cn("text-primary", {
              hidden: !isAllProductShown,
            })}
          >
            View All <ArrowRight />
          </Button>
        </div>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => renderCard(p))}
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
