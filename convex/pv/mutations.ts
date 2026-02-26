import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const createPV = mutation({
    args: {
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
        creeHorsLigne: v.boolean(),
    },
    handler: async (ctx, args) => {
        const now = Date.now();
        const id = await ctx.db.insert("pvElectroniques", {
            reference: args.reference,
            inspectionId: args.inspectionId,
            inspecteurId: args.inspecteurId,
            etablissementId: args.etablissementId,
            contrevenant: args.contrevenant,
            infractions: args.infractions,
            totalAmende: args.totalAmende,
            gpsLatitude: args.gpsLatitude,
            gpsLongitude: args.gpsLongitude,
            dateConstat: now,
            statut: "brouillon",
            montantPaye: 0,
            signatureInspecteur: "",
            refusSignatureContrevenant: false,
            pdfGenere: false,
            verrouille: false,
            creeHorsLigne: args.creeHorsLigne,
            synchronise: !args.creeHorsLigne,
            historique: [{ action: "PV créé", userId: args.inspecteurId, timestamp: now }],
            creeLe: now,
        });

        await ctx.db.insert("auditLogs", {
            userId: args.inspecteurId,
            action: "PV créé",
            module: "pv",
            cible: args.reference,
            details: `Montant: ${args.totalAmende} FCFA`,
            horsLigne: args.creeHorsLigne,
            timestamp: now,
        });

        return id;
    },
});

export const validerPV = mutation({
    args: {
        pvId: v.id("pvElectroniques"),
        signatureInspecteur: v.string(),
        signatureContrevenant: v.optional(v.string()),
        refusSignature: v.boolean(),
    },
    handler: async (ctx, args) => {
        const pv = await ctx.db.get(args.pvId);
        if (!pv) throw new Error("PV non trouvé");
        if (pv.verrouille) throw new Error("PV déjà verrouillé — modification interdite");

        const now = Date.now();
        await ctx.db.patch(args.pvId, {
            signatureInspecteur: args.signatureInspecteur,
            signatureContrevenant: args.signatureContrevenant,
            refusSignatureContrevenant: args.refusSignature,
            statut: "valide",
            dateValidation: now,
            verrouille: true,
            pdfGenere: true,
            historique: [
                ...pv.historique,
                { action: "PV validé et verrouillé", userId: pv.inspecteurId, timestamp: now },
            ],
        });

        await ctx.db.insert("auditLogs", {
            userId: pv.inspecteurId,
            action: "PV validé et verrouillé",
            module: "pv",
            cible: pv.reference,
            details: `Montant: ${pv.totalAmende} FCFA | Refus signature: ${args.refusSignature}`,
            horsLigne: false,
            timestamp: now,
        });
    },
});

export const enregistrerPaiement = mutation({
    args: {
        pvId: v.id("pvElectroniques"),
        montant: v.number(),
        referencePaiement: v.string(),
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        const pv = await ctx.db.get(args.pvId);
        if (!pv) throw new Error("PV non trouvé");

        const now = Date.now();
        const nouveauMontantPaye = pv.montantPaye + args.montant;
        const statut = nouveauMontantPaye >= pv.totalAmende ? "paye" as const : "partiellement_paye" as const;

        await ctx.db.patch(args.pvId, {
            montantPaye: nouveauMontantPaye,
            dateDernierPaiement: now,
            referencePaiement: args.referencePaiement,
            statut,
            historique: [
                ...pv.historique,
                { action: `Paiement ${args.montant} FCFA reçu`, userId: args.userId, timestamp: now },
            ],
        });

        await ctx.db.insert("auditLogs", {
            userId: args.userId,
            action: "Paiement PV enregistré",
            module: "pv",
            cible: pv.reference,
            details: `${args.montant} FCFA — Réf: ${args.referencePaiement}`,
            horsLigne: false,
            timestamp: now,
        });
    },
});
