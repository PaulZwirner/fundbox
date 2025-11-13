"use client";

import Link from "next/link";
import { Quote } from "lucide-react";
import { motion } from "motion/react";

import SectionWrapper from "@/components/SectionWrapper";
import GlassSurface from "@/components/GlassSurface";
import { Button } from "@/components/ui/button";
import TiltedCard from "@/components/TiltedCard";

const AboutPageContent = () => {
  return (
    <div className="pb-24">
      <SectionWrapper className="pt-32">
        <div className="space-y-16">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.35em] text-primary/80">Our Story</span>
            <h1 className="text-4xl font-semibold text-foreground sm:text-5xl">Fundbox exists to reunite people and there stuff faster.</h1>
            <p className="text-lg text-foreground/70">
              We built Fundbox after volunteering at a stadium that misplaced hundreds of items every weekend. Staff spent hours triaging emails while guests waited in uncertainty. We knew there was a better way — one powered by automation, transparency, and a little bit of delight.
            </p>
            <p className="text-base text-foreground/70">
              Today, Fundbox empowers venues, campuses, and transport hubs to match belongings in seconds, keep guests informed automatically, and see measurable improvements across satisfaction scores and team morale.
            </p>
            <Button asChild size="lg" className="rounded-full bg-primary px-10 text-xs uppercase tracking-[0.3em] hover:bg-primary/90">
              <Link href="/demo">Request a Demo</Link>
            </Button>
          </div>
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.35em] text-primary/80">Our Vision</span>
            <h2 className="text-4xl font-semibold text-foreground sm:text-5xl">Simplify lost item recovery through AI that feels bespoke.</h2>
            <p className="text-lg text-foreground/70">
              We believe people should spend time enjoying their experience — not chasing down a support inbox.
            </p>
            <p className="text-base text-foreground/70">
              Fundbox blends computer vision, natural language understanding, and automated workflows to return items before anxiety sets in.
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
                &ldquo;When we piloted Fundbox, our reunite rate jumped by 42% in the first month — and our inbox volume was cut in half.&rdquo;
              </p>
              <p className="text-sm uppercase tracking-[0.35em] text-foreground/60">Avery Marsh · Founder &amp; CEO</p>
            </div>
            <Button asChild variant="outline" className="rounded-full border-primary/40 px-8 text-xs uppercase tracking-[0.3em] text-primary hover:border-primary hover:text-primary">
              <Link href="mailto:hello@fundbox.ai">Talk to our team</Link>
            </Button>
          </div>
        </GlassSurface>
      </SectionWrapper>

      <SectionWrapper className="space-y-10">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">Built for modern operations</h2>
          <p className="text-base text-foreground/70">
            A unified command centre for lost &amp; found teams — with automation where it matters.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <TiltedCard
            title="Command dashboard"
            description="Monitor claim volume, automate escalations, and see AI confidence scores in one glance."
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
              <h3 className="text-xl font-semibold text-foreground">Security-first infrastructure</h3>
              <ul className="mt-4 space-y-3 text-sm text-foreground/70">
                <li>Granular permissions and audit trails across every action.</li>
                <li>Encrypted storage, secure uploads, and regional data residency options.</li>
                <li>Easy integrations with ticketing tools and customer messaging platforms.</li>
              </ul>
            </GlassSurface>
            <GlassSurface variant="tile" className="mt-6 p-8">
              <h3 className="text-xl font-semibold text-foreground">Human support when you need it</h3>
              <p className="mt-3 text-sm text-foreground/70">
                Our success team co-pilots onboarding, trains staff, and shares best practices from global operators.
              </p>
            </GlassSurface>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default AboutPageContent;
