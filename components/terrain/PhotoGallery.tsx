"use client";

import React, { useState } from 'react';
import { Trash2, X } from 'lucide-react';

interface Photo {
    id: string;
    dataUrl: string;
    hash: string;
    pointControle?: string;
}

interface PhotoGalleryProps {
    photos: Photo[];
    editable?: boolean;
    onDelete?: (id: string) => void;
}

export function PhotoGallery({ photos, editable = true, onDelete }: PhotoGalleryProps) {
    const [fullscreen, setFullscreen] = useState<string | null>(null);

    const fullPhoto = photos.find(p => p.id === fullscreen);

    return (
        <div>
            <p className="text-sm font-bold text-gray-700 mb-2">📷 {photos.length} photo{photos.length > 1 ? 's' : ''}</p>

            {/* Grid */}
            <div className="grid grid-cols-3 gap-2">
                {photos.map((photo, i) => (
                    <div
                        key={photo.id}
                        className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 cursor-pointer group"
                        onClick={() => setFullscreen(photo.id)}
                    >
                        <img src={photo.dataUrl} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                        <div className="absolute top-1.5 left-1.5 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {i + 1}
                        </div>
                        {photo.pointControle && (
                            <div className="absolute bottom-1 left-1 right-1 bg-black/60 rounded px-1.5 py-0.5 text-white text-[10px] truncate">
                                {photo.pointControle}
                            </div>
                        )}
                        {editable && onDelete && (
                            <button
                                onClick={(e) => { e.stopPropagation(); onDelete(photo.id); }}
                                className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 className="w-3 h-3" />
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Fullscreen */}
            {fullscreen && fullPhoto && (
                <div className="fixed inset-0 bg-black z-50 flex flex-col">
                    <div className="flex justify-end p-4">
                        <button onClick={() => setFullscreen(null)} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center p-4">
                        <img src={fullPhoto.dataUrl} alt="Plein écran" className="max-w-full max-h-full object-contain" />
                    </div>
                </div>
            )}
        </div>
    );
}
