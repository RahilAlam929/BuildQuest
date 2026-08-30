"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  { label: "Build Lab", href: "/build-lab" },
  { label: "Progress", href: "/progress" },
  { label: "Projects", href: "/projects" },
  { label: "Resources", href: "/#resources" },
  { label: "Roadmaps", href: "/#learning" },
  { label: "Learning", href: "/#learning" },
  { label: "Tools", href: "/toolkit" },
];

export default function TopNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-[100] border-b border-white/[0.06] bg-[#05070b]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-xs font-bold text-cyan-300">
            BQ
          </div>

          <div>
            <div className="text-sm font-bold tracking-tight text-white">
              BuildQuest
            </div>
            <div className="hidden text-[9px] uppercase tracking-[0.18em] text-slate-600 sm:block">
              Resource Hub
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg px-3 py-2 text-xs font-medium text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/toolkit"
          className="hidden items-center gap-1 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-cyan-200 md:flex"
        >
          Explore Toolkit
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-200 transition hover:bg-white/[0.08] md:hidden"
        >
          {open ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="border-t border-white/[0.06] bg-[#05070b] px-4 py-4 md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.05] hover:text-white"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/toolkit"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-semibold text-slate-950"
            >
              Explore Toolkit
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
