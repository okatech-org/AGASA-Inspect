"use node";

import { mutation, query } from "../_generated/server";
import { v } from "convex/values";
import bcrypt from "bcryptjs";
import { Id } from "../_generated/dataModel";

export const loginUser = mutation({
    // ... (keeping loginUser as is up to verifyPin)
    args: {
        matricule: v.string(),
        motDePasse: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("matricule"), args.matricule))
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

        const token = crypto.randomUUID();

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
    args: { sessionToken: v.string() },
    handler: async (ctx, args) => {
        if (!args.sessionToken) return null;

        const session = await ctx.db
            .query("sessions")
            .filter((q) => q.eq(q.field("token"), args.sessionToken))
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
