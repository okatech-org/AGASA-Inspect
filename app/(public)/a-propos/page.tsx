import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { Scale, MapPin, Building, Handshake, Code } from 'lucide-react';

export const metadata: Metadata = {
    title: 'À propos — AGASA-Inspect',
    description: "Découvrez la mission de l'AGASA, le cadre juridique des inspections sanitaires et l'équipe derrière AGASA-Inspect.",
};

const PROVINCES = [
    'Estuaire', 'Haut-Ogooué', 'Moyen-Ogooué', 'Ngounié',
    'Nyanga', 'Ogooué-Ivindo', 'Ogooué-Lolo', 'Ogooué-Maritime', 'Woleu-Ntem',
];

export default function AProposPage() {
    return (
        <div className="pt-28 pb-20">
            {/* Header */}
            <div className="max-w-4xl mx-auto px-4 text-center mb-16">
                <span className="overline text-[var(--amber)]">L&apos;agence</span>
                <h1 className="font-serif font-bold text-[var(--text)] mt-2">À propos</h1>
                <p className="text-lead text-[var(--text-muted)] font-sans max-w-2xl mx-auto mt-4">
                    L&apos;Agence Gabonaise de Sécurité Alimentaire et sa mission de protection des consommateurs.
                </p>
            </div>

            <div className="max-w-5xl mx-auto px-4 space-y-8">
                {/* Mission */}
                <section className="neu-card overflow-hidden p-0">
                    <div className="relative w-full aspect-[16/9]">
                        <Image src="/images/gabon/gabon-public-service.jpg" alt="Mission AGASA" fill sizes="(max-width: 768px) 100vw, 900px" className="object-cover" />
                    </div>
                    <div className="p-8 md:p-12">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="icon-container" style={{ background: 'rgba(16,185,129,0.12)' }}>
                            <Building className="w-6 h-6 text-[var(--emerald)]" strokeWidth={1.8} />
                        </div>
                        <h2 className="font-serif font-bold text-[var(--text)] text-2xl">Mission de l&apos;AGASA</h2>
                    </div>
                    <p className="text-[var(--text-muted)] font-sans leading-relaxed mb-4">
                        L&apos;Agence Gabonaise de Sécurité Alimentaire (AGASA) est l&apos;organe national chargé d&apos;assurer la sécurité alimentaire et le contrôle sanitaire et phytosanitaire sur l&apos;ensemble du territoire gabonais.
                    </p>
                    <p className="text-[var(--text-muted)] font-sans leading-relaxed">
                        La Direction des Inspections et du Contrôle Sanitaire et Phytosanitaire (DICSP) mobilise <strong className="text-[var(--text)]">50 inspecteurs</strong> dans <strong className="text-[var(--text)]">9 provinces</strong> pour surveiller les <strong className="text-[var(--text)]">13 700 établissements</strong> alimentaires du pays.
                    </p>
                    </div>
                </section>

                {/* Cadre juridique */}
                <section className="neu-card overflow-hidden p-0">
                    <div className="relative w-full aspect-[16/9]">
                        <Image src="/images/gabon/gabon-compliance-council.jpg" alt="Cadre juridique AGASA" fill sizes="(max-width: 768px) 100vw, 900px" className="object-cover" />
                    </div>
                    <div className="p-8 md:p-12">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="icon-container" style={{ background: 'rgba(59,130,246,0.12)' }}>
                            <Scale className="w-6 h-6 text-[var(--blue)]" strokeWidth={1.8} />
                        </div>
                        <h2 className="font-serif font-bold text-[var(--text)] text-2xl">Cadre juridique</h2>
                    </div>
                    <ul className="space-y-3 text-[var(--text-muted)] font-sans">
                        {[
                            { label: 'Ordonnance 50/78', desc: 'Texte fondateur du contrôle sanitaire au Gabon' },
                            { label: 'Décrets 2015', desc: "Organisation de l'AGASA et attribution des compétences d'inspection" },
                            { label: 'Loi 040/2018', desc: 'Cadre réglementaire des amendes et sanctions' },
                            { label: 'Arrêté n°426', desc: 'Barème officiel des amendes pour infractions sanitaires' },
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="text-[var(--blue)] font-bold mt-1 flex-shrink-0">•</span>
                                <span><strong className="text-[var(--text)]">{item.label}</strong> — {item.desc}</span>
                            </li>
                        ))}
                    </ul>
                    </div>
                </section>

                {/* Provinces */}
                <section className="neu-card overflow-hidden p-0">
                    <div className="relative w-full aspect-[16/9]">
                        <Image src="/images/gabon/libreville-city.jpg" alt="Couverture des provinces du Gabon" fill sizes="(max-width: 768px) 100vw, 900px" className="object-cover" />
                    </div>
                    <div className="p-8 md:p-12">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="icon-container" style={{ background: 'rgba(245,158,11,0.12)' }}>
                            <MapPin className="w-6 h-6 text-[var(--amber)]" strokeWidth={1.8} />
                        </div>
                        <h2 className="font-serif font-bold text-[var(--text)] text-2xl">9 provinces couvertes</h2>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {PROVINCES.map((p) => (
                            <span key={p} className="badge" style={{ background: 'rgba(245,158,11,0.12)', color: 'var(--amber)' }}>
                                {p}
                            </span>
                        ))}
                    </div>
                    </div>
                </section>

                {/* Partenaires */}
                <section className="neu-card overflow-hidden p-0">
                    <div className="relative w-full aspect-[16/9]">
                        <Image src="/images/gabon/gabon-operators-meeting.jpg" alt="Partenaires institutionnels et techniques" fill sizes="(max-width: 768px) 100vw, 900px" className="object-cover" />
                    </div>
                    <div className="p-8 md:p-12">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="icon-container" style={{ background: 'rgba(234,179,8,0.12)' }}>
                            <Handshake className="w-6 h-6 text-[var(--gold)]" strokeWidth={1.8} />
                        </div>
                        <h2 className="font-serif font-bold text-[var(--text)] text-2xl">Partenaires</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {['Ministère de la Santé', 'CEMAC', 'OMS', 'FAO', 'Ministère de l\'Agriculture', 'Trésor Public'].map((p) => (
                            <div key={p} className="bg-[var(--bg-muted)] rounded-xl p-4 font-sans font-semibold text-[var(--text)] text-center text-sm">
                                {p}
                            </div>
                        ))}
                    </div>
                    </div>
                </section>

                {/* Dev team */}
                <section className="neu-card overflow-hidden p-0">
                    <div className="relative w-full aspect-[16/9]">
                        <Image src="/images/gabon/digital-office.jpg" alt="Équipe de développement AGASA-Inspect" fill sizes="(max-width: 768px) 100vw, 900px" className="object-cover" />
                    </div>
                    <div className="p-8 md:p-12">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="icon-container" style={{ background: 'rgba(139,92,246,0.12)' }}>
                            <Code className="w-6 h-6 text-[var(--violet)]" strokeWidth={1.8} />
                        </div>
                        <h2 className="font-serif font-bold text-[var(--text)] text-2xl">Équipe de développement</h2>
                    </div>
                    <p className="text-[var(--text-muted)] font-sans leading-relaxed">
                        AGASA-Inspect est conçu et développé par <strong className="text-[var(--text)]">NTSAGUI Digital</strong>, spécialiste des solutions numériques pour l&apos;administration publique gabonaise, en étroite collaboration avec les équipes terrain de la DICSP.
                    </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
