"use client";

import React, { useState, useEffect } from 'react';
import { Check, Delete } from 'lucide-react';
import { cn } from '../ui/BigButton';

interface PinPadProps {
    actionLabel: string;
    expectedLength?: 4 | 6;
    onComplete: (pin: string) => Promise<boolean>;
    onCancel?: () => void;
}

export function PinPad({ actionLabel, expectedLength = 4, onComplete, onCancel }: PinPadProps) {
    const [pin, setPin] = useState('');
    const [error, setError] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [lockoutTimer, setLockoutTimer] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (lockoutTimer > 0) {
            timer = setTimeout(() => setLockoutTimer(lockoutTimer - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [lockoutTimer]);

    const vibrate = () => {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(50);
        }
    };

    const handleErrorVibrate = () => {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate([100, 50, 100, 50, 100]);
        }
    };

    const handlePress = async (val: string) => {
        if (lockoutTimer > 0 || isLoading) return;

        // Clear error state on new input
        if (error) {
            setError(false);
            setPin('');
        }

        vibrate();

        if (val === 'delete') {
            setPin(prev => prev.slice(0, -1));
            return;
        }

        if (val === 'confirm') {
            if (pin.length === expectedLength) {
                await submitPin(pin);
            }
            return;
        }

        const newPin = pin + val;
        if (newPin.length <= expectedLength) {
            setPin(newPin);
        }

        if (newPin.length === expectedLength) {
            await submitPin(newPin);
        }
    };

    const submitPin = async (finalPin: string) => {
        setIsLoading(true);
        try {
            const success = await onComplete(finalPin);
            if (!success) {
                handleFailure();
            }
        } catch {
            handleFailure();
        } finally {
            setIsLoading(false);
        }
    };

    const handleFailure = () => {
        setError(true);
        handleErrorVibrate();
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        if (newAttempts >= 3) {
            setLockoutTimer(300); // 5 minutes
            setAttempts(0);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className={cn(
                "bg-white rounded-3xl p-8 max-w-[400px] w-full flex flex-col items-center shadow-2xl transition-transform",
                error && "animate-shake"
            )}>
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Confirmation PIN</h2>
                <p className="text-lg text-gray-600 font-medium text-center mb-8">{actionLabel}</p>

                {lockoutTimer > 0 ? (
                    <div className="bg-red-50 text-inspect-red p-4 rounded-xl mb-6 w-full text-center border-2 border-red-200">
                        <p className="font-bold text-lg mb-1">Verrouillé</p>
                        <p>Réessayez dans {Math.floor(lockoutTimer / 60)}:{(lockoutTimer % 60).toString().padStart(2, '0')}</p>
                    </div>
                ) : (
                    <>
                        <div className="flex gap-4 mb-8">
                            {Array.from({ length: expectedLength }).map((_, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "w-6 h-6 rounded-full border-2 transition-all duration-200",
                                        i < pin.length ? (error ? "bg-inspect-red border-inspect-red" : "bg-gray-800 border-gray-800") : "border-gray-300"
                                    )}
                                />
                            ))}
                        </div>

                        {error && (
                            <p className="text-inspect-red font-bold mb-6">
                                PIN incorrect — {3 - attempts} tentatives restantes
                            </p>
                        )}

                        <div className="grid grid-cols-3 gap-4 w-full max-w-[320px] mb-6">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                <button
                                    key={num}
                                    onClick={() => handlePress(num.toString())}
                                    className="h-20 bg-gray-100 rounded-2xl text-3xl font-bold flex items-center justify-center hover:bg-gray-200 active:bg-gray-300 transition-colors"
                                >
                                    {num}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePress('delete')}
                                className="h-20 bg-gray-100/80 rounded-2xl flex items-center justify-center hover:bg-gray-200 text-gray-600 transition-colors"
                                aria-label="Effacer"
                            >
                                <Delete className="w-8 h-8" />
                            </button>
                            <button
                                onClick={() => handlePress('0')}
                                className="h-20 bg-gray-100 rounded-2xl text-3xl font-bold flex items-center justify-center hover:bg-gray-200 transition-colors"
                            >
                                0
                            </button>
                            <button
                                onClick={() => handlePress('confirm')}
                                className="h-20 bg-inspect-green rounded-2xl flex items-center justify-center hover:bg-green-800 text-white transition-colors"
                                aria-label="Valider"
                            >
                                <Check className="w-8 h-8" />
                            </button>
                        </div>
                    </>
                )}

                {onCancel && (
                    <button
                        onClick={onCancel}
                        className="text-gray-500 font-bold text-lg hover:text-gray-800 py-2 px-6 rounded-xl"
                    >
                        Annuler
                    </button>
                )}
            </div>
        </div>
    );
}
