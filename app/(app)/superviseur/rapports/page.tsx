"use client";

import React, { useState } from 'react';
import { FileBarChart, Download, Calendar } from 'lucide-react';
import { BigButton } from '@/components/ui/BigButton';
import { FieldCard } from '@/components/ui/FieldCard';

const REPORT_TYPES = [
    {
        id: 'hebdo',
        title: 'Rapport Hebdomadaire',
        description: 'Inspections réalisées, PV émis, amendes, taux conformité, couverture, performance par inspecteur.',
        format: 'PDF',
        icon: '📋',
    },
    {
        id: 'mensuel',
        title: 'Rapport Mensuel',
        description: 'Synthèse complète du mois avec graphiques inclus (conformité, activité, couverture).',
        format: 'PDF',
        icon: '📊',
    },
    {
        id: 'ponctuel',
        title: 'Rapport Ponctuel',
        description: 'Filtres personnalisés (période, inspecteur, catégorie, type). Tableau détaillé des inspections.',
        format: 'CSV + PDF',
        icon: '🔍',
    },
];

export default function RapportsPage() {
    const [selectedType, setSelectedType] = useState('hebdo');
    const [dateDebut, setDateDebut] = useState('2026-02-17');
    const [dateFin, setDateFin] = useState('2026-02-23');

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <FileBarChart className="w-7 h-7 text-inspect-blue" />
                <h1 className="text-2xl font-extrabold text-gray-900">Rapports d&apos;Activité</h1>
            </div>

            {/* Report type selector */}
            <div className="grid sm:grid-cols-3 gap-4">
                {REPORT_TYPES.map((rt) => (
                    <button
                        key={rt.id}
                        onClick={() => setSelectedType(rt.id)}
                        className={`text-left p-5 rounded-2xl border-2 transition-all ${selectedType === rt.id ? 'border-inspect-blue bg-blue-50' : 'border-gray-200 bg-white hover:bg-gray-50'
                            }`}
                    >
                        <span className="text-3xl">{rt.icon}</span>
                        <h3 className="font-bold text-gray-900 mt-2">{rt.title}</h3>
                        <p className="text-xs text-gray-600 mt-1">{rt.description}</p>
                        <span className="inline-block mt-2 px-2 py-0.5 bg-gray-100 rounded text-xs font-bold text-gray-500">{rt.format}</span>
                    </button>
                ))}
            </div>

            {/* Date range */}
            <FieldCard title="Période">
                <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <input type="date" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)}
                            className="h-12 px-4 border-2 border-gray-300 rounded-xl focus:border-inspect-green outline-none" />
                    </div>
                    <span className="font-bold text-gray-400">→</span>
                    <div className="flex items-center gap-2">
                        <input type="date" value={dateFin} onChange={(e) => setDateFin(e.target.value)}
                            className="h-12 px-4 border-2 border-gray-300 rounded-xl focus:border-inspect-green outline-none" />
                    </div>
                </div>
            </FieldCard>

            {/* Preview */}
            <FieldCard title={`Aperçu — ${REPORT_TYPES.find(r => r.id === selectedType)?.title}`}>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="text-center mb-6">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">AGASA — DICSP — Province de l&apos;Estuaire</p>
                        <p className="text-lg font-bold text-gray-900">{REPORT_TYPES.find(r => r.id === selectedType)?.title}</p>
                        <p className="text-sm text-gray-600">Période : {dateDebut} — {dateFin}</p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                        <div className="text-center"><p className="text-2xl font-extrabold text-inspect-green">42</p><p className="text-xs text-gray-500">Inspections</p></div>
                        <div className="text-center"><p className="text-2xl font-extrabold text-inspect-orange">12</p><p className="text-xs text-gray-500">PV émis</p></div>
                        <div className="text-center"><p className="text-2xl font-extrabold text-inspect-blue">73%</p><p className="text-xs text-gray-500">Conformité</p></div>
                        <div className="text-center"><p className="text-2xl font-extrabold text-gray-800">4.5M</p><p className="text-xs text-gray-500">FCFA amendes</p></div>
                    </div>
                </div>
            </FieldCard>

            {/* Export buttons */}
            <div className="flex gap-4">
                <BigButton icon={<Download className="w-5 h-5" />}>
                    Exporter en PDF
                </BigButton>
                {selectedType === 'ponctuel' && (
                    <BigButton variant="secondary" icon={<Download className="w-5 h-5" />}>
                        Exporter en CSV
                    </BigButton>
                )}
            </div>
        </div>
    );
}
