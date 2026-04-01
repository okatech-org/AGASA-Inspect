import React from 'react';
import Link from 'next/link';
import { Shield, MapPin, Phone, Mail } from 'lucide-react';

const ECOSYSTEM = [
    { name: 'AGASA-Pro', desc: 'Opérateurs économiques' },
    { name: 'AGASA-Admin', desc: 'Back-office & BI' },
    { name: 'AGASA-Inspect', desc: 'Inspections terrain' },
    { name: 'AGASA-Citoyen', desc: 'Signalements citoyens' },
];

export function PublicFooter() {
    return (
        <footer className="bg-[var(--bg-card)] border-t border-[var(--border)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2.5 mb-4">
                            <Shield className="w-8 h-8 text-[var(--amber)]" strokeWidth={1.8} />
                            <div className="flex items-baseline gap-1">
                                <span className="font-serif text-xl font-bold text-[var(--text)]">AGASA</span>
                                <span className="font-sans text-sm font-semibold text-[var(--amber)]">Inspect</span>
                            </div>
                        </div>
                        <p className="text-[13px] font-sans text-[var(--text-muted)] leading-relaxed">
                            Agence Gabonaise de Sécurité Alimentaire — Direction des Inspections et du Contrôle Sanitaire et Phytosanitaire.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-serif text-lg font-bold text-[var(--text)] mb-4">Navigation</h3>
                        <ul className="space-y-2 text-[13px] font-sans">
                            <li><Link href="/" className="text-[var(--text-muted)] hover:text-[var(--emerald)] transition-colors duration-200">Accueil</Link></li>
                            <li><Link href="/fonctionnalites" className="text-[var(--text-muted)] hover:text-[var(--emerald)] transition-colors duration-200">Fonctionnalités</Link></li>
                            <li><Link href="/a-propos" className="text-[var(--text-muted)] hover:text-[var(--emerald)] transition-colors duration-200">À propos</Link></li>
                            <li><Link href="/contact" className="text-[var(--text-muted)] hover:text-[var(--emerald)] transition-colors duration-200">Contact</Link></li>
                            <li><Link href="/demo" className="text-[var(--text-muted)] hover:text-[var(--emerald)] transition-colors duration-200">Démo</Link></li>
                        </ul>
                    </div>

                    {/* Ecosystem */}
                    <div>
                        <h3 className="font-serif text-lg font-bold text-[var(--text)] mb-4">Écosystème AGASA</h3>
                        <ul className="space-y-3">
                            {ECOSYSTEM.map((app) => (
                                <li key={app.name}>
                                    <span className="text-[var(--text)] font-sans font-semibold text-[13px]">{app.name}</span>
                                    <span className="text-[var(--text-muted)] font-sans text-xs ml-2">— {app.desc}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-serif text-lg font-bold text-[var(--text)] mb-4">Contact</h3>
                        <ul className="space-y-3 text-[var(--text-muted)] text-[13px] font-sans">
                            <li className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-[var(--amber)]" strokeWidth={1.8} />
                                Libreville, Gabon
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-[var(--amber)]" strokeWidth={1.8} />
                                +241 74 XX XX XX
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-[var(--amber)]" strokeWidth={1.8} />
                                contact@agasa.ga
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="border-t border-[var(--border)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-[var(--text-muted)] text-[13px] font-sans">
                        © 2026 AGASA — République Gabonaise. Tous droits réservés.
                    </p>
                    <p className="text-[var(--text-muted)] text-xs font-sans opacity-60">
                        Développé par Ntsagui Digital
                    </p>
                </div>
            </div>
        </footer>
    );
}
