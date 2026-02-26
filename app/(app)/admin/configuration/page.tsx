"use client";

import React, { useState } from 'react';
import { Settings, Save, Shield, ClipboardCheck, RefreshCw, Bell } from 'lucide-react';
import { BigButton } from '@/components/ui/BigButton';

const TABS = [
    { id: 'securite', label: 'Sécurité', icon: <Shield className="w-4 h-4" /> },
    { id: 'inspection', label: 'Inspection', icon: <ClipboardCheck className="w-4 h-4" /> },
    { id: 'sync', label: 'Synchronisation', icon: <RefreshCw className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
];

function ConfigField({ label, value, unit, description }: { label: string; value: string | number; unit?: string; description?: string }) {
    return (
        <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
            <div>
                <p className="font-semibold text-gray-900">{label}</p>
                {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
            </div>
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    defaultValue={String(value)}
                    className="w-20 h-10 px-3 text-center border-2 border-gray-300 rounded-lg focus:border-inspect-green outline-none font-mono font-bold"
                />
                {unit && <span className="text-sm text-gray-500">{unit}</span>}
            </div>
        </div>
    );
}

function ToggleField({ label, defaultChecked, description }: { label: string; defaultChecked: boolean; description?: string }) {
    const [checked, setChecked] = useState(defaultChecked);
    return (
        <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
            <div>
                <p className="font-semibold text-gray-900">{label}</p>
                {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
            </div>
            <button
                onClick={() => setChecked(!checked)}
                className={`w-14 h-8 rounded-full transition-colors ${checked ? 'bg-inspect-green' : 'bg-gray-300'}`}
            >
                <div className={`w-6 h-6 bg-white rounded-full shadow transition-transform mx-1 ${checked ? 'translate-x-6' : ''}`} />
            </button>
        </div>
    );
}

export default function ConfigurationPage() {
    const [activeTab, setActiveTab] = useState('securite');

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                    <Settings className="w-7 h-7 text-gray-600" />
                    <h1 className="text-2xl font-extrabold text-gray-900">Configuration Système</h1>
                </div>
                <BigButton icon={<Save className="w-5 h-5" />}>Sauvegarder</BigButton>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-gray-200 pb-0 overflow-x-auto">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-5 py-3 rounded-t-xl font-bold text-sm transition-colors whitespace-nowrap ${activeTab === tab.id ? 'bg-white border-2 border-b-0 border-gray-200 text-inspect-green' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab content */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
                {activeTab === 'securite' && (
                    <div>
                        <ConfigField label="Durée session max" value={12} unit="heures" />
                        <ConfigField label="Tentatives connexion max" value={5} />
                        <ConfigField label="Durée verrouillage PIN" value={5} unit="minutes" />
                        <ConfigField label="Longueur PIN" value={4} unit="chiffres" description="4 ou 6 chiffres" />
                        <ToggleField label="Complexité mot de passe" defaultChecked={true} description="Min 8 car., majuscule, chiffre requis" />
                    </div>
                )}
                {activeTab === 'inspection' && (
                    <div>
                        <ConfigField label="Délai conformité par défaut" value={30} unit="jours" />
                        <ConfigField label="Score Smiley min pour allègement" value={4} />
                        <ConfigField label="Fréquence inspection CAT 1" value={3} unit="mois" />
                        <ConfigField label="Fréquence inspection CAT 2" value={6} unit="mois" />
                        <ConfigField label="Fréquence inspection CAT 3" value={12} unit="mois" />
                        <ConfigField label="Durée max inspection" value={60} unit="minutes" description="Alerte si dépassée" />
                    </div>
                )}
                {activeTab === 'sync' && (
                    <div>
                        <ConfigField label="Intervalle sync auto" value={5} unit="minutes" description="Quand en ligne" />
                        <ConfigField label="Taille max batch sync" value={10} unit="Mo" />
                        <ConfigField label="Timeout sync" value={30} unit="secondes" />
                        <ConfigField label="Tentatives max" value={3} description="Avant report" />
                        <div className="py-4 border-b border-gray-100">
                            <p className="font-semibold text-gray-900 mb-2">Priorité sync</p>
                            <p className="text-sm text-gray-600">PV → Inspections → Photos → Autres</p>
                        </div>
                    </div>
                )}
                {activeTab === 'notifications' && (
                    <div>
                        <ToggleField label="SMS contrevenant après PV" defaultChecked={true} />
                        <ToggleField label="Relance automatique J+15" defaultChecked={true} />
                        <ToggleField label="Transmission Trésor J+30" defaultChecked={true} />
                        <ToggleField label="Notification superviseur si PV > 2M FCFA" defaultChecked={true} />
                    </div>
                )}
            </div>
        </div>
    );
}
