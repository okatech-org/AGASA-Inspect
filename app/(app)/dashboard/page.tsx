"use client";

import React from 'react';
import Link from 'next/link';
import { ClipboardCheck, FileText, Map, Calendar, RefreshCw, BarChart3, ArrowRight, TrendingUp } from 'lucide-react';
import { FieldCard } from '@/components/ui/FieldCard';
import { StatusBadge } from '@/components/ui/StatusBadge';

const TODAY = new Date();
const BONJOUR = TODAY.getHours() < 12 ? 'Bonjour' : TODAY.getHours() < 18 ? 'Bon après-midi' : 'Bonsoir';
const DATE_STR = TODAY.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

const PLANNING_DU_JOUR = [
    {
        id: '1',
        nom: 'Restaurant "Chez Mama Ngoué"',
        adresse: 'Marché Mont-Bouët, Libreville',
        categorie: 'AS CAT 2',
        type: 'Inspection programmée',
        priorite: 'haute',
        smiley: 3,
        derniereInspection: '15/08/2025 (6 mois)',
    },
    {
        id: '2',
        nom: 'Boucherie Ndong & Fils',
        adresse: 'PK5, Libreville',
        categorie: 'AS CAT 1',
        type: 'Renouvellement agrément',
        priorite: 'normale',
        smiley: 4,
        derniereInspection: '20/11/2025 (3 mois)',
    },
    {
        id: '3',
        nom: 'Transport Froid Express',
        adresse: 'Zone Industrielle Oloumi',
        categorie: 'Transport',
        type: 'Suite signalement',
        priorite: 'urgente',
        smiley: 1,
        derniereInspection: '05/12/2025 (3 mois)',
    },
];

const EN_COURS = [
    { id: 'b1', ref: 'INSP-EST-2026-00143', etab: 'Épicerie Du Coin', progression: '8/12', date: '25/02/2026' },
];

const TIMELINE = [
    { icon: '📋', text: 'Inspection terminée — Restaurant Le Palmier — Score : 78%', temps: 'Il y a 2h' },
    { icon: '📄', text: 'PV émis — PV-2026-000088 — 500 000 FCFA', temps: 'Hier, 17:05' },
    { icon: '🔄', text: 'Synchronisation — 3 éléments envoyés', temps: 'Hier, 17:00' },
    { icon: '📋', text: 'Inspection terminée — Boucherie Centrale — Score : 45%', temps: 'Hier, 14:30' },
    { icon: '📷', text: '6 photos synchronisées', temps: 'Hier, 14:30' },
];

