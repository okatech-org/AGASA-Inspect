import { query } from "../_generated/server";
import { v } from "convex/values";

export const getById = query({
    args: { id: v.id("pvElectroniques") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

export const listByInspecteur = query({
    args: { inspecteurId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("pvElectroniques")
            .filter(q => q.eq(q.field("inspecteurId"), args.inspecteurId))
            .order("desc")
            .collect();
    },
});

export const getStatsPV = query({
    args: { inspecteurId: v.optional(v.string()) },
    handler: async (ctx, args) => {
        let pvList;
        if (args.inspecteurId) {
            pvList = await ctx.db
                .query("pvElectroniques")
                .filter(q => q.eq(q.field("inspecteurId"), args.inspecteurId))
                .collect();
        } else {
            pvList = await ctx.db.query("pvElectroniques").collect();
        }

        const totalAmendes = pvList.reduce((s, p) => s + p.totalAmende, 0);
        const totalPaye = pvList.reduce((s, p) => s + p.montantPaye, 0);
        const verrouilles = pvList.filter(p => p.verrouille).length;
        const brouillons = pvList.filter(p => p.statut === "brouillon").length;

        return {
            total: pvList.length,
            verrouilles,
            brouillons,
            totalAmendes,
            totalPaye,
            tauxRecouvrement: totalAmendes > 0 ? Math.round((totalPaye / totalAmendes) * 100) : 0,
        };
    },
});

export const getByInspection = query({
    args: { inspectionId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("pvElectroniques")
            .filter(q => q.eq(q.field("inspectionId"), args.inspectionId))
            .first();
    },
});
