"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Plus, Calendar, CheckCircle, ArrowRight } from 'lucide-react';
import { BigButton } from '@/components/ui/BigButton';
import { StatusBadge } from '@/components/ui/StatusBadge';

const PLANNED_INSPECTIONS = [
    { id: 'p1', nom: 'Restaurant Le Palmier', categorie: 'CAT 1', adresse: 'Quartier Louis, Libreville', type: 'Programmée', priorite: 'normale' },
    { id: 'p2', nom: 'Boucherie Centrale', categorie: 'CAT 1', adresse: 'Marché Mont-Bouet, Libreville', type: 'Renouvellement', priorite: 'urgente' },
    { id: 'p3', nom: 'Transport Froid Express', categorie: 'Transport', adresse: 'Zone Industrielle Oloumi', type: 'Suite signalement', priorite: 'haute' },
];

const ALL_ETABLISSEMENTS = [
    { id: 'e1', nom: 'Restaurant Le Palmier', categorie: 'CAT 1', adresse: 'Quartier Louis', smiley: 4, derniereInspection: '20/02/2026' },
    { id: 'e2', nom: 'Boucherie Centrale', categorie: 'CAT 1', adresse: 'Marché Mont-Bouet', smiley: 2, derniereInspection: '15/01/2026' },
    { id: 'e3', nom: 'Épicerie Du Coin', categorie: 'CAT 3', adresse: 'PK5 Libreville', smiley: 5, derniereInspection: '10/02/2026' },
    { id: 'e4', nom: 'Pâtisserie Belle Vue', categorie: 'CAT 2', adresse: 'Boulevard Triomphal', smiley: 4, derniereInspection: '18/02/2026' },
    { id: 'e5', nom: 'Abattoir Municipal', categorie: 'CAT 1', adresse: 'Ntoum', smiley: 1, derniereInspection: '01/12/2025' },
];

const PRIORITY_COLORS: Record<string, string> = {
    urgente: 'border-red-500 bg-red-50',
    haute: 'border-orange-400 bg-orange-50',
    normale: 'border-blue-400 bg-blue-50',
    basse: 'border-gray-300 bg-gray-50',
};

type TabMode = 'planifiee' | 'recherche' | 'nouveau';