const PRIORITY_STYLES: Record<string, string> = {
    urgente: 'border-l-red-500 bg-red-50',
    haute: 'border-l-orange-400 bg-orange-50',
    normale: 'border-l-blue-400 bg-blue-50',
};

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            {/* Greeting */}
            <div>
                <h1 className="text-2xl font-extrabold text-gray-900">{BONJOUR} Jean-Pierre 👋</h1>
                <p className="text-sm text-gray-600 capitalize">{DATE_STR}</p>
                <p className="text-xs text-gray-500">Province : Estuaire — Antenne : Libreville</p>
            </div>

            {/* Sync banner */}
            <Link href="/sync" className="block bg-inspect-orange/10 border-2 border-inspect-orange/30 rounded-xl p-3 text-center">
                <p className="text-sm font-bold text-inspect-orange">🔄 16 éléments en attente de synchronisation</p>
                <p className="text-xs text-orange-600 font-semibold mt-0.5">Synchroniser maintenant →</p>
            </Link>

            {/* Section 1 — Planning du jour */}
            <div>
                <h2 className="text-lg font-bold text-gray-800 mb-3">📅 Mes inspections du jour</h2>
                <div className="space-y-3">
                    {PLANNING_DU_JOUR.map((p) => (
                        <div key={p.id} className={`bg-white rounded-xl border-l-4 p-5 shadow-sm ${PRIORITY_STYLES[p.priorite]}`}>
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1">
                                    <p className="font-bold text-gray-900 text-lg">🏢 {p.nom}</p>
                                    <p className="text-sm text-gray-600">📍 {p.adresse}</p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-bold">{p.categorie}</span>
                                        <span className="text-xs text-gray-600">📋 {p.type}</span>
                                        <StatusBadge status={p.priorite === 'urgente' ? 'danger' : p.priorite === 'haute' ? 'warning' : 'info'} label={p.priorite} />
                                    </div>
                                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                        <span>📊 {'⭐'.repeat(p.smiley)}{'☆'.repeat(5 - p.smiley)} ({p.smiley}/5)</span>
                                        <span>📅 {p.derniereInspection}</span>
                                    </div>
                                </div>
                            </div>
                            <Link href="/inspections/nouvelle" className="mt-3 w-full h-14 bg-inspect-green text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-colors">
                                ▶️ DÉMARRER L&apos;INSPECTION
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Section 2 — Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <FieldCard title="Ce mois">
                    <p className="text-3xl font-extrabold text-inspect-green">14</p>
                    <p className="text-xs text-gray-500">inspections</p>
                    <p className="text-xs text-green-600 font-semibold flex items-center gap-0.5"><TrendingUp className="w-3 h-3" /> +3 vs dernier mois</p>
                </FieldCard>
                <FieldCard title="PV émis">
                    <p className="text-3xl font-extrabold text-inspect-red">4</p>
                    <p className="text-xs text-gray-500">ce mois</p>
                    <p className="text-xs text-gray-400">2.5M FCFA</p>
                </FieldCard>
                <FieldCard title="Conformité">
                    <p className="text-3xl font-extrabold text-inspect-blue">73%</p>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                        <div className="h-full bg-inspect-blue rounded-full" style={{ width: '73%' }} />
                    </div>
                </FieldCard>
                <FieldCard title="Sync">
                    <p className="text-3xl font-extrabold text-inspect-orange">16</p>
                    <p className="text-xs text-gray-500">en attente</p>
                    <p className="text-xs text-gray-400">Dernière : 08:32</p>
                </FieldCard>
            </div>

            {/* Section 3 — En cours */}
            {EN_COURS.length > 0 && (
                <div>
                    <h2 className="text-lg font-bold text-gray-800 mb-3">📝 Inspections en cours ({EN_COURS.length})</h2>
                    {EN_COURS.map((ec) => (
                        <Link key={ec.id} href="/inspections/en-cours" className="block bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-mono text-sm font-bold text-gray-700">{ec.ref}</p>
                                    <p className="font-semibold text-gray-900">{ec.etab}</p>
                                    <p className="text-xs text-gray-500">{ec.progression} points — {ec.date}</p>
                                </div>
                                <div className="flex items-center gap-2 text-inspect-green font-bold text-sm">
                                    Reprendre <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Section 4 — Quick actions */}
            <div>
                <h2 className="text-lg font-bold text-gray-800 mb-3">⚡ Actions rapides</h2>
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { href: '/inspections/nouvelle', icon: <ClipboardCheck className="w-10 h-10" />, label: 'Nouvelle inspection', color: 'text-inspect-green' },
                        { href: '/pv', icon: <FileText className="w-10 h-10" />, label: 'Mes PV', color: 'text-inspect-red' },
                        { href: '/carte', icon: <Map className="w-10 h-10" />, label: 'Carte terrain', color: 'text-inspect-blue' },
                        { href: '/superviseur/planning', icon: <Calendar className="w-10 h-10" />, label: 'Mon planning', color: 'text-inspect-orange' },
                        { href: '/sync', icon: <RefreshCw className="w-10 h-10" />, label: 'Synchroniser', color: 'text-gray-600' },
                        { href: '/inspections', icon: <BarChart3 className="w-10 h-10" />, label: 'Mes stats', color: 'text-purple-600' },
                    ].map((a) => (
                        <Link key={a.href} href={a.href} className="bg-white rounded-xl border-2 border-gray-200 p-4 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-shadow aspect-square">
                            <span className={a.color}>{a.icon}</span>
                            <span className="text-xs font-bold text-gray-700 text-center leading-tight">{a.label}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Section 5 — Timeline */}
            <div>
                <h2 className="text-lg font-bold text-gray-800 mb-3">📊 Activité récente</h2>
                <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
                    {TIMELINE.map((t, i) => (
                        <div key={i} className="flex items-start gap-3 px-4 py-3">
                            <span className="text-lg mt-0.5">{t.icon}</span>
                            <div className="flex-1">
                                <p className="text-sm text-gray-800">{t.text}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{t.temps}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
