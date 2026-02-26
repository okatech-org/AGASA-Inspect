"use client";

import React from 'react';
import Link from 'next/link';
import { useDemoMode } from '@/lib/demo';
import { Gamepad2, ArrowLeft, RefreshCw } from 'lucide-react';

export function DemoBanner() {
    const { isDemoMode, demoProfile, demoUserName, exitDemo } = useDemoMode();

    if (!isDemoMode) return null;

    const profileLabels: Record<string, string> = {
        inspecteur: 'Inspecteur',
        superviseur: 'Superviseur',
        admin: 'Administrateur',
    };

    return (
        <div className="fixed top-16 left-0 right-0 z-30 bg-gradient-to-r from-inspect-orange to-orange-500 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4 text-sm">
                <div className="flex items-center gap-2 font-semibold">
                    <Gamepad2 className="w-4 h-4" />
                    <span className="hidden sm:inline">MODE DÉMONSTRATION</span>
                    <span className="sm:hidden">DÉMO</span>
                    <span className="hidden md:inline">— Profil : {profileLabels[demoProfile || '']} ({demoUserName})</span>
                    <span className="text-white/70 hidden lg:inline">| Données fictives</span>
                </div>
                <div className="flex items-center gap-2">
                    <Link
                        href="/demo"
                        className="flex items-center gap-1 px-3 py-1.5 bg-white/20 rounded-lg hover:bg-white/30 transition-colors font-semibold text-xs"
                    >
                        <RefreshCw className="w-3 h-3" /> Changer
                    </Link>
                    <button
                        onClick={exitDemo}
                        className="flex items-center gap-1 px-3 py-1.5 bg-white/20 rounded-lg hover:bg-white/30 transition-colors font-semibold text-xs"
                    >
                        <ArrowLeft className="w-3 h-3" /> Quitter
                    </button>
                </div>
            </div>
        </div>
    );
}
