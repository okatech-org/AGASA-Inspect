"use client";

import React from 'react';
import Link from 'next/link';
import { Users, ClipboardCheck, FileText, BarChart3, DollarSign, Building2, TrendingUp, TrendingDown } from 'lucide-react';
import { FieldCard } from '@/components/ui/FieldCard';
import { StatusBadge } from '@/components/ui/StatusBadge';

const TODAY = new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

const KPI_ROW_1 = [
    { icon: <Users className="w-6 h-6" />, label: 'Mon équipe', value: '8 actifs / 10', sub: '5 en mission aujourd\'hui', color: 'text-inspect-blue', bg: 'bg-blue-50' },
    { icon: <ClipboardCheck className="w-6 h-6" />, label: "Inspections aujourd'hui", value: '8 / 12', sub: 'planifiées / réalisées', color: 'text-inspect-green', bg: 'bg-green-50', progress: 67 },
    { icon: <FileText className="w-6 h-6" />, label: 'PV à valider', value: '4', sub: 'en attente de validation', color: 'text-inspect-red', bg: 'bg-red-50', badge: true },
];

const KPI_ROW_2 = [
    { icon: <BarChart3 className="w-6 h-6" />, label: 'Taux conformité', value: '73%', sub: '↑ +5% vs mois dernier', trend: 'up' as const, color: 'text-inspect-green', bg: 'bg-green-50' },
    { icon: <DollarSign className="w-6 h-6" />, label: 'Amendes ce mois', value: '4.5M FCFA', sub: 'vs objectif 6M', color: 'text-inspect-orange', bg: 'bg-orange-50', progress: 75 },
    { icon: <Building2 className="w-6 h-6" />, label: 'Établissements couverts', value: '38 / 47', sub: 'Couverture : 81%', color: 'text-inspect-blue', bg: 'bg-blue-50', progress: 81 },
];

const TEAM_PERFORMANCE = [
    { nom: 'MOUSSAVOU J.P.', inspections: 18 },
    { nom: 'ONDO F.', inspections: 14 },
    { nom: 'NDONG A.', inspections: 12 },
    { nom: 'MBA S.', inspections: 10 },
    { nom: 'EYENE R.', inspections: 8 },
    { nom: 'OBAME C.', inspections: 6 },
];

const URGENT_ACTIONS = [
    { type: 'pv', text: 'PV-2026-000089 à valider (>24h) — Boucherie Centrale', urgence: 'danger' as const },
    { type: 'pv', text: 'PV-2026-000091 à valider — Transport Froid Express', urgence: 'warning' as const },
    { type: 'inspection', text: 'Inspection en retard : Abattoir Municipal (planifiée 22/02)', urgence: 'danger' as const },
    { type: 'sync', text: 'Tablette ONDO F. hors-ligne depuis 28h', urgence: 'warning' as const },
    { type: 'inspection', text: 'Inspection non terminée : Épicerie Du Coin (depuis 2j)', urgence: 'info' as const },
];

function KPICard({ icon, label, value, sub, color, bg, trend, progress }: {
    icon: React.ReactNode; label: string; value: string; sub: string; color: string; bg: string;
    trend?: 'up' | 'down'; progress?: number; badge?: boolean;
}) {
    return (
        <div className={`${bg} rounded-2xl p-5 border border-gray-100`}>
            <div className="flex items-start justify-between mb-2">
                <span className={color}>{icon}</span>
                {trend === 'up' && <TrendingUp className="w-5 h-5 text-green-500" />}
                {trend === 'down' && <TrendingDown className="w-5 h-5 text-red-500" />}
            </div>
            <p className="text-2xl font-extrabold text-gray-900">{value}</p>
            <p className="text-sm text-gray-600 font-medium">{label}</p>
            <p className="text-xs text-gray-500 mt-1">{sub}</p>
            {progress !== undefined && (
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-inspect-green rounded-full" style={{ width: `${progress}%` }} />
                </div>
            )}
        </div>
    );
}

export default function SuperviseurDashboard() {
    return (
        <div className="space-y-6">
            {/* Province banner */}
            <div className="bg-inspect-blue text-white rounded-2xl p-5">
                <p className="text-lg font-bold">Province de l&apos;Estuaire — Superviseur : Marie-Claire NZÉ</p>
                <p className="text-blue-100 text-sm capitalize">{TODAY}</p>
            </div>

            {/* KPI Row 1 */}
            <div className="grid sm:grid-cols-3 gap-4">
                {KPI_ROW_1.map((kpi) => <KPICard key={kpi.label} {...kpi} />)}
            </div>

            {/* KPI Row 2 */}
            <div className="grid sm:grid-cols-3 gap-4">
                {KPI_ROW_2.map((kpi) => <KPICard key={kpi.label} {...kpi} />)}
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6">
                <FieldCard title="Performance équipe (inspections ce mois)">
                    <div className="space-y-2">
                        {TEAM_PERFORMANCE.map((t) => (
                            <div key={t.nom} className="flex items-center gap-3">
                                <span className="text-xs font-semibold text-gray-600 w-28 text-right truncate">{t.nom}</span>
                                <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-inspect-blue rounded-full" style={{ width: `${(t.inspections / 20) * 100}%` }} />
                                </div>
                                <span className="text-sm font-bold text-gray-700 w-8 text-right">{t.inspections}</span>
                            </div>
                        ))}
                    </div>
                </FieldCard>

                <FieldCard title="Conformité par catégorie">
                    <div className="space-y-3">
                        {[
                            { cat: 'CAT 1', conforme: 65, nonConforme: 35 },
                            { cat: 'CAT 2', conforme: 78, nonConforme: 22 },
                            { cat: 'CAT 3', conforme: 90, nonConforme: 10 },
                            { cat: 'Transport', conforme: 55, nonConforme: 45 },
                        ].map((c) => (
                            <div key={c.cat}>
                                <div className="flex justify-between text-xs font-semibold mb-1">
                                    <span>{c.cat}</span>
                                    <span className="text-inspect-green">{c.conforme}% conforme</span>
                                </div>
                                <div className="h-4 bg-red-100 rounded-full overflow-hidden flex">
                                    <div className="h-full bg-inspect-green rounded-l-full" style={{ width: `${c.conforme}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </FieldCard>
            </div>

            {/* Urgent actions */}
            <FieldCard title="⚡ Actions urgentes">
                <div className="space-y-2">
                    {URGENT_ACTIONS.map((a, i) => (
                        <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                            <StatusBadge status={a.urgence} label={a.urgence === 'danger' ? 'Urgent' : a.urgence === 'warning' ? 'Attention' : 'Info'} />
                            <span className="text-sm text-gray-800">{a.text}</span>
                        </div>
                    ))}
                </div>
            </FieldCard>

            {/* Quick nav */}
            <div className="grid sm:grid-cols-3 gap-4">
                <Link href="/superviseur/equipe" className="bg-white border-2 border-gray-200 rounded-xl p-4 text-center hover:bg-gray-50 transition-colors font-bold text-gray-800">
                    👥 Gérer l&apos;équipe
                </Link>
                <Link href="/superviseur/planning" className="bg-white border-2 border-gray-200 rounded-xl p-4 text-center hover:bg-gray-50 transition-colors font-bold text-gray-800">
                    📅 Planning
                </Link>
                <Link href="/superviseur/rapports" className="bg-white border-2 border-gray-200 rounded-xl p-4 text-center hover:bg-gray-50 transition-colors font-bold text-gray-800">
                    📊 Rapports
                </Link>
            </div>
        </div>
    );
}
