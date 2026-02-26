"use client";

import React from 'react';
import Link from 'next/link';
import { FileText, Lock } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';

const MOCK_PV = [
    { id: '1', ref: 'PV-2026-000089', etab: 'Boucherie Centrale', date: '26/02/2026', montant: 1250000, statut: 'brouillon' as const, verrouille: false },
    { id: '2', ref: 'PV-2026-000088', etab: 'Transport Froid Express', date: '25/02/2026', montant: 1000000, statut: 'en_cours' as const, verrouille: false },
    { id: '3', ref: 'PV-2026-000087', etab: 'Abattoir Municipal', date: '22/02/2026', montant: 500000, statut: 'validee' as const, verrouille: true },
    { id: '4', ref: 'PV-2026-000086', etab: 'Épicerie Du Coin', date: '18/02/2026', montant: 250000, statut: 'validee' as const, verrouille: true },
    { id: '5', ref: 'PV-2026-000085', etab: 'Grillade Express', date: '14/02/2026', montant: 2500000, statut: 'synchronisee' as const, verrouille: true },
];

function formatFCFA(n: number) { return n.toLocaleString('fr-FR') + ' FCFA'; }

export default function PVListPage() {
    const totalMontant = MOCK_PV.reduce((s, p) => s + p.montant, 0);
    const pvValides = MOCK_PV.filter(p => p.verrouille).length;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-extrabold text-gray-900">Procès-Verbaux</h1>

            <div className="flex gap-4 text-sm font-semibold flex-wrap">
                <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full">{MOCK_PV.length} total</span>
                <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full">{pvValides} verrouillés</span>
                <span className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full">{formatFCFA(totalMontant)}</span>
            </div>

            <div className="space-y-3">
                {MOCK_PV.map((pv) => (
                    <Link key={pv.id} href="/pv/nouveau" className="block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <FileText className="w-5 h-5 text-inspect-red" />
                                    <span className="font-mono text-sm font-bold text-gray-700">{pv.ref}</span>
                                    {pv.verrouille && <Lock className="w-4 h-4 text-gray-400" />}
                                </div>
                                <p className="font-bold text-gray-900">{pv.etab}</p>
                                <p className="text-sm text-gray-500">{pv.date}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-extrabold text-inspect-red">{formatFCFA(pv.montant)}</p>
                                <StatusBadge status={pv.statut} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
