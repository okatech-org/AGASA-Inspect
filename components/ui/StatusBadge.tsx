import React from 'react';

type StatusType = "brouillon" | "en_cours" | "terminee" | "validee" | "synchronisee"
    | "success" | "danger" | "warning" | "info" | "default";

interface StatusBadgeProps {
    status: StatusType;
    label?: string;
}

const CONFIG: Record<string, { label: string; classes: string }> = {
    brouillon: { label: "Brouillon", classes: "bg-gray-100 text-gray-800 border-gray-300" },
    en_cours: { label: "En cours", classes: "bg-blue-100 text-blue-800 border-blue-300" },
    terminee: { label: "Terminée", classes: "bg-green-100 text-green-800 border-green-300" },
    validee: { label: "Validée", classes: "bg-inspect-green text-white border-green-800" },
    synchronisee: { label: "Synchronisée ✓", classes: "bg-green-50 text-inspect-green border-inspect-green" },
    success: { label: "Actif", classes: "bg-green-100 text-green-800 border-green-300" },
    danger: { label: "Erreur", classes: "bg-red-100 text-red-800 border-red-300" },
    warning: { label: "Attention", classes: "bg-orange-100 text-orange-800 border-orange-300" },
    info: { label: "Info", classes: "bg-blue-100 text-blue-800 border-blue-300" },
    default: { label: "—", classes: "bg-gray-100 text-gray-600 border-gray-300" },
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
    const cfg = CONFIG[status] || CONFIG.default;

    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${cfg.classes}`}>
            {label || cfg.label}
        </span>
    );
}
