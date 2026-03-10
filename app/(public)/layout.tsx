import React from 'react';
import { PublicNav } from '@/components/layout/PublicNav';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { ContextualPageHero } from '@/components/layout/ContextualPageHero';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            <PublicNav />
            <main className="flex-1">
                <ContextualPageHero />
                {children}
            </main>
            <PublicFooter />
        </div>
    );
}
