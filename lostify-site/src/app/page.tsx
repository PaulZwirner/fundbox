"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, CalendarCheck, Camera, MessageSquare, Sparkles, Users } from "lucide-react";

import GlassSurface from "@/components/GlassSurface";
import SectionWrapper from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import Stepper, { Step } from "@/components/Stepper";
import { Step1UploadAnimation, Step2MatchAnimation, Step3CalendarAnimation } from "@/components/StepAnimations";
import TrueFocus from "@/components/TrueFocus";
import StarBorder from "@/components/StarBorder";
import SpotlightCard from "@/components/SpotlightCard";

const logos = [
  { src: "/images/logo1.png", alt: "Nightwave" },
  { src: "/images/logo2.png", alt: "TransitGo" },
  { src: "/images/logo3.png", alt: "MuseumX" },
];

const howItWorks = [
  {
    title: "Upload in seconds",
    description: "Your staff snaps and uploads item photos directly from any device — bulk compatible.",
    icon: <Camera className="h-5 w-5" />,
    accent: "primary" as const,
  },
  {
    title: "AI matches instantly",
    description: "Fundbox scans claims and inventory, serving the best matches to your guests without delay.",
    icon: <Sparkles className="h-5 w-5" />,
    accent: "secondary" as const,
  },
  {
    title: "Pickup arranged automatically",
    description: "Customers receive the confirmation, schedule collection and receive reminders — zero inbox clutter.",
    icon: <CalendarCheck className="h-5 w-5" />,
    accent: "primary" as const,
  },
];

const benefits = [
  {
    title: "No communication hassle",
    description: "Centralise every query and update, without endless back-and-forth emails.",
    icon: <MessageSquare className="h-6 w-6" />,
  },
  {
    title: "Instant responses",
    description: "Delight guests with real-time updates and self-serve tracking.",
    icon: <Users className="h-6 w-6" />,
  },
  {
    title: "Smart AI matching",
    description: "Precision matching boosts reunite rates and reduces manual review time.",
    icon: <Sparkles className="h-6 w-6" />,
  },
  {
    title: "Automated scheduling",
    description: "From pick-up slots to reminders, everything runs on autopilot.",
    icon: <CalendarCheck className="h-6 w-6" />,
  },
];

