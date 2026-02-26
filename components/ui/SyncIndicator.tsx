"use client";

import React, { useEffect, useState } from 'react';
import { Cloud, CloudOff, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function SyncIndicator({ pendingCount = 0 }: { pendingCount?: number }) {
    const router = useRouter();
    const [isOnline, setIsOnline] = useState(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isSyncing, setIsSyncing] = useState(false);

    useEffect(() => {
        setIsOnline(navigator.onLine);
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <button
            onClick={() => router.push('/sync')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            title="Statut de synchronisation"
        >
            {isSyncing ? (
                <RefreshCw className="w-5 h-5 text-inspect-orange animate-spin" />
            ) : isOnline ? (
                <Cloud className="w-5 h-5 text-inspect-green" />
            ) : (
                <CloudOff className="w-5 h-5 text-inspect-red" />
            )}

            <span className="text-sm font-semibold hidden md:inline">
                {isSyncing ? "Sync..." : isOnline ? "En ligne" : "Hors-ligne"}
            </span>

            {pendingCount > 0 && (
                <span className="bg-inspect-orange text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {pendingCount}
                </span>
            )}
        </button>
    );
}
