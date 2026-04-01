/**
 * API Gateway — Outbound F3 : AGASA-Inspect → AGASA-Admin
 * Envoie les données d'inspection et PV vers le système central
 * Mode simulation activé pour le MVP
 */

const SIMULATION_MODE = true;
const API_BASE_URL = process.env.AGASA_CORE_API_URL || 'https://api.agasa-core.ga/v1';
const API_KEY = process.env.AGASA_GATEWAY_API_KEY || 'sim-key-inspect-2026';

interface GatewayResponse {
    success: boolean;
    message: string;
    coreId?: string;
    timestamp: string;
}

async function callCoreAPI(endpoint: string, method: string, data: unknown): Promise<GatewayResponse> {
    const timestamp = new Date().toISOString();

    if (SIMULATION_MODE) {
        console.log(`[GATEWAY F3] SIM — ${method} ${endpoint}`, JSON.stringify(data).substring(0, 200));
        // Simulate delay
        await new Promise(r => setTimeout(r, 100));
        return { success: true, message: `[SIM] ${endpoint} — données reçues`, coreId: `CORE-${Date.now()}`, timestamp };
    }

    // Production: actual API call with retry + backoff
    let lastError = '';
    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': API_KEY,
                    'X-Source': 'AGASA-Inspect',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const result = await response.json();
                return { success: true, message: 'OK', coreId: result.id, timestamp };
            }
            lastError = `HTTP ${response.status}`;
        } catch (err) {
            lastError = err instanceof Error ? err.message : 'Network error';
            // Exponential backoff
            await new Promise(r => setTimeout(r, Math.pow(2, attempt) * 1000));
        }
    }
    return { success: false, message: `Échec après 3 tentatives: ${lastError}`, timestamp };
}

// F3.1 — Rapport d'inspection complet
export async function sendInspectionReport(inspectionId: string, data: {
    reference: string;
    inspecteur: string;
    etablissement: string;
    date: string;
    gps: { lat: number; lng: number };
    score: number;
    smiley: number;
    resultats: unknown[];
    photos: string[];
    signatures: Record<string, string>;
}): Promise<GatewayResponse> {
    return callCoreAPI('/inspections/reports', 'POST', { inspectionId, ...data });
}

// F3.2 — PV électronique
export async function sendPV(pvId: string, data: {
    reference: string;
    inspectionRef: string;
    contrevenant: Record<string, string>;
    infractions: unknown[];
    montantTotal: number;
    pdfUrl?: string;
    statut: string;
}): Promise<GatewayResponse> {
    return callCoreAPI('/pv/electroniques', 'POST', { pvId, ...data });
}

// F3.3 — Mise à jour Smiley
export async function updateSmiley(etablissementId: string, score: number, smiley: number): Promise<GatewayResponse> {
    return callCoreAPI(`/etablissements/${etablissementId}/smiley`, 'PATCH', { score, smiley, source: 'inspection' });
}

// F3.4 — Statistiques d'inspection
export async function sendStats(periode: string, data: {
    inspectionsParProvince: Record<string, number>;
    tauxConformite: number;
    pvEmis: number;
    totalAmendes: number;
}): Promise<GatewayResponse> {
    return callCoreAPI('/stats/inspections', 'POST', { periode, ...data });
}
