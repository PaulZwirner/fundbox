"use client";

import Link from "next/link";
import { Quote } from "lucide-react";
import { motion } from "motion/react";

import SectionWrapper from "@/components/SectionWrapper";
import GlassSurface from "@/components/GlassSurface";
import { Button } from "@/components/ui/button";
import TiltedCard from "@/components/TiltedCard";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutPageContent = () => {
  const { t } = useLanguage();
  return (
    <div className="pb-24">
      <SectionWrapper className="pt-32">
        <div className="space-y-16">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.35em] text-primary/80">{t("about.ourStory")}</span>
            <h1 className="text-4xl font-semibold text-foreground sm:text-5xl">{t("about.title")}</h1>
            <p className="text-lg text-foreground/70">
              {t("about.desc1")}
            </p>
            <p className="text-base text-foreground/70">
              {t("about.desc2")}
            </p>
            <Button asChild size="lg" className="rounded-full bg-primary px-10 text-xs uppercase tracking-[0.3em] hover:bg-primary/90">
              <Link href="/demo">{t("home.requestDemo")}</Link>
            </Button>
          </div>
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.35em] text-primary/80">{t("about.ourVision")}</span>
            <h2 className="text-4xl font-semibold text-foreground sm:text-5xl">{t("about.visionTitle")}</h2>
            <p className="text-lg text-foreground/70">
              {t("about.visionDesc1")}
            </p>
            <p className="text-base text-foreground/70">
              {t("about.visionDesc2")}
            </p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-8">
        <GlassSurface variant="card" className="p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl space-y-4 text-foreground">
              <Quote className="h-10 w-10 text-primary" />
              <p className="text-lg italic text-foreground/80">
                {t("about.quote")}
              </p>
              <p className="text-sm uppercase tracking-[0.35em] text-foreground/60">{t("about.quoteAuthor")}</p>
            </div>
            <Button asChild variant="outline" className="rounded-full border-primary/40 px-8 text-xs uppercase tracking-[0.3em] text-primary hover:border-primary hover:text-primary">
              <Link href="mailto:hello@fundbox.ai">{t("about.talkToTeam")}</Link>
            </Button>
          </div>
        </GlassSurface>
      </SectionWrapper>

      <SectionWrapper className="space-y-10">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">{t("about.builtFor")}</h2>
          <p className="text-base text-foreground/70">
            {t("about.builtForDesc")}
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <TiltedCard
            title={t("about.commandDashboard")}
            description={t("about.commandDashboardDesc")}
            imageSrc="/images/hero-bg.jpg"
            imageAlt="Fundbox dashboard preview"
            accent="secondary"
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <GlassSurface variant="tile" className="p-8">
              <h3 className="text-xl font-semibold text-foreground">{t("about.securityTitle")}</h3>
              <ul className="mt-4 space-y-3 text-sm text-foreground/70">
                <li>{t("about.security1")}</li>
                <li>{t("about.security2")}</li>
                <li>{t("about.security3")}</li>
              </ul>
            </GlassSurface>
            <GlassSurface variant="tile" className="mt-6 p-8">
              <h3 className="text-xl font-semibold text-foreground">{t("about.supportTitle")}</h3>
              <p className="mt-3 text-sm text-foreground/70">
                {t("about.supportDesc")}
              </p>
            </GlassSurface>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default AboutPageContent;
