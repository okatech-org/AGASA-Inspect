import React from 'react';
import { cn } from './BigButton'; // reusing cn util

export interface FieldCardProps {
    title: string;
    value?: React.ReactNode;
    icon?: React.ReactNode;
    colorStrip?: 'green' | 'red' | 'orange' | 'blue' | 'gray';
    className?: string;
    onClick?: () => void;
    children?: React.ReactNode;
}

export function FieldCard({ title, value, icon, colorStrip, className, onClick, children }: FieldCardProps) {
    const stripColors = {
        green: "border-l-inspect-green",
        red: "border-l-inspect-red",
        orange: "border-l-inspect-orange",
        blue: "border-l-inspect-blue",
        gray: "border-l-gray-400",
    };

    return (
        <div
            onClick={onClick}
            className={cn(
                "bg-white border-2 border-gray-200 shadow-terrain p-5 rounded-lg",
                !children && "flex items-center justify-between",
                colorStrip && "border-l-4",
                colorStrip && stripColors[colorStrip],
                onClick && "cursor-pointer active:scale-[0.98] transition-transform",
                className
            )}
        >
            {children ? (
                <div>
                    <span className="text-sm font-bold text-gray-600 uppercase tracking-wider">{title}</span>
                    <div className="mt-2">{children}</div>
                </div>
            ) : (
                <>
                    <div className="flex flex-col gap-1">
                        <span className="text-xl font-bold text-gray-800">{title}</span>
                        <span className="text-[28px] font-bold text-gray-900">{value}</span>
                    </div>
                    {icon && <div className="text-gray-500">{icon}</div>}
                </>
            )}
        </div>
    );
}
