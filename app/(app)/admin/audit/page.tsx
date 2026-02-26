"use client";

import React, { useState } from 'react';
import { Search, Download, Shield } from 'lucide-react';
import { BigButton } from '@/components/ui/BigButton';

const MOCK_AUDIT = [
    { date: '26/02/2026 09:02', user: 'ADMIN-SYS-001 (P. OBIANG)', action: 'Connexion', module: 'AUTH', details: 'Connexion réussie', gps: '—', horsLigne: false },
    { date: '26/02/2026 08:55', user: 'INSP-2026-0001 (J.P. MOUSSAVOU)', action: 'Inspection créée', module: 'INSPECTION', details: 'INSP-EST-2026-00145 — Restaurant Le Palmier', gps: '0.390°N, 9.454°E', horsLigne: false },
    { date: '26/02/2026 08:32', user: 'INSP-2026-0001 (J.P. MOUSSAVOU)', action: 'Sync réussie', module: 'SYNC', details: '3 inspections, 12 photos synchronisées', gps: '—', horsLigne: false },
    { date: '26/02/2026 08:30', user: 'INSP-2026-0001 (J.P. MOUSSAVOU)', action: 'Connexion', module: 'AUTH', details: 'Connexion réussie', gps: '0.390°N, 9.454°E', horsLigne: false },
    { date: '25/02/2026 17:45', user: 'INSP-2026-0003 (F. ONDO)', action: 'PV validé (VERROU)', module: 'PV', details: 'PV-2026-000089 — Montant: 500 000 FCFA', gps: '-1.633°S, 13.586°E', horsLigne: true },
    { date: '25/02/2026 16:20', user: 'INSP-2026-0004 (S. MBA)', action: 'Échec connexion', module: 'AUTH', details: 'Tentative 5/5 — Compte verrouillé', gps: '—', horsLigne: false },
    { date: '25/02/2026 14:10', user: 'INSP-2026-0002 (M.C. NZÉ)', action: 'Inspection validée', module: 'INSPECTION', details: 'INSP-EST-2026-00144 validée par superviseur', gps: '—', horsLigne: false },
    { date: '25/02/2026 10:00', user: 'ADMIN-SYS-001 (P. OBIANG)', action: 'Modification barème', module: 'ADMIN', details: 'INF-003 → amende défaut: 500 000 → 600 000 FCFA', gps: '—', horsLigne: false },
];

const MODULE_COLORS: Record<string, string> = {
    AUTH: 'bg-blue-100 text-blue-700',
    INSPECTION: 'bg-green-100 text-green-700',
    PV: 'bg-red-100 text-red-700',
    SYNC: 'bg-purple-100 text-purple-700',
    ADMIN: 'bg-orange-100 text-orange-700',
    CONFIG: 'bg-gray-100 text-gray-700',
};

export default function AuditPage() {
    const [search, setSearch] = useState('');
    const [moduleFilter, setModuleFilter] = useState('tous');

    const filtered = MOCK_AUDIT.filter((a) => {
        const matchSearch = !search || a.details.toLowerCase().includes(search.toLowerCase()) || a.user.toLowerCase().includes(search.toLowerCase());
        const matchModule = moduleFilter === 'tous' || a.module === moduleFilter;
        return matchSearch && matchModule;
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                    <Shield className="w-7 h-7 text-inspect-red" />
                    <h1 className="text-2xl font-extrabold text-gray-900">Journal d&apos;Audit</h1>
                </div>
                <BigButton variant="secondary" icon={<Download className="w-5 h-5" />}>Export CSV</BigButton>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-800 font-semibold">
                🔒 Ce journal est non modifiable et non supprimable (impératif CTRI).
            </div>

            <div className="flex flex-wrap gap-3 items-center">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" placeholder="Rechercher dans les détails..." value={search} onChange={(e) => setSearch(e.target.value)}
                        className="w-full h-12 pl-10 pr-4 border-2 border-gray-300 rounded-xl focus:border-inspect-green outline-none text-base" />
                </div>
                <select value={moduleFilter} onChange={(e) => setModuleFilter(e.target.value)} className="h-12 px-4 border-2 border-gray-300 rounded-xl bg-white text-base">
                    <option value="tous">Tous modules</option>
                    <option value="AUTH">Auth</option>
                    <option value="INSPECTION">Inspections</option>
                    <option value="PV">PV</option>
                    <option value="SYNC">Sync</option>
                    <option value="ADMIN">Admin</option>
                </select>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="text-left px-3 py-3 font-bold text-gray-600">Date/Heure</th>
                            <th className="text-left px-3 py-3 font-bold text-gray-600">Utilisateur</th>
                            <th className="text-left px-3 py-3 font-bold text-gray-600">Action</th>
                            <th className="text-left px-3 py-3 font-bold text-gray-600">Module</th>
                            <th className="text-left px-3 py-3 font-bold text-gray-600">Détails</th>
                            <th className="text-left px-3 py-3 font-bold text-gray-600">GPS</th>
                            <th className="text-center px-3 py-3 font-bold text-gray-600">H-L</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filtered.map((row, i) => (
                            <tr key={i} className="hover:bg-gray-50">
                                <td className="px-3 py-3 text-gray-600 text-xs whitespace-nowrap">{row.date}</td>
                                <td className="px-3 py-3 text-gray-800 text-xs font-semibold">{row.user}</td>
                                <td className="px-3 py-3 font-semibold text-gray-900">{row.action}</td>
                                <td className="px-3 py-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${MODULE_COLORS[row.module] || 'bg-gray-100'}`}>{row.module}</span>
                                </td>
                                <td className="px-3 py-3 text-gray-700 text-xs max-w-[300px]">{row.details}</td>
                                <td className="px-3 py-3 text-gray-500 text-xs font-mono">{row.gps}</td>
                                <td className="px-3 py-3 text-center">
                                    {row.horsLigne ? <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs font-bold">Oui</span> : <span className="text-gray-400 text-xs">—</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
