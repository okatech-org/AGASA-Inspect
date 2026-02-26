"use client";

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Eraser, Check } from 'lucide-react';

interface SignaturePadProps {
    label?: string;
    onSign?: (signatureDataUrl: string) => void;
}

export function SignaturePad({ label = 'Signature', onSign }: SignaturePadProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [drawing, setDrawing] = useState(false);
    const [hasContent, setHasContent] = useState(false);

    const getCoords = (e: React.TouchEvent | React.MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        if ('touches' in e) {
            return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
        }
        return { x: (e as React.MouseEvent).clientX - rect.left, y: (e as React.MouseEvent).clientY - rect.top };
    };

    const startDrawing = useCallback((e: React.TouchEvent | React.MouseEvent) => {
        e.preventDefault();
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;
        const { x, y } = getCoords(e);
        ctx.beginPath();
        ctx.moveTo(x, y);
        setDrawing(true);
    }, []);

    const draw = useCallback((e: React.TouchEvent | React.MouseEvent) => {
        if (!drawing) return;
        e.preventDefault();
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;
        const { x, y } = getCoords(e);
        ctx.lineTo(x, y);
        ctx.stroke();
        setHasContent(true);
    }, [drawing]);

    const stopDrawing = useCallback(() => {
        setDrawing(false);
    }, []);

    const clear = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setHasContent(false);
    };

    const confirm = () => {
        const canvas = canvasRef.current;
        if (!canvas || !hasContent) return;
        const dataUrl = canvas.toDataURL('image/png');
        onSign?.(dataUrl);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
    }, []);

    return (
        <div className="space-y-3">
            <p className="text-sm font-bold text-gray-700">✍️ {label}</p>
            <div className="border-2 border-gray-300 rounded-xl overflow-hidden bg-white">
                <canvas
                    ref={canvasRef}
                    width={600}
                    height={200}
                    className="w-full h-[200px] touch-none cursor-crosshair"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                />
            </div>
            <div className="flex gap-3">
                <button onClick={clear} className="flex-1 h-12 bg-gray-100 text-gray-700 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                    <Eraser className="w-5 h-5" /> Effacer
                </button>
                <button
                    onClick={confirm}
                    disabled={!hasContent}
                    className="flex-1 h-12 bg-inspect-green text-white rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-40 transition-colors"
                >
                    <Check className="w-5 h-5" /> Valider
                </button>
            </div>
        </div>
    );
}
