"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton"; // shadcn skeleton, or create your own
import { HomePage } from "@/staticData/HomePageData";

/* =========================
   UNIVERSAL HERO SKELETON
========================= */

const HeroSkeleton = () => {
  return (
    <section className="w-full border-b bg-background">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-12 md:flex-row">
        {/* Left skeleton */}
        <div className="flex-1 space-y-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-4 w-64" />
          <div className="flex gap-3 pt-2">
            <Skeleton className="h-9 w-28 rounded-md" />
            <Skeleton className="h-9 w-28 rounded-md" />
          </div>
          <div className="grid gap-3 pt-4 sm:grid-cols-3">
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
          </div>
        </div>
        {/* Right skeleton image */}
        <div className="flex-1">
          <Skeleton className="h-64 w-full rounded-2xl md:h-80" />
        </div>
      </div>
    </section>
  );
};

/* =========================
   DYNAMIC HERO COMPONENTS
========================= */

const HeroSplitMain = dynamic(() => import("./HeroSplitMain"), {
  loading: () => <HeroSkeleton />,
});

const HeroPureBannerSlider = dynamic(() => import("./HeroPureBannerSlider"), {
  loading: () => <HeroSkeleton />,
});

const HeroGridLikeDesign = dynamic(() => import("./HeroGridLikeDesign"), {
  loading: () => <HeroSkeleton />,
});

/* =========================
   HERO MAIN (KEYED LOOKUP)
========================= */

// Ensure these keys match possible values of HomePage.heroSection
const heroMap = {
  HeroSplitMain: <HeroSplitMain />,
  HeroPureBannerSlider: <HeroPureBannerSlider />,
  HeroGridLikeDesign: <HeroGridLikeDesign />,
} as const;

export const HeroMain = () => {
  const heroKey = HomePage.heroSection as keyof typeof heroMap;

  return <>{heroMap[heroKey] ?? <HeroSkeleton />}</>;
};

export default HeroMain;
