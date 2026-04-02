import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MD Rahil | Full Stack Developer",
  description:
    "Portfolio of MD Rahil — Full Stack Developer, AI Builder, and Robotics Enthusiast.",
  keywords: [
    "MD Rahil",
    "Portfolio",
    "Full Stack Developer",
    "Web Developer",
    "AI Builder",
    "Robotics",
    "Next.js",
  ],
  authors: [{ name: "MD Rahil" }],
  openGraph: {
    title: "MD Rahil | Full Stack Developer",
    description:
      "Portfolio of MD Rahil — Full Stack Developer, AI Builder, and Robotics Enthusiast.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} relative min-h-screen overflow-x-hidden bg-[#020202] text-white antialiased`}
      >
        {/* Background Layers */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[#020202]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,180,255,0.10),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.10),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.08),transparent_24%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_18%,transparent_82%,rgba(255,255,255,0.02))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:26px_26px] opacity-30" />
        </div>

        {/* Page Content */}
        <div className="relative min-h-screen">
          {children}
        </div>

        {/* 3D Robot Viewer Script */}
        <Script
          type="module"
          src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}