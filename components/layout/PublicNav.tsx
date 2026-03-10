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
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-md' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-[72px]">
                    {/* Logo — Shield + AGASA serif + Inspect sans */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <Shield
                            className={`w-8 h-8 transition-colors ${scrolled ? 'text-[var(--amber)]' : 'text-white'
                                }`}
                            strokeWidth={1.8}
                        />
                        <div className="flex items-baseline gap-1">
                            <span
                                className={`font-serif text-xl font-bold transition-colors ${scrolled ? 'text-[var(--text)]' : 'text-white'
                                    }`}
                            >
                                AGASA
                            </span>
                            <span
                                className={`font-sans text-sm font-semibold transition-colors ${scrolled ? 'text-[var(--amber)]' : 'text-white/80'
                                    }`}
                            >
                                Inspect
                            </span>
                        </div>
                    </Link>

                    {/* Desktop links — DM Sans 15px/500 */}
                    <div className="hidden md:flex items-center gap-1">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-2 rounded-lg font-sans text-[15px] font-medium transition-colors duration-200 ${pathname === link.href
                                        ? scrolled
                                            ? 'bg-[rgba(245,158,11,0.12)] text-[var(--amber)]'
                                            : 'bg-white/20 text-white'
                                        : scrolled
                                            ? 'text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text)]'
                                            : 'text-white/80 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/demo"
                            className="ml-3 px-5 py-2.5 bg-[var(--amber)] text-white font-sans font-semibold rounded-xl hover:opacity-90 transition-all duration-200 text-[15px] min-h-[44px] flex items-center"
                        >
                            Tester la Démo
                        </Link>
                        <Link
                            href="/login"
                            className={`ml-2 px-5 py-2.5 font-sans font-semibold rounded-xl transition-all duration-200 text-[15px] min-h-[44px] flex items-center ${scrolled
                                    ? 'gradient-agasa text-white hover:opacity-90'
                                    : 'bg-white text-[var(--primary)] hover:bg-gray-100'
                                }`}
                        >
                            Connexion
                        </Link>
                    </div>

                    {/* Mobile burger */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className={`md:hidden p-3 rounded-lg transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center ${scrolled ? 'text-[var(--text)] hover:bg-[var(--bg-muted)]' : 'text-white hover:bg-white/10'
                            }`}
                        aria-label="Menu"
                    >
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden bg-[var(--bg-card)] border-t border-[var(--border)] shadow-elegant">
                    <div className="px-4 py-4 flex flex-col gap-2">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className={`px-4 py-3 rounded-xl font-sans font-medium text-[15px] transition-colors min-h-[48px] flex items-center ${pathname === link.href
                                        ? 'bg-[rgba(245,158,11,0.12)] text-[var(--amber)]'
                                        : 'text-[var(--text-muted)] hover:bg-[var(--bg-muted)]'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/demo"
                            onClick={() => setMobileOpen(false)}
                            className="px-4 py-3 bg-[var(--amber)] text-white font-sans font-semibold rounded-xl text-center mt-2 min-h-[48px] flex items-center justify-center"
                        >
                            🎮 Tester la Démo
                        </Link>
                        <Link
                            href="/login"
                            onClick={() => setMobileOpen(false)}
                            className="px-4 py-3 gradient-agasa text-white font-sans font-semibold rounded-xl text-center min-h-[48px] flex items-center justify-center"
                        >
                            Connexion
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
