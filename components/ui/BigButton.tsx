import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface BigButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'danger' | 'warning' | 'secondary' | 'outline';
    icon?: React.ReactNode;
}

export function BigButton({
    children,
    variant = 'primary',
    icon,
    className,
    ...props
}: BigButtonProps) {
    const baseStyles = "min-h-[56px] text-base font-semibold rounded-xl flex items-center justify-center gap-3 transition-all duration-300 ease-agasa active:scale-[0.97] w-full md:w-auto px-8 font-sans cursor-pointer";

    const variants = {
        primary: "text-white gradient-agasa shadow-glow hover:shadow-[0_12px_40px_rgba(16,185,129,0.4)] hover:-translate-y-0.5 border-none",
        danger: "bg-[var(--rose)] text-white hover:opacity-90 hover:-translate-y-0.5 border-none",
        warning: "bg-[var(--amber)] text-white hover:opacity-90 hover:-translate-y-0.5 border-none",
        secondary: "bg-[var(--blue)] text-white hover:opacity-90 hover:-translate-y-0.5 border-none",
        outline: "border border-[var(--border)] text-[var(--text)] bg-transparent hover:bg-[var(--bg-muted)]",
    };

    return (
        <button className={cn(baseStyles, variants[variant], className)} {...props}>
            {icon && <span className="w-6 h-6 flex-shrink-0">{icon}</span>}
            {children}
        </button>
    );
}
