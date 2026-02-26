"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Shield, Search, Gamepad2, Building2, Users, FileText, Smartphone, Lock, RefreshCw, BarChart3 } from 'lucide-react';

function useScrollReveal() {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('animate-fadeInUp');
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

function RevealSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    const ref = useScrollReveal();
    return (
        <div ref={ref} className={`opacity-0 translate-y-8 transition-all duration-700 ease-out ${className}`}>
            {children}
        </div>
    );
}

// ── SECTION: Hero ──
function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#1B5E20]" />
            <div className="absolute inset-0 bg-[url('/images/terrain-overlay.jpg')] bg-cover bg-center opacity-10" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-32">
                <div className="flex justify-center mb-6">
                    <Shield className="w-20 h-20 text-white/90" />
                </div>
                <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
                    AGASA-Inspect
                </h1>
                <p className="text-2xl md:text-3xl text-white/90 font-semibold mb-6">
                    L&apos;inspection sanitaire numérique du Gabon
                </p>
                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
                    50 inspecteurs, 9 provinces, 13 700 établissements. Zéro PV papier. Zéro négociation. Transparence totale.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="#fonctionnement"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-inspect-green font-bold rounded-2xl text-lg hover:bg-gray-100 transition-colors shadow-lg"
                    >
                        <Search className="w-5 h-5" /> Découvrir la plateforme
                    </a>
                    <Link
                        href="/demo"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-inspect-orange text-white font-bold rounded-2xl text-lg hover:bg-orange-700 transition-colors shadow-lg"
                    >
                        <Gamepad2 className="w-5 h-5" /> Tester la Démo
                    </Link>
                </div>
            </div>
        </section>
    );
}

