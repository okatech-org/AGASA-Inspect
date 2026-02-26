"use client";

import React, { useState } from 'react';
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
        borderColor: 'border-inspect-green',
        tags: ['📋 Checklists', '📄 PV', '📷 Photos', '🗺️ Carte', '🔄 Sync'],
        redirect: '/dashboard',
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
        borderColor: 'border-inspect-blue',
        tags: ['👥 Équipe', '📊 Rapports', '📅 Planning', '✅ Validations'],
        redirect: '/superviseur',
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
        borderColor: 'border-inspect-orange',
        tags: ['👤 Utilisateurs', '📋 Grilles', '💰 Barème', '📜 Audit', '⚙️ Config'],
        redirect: '/admin',
    },
];

const DEMO_DATA = [
    { icon: <Users className="w-5 h-5" />, text: '47 établissements dans 5 provinces (restaurants, abattoirs, épiceries, transporteurs)' },
    { icon: <ClipboardCheck className="w-5 h-5" />, text: '15 inspections réalisées (tous statuts : brouillon, en cours, terminée, validée)' },
    { icon: <FileText className="w-5 h-5" />, text: '8 PV électroniques (payés, impayés, transmis au Trésor)' },
    { icon: <Camera className="w-5 h-5" />, text: '35 photos d\'inspection avec métadonnées GPS' },
    { icon: <CheckCircle className="w-5 h-5" />, text: '4 checklists normalisées (CAT 1, CAT 2, CAT 3, Transport)' },
    { icon: <BarChart3 className="w-5 h-5" />, text: 'Barème complet des amendes (Arrêté n°426)' },
    { icon: <Calendar className="w-5 h-5" />, text: 'Planning d\'inspections sur 2 semaines' },
    { icon: <RefreshCw className="w-5 h-5" />, text: 'Historique de synchronisation' },
];

export default function DemoPage() {
    const router = useRouter();
    const { enterDemo } = useDemoMode();
    const [showData, setShowData] = useState(false);

    const handleEnterDemo = (profile: typeof DEMO_PROFILES[number]) => {
        enterDemo(profile.id);
        router.push(profile.redirect);
    };

    return (
        <div className="pt-24 pb-20">
            {/* Header gradient */}
            <div className="bg-gradient-to-b from-inspect-green/5 to-white pb-12">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                        Démonstration AGASA-Inspect
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                        Explorez l&apos;application d&apos;inspection terrain sans créer de compte. Cliquez sur un profil pour accéder directement à son espace.
                    </p>

                    {/* Warning banner */}
                    <div className="max-w-2xl mx-auto bg-amber-50 border-2 border-amber-300 rounded-xl p-4 flex items-start gap-3 text-left">
                        <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-bold text-amber-800">⚠️ Mode démonstration</p>
                            <p className="text-amber-700 text-sm mt-1">
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
                            className={`bg-white rounded-3xl border-2 ${profile.borderColor} shadow-terrain overflow-hidden flex flex-col`}
                        >
                            <div className="p-8 flex-1">
                                <div className="text-6xl mb-4">{profile.emoji}</div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-1">{profile.title}</h2>
                                <p className="text-gray-600 font-semibold mb-1">{profile.name}</p>
                                <p className="text-gray-500 text-sm mb-1 font-mono">{profile.matricule}</p>
                                <p className="text-gray-500 text-sm mb-4">{profile.province}</p>
                                <p className="text-gray-700 text-sm leading-relaxed mb-6">{profile.description}</p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {profile.tags.map((tag) => (
                                        <span key={tag} className="px-2.5 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-600">
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
                        className="w-full bg-white border-2 border-gray-200 rounded-2xl p-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                        <span className="font-bold text-gray-900 text-lg">📊 Données fictives incluses dans la démo</span>
                        {showData ? <ChevronUp className="w-6 h-6 text-gray-500" /> : <ChevronDown className="w-6 h-6 text-gray-500" />}
                    </button>
                    {showData && (
                        <div className="bg-white border-2 border-t-0 border-gray-200 rounded-b-2xl p-6 -mt-2">
                            <ul className="space-y-3">
                                {DEMO_DATA.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-700">
                                        <span className="text-inspect-green flex-shrink-0 mt-0.5">{item.icon}</span>
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
