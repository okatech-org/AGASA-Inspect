"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShieldAlert, AlertCircle } from 'lucide-react';
import { BigButton } from '@/components/ui/BigButton';
import { useAuth } from "@/lib/auth";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [matricule, setMatricule] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const enableDemoMode = process.env.NEXT_PUBLIC_ENABLE_DEMO_MODE === "true";

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!matricule || !password) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ matricule, motDePasse: password }),
            });
            if (!response.ok) {
                const payload = await response.json().catch(() => ({ error: "Erreur de connexion" }));
                throw new Error(payload.error || "Erreur de connexion");
            }

            const result = await response.json() as {
                userId: string;
                nom: string;
                prenom: string;
                role: "admin_systeme" | "superviseur" | "inspecteur" | "demo";
                province: string;
                sessionToken: string;
            };
            await login(
                result.sessionToken,
                {
                    id: result.userId,
                    matricule,
                    nom: result.nom,
                    prenom: result.prenom,
                    role: result.role,
                    province: result.province,
                },
            );
            router.push("/dashboard");
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Erreur de connexion";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-terrain-bg flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-terrain overflow-hidden border border-gray-100">

                <div className="relative bg-inspect-green px-6 py-8 flex flex-col items-center text-white overflow-hidden">
                    <Image
                        src="/images/gabon/digital-office.jpg"
                        alt="Connexion sécurisée AGASA-Inspect"
                        fill
                        sizes="100vw"
                        className="object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-emerald-950/55" />
                    <div className="relative z-10 flex flex-col items-center">
                    <ShieldAlert className="w-16 h-16 mb-4" />
                    <h1 className="text-3xl font-bold mb-1">AGASA-Inspect</h1>
                    <p className="text-green-100 text-center font-medium">Inspections Sanitaires et Phytosanitaires</p>
                    </div>
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

                    {enableDemoMode && (
                        <div className="mt-8 flex justify-center">
                            <button
                                onClick={() => router.push('/demo')}
                                className="text-inspect-blue font-bold text-lg hover:underline"
                            >
                                Mode Démonstration →
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
