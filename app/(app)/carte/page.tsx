"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Crosshair, Filter } from 'lucide-react';

// Dynamic import to avoid SSR issues with Leaflet
const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });

// Leaflet CSS
import 'leaflet/dist/leaflet.css';

const ETABLISSEMENTS = [
    { id: '1', nom: 'Restaurant Le Palmier', categorie: 'CAT 1', lat: 0.3933, lng: 9.4536, smiley: 4, derniereInspection: '20/02/2026', planifie: false },
    { id: '2', nom: 'Boucherie Centrale', categorie: 'CAT 1', lat: 0.3901, lng: 9.4510, smiley: 2, derniereInspection: '15/01/2026', planifie: true },
    { id: '3', nom: 'Épicerie Du Coin', categorie: 'CAT 3', lat: 0.3985, lng: 9.4420, smiley: 5, derniereInspection: '10/02/2026', planifie: false },
    { id: '4', nom: 'Pâtisserie Belle Vue', categorie: 'CAT 2', lat: 0.3870, lng: 9.4600, smiley: 4, derniereInspection: '18/02/2026', planifie: false },
    { id: '5', nom: 'Abattoir Municipal', categorie: 'CAT 1', lat: 0.4100, lng: 9.4300, smiley: 1, derniereInspection: '01/12/2025', planifie: false },
    { id: '6', nom: 'Transport Froid Express', categorie: 'Transport', lat: 0.3950, lng: 9.4700, smiley: 1, derniereInspection: '05/12/2025', planifie: true },
    { id: '7', nom: 'Grillade Express', categorie: 'CAT 1', lat: 0.3920, lng: 9.4480, smiley: 0, derniereInspection: '15/11/2025', planifie: false },
    { id: '8', nom: 'Supermarché Central', categorie: 'CAT 2', lat: 0.3960, lng: 9.4550, smiley: 3, derniereInspection: '20/01/2026', planifie: false },
];

function getSmileyColor(smiley: number, planifie: boolean): string {
    if (planifie) return '🔵';
    if (smiley >= 4) return '🟢';
    if (smiley >= 2) return '🟠';
    if (smiley >= 1) return '🔴';
    return '⚫';
}

const CATEGORIES = ['Tous', 'CAT 1', 'CAT 2', 'CAT 3', 'Transport'];

export default function CartePage() {
    const [filtre, setFiltre] = useState('Tous');
    const [showFilters, setShowFilters] = useState(false);
    const [mounted, setMounted] = useState(false);

    React.useEffect(() => setMounted(true), []);

    const filteredEtabs = ETABLISSEMENTS.filter(
        e => filtre === 'Tous' || e.categorie === filtre
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-extrabold text-gray-900">🗺️ Carte Terrain</h1>
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-white border-2 border-gray-200 rounded-xl font-bold text-sm text-gray-700"
                >
                    <Filter className="w-4 h-4" /> Filtres
                </button>
            </div>

            {showFilters && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                    {CATEGORIES.map(c => (
                        <button
                            key={c}
                            onClick={() => setFiltre(c)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap ${filtre === c ? 'bg-inspect-green text-white' : 'bg-white border border-gray-200 text-gray-600'
                                }`}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            )}

            {/* Legend */}
            <div className="flex gap-3 text-xs font-semibold text-gray-600 flex-wrap">
                <span>🟢 Smiley 4-5</span>
                <span>🟠 Smiley 2-3</span>
                <span>🔴 Smiley 0-1</span>
                <span>🔵 Planifié</span>
            </div>

            {/* Map */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-gray-200" style={{ height: '500px' }}>
                {mounted ? (
                    <MapContainer
                        center={[0.3924, 9.4536]}
                        zoom={13}
                        style={{ height: '100%', width: '100%' }}
                        scrollWheelZoom={true}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {filteredEtabs.map(e => (
                            <Marker key={e.id} position={[e.lat, e.lng]}>
                                <Popup>
                                    <div className="text-sm min-w-[200px]">
                                        <p className="font-bold text-gray-900">{getSmileyColor(e.smiley, e.planifie)} {e.nom}</p>
                                        <p className="text-gray-600">{e.categorie}</p>
                                        <p className="text-gray-500 text-xs">{'⭐'.repeat(e.smiley)}{'☆'.repeat(5 - e.smiley)} — Dernière : {e.derniereInspection}</p>
                                        <div className="flex gap-2 mt-2">
                                            <Link href="/inspections/nouvelle" className="px-3 py-1 bg-inspect-green text-white rounded text-xs font-bold">
                                                📋 Inspecter
                                            </Link>
                                            <a href={`https://maps.google.com/?q=${e.lat},${e.lng}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-blue-500 text-white rounded text-xs font-bold">
                                                📍 Itinéraire
                                            </a>
                                        </div>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                ) : (
                    <div className="h-full bg-gray-100 flex items-center justify-center">
                        <p className="text-gray-500 font-semibold">Chargement de la carte...</p>
                    </div>
                )}

                {/* Center on me button */}
                <button className="absolute bottom-4 right-4 z-[1000] w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-200 hover:bg-gray-50">
                    <Crosshair className="w-6 h-6 text-inspect-blue" />
                </button>
            </div>

            {/* Nearby list */}
            <div>
                <h2 className="text-lg font-bold text-gray-800 mb-3">📍 Établissements à proximité ({filteredEtabs.length})</h2>
                <div className="space-y-2">
                    {filteredEtabs.slice(0, 5).map(e => (
                        <Link key={e.id} href="/inspections/nouvelle" className="block bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-gray-900">{getSmileyColor(e.smiley, e.planifie)} {e.nom}</p>
                                    <p className="text-xs text-gray-500">{e.categorie} — {'⭐'.repeat(e.smiley)} — {e.derniereInspection}</p>
                                </div>
                                {e.planifie && <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-bold">Planifié</span>}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
