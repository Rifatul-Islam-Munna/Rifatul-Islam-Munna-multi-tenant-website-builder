"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton"; // Shadcn skeleton

// Skeleton Component
const ProductDetailsSkeleton = () => {
  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          {/* Left Column - Image Skeleton */}
          <div className="lg:col-span-7">
            <div className="flex gap-4">
              {/* Vertical Thumbnails Skeleton */}
              <div className="flex flex-col gap-3 w-20 sm:w-24">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="aspect-square w-full" />
                ))}
              </div>

              {/* Main Image Skeleton */}
              <div className="flex-1">
                <Skeleton className="aspect-[4/5] w-full" />
              </div>
            </div>
          </div>

          {/* Right Column - Details Skeleton */}
          <div className="lg:col-span-5">
            <div className="bg-card border border-border p-6 sm:p-8 h-full space-y-6">
              {/* Title Skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-3/4" />
              </div>

              {/* Rating Skeleton */}
              <div className="flex items-center gap-2 pb-6 border-b border-border">
                <Skeleton className="h-4 w-32" />
              </div>

              {/* Price Skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-10 w-40" />
                <Skeleton className="h-4 w-24" />
              </div>

              {/* Variant Skeleton */}
              <div className="space-y-3">
                <Skeleton className="h-4 w-20" />
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-16" />
                  <Skeleton className="h-10 w-16" />
                  <Skeleton className="h-10 w-16" />
                </div>
              </div>

              {/* Quantity Skeleton */}
              <div className="space-y-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-32" />
              </div>

              {/* Buttons Skeleton */}
              <div className="space-y-3">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>

              {/* Features Skeleton */}
              <div className="border-t border-border pt-6 space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Skeleton className="w-5 h-5 rounded-full" />
                    <div className="flex-1 space-y-1">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="bg-card border border-border">
          <div className="flex border-b border-border">
            <Skeleton className="h-14 w-1/2" />
            <Skeleton className="h-14 w-1/2" />
          </div>
          <div className="p-6 sm:p-8 space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Dynamic imports with loading
const ProductDetails1 = dynamic(() => import("./ProductDetailsPage"), {
  loading: () => <ProductDetailsSkeleton />,
  ssr: false,
});

const ProductDetails2 = dynamic(() => import("./ProductDetailsPage2"), {
  loading: () => <ProductDetailsSkeleton />,
  ssr: false,
});

// Variant type
type VariantType = "variant1" | "variant2";

interface ProductDetailsProps {
  variant?: VariantType;
}

const ProductDetails = ({ variant = "variant1" }: ProductDetailsProps) => {
  const [currentVariant, setCurrentVariant] = useState<VariantType>(variant);

  // Sample product data
  const sampleProduct = {
    id: "1",
    title: "Premium Wireless Headphones",
    description: `Experience superior sound quality with our Premium Wireless Headphones.

Features:
• Active Noise Cancellation (ANC) technology
• 30-hour battery life with quick charge
• Bluetooth 5.0 connectivity for seamless pairing
• Premium leather ear cushions for all-day comfort
• Foldable design with luxury carrying case
• Built-in microphone for crystal-clear calls`,
    price: 149.99,
    oldPrice: 199.99,
    images: ["/test.png", "/test.png", "/test.png"],
    variants: [
      {
        id: "size",
        name: "Size",
        options: ["S", "M", "L", "XL"],
      },
    ],
    reviews: [
      {
        id: "1",
        userId: "user1",
        userName: "John Doe",
        rating: 5,
        comment: "Excellent product! Highly recommend.",
        createdAt: "December 20, 2025",
      },
    ],
    stock: 45,
    sku: "WH-PRO-001",
  };

  // Render component based on variant
  const renderVariant = () => {
    switch (currentVariant) {
      case "variant1":
        return <ProductDetails1 product={sampleProduct} />;
      case "variant2":
        return <ProductDetails2 product={sampleProduct} />;
      default:
        return <ProductDetails1 product={sampleProduct} />;
    }
  };

  return (
    <div>
      {/* Optional: Variant Switcher (for testing) */}
      {/* <div className="fixed top-4 right-4 z-50 bg-card border border-border p-4 rounded-lg">
        <p className="text-sm font-semibold mb-2">Switch Variant:</p>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentVariant("variant1")}
            className={`px-4 py-2 text-sm border transition-colors ${
              currentVariant === "variant1"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            Variant 1
          </button>
          <button
            onClick={() => setCurrentVariant("variant2")}
            className={`px-4 py-2 text-sm border transition-colors ${
              currentVariant === "variant2"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            Variant 2
          </button>
        </div>
      </div> */}

      {renderVariant()}
    </div>
  );
};

export default ProductDetails;
