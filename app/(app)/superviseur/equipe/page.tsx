"use client";

import React from 'react';
import { Users, Wifi, WifiOff } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';

const MOCK_TEAM = [
    { id: '1', nom: 'MOUSSAVOU', prenom: 'Jean-Pierre', matricule: 'INSP-2026-0001', statutAuj: 'en_mission', inspectionsMois: 18, pvMois: 5, tauxSync: 98, derniereConnexion: '26/02 08:30', online: true },
    { id: '2', nom: 'ONDO', prenom: 'François', matricule: 'INSP-2026-0003', statutAuj: 'en_mission', inspectionsMois: 14, pvMois: 3, tauxSync: 85, derniereConnexion: '25/02 17:00', online: false },
    { id: '3', nom: 'NDONG', prenom: 'Alain', matricule: 'INSP-2026-0005', statutAuj: 'au_bureau', inspectionsMois: 12, pvMois: 4, tauxSync: 100, derniereConnexion: '26/02 09:00', online: true },
    { id: '4', nom: 'MBA', prenom: 'Sylvie', matricule: 'INSP-2026-0004', statutAuj: 'absent', inspectionsMois: 10, pvMois: 2, tauxSync: 60, derniereConnexion: '24/02 09:15', online: false },
    { id: '5', nom: 'EYENE', prenom: 'Robert', matricule: 'INSP-2026-0006', statutAuj: 'en_mission', inspectionsMois: 8, pvMois: 2, tauxSync: 95, derniereConnexion: '26/02 08:00', online: true },
    { id: '6', nom: 'OBAME', prenom: 'Christian', matricule: 'INSP-2026-0007', statutAuj: 'en_mission', inspectionsMois: 6, pvMois: 1, tauxSync: 92, derniereConnexion: '26/02 07:30', online: true },
];

const STATUT_LABELS: Record<string, { label: string; status: 'success' | 'info' | 'default' }> = {
    en_mission: { label: 'En mission', status: 'success' },
    au_bureau: { label: 'Au bureau', status: 'info' },
    absent: { label: 'Absent', status: 'default' },
};

export default function EquipePage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <Users className="w-7 h-7 text-inspect-blue" />
                <h1 className="text-2xl font-extrabold text-gray-900">Mon Équipe — Province de l&apos;Estuaire</h1>
            </div>

            <div className="flex gap-4 text-sm font-semibold">
                <span className="px-3 py-1.5 bg-green-100 text-green-800 rounded-full">{MOCK_TEAM.filter(t => t.statutAuj === 'en_mission').length} en mission</span>
                <span className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full">{MOCK_TEAM.filter(t => t.statutAuj === 'au_bureau').length} au bureau</span>
                <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full">{MOCK_TEAM.filter(t => t.statutAuj === 'absent').length} absents</span>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="text-left px-4 py-3 font-bold text-gray-600">Inspecteur</th>
                            <th className="text-left px-4 py-3 font-bold text-gray-600">Matricule</th>
                            <th className="text-left px-4 py-3 font-bold text-gray-600">Statut</th>
                            <th className="text-center px-4 py-3 font-bold text-gray-600">Inspections</th>
                            <th className="text-center px-4 py-3 font-bold text-gray-600">PV</th>
                            <th className="text-center px-4 py-3 font-bold text-gray-600">Sync</th>
                            <th className="text-left px-4 py-3 font-bold text-gray-600">Dernière co.</th>
                            <th className="text-center px-4 py-3 font-bold text-gray-600">En ligne</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {MOCK_TEAM.map((m) => {
                            const s = STATUT_LABELS[m.statutAuj];
                            return (
                                <tr key={m.id} className="hover:bg-gray-50 cursor-pointer">
                                    <td className="px-4 py-3 font-semibold text-gray-900">{m.nom} {m.prenom}</td>
                                    <td className="px-4 py-3 font-mono text-gray-700">{m.matricule}</td>
                                    <td className="px-4 py-3"><StatusBadge status={s.status} label={s.label} /></td>
                                    <td className="px-4 py-3 text-center font-bold text-gray-800">{m.inspectionsMois}</td>
                                    <td className="px-4 py-3 text-center font-bold text-gray-800">{m.pvMois}</td>
                                    <td className="px-4 py-3 text-center">
                                        <span className={`font-bold ${m.tauxSync >= 90 ? 'text-green-600' : m.tauxSync >= 70 ? 'text-orange-600' : 'text-red-600'}`}>
                                            {m.tauxSync}%
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-gray-600 text-xs">{m.derniereConnexion}</td>
                                    <td className="px-4 py-3 text-center">
                                        {m.online ? <Wifi className="w-4 h-4 text-green-500 mx-auto" /> : <WifiOff className="w-4 h-4 text-red-400 mx-auto" />}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
