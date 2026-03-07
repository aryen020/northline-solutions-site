"use client";

import Image from "next/image";
import { Headset, CalendarDays, MessageCircleMore, PhoneForwarded } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";

// ------------------------------------------------------------
// Northline Solutions — Clean & Professional (Apple-like) Site
// Tech: React + TailwindCSS + Framer Motion
// Design: Minimal, airy whitespace, subtle shadows, gentle animations
// Lead Capture: Webhook integration (Make.com) provided by client
// ------------------------------------------------------------

// Tailwind utility helper
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Global brand tokens
const BRAND = {
  name: "Northline Solutions",
  tagline: "Altijd bereikbaar. Altijd professioneel.",
  heroIntro:
    "Laat je telefoon voor je werken. Wij zorgen dat klanten direct geholpen worden — ook als jij druk bent.",
  shortExplainer:
    "Geen wachtrijen, geen gemiste afspraken. Klanten krijgen meteen een duidelijk antwoord en kunnen direct inplannen.",
  primary: "#0B0F19", // almost-black text
  accent: "#0EA5E9", // sky-500
  accent2: "#111827", // gray-900
  subtle: "#F5F7FB", // soft background
  ring: "#E5E7EB",
  webhook: "https://hook.eu1.make.com/oygdnn8sm5wcqvpbz0vjujhvofwt5ngl",
};

// Example logos (placeholder SVGs for an Apple-like trust strip)
const Logo = ({ label = "Logo" }) => (
  <svg width="100" height="28" viewBox="0 0 100 28" fill="none" aria-label={label} className="text-gray-300">
    <rect x="0" y="6" width="100" height="16" rx="8" className="fill-gray-200" />
  </svg>
);

// Soft container with max-width
const Container = ({ className = "", children }) => (
  <div className={cn("mx-auto w-full max-w-7xl px-5 md:px-8", className)}>{children}</div>
);

// Section wrapper
const Section = ({ id, className = "", children }: { id?: string; className?: string; children: React.ReactNode }) => (
  <section id={id} className={cn("py-16 md:py-24", className)}>
    {children}
  </section>
);

// Subtle gradient background blob
const BackgroundBlob = ({ className = "" }) => (
  <div
    aria-hidden
    className={cn(
      "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
      className
    )}
  >
    <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-sky-100 to-transparent opacity-70 blur-3xl" />
  </div>
);

// Simple navbar
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#services", label: "Diensten" },
    { href: "#how-it-works", label: "Zo werkt het" },
    { href: "#pricing", label: "Prijs" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all",
        scrolled ? "backdrop-blur bg-white/70 border-b border-gray-200" : "bg-transparent"
      )}
    >
      <Container className="flex items-center justify-between py-4">
        <a href="#" className="flex items-center gap-3">
          <span className="text-lg font-semibold tracking-tight text-gray-900">
            {BRAND.name}
          </span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-black md:inline-block"
          >
            Contact opnemen
          </a>
        </div>
      </Container>
    </div>
  );
};

// Hero with minimal Apple-like layout
const Hero = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-40, 40], [10, -10]);
  const rotateY = useTransform(x, [-40, 40], [-10, 10]);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx / 6);
    y.set(dy / 6);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Section id="home" className="relative pb-10 pt-28 md:pt-36">
      <BackgroundBlob />
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl font-semibold tracking-tight text-gray-900 md:text-6xl"
          >
            {BRAND.tagline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
            className="mx-auto mt-5 max-w-2xl text-lg text-gray-600 md:text-xl"
          >
            {BRAND.heroIntro}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.14 }}
            className="mx-auto mt-4 max-w-2xl text-base text-gray-500"
          >
            {BRAND.shortExplainer}
          </motion.p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#contact"
              className="rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-900/20"
            >
              Contact opnemen
            </a>
            <a
              href="#services"
              className="rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
            >
              Ontdek de diensten
            </a>
          </div>
        </div>

        {/* Tilted product card */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY }}
          className="mx-auto mt-12 w-full max-w-5xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8"
        >
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                24/7 digitale receptionist
              </div>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">
                Nooit meer een gemiste lead
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>• Afspraken plannen in jouw agenda</li>
                <li>• Klantvragen direct beantwoord</li>
                <li>• Slim doorverbinden of escaleren naar het team</li>
              </ul>
              <div className="mt-6 flex items-center gap-3">
                <a href="#pricing" className="text-sm font-semibold text-gray-900 hover:underline">
                  Bekijk prijs →
                </a>
                <a href="#how-it-works" className="text-sm text-gray-600 hover:underline">
                  Hoe het werkt
                </a>
              </div>
            </div>
            {/* Mock UI Panel */}
            <div className="relative">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-gray-100 via-white to-gray-100" />
              <div className="relative rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-500" />
                    <span className="text-xs font-medium text-gray-700">AI Reception</span>
                  </div>
                  <span className="text-[11px] text-gray-400">Live</span>
                </div>
                <div className="mt-4 space-y-3 text-[13px] text-gray-600">
                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                    Klant: "Kan ik morgen om 10:00 langskomen?"
                  </div>
                  <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
                    Northline AI: "Ik zie beschikbaarheid om 10:00. Zal ik die voor u vastleggen?"
                  </div>
                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                    Klant: "Top! En wat kost een standaardbehandeling?"
                  </div>
                  <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
                    Northline AI: "De standaardbehandeling kost €49. Ik heb u ingepland. U ontvangt zo een bevestiging."
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};

