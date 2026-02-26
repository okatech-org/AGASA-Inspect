"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ClipboardCheck } from 'lucide-react';
import { BigButton } from '@/components/ui/BigButton';
import { StatusBadge } from '@/components/ui/StatusBadge';

const MOCK_INSPECTIONS = [
    { id: '1', ref: 'INSP-EST-2026-00145', etab: 'Restaurant Le Palmier', cat: 'AS CAT 2', lieu: 'Libreville, Estuaire', date: '26/02/2026', duree: '35 min', score: 82, smiley: 4, nonConf: 2, critiques: 0, photos: 4, pv: 0, statut: 'en_cours' as const, synced: true },
    { id: '2', ref: 'INSP-EST-2026-00144', etab: 'Boucherie Centrale', cat: 'AS CAT 1', lieu: 'Libreville, Estuaire', date: '25/02/2026', duree: '45 min', score: 45, smiley: 2, nonConf: 6, critiques: 2, photos: 8, pv: 1, statut: 'terminee' as const, synced: false },
    { id: '3', ref: 'INSP-EST-2026-00143', etab: 'Épicerie Du Coin', cat: 'AS CAT 3', lieu: 'Libreville, Estuaire', date: '24/02/2026', duree: '22 min', score: 91, smiley: 5, nonConf: 1, critiques: 0, photos: 3, pv: 0, statut: 'validee' as const, synced: true },
    { id: '4', ref: 'INSP-EST-2026-00142', etab: 'Pâtisserie Belle Vue', cat: 'AS CAT 2', lieu: 'Libreville, Estuaire', date: '22/02/2026', duree: '28 min', score: 73, smiley: 3, nonConf: 3, critiques: 0, photos: 5, pv: 0, statut: 'synchronisee' as const, synced: true },
    { id: '5', ref: 'INSP-EST-2026-00141', etab: 'Transport Froid Express', cat: 'Transport', lieu: 'Oloumi, Libreville', date: '20/02/2026', duree: '40 min', score: 58, smiley: 2, nonConf: 5, critiques: 1, photos: 6, pv: 1, statut: 'validee' as const, synced: true },
];

const PERIODS = ['Aujourd\'hui', 'Cette semaine', 'Ce mois', 'Tout'];
const STATUTS = ['Toutes', 'Brouillon', 'En cours', 'Terminée', 'Validée', 'Synchronisée'];

export default function InspectionsPage() {
    const [search, setSearch] = useState('');
    const [periode, setPeriode] = useState('Ce mois');
    const [statut, setStatut] = useState('Toutes');

    const filtered = MOCK_INSPECTIONS.filter(i =>
        (!search || i.etab.toLowerCase().includes(search.toLowerCase())) &&
        (statut === 'Toutes' || i.statut === statut.toLowerCase().replace('é', 'e'))
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
                <h1 className="text-2xl font-extrabold text-gray-900">Mes Inspections</h1>
                <Link href="/inspections/nouvelle">
                    <BigButton icon={<ClipboardCheck className="w-5 h-5" />}>Nouvelle</BigButton>
                </Link>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Rechercher un établissement..."
                    className="w-full h-12 pl-11 pr-4 border-2 border-gray-300 rounded-xl focus:border-inspect-green outline-none"
                />
            </div>

            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto pb-1">
                {PERIODS.map(p => (
                    <button key={p} onClick={() => setPeriode(p)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${periode === p ? 'bg-inspect-green text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>
                        {p}
                    </button>
                ))}
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
                {STATUTS.map(s => (
                    <button key={s} onClick={() => setStatut(s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${statut === s ? 'bg-inspect-blue text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>
                        {s}
                    </button>
                ))}
            </div>

            {/* Cards */}
            <div className="space-y-3">
                {filtered.map(insp => (
                    <Link key={insp.id} href={`/inspections/${insp.id}`} className="block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                                <ClipboardCheck className="w-5 h-5 text-inspect-green" />
                                <span className="font-mono text-sm font-bold text-gray-700">{insp.ref}</span>
                            </div>
                            <StatusBadge status={insp.statut} />
                        </div>
                        <p className="font-bold text-gray-900">🏢 {insp.etab} — {insp.cat}</p>
                        <p className="text-sm text-gray-600">📍 {insp.lieu}</p>
                        <p className="text-sm text-gray-500">📅 {insp.date} — Durée : {insp.duree}</p>
                        <div className="flex items-center gap-3 mt-2 text-sm">
                            <span className={`font-bold ${insp.score >= 80 ? 'text-green-600' : insp.score >= 60 ? 'text-orange-600' : 'text-red-600'}`}>
                                📊 {insp.score}%
                            </span>
                            <span>{'⭐'.repeat(insp.smiley)} ({insp.smiley}/5)</span>
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                            <span>❌ {insp.nonConf} non-conformités</span>
                            {insp.critiques > 0 && <span className="text-red-600 font-bold">🔴 {insp.critiques} critiques</span>}
                            <span>📷 {insp.photos}</span>
                            {insp.pv > 0 && <span>📄 {insp.pv} PV</span>}
                        </div>
                        {!insp.synced && <span className="inline-block mt-2 px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs font-bold">🔄 Non synchronisée</span>}
                    </Link>
                ))}
            </div>
        </div>
    );
}
