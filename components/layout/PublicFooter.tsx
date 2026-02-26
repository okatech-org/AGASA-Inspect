import React from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';

const ECOSYSTEM = [
    { name: 'AGASA-Pro', desc: 'Opérateurs économiques' },
    { name: 'AGASA-Core', desc: 'Back-office & BI' },
    { name: 'AGASA-Inspect', desc: 'Inspections terrain' },
    { name: 'AGASA-Citoyen', desc: 'Signalements citoyens' },
];

export function PublicFooter() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <Shield className="w-8 h-8 text-inspect-green" />
                            <span className="text-xl font-bold">AGASA-Inspect</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Agence Gabonaise de Sécurité Alimentaire — Direction des Inspections et du Contrôle Sanitaire et Phytosanitaire.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Navigation</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
                            <li><Link href="/fonctionnalites" className="hover:text-white transition-colors">Fonctionnalités</Link></li>
                            <li><Link href="/a-propos" className="hover:text-white transition-colors">À propos</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                            <li><Link href="/demo" className="hover:text-white transition-colors">Démo</Link></li>
                        </ul>
                    </div>

                    {/* Ecosystem */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Écosystème AGASA</h3>
                        <ul className="space-y-3">
                            {ECOSYSTEM.map((app) => (
                                <li key={app.name}>
                                    <span className="text-white font-semibold text-sm">{app.name}</span>
                                    <span className="text-gray-500 text-xs ml-2">— {app.desc}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Contact</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li>📍 Libreville, Gabon</li>
                            <li>📞 +241 74 XX XX XX</li>
                            <li>✉️ contact@agasa.ga</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm">
                        © 2026 AGASA — République Gabonaise. Tous droits réservés.
                    </p>
                    <p className="text-gray-600 text-xs">
                        Développé par Ntsagui Digital
                    </p>
                </div>
            </div>
        </footer>
    );
}
