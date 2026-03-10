import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import type { FunctionReference } from "convex/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
    try {
        const { matricule, motDePasse } = await req.json();
        if (!matricule || !motDePasse) {
            return NextResponse.json({ error: "Identifiants manquants" }, { status: 400 });
        }

        const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || process.env.CONVEX_URL;
        if (!convexUrl) {
            return NextResponse.json({ error: "Configuration Convex manquante" }, { status: 500 });
        }

        const client = new ConvexHttpClient(convexUrl);
        const loginMutation = "auth/users:loginUser" as unknown as FunctionReference<"mutation">;
        const result = await client.mutation(loginMutation, {
            matricule: String(matricule),
            motDePasse: String(motDePasse),
        });

        return NextResponse.json(result);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Erreur de connexion";
        return NextResponse.json({ error: message }, { status: 401 });
    }
}
