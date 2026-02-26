"use client";

import React, { useState } from 'react';
import { Wrench, Trash2, RefreshCw, Database } from 'lucide-react';
import { BigButton } from '@/components/ui/BigButton';
import { FieldCard } from '@/components/ui/FieldCard';

export default function MaintenancePage() {
    const [maintenanceMode, setMaintenanceMode] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <Wrench className="w-7 h-7 text-gray-600" />
                <h1 className="text-2xl font-extrabold text-gray-900">Maintenance</h1>
            </div>

            {/* Stats */}
            <div className="grid sm:grid-cols-4 gap-4">
                <FieldCard title="Inspections">
                    <p className="text-3xl font-extrabold text-gray-900">1 247</p>
                    <p className="text-sm text-gray-500">total depuis le lancement</p>
                </FieldCard>
                <FieldCard title="PV">
                    <p className="text-3xl font-extrabold text-gray-900">342</p>
                    <p className="text-sm text-gray-500">procès-verbaux générés</p>
                </FieldCard>
                <FieldCard title="Photos">
                    <p className="text-3xl font-extrabold text-gray-900">4 863</p>
                    <p className="text-sm text-gray-500">photos d&apos;inspection</p>
                </FieldCard>
                <FieldCard title="Stockage">
                    <p className="text-3xl font-extrabold text-gray-900">12.3 Go</p>
                    <p className="text-sm text-gray-500">espace utilisé</p>
                </FieldCard>
            </div>

            {/* Actions */}
            <div className="space-y-4">
                <FieldCard title="Nettoyage">
                    <p className="text-sm text-gray-600 mb-4">Supprimer les brouillons d&apos;inspection abandonnés depuis plus de 30 jours.</p>
                    <BigButton variant="warning" icon={<Trash2 className="w-5 h-5" />}>
                        Nettoyer les brouillons ({'>'}30j)
                    </BigButton>
                </FieldCard>

                <FieldCard title="Mode maintenance">
                    <p className="text-sm text-gray-600 mb-4">
                        Bloque l&apos;accès pour tous les utilisateurs non-admin. Utilisez ce mode pour des opérations de maintenance critiques.
                    </p>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setMaintenanceMode(!maintenanceMode)}
                            className={`w-16 h-9 rounded-full transition-colors ${maintenanceMode ? 'bg-inspect-red' : 'bg-gray-300'}`}
                        >
                            <div className={`w-7 h-7 bg-white rounded-full shadow transition-transform mx-1 ${maintenanceMode ? 'translate-x-7' : ''}`} />
                        </button>
                        <span className={`font-bold ${maintenanceMode ? 'text-inspect-red' : 'text-gray-500'}`}>
                            {maintenanceMode ? 'MAINTENANCE ACTIVE' : 'Désactivé'}
                        </span>
                    </div>
                </FieldCard>

                <FieldCard title="Données de démonstration">
                    <p className="text-sm text-gray-600 mb-4">Réinitialiser toutes les données de démonstration aux valeurs par défaut.</p>
                    <BigButton variant="danger" icon={<RefreshCw className="w-5 h-5" />}>
                        Réinitialiser les données de démo
                    </BigButton>
                </FieldCard>

                <FieldCard title="Sauvegarde">
                    <p className="text-sm text-gray-600 mb-4">Déclencher une sauvegarde manuelle de toutes les données.</p>
                    <BigButton variant="secondary" icon={<Database className="w-5 h-5" />}>
                        Lancer une sauvegarde manuelle
                    </BigButton>
                </FieldCard>
            </div>
        </div>
    );
}
