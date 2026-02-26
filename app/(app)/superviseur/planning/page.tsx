"use client";

import React from 'react';
import { Calendar, Plus } from 'lucide-react';
import { FieldCard } from '@/components/ui/FieldCard';

const INSPECTEURS = ['MOUSSAVOU J.P.', 'ONDO F.', 'NDONG A.', 'MBA S.', 'EYENE R.', 'OBAME C.'];
const JOURS = ['Lun 24/02', 'Mar 25/02', 'Mer 26/02', 'Jeu 27/02', 'Ven 28/02'];

const PLANNING_DATA: Record<string, Record<string, { etab: string; priorite: string }[]>> = {
    'MOUSSAVOU J.P.': {
        'Lun 24/02': [{ etab: 'Restaurant Le Palmier', priorite: 'normale' }],
        'Mer 26/02': [{ etab: 'Boucherie Centrale', priorite: 'urgente' }],
        'Ven 28/02': [{ etab: 'Pâtisserie Belle Vue', priorite: 'normale' }],
    },
    'ONDO F.': {
        'Mar 25/02': [{ etab: 'Abattoir Municipal', priorite: 'haute' }],
        'Jeu 27/02': [{ etab: 'Transport Froid Express', priorite: 'normale' }],
    },
    'NDONG A.': {
        'Lun 24/02': [{ etab: 'Épicerie Du Coin', priorite: 'basse' }],
        'Mer 26/02': [{ etab: 'Supermarché Central', priorite: 'normale' }],
    },
};

const PRIORITY_COLORS: Record<string, string> = {
    urgente: 'bg-red-100 border-red-400 text-red-800',
    haute: 'bg-orange-100 border-orange-400 text-orange-800',
    normale: 'bg-blue-100 border-blue-400 text-blue-800',
    basse: 'bg-gray-100 border-gray-300 text-gray-600',
};

const SUGGESTIONS = [
    { nom: 'Grillade Express', categorie: 'CAT 1', derniereInspection: '15/11/2025', scoreRisque: 92, motif: 'Non inspecté depuis >3 mois' },
    { nom: 'Poissonnerie Centrale', categorie: 'CAT 1', derniereInspection: '01/12/2025', scoreRisque: 87, motif: 'Historique non-conformité' },
    { nom: 'Boulangerie Gabon', categorie: 'CAT 2', derniereInspection: '20/11/2025', scoreRisque: 78, motif: 'Renouvellement agrément' },
    { nom: 'Transport Glaces SA', categorie: 'Transport', derniereInspection: '10/12/2025', scoreRisque: 75, motif: 'Rupture chaîne froid signalée' },
    { nom: 'Marché Mbolo', categorie: 'CAT 3', derniereInspection: '05/01/2026', scoreRisque: 65, motif: 'Inspection périodique due' },
];

export default function PlanningPage() {

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                    <Calendar className="w-7 h-7 text-inspect-blue" />
                    <h1 className="text-2xl font-extrabold text-gray-900">Planning Équipe</h1>
                </div>
            </div>

            {/* Calendar grid */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-x-auto">
                <table className="w-full text-xs">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="text-left px-3 py-3 font-bold text-gray-600 w-32">Inspecteur</th>
                            {JOURS.map((j) => (
                                <th key={j} className="text-center px-2 py-3 font-bold text-gray-600 min-w-[120px]">{j}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {INSPECTEURS.map((insp) => (
                            <tr key={insp}>
                                <td className="px-3 py-3 font-semibold text-gray-800 whitespace-nowrap">{insp}</td>
                                {JOURS.map((j) => {
                                    const entries = PLANNING_DATA[insp]?.[j] || [];
                                    return (
                                        <td key={j} className="px-1 py-2 align-top">
                                            {entries.length > 0 ? (
                                                entries.map((e, i) => (
                                                    <div key={i} className={`px-2 py-1.5 rounded-lg border text-xs font-semibold mb-1 ${PRIORITY_COLORS[e.priorite]}`}>
                                                        {e.etab}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="h-8 flex items-center justify-center text-gray-300 hover:bg-gray-50 rounded-lg cursor-pointer">
                                                    <Plus className="w-3 h-3" />
                                                </div>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Suggestions */}
            <FieldCard title="🤖 Suggestions d'inspection">
                <div className="space-y-3">
                    {SUGGESTIONS.map((s, i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-gray-900">{s.nom}</span>
                                    <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs font-bold">{s.categorie}</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    Dernière : {s.derniereInspection} • {s.motif}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-right">
                                    <p className={`text-sm font-bold ${s.scoreRisque >= 80 ? 'text-red-600' : s.scoreRisque >= 60 ? 'text-orange-600' : 'text-green-600'}`}>
                                        {s.scoreRisque}/100
                                    </p>
                                    <p className="text-xs text-gray-400">risque</p>
                                </div>
                                <button className="px-3 py-1.5 bg-inspect-green/10 text-inspect-green rounded-lg text-xs font-bold hover:bg-inspect-green/20">
                                    Planifier →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </FieldCard>
        </div>
    );
}
