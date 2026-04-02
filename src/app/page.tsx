"use client";

import dynamic from "next/dynamic";
import TopNav from "@/components/top-nav";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import SkillsSection from "@/components/skills-section";
import TechEventsHomeSection from "@/components/tech-events-home-section";
import ProjectsSection from "@/components/projects-section";
import BuilderHubSuperUltra from "@/components/builder-hub-super-ultra";
import ChallengeSection from "@/components/challenge-section";
import PlatformLinksSection from "@/components/platform-links-section";
import WinnerShowcase from "@/components/winner-showcase";
import ResourcesSection from "@/components/resources-section";
import UpdatesSection from "@/components/updates-section";
import EventsSection from "@/components/events-section";
import ContactSection from "@/components/contact-section";
import CursorGlow from "@/components/cursor-glow";
import ParallaxOrbs from "@/components/parallax-orbs";
import VoiceAssistantPro from "@/components/voice-assistant-pro";

const RobotWelcome = dynamic(() => import("@/components/robot-welcome"), {
  ssr: false,
  loading: () => (
    <div className="section-shell h-[280px] w-full animate-pulse rounded-[28px] sm:h-[340px]" />
  ),
});

function SectionWrap({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 ${className}`}>
      {children}
    </section>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-transparent text-white selection:bg-cyan-400/20">
      <ParallaxOrbs />
      <CursorGlow />
      <TopNav />

      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 pb-16 pt-20 sm:gap-6 sm:px-6 sm:pt-24 lg:gap-7 lg:px-8">
        {/* Hero zone */}
        <SectionWrap id="home" className="space-y-5">
          <RobotWelcome />
          <VoiceAssistantPro />
          <HeroSection />
        </SectionWrap>

        {/* About */}
        <SectionWrap id="about">
          <AboutSection />
        </SectionWrap>

        {/* Skills */}
        <SectionWrap id="skills">
          <SkillsSection />
        </SectionWrap>

        {/* Builder Hub */}
        <SectionWrap>
          <BuilderHubSuperUltra />
        </SectionWrap>

        {/* Projects + links */}
        <SectionWrap id="projects" className="space-y-5">
          <ProjectsSection />
          <PlatformLinksSection />
        </SectionWrap>

        {/* Challenge zone */}
        <SectionWrap id="challenge" className="space-y-5">
          <ChallengeSection />
          <TechEventsHomeSection />
          <WinnerShowcase />
        </SectionWrap>

        {/* Resources */}
        <SectionWrap id="resources">
          <ResourcesSection />
        </SectionWrap>

        {/* Updates */}
        <SectionWrap id="updates">
          <UpdatesSection />
        </SectionWrap>

        {/* Events */}
        <SectionWrap id="events">
          <EventsSection />
        </SectionWrap>

        {/* Contact */}
        <SectionWrap id="contact">
          <ContactSection />
        </SectionWrap>
      </main>

      <footer className="relative z-10 mt-4 border-t border-white/6 bg-white/[0.02] backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-2 px-4 py-8 sm:px-6 lg:px-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.36em] text-cyan-300/70">
            MD RAHIL // SYSTEM ACTIVE
          </p>
          <p className="text-[11px] text-slate-500">
            © 2026 MD Rahil. Crafted with modern web technologies.
          </p>
        </div>
      </footer>
    </div>
  );
}