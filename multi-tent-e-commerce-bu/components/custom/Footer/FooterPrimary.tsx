// components/layout/FooterPrimary.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { headerLinks } from "@/staticData/LayoutData";

const FooterPrimary: React.FC = () => {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto   px-4 py-10">
        <div className="grid gap-8 md:grid-cols-[1.2fr,1fr,1.1fr]">
          {/* Left: logo + description */}
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
              Build and launch multi-tenant e‑commerce stores in minutes with a
              modern Next.js frontend and .NET backend.
            </p>
          </div>

          {/* Middle: navigation from header */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Navigation
            </h3>
            <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {headerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: contact */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Contact
            </h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
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

export default FooterPrimary;
