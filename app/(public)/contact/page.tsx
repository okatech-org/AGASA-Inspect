"use client";

import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail, CheckCircle } from 'lucide-react';
import { BigButton } from '@/components/ui/BigButton';

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock submit
        setSubmitted(true);
    };

    return (
        <div className="pt-24 pb-20">
            {/* Header */}
            <div className="max-w-4xl mx-auto px-4 text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                    Contact
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Une question sur AGASA-Inspect? Contactez-nous directement.
                </p>
            </div>

            <div className="max-w-5xl mx-auto px-4">
                <div className="grid md:grid-cols-5 gap-10">
                    {/* Form */}
                    <div className="md:col-span-3 bg-white border-2 border-gray-100 rounded-3xl p-8">
                        {submitted ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <CheckCircle className="w-16 h-16 text-inspect-green mb-4" />
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Message envoyé !</h2>
                                <p className="text-gray-600">Nous reviendrons vers vous dans les plus brefs délais.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="nom" className="block font-bold text-gray-700 mb-1.5">Nom complet</label>
                                        <input id="nom" type="text" required placeholder="Jean Dupont" className="w-full h-14 px-4 text-lg border-2 border-gray-300 rounded-xl focus:border-inspect-green outline-none" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block font-bold text-gray-700 mb-1.5">Email</label>
                                        <input id="email" type="email" required placeholder="jean@example.com" className="w-full h-14 px-4 text-lg border-2 border-gray-300 rounded-xl focus:border-inspect-green outline-none" />
                                    </div>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="telephone" className="block font-bold text-gray-700 mb-1.5">Téléphone</label>
                                        <input id="telephone" type="tel" placeholder="+241 XX XX XX XX" className="w-full h-14 px-4 text-lg border-2 border-gray-300 rounded-xl focus:border-inspect-green outline-none" />
                                    </div>
                                    <div>
                                        <label htmlFor="objet" className="block font-bold text-gray-700 mb-1.5">Objet</label>
                                        <select id="objet" className="w-full h-14 px-4 text-lg border-2 border-gray-300 rounded-xl focus:border-inspect-green outline-none bg-white">
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
                                    <label htmlFor="message" className="block font-bold text-gray-700 mb-1.5">Message</label>
                                    <textarea id="message" required rows={5} placeholder="Votre message..." className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-inspect-green outline-none resize-none" />
                                </div>
                                <BigButton type="submit" icon={<Send className="w-5 h-5" />}>
                                    Envoyer le message
                                </BigButton>
                            </form>
                        )}
                    </div>

                    {/* Contact info */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-inspect-green/5 border border-inspect-green/20 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <MapPin className="w-6 h-6 text-inspect-green" />
                                <h3 className="font-bold text-gray-900">Adresse</h3>
                            </div>
                            <p className="text-gray-700">
                                Siège AGASA<br />
                                Libreville, Gabon<br />
                                BP XXXX
                            </p>
                        </div>

                        <div className="bg-inspect-blue/5 border border-inspect-blue/20 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <Phone className="w-6 h-6 text-inspect-blue" />
                                <h3 className="font-bold text-gray-900">Téléphone</h3>
                            </div>
                            <p className="text-gray-700 font-semibold">+241 74 XX XX XX</p>
                        </div>

                        <div className="bg-inspect-orange/5 border border-inspect-orange/20 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <Mail className="w-6 h-6 text-inspect-orange" />
                                <h3 className="font-bold text-gray-900">Email</h3>
                            </div>
                            <p className="text-gray-700 font-semibold">contact@agasa.ga</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
