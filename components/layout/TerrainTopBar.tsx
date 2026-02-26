import React from 'react';
import { SyncIndicator } from '../ui/SyncIndicator';
import { GPSIndicator } from '../ui/GPSIndicator';
import { LogOut, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export function TerrainTopBar() {
    return (
        <header className="h-16 bg-white border-b border-gray-200 fixed top-0 w-full z-40 flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
                <Link href="/dashboard" className="flex items-center gap-2 text-current no-underline">
                    <ShieldAlert className="w-8 h-8 text-inspect-green" />
                    <span className="font-bold text-xl hidden sm:block">AGASA-Inspect</span>
                </Link>
            </div>

            <div className="flex items-center justify-center flex-1 gap-2 md:gap-4 px-4 overflow-x-auto">
                <SyncIndicator pendingCount={0} />
                <GPSIndicator />
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden md:flex flex-col items-end">
                    <span className="text-sm font-bold m-0 p-0 leading-tight">Jean Inspecteur</span>
                    <span className="text-xs text-gray-500 m-0 p-0 leading-tight">Estuaire</span>
                </div>
                <button className="p-2 text-gray-500 hover:text-inspect-red hover:bg-red-50 rounded-full transition-colors flex items-center justify-center" aria-label="Déconnexion">
                    <LogOut className="w-6 h-6" />
                </button>
            </div>
        </header>
    );
}
