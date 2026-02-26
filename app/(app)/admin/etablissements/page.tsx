"use client";

import React, { useState } from 'react';
import { Search, Building2 } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';

const MOCK_ETABLISSEMENTS = [
    { id: '1', nom: 'Restaurant Le Palmier', categorie: 'AS_CAT_1', ville: 'Libreville', province: 'Estuaire', smiley: 4, dernierInspection: '20/02/2026', risque: 'bas', agrement: 'valide' },
    { id: '2', nom: 'Boucherie Centrale', categorie: 'AS_CAT_1', ville: 'Libreville', province: 'Estuaire', smiley: 2, dernierInspection: '15/01/2026', risque: 'eleve', agrement: 'expire' },
    { id: '3', nom: 'Épicerie Du Coin', categorie: 'AS_CAT_3', ville: 'Port-Gentil', province: 'Ogooué-Maritime', smiley: 5, dernierInspection: '10/02/2026', risque: 'bas', agrement: 'valide' },
    { id: '4', nom: 'Transport Froid Express', categorie: 'TRANSPORT', ville: 'Franceville', province: 'Haut-Ogooué', smiley: 3, dernierInspection: '05/02/2026', risque: 'moyen', agrement: 'valide' },
    { id: '5', nom: 'Abattoir Municipal', categorie: 'AS_CAT_1', ville: 'Oyem', province: 'Woleu-Ntem', smiley: 1, dernierInspection: '01/12/2025', risque: 'eleve', agrement: 'suspendu' },
    { id: '6', nom: 'Pâtisserie Belle Vue', categorie: 'AS_CAT_2', ville: 'Libreville', province: 'Estuaire', smiley: 4, dernierInspection: '18/02/2026', risque: 'bas', agrement: 'valide' },
];

const RISK_COLORS: Record<string, string> = { eleve: 'danger', moyen: 'warning', bas: 'success' };
const CAT_LABELS: Record<string, string> = { AS_CAT_1: 'CAT 1', AS_CAT_2: 'CAT 2', AS_CAT_3: 'CAT 3', TRANSPORT: 'Transport' };

function SmileyStars({ score }: { score: number }) {
    return <span className="text-lg">{'⭐'.repeat(score)}{'☆'.repeat(5 - score)}</span>;
}

export default function EtablissementsPage() {
    const [search, setSearch] = useState('');
    const filtered = MOCK_ETABLISSEMENTS.filter((e) =>
        !search || e.nom.toLowerCase().includes(search.toLowerCase()) || e.ville.toLowerCase().includes(search.toLowerCase())
    );

    const total = MOCK_ETABLISSEMENTS.length;
    const cat1 = MOCK_ETABLISSEMENTS.filter(e => e.categorie === 'AS_CAT_1').length;
    const cat2 = MOCK_ETABLISSEMENTS.filter(e => e.categorie === 'AS_CAT_2').length;
    const cat3 = MOCK_ETABLISSEMENTS.filter(e => e.categorie === 'AS_CAT_3').length;
    const transport = MOCK_ETABLISSEMENTS.filter(e => e.categorie === 'TRANSPORT').length;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-extrabold text-gray-900">Établissements</h1>
            <div className="flex gap-3 text-sm font-semibold flex-wrap">
                <span className="px-3 py-1.5 bg-gray-100 rounded-full">{total} total</span>
                <span className="px-3 py-1.5 bg-red-100 text-red-700 rounded-full">{cat1} CAT 1</span>
                <span className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full">{cat2} CAT 2</span>
                <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full">{cat3} CAT 3</span>
                <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full">{transport} Transport</span>
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" placeholder="Rechercher par nom ou ville..." value={search} onChange={(e) => setSearch(e.target.value)}
                    className="w-full h-12 pl-10 pr-4 border-2 border-gray-300 rounded-xl focus:border-inspect-green outline-none text-base" />
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="text-left px-4 py-3 font-bold text-gray-600">Nom</th>
                            <th className="text-left px-4 py-3 font-bold text-gray-600">Catégorie</th>
                            <th className="text-left px-4 py-3 font-bold text-gray-600">Ville</th>
                            <th className="text-left px-4 py-3 font-bold text-gray-600">Province</th>
                            <th className="text-left px-4 py-3 font-bold text-gray-600">Smiley</th>
                            <th className="text-left px-4 py-3 font-bold text-gray-600">Dernière inspection</th>
                            <th className="text-left px-4 py-3 font-bold text-gray-600">Risque</th>
                            <th className="text-left px-4 py-3 font-bold text-gray-600">Agrément</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filtered.map((e) => (
                            <tr key={e.id} className="hover:bg-gray-50 cursor-pointer">
                                <td className="px-4 py-3 font-semibold text-gray-900 flex items-center gap-2">
                                    <Building2 className="w-4 h-4 text-gray-400 flex-shrink-0" /> {e.nom}
                                </td>
                                <td className="px-4 py-3"><span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-bold">{CAT_LABELS[e.categorie]}</span></td>
                                <td className="px-4 py-3 text-gray-700">{e.ville}</td>
                                <td className="px-4 py-3 text-gray-700">{e.province}</td>
                                <td className="px-4 py-3"><SmileyStars score={e.smiley} /></td>
                                <td className="px-4 py-3 text-gray-600 text-xs">{e.dernierInspection}</td>
                                <td className="px-4 py-3"><StatusBadge status={RISK_COLORS[e.risque] as 'danger' | 'warning' | 'success'} label={e.risque.charAt(0).toUpperCase() + e.risque.slice(1)} /></td>
                                <td className="px-4 py-3"><StatusBadge status={e.agrement === 'valide' ? 'success' : e.agrement === 'expire' ? 'warning' : 'danger'} label={e.agrement.charAt(0).toUpperCase() + e.agrement.slice(1)} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
