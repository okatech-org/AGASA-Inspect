"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AlertTriangle, ChevronDown, ChevronUp, Users, ClipboardCheck, FileText, Camera, RefreshCw, BarChart3, Calendar, CheckCircle } from 'lucide-react';
import { BigButton } from '@/components/ui/BigButton';
import { useDemoMode } from '@/lib/demo';

const DEMO_PROFILES = [
    {
        id: 'inspecteur' as const,
        emoji: '👨‍💼',
        title: 'Inspecteur Terrain',
        name: 'Jean-Pierre MOUSSAVOU',
        matricule: 'INSP-2026-D001',
        province: 'Estuaire (Libreville)',
        description: "Accédez à l'espace de travail quotidien d'un inspecteur : planning du jour, inspections en cours, checklists terrain, PV électroniques, capture photo, et synchronisation.",
        buttonLabel: "Accéder à l'espace Inspecteur →",
        variant: 'primary' as const,
        accentColor: 'var(--emerald)',
        tags: ['📋 Checklists', '📄 PV', '📷 Photos', '🗺️ Carte', '🔄 Sync'],
        redirect: '/dashboard',
        image: '/images/gabon/public-health-advice.jpg',
    },
    {
        id: 'superviseur' as const,
        emoji: '👨‍💻',
        title: 'Superviseur DICSP',
        name: 'Marie-Claire NZÉ',
        matricule: 'INSP-2026-D002',
        province: 'Estuaire (Libreville)',
        description: "Supervisez l'équipe d'inspecteurs : planning collectif, validation des rapports, statistiques de productivité, et rapports d'activité de votre province.",
        buttonLabel: "Accéder à l'espace Superviseur →",
        variant: 'secondary' as const,
        accentColor: 'var(--blue)',
        tags: ['👥 Équipe', '📊 Rapports', '📅 Planning', '✅ Validations'],
        redirect: '/superviseur',
        image: '/images/gabon/team-review.jpg',
    },
    {
        id: 'admin' as const,
        emoji: '🛡️',
        title: 'Administrateur Système',
        name: 'Paul OBIANG',
        matricule: 'ADMIN-2026-D003',
        province: 'Toutes provinces',
        description: "Administrez l'ensemble de la plateforme : gestion des utilisateurs et rôles, configuration des grilles d'inspection, barème des amendes, monitoring de synchronisation, journal d'audit et maintenance.",
        buttonLabel: "Accéder à l'espace Admin →",
        variant: 'warning' as const,
        accentColor: 'var(--amber)',
        tags: ['👤 Utilisateurs', '📋 Grilles', '💰 Barème', '📜 Audit', '⚙️ Config'],
        redirect: '/admin',
        image: '/images/gabon/gabon-compliance-council.jpg',
    },
];

const DEMO_DATA = [
    { icon: <Users className="w-5 h-5" strokeWidth={1.8} />, text: '47 établissements dans 5 provinces (restaurants, abattoirs, épiceries, transporteurs)' },
    { icon: <ClipboardCheck className="w-5 h-5" strokeWidth={1.8} />, text: '15 inspections réalisées (tous statuts : brouillon, en cours, terminée, validée)' },
    { icon: <FileText className="w-5 h-5" strokeWidth={1.8} />, text: '8 PV électroniques (payés, impayés, transmis au Trésor)' },
    { icon: <Camera className="w-5 h-5" strokeWidth={1.8} />, text: "35 photos d'inspection avec métadonnées GPS" },
    { icon: <CheckCircle className="w-5 h-5" strokeWidth={1.8} />, text: '4 checklists normalisées (CAT 1, CAT 2, CAT 3, Transport)' },
    { icon: <BarChart3 className="w-5 h-5" strokeWidth={1.8} />, text: 'Barème complet des amendes (Arrêté n°426)' },
    { icon: <Calendar className="w-5 h-5" strokeWidth={1.8} />, text: "Planning d'inspections sur 2 semaines" },
    { icon: <RefreshCw className="w-5 h-5" strokeWidth={1.8} />, text: 'Historique de synchronisation' },
];

