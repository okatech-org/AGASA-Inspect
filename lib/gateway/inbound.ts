/**
 * API Gateway — Inbound F4 : AGASA-Admin → AGASA-Inspect
 * Reçoit les données de référence depuis le système central
 * Mode simulation activé pour le MVP
 */

import { ETABLISSEMENTS, BAREME_AMENDES, PLANNING_DEMO } from '../seed';

const SIMULATION_MODE = true;
const API_BASE_URL = process.env.AGASA_CORE_API_URL || 'https://api.agasa-core.ga/v1';
const API_KEY = process.env.AGASA_GATEWAY_API_KEY || 'sim-key-inspect-2026';

interface SyncResult {
    success: boolean;
    count: number;
    version?: string;
    timestamp: string;
}

async function fetchFromCore(endpoint: string): Promise<unknown> {
    if (SIMULATION_MODE) {
        console.log(`[GATEWAY F4] SIM — GET ${endpoint}`);
        await new Promise(r => setTimeout(r, 100));
        return null;
    }

    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                headers: {
                    'X-API-Key': API_KEY,
                    'X-Source': 'AGASA-Inspect',
                },
            });
            if (response.ok) return await response.json();
        } catch {
            await new Promise(r => setTimeout(r, Math.pow(2, attempt) * 1000));
        }
    }
    return null;
}

// F4.1 — Liste des établissements
export async function syncEtablissements(): Promise<SyncResult> {
    const timestamp = new Date().toISOString();
    if (SIMULATION_MODE) {
        return { success: true, count: ETABLISSEMENTS.length, version: '2026.02.26', timestamp };
    }
    const data = await fetchFromCore('/etablissements?province=Estuaire');
    return { success: !!data, count: Array.isArray(data) ? data.length : 0, timestamp };
}

// F4.2 — Planning d'inspections
export async function syncPlanning(): Promise<SyncResult> {
    const timestamp = new Date().toISOString();
    if (SIMULATION_MODE) {
        return { success: true, count: PLANNING_DEMO.length, timestamp };
    }
    const data = await fetchFromCore('/planning/inspecteur');
    return { success: !!data, count: Array.isArray(data) ? data.length : 0, timestamp };
}

// F4.3 — Profils de risque
export async function syncProfilsRisque(): Promise<SyncResult> {
    const timestamp = new Date().toISOString();
    if (SIMULATION_MODE) {
        return { success: true, count: ETABLISSEMENTS.length, timestamp };
    }
    const data = await fetchFromCore('/etablissements/risque');
    return { success: !!data, count: Array.isArray(data) ? data.length : 0, timestamp };
}

// F4.4 — Barème des amendes
export async function syncBareme(): Promise<SyncResult> {
    const timestamp = new Date().toISOString();
    if (SIMULATION_MODE) {
        return { success: true, count: BAREME_AMENDES.length, version: 'v2.1', timestamp };
    }
    const data = await fetchFromCore('/bareme/amendes');
    return { success: !!data, count: Array.isArray(data) ? data.length : 0, timestamp };
}

// F4.5 — Alertes sanitaires
export async function syncAlertes(): Promise<SyncResult> {
    const timestamp = new Date().toISOString();
    if (SIMULATION_MODE) {
        return { success: true, count: 2, timestamp };
    }
    const data = await fetchFromCore('/alertes/actives');
    return { success: !!data, count: Array.isArray(data) ? data.length : 0, timestamp };
}

// Full sync
export async function fullSync(): Promise<Record<string, SyncResult>> {
    const [etablissements, planning, risque, bareme, alertes] = await Promise.all([
        syncEtablissements(),
        syncPlanning(),
        syncProfilsRisque(),
        syncBareme(),
        syncAlertes(),
    ]);
    return { etablissements, planning, risque, bareme, alertes };
}
