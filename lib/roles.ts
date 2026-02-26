export type RoleType = "admin_systeme" | "superviseur" | "inspecteur" | "demo";

export interface Permissions {
    inspections: {
        create: boolean;
        read: boolean;
        validate: boolean;
    };
    pv: {
        create: boolean;
        read: boolean;
        validate: boolean;
    };
    planning: {
        read: boolean;
        create: boolean;
        modify: boolean;
    };
    equipe: {
        read: boolean;
        manage: boolean;
    };
    admin: {
        users: boolean;
        config: boolean;
        audit: boolean;
        maintenance: boolean;
    };
    etablissements: {
        read: boolean;
        modify: boolean;
    };
    checklists: {
        read: boolean;
        modify: boolean;
    };
    baremes: {
        read: boolean;
        modify: boolean;
    };
    isReadOnly: boolean;
}

export const ROLE_PERMISSIONS: Record<RoleType, Permissions> = {
    admin_systeme: {
        inspections: { create: false, read: true, validate: false },
        pv: { create: false, read: true, validate: false },
        planning: { read: true, create: false, modify: false },
        equipe: { read: true, manage: true },
        admin: { users: true, config: true, audit: true, maintenance: true },
        etablissements: { read: true, modify: true },
        checklists: { read: true, modify: true },
        baremes: { read: true, modify: true },
        isReadOnly: false,
    },
    superviseur: {
        inspections: { create: true, read: true, validate: true },
        pv: { create: true, read: true, validate: true },
        planning: { read: true, create: true, modify: true },
        equipe: { read: true, manage: false },
        admin: { users: false, config: false, audit: false, maintenance: false },
        etablissements: { read: true, modify: false },
        checklists: { read: true, modify: false },
        baremes: { read: true, modify: false },
        isReadOnly: false,
    },
    inspecteur: {
        inspections: { create: true, read: true, validate: true },
        pv: { create: true, read: true, validate: true },
        planning: { read: true, create: false, modify: false },
        equipe: { read: false, manage: false },
        admin: { users: false, config: false, audit: false, maintenance: false },
        etablissements: { read: true, modify: false },
        checklists: { read: true, modify: false },
        baremes: { read: true, modify: false },
        isReadOnly: false,
    },
    demo: {
        inspections: { create: false, read: true, validate: false },
        pv: { create: false, read: true, validate: false },
        planning: { read: true, create: false, modify: false },
        equipe: { read: true, manage: false },
        admin: { users: true, config: true, audit: true, maintenance: true },
        etablissements: { read: true, modify: false },
        checklists: { read: true, modify: false },
        baremes: { read: true, modify: false },
        isReadOnly: true, // Crucial flag for hiding write actions
    },
};
