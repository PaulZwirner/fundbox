import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MotionConfig } from "motion/react";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fundbox — AI Lost & Found",
  description:
    "Fundbox automates lost & found management with instant AI matching and automated scheduling — no endless emails, just instant results.",
  metadataBase: new URL("https://fundbox.example"),
  openGraph: {
    title: "Fundbox — AI Lost & Found",
    description:
      "Fundbox automates lost & found management with instant AI matching and automated scheduling.",
    type: "website",
    url: "https://fundbox.example",
    images: [
      {
        url: "/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Fundbox AI Lost & Found",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fundbox — AI Lost & Found",
    description:
      "Fundbox automates lost & found management with instant AI matching and automated scheduling.",
    images: ["/images/hero-bg.jpg"],
  },
  keywords: [
    "Lost and Found software",
    "AI lost and found",
    "Fundbox",
    "customer experience platform",
    "automated scheduling",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.variable, orbitron.variable, "bg-background text-foreground")}> 
        <MotionConfig reducedMotion="user">
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster richColors closeButton position="top-right" />
        </MotionConfig>
      </body>
    </html>
  );
}
