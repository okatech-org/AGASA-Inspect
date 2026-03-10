import React from 'react';
import { SyncIndicator } from '../ui/SyncIndicator';
import { GPSIndicator } from '../ui/GPSIndicator';
import { LogOut, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export function TerrainTopBar() {
    return (
        <header className="h-16 bg-[var(--bg-card)] border-b border-[var(--border)] fixed top-0 w-full z-40 flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
                <Link href="/dashboard" className="flex items-center gap-2 text-current no-underline">
                    <ShieldAlert className="w-8 h-8 text-[var(--amber)]" strokeWidth={1.8} />
                    <div className="hidden sm:flex items-baseline gap-1">
                        <span className="font-serif text-xl font-bold text-[var(--text)]">AGASA</span>
                        <span className="font-sans text-sm font-semibold text-[var(--amber)]">Inspect</span>
                    </div>
                </Link>
            </div>

            <div className="flex items-center justify-center flex-1 gap-2 md:gap-4 px-4 overflow-x-auto">
                <SyncIndicator pendingCount={0} />
                <GPSIndicator />
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden md:flex flex-col items-end">
                    <span className="text-sm font-bold text-[var(--text)] m-0 p-0 leading-tight font-sans">Jean Inspecteur</span>
                    <span className="text-xs text-[var(--text-muted)] m-0 p-0 leading-tight font-sans">Estuaire</span>
                </div>
                <button
                    className="p-2 text-[var(--text-muted)] hover:text-[var(--rose)] hover:bg-[rgba(244,63,94,0.1)] rounded-full transition-colors flex items-center justify-center min-h-[48px] min-w-[48px]"
                    aria-label="Déconnexion"
                >
                    <LogOut className="w-6 h-6" strokeWidth={1.8} />
                </button>
            </div>
        </header>
    );
}