export default function Home() {
  return (
    <div className="space-y-24 pb-28">
      <section className="relative overflow-hidden bg-black">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Soft gradient background"
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-black" />
        </div>
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-24 px-4 pb-32 pt-40 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center"
          >
            <div className="space-y-8">
              <h1 className="text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                <TrueFocus
                  sentence="Lost & Found — But Fast!"
                  manualMode={false}
                  blurAmount={5}
                  borderColor="#b74f6f"
                  glowColor="rgba(183, 79, 111, 0.6)"
                  animationDuration={2}
                  pauseBetweenAnimations={1}
                  alwaysVisibleIndices={[1, 3, 4, 5]} // "&", "—", "But", "Fast!" - indices after splitting by space
                  customClassIndices={{
                    4: "font-orbitron", // "But" - speed font
                    5: "font-orbitron" // "Fast!" - speed font
                  }}
                />
              </h1>
              <p className="max-w-xl text-lg text-foreground/70 lg:text-xl">
                Instant item matching, effortless communication, happy customers. Fundbox turns your lost &amp; found into a memorable guest experience.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button asChild size="lg" className="rounded-full bg-primary px-8 text-xs uppercase tracking-[0.25em] hover:bg-primary/90">
                  <Link href="/demo">Request a Demo</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border border-foreground/20 bg-white/50 px-8 text-xs uppercase tracking-[0.25em] text-foreground/80 hover:border-primary/40 hover:text-primary"
                >
                  <a href="#how-it-works">Learn More</a>
                </Button>
              </div>
            </div>
            <StarBorder
              as="div"
              className="w-full"
              color="rgba(183, 79, 111, 0.4)"
              speed="5s"
              thickness={0}
            >
              <SpotlightCard 
                className="custom-spotlight-card w-full rounded-[2.5rem] border border-white/18"
                spotlightColor="rgba(183, 79, 111, 0.2)"
              >
                <div className="grid gap-8 p-8 relative z-10">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Realtime insights</p>
                    <p className="mt-2 text-2xl font-semibold text-foreground">98% faster claim resolutions</p>
                  </div>
                  <div className="grid grid-cols-2 gap-6 text-sm">
                    <div className="rounded-2xl border border-white/40 bg-white/75 p-5 text-center shadow-inner">
                      <p className="text-xs uppercase tracking-[0.25em] text-black">Claims matched</p>
                      <p className="mt-2 text-2xl font-semibold text-primary">12,480+</p>
                    </div>
                    <div className="rounded-2xl border border-white/40 bg-white/75 p-5 text-center shadow-inner">
                      <p className="text-xs uppercase tracking-[0.25em] text-black">Pickup booked</p>
                      <p className="mt-2 text-2xl font-semibold text-secondary">6,210</p>
                    </div>
                    <div className="col-span-2 rounded-2xl border border-white/35 bg-white/65 p-5 text-left shadow-inner">
                      <p className="text-xs uppercase tracking-[0.25em] text-black">Response time</p>
                      <p className="mt-2 text-3xl font-semibold text-black">&lt; 2 min</p>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </StarBorder>
          </motion.div>
        </div>
      </section>

      <SectionWrapper id="how-it-works" className="space-y-12">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">How Fundbox Works</h2>
          <p className="mt-4 text-base text-foreground/70">
            Designed for busy venues, campuses, and transport hubs — Fundbox removes friction across every touchpoint.
          </p>
        </div>
        <Stepper
          initialStep={1}
          onStepChange={(step) => {
            console.log(step);
          }}
          onFinalStepCompleted={() => console.log("All steps completed!")}
          backButtonText="Previous"
          nextButtonText="Next"
        >
          <Step>
            <div className="flex flex-col gap-6 pt-6">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/12 text-primary shadow-inner flex-shrink-0">
                  <Camera className="h-5 w-5" />
                </span>
                <div className="flex-1 max-w-[600px]">
                  <h3 className="text-lg font-semibold text-foreground text-left">{howItWorks[0].title}</h3>
                  <p className="mt-2 text-base text-foreground/70 text-left">{howItWorks[0].description}</p>
                </div>
              </div>
              <div className="mt-4">
                <Step1UploadAnimation />
              </div>
            </div>
          </Step>
          <Step>
            <div className="flex flex-col gap-6 pt-6">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/12 text-primary shadow-inner flex-shrink-0">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div className="flex-1 max-w-[600px]">
                  <h3 className="text-lg font-semibold text-foreground text-left">{howItWorks[1].title}</h3>
                  <p className="mt-2 text-base text-foreground/70 text-left">{howItWorks[1].description}</p>
                </div>
              </div>
              <div className="mt-4">
                <Step2MatchAnimation />
              </div>
            </div>
          </Step>
          <Step>
            <div className="flex flex-col gap-6 pt-6">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/12 text-primary shadow-inner flex-shrink-0">
                  <CalendarCheck className="h-5 w-5" />
                </span>
                <div className="flex-1 max-w-[600px]">
                  <h3 className="text-lg font-semibold text-foreground text-left">{howItWorks[2].title}</h3>
                  <p className="mt-2 text-base text-foreground/70 text-left">{howItWorks[2].description}</p>
                </div>
              </div>
              <div className="mt-4">
                <Step3CalendarAnimation />
              </div>
            </div>
          </Step>
        </Stepper>
      </SectionWrapper>

      <SectionWrapper className="space-y-12">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">Why Organizations Love Fundbox</h2>
          <p className="mt-4 text-base text-foreground/70">
            Empower your team with automation that feels human, keeps customers delighted, and scales with your operations.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 items-stretch">
          {benefits.map((benefit) => (
            <SpotlightCard 
              key={benefit.title}
              className="custom-spotlight-card w-full h-full rounded-[2.5rem] border border-white/18"
              spotlightColor="rgba(183, 79, 111, 0.2)"
            >
              <div className="p-8 relative z-10 h-full flex flex-col">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/12 text-primary shadow-inner flex-shrink-0">
                    {benefit.icon}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{benefit.title}</h3>
                    <p className="mt-2 text-sm text-foreground/70">{benefit.description}</p>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="space-y-10">
        <div className="flex flex-col gap-4 text-center">
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">Trusted by forward-thinking organizations</h2>
          <p className="text-base text-foreground/70">
            From nightlife venues to transport networks and museums — Fundbox keeps their guests coming back.
          </p>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/70 p-6 backdrop-blur">
          <motion.div
            className="flex min-w-full gap-8"
            animate={{ x: [0, -120, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          >
            {[...logos, ...logos].map((logo, idx) => (
              <motion.div
                key={`${logo.alt}-${idx}`}
                whileHover={{ scale: 1.05 }}
                className="flex h-24 w-48 items-center justify-center rounded-2xl border border-white/30 bg-white/60 px-6 py-4 grayscale hover:grayscale-0"
              >
                <Image src={logo.src} alt={logo.alt} width={160} height={60} loading="lazy" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-8">
        <GlassSurface variant="card" className="mx-auto w-full max-w-5xl p-10">
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
              Ready to streamline your Lost &amp; Found?
            </h2>
            <p className="max-w-2xl text-base text-foreground/70">
              See how Fundbox boosts return rates, cuts admin time, and delivers an on-brand experience your guests will remember.
            </p>
            <Button asChild size="lg" className="rounded-full bg-primary px-10 text-xs uppercase tracking-[0.3em] hover:bg-primary/90">
              <Link href="/demo">Request a Demo</Link>
            </Button>
          </div>
        </GlassSurface>
      </SectionWrapper>
    </div>
  );
}
