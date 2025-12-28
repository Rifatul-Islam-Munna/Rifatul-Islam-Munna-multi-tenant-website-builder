// components/layout/FooterAlt.tsx
"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { headerLinks } from "@/staticData/LayoutData";

const FooterAlt: React.FC = () => {
  return (
    <footer className="w-full border-t bg-slate-950 text-slate-100">
      <div className=" mx-auto  container px-4 py-10">
        {/* Top CTA */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold sm:text-xl">
              Ready to launch your next store?
            </h2>
            <p className="text-xs text-slate-300">
              Start a free trial and deploy your first tenant in minutes.
            </p>
          </div>
          <Link
            href="/get-started"
            className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-900 hover:bg-slate-200"
          >
            Get started
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Middle: links + contact inline */}
        <div className="mt-8 flex flex-col gap-4 border-t border-slate-800 pt-6 md:flex-row md:items-start md:justify-between">
          <nav className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-300">
            {headerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-slate-50"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-wrap gap-4 text-[11px] text-slate-300">
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              support@codesprintlab.com
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" />
              +880 1XXX-XXX-XXX
            </span>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500">
          <span>© {new Date().getFullYear()} CodeSprint Lab</span>
          <span>Built with Next.js & .NET</span>
        </div>
      </div>
    </footer>
  );
};

export default FooterAlt;
