/**
 * AGASA-Inspect — 4 Grilles de Checklist Complètes
 * Grille AS CAT 1 : 45 points, 8 sections
 * Grille AS CAT 2 : 30 points, 6 sections
 * Grille AS CAT 3 : 18 points, 4 sections
 * Grille Transport : 20 points, 5 sections
 */

function p(id: string, libelle: string, poids: number, critique = false, commentaireObligatoire = false, temperatureRequise = false) {
    return { id, libelle, poids, critique, commentaireObligatoire, temperatureRequise };
}

// ═══════════════════════════════════════════════════
// GRILLE AS CAT 1 — Établissements à haut risque
// 45 points, 8 sections
// ═══════════════════════════════════════════════════
export const GRILLE_CAT1 = {
    nom: 'Grille AS CAT 1 — Haut risque',
    categorie: 'AS_CAT_1' as const,
    version: '2026.1',
    totalPoints: 45,
    sections: [
        {
            id: 'C1-S1', titre: 'Infrastructure et locaux', points: [
                p('C1-S1-01', 'Sol en matériau lavable et en bon état', 2),
                p('C1-S1-02', 'Murs et plafonds sans moisissure ni fissure', 2),
                p('C1-S1-03', 'Éclairage suffisant dans toutes les zones', 1),
                p('C1-S1-04', 'Ventilation adéquate (naturelle ou mécanique)', 2),
                p('C1-S1-05', 'Séparation zones propres / zones sales', 3, true),
                p('C1-S1-06', 'Vestiaires et sanitaires du personnel conformes', 1),
                p('C1-S1-07', 'Protection contre les nuisibles (moustiquaires, pièges)', 2),
            ]
        },
        {
            id: 'C1-S2', titre: 'Équipements et matériel', points: [
                p('C1-S2-01', 'Équipements en inox ou matériau alimentaire', 2),
                p('C1-S2-02', 'Plan de nettoyage et désinfection des équipements', 2, false, true),
                p('C1-S2-03', 'Calibration des instruments de mesure (thermomètres)', 2),
                p('C1-S2-04', 'État des ustensiles (pas de rouille, fissures)', 1),
                p('C1-S2-05', 'Tables de travail propres et désinfectées', 2),
                p('C1-S2-06', 'Système de lavage des mains opérationnel', 2, true),
            ]
        },
        {
            id: 'C1-S3', titre: 'Chaîne du froid', points: [
                p('C1-S3-01', 'Température chambre froide positive 0-4°C', 3, true, true, true),
                p('C1-S3-02', 'Température chambre froide négative ≤ -18°C', 3, true, true, true),
                p('C1-S3-03', 'Température vitrine réfrigérée 0-4°C', 2, true, false, true),
                p('C1-S3-04', 'Relevé de température affiché et à jour', 2, false, true, true),
                p('C1-S3-05', 'Pas de rupture de chaîne du froid constatée', 3, true, true, true),
                p('C1-S3-06', 'Dégivrage régulier des équipements frigorifiques', 1, false, false, true),
            ]
        },
        {
            id: 'C1-S4', titre: 'Hygiène du personnel', points: [
                p('C1-S4-01', 'Port de tenue de travail propre (blouse, charlotte)', 2, true),
                p('C1-S4-02', 'Absence de bijoux et vernis lors de la manipulation', 1),
                p('C1-S4-03', 'Certificats médicaux à jour (< 12 mois)', 3, true, true),
                p('C1-S4-04', 'Lavage des mains effectif (savon + eau courante)', 2),
                p('C1-S4-05', 'Formation hygiène alimentaire attestée', 2, false, true),
            ]
        },
        {
            id: 'C1-S5', titre: 'Stockage et étiquetage', points: [
                p('C1-S5-01', 'Séparation produits crus / produits cuits', 3, true),
                p('C1-S5-02', 'Stockage surélevé (pas de contact direct sol)', 2),
                p('C1-S5-03', 'Rotation FIFO (premier entré, premier sorti)', 2),
                p('C1-S5-04', 'Étiquetage conforme (origine, DLC, lot)', 2, false, true),
                p('C1-S5-05', 'Absence de produits chimiques en zone alimentaire', 2, true),
            ]
        },
        {
            id: 'C1-S6', titre: 'Gestion des déchets', points: [
                p('C1-S6-01', 'Poubelles avec couvercle et sac plastique', 1),
                p('C1-S6-02', 'Évacuation quotidienne des déchets', 2),
                p('C1-S6-03', 'Zone de stockage déchets séparée et identifiée', 1),
                p('C1-S6-04', 'Gestion des huiles usagées (collecte agréée)', 1),
            ]
        },
        {
            id: 'C1-S7', titre: 'Documentation HACCP', points: [
                p('C1-S7-01', 'Plan HACCP rédigé et affiché', 3, true, true),
                p('C1-S7-02', 'Identification des CCP (points critiques)', 2, true),
                p('C1-S7-03', 'Fiches d\'enregistrement des contrôles à jour', 2, false, true),
                p('C1-S7-04', 'Procédures de nettoyage documentées', 1),
                p('C1-S7-05', 'Plan de formation du personnel documenté', 1),
                p('C1-S7-06', 'Registre des non-conformités tenu à jour', 1, false, true),
            ]
        },
        {
            id: 'C1-S8', titre: 'Contrôle DLC/DLUO', points: [
                p('C1-S8-01', 'Aucun produit avec DLC dépassée en rayon', 3, true, true),
                p('C1-S8-02', 'Aucun produit avec DLC dépassée en stock', 3, true, true),
                p('C1-S8-03', 'DLUO respectée et signalée si dépassée', 2),
                p('C1-S8-04', 'Traçabilité lot par lot disponible', 2, true, true),
                p('C1-S8-05', 'Procédure de retrait des produits périmés', 2, false, true),
                p('C1-S8-06', 'Registre des retraits tenu à jour', 1, false, true),
            ]
        },
    ],
};

