import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        matricule: v.string(),
        nom: v.string(),
        prenom: v.string(),
        email: v.string(),
        telephone: v.string(),
        pin: v.string(),
        motDePasse: v.string(),
        role: v.union(v.literal("admin_systeme"), v.literal("superviseur"), v.literal("inspecteur"), v.literal("demo")),
        province: v.string(),
        antenne: v.string(),
        statut: v.union(v.literal("actif"), v.literal("inactif"), v.literal("verrouille"), v.literal("suspendu")),
        photo: v.optional(v.string()),
        tentativesEchouees: v.number(),
        derniereConnexion: v.optional(v.number()),
        tablette: v.optional(v.string()),
        creePar: v.string(),
        creeLe: v.number(),
        modifieLe: v.number(),
    }),

    etablissements: defineTable({
        nom: v.string(),
        raisonSociale: v.optional(v.string()),
        categorie: v.union(v.literal("AS_CAT_1"), v.literal("AS_CAT_2"), v.literal("AS_CAT_3"), v.literal("TRANSPORT")),
        typeActivite: v.string(),
        adresse: v.string(),
        ville: v.string(),
        province: v.string(),
        latitude: v.number(),
        longitude: v.number(),
        telephone: v.optional(v.string()),
        responsable: v.string(),
        agrementRef: v.optional(v.string()),
        agrementStatut: v.optional(v.union(v.literal("valide"), v.literal("expire"), v.literal("suspendu"), v.literal("aucun"))),
        smiley: v.number(),
        dernierSmiley: v.optional(v.number()),
        dernierInspection: v.optional(v.number()),
        niveauRisque: v.union(v.literal("eleve"), v.literal("moyen"), v.literal("bas")),
        scoreRisque: v.number(),
        signalementsCitoyens: v.number(),
        actif: v.boolean(),
        creeLe: v.number(),
        modifieLe: v.number(),
    }),

    checklistModeles: defineTable({
        nom: v.string(),
        categorie: v.union(v.literal("AS_CAT_1"), v.literal("AS_CAT_2"), v.literal("AS_CAT_3"), v.literal("TRANSPORT")),
        version: v.string(),
        sections: v.array(v.object({
            id: v.string(),
            titre: v.string(),
            points: v.array(v.object({
                id: v.string(),
                libelle: v.string(),
                poids: v.number(),
                critique: v.boolean(),
                commentaireObligatoire: v.boolean(),
                temperatureRequise: v.boolean(),
            }))
        })),
        totalPoints: v.number(),
        actif: v.boolean(),
        creePar: v.string(),
        creeLe: v.number(),
        modifieLe: v.number(),
    }),

    inspections: defineTable({
        reference: v.string(),
        inspecteurId: v.string(),
        etablissementId: v.string(),
        checklistModeleId: v.string(),
        type: v.union(v.literal("programmee"), v.literal("inopinee"), v.literal("suite_signalement"), v.literal("renouvellement")),
        statut: v.union(v.literal("brouillon"), v.literal("en_cours"), v.literal("terminee"), v.literal("validee"), v.literal("synchronisee")),
        dateDebut: v.number(),
        dateFin: v.optional(v.number()),
        dureeMinutes: v.optional(v.number()),

        gpsLatitude: v.number(),
        gpsLongitude: v.number(),
        gpsPrecision: v.number(),
        gpsTimestamp: v.number(),

        reponses: v.array(v.object({
            pointId: v.string(),
            sectionId: v.string(),
            resultat: v.union(v.literal("conforme"), v.literal("non_conforme"), v.literal("non_applicable")),
            commentaire: v.optional(v.string()),
            temperature: v.optional(v.number()),
            photosIds: v.array(v.string()),
        })),

        scoreConformite: v.number(),
        smileyCalcule: v.number(),
        nbConformes: v.number(),
        nbNonConformes: v.number(),
        nbNonApplicables: v.number(),
        pointsCritiquesEnEchec: v.array(v.string()),

        observationsGenerales: v.optional(v.string()),
        mesuresCorrectives: v.optional(v.string()),
        delaiConformite: v.optional(v.number()),

        signatureInspecteur: v.optional(v.string()),
        signatureResponsable: v.optional(v.string()),

        creeeHorsLigne: v.boolean(),
        synchronisee: v.boolean(),
        dateSynchronisation: v.optional(v.number()),

        historique: v.array(v.object({
            action: v.string(),
            userId: v.string(),
            timestamp: v.number(),
            details: v.optional(v.string()),
        })),

        creeLe: v.number(),
        modifieLe: v.number(),
    }),

    photosInspection: defineTable({
        inspectionId: v.string(),
        filename: v.string(),
        url: v.string(),
        localPath: v.optional(v.string()),
        hash: v.string(),
        gpsLatitude: v.number(),
        gpsLongitude: v.number(),
        gpsTimestamp: v.number(),
        inspecteurId: v.string(),
        annotation: v.optional(v.string()),
        pointControleId: v.optional(v.string()),
        taille: v.number(),
        synchronisee: v.boolean(),
        creeLe: v.number(),
    }),

    pvElectroniques: defineTable({
        reference: v.string(),
        inspectionId: v.string(),
        inspecteurId: v.string(),
        etablissementId: v.string(),

        contrevenant: v.object({
            nom: v.string(),
            qualite: v.string(),
            telephone: v.string(),
            adresseEtablissement: v.string(),
        }),

        infractions: v.array(v.object({
            id: v.string(),
            code: v.string(),
            libelle: v.string(),
            amendeMin: v.number(),
            amendeMax: v.number(),
            amendeCalculee: v.number(),
            photosPreuveIds: v.array(v.string()),
            description: v.string(),
        })),

        totalAmende: v.number(),

        gpsLatitude: v.number(),
        gpsLongitude: v.number(),
        dateConstat: v.number(),

        statut: v.union(v.literal("brouillon"), v.literal("valide"), v.literal("notifie"), v.literal("paye"), v.literal("partiellement_paye"), v.literal("impaye"), v.literal("transmis_tresor")),
        dateValidation: v.optional(v.number()),
        dateNotification: v.optional(v.number()),
        dateRelanceJ15: v.optional(v.number()),
        dateTransmissionTresor: v.optional(v.number()),

        montantPaye: v.number(),
        dateDernierPaiement: v.optional(v.number()),
        referencePaiement: v.optional(v.string()),

        signatureInspecteur: v.string(),
        signatureContrevenant: v.optional(v.string()),
        refusSignatureContrevenant: v.boolean(),

        pdfGenere: v.boolean(),
        pdfUrl: v.optional(v.string()),

        verrouille: v.boolean(),

        creeHorsLigne: v.boolean(),
        synchronise: v.boolean(),
        dateSynchronisation: v.optional(v.number()),

        historique: v.array(v.object({
            action: v.string(),
            userId: v.string(),
            timestamp: v.number(),
            details: v.optional(v.string()),
        })),

        creeLe: v.number(),
    }),

    baremeAmendes: defineTable({
        code: v.string(),
        libelle: v.string(),
        categorieInfraction: v.string(),
        amendeMin: v.number(),
        amendeMax: v.number(),
        amendeDefaut: v.number(),
        recidiveMultiplicateur: v.number(),
        referenceJuridique: v.string(),
        actif: v.boolean(),
        creeLe: v.number(),
        modifieLe: v.number(),
    }),

    planningInspections: defineTable({
        inspecteurId: v.string(),
        etablissementId: v.string(),
        datePrevisionnelle: v.number(),
        type: v.union(v.literal("programmee"), v.literal("renouvellement"), v.literal("suite_signalement")),
        priorite: v.union(v.literal("urgente"), v.literal("haute"), v.literal("normale"), v.literal("basse")),
        motif: v.string(),
        statut: v.union(v.literal("planifiee"), v.literal("en_cours"), v.literal("realisee"), v.literal("reportee"), v.literal("annulee")),
        inspectionId: v.optional(v.string()),
        creePar: v.string(),
        creeLe: v.number(),
        modifieLe: v.number(),
    }),

    syncQueue: defineTable({
        type: v.union(v.literal("inspection"), v.literal("pv"), v.literal("photo"), v.literal("planning")),
        action: v.union(v.literal("create"), v.literal("update")),
        entityId: v.string(),
        data: v.string(),
        priorite: v.number(),
        tentatives: v.number(),
        derniereErreur: v.optional(v.string()),
        statut: v.union(v.literal("en_attente"), v.literal("en_cours"), v.literal("echouee"), v.literal("synchronisee")),
        creeLe: v.number(),
        modifieLe: v.number(),
    }),

    auditLogs: defineTable({
        userId: v.string(),
        action: v.string(),
        module: v.string(),
        cible: v.optional(v.string()),
        details: v.optional(v.string()),
        ipAddress: v.optional(v.string()),
        userAgent: v.optional(v.string()),
        gpsLatitude: v.optional(v.number()),
        gpsLongitude: v.optional(v.number()),
        horsLigne: v.boolean(),
        timestamp: v.number(),
    }),

    configSysteme: defineTable({
        cle: v.string(),
        valeur: v.string(),
        categorie: v.string(),
        description: v.string(),
        modifiePar: v.string(),
        modifieLe: v.number(),
    }),

    sessions: defineTable({
        userId: v.string(),
        token: v.string(),
        deviceInfo: v.optional(v.string()),
        ipAddress: v.optional(v.string()),
        creeLe: v.number(),
        expireLe: v.number(),
    }),
});
