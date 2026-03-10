"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Home,
    ClipboardList,
    PlusCircle,
    FileText,
    Map,
    Calendar,
    RefreshCw,
    Users,
    BarChart,
    Settings,
    ChevronRight,
    ChevronLeft
} from 'lucide-react';
import { cn } from '../ui/BigButton';

export function TerrainSidebar({ role = "inspecteur" }: { role?: string }) {
    const pathname = usePathname();
    const [expanded, setExpanded] = useState(false);

    const navItems = [
        { name: 'Tableau de bord', href: '/dashboard', icon: Home, roles: ['all'] },
        { name: 'Mes inspections', href: '/inspections', icon: ClipboardList, roles: ['inspecteur', 'superviseur'] },
        { name: 'Nouvelle inspection', href: '/inspections/nouvelle', icon: PlusCircle, roles: ['inspecteur', 'superviseur'], highlight: true },
        { name: 'Mes PV', href: '/pv', icon: FileText, roles: ['inspecteur', 'superviseur'] },
        { name: 'Carte terrain', href: '/carte', icon: Map, roles: ['inspecteur', 'superviseur'] },
        { name: 'Mon planning', href: '/planning', icon: Calendar, roles: ['inspecteur', 'superviseur'] },
        { name: 'Mon équipe', href: '/superviseur/equipe', icon: Users, roles: ['superviseur'] },
        { name: 'Rapports', href: '/superviseur/rapports', icon: BarChart, roles: ['superviseur'] },
        { name: 'Administration', href: '/admin', icon: Settings, roles: ['admin_systeme'] },
        { name: 'Synchronisation', href: '/sync', icon: RefreshCw, roles: ['all'] },
    ];

    const filteredItems = navItems.filter(item =>
        item.roles.includes('all') || item.roles.includes(role)
    );

    return (
        <aside
            className={cn(
                "fixed left-0 top-16 h-[calc(100vh-64px)] bg-[var(--bg-card)] border-r border-[var(--border)] z-30 transition-all duration-300 ease-agasa flex flex-col",
                expanded ? "w-64" : "w-20"
            )}
        >
            <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-2 px-2">
                {filteredItems.map((item) => {
                    const isActive = pathname?.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            title={item.name}
                            className={cn(
                                "flex items-center gap-4 rounded-xl transition-all duration-200 min-h-[56px] px-4 no-underline font-sans",
                                isActive
                                    ? "bg-[var(--amber)] text-white shadow-md"
                                    : item.highlight
                                        ? "text-[var(--amber)] bg-[rgba(245,158,11,0.1)] border-2 border-[var(--amber)] hover:bg-[rgba(245,158,11,0.18)]"
                                        : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text)]",
                                !expanded && "justify-center px-0"
                            )}
                        >
                            <item.icon className="w-7 h-7 flex-shrink-0" strokeWidth={1.8} />
                            {expanded && (
                                <span className={cn("font-semibold text-[15px] whitespace-nowrap", isActive ? "text-white" : "text-[var(--text)]")}>
                                    {item.name}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </div>

            <div className="p-2 border-t border-[var(--border)]">
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="w-full flex justify-center items-center min-h-[56px] text-[var(--text-muted)] hover:bg-[var(--bg-muted)] rounded-xl transition-colors border-none bg-transparent cursor-pointer"
                >
                    {expanded ? <ChevronLeft className="w-7 h-7" strokeWidth={1.8} /> : <ChevronRight className="w-7 h-7" strokeWidth={1.8} />}
                </button>
            </div>
        </aside>
    );
}
