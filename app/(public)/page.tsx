"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Shield, Search, Gamepad2, FileText,
    Smartphone, Lock, RefreshCw, BarChart3, ChevronRight,
    ClipboardCheck, MapPin, Camera, WifiOff
} from 'lucide-react';

/* ── Scroll Reveal Hook ── */
function useScrollReveal() {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('animate-fade-in-up');
                    el.classList.remove('opacity-0', 'translate-y-8');
                    observer.unobserve(el);
                }
            },
            { threshold: 0.15 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);
    return ref;
}

function RevealSection({ children, className = '', delay = '' }: { children: React.ReactNode; className?: string; delay?: string }) {
    const ref = useScrollReveal();
    return (
        <div ref={ref} className={`opacity-0 translate-y-8 ${delay} ${className}`}>
            {children}
        </div>
    );
}

/* ══════════════════════════════════
   SECTION: Hero
   ══════════════════════════════════ */
function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background gradient — Inspect variant (amber tint) */}
            <div className="absolute inset-0 gradient-hero-inspect" />
            <Image
                src="/images/gabon/libreville-city.jpg"
                alt="Libreville au coucher du soleil"
                fill
                priority
                sizes="100vw"
                className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-slate-950/55" />
            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '60px 60px'
            }} />

            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-32">
                {/* Animated badge */}
                <div className="flex justify-center mb-8">
                    <div className="badge bg-white/10 text-white/90 backdrop-blur-sm border border-white/10 gap-2 px-4 py-2">
                        <span className="pulse-dot" style={{ background: 'var(--amber)' }} />
                        <span className="text-sm font-sans font-medium">Inspection numérique · Gabon 2026</span>
                    </div>
                </div>

                {/* Shield icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-[var(--amber)]/10 flex items-center justify-center">
                        <Shield className="w-12 h-12 text-[var(--amber)]" strokeWidth={1.5} />
                    </div>
                </div>

                {/* H1 — Cormorant Garamond */}
                <h1 className="font-serif font-bold text-white mb-4">
                    AGASA-<span className="text-gradient-inspect">Inspect</span>
                </h1>

                {/* Subtitle */}
                <p className="text-lead text-white/70 max-w-[600px] mx-auto mb-4 font-sans">
                    L&apos;inspection sanitaire numérique du Gabon
                </p>
                <p className="text-base text-white/50 max-w-[600px] mx-auto mb-10 font-sans leading-relaxed">
                    50 inspecteurs, 9 provinces, 13 700 établissements.<br />
                    Zéro PV papier. Zéro négociation. Transparence totale.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="#fonctionnement"
                        className="btn-primary btn-primary-inspect"
                    >
                        <Search className="w-5 h-5" strokeWidth={1.8} />
                        Découvrir la plateforme
                    </a>
                    <Link
                        href="/demo"
                        className="btn-outline btn-outline-dark btn-primary-inspect"
                    >
                        <Gamepad2 className="w-5 h-5" strokeWidth={1.8} />
                        Tester la Démo
                    </Link>
                </div>
            </div>

            {/* Stats bar at bottom */}
            <div className="absolute bottom-0 left-0 right-0 z-20">
                <div className="max-w-5xl mx-auto px-4 pb-8">
                    <div className="glass rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6 border border-white/10" style={{ background: 'rgba(255,255,255,0.08)' }}>
                        {[
                            { number: '13 700', label: 'Établissements surveillés' },
                            { number: '50', label: 'Inspecteurs équipés' },
                            { number: '0', label: 'PV papier (100% numérique)' },
                            { number: '9', label: 'Provinces couvertes' },
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <p className="text-2xl md:text-3xl font-bold text-white font-sans">{stat.number}</p>
                                <p className="text-xs text-white/50 font-sans mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ══════════════════════════════════
   SECTION: Before / After
   ══════════════════════════════════ */
function BeforeAfter() {
    const before = [
        'PV manuscrits — contestables et perdables',
        'Aucune géolocalisation — pas de preuve de visite',
        'Photos sur téléphone personnel — pas de chaîne de preuve',
        'Amendes négociables — taux recouvrement 15-20%',
        'Planification empirique — sous-couverture territoriale',
    ];
    const after = [
        'PV électronique — horodaté, géolocalisé, signé, non modifiable',
        'GPS automatique — preuve juridique irréfutable',
        'Photos avec métadonnées — hash cryptographique anti-falsification',
        'Barème automatique — zéro négociation, objectif 70% recouvrement',
        'Algorithme de priorisation — couverture optimisée 9 provinces',
    ];

    return (
        <section className="py-20 md:py-24 bg-[var(--bg)]">
            <div className="max-w-7xl mx-auto px-4">
                <RevealSection>
                    <div className="text-center mb-12">
                        <span className="overline text-[var(--amber)]">Transformation</span>
                        <h2 className="font-serif font-bold text-[var(--text)] mt-2">
                            Avant / <span className="text-gradient-inspect">Après</span>
                        </h2>
                    </div>
                </RevealSection>
                <div className="grid md:grid-cols-2 gap-8">
                    <RevealSection delay="stagger-1">
                        <div className="neu-card overflow-hidden p-0 border-l-4 border-l-[var(--rose)]">
                            <div className="relative w-full aspect-[16/9]">
                                <Image
                                    src="/images/gabon/gabon-operators-meeting.jpg"
                                    alt="Processus manuel avant AGASA-Inspect"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-8">
                            <h3 className="text-xl font-bold text-[var(--rose)] mb-6 font-sans flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-[rgba(244,63,94,0.14)] flex items-center justify-center text-sm">✕</span>
                                AVANT
                            </h3>
                            <ul className="space-y-4">
                                {before.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-[var(--text-muted)] font-sans text-[15px]">
                                        <span className="text-[var(--rose)] mt-1 font-bold flex-shrink-0">✕</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            </div>
                        </div>
                    </RevealSection>
                    <RevealSection delay="stagger-2">
                        <div className="neu-card overflow-hidden p-0 border-l-4 border-l-[var(--emerald)]">
                            <div className="relative w-full aspect-[16/9]">
                                <Image
                                    src="/images/gabon/qr-verification.jpg"
                                    alt="Inspection numérique AGASA-Inspect"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-8">
                            <h3 className="text-xl font-bold text-[var(--emerald)] mb-6 font-sans flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-[rgba(16,185,129,0.14)] flex items-center justify-center text-sm">✓</span>
                                APRÈS — AGASA-Inspect
                            </h3>
                            <ul className="space-y-4">
                                {after.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-[var(--text-muted)] font-sans text-[15px]">
                                        <span className="text-[var(--emerald)] mt-1 font-bold flex-shrink-0">✓</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            </div>
                        </div>
                    </RevealSection>
                </div>
            </div>
        </section>
    );
}

/* ══════════════════════════════════
   SECTION: How It Works
   ══════════════════════════════════ */
function HowItWorks() {
    const steps = [
        {
            icon: <BarChart3 className="w-7 h-7" strokeWidth={1.8} />,
            title: 'Planification',
            desc: "L'algorithme identifie les établissements prioritaires selon leur profil de risque",
            image: "/images/gabon/libreville-city.jpg",
        },
        {
            icon: <ClipboardCheck className="w-7 h-7" strokeWidth={1.8} />,
            title: 'Inspection terrain',
            desc: "L'inspecteur réalise la checklist normalisée directement sur tablette, même sans internet",
            image: "/images/gabon/public-health-advice.jpg",
        },
        {
            icon: <Lock className="w-7 h-7" strokeWidth={1.8} />,
            title: 'PV automatique',
            desc: "En cas d'infraction, le PV est généré avec le barème légal — montant non modifiable",
            image: "/images/gabon/gabon-compliance-council.jpg",
        },
        {
            icon: <RefreshCw className="w-7 h-7" strokeWidth={1.8} />,
            title: 'Synchronisation',
            desc: "Les données remontent vers AGASA-Core et mettent à jour le score Smiley de l'établissement",
            image: "/images/gabon/digital-office.jpg",
        },
    ];

    return (
        <section id="fonctionnement" className="py-20 md:py-24 bg-[var(--bg-muted)]">
            <div className="max-w-7xl mx-auto px-4">
                <RevealSection>
                    <div className="text-center mb-14">
                        <span className="overline text-[var(--amber)]">Processus</span>
                        <h2 className="font-serif font-bold text-[var(--text)] mt-2">
                            Comment ça <span className="text-gradient-inspect">fonctionne</span> ?
                        </h2>
                        <p className="text-lead text-[var(--text-muted)] mt-4 font-sans">4 étapes, de la planification à la synchronisation</p>
                    </div>
                </RevealSection>
                <div className="grid md:grid-cols-4 gap-8">
                    {steps.map((step, i) => (
                        <RevealSection key={i} delay={`stagger-${i + 1}`}>
                            <div className="neu-card overflow-hidden relative text-center p-0">
                                <div className="relative aspect-[16/9] w-full">
                                    <Image
                                        src={step.image}
                                        alt={`Illustration ${step.title}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 25vw"
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-5">
                                <div className="icon-container mx-auto mb-4" style={{ background: 'rgba(245, 158, 11, 0.12)' }}>
                                    <span className="text-[var(--amber)]">{step.icon}</span>
                                </div>
                                <span className="overline text-[var(--amber)] opacity-60">Étape {i + 1}</span>
                                <h4 className="font-serif font-bold text-[var(--text)] mt-1 mb-3">{step.title}</h4>
                                <p className="text-[var(--text-muted)] text-sm leading-relaxed font-sans">{step.desc}</p>
                                </div>
                            </div>
                        </RevealSection>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ══════════════════════════════════
   SECTION: Features Grid
   ══════════════════════════════════ */
function FeaturesGrid() {
    const features = [
        { icon: <ClipboardCheck className="w-5 h-5" strokeWidth={1.8} />, label: 'Checklists normalisées', color: 'var(--emerald)', image: '/images/gabon/team-review.jpg' },
        { icon: <MapPin className="w-5 h-5" strokeWidth={1.8} />, label: 'Géolocalisation GPS', color: 'var(--blue)', image: '/images/gabon/libreville-city.jpg' },
        { icon: <Camera className="w-5 h-5" strokeWidth={1.8} />, label: 'Photos certifiées', color: 'var(--violet)', image: '/images/gabon/public-health-advice.jpg' },
        { icon: <FileText className="w-5 h-5" strokeWidth={1.8} />, label: 'PV électroniques', color: 'var(--rose)', image: '/images/gabon/gabon-compliance-council.jpg' },
        { icon: <WifiOff className="w-5 h-5" strokeWidth={1.8} />, label: 'Mode hors-ligne', color: 'var(--amber)', image: '/images/gabon/gabon-public-service.jpg' },
        { icon: <Smartphone className="w-5 h-5" strokeWidth={1.8} />, label: 'PWA tablette', color: 'var(--cyan)', image: '/images/gabon/mobile-citizen-service.jpg' },
        { icon: <Lock className="w-5 h-5" strokeWidth={1.8} />, label: 'Anti-falsification', color: 'var(--gold)', image: '/images/gabon/certificate-verification.jpg' },
        { icon: <BarChart3 className="w-5 h-5" strokeWidth={1.8} />, label: 'Priorisation IA', color: 'var(--teal)', image: '/images/gabon/digital-office.jpg' },
    ].map((f, idx) => ({ ...f, idx }));

    return (
        <section className="py-20 md:py-24 bg-[var(--bg)]">
            <div className="max-w-7xl mx-auto px-4">
                <RevealSection>
                    <div className="text-center mb-14">
                        <span className="overline text-[var(--amber)]">Fonctionnalités</span>
                        <h2 className="font-serif font-bold text-[var(--text)] mt-2">
                            Tout ce qu&apos;il faut <span className="text-gradient-inspect">sur le terrain</span>
                        </h2>
                    </div>
                </RevealSection>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {features.map((feat) => (
                        <RevealSection key={feat.idx} delay={`stagger-${(feat.idx % 4) + 1}`}>
                            <div className="neu-card overflow-hidden p-0 cursor-default group">
                                <div className="relative w-full aspect-[16/9]">
                                    <Image
                                        src={feat.image}
                                        alt={`Illustration ${feat.label}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 25vw"
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-5 flex items-center gap-4">
                                    <div
                                        className="icon-container flex-shrink-0"
                                        style={{ background: `color-mix(in srgb, ${feat.color} 12%, transparent)`, width: '42px', height: '42px', borderRadius: '12px' }}
                                    >
                                        <span style={{ color: feat.color }}>{feat.icon}</span>
                                    </div>
                                    <span className="font-sans font-semibold text-[15px] text-[var(--text)]">{feat.label}</span>
                                    <ChevronRight className="w-4 h-4 text-[var(--text-muted)] ml-auto group-hover:translate-x-1 transition-transform duration-200" strokeWidth={1.8} />
                                </div>
                            </div>
                        </RevealSection>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ══════════════════════════════════
   SECTION: Anti-Corruption
   ══════════════════════════════════ */
function AntiCorruption() {
    const locks = [
        { text: "Barème automatique — L'inspecteur ne fixe jamais le montant de l'amende", image: "/images/gabon/gabon-compliance-council.jpg" },
        { text: 'PV irréversible — Aucun PV ne peut être annulé après validation', image: "/images/gabon/certificate-verification.jpg" },
        { text: 'Relance automatique — Le système relance le paiement sans intervention humaine', image: "/images/gabon/digital-office.jpg" },
        { text: 'Géolocalisation certifiée — Chaque visite est prouvée par GPS et horodatage', image: "/images/gabon/libreville-city.jpg" },
        { text: 'Audit total — Chaque action de chaque inspecteur est tracée et vérifiable', image: "/images/gabon/team-review.jpg" },
    ];

    return (
        <section className="py-20 md:py-24 gradient-hero-inspect">
            <div className="max-w-7xl mx-auto px-4">
                <RevealSection>
                    <div className="text-center mb-14">
                        <span className="overline text-[var(--amber)]">Intégrité</span>
                        <h2 className="font-serif font-bold text-white mt-2">
                            5 verrous <span className="text-gradient-inspect">anti-corruption</span>
                        </h2>
                        <p className="text-lead text-white/50 mt-4 font-sans max-w-xl mx-auto">
                            Transparence et intégrité à chaque étape du processus
                        </p>
                    </div>
                </RevealSection>
                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {locks.map((lock, i) => (
                        <RevealSection key={i} delay={`stagger-${(i % 4) + 1}`}>
                            <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-0 overflow-hidden rounded-card text-center hover:border-[var(--amber)]/50 transition-all duration-300 hover:-translate-y-1">
                                <div className="relative w-full aspect-[16/9]">
                                    <Image
                                        src={lock.image}
                                        alt="Illustration de transparence et contrôle"
                                        fill
                                        sizes="(max-width: 1024px) 50vw, 20vw"
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                <div className="icon-container mx-auto mb-4" style={{ background: 'rgba(245,158,11,0.15)' }}>
                                    <Lock className="w-6 h-6 text-[var(--amber)]" strokeWidth={1.8} />
                                </div>
                                <p className="text-white/80 text-sm font-sans font-medium leading-relaxed">{lock.text}</p>
                                </div>
                            </div>
                        </RevealSection>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ══════════════════════════════════
   SECTION: International Model
   ══════════════════════════════════ */
function InternationalModel() {
    const models = [
        { flag: '🇨🇦', name: 'ACIA Canada', desc: 'Tablettes terrain et inspections numériques', image: '/images/gabon/mobile-citizen-service.jpg' },
        { flag: '🇬🇧', name: 'FSA Royaume-Uni', desc: 'Système Smiley FHRS pour la transparence', image: '/images/gabon/qr-verification.jpg' },
        { flag: '🇪🇺', name: 'EFSA Europe', desc: 'Normes HACCP et contrôle harmonisé', image: '/images/gabon/public-health-advice.jpg' },
    ];

    return (
        <section className="py-20 md:py-24 bg-[var(--bg-muted)]">
            <div className="max-w-5xl mx-auto px-4">
                <RevealSection>
                    <div className="text-center mb-14">
                        <span className="overline text-[var(--amber)]">Références</span>
                        <h2 className="font-serif font-bold text-[var(--text)] mt-2">
                            Inspiré des <span className="text-gradient-inspect">meilleures pratiques</span> mondiales
                        </h2>
                        <p className="text-lead text-[var(--text-muted)] mt-4 font-sans">
                            Un standard international adapté au contexte gabonais
                        </p>
                    </div>
                </RevealSection>
                <div className="grid md:grid-cols-3 gap-8">
                    {models.map((model, i) => (
                        <RevealSection key={i} delay={`stagger-${i + 1}`}>
                            <div className="neu-card overflow-hidden p-0 text-center">
                                <div className="relative w-full aspect-[16/9]">
                                    <Image
                                        src={model.image}
                                        alt={`Illustration ${model.name}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-8">
                                    <span className="text-5xl mb-4 block">{model.flag}</span>
                                    <h4 className="font-serif font-bold text-[var(--text)] mb-2">{model.name}</h4>
                                    <p className="text-[var(--text-muted)] text-sm font-sans">{model.desc}</p>
                                </div>
                            </div>
                        </RevealSection>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ══════════════════════════════════
   SECTION: Final CTA
   ══════════════════════════════════ */
function FinalCTA() {
    return (
        <section className="py-20 md:py-24 gradient-hero-inspect relative overflow-hidden">
            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '60px 60px'
            }} />
            <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
                <h2 className="font-serif font-bold text-white mb-4">
                    Vous êtes décideur, partenaire ou <span className="text-gradient-inspect">inspecteur</span> ?
                </h2>
                <p className="text-white/60 text-lg mb-10 font-sans">
                    Découvrez l&apos;application en action — aucune inscription requise
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/demo"
                        className="btn-primary btn-primary-inspect"
                    >
                        Voir la Démo →
                    </Link>
                    <Link
                        href="/contact"
                        className="btn-outline btn-outline-dark btn-primary-inspect"
                    >
                        Nous contacter →
                    </Link>
                </div>
            </div>
        </section>
    );
}

/* ══════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════ */
export default function HomePage() {
    return (
        <>
            <HeroSection />
            <BeforeAfter />
            <HowItWorks />
            <FeaturesGrid />
            <AntiCorruption />
            <InternationalModel />
            <FinalCTA />
        </>
    );
}
