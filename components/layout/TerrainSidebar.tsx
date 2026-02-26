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
                "fixed left-0 top-16 h-[calc(100vh-64px)] bg-white border-r border-gray-200 z-30 transition-all duration-300 flex flex-col",
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
                                "flex items-center gap-4 rounded-xl transition-colors min-h-[56px] px-4 no-underline",
                                isActive
                                    ? "bg-inspect-green text-white"
                                    : item.highlight
                                        ? "text-inspect-green bg-green-50 border-2 border-inspect-green hover:bg-green-100"
                                        : "text-gray-600 hover:bg-gray-100",
                                !expanded && "justify-center px-0"
                            )}
                        >
                            <item.icon className="w-8 h-8 flex-shrink-0" />
                            {expanded && (
                                <span className={cn("font-bold text-lg whitespace-nowrap", isActive ? "text-white" : "text-gray-800")}>
                                    {item.name}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </div>

            <div className="p-2 border-t border-gray-200">
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="w-full flex justify-center items-center min-h-[56px] text-gray-500 hover:bg-gray-100 rounded-xl transition-colors border-none bg-transparent"
                >
                    {expanded ? <ChevronLeft className="w-8 h-8" /> : <ChevronRight className="w-8 h-8" />}
                </button>
            </div>
        </aside>
    );
}
