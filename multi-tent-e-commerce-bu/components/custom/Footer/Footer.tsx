// components/layout/Footer.tsx
"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

type FooterVariant = "primary" | "alt" | "grid";

interface FooterProps {
  variant?: FooterVariant; // default: "primary"
}

/* Skeleton used while any footer is loading */
const FooterSkeleton = () => (
  <footer className="w-full border-t bg-background">
    <div className="container mx-auto max-w-6xl px-4 py-10 space-y-4">
      <Skeleton className="h-5 w-36" />
      <Skeleton className="h-3 w-64" />
      <div className="grid gap-4 md:grid-cols-3">
        <Skeleton className="h-20 w-full rounded-lg" />
        <Skeleton className="h-20 w-full rounded-lg" />
        <Skeleton className="h-20 w-full rounded-lg" />
      </div>
      <Skeleton className="h-3 w-40" />
    </div>
  </footer>
);

/* Dynamic imports */
const FooterPrimary = dynamic(() => import("./FooterPrimary"), {
  loading: () => <FooterSkeleton />,
});

const FooterAlt = dynamic(() => import("./FooterAlt"), {
  loading: () => <FooterSkeleton />,
});

const FooterGrid = dynamic(() => import("./FooterGrid"), {
  loading: () => <FooterSkeleton />,
});

/* Wrapper selecting one footer */
const Footer: React.FC<FooterProps> = ({ variant = "primary" }) => {
  if (variant === "alt") return <FooterAlt />;
  if (variant === "grid") return <FooterGrid />;
  return <FooterPrimary />;
};

export default Footer;
