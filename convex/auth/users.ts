"use node";

import { mutation, query } from "../_generated/server";
import { v } from "convex/values";
import bcrypt from "bcryptjs";
import { Id } from "../_generated/dataModel";
import crypto from "crypto";

export const loginUser = mutation({
    args: {
        matricule: v.string(),
        motDePasse: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_matricule", (q) => q.eq("matricule", args.matricule))
            .first();

        if (!user) {
            throw new Error("Identifiants incorrects.");
        }

        if (user.statut !== "actif") {
            throw new Error(`Compte ${user.statut}. Contactez votre superviseur.`);
        }

        const isMatch = await bcrypt.compare(args.motDePasse, user.motDePasse);

        if (!isMatch) {
            const nouvellesTentatives = user.tentativesEchouees + 1;
            let nouveauStatut = user.statut;

            if (nouvellesTentatives >= 5) {
                nouveauStatut = "verrouille";
            }

            await ctx.db.patch(user._id, {
                tentativesEchouees: nouvellesTentatives,
                statut: nouveauStatut,
                modifieLe: Date.now(),
            });

            await ctx.db.insert("auditLogs", {
                userId: user._id,
                action: "login_failed",
                module: "auth",
                details: `Échec mot de passe. Tentative ${nouvellesTentatives}/5`,
                horsLigne: false,
                timestamp: Date.now(),
            });

            if (nouvellesTentatives >= 5) {
                throw new Error("Compte verrouillé après 5 échecs. Contactez votre superviseur.");
            } else {
                throw new Error("Identifiants incorrects.");
            }
        }

        // Success
        await ctx.db.patch(user._id, {
            tentativesEchouees: 0,
            derniereConnexion: Date.now(),
            modifieLe: Date.now(),
        });

        // Invalide les anciennes sessions de l'utilisateur avant d'en créer une nouvelle.
        const oldSessions = await ctx.db
            .query("sessions")
            .withIndex("by_userId", (q) => q.eq("userId", String(user._id)))
            .collect();
        for (const session of oldSessions) {
            await ctx.db.delete(session._id);
        }

        const token = crypto.randomBytes(32).toString("hex");
        const now = Date.now();
        const twelveHours = 12 * 60 * 60 * 1000;

        await ctx.db.insert("sessions", {
            userId: String(user._id),
            token,
            creeLe: now,
            expireLe: now + twelveHours,
        });

        await ctx.db.insert("auditLogs", {
            userId: user._id,
            action: "login_success",
            module: "auth",
            details: "Connexion réussie",
            horsLigne: false,
            timestamp: Date.now(),
        });

        return {
            userId: user._id,
            nom: user.nom,
            prenom: user.prenom,
            role: user.role,
            province: user.province,
            sessionToken: token
        };
    },
});

export const verifyPin = mutation({
    args: {
        userId: v.id("users"),
        pin: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args.userId);

        if (!user) {
            throw new Error("Utilisateur introuvable");
        }

        const isMatch = await bcrypt.compare(args.pin, user.pin);

        if (!isMatch) {
            await ctx.db.insert("auditLogs", {
                userId: user._id,
                action: "pin_failed",
                module: "auth",
                details: "Tentative PIN échouée",
                horsLigne: false,
                timestamp: Date.now(),
            });
            return false;
        }

        await ctx.db.insert("auditLogs", {
            userId: user._id,
            action: "pin_success",
            module: "auth",
            details: "Validation PIN réussie",
            horsLigne: false,
            timestamp: Date.now(),
        });

        return true;
    },
});

export const getCurrentUser = query({
    args: { sessionToken: v.optional(v.string()) },
    handler: async (ctx, args) => {
        if (!args.sessionToken) return null;

        const session = await ctx.db
            .query("sessions")
            .withIndex("by_token", (q) => q.eq("token", args.sessionToken!))
            .first();

        if (!session || session.expireLe <= Date.now()) {
            return null;
        }

        const user = await ctx.db.get(session.userId as Id<"users">);
        if (!user || user.statut !== "actif") {
            return null;
        }

        return {
            _id: user._id,
            matricule: user.matricule,
            nom: user.nom,
            prenom: user.prenom,
            role: user.role,
            province: user.province,
            antenne: user.antenne,
            photo: user.photo,
        };
    }
});
