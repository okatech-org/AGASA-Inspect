"use client";

import React from 'react';
import { useAuth, useRoleAccess } from '@/lib/auth';
import { Permissions } from '@/lib/roles';
import { AlertTriangle } from 'lucide-react';

interface AuthGuardProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    requirePermission?: (perms: Permissions) => boolean;
}

export function AuthGuard({ children, fallback, requirePermission }: AuthGuardProps) {
    const { isLoading, isAuthenticated, role } = useAuth();
    const { permissions } = useRoleAccess();

    if (isLoading) {
        return <div className="p-8 flex justify-center"><div className="w-8 h-8 rounded-full border-4 border-inspect-green border-t-transparent animate-spin" /></div>;
    }

    if (!isAuthenticated) {
        return fallback ? <>{fallback}</> : null;
    }

    if (requirePermission && !requirePermission(permissions)) {
        return fallback ? <>{fallback}</> : (
            <div className="flex flex-col items-center justify-center p-8 text-center h-[50vh]">
                <AlertTriangle className="w-16 h-16 text-inspect-red mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Accès non autorisé</h2>
                <p className="text-gray-600">
                    Votre rôle ({role}) ne permet pas d&apos;accéder à cette ressource.
                </p>
            </div>
        );
    }

    return (
        <>
            {role === 'demo' && (
                <div className="fixed top-16 right-0 left-0 bg-inspect-orange/90 text-white text-xs font-bold py-1 text-center z-20 shadow-md">
                    Mode Démonstration — Aucune modification ne sera enregistrée.
                </div>
            )}
            {children}
        </>
    );
}
