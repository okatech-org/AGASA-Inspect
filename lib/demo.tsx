"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';

export type DemoProfile = 'inspecteur' | 'superviseur' | 'admin' | null;

interface DemoContextType {
    isDemoMode: boolean;
    demoProfile: DemoProfile;
    demoUserName: string;
    enterDemo: (profile: DemoProfile) => void;
    exitDemo: () => void;
    blockMutation: (action?: string) => boolean;
}

const DemoContext = createContext<DemoContextType>({
    isDemoMode: false,
    demoProfile: null,
    demoUserName: '',
    enterDemo: () => { },
    exitDemo: () => { },
    blockMutation: () => false,
});

export const useDemoMode = () => useContext(DemoContext);

const DEMO_NAMES: Record<string, string> = {
    inspecteur: 'Jean-Pierre MOUSSAVOU',
    superviseur: 'Marie-Claire NZÉ',
    admin: 'Paul OBIANG',
};

export function DemoProvider({ children }: { children: React.ReactNode }) {
    const enableDemoMode = process.env.NEXT_PUBLIC_ENABLE_DEMO_MODE === "true";
    const [demoProfile, setDemoProfile] = useState<DemoProfile>(null);

    const enterDemo = useCallback((profile: DemoProfile) => {
        if (!enableDemoMode) return;
        setDemoProfile(profile);
        if (typeof document !== 'undefined') {
            const secure = window.location.protocol === 'https:' ? '; secure' : '';
            document.cookie = `__session=demo-${profile}; path=/; max-age=43200; samesite=lax${secure}`;
        }
    }, [enableDemoMode]);

    const exitDemo = useCallback(() => {
        setDemoProfile(null);
        if (typeof document !== 'undefined') {
            document.cookie = '__session=; path=/; max-age=0; samesite=lax';
        }
    }, []);

    const blockMutation = useCallback((action?: string) => {
        if (demoProfile) {
            // Show a toast-like alert — in production, integrate a toast library
            if (typeof window !== 'undefined') {
                const msg = action
                    ? `Action "${action}" impossible en mode démonstration`
                    : 'Action impossible en mode démonstration';
                alert(msg); // Will be replaced by toast in future
            }
            return true; // blocked
        }
        return false; // allowed
    }, [demoProfile]);

    return (
        <DemoContext.Provider
            value={{
                isDemoMode: enableDemoMode && !!demoProfile,
                demoProfile,
                demoUserName: demoProfile ? DEMO_NAMES[demoProfile] || '' : '',
                enterDemo,
                exitDemo,
                blockMutation,
            }}
        >
            {children}
        </DemoContext.Provider>
    );
}
