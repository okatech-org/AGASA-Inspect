"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from './offline/db';
import { RoleType, ROLE_PERMISSIONS } from './roles';

export interface UserProfile {
    id: string;
    matricule: string;
    nom: string;
    prenom: string;
    role: RoleType;
    province: string;
}

export function useAuth() {
    const router = useRouter();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        setIsOnline(navigator.onLine);

        // Load cached session straight from IndexedDB on app load
        const loadSession = async () => {
            try {
                const cached = await db.localUser.get("session");
                if (cached) {
                    setUser({
                        id: cached.matricule, // dummy id mapping for now
                        matricule: cached.matricule,
                        nom: cached.nom,
                        prenom: cached.prenom,
                        role: cached.role as RoleType,
                        province: cached.province,
                    });
                }
            } catch (e) {
                console.error("Failed to load local session", e);
            } finally {
                setIsLoading(false);
            }
        };

        loadSession();
    }, []);

    const login = async (token: string, profile: UserProfile, passwordHash: string, pinHash: string) => {
        setUser(profile);
        document.cookie = `agasa-inspect-session=${token}; path=/; max-age=43200`; // 12h

        try {
            await db.localUser.put({
                id: "session",
                matricule: profile.matricule,
                nom: profile.nom,
                prenom: profile.prenom,
                role: profile.role,
                province: profile.province,
                sessionToken: token,
                passwordHash,
                pinHash,
            });
        } catch {
            console.error("Failed caching to IndexedDB");
        }
    };

    const logout = async () => {
        document.cookie = 'agasa-inspect-session=; path=/; max-age=0';
        try {
            await db.localUser.delete("session");
        } catch { }
        setUser(null);
        router.push('/login');
    };

    const verifyPin = async (pin: string) => {
        // Basic mock implementation for now until Convex + local bcrypt caching is wired
        return pin === "1234";
    };

    return { user, isLoading, isAuthenticated: !!user, role: user?.role, isOnline, login, logout, verifyPin };
}

export function useRoleAccess() {
    const { role, isLoading } = useAuth();

    if (isLoading || !role) {
        // Return empty pessimistic permissions while loading or unauthenticated
        return {
            permissions: ROLE_PERMISSIONS.demo,
            isLoading
        };
    }

    return { permissions: ROLE_PERMISSIONS[role], isLoading };
}
