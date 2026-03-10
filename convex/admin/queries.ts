import { query } from "../_generated/server";
import { v } from "convex/values";
import { requireAdminSession } from "./_auth";

export const getDashboardStats = query({
    args: { sessionToken: v.string() },
    handler: async (ctx, args) => {
        await requireAdminSession(ctx, args.sessionToken);
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
    args: { sessionToken: v.string() },
    handler: async (ctx, args) => {
        await requireAdminSession(ctx, args.sessionToken);
        return await ctx.db.query("users").collect();
    },
});

export const getAllEtablissements = query({
    args: { sessionToken: v.string() },
    handler: async (ctx, args) => {
        await requireAdminSession(ctx, args.sessionToken);
        return await ctx.db.query("etablissements").collect();
    },
});

export const getChecklistModeles = query({
    args: { sessionToken: v.string() },
    handler: async (ctx, args) => {
        await requireAdminSession(ctx, args.sessionToken);
        return await ctx.db.query("checklistModeles").collect();
    },
});

export const getBaremeAmendes = query({
    args: { sessionToken: v.string() },
    handler: async (ctx, args) => {
        await requireAdminSession(ctx, args.sessionToken);
        return await ctx.db.query("baremeAmendes").collect();
    },
});

export const getAuditLogs = query({
    args: { sessionToken: v.string(), limit: v.optional(v.number()) },
    handler: async (ctx, args) => {
        await requireAdminSession(ctx, args.sessionToken);
        return await ctx.db
            .query("auditLogs")
            .order("desc")
            .take(args.limit ?? 100);
    },
});

export const getConfigSysteme = query({
    args: { sessionToken: v.string() },
    handler: async (ctx, args) => {
        await requireAdminSession(ctx, args.sessionToken);
        return await ctx.db.query("configSysteme").collect();
    },
});

export const getSyncQueue = query({
    args: { sessionToken: v.string() },
    handler: async (ctx, args) => {
        await requireAdminSession(ctx, args.sessionToken);
        return await ctx.db
            .query("syncQueue")
            .order("desc")
            .take(50);
    },
});
