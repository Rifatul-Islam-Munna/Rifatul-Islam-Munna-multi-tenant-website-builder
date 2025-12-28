// components/banner/BannerSection1.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { BannerData } from "@/staticData/banner";

const BannerSection1: React.FC = () => {
  const d = BannerData;

  return (
    <section className="w-full rounded bg-gradient-to-r container mx-auto from-sky-600 to-indigo-600 py-8 text-white">
      <div className="container mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-4 md:flex-row">
        <div className="space-y-3 text-center md:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-100">
            {d.highlight}
          </p>
          <h2 className="text-2xl font-bold sm:text-3xl">{d.title}</h2>
          <p className="max-w-xl text-sm text-sky-100/90">{d.description}</p>
        </div>
        <Button className="h-10 rounded-md bg-white px-5 text-sm font-semibold text-sky-700 hover:bg-sky-100">
          {d.buttonLabel}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};

export default BannerSection1;
