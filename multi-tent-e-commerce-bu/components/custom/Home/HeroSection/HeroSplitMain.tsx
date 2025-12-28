import { Button } from "@/components/ui/button";
import { Headphones, RefreshCw, ShieldCheck } from "lucide-react";
import React from "react";
import Image from "next/image";
const heroOneData = {
  eyebrow: "Shop smarter, sell faster",
  title: "Multi-tenant stores built in minutes.",
  description:
    "Launch your own branded storefront with secure payments, fast checkout, and beautiful themes out of the box.",
  primaryCta: { label: "Start free trial", href: "#get-started" },
  secondaryCta: { label: "Browse products", href: "#products" },
  badges: [
    {
      icon: ShieldCheck,
      label: "Secure payments",
      description: "Encrypted & PCI-compliant.",
    },
    {
      icon: RefreshCw,
      label: "30-day returns",
      description: "Easy refunds on all orders.",
    },
    {
      icon: Headphones,
      label: "24/7 support",
      description: "Always here to help.",
    },
  ],
  image: {
    src: "/test.png",
    alt: "E-commerce storefront preview",
  },
};
const HeroSplitMain = () => {
  const d = heroOneData;
  return (
    <section className="w-full  bg-background">
      <div className="mx-auto flex  container flex-col-reverse items-center gap-10 px-4 py-12 md:flex-row md:py-16 lg:py-20">
        {/* Left */}
        <div className="flex-1 space-y-6">
          <p className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
            {d.eyebrow}
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {d.title}
          </h1>
          <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
            {d.description}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button className="h-10 rounded-md px-5 text-sm font-semibold">
              {d.primaryCta.label}
            </Button>
            <Button
              variant="outline"
              className="h-10 rounded-md px-5 text-sm font-semibold"
            >
              {d.secondaryCta.label}
            </Button>
          </div>

          <div className="grid gap-3 pt-4 sm:grid-cols-3">
            {d.badges.map((badge, i) => (
              <div
                key={i}
                className="flex items-start gap-2 rounded-lg border bg-muted/40 px-3 py-2"
              >
                <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <badge.icon className="h-4 w-4" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold">{badge.label}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {badge.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex-1">
          <div className="relative w-full overflow-hidden rounded-2xl border bg-muted/40 ">
            <div className="relative aspect-[4/3]">
              <Image
                src={d.image.src}
                alt={d.image.alt}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSplitMain;
