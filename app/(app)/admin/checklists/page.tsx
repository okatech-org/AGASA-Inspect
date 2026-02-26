"use client";

import React from 'react';
import Link from 'next/link';
import { ClipboardCheck, Eye, Copy } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';

const MOCK_CHECKLISTS = [
    { id: '1', nom: 'Grille AS CAT 1 — Risque Élevé', categorie: 'AS_CAT_1', version: '2.1', sections: 7, points: 45, actif: true, modifie: '15/01/2026' },
    { id: '2', nom: 'Grille AS CAT 2 — Risque Modéré', categorie: 'AS_CAT_2', version: '2.0', sections: 5, points: 30, actif: true, modifie: '12/01/2026' },
    { id: '3', nom: 'Grille AS CAT 3 — Risque Bas', categorie: 'AS_CAT_3', version: '1.5', sections: 4, points: 20, actif: true, modifie: '10/01/2026' },
    { id: '4', nom: 'Grille Transport Alimentaire', categorie: 'TRANSPORT', version: '1.0', sections: 3, points: 18, actif: true, modifie: '08/01/2026' },
];

export default function ChecklistsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-extrabold text-gray-900">Grilles d&apos;Inspection</h1>
            <p className="text-gray-600">Gérez les checklists normalisées utilisées par les inspecteurs terrain.</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {MOCK_CHECKLISTS.map((cl) => (
                    <div key={cl.id} className="bg-white rounded-2xl border-2 border-gray-100 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-2 mb-3">
                            <ClipboardCheck className="w-6 h-6 text-inspect-green" />
                            <StatusBadge status={cl.actif ? 'success' : 'default'} label={cl.actif ? 'Active' : 'Inactive'} />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">{cl.nom}</h3>
                        <div className="text-xs text-gray-500 space-y-1 mb-4">
                            <p>Version : {cl.version}</p>
                            <p>{cl.sections} sections • {cl.points} points de contrôle</p>
                            <p>Modifiée le {cl.modifie}</p>
                        </div>
                        <div className="flex gap-2">
                            <Link
                                href={`/admin/checklists/${cl.id}`}
                                className="flex items-center gap-1 px-3 py-2 bg-inspect-green/10 text-inspect-green rounded-lg text-xs font-bold hover:bg-inspect-green/20"
                            >
                                <Eye className="w-3.5 h-3.5" /> Voir/Modifier
                            </Link>
                            <button className="flex items-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-bold hover:bg-gray-200">
                                <Copy className="w-3.5 h-3.5" /> Dupliquer
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
