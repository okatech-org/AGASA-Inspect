"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Shield } from 'lucide-react';

const NAV_LINKS = [
    { href: '/', label: 'Accueil' },
    { href: '/fonctionnalites', label: 'Fonctionnalités' },
    { href: '/a-propos', label: 'À propos' },
    { href: '/contact', label: 'Contact' },
];

export function PublicNav() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <Shield className={`w-8 h-8 transition-colors ${scrolled ? 'text-inspect-green' : 'text-white'}`} />
                        <span className={`text-xl font-bold transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                            AGASA-Inspect
                        </span>
                    </Link>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-1">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${pathname === link.href
                                        ? scrolled ? 'bg-inspect-green/10 text-inspect-green' : 'bg-white/20 text-white'
                                        : scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white/80 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/demo"
                            className="ml-3 px-5 py-2.5 bg-inspect-orange text-white font-bold rounded-xl hover:bg-orange-700 transition-colors text-sm"
                        >
                            Tester la Démo
                        </Link>
                        <Link
                            href="/login"
                            className={`ml-2 px-5 py-2.5 font-bold rounded-xl transition-colors text-sm ${scrolled
                                    ? 'bg-inspect-green text-white hover:bg-green-800'
                                    : 'bg-white text-inspect-green hover:bg-gray-100'
                                }`}
                        >
                            Connexion
                        </Link>
                    </div>

                    {/* Mobile burger */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
                        aria-label="Menu"
                    >
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden bg-white border-t shadow-lg">
                    <div className="px-4 py-4 flex flex-col gap-2">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className={`px-4 py-3 rounded-xl font-semibold transition-colors ${pathname === link.href ? 'bg-inspect-green/10 text-inspect-green' : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/demo"
                            onClick={() => setMobileOpen(false)}
                            className="px-4 py-3 bg-inspect-orange text-white font-bold rounded-xl text-center mt-2"
                        >
                            🎮 Tester la Démo
                        </Link>
                        <Link
                            href="/login"
                            onClick={() => setMobileOpen(false)}
                            className="px-4 py-3 bg-inspect-green text-white font-bold rounded-xl text-center"
                        >
                            Connexion
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
