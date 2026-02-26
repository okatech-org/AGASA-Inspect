import { query } from "../_generated/server";
import { v } from "convex/values";

export const getPlanningDuJour = query({
    args: { inspecteurId: v.string(), date: v.number() },
    handler: async (ctx, args) => {
        const startOfDay = new Date(args.date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(args.date);
        endOfDay.setHours(23, 59, 59, 999);

        return await ctx.db
            .query("planningInspections")
            .filter(q =>
                q.and(
                    q.eq(q.field("inspecteurId"), args.inspecteurId),
                    q.gte(q.field("datePrevisionnelle"), startOfDay.getTime()),
                    q.lte(q.field("datePrevisionnelle"), endOfDay.getTime())
                )
            )
            .collect();
    },
});

export const getInspectionsEnCours = query({
    args: { inspecteurId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("inspections")
            .filter(q =>
                q.and(
                    q.eq(q.field("inspecteurId"), args.inspecteurId),
                    q.or(
                        q.eq(q.field("statut"), "brouillon"),
                        q.eq(q.field("statut"), "en_cours")
                    )
                )
            )
            .collect();
    },
});

export const getStatsInspecteur = query({
    args: { inspecteurId: v.string() },
    handler: async (ctx, args) => {
        const allInspections = await ctx.db
            .query("inspections")
            .filter(q => q.eq(q.field("inspecteurId"), args.inspecteurId))
            .collect();

        const allPV = await ctx.db
            .query("pvElectroniques")
            .filter(q => q.eq(q.field("inspecteurId"), args.inspecteurId))
            .collect();

        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

        const ceMois = allInspections.filter(i => i.creeLe >= startOfMonth);
        const pvCeMois = allPV.filter(p => p.creeLe >= startOfMonth);
        const totalAmendes = pvCeMois.reduce((s, p) => s + p.totalAmende, 0);
        const tauxConformite = ceMois.length > 0
            ? Math.round(ceMois.reduce((s, i) => s + i.scoreConformite, 0) / ceMois.length)
            : 0;

        return {
            inspectionsCeMois: ceMois.length,
            pvCeMois: pvCeMois.length,
            totalAmendes,
            tauxConformite,
            totalInspections: allInspections.length,
        };
    },
});

export const getActiviteRecente = query({
    args: { inspecteurId: v.string(), limit: v.optional(v.number()) },
    handler: async (ctx, args) => {
        const limit = args.limit ?? 10;
        return await ctx.db
            .query("auditLogs")
            .filter(q => q.eq(q.field("userId"), args.inspecteurId))
            .order("desc")
            .take(limit);
    },
});

export const getById = query({
    args: { id: v.id("inspections") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

export const listByInspecteur = query({
    args: { inspecteurId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("inspections")
            .filter(q => q.eq(q.field("inspecteurId"), args.inspecteurId))
            .order("desc")
            .collect();
    },
});

export const getPhotos = query({
    args: { inspectionId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("photosInspection")
            .filter(q => q.eq(q.field("inspectionId"), args.inspectionId))
            .collect();
    },
});
