"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Idea Forge", href: "/idea-forge", type: "page" },
  { label: "Resources", href: "#resources" },
  { label: "Skills", href: "#skills" },
  { label: "Events", href: "#events" },
  { label: "Contact", href: "#contact" },
  { label: "Challenge", href: "#challenge" },
] as const;

export default function TopNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
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

  const scrollToId = (href: string) => {
    const el = document.querySelector(href) as HTMLElement | null;
    if (!el) return;

    const yOffset = -95;
    const y = el.getBoundingClientRect().top + window.scrollY + yOffset;

    window.history.replaceState(null, "", href);
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const handleNavClick = (href: string) => {
    setOpen(false);
    setTimeout(() => scrollToId(href), 180);
  };

  return (
    <motion.header
      ref={containerRef}
      role="navigation"
      aria-label="Main navigation"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={[
        "fixed z-50 mx-auto max-w-6xl",
        "left-1/2 -translate-x-1/2",
        "rounded-2xl border backdrop-blur-xl transition-all duration-300",
        scrolled
          ? "top-3 w-[92%] sm:w-[90%] md:w-[88%]"
          : "top-4 w-[96%] sm:w-[92%] md:w-[90%]",
        scrolled
          ? "border-slate-700/60 bg-slate-950/70 shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
          : "border-slate-800/70 bg-slate-950/45 shadow-[0_10px_30px_rgba(0,0,0,0.25)]",
      ].join(" ")}
    >
      <div
        className={[
          "flex items-center justify-between gap-3 transition-all duration-300",
          scrolled ? "px-4 py-2 sm:px-5" : "px-4 py-2.5 sm:px-5",
        ].join(" ")}
      >
        {/* Brand */}
        <div className="flex min-w-0 items-center gap-2">
          <div className="relative h-7 w-7 shrink-0 rounded-full bg-sky-400/40">
            <div className="absolute inset-1 rounded-full bg-slate-950/80" />
            <div className="absolute inset-[6px] rounded-full bg-gradient-to-br from-sky-400 via-blue-500 to-fuchsia-500" />
          </div>

          <div className="flex min-w-0 flex-col leading-none">
            <span className="truncate text-xs font-medium uppercase tracking-[0.18em] text-sky-300/80">
              MD RAHIL
            </span>
            <span className="truncate text-[11px] text-slate-400">
              Full Stack Web Developer · Robotics · AI
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-3 sm:flex">
          <nav className="hidden items-center gap-2 text-xs font-medium text-slate-300 lg:flex">
            {navItems.map((item) =>
              item.type === "page" ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-slate-800 bg-slate-900/40 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-slate-200/85 transition hover:border-sky-400 hover:text-sky-300"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => handleNavClick(item.href)}
                  className="rounded-full border border-slate-800 bg-slate-900/40 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-slate-200/85 transition hover:border-sky-400 hover:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  {item.label}
                </button>
              )
            )}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/auth/login"
              className="inline-flex h-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900/40 px-4 text-xs font-medium text-slate-200 transition hover:border-sky-400 hover:text-sky-300"
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
              className="inline-flex h-9 items-center justify-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 text-xs font-medium text-cyan-300 transition hover:bg-cyan-500/20"
            >
              Dashboard
            </Link>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900/50 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 sm:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <div className="relative h-5 w-6">
            <motion.span
              animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute left-0 top-0 h-[2px] w-full rounded bg-slate-100"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute left-0 top-2 h-[2px] w-full rounded bg-slate-100"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute left-0 top-4 h-[2px] w-full rounded bg-slate-100"
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="sm:hidden"
          >
            <div className="px-4 pb-4">
              <div className="w-full rounded-xl border border-slate-700/60 bg-slate-950/90 p-3">
                <ul className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      {"type" in item && item.type === "page" ? (
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-100 hover:bg-slate-900/40 hover:text-sky-300"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNavClick(item.href);
                          }}
                          className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-100 hover:bg-slate-900/40 hover:text-sky-300"
                        >
                          {item.label}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>

                <div className="mt-3 grid gap-2 border-t border-slate-800/70 pt-3">
                  <Link
                    href="/auth/login"
                    onClick={() => setOpen(false)}
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/50 px-4 text-sm font-medium text-slate-200 transition hover:border-sky-400 hover:text-sky-300"
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
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-4 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/20"
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
  );
}