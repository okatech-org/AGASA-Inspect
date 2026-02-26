"use client";

import React from 'react';
import { ClipboardCheck, MapPin, Camera, FileText, WifiOff, BarChart3, ChevronRight, ThermometerSun, Lock, Smartphone } from 'lucide-react';

const MODULES = [
    {
        icon: <ClipboardCheck className="w-10 h-10" />,
        title: 'Checklists normalisées',
        features: [
            'Grilles par type : AS CAT 1 (risque élevé), CAT 2 (modéré), CAT 3 (bas), Transport',
            'Thématiques : hygiène locaux, chaîne du froid, stockage/étiquetage, déchets, personnel, HACCP, DLC/DLUO',
            'Saisie rapide : Conforme ✅ / Non conforme ❌ / Non applicable ⬜',
            'Score de conformité calculé en temps réel',
        ],
    },
    {
        icon: <MapPin className="w-10 h-10" />,
        title: 'Géolocalisation automatique',
        features: [
            "Capture GPS à l'arrivée sur site (précision < 10m)",
            'Horodatage certifié',
            'Cartographie offline des établissements',
            'Itinéraire optimisé pour les tournées',
        ],
    },
    {
        icon: <Camera className="w-10 h-10" />,
        title: 'Capture photo certifiée',
        features: [
            'Photos haute résolution avec métadonnées intégrées (date, heure, GPS, inspecteur)',
            'Hash cryptographique SHA-256 (preuve non-altération)',
            'Annotations terrain (flèche, cercle, texte)',
            'Dossier photo lié au PV (preuve juridique)',
        ],
    },
    {
        icon: <FileText className="w-10 h-10" />,
        title: 'PV électronique',
        features: [
            'Généré automatiquement depuis la checklist',
            'Barème légal intégré (Arrêté n°426)',
            'Non modifiable après validation',
            'Signé électroniquement',
            'Notification SMS automatique au contrevenant',
        ],
    },
    {
        icon: <WifiOff className="w-10 h-10" />,
        title: 'Mode hors-ligne',
        features: [
            'Fonctionnement 100% sans internet',
            'Stockage local chiffré AES-256',
            'Synchronisation automatique au retour réseau',
            "Capacité 500 inspections en file d'attente",
        ],
    },
    {
        icon: <BarChart3 className="w-10 h-10" />,
        title: 'Algorithme de priorisation',
        features: [
            'Scoring de risque par établissement',
            'Planification automatisée par province',
            'Allègement pour les établissements conformes',
        ],
    },
];

export default function FonctionnalitesPage() {
    return (
        <div className="pt-24 pb-20">
            {/* Header */}
            <div className="max-w-4xl mx-auto px-4 text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                    Fonctionnalités
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    AGASA-Inspect intègre tous les outils nécessaires pour des inspections sanitaires rapides, fiables et transparentes.
                </p>
            </div>

            {/* Modules */}
            <div className="max-w-7xl mx-auto px-4 space-y-12">
                {MODULES.map((mod, i) => (
                    <div
                        key={i}
                        className={`flex flex-col md:flex-row gap-8 items-start p-8 rounded-3xl border-2 ${i % 2 === 0 ? 'bg-white border-gray-100' : 'bg-gray-50 border-gray-200'
                            }`}
                    >
                        <div className="flex-shrink-0 w-16 h-16 bg-inspect-green/10 rounded-2xl flex items-center justify-center text-inspect-green">
                            {mod.icon}
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">{mod.title}</h2>
                            <ul className="space-y-3">
                                {mod.features.map((f, j) => (
                                    <li key={j} className="flex items-start gap-3 text-gray-700">
                                        <ChevronRight className="w-5 h-5 text-inspect-green flex-shrink-0 mt-0.5" />
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
                    <div className="bg-inspect-green/5 border border-inspect-green/20 rounded-2xl p-6 text-center">
                        <ThermometerSun className="w-10 h-10 text-inspect-orange mx-auto mb-3" />
                        <h3 className="font-bold text-gray-900 mb-1">Saisie température</h3>
                        <p className="text-sm text-gray-600">Enregistrement chaîne du froid intégré</p>
                    </div>
                    <div className="bg-inspect-green/5 border border-inspect-green/20 rounded-2xl p-6 text-center">
                        <Lock className="w-10 h-10 text-inspect-red mx-auto mb-3" />
                        <h3 className="font-bold text-gray-900 mb-1">Anti-falsification</h3>
                        <p className="text-sm text-gray-600">Hash SHA-256 sur chaque photo et PV</p>
                    </div>
                    <div className="bg-inspect-green/5 border border-inspect-green/20 rounded-2xl p-6 text-center">
                        <Smartphone className="w-10 h-10 text-inspect-blue mx-auto mb-3" />
                        <h3 className="font-bold text-gray-900 mb-1">PWA tablette</h3>
                        <p className="text-sm text-gray-600">Installable, fonctionne comme une app native</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
