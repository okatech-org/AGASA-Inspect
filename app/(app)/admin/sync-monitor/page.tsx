"use client";

import React from 'react';
import { RefreshCw, Wifi, WifiOff, AlertTriangle, Smartphone } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { FieldCard } from '@/components/ui/FieldCard';

const MOCK_TABLETS = [
    { id: '1', inspecteur: 'J.P. MOUSSAVOU', matricule: 'INSP-2026-0001', lastSync: '26/02 08:32', status: 'online', pending: 0 },
    { id: '2', inspecteur: 'M.C. NZÉ', matricule: 'INSP-2026-0002', lastSync: '26/02 07:50', status: 'online', pending: 0 },
    { id: '3', inspecteur: 'F. ONDO', matricule: 'INSP-2026-0003', lastSync: '25/02 17:05', status: 'offline', pending: 5 },
    { id: '4', inspecteur: 'S. MBA', matricule: 'INSP-2026-0004', lastSync: '24/02 09:20', status: 'offline', pending: 12 },
    { id: '5', inspecteur: 'A. NDONG', matricule: 'INSP-2026-0005', lastSync: '22/02 14:30', status: 'offline', pending: 8 },
];

const STATUS_ICONS: Record<string, React.ReactNode> = {
    online: <Wifi className="w-4 h-4 text-green-500" />,
    offline: <WifiOff className="w-4 h-4 text-red-500" />,
    syncing: <RefreshCw className="w-4 h-4 text-orange-500 animate-spin" />,
};

const HOURLY_SYNC = [2, 5, 3, 1, 0, 0, 1, 4, 8, 12, 15, 10, 8, 6, 9, 14, 11, 7, 5, 3, 2, 1, 1, 0];

export default function SyncMonitorPage() {
    const offlineAlerts = MOCK_TABLETS.filter(t => t.status === 'offline' && t.pending > 5);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-extrabold text-gray-900">Monitoring Synchronisation</h1>

            <div className="grid sm:grid-cols-3 gap-4">
                <FieldCard title="En ligne">
                    <p className="text-3xl font-extrabold text-green-600">{MOCK_TABLETS.filter(t => t.status === 'online').length}</p>
                    <p className="text-sm text-gray-500">tablettes connectées</p>
                </FieldCard>
                <FieldCard title="Hors-ligne">
                    <p className="text-3xl font-extrabold text-red-600">{MOCK_TABLETS.filter(t => t.status === 'offline').length}</p>
                    <p className="text-sm text-gray-500">tablettes déconnectées</p>
                </FieldCard>
                <FieldCard title="En attente">
                    <p className="text-3xl font-extrabold text-orange-600">{MOCK_TABLETS.reduce((s, t) => s + t.pending, 0)}</p>
                    <p className="text-sm text-gray-500">éléments à synchroniser</p>
                </FieldCard>
            </div>

            {offlineAlerts.length > 0 && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2 text-red-800 font-bold">
                        <AlertTriangle className="w-5 h-5" /> Alertes
                    </div>
                    {offlineAlerts.map(t => (
                        <p key={t.id} className="text-sm text-red-700">
                            ⚠️ {t.inspecteur} ({t.matricule}) — dernière sync: {t.lastSync} — {t.pending} éléments en attente
                        </p>
                    ))}
                </div>
            )}

            {/* Tablets table */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="text-left px-4 py-3 font-bold text-gray-600">Inspecteur</th>
                            <th className="text-left px-4 py-3 font-bold text-gray-600">Matricule</th>
                            <th className="text-left px-4 py-3 font-bold text-gray-600">Statut</th>
                            <th className="text-left px-4 py-3 font-bold text-gray-600">Dernière sync</th>
                            <th className="text-left px-4 py-3 font-bold text-gray-600">En attente</th>
                            <th className="text-left px-4 py-3 font-bold text-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {MOCK_TABLETS.map((t) => (
                            <tr key={t.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 font-semibold text-gray-900 flex items-center gap-2">
                                    <Smartphone className="w-4 h-4 text-gray-400" /> {t.inspecteur}
                                </td>
                                <td className="px-4 py-3 font-mono text-gray-700">{t.matricule}</td>
                                <td className="px-4 py-3 flex items-center gap-2">
                                    {STATUS_ICONS[t.status]}
                                    <StatusBadge status={t.status === 'online' ? 'success' : 'danger'} label={t.status === 'online' ? 'En ligne' : 'Hors-ligne'} />
                                </td>
                                <td className="px-4 py-3 text-gray-600 text-xs">{t.lastSync}</td>
                                <td className="px-4 py-3">
                                    {t.pending > 0 ? <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">{t.pending}</span> : <span className="text-gray-400">—</span>}
                                </td>
                                <td className="px-4 py-3">
                                    <button className="text-inspect-green text-xs font-bold hover:underline flex items-center gap-1">
                                        <RefreshCw className="w-3 h-3" /> Forcer sync
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Sync volume chart */}
            <FieldCard title="Volume de synchronisation (24h)">
                <div className="flex items-end gap-[3px] h-[80px]">
                    {HOURLY_SYNC.map((v, i) => (
                        <div
                            key={i}
                            className="flex-1 bg-inspect-blue/60 rounded-t-sm hover:bg-inspect-blue transition-colors"
                            style={{ height: `${(v / Math.max(...HOURLY_SYNC)) * 80}px` }}
                            title={`${i}h: ${v} éléments`}
                        />
                    ))}
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-400">
                    <span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>23h</span>
                </div>
            </FieldCard>
        </div>
    );
}
