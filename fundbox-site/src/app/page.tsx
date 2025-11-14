"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { CalendarCheck, Camera, MessageSquare, Sparkles, Users } from "lucide-react";

import GlassSurface from "@/components/GlassSurface";
import SectionWrapper from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import Stepper, { Step } from "@/components/Stepper";
import { Step1UploadAnimation, Step2MatchAnimation, Step3CalendarAnimation } from "@/components/StepAnimations";
import TrueFocus from "@/components/TrueFocus";
import StarBorder from "@/components/StarBorder";
import SpotlightCard from "@/components/SpotlightCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAccentColor } from "@/contexts/AccentColorContext";

const logos = [
  { src: "/images/logo1.png", alt: "Nightwave", description: "Leading innovation in nightlife technology" },
  { src: "/images/logo2.png", alt: "TransitGo", description: "Revolutionizing urban transportation" },
  { src: "/images/logo3.png", alt: "MuseumX", description: "Transforming cultural experiences" },
  { src: "/images/logo4.png", alt: "BLITZ", description: "Fast-paced solutions for modern businesses" },
];

export default function Home() {
  const { t } = useLanguage();
  const { colorConfig } = useAccentColor();

  const howItWorks = [
    {
      title: t("home.uploadTitle"),
      description: t("home.uploadDesc"),
      icon: <Camera className="h-5 w-5" />,
      accent: "primary" as const,
    },
    {
      title: t("home.matchTitle"),
      description: t("home.matchDesc"),
      icon: <Sparkles className="h-5 w-5" />,
      accent: "secondary" as const,
    },
    {
      title: t("home.pickupTitle"),
      description: t("home.pickupDesc"),
      icon: <CalendarCheck className="h-5 w-5" />,
      accent: "primary" as const,
    },
  ];

  const benefits = [
    {
      title: t("home.noHassle"),
      description: t("home.noHassleDesc"),
      icon: <MessageSquare className="h-6 w-6" />,
    },
    {
      title: t("home.instantResponses"),
      description: t("home.instantResponsesDesc"),
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: t("home.smartMatching"),
      description: t("home.smartMatchingDesc"),
      icon: <Sparkles className="h-6 w-6" />,
    },
    {
      title: t("home.automatedScheduling"),
      description: t("home.automatedSchedulingDesc"),
      icon: <CalendarCheck className="h-6 w-6" />,
    },
  ];
  return (
    <div className="space-y-24 pb-28">
      <section className="relative overflow-hidden bg-background">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Soft gradient background"
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-background" />
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
                  sentence={t("home.mainStatement")}
                  manualMode={false}
                  blurAmount={5}
                  borderColor={colorConfig.primary}
                  glowColor={colorConfig.ring}
                  animationDuration={2}
                  pauseBetweenAnimations={2.5}
                  alwaysVisibleIndices={[1, 3, 4, 5]} // "&", "—", "But", "Fast!" - indices after splitting by space
                  customClassIndices={{
                    4: "font-orbitron", // "But" - speed font
                    5: "font-orbitron" // "Fast!" - speed font
                  }}
                />
              </h1>
              <p className="max-w-xl text-lg text-foreground/70 lg:text-xl">
                {t("home.subtitle")}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button asChild size="lg" className="rounded-full bg-primary px-8 text-xs uppercase tracking-[0.25em] hover:bg-primary/90">
                  <Link href="/demo">{t("home.requestDemo")}</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border border-foreground/20 bg-white/50 px-8 text-xs uppercase tracking-[0.25em] text-foreground/80 hover:border-primary/40 hover:text-primary"
                >
                  <a href="#how-it-works">{t("home.learnMore")}</a>
                </Button>
              </div>
            </div>
            <StarBorder
              as="div"
              className="w-full"
              color={colorConfig.surfaceGlow}
              speed="5s"
              thickness={0}
              enableHover={true}
            >
                <SpotlightCard 
                  className="custom-spotlight-card w-full rounded-[2.5rem]"
                  spotlightColor={colorConfig.surfaceGlow}
                >
                <div className="grid gap-8 p-8 relative z-10">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-primary/80">{t("home.realtimeInsights")}</p>
                    <p className="mt-2 text-2xl font-semibold text-foreground">{t("home.fasterResolutions")}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-6 text-sm">
                    <motion.div
                      className="rounded-2xl border border-black/40 dark:border-white/40 bg-black/75 dark:bg-white/75 p-5 text-center shadow-inner cursor-pointer relative"
                      style={{ zIndex: 1 }}
                      whileHover={{ 
                        y: -8, 
                        scale: 1.05,
                        zIndex: 10,
                        transition: { duration: 0.2, ease: "easeOut" }
                      }}
                    >
                      <p className="text-xs uppercase tracking-[0.25em] text-foreground">{t("home.claimsMatched")}</p>
                      <p className="mt-2 text-2xl font-semibold text-primary">12,480+</p>
                    </motion.div>
                    <motion.div
                      className="rounded-2xl border border-black/40 dark:border-white/40 bg-black/75 dark:bg-white/75 p-5 text-center shadow-inner cursor-pointer relative"
                      style={{ zIndex: 1 }}
                      whileHover={{ 
                        y: -8, 
                        scale: 1.05,
                        zIndex: 10,
                        transition: { duration: 0.2, ease: "easeOut" }
                      }}
                    >
                      <p className="text-xs uppercase tracking-[0.25em] text-foreground">{t("home.pickupBooked")}</p>
                      <p className="mt-2 text-2xl font-semibold text-secondary">6,210</p>
                    </motion.div>
                    <motion.div
                      className="col-span-2 rounded-2xl border border-black/35 dark:border-white/35 bg-black/65 dark:bg-white/65 p-5 text-left shadow-inner cursor-pointer relative"
                      style={{ zIndex: 1 }}
                      whileHover={{ 
                        y: -8, 
                        scale: 1.02,
                        zIndex: 10,
                        transition: { duration: 0.2, ease: "easeOut" }
                      }}
                    >
                      <p className="text-xs uppercase tracking-[0.25em] text-foreground">{t("home.responseTime")}</p>
                      <p className="mt-2 text-3xl font-semibold text-foreground">&lt; 2 min</p>
                    </motion.div>
                  </div>
                </div>
              </SpotlightCard>
            </StarBorder>
          </motion.div>
        </div>
      </section>

      <SectionWrapper id="how-it-works" className="space-y-12">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">{t("home.howItWorks")}</h2>
          <p className="mt-4 text-base text-foreground/70">
            {t("home.howItWorksDesc")}
          </p>
        </div>
        <Stepper
          initialStep={1}
          onStepChange={() => {
            // Step change handler
          }}
          onFinalStepCompleted={() => {
            // All steps completed
          }}
          backButtonText={t("home.previous")}
          nextButtonText={t("home.next")}
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
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">{t("home.whyLove")}</h2>
          <p className="mt-4 text-base text-foreground/70">
            {t("home.whyLoveDesc")}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 items-stretch">
          {benefits.map((benefit) => (
            <SpotlightCard 
              key={benefit.title}
              className="custom-spotlight-card w-full h-full rounded-[2.5rem] border border-white/18"
              spotlightColor={colorConfig.surfaceGlow}
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
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">{t("home.trustedBy")}</h2>
          <p className="text-base text-foreground/70">
            {t("home.trustedByDesc")}
          </p>
        </div>
        <StarBorder
          as="div"
          className="w-full"
          color={colorConfig.surfaceGlow}
          speed="5s"
          thickness={0}
        >
          <SpotlightCard 
            className="custom-spotlight-card w-full rounded-[2.5rem] border border-white/18 overflow-hidden"
            spotlightColor={colorConfig.surfaceGlow}
          >
            <div className="relative p-6 z-10">
              <motion.div
                className="flex gap-8"
                animate={{ x: [0, -896] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                {[...logos, ...logos].map((logo, idx) => (
                  <motion.div
                    key={`${logo.alt}-${idx}`}
                    className="group relative h-24 w-48 flex-shrink-0"
                    style={{ zIndex: 1 }}
                    whileHover={{ scale: 1.1, zIndex: 10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <div className="relative flex h-full w-full items-center justify-center rounded-2xl border border-black/30 dark:border-white/30 bg-black dark:bg-white px-6 py-4 overflow-hidden">
                      <div className="flowing-border"></div>
                      <Image 
                        src={logo.src} 
                        alt={logo.alt} 
                        width={160} 
                        height={60} 
                        loading="lazy"
                        className="relative z-10 h-auto w-full max-h-[72px] object-contain grayscale hover:grayscale-0"
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </SpotlightCard>
        </StarBorder>
      </SectionWrapper>

      <SectionWrapper className="pt-8">
        <GlassSurface variant="card" className="mx-auto w-full max-w-5xl p-10">
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
              {t("home.readyToStreamline")}
            </h2>
            <p className="max-w-2xl text-base text-foreground/70">
              {t("home.readyToStreamlineDesc")}
            </p>
            <Button asChild size="lg" className="rounded-full bg-primary px-10 text-xs uppercase tracking-[0.3em] hover:bg-primary/90">
              <Link href="/demo">{t("home.requestDemo")}</Link>
            </Button>
          </div>
        </GlassSurface>
      </SectionWrapper>
    </div>
  );
}
