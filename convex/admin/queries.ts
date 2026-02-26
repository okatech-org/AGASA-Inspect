import { query } from "../_generated/server";
import { v } from "convex/values";

export const getDashboardStats = query({
    handler: async (ctx) => {
        const [users, etabs, inspections, pvList, auditLogs] = await Promise.all([
            ctx.db.query("users").collect(),
            ctx.db.query("etablissements").collect(),
            ctx.db.query("inspections").collect(),
            ctx.db.query("pvElectroniques").collect(),
            ctx.db.query("auditLogs").collect(),
        ]);

        return {
            totalUsers: users.length,
            usersActifs: users.filter(u => u.statut === "actif").length,
            totalEtablissements: etabs.length,
            totalInspections: inspections.length,
            inspectionsEnCours: inspections.filter(i => i.statut === "en_cours" || i.statut === "brouillon").length,
            totalPV: pvList.length,
            totalAmendes: pvList.reduce((s, p) => s + p.totalAmende, 0),
            totalPaye: pvList.reduce((s, p) => s + p.montantPaye, 0),
            auditLogsCount: auditLogs.length,
        };
    },
});

export const getAllUsers = query({
    handler: async (ctx) => {
        return await ctx.db.query("users").collect();
    },
});

export const getAllEtablissements = query({
    handler: async (ctx) => {
        return await ctx.db.query("etablissements").collect();
    },
});

export const getChecklistModeles = query({
    handler: async (ctx) => {
        return await ctx.db.query("checklistModeles").collect();
    },
});

export const getBaremeAmendes = query({
    handler: async (ctx) => {
        return await ctx.db.query("baremeAmendes").collect();
    },
});

export const getAuditLogs = query({
    args: { limit: v.optional(v.number()) },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("auditLogs")
            .order("desc")
            .take(args.limit ?? 100);
    },
});

export const getConfigSysteme = query({
    handler: async (ctx) => {
        return await ctx.db.query("configSysteme").collect();
    },
});

export const getSyncQueue = query({
    handler: async (ctx) => {
        return await ctx.db
            .query("syncQueue")
            .order("desc")
            .take(50);
    },
});
