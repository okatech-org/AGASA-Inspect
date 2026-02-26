import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const createInspection = mutation({
    args: {
        reference: v.string(),
        inspecteurId: v.string(),
        etablissementId: v.string(),
        checklistModeleId: v.string(),
        type: v.union(v.literal("programmee"), v.literal("inopinee"), v.literal("suite_signalement"), v.literal("renouvellement")),
        gpsLatitude: v.number(),
        gpsLongitude: v.number(),
        gpsPrecision: v.number(),
        gpsTimestamp: v.number(),
        creeeHorsLigne: v.boolean(),
    },
    handler: async (ctx, args) => {
        const now = Date.now();
        const id = await ctx.db.insert("inspections", {
            reference: args.reference,
            inspecteurId: args.inspecteurId,
            etablissementId: args.etablissementId,
            checklistModeleId: args.checklistModeleId,
            type: args.type,
            statut: "en_cours",
            dateDebut: now,
            gpsLatitude: args.gpsLatitude,
            gpsLongitude: args.gpsLongitude,
            gpsPrecision: args.gpsPrecision,
            gpsTimestamp: args.gpsTimestamp,
            reponses: [],
            scoreConformite: 0,
            smileyCalcule: 0,
            nbConformes: 0,
            nbNonConformes: 0,
            nbNonApplicables: 0,
            pointsCritiquesEnEchec: [],
            creeeHorsLigne: args.creeeHorsLigne,
            synchronisee: !args.creeeHorsLigne,
            historique: [{ action: "Inspection créée", userId: args.inspecteurId, timestamp: now }],
            creeLe: now,
            modifieLe: now,
        });

        // Audit log
        await ctx.db.insert("auditLogs", {
            userId: args.inspecteurId,
            action: "Inspection créée",
            module: "inspections",
            cible: args.reference,
            horsLigne: args.creeeHorsLigne,
            timestamp: now,
        });

        return id;
    },
});

export const updateReponse = mutation({
    args: {
        inspectionId: v.id("inspections"),
        pointId: v.string(),
        sectionId: v.string(),
        resultat: v.union(v.literal("conforme"), v.literal("non_conforme"), v.literal("non_applicable")),
        commentaire: v.optional(v.string()),
        temperature: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const inspection = await ctx.db.get(args.inspectionId);
        if (!inspection) throw new Error("Inspection non trouvée");

        const reponses = [...inspection.reponses];
        const idx = reponses.findIndex(r => r.pointId === args.pointId);
        const reponse = {
            pointId: args.pointId,
            sectionId: args.sectionId,
            resultat: args.resultat,
            commentaire: args.commentaire,
            temperature: args.temperature,
            photosIds: idx >= 0 ? reponses[idx].photosIds : [],
        };

        if (idx >= 0) {
            reponses[idx] = reponse;
        } else {
            reponses.push(reponse);
        }

        // Recalculate score
        const applicable = reponses.filter(r => r.resultat !== "non_applicable");
        const conformes = applicable.filter(r => r.resultat === "conforme");
        const score = applicable.length > 0 ? Math.round((conformes.length / applicable.length) * 100) : 0;
        const smiley = score >= 90 ? 5 : score >= 75 ? 4 : score >= 60 ? 3 : score >= 40 ? 2 : score >= 20 ? 1 : 0;

        await ctx.db.patch(args.inspectionId, {
            reponses,
            scoreConformite: score,
            smileyCalcule: smiley,
            nbConformes: conformes.length,
            nbNonConformes: applicable.filter(r => r.resultat === "non_conforme").length,
            nbNonApplicables: reponses.filter(r => r.resultat === "non_applicable").length,
            modifieLe: Date.now(),
        });
    },
});

export const terminerInspection = mutation({
    args: {
        inspectionId: v.id("inspections"),
        observationsGenerales: v.optional(v.string()),
        mesuresCorrectives: v.optional(v.string()),
        signatureInspecteur: v.string(),
        signatureResponsable: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const now = Date.now();
        const inspection = await ctx.db.get(args.inspectionId);
        if (!inspection) throw new Error("Inspection non trouvée");

        const dureeMinutes = Math.round((now - inspection.dateDebut) / 60000);

        await ctx.db.patch(args.inspectionId, {
            statut: "terminee",
            dateFin: now,
            dureeMinutes,
            observationsGenerales: args.observationsGenerales,
            mesuresCorrectives: args.mesuresCorrectives,
            signatureInspecteur: args.signatureInspecteur,
            signatureResponsable: args.signatureResponsable,
            historique: [
                ...inspection.historique,
                { action: `Inspection terminée — Score ${inspection.scoreConformite}%`, userId: inspection.inspecteurId, timestamp: now },
            ],
            modifieLe: now,
        });

        // Update establishment smiley
        if (inspection.etablissementId) {
            try {
                const etabId = inspection.etablissementId as any;
                await ctx.db.patch(etabId, {
                    smiley: inspection.smileyCalcule,
                    dernierSmiley: inspection.smileyCalcule,
                    dernierInspection: now,
                    modifieLe: now,
                });
            } catch {
                // Establishment ID may not be a valid Convex ID yet
            }
        }

        // Audit log
        await ctx.db.insert("auditLogs", {
            userId: inspection.inspecteurId,
            action: `Inspection terminée — ${inspection.scoreConformite}%`,
            module: "inspections",
            cible: inspection.reference,
            horsLigne: false,
            timestamp: now,
        });
    },
});

export const validerInspection = mutation({
    args: {
        inspectionId: v.id("inspections"),
        validateurId: v.string(),
    },
    handler: async (ctx, args) => {
        const now = Date.now();
        const inspection = await ctx.db.get(args.inspectionId);
        if (!inspection) throw new Error("Inspection non trouvée");

        await ctx.db.patch(args.inspectionId, {
            statut: "validee",
            historique: [
                ...inspection.historique,
                { action: "Inspection validée par superviseur", userId: args.validateurId, timestamp: now },
            ],
            modifieLe: now,
        });

        await ctx.db.insert("auditLogs", {
            userId: args.validateurId,
            action: "Validation inspection",
            module: "inspections",
            cible: inspection.reference,
            horsLigne: false,
            timestamp: now,
        });
    },
});
