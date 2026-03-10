"use client";

import React from 'react';
import Image from 'next/image';
import { ClipboardCheck, MapPin, Camera, FileText, WifiOff, BarChart3, ChevronRight, ThermometerSun, Lock, Smartphone } from 'lucide-react';

const MODULES = [
    {
        icon: <ClipboardCheck className="w-8 h-8" strokeWidth={1.8} />,
        title: 'Checklists normalisées',
        color: 'var(--emerald)',
        image: '/images/gabon/team-review.jpg',
        features: [
            'Grilles par type : AS CAT 1 (risque élevé), CAT 2 (modéré), CAT 3 (bas), Transport',
            'Thématiques : hygiène locaux, chaîne du froid, stockage/étiquetage, déchets, personnel, HACCP, DLC/DLUO',
            'Saisie rapide : Conforme ✅ / Non conforme ❌ / Non applicable ⬜',
            'Score de conformité calculé en temps réel',
        ],
    },
    {
        icon: <MapPin className="w-8 h-8" strokeWidth={1.8} />,
        title: 'Géolocalisation automatique',
        color: 'var(--blue)',
        image: '/images/gabon/libreville-city.jpg',
        features: [
            "Capture GPS à l'arrivée sur site (précision < 10m)",
            'Horodatage certifié',
            'Cartographie offline des établissements',
            'Itinéraire optimisé pour les tournées',
        ],
    },
    {
        icon: <Camera className="w-8 h-8" strokeWidth={1.8} />,
        title: 'Capture photo certifiée',
        color: 'var(--violet)',
        image: '/images/gabon/public-health-advice.jpg',
        features: [
            'Photos haute résolution avec métadonnées intégrées (date, heure, GPS, inspecteur)',
            'Hash cryptographique SHA-256 (preuve non-altération)',
            'Annotations terrain (flèche, cercle, texte)',
            'Dossier photo lié au PV (preuve juridique)',
        ],
    },
    {
        icon: <FileText className="w-8 h-8" strokeWidth={1.8} />,
        title: 'PV électronique',
        color: 'var(--rose)',
        image: '/images/gabon/gabon-compliance-council.jpg',
        features: [
            'Généré automatiquement depuis la checklist',
            'Barème légal intégré (Arrêté n°426)',
            'Non modifiable après validation',
            'Signé électroniquement',
            'Notification SMS automatique au contrevenant',
        ],
    },
    {
        icon: <WifiOff className="w-8 h-8" strokeWidth={1.8} />,
        title: 'Mode hors-ligne',
        color: 'var(--amber)',
        image: '/images/gabon/gabon-public-service.jpg',
        features: [
            'Fonctionnement 100% sans internet',
            'Stockage local chiffré AES-256',
            'Synchronisation automatique au retour réseau',
            "Capacité 500 inspections en file d'attente",
        ],
    },
    {
        icon: <BarChart3 className="w-8 h-8" strokeWidth={1.8} />,
        title: 'Algorithme de priorisation',
        color: 'var(--teal)',
        image: '/images/gabon/digital-office.jpg',
        features: [
            'Scoring de risque par établissement',
            'Planification automatisée par province',
            'Allègement pour les établissements conformes',
        ],
    },
];

export default function FonctionnalitesPage() {
    return (
        <div className="pt-28 pb-20">
            {/* Header */}
            <div className="max-w-4xl mx-auto px-4 text-center mb-16">
                <span className="overline text-[var(--amber)]">Plateforme</span>
                <h1 className="font-serif font-bold text-[var(--text)] mt-2">
                    Fonctionnalités
                </h1>
                <p className="text-lead text-[var(--text-muted)] font-sans max-w-2xl mx-auto mt-4">
                    AGASA-Inspect intègre tous les outils nécessaires pour des inspections sanitaires rapides, fiables et transparentes.
                </p>
            </div>

            {/* Modules */}
            <div className="max-w-7xl mx-auto px-4 space-y-8">
                {MODULES.map((mod, i) => (
                    <div
                        key={i}
                        className="neu-card overflow-hidden flex flex-col md:flex-row gap-8 items-start p-0"
                    >
                        <div className="relative w-full md:w-2/5 aspect-[16/9]">
                            <Image
                                src={mod.image}
                                alt={`Illustration ${mod.title}`}
                                fill
                                sizes="(max-width: 768px) 100vw, 40vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1 p-8">
                            <div
                                className="icon-container flex-shrink-0 mb-4"
                                style={{
                                    background: `color-mix(in srgb, ${mod.color} 12%, transparent)`,
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '16px',
                                }}
                            >
                                <span style={{ color: mod.color }}>{mod.icon}</span>
                            </div>
                            <h2 className="font-serif font-bold text-[var(--text)] mb-4 text-2xl">{mod.title}</h2>
                            <ul className="space-y-3">
                                {mod.features.map((f, j) => (
                                    <li key={j} className="flex items-start gap-3 text-[var(--text-muted)] font-sans text-[15px] leading-relaxed">
                                        <ChevronRight className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: mod.color }} strokeWidth={1.8} />
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>

            {/* Extra highlights */}
            <div className="max-w-5xl mx-auto px-4 mt-20">
                <div className="grid sm:grid-cols-3 gap-6">
                    {[
                        { icon: <ThermometerSun className="w-8 h-8" strokeWidth={1.8} />, title: 'Saisie température', desc: 'Enregistrement chaîne du froid intégré', color: 'var(--amber)', image: '/images/gabon/public-health-advice.jpg' },
                        { icon: <Lock className="w-8 h-8" strokeWidth={1.8} />, title: 'Anti-falsification', desc: 'Hash SHA-256 sur chaque photo et PV', color: 'var(--rose)', image: '/images/gabon/certificate-verification.jpg' },
                        { icon: <Smartphone className="w-8 h-8" strokeWidth={1.8} />, title: 'PWA tablette', desc: 'Installable, fonctionne comme une app native', color: 'var(--blue)', image: '/images/gabon/mobile-citizen-service.jpg' },
                    ].map((card, i) => (
                        <div key={i} className="neu-card overflow-hidden p-0 text-center">
                            <div className="relative w-full aspect-[16/9]">
                                <Image
                                    src={card.image}
                                    alt={`Illustration ${card.title}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6">
                            <div
                                className="icon-container mx-auto mb-3"
                                style={{ background: `color-mix(in srgb, ${card.color} 12%, transparent)` }}
                            >
                                <span style={{ color: card.color }}>{card.icon}</span>
                            </div>
                            <h4 className="font-serif font-bold text-[var(--text)] mb-1">{card.title}</h4>
                            <p className="text-sm text-[var(--text-muted)] font-sans">{card.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