export default function NouvelleInspectionPage() {
    const router = useRouter();
    const [tab, setTab] = useState<TabMode>('planifiee');
    const [search, setSearch] = useState('');
    const [selectedEtab, setSelectedEtab] = useState<string | null>(null);

    const filteredEtabs = ALL_ETABLISSEMENTS.filter(
        (e) => !search || e.nom.toLowerCase().includes(search.toLowerCase()) || e.adresse.toLowerCase().includes(search.toLowerCase())
    );

    const selected = ALL_ETABLISSEMENTS.find(e => e.id === selectedEtab) || PLANNED_INSPECTIONS.find(p => p.id === selectedEtab);

    const handleStartInspection = () => {
        router.push('/inspections/en-cours');
    };

    // Fiche résumé after selection
    if (selectedEtab && selected) {
        const etab = 'smiley' in selected ? selected : null;
        return (
            <div className="space-y-6 max-w-lg mx-auto">
                <h1 className="text-2xl font-extrabold text-gray-900 text-center">Fiche Établissement</h1>
                <div className="bg-white rounded-2xl border-2 border-inspect-green p-6 space-y-4">
                    <h2 className="text-xl font-bold text-gray-900">{selected.nom}</h2>
                    <div className="flex gap-2 text-sm">
                        <span className="px-2 py-1 bg-gray-100 rounded-full font-bold">{selected.categorie}</span>
                        {'adresse' in selected && <span className="text-gray-500">{selected.adresse}</span>}
                    </div>
                    {etab && (
                        <>
                            <div className="flex items-center gap-2">
                                <span className="text-lg">{'⭐'.repeat(etab.smiley)}{'☆'.repeat(5 - etab.smiley)}</span>
                                <span className="text-sm text-gray-500">Smiley actuel</span>
                            </div>
                            <div className="text-sm text-gray-600">
                                <p>Dernière inspection : {etab.derniereInspection}</p>
                            </div>
                        </>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-green-700 font-semibold">Agrément valide</span>
                    </div>
                </div>
                <BigButton onClick={handleStartInspection} className="w-full text-lg h-16">
                    ▶️ DÉMARRER L&apos;INSPECTION
                </BigButton>
                <button onClick={() => setSelectedEtab(null)} className="w-full text-center text-gray-500 font-semibold py-2">
                    ← Changer d&apos;établissement
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-extrabold text-gray-900">Nouvelle Inspection</h1>

            {/* Tab selector */}
            <div className="flex gap-2 overflow-x-auto pb-1">
                {[
                    { id: 'planifiee' as TabMode, label: '📋 Planifiée', icon: <Calendar className="w-4 h-4" /> },
                    { id: 'recherche' as TabMode, label: '🔍 Recherche', icon: <Search className="w-4 h-4" /> },
                    { id: 'nouveau' as TabMode, label: '➕ Nouveau', icon: <Plus className="w-4 h-4" /> },
                ].map((t) => (
                    <button
                        key={t.id}
                        onClick={() => setTab(t.id)}
                        className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-colors ${tab === t.id ? 'bg-inspect-green text-white' : 'bg-white border-2 border-gray-200 text-gray-700'
                            }`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Planned inspections */}
            {tab === 'planifiee' && (
                <div className="space-y-3">
                    <p className="text-sm text-gray-500 font-semibold">Inspections planifiées pour aujourd&apos;hui</p>
                    {PLANNED_INSPECTIONS.map((insp) => (
                        <button
                            key={insp.id}
                            onClick={() => setSelectedEtab(insp.id)}
                            className={`w-full text-left bg-white rounded-xl border-l-4 p-5 shadow-terrain hover:shadow-md transition-shadow ${PRIORITY_COLORS[insp.priorite]}`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-gray-900 text-lg">{insp.nom}</p>
                                    <p className="text-sm text-gray-600">{insp.adresse}</p>
                                    <div className="flex gap-2 mt-2">
                                        <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-bold">{insp.categorie}</span>
                                        <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-bold">{insp.type}</span>
                                        <StatusBadge status={insp.priorite === 'urgente' ? 'danger' : insp.priorite === 'haute' ? 'warning' : 'info'} label={insp.priorite} />
                                    </div>
                                </div>
                                <ArrowRight className="w-6 h-6 text-gray-400 flex-shrink-0" />
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {/* Search */}
            {tab === 'recherche' && (
                <div className="space-y-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Rechercher par nom ou adresse..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full h-14 pl-12 pr-4 border-2 border-gray-300 rounded-xl focus:border-inspect-green outline-none text-lg"
                        />
                    </div>
                    <div className="space-y-3">
                        {filteredEtabs.map((e) => (
                            <button
                                key={e.id}
                                onClick={() => setSelectedEtab(e.id)}
                                className="w-full text-left bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-bold text-gray-900">{e.nom}</p>
                                        <p className="text-sm text-gray-600">{e.adresse}</p>
                                        <div className="flex items-center gap-3 mt-2">
                                            <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-bold">{e.categorie}</span>
                                            <span className="text-sm">{'⭐'.repeat(e.smiley)}</span>
                                            <span className="text-xs text-gray-500">Dernière : {e.derniereInspection}</span>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-6 h-6 text-gray-400 flex-shrink-0" />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* New establishment */}
            {tab === 'nouveau' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
                    <p className="text-sm text-gray-500">L&apos;établissement sera créé et synchronisé avec AGASA-Core.</p>
                    <input placeholder="Nom de l'établissement *" className="w-full h-14 px-4 border-2 border-gray-300 rounded-xl text-lg focus:border-inspect-green outline-none" />
                    <select className="w-full h-14 px-4 border-2 border-gray-300 rounded-xl text-lg bg-white">
                        <option>Type d&apos;activité</option>
                        <option>🍽️ Restauration</option>
                        <option>🥩 Boucherie / Abattoir</option>
                        <option>🏪 Épicerie / Supermarché</option>
                        <option>🚚 Transport alimentaire</option>
                        <option>🏭 Industrie agro-alimentaire</option>
                    </select>
                    <input placeholder="Adresse" className="w-full h-14 px-4 border-2 border-gray-300 rounded-xl text-lg focus:border-inspect-green outline-none" />
                    <select className="w-full h-14 px-4 border-2 border-gray-300 rounded-xl text-lg bg-white">
                        <option>Catégorie</option>
                        <option>AS CAT 1 — Risque Élevé</option>
                        <option>AS CAT 2 — Risque Modéré</option>
                        <option>AS CAT 3 — Risque Bas</option>
                        <option>Transport</option>
                    </select>
                    <input placeholder="Nom du responsable" className="w-full h-14 px-4 border-2 border-gray-300 rounded-xl text-lg focus:border-inspect-green outline-none" />
                    <input placeholder="Téléphone" type="tel" className="w-full h-14 px-4 border-2 border-gray-300 rounded-xl text-lg focus:border-inspect-green outline-none" />
                    <BigButton className="w-full h-16 text-lg">
                        Créer et démarrer l&apos;inspection →
                    </BigButton>
                </div>
            )}
        </div>
    );
}
