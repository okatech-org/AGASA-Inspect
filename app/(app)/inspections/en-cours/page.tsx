"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Camera, Check, X, Minus } from 'lucide-react';
import { BigButton } from '@/components/ui/BigButton';

// Mock checklist data
const CHECKLIST_SECTIONS = [
    {
        id: 's1',
        nom: 'Hygiène des locaux et équipements',
        points: [
            { id: 'p1', libelle: 'Le sol est propre et en bon état', poids: 3, critique: false, commentaireOblig: false, tempRequise: false },
            { id: 'p2', libelle: 'Les murs sont sans moisissure', poids: 2, critique: false, commentaireOblig: false, tempRequise: false },
            { id: 'p3', libelle: 'Les équipements sont nettoyés et désinfectés', poids: 3, critique: true, commentaireOblig: true, tempRequise: false },
            { id: 'p4', libelle: 'Présence de lave-mains fonctionnel avec savon', poids: 4, critique: true, commentaireOblig: true, tempRequise: false },
        ],
    },
    {
        id: 's2',
        nom: 'Chaîne du froid',
        points: [
            { id: 'p5', libelle: 'Température frigo entre 0°C et 4°C', poids: 5, critique: true, commentaireOblig: true, tempRequise: true },
            { id: 'p6', libelle: 'Température congélateur ≤ -18°C', poids: 5, critique: true, commentaireOblig: true, tempRequise: true },
            { id: 'p7', libelle: 'Produits frais correctement stockés', poids: 3, critique: false, commentaireOblig: false, tempRequise: false },
        ],
    },
    {
        id: 's3',
        nom: 'Manipulation des aliments',
        points: [
            { id: 'p8', libelle: 'Port de gants lors de la manipulation', poids: 3, critique: false, commentaireOblig: false, tempRequise: false },
            { id: 'p9', libelle: 'Séparation aliments crus / cuits', poids: 4, critique: true, commentaireOblig: true, tempRequise: false },
            { id: 'p10', libelle: 'DLC vérifiées sur les produits', poids: 5, critique: true, commentaireOblig: true, tempRequise: false },
        ],
    },
    {
        id: 's4',
        nom: 'Personnel et formation',
        points: [
            { id: 'p11', libelle: 'Certificat médical du personnel à jour', poids: 3, critique: false, commentaireOblig: false, tempRequise: false },
            { id: 'p12', libelle: 'Formation hygiène alimentaire attestée', poids: 2, critique: false, commentaireOblig: false, tempRequise: false },
        ],
    },
];

type Resultat = 'conforme' | 'non_conforme' | 'na' | null;

interface ReponseMap {
    [pointId: string]: {
        resultat: Resultat;
        commentaire: string;
        temperature: string;
    };
}

