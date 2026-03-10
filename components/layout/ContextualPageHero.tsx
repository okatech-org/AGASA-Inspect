"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

type HeroConfig = {
  pattern: RegExp;
  title: string;
  subtitle: string;
  image: string;
};

const HERO_MAP: HeroConfig[] = [
  {
    pattern: /^\/dashboard|^\/inspections/,
    title: "Inspections terrain au Gabon",
    subtitle: "Suivi opérationnel, preuves visuelles et conformité en temps réel.",
    image: "/images/gabon/public-health-advice.jpg",
  },
  {
    pattern: /^\/pv|^\/sync/,
    title: "Traçabilité réglementaire",
    subtitle: "PV numériques, audit et synchronisation sécurisée.",
    image: "/images/gabon/gabon-compliance-council.jpg",
  },
  {
    pattern: /^\/carte/,
    title: "Couverture nationale des inspections",
    subtitle: "Visualisez les interventions sur l'ensemble du territoire gabonais.",
    image: "/images/gabon/libreville-city.jpg",
  },
  {
    pattern: /^\/superviseur/,
    title: "Pilotage d'équipe",
    subtitle: "Coordination des inspecteurs et planification multi-provinces.",
    image: "/images/gabon/team-review.jpg",
  },
  {
    pattern: /^\/admin/,
    title: "Administration AGASA-Inspect",
    subtitle: "Configuration, contrôle et gouvernance de la plateforme.",
    image: "/images/gabon/gabon-public-service.jpg",
  },
  {
    pattern: /^\/demo/,
    title: "Mode démonstration",
    subtitle: "Expérience guidée des profils inspecteur, superviseur et administrateur.",
    image: "/images/gabon/mobile-citizen-service.jpg",
  },
  {
    pattern: /^\/a-propos/,
    title: "Mission AGASA et cadre légal",
    subtitle: "Régulation sanitaire et phytosanitaire au service des citoyens.",
    image: "/images/gabon/gabon-public-service.jpg",
  },
  {
    pattern: /^\/fonctionnalites/,
    title: "Fonctionnalités métier terrain",
    subtitle: "Checklists, géolocalisation, preuves photo et barèmes automatisés.",
    image: "/images/gabon/qr-verification.jpg",
  },
  {
    pattern: /^\/contact/,
    title: "Contact opérationnel AGASA",
    subtitle: "Échangez avec les équipes inspection et support national.",
    image: "/images/gabon/gabon-operators-meeting.jpg",
  },
  {
    pattern: /^\/login/,
    title: "Connexion sécurisée",
    subtitle: "Accès réservé aux agents autorisés AGASA-Inspect.",
    image: "/images/gabon/digital-office.jpg",
  },
];

function pickHero(pathname: string) {
  return HERO_MAP.find((item) => item.pattern.test(pathname));
}

type ContextualPageHeroProps = {
  compact?: boolean;
};

export function ContextualPageHero({ compact = false }: ContextualPageHeroProps) {
  const pathname = usePathname();

  if (!pathname || pathname === "/") {
    return null;
  }

  const hero = pickHero(pathname);

  if (!hero) {
    return null;
  }

  return (
    <section className={`max-w-7xl mx-auto px-4 ${compact ? "pt-0" : "pt-24 md:pt-28"} mb-6 md:mb-8`}>
      <div className="relative overflow-hidden rounded-2xl min-h-[220px] md:min-h-[280px] border border-[var(--border)] shadow-[var(--shadow-md)]">
        <Image
          src={hero.image}
          alt={hero.title}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-900/60 to-amber-950/45" />
        <div className="relative z-10 p-6 md:p-10 max-w-2xl">
          <span className="overline text-[var(--amber)]">AGASA-Inspect</span>
          <h1 className="mt-2 text-white">{hero.title}</h1>
          <p className="mt-3 text-base md:text-lg text-white/85 font-sans leading-[1.7]">
            {hero.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
