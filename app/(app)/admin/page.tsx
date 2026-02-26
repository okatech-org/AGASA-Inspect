"use client";

import React from 'react';
import Link from 'next/link';
import { Users, RefreshCw, ClipboardCheck, FileText, ShieldAlert, HardDrive, Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { BigButton } from '@/components/ui/BigButton';
import { FieldCard } from '@/components/ui/FieldCard';

// Mock KPI data
const KPI_ROW_1 = [
    {
        icon: <Users className="w-7 h-7" />,
        label: 'Utilisateurs actifs',
        value: '42 / 50',
        sub: '38 Inspecteurs • 4 Superviseurs',
        color: 'text-inspect-blue',
        bg: 'bg-blue-50',
    },
    {
        icon: <RefreshCw className="w-7 h-7" />,
        label: 'Synchronisation',
        value: '39 tablettes',
        sub: '3 en attente',
        color: 'text-inspect-green',
        bg: 'bg-green-50',
        badge: true,
    },
    {
        icon: <ClipboardCheck className="w-7 h-7" />,
        label: "Inspections aujourd'hui",
        value: '12',
        sub: '+3 vs hier',
        trend: 'up' as const,
        color: 'text-inspect-green',
        bg: 'bg-green-50',
    },
];

const KPI_ROW_2 = [
    {
        icon: <FileText className="w-7 h-7" />,
        label: 'PV en attente',
        value: '5',
        sub: 'PV non synchronisés',
        color: 'text-inspect-orange',
        bg: 'bg-orange-50',
        link: '/admin/audit',
    },
    {
        icon: <ShieldAlert className="w-7 h-7" />,
        label: 'Alertes sécurité',
        value: '2 verrouillés',
        sub: '7 tentatives échouées 24h',
        color: 'text-inspect-red',
        bg: 'bg-red-50',
    },
    {
        icon: <HardDrive className="w-7 h-7" />,
        label: 'Stockage',
        value: '12.3 Go / 50 Go',
        sub: '',
        color: 'text-gray-700',
        bg: 'bg-gray-50',
        progress: 24.6,
    },
];

// Mock chart data
const DAILY_INSPECTIONS = [8, 12, 6, 15, 10, 14, 9, 11, 7, 13, 16, 8, 12, 10, 15, 9, 11, 14, 7, 12, 8, 13, 10, 16, 9, 14, 11, 12, 8, 12];
const PROVINCES = ['Estuaire', 'H-Ogooué', 'M-Ogooué', 'Ngounié', 'Nyanga', 'O-Ivindo', 'O-Lolo', 'O-Maritime', 'W-Ntem'];
const PROVINCE_COUNTS = [45, 12, 8, 6, 5, 4, 3, 10, 7];

function KPICard({ icon, label, value, sub, color, bg, trend, progress, link }: {
    icon: React.ReactNode; label: string; value: string; sub: string; color: string; bg: string;
    trend?: 'up' | 'down'; progress?: number; badge?: boolean; link?: string;
}) {
    const content = (
        <div className={`${bg} rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow`}>
            <div className="flex items-start justify-between mb-3">
                <span className={color}>{icon}</span>
                {trend === 'up' && <TrendingUp className="w-5 h-5 text-green-500" />}
                {trend === 'down' && <TrendingDown className="w-5 h-5 text-red-500" />}
            </div>
            <p className="text-2xl font-extrabold text-gray-900">{value}</p>
            <p className="text-sm text-gray-600 font-medium mt-1">{label}</p>
            {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
            {progress !== undefined && (
                <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-inspect-green rounded-full transition-all" style={{ width: `${progress}%` }} />
                </div>
            )}
        </div>
    );
    return link ? <Link href={link}>{content}</Link> : content;
}

function MiniBarChart({ data, maxH = 60 }: { data: number[]; maxH?: number }) {
    const max = Math.max(...data);
    return (
        <div className="flex items-end gap-[2px] h-[60px]">
            {data.map((v, i) => (
                <div
                    key={i}
                    className="flex-1 bg-inspect-green/70 rounded-t-sm hover:bg-inspect-green transition-colors"
                    style={{ height: `${(v / max) * maxH}px` }}
                    title={`Jour ${i + 1}: ${v} inspections`}
                />
            ))}
        </div>
    );
}

function ProvinceChart({ provinces, counts }: { provinces: string[]; counts: number[] }) {
    const max = Math.max(...counts);
    return (
        <div className="space-y-2">
            {provinces.map((p, i) => (
                <div key={p} className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-gray-600 w-20 text-right truncate">{p}</span>
                    <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-inspect-blue rounded-full transition-all"
                            style={{ width: `${(counts[i] / max) * 100}%` }}
                        />
                    </div>
                    <span className="text-xs font-bold text-gray-700 w-8">{counts[i]}</span>
                </div>
            ))}
        </div>
    );
}

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                    Administration
                </h1>
                <Link href="/admin/utilisateurs" className="text-inspect-green font-bold text-sm hover:underline">
                    Gérer les utilisateurs →
                </Link>
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
                <FieldCard title="Inspections par jour (30 derniers jours)">
                    <MiniBarChart data={DAILY_INSPECTIONS} />
                </FieldCard>
                <FieldCard title="Inspections par province">
                    <ProvinceChart provinces={PROVINCES} counts={PROVINCE_COUNTS} />
                </FieldCard>
            </div>

            {/* Quick actions */}
            <div className="grid sm:grid-cols-3 gap-4">
                <Link href="/admin/utilisateurs">
                    <BigButton icon={<Plus className="w-5 h-5" />} className="w-full">
                        Créer un inspecteur
                    </BigButton>
                </Link>
                <Link href="/admin/checklists">
                    <BigButton variant="secondary" icon={<ClipboardCheck className="w-5 h-5" />} className="w-full">
                        Modifier une grille
                    </BigButton>
                </Link>
                <Link href="/admin/sync-monitor">
                    <BigButton variant="warning" icon={<RefreshCw className="w-5 h-5" />} className="w-full">
                        Forcer la synchronisation
                    </BigButton>
                </Link>
            </div>
        </div>
    );
}