// ═══════════════════════════════════════════════════
// GRILLE AS CAT 2 — Restaurants, hôtels
// 30 points, 6 sections
// ═══════════════════════════════════════════════════
export const GRILLE_CAT2 = {
    nom: 'Grille AS CAT 2 — Restaurants & Hôtels',
    categorie: 'AS_CAT_2' as const,
    version: '2026.1',
    totalPoints: 30,
    sections: [
        {
            id: 'C2-S1', titre: 'Hygiène des locaux', points: [
                p('C2-S1-01', 'Sol propre et en bon état', 2),
                p('C2-S1-02', 'Murs et plafonds sans moisissure', 2),
                p('C2-S1-03', 'Cuisine séparée de la salle', 2, true),
                p('C2-S1-04', 'WC clients propres et fonctionnels', 1),
                p('C2-S1-05', 'Évacuation des eaux usées conforme', 1),
            ]
        },
        {
            id: 'C2-S2', titre: 'Chaîne du froid', points: [
                p('C2-S2-01', 'Réfrigérateur température 0-4°C', 3, true, true, true),
                p('C2-S2-02', 'Congélateur température ≤ -18°C', 3, true, true, true),
                p('C2-S2-03', 'Aliments servis à température adéquate', 2, false, false, true),
                p('C2-S2-04', 'Pas de recongélation de produits décongelés', 2, true),
            ]
        },
        {
            id: 'C2-S3', titre: 'Manipulation des aliments', points: [
                p('C2-S3-01', 'Séparation crus/cuits lors de la préparation', 2, true),
                p('C2-S3-02', 'Lavage des fruits et légumes', 1),
                p('C2-S3-03', 'Utilisation d\'eau potable pour la cuisine', 2, true),
                p('C2-S3-04', 'Protection des plats contre les insectes', 1),
            ]
        },
        {
            id: 'C2-S4', titre: 'Personnel', points: [
                p('C2-S4-01', 'Tenue de travail propre', 1),
                p('C2-S4-02', 'Certificats médicaux à jour', 3, true, true),
                p('C2-S4-03', 'Lave-mains fonctionnel avec savon', 2, true),
            ]
        },
        {
            id: 'C2-S5', titre: 'Stockage', points: [
                p('C2-S5-01', 'Produits stockés hors sol', 1),
                p('C2-S5-02', 'Pas de produits périmés (DLC)', 3, true, true),
                p('C2-S5-03', 'Rotation des stocks (FIFO)', 1),
            ]
        },
        {
            id: 'C2-S6', titre: 'Déchets et nuisibles', points: [
                p('C2-S6-01', 'Poubelles avec couvercle', 1),
                p('C2-S6-02', 'Absence de nuisibles visibles', 2, true),
                p('C2-S6-03', 'Évacuation régulière des déchets', 1),
            ]
        },
    ],
};

