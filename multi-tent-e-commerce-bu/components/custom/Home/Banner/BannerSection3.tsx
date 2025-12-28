// components/banner/BannerSection3.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { BannerData } from "@/staticData/banner";

const BannerSection3: React.FC = () => {
  const d = BannerData;

  return (
    <section className="w-full rounded bg-slate-900 container mx-auto py-9 text-white">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold sm:text-3xl">{d.title}</h2>
            <p className="text-sm text-slate-200">{d.description}</p>
          </div>
          <div className="flex flex-col items-center gap-2 sm:items-end">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
              {d.highlight}
            </p>
            <Button
              variant="outline"
              className="h-9 rounded-md border-slate-600 bg-slate-800 px-4 text-sm font-semibold text-white hover:bg-slate-700"
            >
              {d.buttonLabel}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection3;
