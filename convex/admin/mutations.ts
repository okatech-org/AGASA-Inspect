import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
    args: {
        matricule: v.string(),
        nom: v.string(),
        prenom: v.string(),
        email: v.string(),
        telephone: v.string(),
        pin: v.string(),
        motDePasse: v.string(),
        role: v.union(v.literal("admin_systeme"), v.literal("superviseur"), v.literal("inspecteur"), v.literal("demo")),
        province: v.string(),
        antenne: v.string(),
        creePar: v.string(),
    },
    handler: async (ctx, args) => {
        const now = Date.now();

        // Check idempotent
        const existing = await ctx.db
            .query("users")
            .filter(q => q.eq(q.field("matricule"), args.matricule))
            .first();
        if (existing) return existing._id;

        const id = await ctx.db.insert("users", {
            ...args,
            statut: "actif",
            tentativesEchouees: 0,
            creeLe: now,
            modifieLe: now,
        });

        await ctx.db.insert("auditLogs", {
            userId: args.creePar,
            action: `Utilisateur créé: ${args.matricule}`,
            module: "admin",
            cible: args.matricule,
            horsLigne: false,
            timestamp: now,
        });

        return id;
    },
});

export const updateConfig = mutation({
    args: {
        cle: v.string(),
        valeur: v.string(),
        categorie: v.string(),
        description: v.string(),
        modifiePar: v.string(),
    },
    handler: async (ctx, args) => {
        const now = Date.now();
        const existing = await ctx.db
            .query("configSysteme")
            .filter(q => q.eq(q.field("cle"), args.cle))
            .first();

        if (existing) {
            await ctx.db.patch(existing._id, {
                valeur: args.valeur,
                modifiePar: args.modifiePar,
                modifieLe: now,
            });
        } else {
            await ctx.db.insert("configSysteme", { ...args, modifieLe: now });
        }

        await ctx.db.insert("auditLogs", {
            userId: args.modifiePar,
            action: `Config modifiée: ${args.cle} = ${args.valeur}`,
            module: "admin",
            cible: args.cle,
            horsLigne: false,
            timestamp: now,
        });
    },
});
