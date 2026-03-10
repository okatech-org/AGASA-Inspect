import crypto from "crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const DEFAULT_CORE_GATEWAY_URL = "https://agasa-core.web.app";

type F3Payload = {
    flux: "F3";
    timestamp: number;
    data: unknown;
};

function getCoreGatewayUrl() {
    return (process.env.AGASA_CORE_GATEWAY_URL || DEFAULT_CORE_GATEWAY_URL).replace(/\/$/, "");
}

function getHmacSecret() {
    const scoped = process.env.AGASA_GATEWAY_HMAC_SECRET_F3;
    const shared = process.env.AGASA_GATEWAY_HMAC_SECRET || process.env.GATEWAY_HMAC_SECRET;
    const secret = scoped || shared;
    if (!secret) {
        throw new Error("Secret HMAC manquant (AGASA_GATEWAY_HMAC_SECRET_F3 ou AGASA_GATEWAY_HMAC_SECRET)");
    }
    return secret;
}

function signPayload(payload: F3Payload, secret: string) {
    return crypto.createHmac("sha256", secret).update(JSON.stringify(payload)).digest("hex");
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        if (!body || typeof body !== "object") {
            return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
        }

        const payload: F3Payload = {
            flux: "F3",
            timestamp: Date.now(),
            data: body,
        };
        const signature = signPayload(payload, getHmacSecret());

        const response = await fetch(`${getCoreGatewayUrl()}/api/gateway/f3`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Source-App": "AGASA-Inspect",
            },
            body: JSON.stringify({ ...payload, signature }),
        });

        const raw = await response.text();
        let parsed: unknown = null;
        try {
            parsed = raw ? JSON.parse(raw) : null;
        } catch {
            parsed = raw;
        }

        if (!response.ok) {
            return NextResponse.json(
                { error: "Core a rejeté le flux F3", details: parsed },
                { status: response.status }
            );
        }

        return NextResponse.json({ success: true, core: parsed });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Erreur inconnue";
        return NextResponse.json({ error: "Échec envoi F3", details: message }, { status: 500 });
    }
}
