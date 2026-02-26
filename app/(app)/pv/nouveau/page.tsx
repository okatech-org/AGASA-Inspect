"use client";

import React, { useState } from 'react';
import { Lock, AlertTriangle } from 'lucide-react';
import { BigButton } from '@/components/ui/BigButton';
import { SignaturePad } from '@/components/ui/SignaturePad';
import { FieldCard } from '@/components/ui/FieldCard';

const INFRACTIONS = [
    { code: 'INF-003', libelle: "Non-respect conditions d'hygiène (Décret 0578/2015)", commentaire: 'Équipements non nettoyés, absence de lave-mains fonctionnel.', min: 200000, max: 1000000, defaut: 500000, recidive: false },
    { code: 'INF-001', libelle: 'Détention de produits périmés (DLC dépassée)', commentaire: '3 produits laitiers avec DLC dépassée de 5 jours.', min: 200000, max: 1000000, defaut: 500000, recidive: true, pvPrecedent: '10/12/2025', multiplicateur: 1.5 },
];

function formatFCFA(n: number) { return n.toLocaleString('fr-FR') + ' FCFA'; }

export default function NouveauPVPage() {
    const [signatureInsp, setSignatureInsp] = useState<string | null>(null);
    const [signatureResp, setSignatureResp] = useState<string | null>(null);
    const [refusSignature, setRefusSignature] = useState(false);
    const [verrouille, setVerrouille] = useState(false);

    const totalAmendes = INFRACTIONS.reduce((sum, inf) => {
        const montant = inf.recidive ? inf.defaut * (inf.multiplicateur || 1) : inf.defaut;
        return sum + montant;
    }, 0);

    if (verrouille) {
        return (
            <div className="space-y-6 max-w-lg mx-auto text-center">
                <div className="bg-green-100 border-2 border-green-300 rounded-2xl p-8">
                    <Lock className="w-12 h-12 text-green-600 mx-auto mb-3" />
                    <p className="text-xl font-extrabold text-green-800">✅ PV validé et verrouillé</p>
                    <p className="text-green-700 font-semibold mt-2">Référence : PV-2026-000089</p>
                    <p className="text-sm text-green-600 mt-1">Le contrevenant sera notifié par SMS.</p>
                </div>
                <BigButton onClick={() => { }} className="w-full">Retour aux inspections</BigButton>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-inspect-red text-white rounded-2xl p-5">
                <p className="text-xs uppercase tracking-wider opacity-80">🏛️ AGASA — PROCÈS-VERBAL D&apos;INFRACTION</p>
                <p className="text-xl font-extrabold mt-1">PV-2026-000089</p>
                <div className="text-sm mt-2 space-y-0.5 opacity-90">
                    <p>📅 26/02/2026 à 10:32</p>
                    <p>📍 0.390°N, 9.454°E — Marché Mont-Bouet, Libreville</p>
                    <p>👤 INSP-2026-0001 — Jean-Pierre MOUSSAVOU</p>
                    <p>📋 Réf. Inspection : INSP-EST-2026-00145</p>
                </div>
            </div>

            {/* Section 2 - Contrevenant */}
            <FieldCard title="Identification du contrevenant">
                <div className="space-y-3">
                    <div>
                        <label className="text-xs font-bold text-gray-500">Nom du responsable</label>
                        <input defaultValue="MBOU Jacques" className="w-full h-12 px-4 border-2 border-gray-300 rounded-xl focus:border-inspect-green outline-none" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500">Qualité</label>
                        <select defaultValue="gerant" className="w-full h-12 px-4 border-2 border-gray-300 rounded-xl bg-white">
                            <option value="gerant">Gérant</option>
                            <option value="proprietaire">Propriétaire</option>
                            <option value="employe">Employé</option>
                            <option value="autre">Autre</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500">Téléphone (obligatoire pour SMS)</label>
                        <input defaultValue="+241 07 12 34 56" type="tel" className="w-full h-12 px-4 border-2 border-gray-300 rounded-xl focus:border-inspect-green outline-none" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500">Adresse</label>
                        <input defaultValue="Marché Mont-Bouet, Libreville" className="w-full h-12 px-4 border-2 border-gray-300 rounded-xl focus:border-inspect-green outline-none" />
                    </div>
                </div>
            </FieldCard>

            {/* Section 3 - Infractions */}
            <FieldCard title="Infractions constatées">
                <div className="space-y-4">
                    {INFRACTIONS.map((inf, i) => (
                        <div key={inf.code} className="bg-red-50 border-2 border-red-200 rounded-xl p-4 space-y-3">
                            <p className="font-bold text-red-800">❌ INFRACTION N°{i + 1}</p>
                            <div>
                                <span className="px-2 py-0.5 bg-red-200 rounded text-xs font-mono font-bold text-red-700">{inf.code}</span>
                                <p className="text-sm font-semibold text-gray-900 mt-1">{inf.libelle}</p>
                            </div>
                            <p className="text-sm text-gray-700">{inf.commentaire}</p>

                            <div className="bg-white border border-gray-200 rounded-lg p-3 space-y-1">
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>Barème : {formatFCFA(inf.min)} — {formatFCFA(inf.max)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-gray-800">💰 Montant appliqué</span>
                                    <span className="text-lg font-extrabold text-inspect-orange">{formatFCFA(inf.defaut)}</span>
                                </div>
                                <p className="text-xs text-gray-400 flex items-center gap-1"><Lock className="w-3 h-3" /> Non modifiable — Barème Arrêté n°426</p>
                            </div>

                            {inf.recidive && (
                                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                                    <p className="text-sm font-bold text-orange-800">⚠️ RÉCIDIVE détectée (PV du {inf.pvPrecedent})</p>
                                    <p className="text-sm text-orange-700">Multiplicateur : x{inf.multiplicateur}</p>
                                    <p className="text-lg font-extrabold text-orange-800">MONTANT RÉCIDIVE : {formatFCFA(inf.defaut * (inf.multiplicateur || 1))}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </FieldCard>

            {/* Section 4 - Total */}
            <div className="bg-inspect-red text-white rounded-2xl p-6 text-center">
                <p className="text-sm uppercase tracking-wider opacity-80">Total des amendes</p>
                <p className="text-4xl font-extrabold mt-1">{formatFCFA(totalAmendes)}</p>
                <p className="text-sm mt-2 opacity-80">🔒 MONTANT NON NÉGOCIABLE — Barème Arrêté n°426</p>
                <p className="text-xs mt-3 opacity-70">📅 Délai de paiement : 30 jours (jusqu&apos;au 28/03/2026)</p>
                <p className="text-xs opacity-70">⚠️ Au-delà, transmission au Trésor Public</p>
            </div>

            {/* Section 5 - Paiement */}
            <FieldCard title="Modalités de paiement">
                <div className="text-sm text-gray-700 space-y-1">
                    <p>📱 Paiement par Mobile Money : Airtel Money ou Moov Money</p>
                    <p>🔗 Un lien de paiement sera envoyé par SMS au +241 07 12 34 56</p>
                    <p>📋 Référence de paiement : <strong>PV-2026-000089</strong></p>
                </div>
            </FieldCard>

            {/* Signatures */}
            <FieldCard title="Signatures">
                <div className="space-y-6">
                    {/* Inspector signature */}
                    {signatureInsp ? (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                            <p className="text-green-700 font-bold">✅ Signé par INSP-2026-0001 le 26/02/2026 à 10:45</p>
                        </div>
                    ) : (
                        <SignaturePad label="Signature de l'inspecteur (obligatoire)" onSign={(sig) => setSignatureInsp(sig)} />
                    )}

                    {/* Responsible signature */}
                    {!refusSignature && !signatureResp && (
                        <div className="space-y-3">
                            <SignaturePad label="Signature du responsable (optionnelle)" onSign={(sig) => setSignatureResp(sig)} />
                            <button onClick={() => setRefusSignature(true)} className="w-full text-center text-red-600 font-semibold text-sm py-2">
                                ❌ Refus de signature
                            </button>
                        </div>
                    )}
                    {signatureResp && (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                            <p className="text-green-700 font-bold">✅ Signé par MBOU Jacques le 26/02/2026</p>
                        </div>
                    )}
                    {refusSignature && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                            <p className="text-red-700 font-bold">❌ Le responsable a refusé de signer — Mention portée au PV</p>
                        </div>
                    )}
                </div>
            </FieldCard>

            {/* Validation */}
            {signatureInsp && (
                <div className="space-y-3">
                    <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 text-sm text-red-800">
                        <p className="font-bold flex items-center gap-2"><AlertTriangle className="w-5 h-5" /> ATTENTION</p>
                        <p>Après validation, ce PV sera <strong>DÉFINITIVEMENT VERROUILLÉ</strong>. Le contrevenant sera notifié par SMS.</p>
                    </div>
                    <button
                        onClick={() => setVerrouille(true)}
                        className="w-full h-16 bg-inspect-red text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3"
                    >
                        <Lock className="w-6 h-6" /> VALIDER ET VERROUILLER LE PV
                    </button>
                </div>
            )}
        </div>
    );
}
