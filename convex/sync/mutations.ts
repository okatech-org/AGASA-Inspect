import { mutation, query } from "../_generated/server";
import { v } from "convex/values";
import { internal } from "../_generated/api";
import { CATEGORIES_ACTION, CORTEX, SIGNAL_TYPES, genererCorrelationId } from "../lib/neocortex";

export const syncInspection = mutation({
    args: {
        data: v.string(),
    },
    handler: async (ctx, args) => {
        const inspection = JSON.parse(args.data);
        const now = Date.now();
        let entityId: string | undefined;
        let mode: "created" | "updated" = "created";

        // Check if already exists (idempotent)
        const existing = await ctx.db
            .query("inspections")
            .filter(q => q.eq(q.field("reference"), inspection.reference))
            .first();

        if (existing) {
            // Last-write-wins for inspections (field inspector has priority)
            await ctx.db.patch(existing._id, {
                ...inspection,
                synchronisee: true,
                dateSynchronisation: now,
                modifieLe: now,
            });
            entityId = String(existing._id);
            mode = "updated";
        } else {
            const id = await ctx.db.insert("inspections", {
                ...inspection,
                synchronisee: true,
                dateSynchronisation: now,
                creeLe: now,
                modifieLe: now,
            });
            entityId = String(id);
            mode = "created";
        }

        await ctx.db.insert("auditLogs", {
            userId: inspection.inspecteurId || "system",
            action: "Sync: inspection reçue",
            module: "sync",
            cible: inspection.reference,
            horsLigne: false,
            timestamp: now,
        });

        await ctx.db.insert("signaux", {
            type: SIGNAL_TYPES.INSPECTION_SYNC,
            source: CORTEX.SYNC,
            destination: CORTEX.GATEWAY,
            entiteType: "inspections",
            entiteId: entityId,
            payload: { reference: inspection.reference, mode },
            confiance: 1,
            priorite: "NORMAL",
            correlationId: genererCorrelationId(),
            traite: false,
            timestamp: now,
        });

        await ctx.db.insert("historiqueActions", {
            action: "SYNC_INSPECTION",
            categorie: CATEGORIES_ACTION.SYSTEME,
            entiteType: "inspections",
            entiteId: entityId,
            userId: inspection.inspecteurId || "system",
            details: { reference: inspection.reference, mode },
            metadata: { source: CORTEX.SYNC },
            timestamp: now,
        });

        const payload = {
            type: "rapport_inspection",
            reference: inspection.reference,
            inspecteurId: inspection.inspecteurId,
            etablissementId: inspection.etablissementId,
            statut: inspection.statut,
            scoreConformite: inspection.scoreConformite,
            dateSynchronisation: now,
        };

        const fluxRefId = await ctx.db.insert("fluxInterApps", {
            fluxCode: "F3",
            direction: "envoi",
            typeMessage: "rapport_inspection",
            payload: JSON.stringify(payload),
            statut: "envoye",
            dateEnvoi: now,
            tentatives: 0,
        });

        const internalApi = internal as any;
        await ctx.scheduler.runAfter(0, internalApi.sync.outbound.pushToCore, {
            typeMessage: "rapport_inspection",
            payload,
            fluxRefId,
        });

        return { status: mode, id: entityId };
    },
});