export default function DemoPage() {
    const router = useRouter();
    const { enterDemo } = useDemoMode();
    const [showData, setShowData] = useState(false);
    const enableDemoMode = process.env.NEXT_PUBLIC_ENABLE_DEMO_MODE === "true";

    useEffect(() => {
        if (!enableDemoMode) {
            router.replace("/login");
        }
    }, [enableDemoMode, router]);

    if (!enableDemoMode) return null;

    const handleEnterDemo = (profile: typeof DEMO_PROFILES[number]) => {
        enterDemo(profile.id);
        router.push(profile.redirect);
    };

    return (
        <div className="pt-28 pb-20">
            {/* Header */}
            <div className="bg-gradient-to-b from-[rgba(245,158,11,0.06)] to-transparent pb-12">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <span className="overline text-[var(--amber)]">Exploration</span>
                    <h1 className="font-serif font-bold text-[var(--text)] mt-2">
                        Démonstration <span className="text-gradient-inspect">AGASA-Inspect</span>
                    </h1>
                    <p className="text-lead text-[var(--text-muted)] font-sans max-w-2xl mx-auto mt-4 mb-8">
                        Explorez l&apos;application d&apos;inspection terrain sans créer de compte. Cliquez sur un profil pour accéder directement à son espace.
                    </p>

                    {/* Warning banner */}
                    <div className="max-w-2xl mx-auto neu-card p-4 flex items-start gap-3 text-left border-l-4" style={{ borderLeftColor: 'var(--amber)' }}>
                        <AlertTriangle className="w-6 h-6 text-[var(--amber)] flex-shrink-0 mt-0.5" strokeWidth={1.8} />
                        <div>
                            <p className="font-sans font-bold text-[var(--text)] text-sm">⚠️ Mode démonstration</p>
                            <p className="text-[var(--text-muted)] text-sm font-sans mt-1">
                                Les données affichées sont fictives. Aucune modification ne sera enregistrée.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3 Profile cards */}
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {DEMO_PROFILES.map((profile) => (
                        <div
                            key={profile.id}
                            className="neu-card overflow-hidden flex flex-col border-t-4 hover:-translate-y-1 transition-all duration-300"
                            style={{ borderTopColor: profile.accentColor }}
                        >
                            <div className="relative w-full aspect-[16/9]">
                                <Image
                                    src={profile.image}
                                    alt={`Illustration ${profile.title}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-8 flex-1">
                                <div className="text-6xl mb-4">{profile.emoji}</div>
                                <h2 className="font-serif font-bold text-[var(--text)] text-2xl mb-1">{profile.title}</h2>
                                <p className="text-[var(--text-muted)] font-sans font-semibold text-sm mb-1">{profile.name}</p>
                                <p className="text-[var(--text-muted)] text-xs font-mono mb-1">{profile.matricule}</p>
                                <p className="text-[var(--text-muted)] text-xs font-sans mb-4">{profile.province}</p>
                                <p className="text-[var(--text-muted)] font-sans text-sm leading-relaxed mb-6">{profile.description}</p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {profile.tags.map((tag) => (
                                        <span key={tag} className="badge bg-[var(--bg-muted)] text-[var(--text-muted)]">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="px-8 pb-8">
                                <BigButton
                                    variant={profile.variant}
                                    onClick={() => handleEnterDemo(profile)}
                                    className="w-full"
                                >
                                    {profile.buttonLabel}
                                </BigButton>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Collapsible demo data section */}
                <div className="max-w-3xl mx-auto">
                    <button
                        onClick={() => setShowData(!showData)}
                        className="w-full neu-card p-5 flex items-center justify-between cursor-pointer"
                    >
                        <span className="font-sans font-bold text-[var(--text)] text-base">📊 Données fictives incluses dans la démo</span>
                        {showData
                            ? <ChevronUp className="w-6 h-6 text-[var(--text-muted)]" strokeWidth={1.8} />
                            : <ChevronDown className="w-6 h-6 text-[var(--text-muted)]" strokeWidth={1.8} />
                        }
                    </button>
                    {showData && (
                        <div className="bg-[var(--bg-card)] border border-[var(--border)] border-t-0 rounded-b-2xl p-6 -mt-2">
                            <ul className="space-y-3">
                                {DEMO_DATA.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-[var(--text-muted)] font-sans text-sm">
                                        <span className="text-[var(--amber)] flex-shrink-0 mt-0.5">{item.icon}</span>
                                        <span>{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
