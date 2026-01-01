"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton"; // shadcn skeleton
import { HomePage } from "@/staticData/HomePageData";
/* ============ UNIVERSAL SKELETON ============ */

const CategorySkeleton = () => (
  <section className="w-full bg-background py-10">
    <div className="mx-auto flex  container flex-col gap-4 px-4 md:px-0">
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-5 w-20" />
      </div>
      <div className="mt-3 flex gap-4 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton className="h-32 w-40 rounded-2xl md:h-40 md:w-48" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ============ DYNAMIC IMPORTS ============ */

const ShopByCategorySection1 = dynamic(
  () => import("./ShopByCategorySection1"),
  { loading: () => <CategorySkeleton /> }
);

const ShopByCategorySection2 = dynamic(
  () => import("./ShopByCategorySection2"),
  { loading: () => <CategorySkeleton /> }
);

const ShopByCategorySection3 = dynamic(
  () => import("./ShopByCategorySection3"),
  { loading: () => <CategorySkeleton /> }
);

/* ============ MAIN EXPORT ============ */

const Category = ({ categorySection }: { categorySection: string }) => {
  const categoryComponents = {
    ShopByCategorySection1: <ShopByCategorySection1 />,
    ShopByCategorySection2: <ShopByCategorySection2 />,
    ShopByCategorySection3: <ShopByCategorySection3 />,
  };
  const CategorySelected = categorySection as keyof typeof categoryComponents;
  return <>{categoryComponents[CategorySelected] ?? <CategorySkeleton />}</>;
};

export default Category;
