"use client";

import React, { useState } from 'react';
import { FieldCard } from '@/components/ui/FieldCard';
import { StatusBadge } from '@/components/ui/StatusBadge';

const INSPECTION = {
    ref: 'INSP-EST-2026-00144',
    etab: 'Boucherie Centrale',
    categorie: 'AS CAT 1',
    inspecteur: 'MOUSSAVOU Jean-Pierre (INSP-2026-0001)',
    date: '25/02/2026 09:15',
    duree: '45 min',
    gps: '0.390°N, 9.451°E',
    score: 45,
    smiley: 2,
    statut: 'terminee' as const,
};

interface ChecklistPoint {
    libelle: string;
    resultat: string;
    critique?: boolean;
    commentaire?: string;
    temperature?: string;
}

const CHECKLIST_RESULTS: { section: string; points: ChecklistPoint[] }[] = [
    {
        section: 'Hygiène des locaux', points: [
            { libelle: 'Sol propre', resultat: 'conforme' },
            { libelle: 'Murs sans moisissure', resultat: 'non_conforme' },
            { libelle: 'Équipements nettoyés', resultat: 'non_conforme', critique: true, commentaire: 'Absence totale de nettoyage' },
            { libelle: 'Lave-mains fonctionnel', resultat: 'non_conforme', critique: true, commentaire: 'Pas de savon' },
        ]
    },
    {
        section: 'Chaîne du froid', points: [
            { libelle: 'Frigo 0-4°C', resultat: 'non_conforme', critique: true, commentaire: '8°C mesuré', temperature: '8' },
            { libelle: 'Congélateur ≤ -18°C', resultat: 'conforme', temperature: '-20' },
            { libelle: 'Stockage correct', resultat: 'conforme' },
        ]
    },
    {
        section: 'Manipulation aliments', points: [
            { libelle: 'Port de gants', resultat: 'na' },
            { libelle: 'Séparation crus/cuits', resultat: 'non_conforme', critique: true },
            { libelle: 'DLC vérifiées', resultat: 'non_conforme', critique: true, commentaire: '3 produits périmés' },
        ]
    },
];

const AUDIT = [
    { date: '25/02/2026 09:15', action: 'Inspection démarrée', user: 'MOUSSAVOU J.P.' },
    { date: '25/02/2026 09:45', action: 'Checklist terminée — Score 45%', user: 'MOUSSAVOU J.P.' },
    { date: '25/02/2026 10:00', action: 'PV généré — PV-2026-000088', user: 'MOUSSAVOU J.P.' },
    { date: '25/02/2026 10:15', action: 'PV signé et verrouillé', user: 'MOUSSAVOU J.P.' },
];

const TABS = ['Résultats', 'Photos', 'PV', 'Historique'] as const;

export default function InspectionDetailPage() {
    const [tab, setTab] = useState<typeof TABS[number]>('Résultats');

    const scoreColor = INSPECTION.score >= 80 ? 'text-green-600 bg-green-50' : INSPECTION.score >= 60 ? 'text-orange-600 bg-orange-50' : 'text-red-600 bg-red-50';

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm font-bold text-gray-700">{INSPECTION.ref}</span>
                    <StatusBadge status={INSPECTION.statut} />
                </div>
                <h1 className="text-xl font-extrabold text-gray-900">{INSPECTION.etab}</h1>
                <p className="text-sm text-gray-600">{INSPECTION.categorie} — 👤 {INSPECTION.inspecteur}</p>
                <p className="text-sm text-gray-500">📅 {INSPECTION.date} — ⏱ {INSPECTION.duree} — 📍 {INSPECTION.gps}</p>
                <div className={`mt-3 p-3 rounded-xl text-center ${scoreColor}`}>
                    <p className="text-3xl font-extrabold">{INSPECTION.score}%</p>
                    <p>{'⭐'.repeat(INSPECTION.smiley)}{'☆'.repeat(5 - INSPECTION.smiley)}</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto">
                {TABS.map(t => (
                    <button key={t} onClick={() => setTab(t)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap ${tab === t ? 'bg-inspect-green text-white' : 'bg-white border border-gray-200 text-gray-600'
                            }`}>
                        {t}
                    </button>
                ))}
            </div>

            {/* Résultats */}
            {tab === 'Résultats' && (
                <div className="space-y-4">
                    {CHECKLIST_RESULTS.map((s, i) => (
                        <FieldCard key={i} title={s.section}>
                            <div className="space-y-2">
                                {s.points.map((p, j) => (
                                    <div key={j} className={`flex items-start gap-3 py-2 border-b border-gray-100 last:border-0 ${p.resultat === 'non_conforme' && p.critique ? 'bg-red-50 -mx-3 px-3 rounded-lg' : ''}`}>
                                        <span className="text-lg mt-0.5">
                                            {p.resultat === 'conforme' ? '✅' : p.resultat === 'non_conforme' ? '❌' : '⬜'}
                                        </span>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-800 font-semibold">{p.libelle}</p>
                                            {p.critique && <p className="text-xs font-bold text-red-600">🔴 Point critique</p>}
                                            {p.commentaire && <p className="text-xs text-gray-600 mt-0.5">💬 {p.commentaire}</p>}
                                            {p.temperature && <p className="text-xs text-gray-600">🌡️ {p.temperature}°C</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </FieldCard>
                    ))}
                </div>
            )}

            {/* Photos */}
            {tab === 'Photos' && (
                <FieldCard title="📷 8 photos">
                    <div className="grid grid-cols-3 gap-2">
                        {Array.from({ length: 8 }, (_, i) => (
                            <div key={i} className="aspect-square bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-2xl">
                                📷
                            </div>
                        ))}
                    </div>
                </FieldCard>
            )}

            {/* PV */}
            {tab === 'PV' && (
                <FieldCard title="📄 PV associé">
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                        <p className="font-bold text-red-800">PV-2026-000088</p>
                        <p className="text-sm text-red-700">2 infractions — 1 000 000 FCFA</p>
                        <p className="text-xs text-red-600 mt-1">🔒 Verrouillé le 25/02/2026</p>
                    </div>
                </FieldCard>
            )}

            {/* Historique */}
            {tab === 'Historique' && (
                <FieldCard title="📋 Audit trail">
                    <div className="space-y-2">
                        {AUDIT.map((a, i) => (
                            <div key={i} className="flex gap-3 py-2 border-b border-gray-100 last:border-0">
                                <span className="text-xs text-gray-400 w-28 flex-shrink-0">{a.date}</span>
                                <div>
                                    <p className="text-sm text-gray-800">{a.action}</p>
                                    <p className="text-xs text-gray-500">{a.user}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </FieldCard>
            )}
        </div>
    );
}
