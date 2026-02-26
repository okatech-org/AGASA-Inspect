import { mutation, query } from "../_generated/server";
import { v } from "convex/values";

export const syncInspection = mutation({
    args: {
        data: v.string(),
    },
    handler: async (ctx, args) => {
        const inspection = JSON.parse(args.data);
        const now = Date.now();

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
            return { status: "updated", id: existing._id };
        }

        const id = await ctx.db.insert("inspections", {
            ...inspection,
            synchronisee: true,
            dateSynchronisation: now,
            creeLe: now,
            modifieLe: now,
        });

        await ctx.db.insert("auditLogs", {
            userId: inspection.inspecteurId || "system",
            action: "Sync: inspection reçue",
            module: "sync",
            cible: inspection.reference,
            horsLigne: false,
            timestamp: now,
        });

        return { status: "created", id };
    },
});

export const syncPV = mutation({
    args: {
        data: v.string(),
    },
    handler: async (ctx, args) => {
        const pv = JSON.parse(args.data);
        const now = Date.now();

        const existing = await ctx.db
            .query("pvElectroniques")
            .filter(q => q.eq(q.field("reference"), pv.reference))
            .first();

        if (existing) {
            // PV already validated server-side? Don't overwrite
            if (existing.verrouille && !pv.verrouille) {
                return { status: "conflict_server_wins", id: existing._id };
            }
            await ctx.db.patch(existing._id, {
                ...pv,
                synchronise: true,
                dateSynchronisation: now,
            });
            return { status: "updated", id: existing._id };
        }

        const id = await ctx.db.insert("pvElectroniques", {
            ...pv,
            synchronise: true,
            dateSynchronisation: now,
            creeLe: now,
        });

        await ctx.db.insert("auditLogs", {
            userId: pv.inspecteurId || "system",
            action: "Sync: PV reçu",
            module: "sync",
            cible: pv.reference,
            details: `Montant: ${pv.totalAmende} FCFA`,
            horsLigne: false,
            timestamp: now,
        });

        return { status: "created", id };
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
