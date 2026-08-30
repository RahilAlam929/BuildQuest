"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search, ArrowUpRight } from "lucide-react";

const links = [
  { label: "Resources", href: "#resources" },
  { label: "Roadmaps", href: "#roadmaps" },
  { label: "Learning", href: "#learning" },
  { label: "Tools", href: "/toolkit" },
  { label: "Updates", href: "/updates" },
];

export default function TopNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#05070b]/80 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
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

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg px-4 py-2 text-xs font-medium text-slate-500 transition hover:bg-white/[0.04] hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="#resources"
            className="flex h-9 items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 text-xs text-slate-400 transition hover:border-white/15 hover:text-white"
          >
            <Search className="h-3.5 w-3.5" />
            Search
            <kbd className="rounded border border-white/10 px-1 text-[9px] text-slate-600">
              /
            </kbd>
          </Link>

          <Link
            href="/toolkit"
            className="group flex h-9 items-center gap-1 rounded-lg bg-white px-4 text-xs font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
            Explore Tools
            <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-300 lg:hidden"
        >
          {open ? <X size={17} /> : <Menu size={17} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/[0.06] bg-[#05070b] px-4 py-4 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm text-slate-400 hover:bg-white/[0.04] hover:text-white"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/toolkit"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center rounded-xl bg-white py-3 text-sm font-semibold text-slate-950"
            >
              Explore Tools
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
