// components/banner/BannerMain.tsx
"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { BannerData } from "@/staticData/BannerData";

/* Skeleton used for all banners */
const BannerSkeleton = () => (
  <section className="w-full bg-background py-10">
    <div className="container mx-auto max-w-5xl px-4">
      <div className="flex flex-col gap-4 rounded-2xl border bg-muted/40 px-5 py-6">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-8 w-60" />
        <Skeleton className="h-4 w-full max-w-md" />
        <div className="mt-2 flex items-center justify-between gap-3">
          <Skeleton className="h-7 w-28 rounded-full" />
          <Skeleton className="h-9 w-32 rounded-md" />
        </div>
      </div>
    </div>
  </section>
);

/* Dynamic designs */
const BannerSection1 = dynamic(() => import("./BannerSection1"), {
  loading: () => <BannerSkeleton />,
});

const BannerSection2 = dynamic(() => import("./BannerSection2"), {
  loading: () => <BannerSkeleton />,
});

const BannerSection3 = dynamic(() => import("./BannerSection3"), {
  loading: () => <BannerSkeleton />,
});

/* Map + main component
   You can control which design from BannerData or props later.
*/
const bannerMap = {
  BannerSection1: <BannerSection1 />,
  BannerSection2: <BannerSection2 />,
  BannerSection3: <BannerSection3 />,
} as const;

type BannerKey = keyof typeof bannerMap;

interface BannerMainProps {
  variant?: BannerKey; // optional: choose design
}

const BannerMain: React.FC<BannerMainProps> = ({
  variant = "BannerSection3",
}) => {
  const key = variant as BannerKey;
  return <>{bannerMap[key] ?? <BannerSkeleton />}</>;
};

export default BannerMain;