// Services grid
const Services = () => {
  const items = [
    {
      title: "24/7 Digitale Receptionist",
      body:
        "Neem elke oproep professioneel aan, dag en nacht. Basisvragen worden direct beantwoord en belangrijke oproepen worden doorgezet.",
      points: ["Openingstijden & prijzen", "Route & locatie", "Doorverbinden naar de juiste persoon"],
    },
    {
      title: "Afspraken Plannen",
      body:
        "Realtime beschikbaarheid, directe bevestigingen en automatische reminders. Minder no-shows, meer structuur in de dag.",
      points: ["Integratie met jouw agenda", "SMS/e-mail bevestiging", "Herinneringen"],
    },
    {
      title: "Klantvragen Afhandelen",
      body:
        "Korte, duidelijke antwoorden op veelgestelde vragen zodat klanten niet hoeven te wachten en jij kunt doorwerken.",
      points: ["Tarieven & menu’s", "Beleid & voorwaarden", "Basisadvies"],
    },
    {
      title: "Slim Doorverbinden",
      body:
        "Wanneer het echt moet, schakelt de AI door naar jou of je team. Met context, zodat je meteen weet waar het over gaat.",
      points: ["Escalaties met notities", "Tijdvensters instellen", "Voorkeursnummers"],
    },
  ];

  return (
    <Section id="services" className="bg-white">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
            Wat we voor je doen
          </h2>
          <p className="mt-3 text-gray-600">
            Eén aanspreekpunt voor je telefonie. Professioneel, rustig en altijd beschikbaar.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900/90 shadow-sm ring-1 ring-black/10">
            {item.title === "24/7 Digitale Receptionist" && <Headset className="h-5 w-5 text-white" />}
            {item.title === "Afspraken Plannen" && <CalendarDays className="h-5 w-5 text-white" />}
            {item.title === "Klantvragen Afhandelen" && <MessageCircleMore className="h-5 w-5 text-white" />}
            {item.title === "Slim Doorverbinden" && <PhoneForwarded className="h-5 w-5 text-white" />}
            </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{item.body}</p>
              <ul className="mt-4 space-y-1 text-sm text-gray-600">
                {item.points.map((p) => (
                  <li key={p}>• {p}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

// How it works timeline
const HowItWorks = () => {
  const steps = [
    {
      k: "01",
      t: "Inventarisatie",
      d: "We zetten samen een script en kennisbank op: tone-of-voice, prijzen, openingstijden en veelgestelde vragen.",
    },
    {
      k: "02",
      t: "Integratie",
      d: "We koppelen je agenda en telefonie. In 7 dagen staat alles live en getest.",
    },
    {
      k: "03",
      t: "Livegang",
      d: "Vanaf nu worden oproepen direct opgepakt. Belangrijke gesprekken worden doorgezet.",
    },
    {
      k: "04",
      t: "Optimalisatie",
      d: "Maandelijkse check-in met verbeteringen op basis van echte gesprekken en conversiedata.",
    },
  ];

  return (
    <Section id="how-it-works" className="bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.03),transparent_60%)]">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">Zo werkt het</h2>
          <p className="mt-3 text-gray-600">Snel, helder en zonder gedoe. Binnen 7 dagen live.</p>
        </div>
        <div className="relative mx-auto mt-12 max-w-4xl">
          <div className="absolute left-4 top-0 bottom-0 hidden w-px bg-gray-200 md:block" />
          <div className="space-y-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.k}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.06 }}
                className="relative grid grid-cols-1 gap-4 md:grid-cols-[56px_1fr]"
              >
                <div className="hidden md:block">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-200 bg-white text-sm font-semibold text-gray-800 shadow-sm">
                    {s.k}
                  </div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900">{s.t}</h3>
                  <p className="mt-2 text-sm text-gray-600">{s.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

// Benefits / Stats
const Benefits = () => {
  const stats = [
    { k: "-38%", d: "minder gemiste oproepen" },
    { k: "+22%", d: "meer boekingen in maand 1" },
    { k: "<60s", d: "gem. wachttijd naar 0" },
    { k: "24/7", d: "altijd bereikbaar" },
  ];
  return (
    <Section className="bg-white">
      <Container>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.d} className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center shadow-sm">
              <div className="text-2xl font-semibold text-gray-900 md:text-3xl">{s.k}</div>
              <div className="mt-1 text-sm text-gray-600">{s.d}</div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

// Pricing
const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "€399",
      sub: "/ maand",
      setup: "eenmalige onboarding op aanvraag",
      description: "Voor kleine bedrijven die professioneel bereikbaar willen zijn.",
      features: [
        "24/7 beantwoording",
        "Basis kennisbank",
        "Doorverbinden / escaleren",
        "E-mail samenvattingen",
      ],
      cta: "Contact opnemen",
      featured: false,
    },
    {
      name: "Growth",
      price: "€599",
      sub: "/ maand",
      setup: "eenmalige onboarding op aanvraag",
      description: "Voor teams die meer structuur, leadopvolging en slimme flows willen.",
      features: [
        "Alles van Starter",
        "Afspraken plannen",
        "Lead kwalificatie",
        "Rapportage & optimalisatie",
      ],
      cta: "Contact opnemen",
      featured: true,
    },
    {
      name: "Maatwerk",
      price: "Prijs",
      sub: " / op aanvraag",
      setup: "voor grotere of complexere processen",
      description: "Voor kantoren met meerdere lijnen, maatwerkflows of specifieke integraties.",
      features: [
        "Custom scripting",
        "Meerdere nummers / teams",
        "Geavanceerde integraties",
        "Volledig maatwerk",
      ],
      cta: "Neem contact op",
      featured: false,
    },
  ];

  return (
    <Section id="pricing" className="bg-[linear-gradient(180deg,white,rgba(0,0,0,0.02))]">
    <Container>
    <div className="mx-auto max-w-3xl text-center">
    <h2 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
    Transparante prijzen
    </h2>
    <p className="mt-3 text-gray-600">
    Kies een pakket dat past bij jouw bereikbaarheid en workflow.
    </p>
    </div>

    <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
    {plans.map((plan) => (
      <div
      key={plan.name}
      className={cn(
        "rounded-2xl border bg-white p-8 shadow-sm",
        plan.featured ? "border-gray-900" : "border-gray-200"
      )}
      >
      <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
      <p className="mt-2 text-sm text-gray-600">{plan.description}</p>

      <div className="mt-6 flex items-baseline gap-2">
      <div className="text-4xl font-semibold text-gray-900">{plan.price}</div>
      <div className="text-sm text-gray-500">{plan.sub}</div>
      </div>

      <div className="mt-2 text-sm text-gray-600">{plan.setup}</div>

      <ul className="mt-6 space-y-2 text-sm text-gray-700">
      {plan.features.map((feature) => (
        <li key={feature}>• {feature}</li>
      ))}
      </ul>

      <a
      href="#contact"
      className={cn(
        "mt-8 inline-flex rounded-full px-5 py-3 text-sm font-semibold shadow-sm",
        plan.featured
        ? "bg-gray-900 text-white hover:bg-black"
        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
      )}
      >
      {plan.cta}
      </a>
      </div>
    ))}
    </div>
    </Container>
    </Section>
  );
};

// FAQs expanded section
const FAQ = () => {
  const items = [
    {
      q: "Begrijpt de AI mijn bedrijfsregels?",
      a: "Jazeker. Tijdens de intake zetten we alles strak in de kennisbank: prijzen, uitzonderingen, beleid en tone-of-voice.",
    },
    {
      q: "Hoe gaan jullie om met privacy?",
      a: "We verwerken alleen noodzakelijke gegevens, slaan zo min mogelijk op en richten dataverwerking in conform AVG.",
    },
    {
      q: "Kunnen jullie speciale flows bouwen?",
      a: "Ja. Denk aan intakevragen, wachtlijsten, vooraf betalingen, of specifieke doorverbindregels per tijdstip.",
    },
    {
      q: "Welke talen?",
      a: "Standaard Nederlands en Engels. Andere talen op aanvraag mogelijk.",
    },
  ];
  const [open, setOpen] = useState(0);
  return (
    <Section id="faq" className="bg-white">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">Veelgestelde vragen</h2>
          <p className="mt-3 text-gray-600">Transparant en helder — zo werken we.</p>
        </div>
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white shadow-sm">
          {items.map((it, i) => (
            <div key={it.q} className="p-6">
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="flex w-full items-center justify-between text-left"
              >
                <span className="text-sm font-semibold text-gray-900">{it.q}</span>
                <span className="text-gray-400">{open === i ? "–" : "+"}</span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pt-3 text-sm text-gray-600"
                  >
                    {it.a}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

// About / Mission
const About = () => (
  <Section id="about" className="bg-white">
  <Container>
  <div className="mx-auto max-w-3xl">
  <h2 className="mt-0 text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
  Voice AI systems for modern businesses.
  </h2>

  <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-600">
  Aryen ontwikkelt voice AI-agents die bedrijven helpen om klantgesprekken automatisch te verwerken.
  Deze systemen kunnen telefoongesprekken aannemen, vragen beantwoorden en afspraken inplannen.
  </p>

  <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
  Door ervaring met verschillende software- en AI-projecten bouwt hij praktische oplossingen die
  bedrijven helpen om beter bereikbaar te zijn en efficiënter te werken.
  </p>

  <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
  <div className="flex items-start gap-4">
  <Image
  src="/aryen.png"
  alt="Aryen Masoudpay"
  width={200}
  height={200}
  className="h-40 w-40 shrink-0 rounded-2xl object-cover shadow-md ring-1 ring-gray-200"
  />
  <div className="min-w-0">
  <h3 className="text-lg font-semibold text-gray-900">
  Aryen Masoudpay
  </h3>

  <p className="text-sm text-gray-500">
  Founder
  </p>

  <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
  Zijn focus ligt op het bouwen van voice AI-systemen die communicatie automatiseren
  en bedrijven helpen om beter bereikbaar te zijn.
  </p>

  <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
  Door voice AI te combineren met automatisering en duidelijke workflows ontstaan
  systemen die niet alleen slim zijn, maar ook direct bruikbaar in de praktijk.
  </p>
  </div>
  </div>
  </div>
  </div>
  </Container>
  </Section>
);

// Integrations (placeholder icons)
const Integrations = () => {
  const items = ["Google Agenda", "Outlook", "Salonized", "Calendly", "Stripe", "Twilio"];
  return (
    <Section id="integrations" className="bg-white">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">Koppelingen</h2>
          <p className="mt-3 text-gray-600">Werkt samen met je favoriete tools. Meer op aanvraag.</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-6">
          {items.map((it) => (
            <div key={it} className="flex h-24 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm">
              <span className="text-sm font-medium text-gray-700">{it}</span>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

// Testimonials (placeholder quotes)
const Testimonials = () => {
  const items = [
    {
      name: "Marieke, salon eigenaar",
      quote:
        "Sinds Northline mis ik geen afspraken meer. Klanten zijn direct geholpen en ik heb mijn handen vrij.",
    },
    {
      name: "Jasper, tandartspraktijk",
      quote:
        "Super strak. Patiënten krijgen snel antwoord, en belangrijke gesprekken worden meteen doorgeschakeld.",
    },
    {
      name: "Lotte, praktijkmanager",
      quote:
        "Binnen een week live en sindsdien rust aan de telefoon. Duidelijke rapportages ook.",
    },
  ];
  return (
    <Section className="bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.03),transparent_60%)]">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">Wat klanten zeggen</h2>
          <p className="mt-3 text-gray-600">Echte resultaten, elke dag.</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((it) => (
            <div key={it.name} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-700">“{it.quote}”</p>
              <div className="mt-4 text-sm font-semibold text-gray-900">{it.name}</div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

// Call-to-action band
const CTA = () => (
  <Section className="py-12">
    <Container>
      <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-sm md:p-10">
        <div className="absolute -inset-0.5 -z-10 rounded-[26px] bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.15),transparent_60%)]" />
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-semibold text-gray-900">Klaar om geen leads meer te missen?</h3>
            <p className="mt-1 text-sm text-gray-600">Plan een korte demo — we laten zien hoe jouw bedrijf binnen 7 dagen live kan.</p>
          </div>
          <div className="flex items-center md:justify-end">
            <a
              href="#contact"
              className="inline-flex rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black"
            >
              Contact opnemen
            </a>
          </div>
        </div>
      </div>
    </Container>
  </Section>
);

// Contact form (webhook integration)
const Contact = () => {
  const [state, setState] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    preferred: "",
    notes: "",
    consent: false,
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setState((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!state.consent) {
      setError("Vink aan dat we je mogen contacten.");
      return;
    }
    if (!state.name || !state.phone) {
      setError("Naam en telefoon zijn verplicht.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(BRAND.webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "northline-website",
          ...state,
          timestamp: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error("Webhook error");
      setDone(true);
      setState({ name: "", company: "", email: "", phone: "", preferred: "", notes: "", consent: false });
    } catch (err) {
      setError("Er ging iets mis. Probeer later opnieuw of mail ons.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section id="contact" className="bg-white">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">Contact & demo</h2>
          <p className="mt-3 text-gray-600">Vul je gegevens in — we plannen direct een belmoment of demo.</p>
        </div>

        <div className="mx-auto mt-10 max-w-5xl grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-800">Naam *</label>
                  <input
                    name="name"
                    value={state.name}
                    onChange={onChange}
                    required
                    className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none ring-0 placeholder:text-gray-400 focus:border-gray-400"
                    placeholder="Voor- en achternaam"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-800">Bedrijf</label>
                  <input
                    name="company"
                    value={state.company}
                    onChange={onChange}
                    className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none focus:border-gray-400"
                    placeholder="Bedrijfsnaam"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-800">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    value={state.email}
                    onChange={onChange}
                    className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none focus:border-gray-400"
                    placeholder="jij@bedrijf.nl"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-800">Telefoon *</label>
                  <input
                    name="phone"
                    value={state.phone}
                    onChange={onChange}
                    required
                    className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none focus:border-gray-400"
                    placeholder="06..."
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-800">Voorkeursmoment</label>
                <input
                  name="preferred"
                  value={state.preferred}
                  onChange={onChange}
                  className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none focus:border-gray-400"
                  placeholder="Bijv. maandag 10:00"
                />
              </div>
              <div>
                <label className="text-sm fo nt-medium text-gray-800">Notities</label>
                <textarea
                  name="notes"
                  value={state.notes}
                  onChange={onChange}
                  rows={4}
                  className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none focus:border-gray-400"
                  placeholder="Vertel kort over je bedrijf en wensen"
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  id="consent"
                  type="checkbox"
                  name="consent"
                  checked={state.consent}
                  onChange={onChange}
                  className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-800"
                />
                <label htmlFor="consent" className="text-sm text-gray-700">
                  Ik ga akkoord dat Northline Solutions contact met mij opneemt.
                </label>
              </div>
              {error && <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-white shadow-sm",
                    loading ? "bg-gray-400" : "bg-gray-900 hover:bg-black"
                  )}
                >
                  {loading ? "Versturen…" : "Verstuur"}
                </button>
                {done && <span className="text-sm text-green-700">Bedankt! We nemen snel contact op.</span>}
              </div>
            </form>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Wat gebeurt er hierna?</h3>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-gray-700">
              <li>We bellen of mailen binnen 1 werkdag terug.</li>
              <li>Korte intake (15 min) om je wensen door te nemen.</li>
              <li>We koppelen je agenda en telefonie — binnen 7 dagen live.</li>
            </ol>
            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
              <div className="font-semibold text-gray-800">Privacy & data</div>
              We verwerken alleen wat nodig is om contact op te nemen. Zie onze privacyverklaring voor details.
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

// Footer
const Footer = () => (
  <footer className="border-t border-gray-200 bg-white py-12">
    <Container>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold tracking-tight text-gray-900">{BRAND.name}</span>
          </div>
          <p className="mt-3 max-w-md text-sm text-gray-600">{BRAND.tagline}</p>
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900">Navigatie</div>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li><a href="#services" className="hover:underline">Diensten</a></li>
            <li><a href="#how-it-works" className="hover:underline">Zo werkt het</a></li>
            <li><a href="#pricing" className="hover:underline">Prijs</a></li>
            <li><a href="#faq" className="hover:underline">FAQ</a></li>
            <li><a href="#contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900">Contact</div>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li>info@northlinesolutions.nl</li>
            <li>KVK — n.t.b.</li>
            <li>© {new Date().getFullYear()} {BRAND.name}</li>
          </ul>
        </div>
      </div>
    </Container>
  </footer>
);

// Page wrapper
const Page = () => {
  return (
    <div className="min-h-screen bg-white antialiased [--tw-ring-color:rgba(0,0,0,0.06)]">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <Benefits />
        <Pricing />
        <FAQ />
        <About />
        <Integrations />
        <Testimonials />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Page;
