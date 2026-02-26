"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert, AlertCircle } from 'lucide-react';
import { BigButton } from '@/components/ui/BigButton';
// import { useMutation } from "convex/react";
// import { api } from "@/convex/_generated/api";

export default function LoginPage() {
    const router = useRouter();
    const [matricule, setMatricule] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // const loginUser = useMutation(api.auth.users.loginUser);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!matricule || !password) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        setError(null);
        setIsLoading(true);

        try {
            // Mock login for now, waiting for convex provider setup
            // const result = await loginUser({ matricule, motDePasse: password });
            // document.cookie = `agasa-inspect-session=${result.sessionToken}; path=/; max-age=43200`; // 12h
            // router.push("/dashboard");

            console.log("Login attempt with", matricule);
            // fallback mock behavior:
            setTimeout(() => {
                router.push("/dashboard");
            }, 1000);

        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Erreur de connexion";
            setError(message);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-terrain-bg flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-terrain overflow-hidden border border-gray-100">

                <div className="bg-inspect-green px-6 py-8 flex flex-col items-center text-white">
                    <ShieldAlert className="w-16 h-16 mb-4" />
                    <h1 className="text-3xl font-bold mb-1">AGASA-Inspect</h1>
                    <p className="text-green-100 text-center font-medium">Inspections Sanitaires et Phytosanitaires</p>
                </div>

                <div className="p-8">
                    {error && (
                        <div className="bg-red-50 text-inspect-red p-4 rounded-xl mb-6 flex items-start gap-3 border border-red-200">
                            <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                            <p className="font-semibold">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="matricule" className="font-bold text-gray-700">Matricule</label>
                            <input
                                id="matricule"
                                type="text"
                                value={matricule}
                                onChange={(e) => setMatricule(e.target.value)}
                                placeholder="INSP-2026-XXXX"
                                autoComplete="off"
                                className="w-full h-14 px-4 text-lg border-2 border-gray-300 rounded-xl focus:border-inspect-green outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="password" className="font-bold text-gray-700">Mot de passe</label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full h-14 px-4 pr-16 text-lg border-2 border-gray-300 rounded-xl focus:border-inspect-green outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-0 h-full text-gray-500 font-bold hover:text-gray-800"
                                >
                                    {showPassword ? 'Masquer' : 'Afficher'}
                                </button>
                            </div>
                        </div>

                        <BigButton type="submit" className="mt-4" disabled={isLoading}>
                            {isLoading ? "Connexion..." : "Se Connecter"}
                        </BigButton>
                    </form>

                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={() => router.push('/demo')}
                            className="text-inspect-blue font-bold text-lg hover:underline"
                        >
                            Mode Démonstration →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
