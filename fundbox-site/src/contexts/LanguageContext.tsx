"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "de";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.about": "About",
    "nav.demo": "Request Demo",
    
    // Homepage
    "home.mainStatement": "Lost & Found — But Fast!",
    "home.subtitle": "Instant item matching, effortless communication, happy customers. Fundbox turns your lost &amp; found into a memorable guest experience.",
    "home.requestDemo": "Request a Demo",
    "home.learnMore": "Learn More",
    "home.realtimeInsights": "Realtime insights",
    "home.fasterResolutions": "98% faster claim resolutions",
    "home.claimsMatched": "Claims matched",
    "home.pickupBooked": "Pickup booked",
    "home.responseTime": "Response time",
    "home.howItWorks": "How Fundbox Works",
    "home.howItWorksDesc": "Designed for busy venues, campuses, and transport hubs — Fundbox removes friction across every touchpoint.",
    "home.uploadTitle": "Upload in seconds",
    "home.uploadDesc": "Your staff snaps and uploads item photos directly from any device — bulk compatible.",
    "home.matchTitle": "AI matches instantly",
    "home.matchDesc": "Fundbox scans claims and inventory, identifying the best matches without delay.",
    "home.pickupTitle": "Pickup arranged automatically",
    "home.pickupDesc": "Customers receive the confirmation, schedule collection and receive reminders — zero inbox clutter.",
    "home.whyLove": "Why Organizations Love Fundbox",
    "home.whyLoveDesc": "Empower your team with automation that feels human, keeps customers delighted, and scales with your operations.",
    "home.noHassle": "No communication hassle",
    "home.noHassleDesc": "Centralise every query and update, without endless back-and-forth emails.",
    "home.instantResponses": "Instant responses",
    "home.instantResponsesDesc": "Delight guests with real-time updates and self-serve tracking.",
    "home.smartMatching": "Smart AI matching",
    "home.smartMatchingDesc": "Precision matching boosts reunite rates and reduces manual review time.",
    "home.automatedScheduling": "Automated scheduling",
    "home.automatedSchedulingDesc": "From pick-up slots to reminders, everything runs on autopilot.",
    "home.trustedBy": "Trusted by forward-thinking organizations",
    "home.trustedByDesc": "From nightlife venues to transport networks and museums — Fundbox keeps their guests coming back.",
    "home.readyToStreamline": "Ready to streamline your Lost & Found?",
    "home.readyToStreamlineDesc": "See how Fundbox boosts return rates, cuts admin time, and delivers an on-brand experience your guests will remember.",
    "home.previous": "Previous",
    "home.next": "Next",
    
    // About page
    "about.ourStory": "Our Story",
    "about.title": "Fundbox exists to reunite people and their stuff faster.",
    "about.desc1": "We built Fundbox after volunteering at a stadium that misplaced hundreds of items every weekend. Staff spent hours triaging emails while guests waited in uncertainty. We knew there was a better way — one powered by automation, transparency, and a little bit of delight.",
    "about.desc2": "Today, Fundbox empowers venues, campuses, and transport hubs to match belongings in seconds, keep guests informed automatically, and see measurable improvements across satisfaction scores and team morale.",
    "about.ourVision": "Our Vision",
    "about.visionTitle": "Simplify lost item recovery through AI that feels bespoke.",
    "about.visionDesc1": "We believe people should spend time enjoying their experience — not chasing down a support inbox.",
    "about.visionDesc2": "Fundbox blends computer vision, natural language understanding, and automated workflows to return items before anxiety sets in.",
    "about.quote": "&ldquo;When we piloted Fundbox, our reunite rate jumped by 42% in the first month — and our inbox volume was cut in half.&rdquo;",
    "about.quoteAuthor": "Avery Marsh · Founder &amp; CEO",
    "about.talkToTeam": "Talk to our team",
    "about.builtFor": "Built for modern operations",
    "about.builtForDesc": "A unified command centre for lost &amp; found teams — with automation where it matters.",
    "about.commandDashboard": "Command dashboard",
    "about.commandDashboardDesc": "Monitor claim volume, automate escalations, and see AI confidence scores in one glance.",
    "about.securityTitle": "Security-first infrastructure",
    "about.security1": "Granular permissions and audit trails across every action.",
    "about.security2": "Encrypted storage, secure uploads, and regional data residency options.",
    "about.security3": "Easy integrations with ticketing tools and customer messaging platforms.",
    "about.supportTitle": "Human support when you need it",
    "about.supportDesc": "Our success team co-pilots onboarding, trains staff, and shares best practices from global operators.",
    
    // Demo page
    "demo.scheduleWalkthrough": "Schedule a walkthrough",
    "demo.title": "Get your Fundbox demo now!",
    "demo.desc": "Tell us about your operation, and we&apos;ll tailor a live session that mirrors your workflows. Expect a reply in less than a day.",
    "demo.bullet1": "• Understand how AI matching fits your current process.",
    "demo.bullet2": "• Discover onboarding timelines, integrations, and pricing.",
    "demo.bullet3": "• Get rollout playbooks from venues just like yours.",
    "demo.fullName": "Full name",
    "demo.company": "Company / Institution",
    "demo.email": "Email",
    "demo.message": "Message (optional)",
    "demo.namePlaceholder": "Avery Marsh",
    "demo.companyPlaceholder": "Aurora Stadium",
    "demo.emailPlaceholder": "you@organization.com",
    "demo.messagePlaceholder": "Share priorities, current tools, or unique workflows.",
    "demo.requestDemo": "Request demo",
    "demo.sending": "Sending",
    "demo.success": "Thanks! Our team will reach out within one business day.",
    "demo.nameError": "Please tell us who we will be speaking with.",
    "demo.companyError": "Company or institution name is required.",
    "demo.emailError": "Please provide a valid email address.",
    
    // Footer
    "footer.copyright": "Fundbox. All rights reserved.",
    "footer.privacy": "Privacy",
    "footer.terms": "Terms",
  },
  de: {
    // Navbar
    "nav.home": "Startseite",
    "nav.about": "Über uns",
    "nav.demo": "Demo anfordern",
    
    // Homepage
    "home.mainStatement": "Lost & Found - Aber schnell!",
    "home.subtitle": "Sofortige Artikelzuordnung, mühelose Kommunikation, zufriedene Kunden. Fundbox verwandelt Ihr Fundbüro in ein unvergessliches Gästeerlebnis.",
    "home.requestDemo": "Demo anfordern",
    "home.learnMore": "Mehr erfahren",
    "home.realtimeInsights": "Echtzeit-Einblicke",
    "home.fasterResolutions": "98% schnellere Bearbeitung von Anfragen",
    "home.claimsMatched": "Anfragen zugeordnet",
    "home.pickupBooked": "Abholung gebucht",
    "home.responseTime": "Reaktionszeit",
    "home.howItWorks": "So funktioniert Fundbox",
    "home.howItWorksDesc": "Entwickelt für geschäftige Veranstaltungsorte, Campus und Verkehrsknotenpunkte — Fundbox reduziert Reibungspunkte an jeder Berührungsstelle.",
    "home.uploadTitle": "In Sekunden hochladen",
    "home.uploadDesc": "Ihr Personal fotografiert und lädt Artikelbilder direkt von jedem Gerät hoch — auch in größeren Mengen möglich.",
    "home.matchTitle": "KI ordnet sofort zu",
    "home.matchDesc": "Fundbox durchsucht Anfragen und Inventar und identifiziert die besten Übereinstimmungen ohne Verzögerung.",
    "home.pickupTitle": "Abholung automatisch arrangiert",
    "home.pickupDesc": "Kunden erhalten die Bestätigung, planen die Abholung und erhalten Erinnerungen — keine E-Mail-Flut.",
    "home.whyLove": "Warum Organisationen Fundbox lieben",
    "home.whyLoveDesc": "Stärken Sie Ihr Team mit Automatisierung, die menschlich wirkt, Kunden begeistert und mit Ihren Abläufen skaliert.",
    "home.noHassle": "Keine Kommunikationsprobleme",
    "home.noHassleDesc": "Zentralisieren Sie jede Anfrage und Aktualisierung, ohne endlose E-Mail-Wechsel.",
    "home.instantResponses": "Sofortige Antworten",
    "home.instantResponsesDesc": "Begeistern Sie Gäste mit Echtzeit-Updates und Self-Service-Tracking.",
    "home.smartMatching": "Intelligente KI-Zuordnung",
    "home.smartMatchingDesc": "Präzise Zuordnung steigert Wiedervereinigungsraten und reduziert manuelle Prüfzeiten.",
    "home.automatedScheduling": "Automatisierte Terminplanung",
    "home.automatedSchedulingDesc": "Von Abholterminen bis zu Erinnerungen — alles läuft automatisch.",
    "home.trustedBy": "Zukunftsorientierten Organisationen vertrauen uns",
    "home.trustedByDesc": "Von Nachtleben-Venues bis zu Verkehrsnetzen und Museen — Fundbox bringt macht das Leben für alle leichter.",
    "home.readyToStreamline": "Bereit, Ihr Fundbüro zu optimieren?",
    "home.readyToStreamlineDesc": "Erfahren Sie, wie Fundbox Rückgabequoten steigert, Verwaltungszeit reduziert und ein markenkonformes Erlebnis bietet, an das sich Ihre Gäste erinnern werden.",
    "home.previous": "Zurück",
    "home.next": "Weiter",
    
    // About page
    "about.ourStory": "Unsere Geschichte",
    "about.title": "Fundbox existiert, um Menschen und ihre Sachen schneller wieder zusammenzubringen.",
    "about.desc1": "Wir haben Fundbox entwickelt, nachdem wir in einem Stadion geholfen haben, das jedes Wochenende Hunderte von Gegenständen verlegt hat. Das Personal verbrachte Stunden damit, E-Mails zu sortieren, während Gäste in Ungewissheit warteten. Wir wussten, dass es einen besseren Weg gibt — einen, der von Automatisierung, Transparenz und einem Hauch von Freude angetrieben wird.",
    "about.desc2": "Heute ermöglicht Fundbox Veranstaltungsorten, Campus und Verkehrsknotenpunkten, Gegenstände in Sekunden zuzuordnen, Gäste automatisch zu informieren und messbare Verbesserungen bei Zufriedenheitswerten und Team-Moral zu sehen.",
    "about.ourVision": "Unsere Vision",
    "about.visionTitle": "Vereinfachen Sie die Wiederbeschaffung verlorener Gegenstände durch KI, die sich maßgeschneidert anfühlt.",
    "about.visionDesc1": "Wir glauben, dass Menschen Zeit damit verbringen sollten, ihr Erlebnis zu genießen — nicht, einem Support-Postfach hinterherzujagen.",
    "about.visionDesc2": "Fundbox kombiniert Computer Vision, natürliches Sprachverständnis und automatisierte Workflows, um Gegenstände zurückzugeben, bevor Angst aufkommt.",
    "about.quote": "&ldquo;Als wir Fundbox testeten, stieg unsere Wiedervereinigungsrate im ersten Monat um 42% — und unser E-Mail-Volumen wurde halbiert.&rdquo;",
    "about.quoteAuthor": "Avery Marsh · Gründer &amp; CEO",
    "about.talkToTeam": "Sprechen Sie mit unserem Team",
    "about.builtFor": "Gebaut für moderne Betriebe",
    "about.builtForDesc": "Ein einheitliches Kommandozentrum für Fundbüro-Teams — mit Automatisierung, wo es wichtig ist.",
    "about.commandDashboard": "Kommando-Dashboard",
    "about.commandDashboardDesc": "Überwachen Sie das Anfragevolumen, automatisieren Sie Eskalationen und sehen Sie KI-Konfidenzwerte auf einen Blick.",
    "about.securityTitle": "Sicherheitsorientierte Infrastruktur",
    "about.security1": "Granulare Berechtigungen und Prüfpfade für jede Aktion.",
    "about.security2": "Verschlüsselter Speicher, sichere Uploads und regionale Datenresidenz-Optionen.",
    "about.security3": "Einfache Integrationen mit Ticketing-Tools und Kunden-Messaging-Plattformen.",
    "about.supportTitle": "Menschliche Unterstützung, wenn Sie sie brauchen",
    "about.supportDesc": "Unser Erfolgsteam begleitet Onboarding, schult Personal und teilt Best Practices von globalen Betreibern.",
    
    // Demo page
    "demo.scheduleWalkthrough": "Termin vereinbaren",
    "demo.title": "Holen Sie sich jetzt Ihre Fundbox-Demo!",
    "demo.desc": "Erzählen Sie uns von Ihrem Betrieb, und wir passen eine Live-Session an, die Ihre Arbeitsabläufe widerspiegelt. Erwarten Sie eine Antwort in weniger als einem Tag.",
    "demo.bullet1": "• Verstehen Sie, wie KI-Zuordnung in Ihren aktuellen Prozess passt.",
    "demo.bullet2": "• Entdecken Sie Onboarding-Zeitpläne, Integrationen und Preise.",
    "demo.bullet3": "• Erhalten Sie Rollout-Leitfäden von Venues wie Ihren.",
    "demo.fullName": "Vollständiger Name",
    "demo.company": "Unternehmen / Institution",
    "demo.email": "E-Mail",
    "demo.message": "Nachricht (optional)",
    "demo.namePlaceholder": "Avery Marsh",
    "demo.companyPlaceholder": "Aurora Stadium",
    "demo.emailPlaceholder": "sie@organisation.de",
    "demo.messagePlaceholder": "Teilen Sie Prioritäten, aktuelle Tools oder einzigartige Arbeitsabläufe mit.",
    "demo.requestDemo": "Demo anfordern",
    "demo.sending": "Wird gesendet",
    "demo.success": "Danke! Unser Team wird sich innerhalb eines Werktages bei Ihnen melden.",
    "demo.nameError": "Bitte teilen Sie uns mit, mit wem wir sprechen werden.",
    "demo.companyError": "Firmen- oder Institutionsname ist erforderlich.",
    "demo.emailError": "Bitte geben Sie eine gültige E-Mail-Adresse an.",
    
    // Footer
    "footer.copyright": "Fundbox. Alle Rechte vorbehalten.",
    "footer.privacy": "Datenschutz",
    "footer.terms": "Nutzungsbedingungen",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    // Load language from localStorage on mount
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage === "en" || savedLanguage === "de") {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

