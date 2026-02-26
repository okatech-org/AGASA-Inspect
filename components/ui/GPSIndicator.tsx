"use client";

import React, { useEffect, useState } from 'react';
import { MapPin, MapPinOff } from 'lucide-react';

export function GPSIndicator() {
    const [accuracy, setAccuracy] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("GPS non supporté");
            return;
        }

        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                setAccuracy(position.coords.accuracy);
                setError(null);
            },
            (err) => {
                setError(err.message);
                setAccuracy(null);
            },
            {
                enableHighAccuracy: true,
                maximumAge: 10000,
                timeout: 5000,
            }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    let colorClass = "text-gray-400";
    let text = "Inconnu";

    if (error) {
        colorClass = "text-inspect-red";
        text = "Inactif";
    } else if (accuracy !== null) {
        if (accuracy <= 10) {
            colorClass = "text-inspect-green";
            text = "Actif";
        } else if (accuracy <= 50) {
            colorClass = "text-inspect-orange";
            text = "Moyen";
        } else {
            colorClass = "text-inspect-red";
            text = "Faible";
        }
    }

    return (
        <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md border border-gray-200">
            {accuracy !== null && accuracy <= 50 ? (
                <MapPin className={`w-5 h-5 ${colorClass}`} />
            ) : (
                <MapPinOff className={`w-5 h-5 ${colorClass}`} />
            )}
            <span className={`text-sm font-bold ${colorClass}`}>{text}</span>
            {accuracy !== null && (
                <span className="text-xs text-gray-500 ml-1 hidden lg:inline">±{Math.round(accuracy)}m</span>
            )}
        </div>
    );
}
