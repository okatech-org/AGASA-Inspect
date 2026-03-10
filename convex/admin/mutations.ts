"use node";

import { mutation } from "../_generated/server";
import { v } from "convex/values";
import { requireAdminSession } from "./_auth";
import bcrypt from "bcryptjs";

export const createUser = mutation({
    args: {
        sessionToken: v.string(),
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
    },
    handler: async (ctx, args) => {
        const admin = await requireAdminSession(ctx, args.sessionToken);
        const now = Date.now();
        const hashedPin = await bcrypt.hash(args.pin, 10);
        const hashedPassword = await bcrypt.hash(args.motDePasse, 10);

        // Check idempotent
        const existing = await ctx.db
            .query("users")
            .filter(q => q.eq(q.field("matricule"), args.matricule))
            .first();
        if (existing) return existing._id;

        const id = await ctx.db.insert("users", {
            matricule: args.matricule,
            nom: args.nom,
            prenom: args.prenom,
            email: args.email,
            telephone: args.telephone,
            pin: hashedPin,
            motDePasse: hashedPassword,
            role: args.role,
            province: args.province,
            antenne: args.antenne,
            creePar: String(admin._id),
            statut: "actif",
            tentativesEchouees: 0,
            creeLe: now,
            modifieLe: now,
        });

        await ctx.db.insert("auditLogs", {
            userId: String(admin._id),
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
        sessionToken: v.string(),
        cle: v.string(),
        valeur: v.string(),
        categorie: v.string(),
        description: v.string(),
    },
    handler: async (ctx, args) => {
        const admin = await requireAdminSession(ctx, args.sessionToken);
        const now = Date.now();
        const existing = await ctx.db
            .query("configSysteme")
            .filter(q => q.eq(q.field("cle"), args.cle))
            .first();

        if (existing) {
            await ctx.db.patch(existing._id, {
                valeur: args.valeur,
                modifiePar: String(admin._id),
                modifieLe: now,
            });
        } else {
            await ctx.db.insert("configSysteme", {
                cle: args.cle,
                valeur: args.valeur,
                categorie: args.categorie,
                description: args.description,
                modifiePar: String(admin._id),
                modifieLe: now,
            });
        }

        await ctx.db.insert("auditLogs", {
            userId: String(admin._id),
            action: `Config modifiée: ${args.cle} = ${args.valeur}`,
            module: "admin",
            cible: args.cle,
            horsLigne: false,
            timestamp: now,
        });
    },
});
