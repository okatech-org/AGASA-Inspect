import React from 'react';
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
        <div className="pt-24 pb-20">
            {/* Header */}
            <div className="max-w-4xl mx-auto px-4 text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                    À propos
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    L&apos;Agence Gabonaise de Sécurité Alimentaire et sa mission de protection des consommateurs.
                </p>
            </div>

            <div className="max-w-5xl mx-auto px-4 space-y-16">
                {/* Mission */}
                <section className="bg-white border-2 border-gray-100 rounded-3xl p-8 md:p-12">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-inspect-green/10 rounded-xl flex items-center justify-center">
                            <Building className="w-6 h-6 text-inspect-green" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Mission de l&apos;AGASA</h2>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        L&apos;Agence Gabonaise de Sécurité Alimentaire (AGASA) est l&apos;organe national chargé d&apos;assurer la sécurité alimentaire et le contrôle sanitaire et phytosanitaire sur l&apos;ensemble du territoire gabonais.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        La Direction des Inspections et du Contrôle Sanitaire et Phytosanitaire (DICSP) mobilise <strong>50 inspecteurs</strong> dans <strong>9 provinces</strong> pour surveiller les <strong>13 700 établissements</strong> alimentaires du pays.
                    </p>
                </section>

                {/* Cadre juridique */}
                <section className="bg-white border-2 border-gray-100 rounded-3xl p-8 md:p-12">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-inspect-blue/10 rounded-xl flex items-center justify-center">
                            <Scale className="w-6 h-6 text-inspect-blue" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Cadre juridique</h2>
                    </div>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-3">
                            <span className="text-inspect-blue font-bold mt-1">•</span>
                            <span><strong>Ordonnance 50/78</strong> — Texte fondateur du contrôle sanitaire au Gabon</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-inspect-blue font-bold mt-1">•</span>
                            <span><strong>Décrets 2015</strong> — Organisation de l&apos;AGASA et attribution des compétences d&apos;inspection</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-inspect-blue font-bold mt-1">•</span>
                            <span><strong>Loi 040/2018</strong> — Cadre réglementaire des amendes et sanctions</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-inspect-blue font-bold mt-1">•</span>
                            <span><strong>Arrêté n°426</strong> — Barème officiel des amendes pour infractions sanitaires</span>
                        </li>
                    </ul>
                </section>

                {/* Provinces */}
                <section className="bg-white border-2 border-gray-100 rounded-3xl p-8 md:p-12">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-inspect-orange/10 rounded-xl flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-inspect-orange" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">9 provinces couvertes</h2>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {PROVINCES.map((p) => (
                            <span key={p} className="px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold text-gray-700">
                                {p}
                            </span>
                        ))}
                    </div>
                </section>

                {/* Partenaires */}
                <section className="bg-white border-2 border-gray-100 rounded-3xl p-8 md:p-12">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                            <Handshake className="w-6 h-6 text-yellow-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Partenaires</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {['Ministère de la Santé', 'CEMAC', 'OMS', 'FAO', 'Ministère de l\'Agriculture', 'Trésor Public'].map((p) => (
                            <div key={p} className="bg-gray-50 rounded-xl p-4 font-semibold text-gray-800 text-center">
                                {p}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Dev team */}
                <section className="bg-white border-2 border-gray-100 rounded-3xl p-8 md:p-12">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                            <Code className="w-6 h-6 text-purple-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Équipe de développement</h2>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                        AGASA-Inspect est conçu et développé par <strong>NTSAGUI Digital</strong>, spécialiste des solutions numériques pour l&apos;administration publique gabonaise, en étroite collaboration avec les équipes terrain de la DICSP.
                    </p>
                </section>
            </div>
        </div>
    );
}
