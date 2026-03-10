import type { MutationCtx, QueryCtx } from "../_generated/server";
import type { Id } from "../_generated/dataModel";

type Ctx = QueryCtx | MutationCtx;
type UserRole = "admin_systeme" | "superviseur" | "inspecteur" | "demo";

export async function requireAdminSession(ctx: Ctx, sessionToken: string) {
    const session = await ctx.db
        .query("sessions")
        .withIndex("by_token", (q) => q.eq("token", sessionToken))
        .first();

    if (!session || session.expireLe <= Date.now()) {
        throw new Error("Session invalide ou expirée");
    }

    const user = await ctx.db.get(session.userId as Id<"users">);
    if (!user || user.statut !== "actif") {
        throw new Error("Utilisateur invalide");
    }

    const role = user.role as UserRole;
    if (role !== "admin_systeme" && role !== "superviseur") {
        throw new Error("Privilèges insuffisants");
    }

    return user;
}
