import { db } from './db';
import { ajouterAlaFile } from './syncQueue';

function generateId(): string {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
    return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}
/**
 * Offline-first mutation wrappers
 * Each function: online → Convex direct, offline → IndexedDB + sync queue
 */

export async function creerInspection(
    inspecteurId: string,
    etablissementId: string,
    checklistModeleId: string,
    type: string,
    gps: { lat: number; lng: number; precision: number }
): Promise<string> {
    const id = generateId();
    const inspection = {
        id,
        inspecteurId,
        etablissementId,
        checklistModeleId,
        type,
        statut: 'en_cours' as const,
        gpsLat: gps.lat,
        gpsLng: gps.lng,
        gpsPrecision: gps.precision,
        dateDebut: Date.now(),
        synchronisee: false,
    };

    if (typeof navigator !== 'undefined' && navigator.onLine) {
        // In production: await convex.mutation(api.inspections.mutations.createInspection, inspection);
        // For now, save locally
    }

    await db.inspections.put(inspection);
    await ajouterAlaFile('inspection', 'create', id, inspection, 2);
    return id;
}

export async function sauvegarderReponse(
    inspectionId: string,
    pointId: string,
    sectionId: string,
    resultat: 'conforme' | 'non_conforme' | 'na',
    commentaire?: string,
    temperature?: string
): Promise<void> {
    const id = `${inspectionId}_${pointId}`;
    const reponse = {
        id,
        inspectionId,
        pointId,
        sectionId,
        resultat,
        commentaire: commentaire || '',
        temperature: temperature || '',
        photosIds: [],
    };

    await db.reponses.put(reponse);

    if (typeof navigator !== 'undefined' && navigator.onLine) {
        // In production: await convex.mutation(api.inspections.mutations.updateReponse, reponse);
    } else {
        await ajouterAlaFile('inspection', 'update', inspectionId, { pointId, sectionId, resultat, commentaire, temperature }, 2);
    }
}

export async function sauvegarderPhoto(
    inspectionId: string,
    blob: Blob,
    hash: string,
    metadata: Record<string, string>,
    pointId?: string
): Promise<string> {
    const id = generateId();
    const photo = {
        id,
        inspectionId,
        pointId,
        blob,
        hash,
        metadata,
        synchronisee: false,
    };

    await db.photos.put(photo);
    await ajouterAlaFile('photo', 'create', id, { id, inspectionId, hash, metadata, pointId }, 3);
    return id;
}

export async function creerPV(
    inspectionId: string,
    reference: string,
    contrevenant: Record<string, string>,
    infractions: Record<string, unknown>[],
    totalAmendes: number
): Promise<string> {
    const id = generateId();
    const pv = {
        id,
        inspectionId,
        reference,
        contrevenant,
        infractions,
        totalAmendes,
        refusSignature: false,
        verrouille: false,
        statut: 'brouillon' as const,
        synchronise: false,
    };

    await db.pvElectroniques.put(pv);
    await ajouterAlaFile('pv', 'create', id, pv, 1); // Priority 1 — critical
    return id;
}

export async function validerPV(
    pvId: string,
    signatureInspecteur: string,
    signatureResponsable: string | null,
    refusSignature: boolean
): Promise<void> {
    await db.pvElectroniques.update(pvId, {
        signatureInspecteur,
        signatureResponsable: signatureResponsable || undefined,
        refusSignature,
        verrouille: true,
        statut: 'valide',
    });

    await ajouterAlaFile('pv', 'update', pvId, { signatureInspecteur, refusSignature, verrouille: true }, 1);
}
