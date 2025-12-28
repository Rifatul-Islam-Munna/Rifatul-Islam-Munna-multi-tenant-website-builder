// components/banner/BannerSection2.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { BannerData } from "@/staticData/banner";

const BannerSection2: React.FC = () => {
  const d = BannerData;

  return (
    <section className="w-full rounded bg-background container mx-auto py-10">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="flex flex-col gap-4 rounded-2xl border bg-gradient-to-r from-amber-50 to-orange-50 px-5 py-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <h2 className="text-xl font-bold sm:text-2xl">{d.title}</h2>
            <p className="text-sm text-muted-foreground">{d.description}</p>
          </div>
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-600">
              {d.highlight}
            </span>
            <Button className="h-9 rounded-md px-4 text-sm font-semibold">
              {d.buttonLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection2;