// ═══════════════════════════════════════════════════
// GRILLE AS CAT 3 — Épiceries, supérettes
// 18 points, 4 sections
// ═══════════════════════════════════════════════════
export const GRILLE_CAT3 = {
    nom: 'Grille AS CAT 3 — Épiceries & Supérettes',
    categorie: 'AS_CAT_3' as const,
    version: '2026.1',
    totalPoints: 18,
    sections: [
        {
            id: 'C3-S1', titre: 'Locaux et propreté', points: [
                p('C3-S1-01', 'Sol propre et sec', 1),
                p('C3-S1-02', 'Étagères et rayons propres', 1),
                p('C3-S1-03', 'Absence de nuisibles', 2, true),
                p('C3-S1-04', 'Éclairage suffisant', 1),
                p('C3-S1-05', 'Accès à l\'eau potable', 2, true),
            ]
        },
        {
            id: 'C3-S2', titre: 'Conservation', points: [
                p('C3-S2-01', 'Réfrigérateur fonctionnel (si produits frais)', 2, true, false, true),
                p('C3-S2-02', 'Produits sensibles protégés de la chaleur', 1),
                p('C3-S2-03', 'Pas d\'exposition directe au soleil', 1),
            ]
        },
        {
            id: 'C3-S3', titre: 'DLC et étiquetage', points: [
                p('C3-S3-01', 'Aucun produit avec DLC dépassée', 3, true, true),
                p('C3-S3-02', 'Étiquetage lisible en français', 1),
                p('C3-S3-03', 'Prix affiché sur les produits', 1),
                p('C3-S3-04', 'Produits d\'origine identifiable', 1),
            ]
        },
        {
            id: 'C3-S4', titre: 'Hygiène générale', points: [
                p('C3-S4-01', 'Personnel avec tenue correcte', 1),
                p('C3-S4-02', 'Produits non alimentaires séparés', 2, true),
                p('C3-S4-03', 'Pas de produits chimiques près des aliments', 2, true),
            ]
        },
    ],
};

// ═══════════════════════════════════════════════════
// GRILLE TRANSPORT — Spécialisée chaîne du froid
// 20 points, 5 sections
// ═══════════════════════════════════════════════════
export const GRILLE_TRANSPORT = {
    nom: 'Grille Transport — Chaîne du froid',
    categorie: 'TRANSPORT' as const,
    version: '2026.1',
    totalPoints: 20,
    sections: [
        {
            id: 'TR-S1', titre: 'Véhicule et caisse isotherme', points: [
                p('TR-S1-01', 'Caisse isotherme en bon état (joints, isolation)', 2),
                p('TR-S1-02', 'Propreté intérieure de la caisse', 2),
                p('TR-S1-03', 'Groupe froid fonctionnel', 3, true, true, true),
                p('TR-S1-04', 'Certificat de conformité véhicule à jour', 2, false, true),
            ]
        },
        {
            id: 'TR-S2', titre: 'Températures de transport', points: [
                p('TR-S2-01', 'Température réfrigéré 0-4°C respectée', 3, true, true, true),
                p('TR-S2-02', 'Température surgelé ≤ -18°C respectée', 3, true, true, true),
                p('TR-S2-03', 'Enregistreur de température embarqué', 2, false, true, true),
            ]
        },
        {
            id: 'TR-S3', titre: 'Chargement et déchargement', points: [
                p('TR-S3-01', 'Temps de chargement/déchargement minimisé', 1),
                p('TR-S3-02', 'Produits protégés pendant le transfert', 1),
                p('TR-S3-03', 'Séparation des catégories de produits', 2, true),
            ]
        },
        {
            id: 'TR-S4', titre: 'Documentation', points: [
                p('TR-S4-01', 'Bon de livraison avec températures notées', 2, false, true),
                p('TR-S4-02', 'Traçabilité des lots transportés', 1, false, true),
            ]
        },
        {
            id: 'TR-S5', titre: 'Personnel de transport', points: [
                p('TR-S5-01', 'Formation hygiène attestée', 1, false, true),
                p('TR-S5-02', 'Tenue propre et adaptée', 1),
            ]
        },
    ],
};

export const ALL_GRILLES = [GRILLE_CAT1, GRILLE_CAT2, GRILLE_CAT3, GRILLE_TRANSPORT];
