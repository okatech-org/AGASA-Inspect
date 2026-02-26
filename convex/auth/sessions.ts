import { mutation, query } from "../_generated/server";
import { v } from "convex/values";

export const createSession = mutation({
    args: {
        userId: v.string(),
        deviceInfo: v.optional(v.string()),
        ipAddress: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        // Generate a secure token (using standard crypto UUID since it's just a session token)
        const token = crypto.randomUUID();
        const now = Date.now();
        const twelveHours = 12 * 60 * 60 * 1000;

        const sessionId = await ctx.db.insert("sessions", {
            userId: args.userId,
            token,
            deviceInfo: args.deviceInfo,
            ipAddress: args.ipAddress,
            creeLe: now,
            expireLe: now + twelveHours,
        });

        await ctx.db.insert("auditLogs", {
            userId: args.userId,
            action: "session_created",
            module: "auth",
            details: "Nouvelle session",
            horsLigne: false,
            timestamp: now,
        });

        return { token, sessionId };
    },
});

export const destroySession = mutation({
    args: {
        sessionToken: v.string(),
    },
    handler: async (ctx, args) => {
        const session = await ctx.db
            .query("sessions")
            .filter((q) => q.eq(q.field("token"), args.sessionToken))
            .first();

        if (session) {
            // Invalidate the session by setting expiration to the past
            await ctx.db.patch(session._id, {
                expireLe: Date.now() - 1000,
            });

            await ctx.db.insert("auditLogs", {
                userId: session.userId,
                action: "session_destroyed",
                module: "auth",
                details: "Déconnexion utilisateur",
                horsLigne: false,
                timestamp: Date.now(),
            });
        }

        return true;
    },
});

export const isSessionValid = query({
    args: { sessionToken: v.string() },
    handler: async (ctx, args) => {
        if (!args.sessionToken) return false;

        const session = await ctx.db
            .query("sessions")
            .filter((q) => q.eq(q.field("token"), args.sessionToken))
            .first();

        if (!session) return false;

        return session.expireLe > Date.now();
    },
});