export default function InspectionEnCoursPage() {
    const router = useRouter();
    const [activeSection, setActiveSection] = useState(0);
    const [activePoint, setActivePoint] = useState(0);
    const [reponses, setReponses] = useState<ReponseMap>({});

    const allPoints = useMemo(() => CHECKLIST_SECTIONS.flatMap(s => s.points), []);
    const flatIndex = useMemo(() => {
        let idx = 0;
        for (let i = 0; i < activeSection; i++) idx += CHECKLIST_SECTIONS[i].points.length;
        return idx + activePoint;
    }, [activeSection, activePoint]);

    const totalPoints = allPoints.length;
    const answeredCount = Object.values(reponses).filter(r => r.resultat !== null).length;
    const progress = Math.round((answeredCount / totalPoints) * 100);

    // Score calculation
    const score = useMemo(() => {
        let totalPoids = 0;
        let conformePoids = 0;
        let nonConformeCount = 0;
        let critiquesFailed = 0;

        allPoints.forEach(p => {
            const r = reponses[p.id];
            if (r?.resultat === 'conforme') { totalPoids += p.poids; conformePoids += p.poids; }
            else if (r?.resultat === 'non_conforme') {
                totalPoids += p.poids;
                nonConformeCount++;
                if (p.critique) critiquesFailed++;
            }
        });

        const pct = totalPoids > 0 ? Math.round((conformePoids / totalPoids) * 100) : 0;
        const smiley = pct >= 90 ? 5 : pct >= 75 ? 4 : pct >= 60 ? 3 : pct >= 40 ? 2 : pct >= 20 ? 1 : 0;

        return {
            pct,
            smiley,
            conformes: Object.values(reponses).filter(r => r.resultat === 'conforme').length,
            nonConformes: nonConformeCount,
            na: Object.values(reponses).filter(r => r.resultat === 'na').length,
            critiquesFailed,
        };
    }, [reponses, allPoints]);

    const section = CHECKLIST_SECTIONS[activeSection];
    const point = section.points[activePoint];
    const reponse = reponses[point.id] || { resultat: null, commentaire: '', temperature: '' };

    const setResultat = useCallback((resultat: Resultat) => {
        // Vibration feedback
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
            navigator.vibrate(50);
        }
        setReponses(prev => ({
            ...prev,
            [point.id]: { ...prev[point.id] || { commentaire: '', temperature: '' }, resultat },
        }));
    }, [point.id]);

    const updateField = useCallback((field: 'commentaire' | 'temperature', value: string) => {
        setReponses(prev => ({
            ...prev,
            [point.id]: { ...prev[point.id] || { resultat: null, commentaire: '', temperature: '' }, [field]: value },
        }));
    }, [point.id]);

    const navigatePoint = useCallback((dir: 1 | -1) => {
        const newPoint = activePoint + dir;
        if (newPoint >= 0 && newPoint < section.points.length) {
            setActivePoint(newPoint);
        } else if (dir > 0 && activeSection < CHECKLIST_SECTIONS.length - 1) {
            setActiveSection(activeSection + 1);
            setActivePoint(0);
        } else if (dir < 0 && activeSection > 0) {
            setActiveSection(activeSection - 1);
            setActivePoint(CHECKLIST_SECTIONS[activeSection - 1].points.length - 1);
        }
    }, [activePoint, activeSection, section.points.length]);

    // Completed
    if (progress === 100) {
        const scoreColor = score.pct >= 80 ? 'text-green-600 bg-green-50' : score.pct >= 60 ? 'text-orange-600 bg-orange-50' : 'text-red-600 bg-red-50';
        return (
            <div className="space-y-6 max-w-lg mx-auto">
                <div className="bg-green-100 border-2 border-green-300 rounded-xl p-4 text-center">
                    <p className="text-green-800 font-bold text-lg">✅ Checklist complète — {totalPoints}/{totalPoints} points évalués</p>
                </div>
                <div className={`text-center rounded-2xl p-8 ${scoreColor}`}>
                    <p className="text-6xl font-extrabold">{score.pct}%</p>
                    <p className="text-2xl mt-2">{'⭐'.repeat(score.smiley)}{'☆'.repeat(5 - score.smiley)}</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-2 text-sm">
                    <p>✅ <strong>{score.conformes}</strong> Conformes</p>
                    <p>❌ <strong>{score.nonConformes}</strong> Non conformes</p>
                    <p>⬜ <strong>{score.na}</strong> Non applicables</p>
                    {score.critiquesFailed > 0 && (
                        <p className="text-red-600 font-bold">🔴 {score.critiquesFailed} points critiques en échec — infractions potentielles</p>
                    )}
                    <p className="text-gray-500 mt-4">Délai de mise en conformité suggéré : <strong>30 jours</strong></p>
                </div>
                <BigButton onClick={() => router.push('/inspections')} className="w-full h-16 text-lg">
                    📄 Terminer l&apos;inspection
                </BigButton>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Progress bar */}
            <div className="bg-white rounded-xl p-3 border border-gray-200 sticky top-16 z-10">
                <div className="flex justify-between text-xs font-bold text-gray-600 mb-1">
                    <span>Section {activeSection + 1}/{CHECKLIST_SECTIONS.length} : {section.nom}</span>
                    <span>{answeredCount}/{totalPoints} — {progress}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, backgroundColor: progress === 100 ? '#1B5E20' : '#1565C0' }} />
                </div>
            </div>

            {/* Section tabs */}
            <div className="flex gap-2 overflow-x-auto pb-1">
                {CHECKLIST_SECTIONS.map((s, i) => {
                    const sectionAnswered = s.points.filter(p => reponses[p.id]?.resultat).length;
                    const complete = sectionAnswered === s.points.length;
                    return (
                        <button
                            key={s.id}
                            onClick={() => { setActiveSection(i); setActivePoint(0); }}
                            className={`flex items-center gap-1 px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap border-2 transition-colors ${activeSection === i ? 'bg-inspect-green text-white border-inspect-green' :
                                    complete ? 'bg-green-50 text-green-700 border-green-200' :
                                        'bg-white text-gray-600 border-gray-200'
                                }`}
                        >
                            {complete && '✅ '}{s.nom.substring(0, 15)}… <span className="bg-white/20 px-1.5 py-0.5 rounded">{sectionAnswered}/{s.points.length}</span>
                        </button>
                    );
                })}
            </div>

            {/* Point card */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 space-y-5">
                <div className="text-xs text-gray-500 font-bold">
                    📋 Point {flatIndex + 1}/{totalPoints} — Section «{section.nom}»
                </div>
                <p className="text-xl font-bold text-gray-900 leading-snug">{point.libelle}</p>

                {point.critique && (
                    <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2 text-red-700 font-bold text-sm">
                        🔴 POINT CRITIQUE
                    </div>
                )}

                {/* 3 buttons */}
                <div className="grid grid-cols-3 gap-3">
                    <button
                        onClick={() => setResultat('conforme')}
                        className={`h-16 rounded-xl font-bold text-lg flex flex-col items-center justify-center gap-1 transition-all ${reponse.resultat === 'conforme' ? 'bg-inspect-green text-white scale-105 shadow-lg' : 'bg-green-50 text-green-700 border-2 border-green-200'
                            }`}
                    >
                        <Check className="w-6 h-6" /> CONFORME
                    </button>
                    <button
                        onClick={() => setResultat('non_conforme')}
                        className={`h-16 rounded-xl font-bold text-lg flex flex-col items-center justify-center gap-1 transition-all ${reponse.resultat === 'non_conforme' ? 'bg-inspect-red text-white scale-105 shadow-lg' : 'bg-red-50 text-red-700 border-2 border-red-200'
                            }`}
                    >
                        <X className="w-6 h-6" /> NON CONF.
                    </button>
                    <button
                        onClick={() => setResultat('na')}
                        className={`h-16 rounded-xl font-bold text-lg flex flex-col items-center justify-center gap-1 transition-all ${reponse.resultat === 'na' ? 'bg-gray-600 text-white scale-105 shadow-lg' : 'bg-gray-100 text-gray-500 border-2 border-gray-200'
                            }`}
                    >
                        <Minus className="w-6 h-6" /> N/A
                    </button>
                </div>

                {/* Critical alert */}
                {reponse.resultat === 'non_conforme' && point.critique && (
                    <div className="bg-red-100 border-2 border-red-300 rounded-xl p-4 text-red-800 font-bold text-sm animate-pulse">
                        🔴 POINT CRITIQUE EN ÉCHEC — Infraction potentielle détectée
                    </div>
                )}

                {/* Comment field */}
                {reponse.resultat === 'non_conforme' && point.commentaireOblig && (
                    <div>
                        <label className="text-sm font-bold text-gray-700">💬 Commentaire (obligatoire)</label>
                        <textarea
                            value={reponse.commentaire}
                            onChange={(e) => updateField('commentaire', e.target.value)}
                            placeholder="Décrivez la non-conformité..."
                            className="w-full h-20 mt-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-inspect-green outline-none"
                        />
                    </div>
                )}

                {/* Temperature field */}
                {point.tempRequise && (
                    <div>
                        <label className="text-sm font-bold text-gray-700">🌡️ Température mesurée</label>
                        <div className="flex items-center gap-2 mt-1">
                            <input
                                type="number"
                                value={reponse.temperature}
                                onChange={(e) => updateField('temperature', e.target.value)}
                                placeholder="—"
                                className="w-24 h-14 px-4 text-center text-xl font-bold border-2 border-gray-300 rounded-xl focus:border-inspect-green outline-none"
                            />
                            <span className="text-xl font-bold text-gray-500">°C</span>
                        </div>
                    </div>
                )}

                {/* Photo button */}
                <button className="flex items-center gap-2 px-4 py-3 bg-gray-100 rounded-xl text-gray-600 font-semibold text-sm hover:bg-gray-200 transition-colors">
                    <Camera className="w-5 h-5" /> Ajouter une photo (optionnel)
                </button>
            </div>

            {/* Navigation */}
            <div className="flex gap-3">
                <button
                    onClick={() => navigatePoint(-1)}
                    disabled={flatIndex === 0}
                    className="flex-1 h-14 bg-white border-2 border-gray-200 rounded-xl font-bold text-gray-600 flex items-center justify-center gap-2 disabled:opacity-30"
                >
                    <ChevronLeft className="w-5 h-5" /> Précédent
                </button>
                <button
                    onClick={() => navigatePoint(1)}
                    disabled={flatIndex === totalPoints - 1}
                    className="flex-1 h-14 bg-inspect-green text-white rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-30"
                >
                    Suivant <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Live score bar */}
            <div className={`fixed bottom-0 left-0 right-0 p-3 text-center text-sm font-bold z-20 ${score.pct >= 80 ? 'bg-green-100 text-green-800' : score.pct >= 60 ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'
                }`}>
                Score : {score.pct}% | ✅ {score.conformes} | ❌ {score.nonConformes} | ⬜ {score.na} {score.critiquesFailed > 0 && `| 🔴 ${score.critiquesFailed}`}
            </div>
        </div>
    );
}
