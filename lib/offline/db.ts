import Dexie, { type Table } from 'dexie';

// ═══════════════════════════════════
// Auth offline cache
// ═══════════════════════════════════
export interface LocalUser {
    id: string;
    matricule: string;
    nom: string;
    prenom: string;
    role: string;
    province: string;
    sessionToken: string;
    passwordHash: string;
    pinHash: string;
}

// ═══════════════════════════════════
// Données de référence (pré-chargées)
// ═══════════════════════════════════
export interface CachedEtablissement {
    id: string;
    nom: string;
    province: string;
    categorie: string;
    adresse: string;
    responsable: string;
    telephone: string;
    smiley: number;
    derniereInspection: string;
    agrementStatut: string;
}

export interface CachedChecklistModele {
    id: string;
    categorie: string;
    nom: string;
    version: string;
    sections: { id: string; nom: string; points: { id: string; libelle: string; poids: number; critique: boolean; commentaireOblig: boolean; tempRequise: boolean }[] }[];
}

export interface CachedBareme {
    code: string;
    categorieInfraction: string;
    libelle: string;
    min: number;
    max: number;
    defaut: number;
    recidive: number;
    reference: string;
}

export interface CachedPlanning {
    id: string;
    inspecteurId: string;
    datePrevisionnelle: string;
    etablissementId: string;
    etablissementNom: string;
    type: string;
    priorite: string;
}

// ═══════════════════════════════════
// Données de travail (créées offline)
// ═══════════════════════════════════
export interface LocalInspection {
    id: string;
    inspecteurId: string;
    etablissementId: string;
    checklistModeleId: string;
    type: string;
    statut: 'brouillon' | 'en_cours' | 'terminee' | 'validee';
    gpsLat: number;
    gpsLng: number;
    gpsPrecision: number;
    dateDebut: number;
    dateFin?: number;
    score?: number;
    smiley?: number;
    synchronisee: boolean;
    serveurId?: string;
}

export interface LocalReponse {
    id: string;
    inspectionId: string;
    pointId: string;
    sectionId: string;
    resultat: 'conforme' | 'non_conforme' | 'na' | null;
    commentaire: string;
    temperature: string;
    photosIds: string[];
}

export interface LocalPhoto {
    id: string;
    inspectionId: string;
    pointId?: string;
    blob: Blob;
    hash: string;
    metadata: Record<string, string>;
    synchronisee: boolean;
}

export interface LocalPV {
    id: string;
    inspectionId: string;
    reference: string;
    contrevenant: Record<string, string>;
    infractions: Record<string, unknown>[];
    totalAmendes: number;
    signatureInspecteur?: string;
    signatureResponsable?: string;
    refusSignature: boolean;
    verrouille: boolean;
    statut: 'brouillon' | 'valide';
    synchronise: boolean;
}

// ═══════════════════════════════════
// File de synchronisation
// ═══════════════════════════════════
export interface SyncQueueItem {
    id?: number;
    type: 'pv' | 'inspection' | 'photo' | 'planning' | 'audit';
    action: 'create' | 'update';
    entityId: string;
    data: string; // JSON sérialisé
    priorite: number; // 1-5 (1=PV critical)
    tentatives: number;
    maxTentatives: number;
    derniereErreur: string | null;
    statut: 'en_attente' | 'en_cours' | 'echouee' | 'synchronisee';
    taille: number; // octets
    creeLe: number;
    modifieLe: number;
}

export interface SyncHistoryItem {
    id?: number;
    date: number;
    elementsEnvoyes: number;
    dureeMs: number;
    statut: 'succes' | 'partiel' | 'echec';
    details: string;
}

// ═══════════════════════════════════
// Database
// ═══════════════════════════════════
export class AgasaInspectDB extends Dexie {
    localUser!: Table<LocalUser, string>;
    etablissements!: Table<CachedEtablissement, string>;
    checklistModeles!: Table<CachedChecklistModele, string>;
    baremeAmendes!: Table<CachedBareme, string>;
    planning!: Table<CachedPlanning, string>;
    inspections!: Table<LocalInspection, string>;
    reponses!: Table<LocalReponse, string>;
    photos!: Table<LocalPhoto, string>;
    pvElectroniques!: Table<LocalPV, string>;
    syncQueue!: Table<SyncQueueItem, number>;
    syncHistory!: Table<SyncHistoryItem, number>;

    constructor() {
        super('AgasaInspectDB');

        this.version(2).stores({
            // Auth
            localUser: 'id',

            // Données de référence
            etablissements: 'id, nom, province, categorie',
            checklistModeles: 'id, categorie',
            baremeAmendes: 'code, categorieInfraction',
            planning: 'id, inspecteurId, datePrevisionnelle',

            // Données de travail
            inspections: 'id, inspecteurId, statut, synchronisee',
            reponses: 'id, inspectionId, pointId',
            photos: 'id, inspectionId, synchronisee',
            pvElectroniques: 'id, inspectionId, synchronise',

            // Synchronisation
            syncQueue: '++id, type, priorite, statut, creeLe',
            syncHistory: '++id, date',
        });
    }
}

export const db = new AgasaInspectDB();
