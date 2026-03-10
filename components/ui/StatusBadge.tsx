import React from 'react';

type StatusType = "brouillon" | "en_cours" | "terminee" | "validee" | "synchronisee"
    | "success" | "danger" | "warning" | "info" | "default";

interface StatusBadgeProps {
    status: StatusType;
    label?: string;
}

const CONFIG: Record<string, { label: string; bg: string; text: string }> = {
    brouillon: { label: "Brouillon", bg: "rgba(107,114,128,0.14)", text: "var(--text-muted)" },
    en_cours: { label: "En cours", bg: "rgba(59,130,246,0.14)", text: "var(--blue)" },
    terminee: { label: "Terminée", bg: "rgba(16,185,129,0.14)", text: "var(--emerald)" },
    validee: { label: "Validée", bg: "var(--emerald)", text: "#ffffff" },
    synchronisee: { label: "Synchronisée ✓", bg: "rgba(16,185,129,0.14)", text: "var(--emerald)" },
    success: { label: "Actif", bg: "rgba(16,185,129,0.14)", text: "var(--emerald)" },
    danger: { label: "Erreur", bg: "rgba(244,63,94,0.14)", text: "var(--rose)" },
    warning: { label: "Attention", bg: "rgba(245,158,11,0.14)", text: "var(--amber)" },
    info: { label: "Info", bg: "rgba(59,130,246,0.14)", text: "var(--blue)" },
    default: { label: "—", bg: "rgba(107,114,128,0.14)", text: "var(--text-muted)" },
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
    const cfg = CONFIG[status] || CONFIG.default;

    return (
        <span
            className="badge"
            style={{
                backgroundColor: cfg.bg,
                color: cfg.text,
            }}
        >
            {label || cfg.label}
        </span>
    );
}
