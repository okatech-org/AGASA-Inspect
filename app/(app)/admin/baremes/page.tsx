"use client";

import React, { useState } from 'react';
import { AlertTriangle, Save } from 'lucide-react';
import { BigButton } from '@/components/ui/BigButton';

const BAREME_DATA = [
    { code: 'INF-001', libelle: 'Détention/vente de produits périmés (DLC dépassée)', categorie: 'hygiene', min: 200000, max: 1000000, defaut: 500000, recidive: 1.5, reference: 'Art. 426-1', actif: true },
    { code: 'INF-002', libelle: "Absence d'Agrément Sanitaire", categorie: 'documentation', min: 500000, max: 2000000, defaut: 1000000, recidive: 2, reference: 'Art. 426-2', actif: true },
    { code: 'INF-003', libelle: "Non-respect conditions d'hygiène (Décret 0578/2015)", categorie: 'hygiene', min: 200000, max: 1000000, defaut: 500000, recidive: 1.5, reference: 'Décret 0578', actif: true },
    { code: 'INF-004', libelle: 'Refus désinfection matériel végétal', categorie: 'phytosanitaire', min: 100000, max: 500000, defaut: 250000, recidive: 1.5, reference: 'Art. 426-4', actif: true },
    { code: 'INF-005', libelle: 'Rupture documentée chaîne du froid', categorie: 'chaine_froid', min: 500000, max: 2000000, defaut: 1000000, recidive: 2, reference: 'Art. 426-5', actif: true },
    { code: 'INF-006', libelle: 'Menace/corruption envers agents AGASA', categorie: 'securite', min: 1000000, max: 4000000, defaut: 2500000, recidive: 2, reference: 'Art. 426-6', actif: true },
    { code: 'INF-007', libelle: 'Importation sans déclaration préalable', categorie: 'import', min: 500000, max: 2000000, defaut: 1000000, recidive: 2, reference: 'Art. 426-7', actif: true },
];

function formatFCFA(n: number) {
    return n.toLocaleString('fr-FR') + ' FCFA';
}

export default function BaremesPage() {
    const [data] = useState(BAREME_DATA);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h1 className="text-2xl font-extrabold text-gray-900">Barème des Amendes</h1>
                <BigButton icon={<Save className="w-5 h-5" />}>Sauvegarder</BigButton>
            </div>

            <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800">
                    <strong>Attention :</strong> Toute modification du barème génère un log d&apos;audit critique et une notification à tous les superviseurs.
                </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="text-left px-3 py-3 font-bold text-gray-600">Code</th>
                            <th className="text-left px-3 py-3 font-bold text-gray-600">Infraction</th>
                            <th className="text-left px-3 py-3 font-bold text-gray-600">Catégorie</th>
                            <th className="text-right px-3 py-3 font-bold text-gray-600">Min</th>
                            <th className="text-right px-3 py-3 font-bold text-gray-600">Max</th>
                            <th className="text-right px-3 py-3 font-bold text-gray-600">Défaut</th>
                            <th className="text-center px-3 py-3 font-bold text-gray-600">Récidive</th>
                            <th className="text-left px-3 py-3 font-bold text-gray-600">Référence</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.map((row) => (
                            <tr key={row.code} className="hover:bg-gray-50">
                                <td className="px-3 py-3 font-mono font-bold text-inspect-blue">{row.code}</td>
                                <td className="px-3 py-3 text-gray-900 max-w-[300px]">{row.libelle}</td>
                                <td className="px-3 py-3">
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-600 capitalize">{row.categorie.replace('_', ' ')}</span>
                                </td>
                                <td className="px-3 py-3 text-right font-mono text-gray-700">{formatFCFA(row.min)}</td>
                                <td className="px-3 py-3 text-right font-mono text-gray-700">{formatFCFA(row.max)}</td>
                                <td className="px-3 py-3 text-right font-mono font-bold text-inspect-orange">{formatFCFA(row.defaut)}</td>
                                <td className="px-3 py-3 text-center font-bold text-inspect-red">x{row.recidive}</td>
                                <td className="px-3 py-3 text-gray-600 text-xs">{row.reference}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
