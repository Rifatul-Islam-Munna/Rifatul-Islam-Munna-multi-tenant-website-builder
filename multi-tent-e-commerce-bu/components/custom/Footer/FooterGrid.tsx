// components/layout/FooterGrid.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { headerLinks } from "@/staticData/LayoutData";

const FooterGrid: React.FC = () => {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto  px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Left column */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-background text-sm font-bold">
                CS
              </div>
              <span className="text-sm font-semibold tracking-tight">
                CodeSprint Lab
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              A multi-tenant e‑commerce builder for modern brands. Launch fast,
              scale confidently, and manage all your shops in one place.
            </p>
          </div>

          {/* Middle column: grouped links */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Navigate
              </h3>
              <ul className="space-y-1.5">
                {headerLinks.slice(0, 3).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                More
              </h3>
              <ul className="space-y-1.5">
                {headerLinks.slice(3).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/faq"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Right column: contact + small note */}
          <div className="space-y-3 text-xs text-muted-foreground">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em]">
              Contact
            </h3>
            <ul className="space-y-1.5">
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" />
                <a
                  href="mailto:support@codesprintlab.com"
                  className="hover:text-foreground"
                >
                  support@codesprintlab.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5" />
                <span>+880 1XXX-XXX-XXX</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
            <p className="pt-1 text-[11px]">
              Hosting, billing, and integrations are fully managed so you can
              focus on building products your customers love.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t pt-4 text-[11px] text-muted-foreground md:flex-row">
          <span>
            © {new Date().getFullYear()} CodeSprint Lab. All rights reserved.
          </span>
          <div className="flex gap-3">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterGrid;
