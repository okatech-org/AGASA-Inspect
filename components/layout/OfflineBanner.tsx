"use client";

import React, { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';

export function OfflineBanner() {
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        setIsOffline(!navigator.onLine);

        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    if (!isOffline) return null;

    return (
        <div className="bg-inspect-red text-white py-2 px-4 flex items-center justify-center gap-2 animate-pulse fixed top-16 w-full z-30">
            <WifiOff className="w-5 h-5" />
            <span className="text-sm font-bold text-center">
                ⚠️ Vous êtes hors-ligne. Les inspections seront synchronisées au retour de la connexion.
            </span>
        </div>
    );
}
