"use client";

import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw, Database, Trash2, Check, AlertTriangle } from 'lucide-react';
import { FieldCard } from '@/components/ui/FieldCard';

export default function SyncPage() {
    const [isOnline, setIsOnline] = useState(true);
    const [syncing, setSyncing] = useState(false);
    const [syncProgress, setSyncProgress] = useState(0);
    const [lastSync, setLastSync] = useState('26/02/2026 08:32');

    useEffect(() => {
        setIsOnline(navigator.onLine);
        const goOnline = () => setIsOnline(true);
        const goOffline = () => setIsOnline(false);
        window.addEventListener('online', goOnline);
        window.addEventListener('offline', goOffline);
        return () => {
            window.removeEventListener('online', goOnline);
            window.removeEventListener('offline', goOffline);
        };
    }, []);

    const handleSync = async () => {
        setSyncing(true);
        setSyncProgress(0);
        // Simulate sync
        for (let i = 0; i <= 100; i += 10) {
            await new Promise(r => setTimeout(r, 300));
            setSyncProgress(i);
        }
        setLastSync(new Date().toLocaleString('fr-FR'));
        setSyncing(false);
    };

    // Mock data
    const queueItems = [
        { type: 'pv', count: 1, taille: 2.4, icon: '📄', label: 'PV' },
        { type: 'inspection', count: 3, taille: 0.8, icon: '📋', label: 'Inspections' },
        { type: 'photo', count: 12, taille: 18.5, icon: '📷', label: 'Photos' },
        { type: 'autre', count: 2, taille: 0.1, icon: '📅', label: 'Autres' },
    ];
    const totalElements = queueItems.reduce((s, q) => s + q.count, 0);
    const totalTaille = queueItems.reduce((s, q) => s + q.taille, 0);

    const syncHistory = [
        { date: '26/02/2026 08:32', elements: 8, duree: '12s', statut: 'succes' },
        { date: '25/02/2026 17:05', elements: 15, duree: '28s', statut: 'succes' },
        { date: '25/02/2026 12:10', elements: 3, duree: '5s', statut: 'succes' },
        { date: '24/02/2026 18:00', elements: 22, duree: '45s', statut: 'partiel' },
        { date: '24/02/2026 09:20', elements: 5, duree: '8s', statut: 'succes' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-extrabold text-gray-900">Synchronisation</h1>

            {/* Section 1 — Connection status */}
            <div className={`rounded-2xl p-6 text-center ${isOnline ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-2">
                    {isOnline ? (
                        <>
                            <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" />
                            <Wifi className="w-8 h-8 text-green-600" />
                        </>
                    ) : (
                        <>
                            <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
                            <WifiOff className="w-8 h-8 text-red-600" />
                        </>
                    )}
                </div>
                <p className={`text-2xl font-extrabold ${isOnline ? 'text-green-800' : 'text-red-800'}`}>
                    {isOnline ? '🟢 EN LIGNE' : '🔴 HORS LIGNE'}
                </p>
                <p className="text-sm text-gray-600 mt-2">Dernière sync : {lastSync}</p>
                <p className="text-xs text-gray-400">Prochaine sync auto : dans 5 minutes</p>
            </div>

            {/* Section 2 — Queue */}
            <FieldCard title={`File d'attente — ${totalElements} éléments`}>
                <div className="space-y-3">
                    {queueItems.map((q) => (
                        <div key={q.type} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                            <div className="flex items-center gap-2">
                                <span className="text-lg">{q.icon}</span>
                                <span className="font-semibold text-gray-800">{q.count} {q.label}</span>
                            </div>
                            <span className="text-sm text-gray-500 font-mono">{q.taille.toFixed(1)} Mo</span>
                        </div>
                    ))}
                    <div className="flex items-center justify-between pt-2 border-t-2 border-gray-200 font-bold">
                        <span className="text-gray-900">TOTAL</span>
                        <span className="text-inspect-blue font-mono">{totalTaille.toFixed(1)} Mo</span>
                    </div>
                </div>
            </FieldCard>

            {/* Section 3 — Local data */}
            <FieldCard title="Données locales">
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-gray-600">Établissements en cache</span><span className="font-bold">47</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Grilles d&apos;inspection</span><span className="font-bold">4</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Barème amendes</span><span className="font-bold">v2.1</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Planning jusqu&apos;au</span><span className="font-bold">04/03/2026</span></div>
                    <p className="text-xs text-gray-400 mt-2">Dernière mise à jour : 26/02/2026 08:00</p>
                    <button className="w-full h-12 bg-blue-50 text-inspect-blue rounded-xl font-bold flex items-center justify-center gap-2 mt-2 hover:bg-blue-100 transition-colors">
                        <Database className="w-5 h-5" /> Mettre à jour les données
                    </button>
                </div>
            </FieldCard>

            {/* Section 4 — Actions */}
            <div className="space-y-3">
                {syncing ? (
                    <div className="bg-white rounded-2xl border-2 border-inspect-green p-6">
                        <p className="text-center font-bold text-inspect-green mb-3">
                            🔄 Synchronisation en cours... {syncProgress}%
                        </p>
                        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-inspect-green rounded-full transition-all" style={{ width: `${syncProgress}%` }} />
                        </div>
                        <p className="text-xs text-gray-500 text-center mt-2">
                            Envoi {Math.round(syncProgress / 100 * totalElements)}/{totalElements}...
                        </p>
                    </div>
                ) : (
                    <button
                        onClick={handleSync}
                        disabled={!isOnline || totalElements === 0}
                        className="w-full h-16 bg-inspect-green text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-40 transition-colors"
                    >
                        <RefreshCw className="w-7 h-7" /> Synchroniser maintenant
                    </button>
                )}

                <button className="w-full h-12 bg-red-50 text-red-600 rounded-xl font-bold flex items-center justify-center gap-2 border border-red-200 hover:bg-red-100 transition-colors">
                    <Trash2 className="w-5 h-5" /> Vider le cache local
                </button>
            </div>

            {/* Section 5 — History */}
            <FieldCard title="Historique des synchronisations">
                <div className="space-y-2">
                    {syncHistory.map((h, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                            <div className="flex items-center gap-2">
                                {h.statut === 'succes' ? <Check className="w-4 h-4 text-green-500" /> : <AlertTriangle className="w-4 h-4 text-orange-500" />}
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">{h.elements} éléments envoyés</p>
                                    <p className="text-xs text-gray-500">{h.date} • {h.duree}</p>
                                </div>
                            </div>
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${h.statut === 'succes' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                {h.statut === 'succes' ? 'Succès' : 'Partiel'}
                            </span>
                        </div>
                    ))}
                </div>
            </FieldCard>
        </div>
    );
}
