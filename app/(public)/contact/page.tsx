"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Send, MapPin, Phone, Mail, CheckCircle } from 'lucide-react';
import { BigButton } from '@/components/ui/BigButton';

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="pt-28 pb-20">
            {/* Header */}
            <div className="max-w-4xl mx-auto px-4 text-center mb-16">
                <span className="overline text-[var(--amber)]">Échangeons</span>
                <h1 className="font-serif font-bold text-[var(--text)] mt-2">Contact</h1>
                <p className="text-lead text-[var(--text-muted)] font-sans max-w-2xl mx-auto mt-4">
                    Une question sur AGASA-Inspect ? Contactez-nous directement.
                </p>
            </div>

            <div className="max-w-5xl mx-auto px-4">
                <div className="grid md:grid-cols-5 gap-10">
                    {/* Form */}
                    <div className="md:col-span-3 neu-card p-0 overflow-hidden">
                        <div className="relative w-full aspect-[16/9]">
                            <Image src="/images/gabon/gabon-public-service.jpg" alt="Contact institutionnel AGASA" fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover" />
                        </div>
                        <div className="p-8">
                        {submitted ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="icon-container mb-4" style={{ background: 'rgba(16,185,129,0.12)', width: '64px', height: '64px', borderRadius: '20px' }}>
                                    <CheckCircle className="w-8 h-8 text-[var(--emerald)]" strokeWidth={1.8} />
                                </div>
                                <h2 className="font-serif font-bold text-[var(--text)] text-2xl mb-2">Message envoyé !</h2>
                                <p className="text-[var(--text-muted)] font-sans">Nous reviendrons vers vous dans les plus brefs délais.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="nom">Nom complet</label>
                                        <input id="nom" type="text" required placeholder="Jean Dupont" className="w-full h-14 px-4 border border-[var(--border)] rounded-xl bg-[var(--bg)] text-[var(--text)] focus:border-[var(--amber)] outline-none" />
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input id="email" type="email" required placeholder="jean@example.com" className="w-full h-14 px-4 border border-[var(--border)] rounded-xl bg-[var(--bg)] text-[var(--text)] focus:border-[var(--amber)] outline-none" />
                                    </div>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="telephone">Téléphone</label>
                                        <input id="telephone" type="tel" placeholder="+241 XX XX XX XX" className="w-full h-14 px-4 border border-[var(--border)] rounded-xl bg-[var(--bg)] text-[var(--text)] focus:border-[var(--amber)] outline-none" />
                                    </div>
                                    <div>
                                        <label htmlFor="objet">Objet</label>
                                        <select id="objet" className="w-full h-14 px-4 border border-[var(--border)] rounded-xl bg-[var(--bg)] text-[var(--text)] focus:border-[var(--amber)] outline-none">
                                            <option value="">Sélectionner...</option>
                                            <option value="partenariat">Partenariat</option>
                                            <option value="demo">Demande de démo</option>
                                            <option value="technique">Question technique</option>
                                            <option value="presse">Presse</option>
                                            <option value="autre">Autre</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="message">Message</label>
                                    <textarea id="message" required rows={5} placeholder="Votre message..." className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-[var(--bg)] text-[var(--text)] focus:border-[var(--amber)] outline-none resize-none" />
                                </div>
                                <BigButton type="submit" icon={<Send className="w-5 h-5" strokeWidth={1.8} />}>
                                    Envoyer le message
                                </BigButton>
                            </form>
                        )}
                        </div>
                    </div>

                    {/* Contact info */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="neu-card p-0 overflow-hidden">
                            <div className="relative w-full aspect-[16/9]">
                                <Image src="/images/gabon/libreville-city.jpg" alt="Adresse AGASA à Libreville" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
                            </div>
                            <div className="p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="icon-container" style={{ background: 'rgba(245,158,11,0.12)', width: '40px', height: '40px', borderRadius: '10px' }}>
                                    <MapPin className="w-5 h-5 text-[var(--amber)]" strokeWidth={1.8} />
                                </div>
                                <h3 className="font-serif font-bold text-[var(--text)]">Adresse</h3>
                            </div>
                            <p className="text-[var(--text-muted)] font-sans text-sm">
                                Siège AGASA<br />
                                Libreville, Gabon<br />
                                BP XXXX
                            </p>
                            </div>
                        </div>

                        <div className="neu-card p-0 overflow-hidden">
                            <div className="relative w-full aspect-[16/9]">
                                <Image src="/images/gabon/gabon-operators-meeting.jpg" alt="Assistance téléphonique AGASA" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
                            </div>
                            <div className="p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="icon-container" style={{ background: 'rgba(59,130,246,0.12)', width: '40px', height: '40px', borderRadius: '10px' }}>
                                    <Phone className="w-5 h-5 text-[var(--blue)]" strokeWidth={1.8} />
                                </div>
                                <h3 className="font-serif font-bold text-[var(--text)]">Téléphone</h3>
                            </div>
                            <p className="text-[var(--text)] font-sans font-semibold text-sm">+241 74 XX XX XX</p>
                            </div>
                        </div>

                        <div className="neu-card p-0 overflow-hidden">
                            <div className="relative w-full aspect-[16/9]">
                                <Image src="/images/gabon/team-review.jpg" alt="Support email AGASA" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
                            </div>
                            <div className="p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="icon-container" style={{ background: 'rgba(245,158,11,0.12)', width: '40px', height: '40px', borderRadius: '10px' }}>
                                    <Mail className="w-5 h-5 text-[var(--amber)]" strokeWidth={1.8} />
                                </div>
                                <h3 className="font-serif font-bold text-[var(--text)]">Email</h3>
                            </div>
                            <p className="text-[var(--text)] font-sans font-semibold text-sm">contact@agasa.ga</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
