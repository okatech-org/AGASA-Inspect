import React from 'react';
import Image from 'next/image';
import { cn } from './BigButton';

export interface FieldCardProps {
    title: string;
    value?: React.ReactNode;
    icon?: React.ReactNode;
    colorStrip?: 'green' | 'red' | 'orange' | 'blue' | 'gray';
    imageSrc?: string;
    className?: string;
    onClick?: () => void;
    children?: React.ReactNode;
}

function getFieldImage(title: string, imageSrc?: string) {
    if (imageSrc) return imageSrc;
    const normalized = title.toLowerCase();
    if (normalized.includes("sync")) return "/images/gabon/digital-office.jpg";
    if (normalized.includes("conform")) return "/images/gabon/gabon-compliance-council.jpg";
    if (normalized.includes("pv")) return "/images/gabon/certificate-verification.jpg";
    if (normalized.includes("inspection")) return "/images/gabon/public-health-advice.jpg";
    if (normalized.includes("planning")) return "/images/gabon/libreville-city.jpg";
    return "/images/gabon/team-review.jpg";
}

export function FieldCard({ title, value, icon, colorStrip, imageSrc, className, onClick, children }: FieldCardProps) {
    const stripColors = {
        green: "border-l-[var(--emerald)]",
        red: "border-l-[var(--rose)]",
        orange: "border-l-[var(--amber)]",
        blue: "border-l-[var(--blue)]",
        gray: "border-l-[var(--text-muted)]",
    };
    const contextualImage = getFieldImage(title, imageSrc);

    return (
        <div
            onClick={onClick}
            className={cn(
                "neu-card p-0 overflow-hidden",
                colorStrip && "border-l-4",
                colorStrip && stripColors[colorStrip],
                onClick && "cursor-pointer active:scale-[0.98]",
                className
            )}
        >
            <div className="relative w-full aspect-[16/9]">
                <Image
                    src={contextualImage}
                    alt={`Illustration ${title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="object-cover"
                />
            </div>
            <div className="p-5">
            {children ? (
                <div>
                    <span className="overline text-[var(--text-muted)]">{title}</span>
                    <div className="mt-2">{children}</div>
                </div>
            ) : (
                <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <span className="text-lg font-bold text-[var(--text)]">{title}</span>
                        <span className="text-[28px] font-bold text-[var(--text)]">{value}</span>
                    </div>
                    {icon && <div className="text-[var(--text-muted)]">{icon}</div>}
                </div>
            )}
            </div>
        </div>
    );
}
