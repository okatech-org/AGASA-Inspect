"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Search } from 'lucide-react';
import { BigButton } from '@/components/ui/BigButton';
import { StatusBadge } from '@/components/ui/StatusBadge';

const MOCK_USERS = [
    { id: '1', matricule: 'INSP-2026-0001', nom: 'MOUSSAVOU', prenom: 'Jean-Pierre', role: 'inspecteur', province: 'Estuaire', statut: 'actif', derniereConnexion: '26/02/2026 08:30', derniereSync: '26/02/2026 08:32' },
    { id: '2', matricule: 'INSP-2026-0002', nom: 'NZÉ', prenom: 'Marie-Claire', role: 'superviseur', province: 'Estuaire', statut: 'actif', derniereConnexion: '26/02/2026 07:45', derniereSync: '26/02/2026 07:50' },
    { id: '3', matricule: 'INSP-2026-0003', nom: 'ONDO', prenom: 'François', role: 'inspecteur', province: 'Haut-Ogooué', statut: 'actif', derniereConnexion: '25/02/2026 17:00', derniereSync: '25/02/2026 17:05' },
    { id: '4', matricule: 'INSP-2026-0004', nom: 'MBA', prenom: 'Sylvie', role: 'inspecteur', province: 'Ogooué-Maritime', statut: 'verrouille', derniereConnexion: '24/02/2026 09:15', derniereSync: '24/02/2026 09:20' },
    { id: '5', matricule: 'ADMIN-SYS-001', nom: 'OBIANG', prenom: 'Paul', role: 'admin_systeme', province: 'Toutes', statut: 'actif', derniereConnexion: '26/02/2026 09:00', derniereSync: '—' },
    { id: '6', matricule: 'INSP-2026-0005', nom: 'NDONG', prenom: 'Alain', role: 'inspecteur', province: 'Woleu-Ntem', statut: 'inactif', derniereConnexion: '10/01/2026 12:00', derniereSync: '10/01/2026 12:05' },
];

const ROLE_BADGES: Record<string, { label: string; variant: string }> = {
    admin_systeme: { label: 'Admin', variant: 'warning' },
    superviseur: { label: 'Superviseur', variant: 'info' },
    inspecteur: { label: 'Inspecteur', variant: 'success' },
};

export default function UtilisateursPage() {
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('tous');
    const [statutFilter, setStatutFilter] = useState('tous');

    const filtered = MOCK_USERS.filter((u) => {
        const matchSearch = !search || u.nom.toLowerCase().includes(search.toLowerCase()) || u.prenom.toLowerCase().includes(search.toLowerCase()) || u.matricule.toLowerCase().includes(search.toLowerCase());
        const matchRole = roleFilter === 'tous' || u.role === roleFilter;
        const matchStatut = statutFilter === 'tous' || u.statut === statutFilter;
        return matchSearch && matchRole && matchStatut;
    });

    const actifs = MOCK_USERS.filter(u => u.statut === 'actif').length;
    const verrouilles = MOCK_USERS.filter(u => u.statut === 'verrouille').length;
    const inactifs = MOCK_USERS.filter(u => u.statut === 'inactif').length;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h1 className="text-2xl font-extrabold text-gray-900">Gestion des Utilisateurs</h1>
                <Link href="/admin/utilisateurs/nouveau">
                    <BigButton icon={<Plus className="w-5 h-5" />}>Nouvel utilisateur</BigButton>
                </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-4 text-sm font-semibold">
                <span className="px-3 py-1.5 bg-green-100 text-green-800 rounded-full">{actifs} actifs</span>
                <span className="px-3 py-1.5 bg-red-100 text-red-800 rounded-full">{verrouilles} verrouillés</span>
                <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full">{inactifs} inactifs</span>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Rechercher par nom ou matricule..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full h-12 pl-10 pr-4 border-2 border-gray-300 rounded-xl focus:border-inspect-green outline-none text-base"
                    />
                </div>
                <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="h-12 px-4 border-2 border-gray-300 rounded-xl bg-white text-base">
                    <option value="tous">Tous les rôles</option>
                    <option value="admin_systeme">Admin</option>
                    <option value="superviseur">Superviseur</option>
                    <option value="inspecteur">Inspecteur</option>
                </select>
                <select value={statutFilter} onChange={(e) => setStatutFilter(e.target.value)} className="h-12 px-4 border-2 border-gray-300 rounded-xl bg-white text-base">
                    <option value="tous">Tous statuts</option>
                    <option value="actif">Actif</option>
                    <option value="verrouille">Verrouillé</option>
                    <option value="inactif">Inactif</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="text-left px-4 py-3 font-bold text-gray-600">Matricule</th>
                            <th className="text-left px-4 py-3 font-bold text-gray-600">Nom / Prénom</th>
                            <th className="text-left px-4 py-3 font-bold text-gray-600">Rôle</th>
                            <th className="text-left px-4 py-3 font-bold text-gray-600">Province</th>
                            <th className="text-left px-4 py-3 font-bold text-gray-600">Statut</th>
                            <th className="text-left px-4 py-3 font-bold text-gray-600">Dernière connexion</th>
                            <th className="text-left px-4 py-3 font-bold text-gray-600">Dernière sync</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filtered.map((user) => {
                            const rb = ROLE_BADGES[user.role] || { label: user.role, variant: 'default' };
                            return (
                                <tr key={user.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => { }}>
                                    <td className="px-4 py-3 font-mono font-bold text-gray-800">{user.matricule}</td>
                                    <td className="px-4 py-3 font-semibold text-gray-900">{user.nom} {user.prenom}</td>
                                    <td className="px-4 py-3"><StatusBadge status={rb.variant as 'success' | 'warning' | 'info'} label={rb.label} /></td>
                                    <td className="px-4 py-3 text-gray-700">{user.province}</td>
                                    <td className="px-4 py-3">
                                        <StatusBadge
                                            status={user.statut === 'actif' ? 'success' : user.statut === 'verrouille' ? 'danger' : 'default'}
                                            label={user.statut === 'verrouille' ? 'Verrouillé' : user.statut.charAt(0).toUpperCase() + user.statut.slice(1)}
                                        />
                                    </td>
                                    <td className="px-4 py-3 text-gray-600 text-xs">{user.derniereConnexion}</td>
                                    <td className="px-4 py-3 text-gray-600 text-xs">{user.derniereSync}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {filtered.length === 0 && (
                    <div className="text-center py-12 text-gray-500">Aucun utilisateur trouvé</div>
                )}
            </div>
        </div>
    );
}