// ── SECTION: Key Figures ──
function KeyFigures() {
    const figures = [
        { icon: <Building2 className="w-10 h-10" />, number: '13 700', label: 'Établissements surveillés dans 9 provinces' },
        { icon: <Users className="w-10 h-10" />, number: '50', label: 'Inspecteurs équipés de tablettes durcies' },
        { icon: <FileText className="w-10 h-10" />, number: '0 PV papier', label: '100% numérique, 100% traçable' },
        { icon: <Smartphone className="w-10 h-10" />, number: 'Hors-ligne', label: 'Inspections possibles même sans internet' },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {figures.map((fig, i) => (
                        <RevealSection key={i}>
                            <div className="bg-gray-50 border-2 border-gray-100 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
                                <div className="text-inspect-green mb-4 flex justify-center">{fig.icon}</div>
                                <p className="text-3xl font-extrabold text-gray-900 mb-2">{fig.number}</p>
                                <p className="text-gray-600 font-medium">{fig.label}</p>
                            </div>
                        </RevealSection>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ── SECTION: Before / After ──
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
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <RevealSection>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-12">
                        Avant / Après
                    </h2>
                </RevealSection>
                <div className="grid md:grid-cols-2 gap-8">
                    <RevealSection>
                        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8">
                            <h3 className="text-xl font-bold text-red-800 mb-6">❌ AVANT</h3>
                            <ul className="space-y-4">
                                {before.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-red-700">
                                        <span className="text-red-500 mt-1 font-bold">✕</span>
                                        <span className="font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </RevealSection>
                    <RevealSection>
                        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8">
                            <h3 className="text-xl font-bold text-green-800 mb-6">✅ APRÈS — AGASA-Inspect</h3>
                            <ul className="space-y-4">
                                {after.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-green-700">
                                        <span className="text-green-500 mt-1 font-bold">✓</span>
                                        <span className="font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </RevealSection>
                </div>
            </div>
        </section>
    );
}

// ── SECTION: How It Works ──
function HowItWorks() {
    const steps = [
        { icon: <BarChart3 className="w-8 h-8" />, emoji: '📅', title: 'Planification', desc: "L'algorithme identifie les établissements prioritaires selon leur profil de risque" },
        { icon: <FileText className="w-8 h-8" />, emoji: '📋', title: 'Inspection terrain', desc: "L'inspecteur réalise la checklist normalisée directement sur tablette, même sans internet" },
        { icon: <Lock className="w-8 h-8" />, emoji: '📄', title: 'PV automatique', desc: "En cas d'infraction, le PV est généré avec le barème légal — montant non modifiable" },
        { icon: <RefreshCw className="w-8 h-8" />, emoji: '🔄', title: 'Synchronisation', desc: "Les données remontent vers AGASA-Core et mettent à jour le score Smiley de l'établissement" },
    ];

    return (
        <section id="fonctionnement" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <RevealSection>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-4">
                        Comment ça fonctionne ?
                    </h2>
                    <p className="text-center text-gray-500 text-lg mb-14 max-w-2xl mx-auto">4 étapes, de la planification à la synchronisation</p>
                </RevealSection>
                <div className="grid md:grid-cols-4 gap-8">
                    {steps.map((step, i) => (
                        <RevealSection key={i}>
                            <div className="relative text-center">
                                <div className="w-16 h-16 mx-auto bg-inspect-green/10 rounded-2xl flex items-center justify-center text-inspect-green mb-4">
                                    {step.icon}
                                </div>
                                <span className="text-sm font-bold text-inspect-green/60 uppercase tracking-wider">Étape {i + 1}</span>
                                <h3 className="text-xl font-bold text-gray-900 mt-1 mb-3">{step.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                            </div>
                        </RevealSection>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ── SECTION: Anti-Corruption ──
function AntiCorruption() {
    const locks = [
        { text: "Barème automatique — L'inspecteur ne fixe jamais le montant de l'amende" },
        { text: 'PV irréversible — Aucun PV ne peut être annulé après validation' },
        { text: 'Relance automatique — Le système relance le paiement sans intervention humaine' },
        { text: 'Géolocalisation certifiée — Chaque visite est prouvée par GPS et horodatage' },
        { text: 'Audit total — Chaque action de chaque inspecteur est tracée et vérifiable' },
    ];

    return (
        <section className="py-20 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4">
                <RevealSection>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-center text-yellow-400 mb-4">
                        5 verrous anti-corruption intégrés
                    </h2>
                    <p className="text-center text-gray-400 text-lg mb-14 max-w-xl mx-auto">
                        Transparence et intégrité à chaque étape du processus
                    </p>
                </RevealSection>
                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {locks.map((lock, i) => (
                        <RevealSection key={i}>
                            <div className="bg-gray-800 border border-gray-700 p-6 rounded-2xl text-center hover:border-yellow-500/50 transition-colors">
                                <Lock className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
                                <p className="text-white/90 text-sm font-medium leading-relaxed">{lock.text}</p>
                            </div>
                        </RevealSection>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ── SECTION: International Model ──
function InternationalModel() {
    const models = [
        { flag: '🇨🇦', name: 'ACIA Canada', desc: 'Tablettes terrain et inspections numériques' },
        { flag: '🇬🇧', name: 'FSA Royaume-Uni', desc: 'Système Smiley FHRS pour la transparence' },
        { flag: '🇪🇺', name: 'EFSA Europe', desc: 'Normes HACCP et contrôle harmonisé' },
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-5xl mx-auto px-4">
                <RevealSection>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-4">
                        Inspiré des meilleures pratiques mondiales
                    </h2>
                    <p className="text-center text-gray-500 text-lg mb-14">Un standard international adapté au contexte gabonais</p>
                </RevealSection>
                <div className="grid md:grid-cols-3 gap-8">
                    {models.map((model, i) => (
                        <RevealSection key={i}>
                            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
                                <span className="text-5xl mb-4 block">{model.flag}</span>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{model.name}</h3>
                                <p className="text-gray-600">{model.desc}</p>
                            </div>
                        </RevealSection>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ── SECTION: Final CTA ──
function FinalCTA() {
    return (
        <section className="py-20 bg-inspect-green">
            <div className="max-w-3xl mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                    Vous êtes décideur, partenaire ou inspecteur ?
                </h2>
                <p className="text-white/80 text-lg mb-10">Découvrez l&apos;application en action — aucune inscription requise</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/demo"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-inspect-green font-bold rounded-2xl text-lg hover:bg-gray-100 transition-colors shadow-lg"
                    >
                        Voir la Démo →
                    </Link>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-bold rounded-2xl text-lg hover:bg-white/10 transition-colors"
                    >
                        Nous contacter →
                    </Link>
                </div>
            </div>
        </section>
    );
}

// ── MAIN PAGE ──
export default function HomePage() {
    return (
        <>
            <HeroSection />
            <KeyFigures />
            <BeforeAfter />
            <HowItWorks />
            <AntiCorruption />
            <InternationalModel />
            <FinalCTA />
        </>
    );
}
