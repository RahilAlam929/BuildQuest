"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type NavItem = {
  label: string;
  href: string;
  type: "page" | "section";
};

const navItems: readonly NavItem[] = [
  { label: "About", href: "#about", type: "section" },
  { label: "Projects", href: "#projects", type: "section" },
  { label: "Idea Forge", href: "/idea-forge", type: "page" },
  { label: "Resources", href: "#resources", type: "section" },
  { label: "Skills", href: "#skills", type: "section" },
  { label: "Events", href: "#events", type: "section" },
  { label: "Contact", href: "#contact", type: "section" },
  { label: "Challenge", href: "#challenge", type: "section" },
] as const;

export default function TopNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("#about");
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 18);

      const sectionItems = navItems.filter((item) => item.type === "section");
      let currentSection = sectionItems[0]?.href ?? "#about";

      for (const item of sectionItems) {
        const el = document.querySelector(item.href) as HTMLElement | null;
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= 140) currentSection = item.href;
      }

      setActiveSection(currentSection);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const el = containerRef.current;
      if (!el) return;
      if (open && !el.contains(e.target as Node)) setOpen(false);
    };

    window.addEventListener("pointerdown", onPointerDown, true);
    return () => window.removeEventListener("pointerdown", onPointerDown, true);
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const scrollToId = (href: string) => {
    const el = document.querySelector(href) as HTMLElement | null;
    if (!el) return;

    const yOffset = -96;
    const y = el.getBoundingClientRect().top + window.scrollY + yOffset;

    window.history.replaceState(null, "", href);
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const handleNavClick = (href: string) => {
    setOpen(false);
    requestAnimationFrame(() => {
      setTimeout(() => scrollToId(href), 80);
    });
  };

  const navBase =
    "relative inline-flex items-center rounded-full border px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] transition duration-300";

  return (
    <>
      <motion.header
        ref={containerRef}
        role="navigation"
        aria-label="Main navigation"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={[
          "fixed left-1/2 z-50 -translate-x-1/2 rounded-[22px] border backdrop-blur-xl transition-all duration-300",
          scrolled
            ? "top-3 w-[92%] max-w-7xl border-white/10 bg-slate-950/78 shadow-[0_20px_50px_rgba(2,6,23,0.55)]"
            : "top-4 w-[95%] max-w-7xl border-white/8 bg-slate-950/58 shadow-[0_14px_40px_rgba(2,6,23,0.35)]",
        ].join(" ")}
      >
        <div
          className={[
            "flex items-center justify-between gap-3",
            scrolled ? "px-4 py-2 sm:px-5" : "px-4 py-2.5 sm:px-5",
          ].join(" ")}
        >
          {/* Brand */}
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <div className="relative h-9 w-9 shrink-0 rounded-full border border-sky-400/20 bg-sky-500/10">
              <div className="absolute inset-[6px] rounded-full bg-gradient-to-br from-sky-400 via-cyan-400 to-violet-500 shadow-[0_0_24px_rgba(56,189,248,0.35)]" />
            </div>

            <div className="min-w-0 leading-none">
              <div className="truncate text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-300/90">
                MD RAHIL
              </div>
              <div className="truncate text-[11px] text-slate-400">
                Full Stack · AI · Robotics
              </div>
            </div>
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-3 sm:flex">
            <nav className="hidden items-center gap-2 lg:flex">
              {navItems.map((item) => {
                if (item.type === "page") {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`${navBase} border-white/8 bg-white/[0.03] text-slate-200/90 hover:border-sky-400/30 hover:text-sky-300`}
                    >
                      {item.label}
                    </Link>
                  );
                }

                const isActive = activeSection === item.href;

                return (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => handleNavClick(item.href)}
                    className={`${navBase} ${
                      isActive
                        ? "border-sky-400/30 bg-sky-500/10 text-sky-300 shadow-[0_0_24px_rgba(56,189,248,0.16)]"
                        : "border-white/8 bg-white/[0.03] text-slate-200/90 hover:border-sky-400/30 hover:text-sky-300"
                    } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/auth/login"
                className="inline-flex h-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-4 text-xs font-medium text-slate-200 transition hover:border-sky-400/30 hover:text-sky-300"
              >
                Login
              </Link>

              <Link
                href="/auth/signup"
                className="inline-flex h-9 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-violet-500 px-4 text-xs font-semibold text-white transition hover:brightness-110"
              >
                Sign Up
              </Link>

              <Link
                href="/dashboard"
                className="inline-flex h-9 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 text-xs font-medium text-cyan-300 transition hover:bg-cyan-500/20"
              >
                Dashboard
              </Link>
            </div>
          </div>

          {/* Mobile Button */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition hover:border-sky-400/40 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 sm:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <div className="relative h-5 w-6">
              <motion.span
                animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.24 }}
                className="absolute left-0 top-0 h-[2px] w-full rounded bg-slate-100"
              />
              <motion.span
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.18 }}
                className="absolute left-0 top-2 h-[2px] w-full rounded bg-slate-100"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.24 }}
                className="absolute left-0 top-4 h-[2px] w-full rounded bg-slate-100"
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="sm:hidden"
            >
              <div className="px-4 pb-4">
                <div className="rounded-[20px] border border-white/10 bg-slate-950/96 p-3 shadow-2xl">
                  <ul className="flex flex-col gap-1.5">
                    {navItems.map((item) => (
                      <li key={item.href}>
                        {item.type === "page" ? (
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="block w-full rounded-xl px-3 py-3 text-left text-sm font-medium text-slate-100 transition hover:bg-white/[0.04] hover:text-sky-300"
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleNavClick(item.href)}
                            className={`w-full rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
                              activeSection === item.href
                                ? "bg-sky-500/10 text-sky-300"
                                : "text-slate-100 hover:bg-white/[0.04] hover:text-sky-300"
                            }`}
                          >
                            {item.label}
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3 grid gap-2 border-t border-white/8 pt-3">
                    <Link
                      href="/auth/login"
                      onClick={() => setOpen(false)}
                      className="inline-flex h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm font-medium text-slate-200 transition hover:border-sky-400/30 hover:text-sky-300"
                    >
                      Login
                    </Link>

                    <Link
                      href="/auth/signup"
                      onClick={() => setOpen(false)}
                      className="inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 via-cyan-500 to-violet-500 px-4 text-sm font-semibold text-white transition hover:brightness-110"
                    >
                      Sign Up
                    </Link>

                    <Link
                      href="/dashboard"
                      onClick={() => setOpen(false)}
                      className="inline-flex h-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-4 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/20"
                    >
                      Dashboard
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/45 sm:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}