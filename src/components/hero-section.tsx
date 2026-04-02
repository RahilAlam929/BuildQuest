"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Instagram } from "lucide-react";
import { useEffect, useState } from "react";

import StatusBadge from "@/components/status-badge";

const phrases = ["Full Stack Developer", "AI Builder", "Robotics Enthusiast"];

function useTypingCarousel(words: string[], delay = 120, pause = 1400) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [direction, setDirection] = useState<"typing" | "erasing">("typing");

  useEffect(() => {
    const word = words[index];

    if (direction === "typing") {
      if (text.length < word.length) {
        const t = setTimeout(() => setText(word.slice(0, text.length + 1)), delay);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setDirection("erasing"), pause);
      return () => clearTimeout(t);
    } else {
      if (text.length > 0) {
        const t = setTimeout(() => setText(word.slice(0, text.length - 1)), delay / 1.5);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setDirection("typing");
      }, 250);
      return () => clearTimeout(t);
    }
  }, [text, direction, index]);

  return text;
}

export default function HeroSection() {
  const typed = useTypingCarousel(phrases);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-shell px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
        {/* LEFT */}
        <div className="flex-1 space-y-5">
          <StatusBadge />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
              Hi, I’m{" "}
              <span className="gradient-text">MD RAHIL</span>
            </h1>

            <p className="typing-cursor mt-2 text-xs uppercase tracking-[0.25em] text-sky-300">
              {typed}
            </p>
          </motion.div>

          <motion.p
            className="max-w-xl text-sm text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            I build modern digital systems combining{" "}
            <span className="text-sky-300 font-medium">web development</span>,{" "}
            <span className="text-fuchsia-300 font-medium">AI</span> and{" "}
            <span className="text-emerald-300 font-medium">robotics</span>.
          </motion.p>

          {/* ACTIONS */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => scrollTo("#projects")}
              className="rounded-full bg-gradient-to-r from-sky-500 to-fuchsia-500 px-5 py-2 text-sm font-medium text-white transition hover:brightness-110"
            >
              View Work
            </button>

            <button
              onClick={() => scrollTo("#contact")}
              className="chip-soft px-5 py-2 text-sm text-slate-300 hover:text-white"
            >
              Contact
            </button>

            {/* SOCIAL */}
            <div className="flex items-center gap-2 ml-2">
              <a href="#" className="chip-soft h-8 w-8 flex items-center justify-center">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" className="chip-soft h-8 w-8 flex items-center justify-center">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="chip-soft h-8 w-8 flex items-center justify-center">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT CARD */}
        <motion.div
          className="flex flex-1 justify-center"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="inner-shell w-[240px] sm:w-[260px] rounded-2xl p-4">
            <div className="text-[10px] uppercase text-slate-400">
              System Status
            </div>

            <div className="mt-3 space-y-2 text-[11px] font-mono text-slate-300">
              <p>&gt; Deploying full-stack systems…</p>
              <p>&gt; Integrating AI modules…</p>
              <p>&gt; Optimizing robotics logic…</p>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-[10px]">
              <div className="chip-soft p-2 text-center">Next.js</div>
              <div className="chip-soft p-2 text-center">AI</div>
              <div className="chip-soft p-2 text-center">Robotics</div>
            </div>

            <div className="mt-4 flex justify-between text-xs text-slate-400">
              <span>Mode</span>
              <span className="text-emerald-300">Active</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}