export const syncPV = mutation({
    args: {
        data: v.string(),
    },
    handler: async (ctx, args) => {
        const pv = JSON.parse(args.data);
        const now = Date.now();
        let entityId: string | undefined;
        let mode: "created" | "updated" | "conflict_server_wins" = "created";

        const existing = await ctx.db
            .query("pvElectroniques")
            .filter(q => q.eq(q.field("reference"), pv.reference))
            .first();

        if (existing) {
            // PV already validated server-side? Don't overwrite
            if (existing.verrouille && !pv.verrouille) {
                mode = "conflict_server_wins";
                entityId = String(existing._id);
            } else {
                await ctx.db.patch(existing._id, {
                    ...pv,
                    synchronise: true,
                    dateSynchronisation: now,
                });
                mode = "updated";
                entityId = String(existing._id);
            }
        } else {
            const id = await ctx.db.insert("pvElectroniques", {
                ...pv,
                synchronise: true,
                dateSynchronisation: now,
                creeLe: now,
            });
            entityId = String(id);
            mode = "created";
        }

        await ctx.db.insert("auditLogs", {
            userId: pv.inspecteurId || "system",
            action: "Sync: PV reçu",
            module: "sync",
            cible: pv.reference,
            details: `Montant: ${pv.totalAmende} FCFA`,
            horsLigne: false,
            timestamp: now,
        });

        await ctx.db.insert("signaux", {
            type: SIGNAL_TYPES.PV_SYNC,
            source: CORTEX.SYNC,
            destination: CORTEX.GATEWAY,
            entiteType: "pvElectroniques",
            entiteId: entityId,
            payload: { reference: pv.reference, mode },
            confiance: 1,
            priorite: mode === "conflict_server_wins" ? "HIGH" : "NORMAL",
            correlationId: genererCorrelationId(),
            traite: false,
            timestamp: now,
        });

        await ctx.db.insert("historiqueActions", {
            action: "SYNC_PV",
            categorie: CATEGORIES_ACTION.SYSTEME,
            entiteType: "pvElectroniques",
            entiteId: entityId,
            userId: pv.inspecteurId || "system",
            details: { reference: pv.reference, mode },
            metadata: { source: CORTEX.SYNC },
            timestamp: now,
        });

        const payload = {
            type: "pv_amende",
            reference: pv.reference,
            inspecteurId: pv.inspecteurId,
            totalAmende: pv.totalAmende,
            statut: pv.statut,
            dateSynchronisation: now,
        };

        const fluxRefId = await ctx.db.insert("fluxInterApps", {
            fluxCode: "F3",
            direction: "envoi",
            typeMessage: "pv_amende",
            payload: JSON.stringify(payload),
            statut: "envoye",
            dateEnvoi: now,
            tentatives: 0,
        });

        const internalApi = internal as any;
        await ctx.scheduler.runAfter(0, internalApi.sync.outbound.pushToCore, {
            typeMessage: "pv_amende",
            payload,
            fluxRefId,
        });

        return { status: mode, id: entityId };
    },
});

export const syncPhoto = mutation({
    args: {
        inspectionId: v.string(),
        filename: v.string(),
        url: v.string(),
        hash: v.string(),
        gpsLatitude: v.number(),
        gpsLongitude: v.number(),
        gpsTimestamp: v.number(),
        inspecteurId: v.string(),
        pointControleId: v.optional(v.string()),
        taille: v.number(),
    },
    handler: async (ctx, args) => {
        const now = Date.now();

        // Idempotent by hash
        const existing = await ctx.db
            .query("photosInspection")
            .filter(q => q.eq(q.field("hash"), args.hash))
            .first();

        if (existing) return { status: "exists", id: existing._id };

        const id = await ctx.db.insert("photosInspection", {
            ...args,
            synchronisee: true,
            creeLe: now,
        });

        await ctx.db.insert("signaux", {
            type: SIGNAL_TYPES.PHOTO_SYNC,
            source: CORTEX.SYNC,
            destination: CORTEX.HIPPOCAMPE,
            entiteType: "photosInspection",
            entiteId: String(id),
            payload: {
                inspectionId: args.inspectionId,
                hash: args.hash,
            },
            confiance: 0.95,
            priorite: "LOW",
            correlationId: genererCorrelationId(),
            traite: false,
            timestamp: now,
        });

        await ctx.db.insert("historiqueActions", {
            action: "SYNC_PHOTO",
            categorie: CATEGORIES_ACTION.SYSTEME,
            entiteType: "photosInspection",
            entiteId: String(id),
            userId: args.inspecteurId,
            details: {
                inspectionId: args.inspectionId,
                filename: args.filename,
            },
            metadata: { source: CORTEX.SYNC },
            timestamp: now,
        });

        const payload = {
            type: "echantillon_preleve",
            inspectionId: args.inspectionId,
            hash: args.hash,
            inspecteurId: args.inspecteurId,
            dateSynchronisation: now,
        };

        const fluxRefId = await ctx.db.insert("fluxInterApps", {
            fluxCode: "F3",
            direction: "envoi",
            typeMessage: "echantillon_preleve",
            payload: JSON.stringify(payload),
            statut: "envoye",
            dateEnvoi: now,
            tentatives: 0,
        });

        const internalApi = internal as any;
        await ctx.scheduler.runAfter(0, internalApi.sync.outbound.pushToCore, {
            typeMessage: "echantillon_preleve",
            payload,
            fluxRefId,
        });

        return { status: "created", id };
    },
});

export const getDernieresSyncs = query({
    args: { inspecteurId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("auditLogs")
            .filter(q =>
                q.and(
                    q.eq(q.field("userId"), args.inspecteurId),
                    q.eq(q.field("module"), "sync")
                )
            )
            .order("desc")
            .take(20);
    },
});

export const getConflitsNonResolus = query({
    args: { inspecteurId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("syncQueue")
            .filter(q =>
                q.and(
                    q.eq(q.field("statut"), "echouee")
                )
            )
            .collect();
    },
});
