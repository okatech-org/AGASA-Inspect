"use client";

import React, { useRef, useState } from 'react';
import { Camera, Check, RotateCcw, Trash2, Type, Circle, ArrowRight, Lock } from 'lucide-react';
import { BigButton } from '@/components/ui/BigButton';

interface PhotoCaptureProps {
    inspectionRef?: string;
    inspecteur?: string;
    onCapture?: (photoData: { dataUrl: string; hash: string; metadata: Record<string, string> }) => void;
    onCancel?: () => void;
}

export function PhotoCapture({ inspectionRef = 'INSP-EST-2026-00145', inspecteur = 'INSP-2026-0001 — J.P. MOUSSAVOU', onCapture, onCancel }: PhotoCaptureProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [hash, setHash] = useState('');
    const [annotation, setAnnotation] = useState<'text' | 'circle' | 'arrow' | null>(null);

    const now = new Date();
    const metadata = {
        date: now.toLocaleDateString('fr-FR'),
        heure: now.toLocaleTimeString('fr-FR'),
        gps: '0.390°N, 9.454°E',
        inspecteur,
        inspection: inspectionRef,
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (ev) => {
            const dataUrl = ev.target?.result as string;
            setPreview(dataUrl);

            // Calculate SHA-256 hash
            try {
                const arrayBuffer = await file.arrayBuffer();
                const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                setHash(hashHex.substring(0, 8));
            } catch {
                setHash('offline');
            }
        };
        reader.readAsDataURL(file);
    };

    const handleConfirm = () => {
        if (preview && onCapture) {
            onCapture({ dataUrl: preview, hash, metadata });
        }
    };

    // Preview mode
    if (preview) {
        return (
            <div className="space-y-4">
                {/* Photo with metadata overlay */}
                <div className="relative rounded-2xl overflow-hidden border-2 border-gray-200">
                    <img src={preview} alt="Capture" className="w-full h-auto" />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-3 text-white text-xs space-y-0.5">
                        <p>📅 {metadata.date} — 🕐 {metadata.heure}</p>
                        <p>📍 {metadata.gps}</p>
                        <p>👤 {metadata.inspecteur}</p>
                        <p>📋 {metadata.inspection}</p>
                    </div>
                    <div className="absolute top-3 right-3 bg-black/60 px-2.5 py-1 rounded-lg">
                        <p className="text-white text-xs font-mono flex items-center gap-1">
                            <Lock className="w-3 h-3" /> {hash}
                        </p>
                    </div>
                </div>

                {/* Annotation tools */}
                <div className="flex gap-2 justify-center">
                    {[
                        { id: 'text' as const, icon: <Type className="w-5 h-5" />, label: 'Texte' },
                        { id: 'circle' as const, icon: <Circle className="w-5 h-5" />, label: 'Cercle' },
                        { id: 'arrow' as const, icon: <ArrowRight className="w-5 h-5" />, label: 'Flèche' },
                    ].map(tool => (
                        <button
                            key={tool.id}
                            onClick={() => setAnnotation(annotation === tool.id ? null : tool.id)}
                            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${annotation === tool.id ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'
                                }`}
                        >
                            {tool.icon} {tool.label}
                        </button>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <BigButton variant="secondary" onClick={() => setPreview(null)} icon={<RotateCcw className="w-5 h-5" />} className="flex-1">
                        Reprendre
                    </BigButton>
                    <BigButton onClick={handleConfirm} icon={<Check className="w-5 h-5" />} className="flex-1">
                        Conserver
                    </BigButton>
                </div>
                {onCancel && (
                    <button onClick={onCancel} className="w-full text-center text-gray-500 font-semibold py-2 flex items-center justify-center gap-1">
                        <Trash2 className="w-4 h-4" /> Annuler
                    </button>
                )}
            </div>
        );
    }

    // Capture mode
    return (
        <div className="space-y-4 text-center">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
            />
            <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-16 bg-inspect-green text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-green-700 transition-colors"
            >
                <Camera className="w-7 h-7" /> Prendre une photo
            </button>
            <p className="text-xs text-gray-500">Métadonnées et empreinte SHA-256 automatiques</p>
        </div>
    );
}
