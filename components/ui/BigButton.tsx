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
    const baseStyles = "min-h-[56px] text-lg font-semibold rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-[0.97] w-full md:w-auto px-6";

    const variants = {
        primary: "bg-inspect-green text-white hover:bg-green-800",
        danger: "bg-inspect-red text-white hover:bg-red-900",
        warning: "bg-inspect-orange text-white hover:bg-orange-600",
        secondary: "bg-inspect-blue text-white hover:bg-blue-900",
        outline: "border-2 border-gray-300 text-gray-800 hover:bg-gray-50",
    };

    return (
        <button className={cn(baseStyles, variants[variant], className)} {...props}>
            {icon && <span className="w-6 h-6 flex-shrink-0">{icon}</span>}
            {children}
        </button>
    );
}
