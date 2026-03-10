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
    urgente: 'border-l-[var(--rose)] bg-[rgba(244,63,94,0.06)]',
    haute: 'border-l-[var(--amber)] bg-[rgba(245,158,11,0.06)]',
    normale: 'border-l-[var(--blue)] bg-[rgba(59,130,246,0.06)]',
};

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            {/* Greeting — 18px recommended for Inspect (§8.3) */}
            <div>
                <h1 className="font-serif font-bold text-[var(--text)] text-[28px]">{BONJOUR} Jean-Pierre 👋</h1>
                <p className="text-sm text-[var(--text-muted)] font-sans capitalize">{DATE_STR}</p>
                <p className="text-xs text-[var(--text-muted)] font-sans opacity-70">Province : Estuaire — Antenne : Libreville</p>
            </div>

            {/* Sync banner */}
            <Link href="/sync" className="block neu-card p-3 text-center border-l-4 border-l-[var(--amber)]">
                <p className="text-sm font-bold text-[var(--amber)] font-sans">🔄 16 éléments en attente de synchronisation</p>
                <p className="text-xs text-[var(--amber)] font-sans font-semibold mt-0.5 opacity-70">Synchroniser maintenant →</p>
            </Link>

            {/* Section 1 — Planning du jour */}
            <div>
                <h2 className="font-serif font-bold text-[var(--text)] text-xl mb-3">📅 Mes inspections du jour</h2>
                <div className="space-y-3">
                    {PLANNING_DU_JOUR.map((p) => (
                        <div key={p.id} className={`neu-card border-l-4 p-5 ${PRIORITY_STYLES[p.priorite]}`}>
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1">
                                    <p className="font-sans font-bold text-[var(--text)] text-lg">🏢 {p.nom}</p>
                                    <p className="text-sm text-[var(--text-muted)] font-sans">📍 {p.adresse}</p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <span className="badge bg-[var(--bg-muted)] text-[var(--text-muted)]">{p.categorie}</span>
                                        <span className="text-xs text-[var(--text-muted)] font-sans flex items-center">📋 {p.type}</span>
                                        <StatusBadge status={p.priorite === 'urgente' ? 'danger' : p.priorite === 'haute' ? 'warning' : 'info'} label={p.priorite} />
                                    </div>
                                    <div className="flex items-center gap-4 mt-2 text-xs text-[var(--text-muted)] font-sans">
                                        <span>📊 {'⭐'.repeat(p.smiley)}{'☆'.repeat(5 - p.smiley)} ({p.smiley}/5)</span>
                                        <span>📅 {p.derniereInspection}</span>
                                    </div>
                                </div>
                            </div>
                            <Link href="/inspections/nouvelle" className="mt-3 w-full min-h-[56px] gradient-agasa text-white rounded-xl font-sans font-bold text-base flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                                ▶️ DÉMARRER L&apos;INSPECTION
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Section 2 — Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <FieldCard title="Ce mois">
                    <p className="text-3xl font-bold text-[var(--emerald)] font-sans">14</p>
                    <p className="text-xs text-[var(--text-muted)] font-sans">inspections</p>
                    <p className="text-xs text-[var(--emerald)] font-sans font-semibold flex items-center gap-0.5"><TrendingUp className="w-3 h-3" /> +3 vs dernier mois</p>
                </FieldCard>
                <FieldCard title="PV émis">
                    <p className="text-3xl font-bold text-[var(--rose)] font-sans">4</p>
                    <p className="text-xs text-[var(--text-muted)] font-sans">ce mois</p>
                    <p className="text-xs text-[var(--text-muted)] font-sans opacity-60">2.5M FCFA</p>
                </FieldCard>
                <FieldCard title="Conformité">
                    <p className="text-3xl font-bold text-[var(--blue)] font-sans">73%</p>
                    <div className="h-2 bg-[var(--bg-muted)] rounded-full overflow-hidden mt-1">
                        <div className="h-full bg-[var(--blue)] rounded-full" style={{ width: '73%' }} />
                    </div>
                </FieldCard>
                <FieldCard title="Sync">
                    <p className="text-3xl font-bold text-[var(--amber)] font-sans">16</p>
                    <p className="text-xs text-[var(--text-muted)] font-sans">en attente</p>
                    <p className="text-xs text-[var(--text-muted)] font-sans opacity-60">Dernière : 08:32</p>
                </FieldCard>
            </div>

            {/* Section 3 — En cours */}
            {EN_COURS.length > 0 && (
                <div>
                    <h2 className="font-serif font-bold text-[var(--text)] text-xl mb-3">📝 Inspections en cours ({EN_COURS.length})</h2>
                    {EN_COURS.map((ec) => (
                        <Link key={ec.id} href="/inspections/en-cours" className="block neu-card p-4 hover:shadow-elegant transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-mono text-sm font-bold text-[var(--text-muted)]">{ec.ref}</p>
                                    <p className="font-sans font-semibold text-[var(--text)]">{ec.etab}</p>
                                    <p className="text-xs text-[var(--text-muted)] font-sans">{ec.progression} points — {ec.date}</p>
                                </div>
                                <div className="flex items-center gap-2 text-[var(--amber)] font-sans font-bold text-sm">
                                    Reprendre <ArrowRight className="w-4 h-4" strokeWidth={1.8} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Section 4 — Quick actions */}
            <div>
                <h2 className="font-serif font-bold text-[var(--text)] text-xl mb-3">⚡ Actions rapides</h2>
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { href: '/inspections/nouvelle', icon: <ClipboardCheck className="w-8 h-8" strokeWidth={1.8} />, label: 'Nouvelle inspection', color: 'var(--emerald)' },
                        { href: '/pv', icon: <FileText className="w-8 h-8" strokeWidth={1.8} />, label: 'Mes PV', color: 'var(--rose)' },
                        { href: '/carte', icon: <Map className="w-8 h-8" strokeWidth={1.8} />, label: 'Carte terrain', color: 'var(--blue)' },
                        { href: '/superviseur/planning', icon: <Calendar className="w-8 h-8" strokeWidth={1.8} />, label: 'Mon planning', color: 'var(--amber)' },
                        { href: '/sync', icon: <RefreshCw className="w-8 h-8" strokeWidth={1.8} />, label: 'Synchroniser', color: 'var(--text-muted)' },
                        { href: '/inspections', icon: <BarChart3 className="w-8 h-8" strokeWidth={1.8} />, label: 'Mes stats', color: 'var(--violet)' },
                    ].map((a) => (
                        <Link key={a.href} href={a.href} className="neu-card p-4 flex flex-col items-center justify-center gap-2 aspect-square">
                            <span style={{ color: a.color }}>{a.icon}</span>
                            <span className="text-xs font-sans font-bold text-[var(--text)] text-center leading-tight">{a.label}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Section 5 — Timeline */}
            <div>
                <h2 className="font-serif font-bold text-[var(--text)] text-xl mb-3">📊 Activité récente</h2>
                <div className="neu-card divide-y divide-[var(--border)] overflow-hidden">
                    {TIMELINE.map((t, i) => (
                        <div key={i} className="flex items-start gap-3 px-4 py-3">
                            <span className="text-lg mt-0.5">{t.icon}</span>
                            <div className="flex-1">
                                <p className="text-sm text-[var(--text)] font-sans">{t.text}</p>
                                <p className="text-xs text-[var(--text-muted)] font-sans mt-0.5">{t.temps}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
