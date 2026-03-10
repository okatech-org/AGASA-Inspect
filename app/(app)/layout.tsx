import React from "react";
import { TerrainTopBar } from "@/components/layout/TerrainTopBar";
import { TerrainSidebar } from "@/components/layout/TerrainSidebar";
import { OfflineBanner } from "@/components/layout/OfflineBanner";
import { DemoBanner } from "@/components/auth/DemoBanner";
import { ContextualPageHero } from "@/components/layout/ContextualPageHero";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[var(--bg)] pt-16 flex">
            <TerrainTopBar />
            <DemoBanner />
            <OfflineBanner />
            <TerrainSidebar role="inspecteur" />
            <main className="flex-1 ml-20 transition-all p-4 md:p-6 pb-24 w-full max-w-[1400px] mx-auto mt-2 offline-banner-offset">
                <ContextualPageHero compact />
                {children}
            </main>
        </div>
    );
}
