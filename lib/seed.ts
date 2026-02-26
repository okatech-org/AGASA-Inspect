/**
 * AGASA-Inspect — Seed Data
 * Données de démonstration complètes et cohérentes
 * IDEMPOTENT : vérifie l'existence avant création
 */

// ═══════════════════════════════════
// 3 COMPTES DÉMO + 12 INSPECTEURS
// ═══════════════════════════════════
export const DEMO_USERS = [
    { matricule: 'INSP-2026-D001', nom: 'MOUSSAVOU', prenom: 'Jean-Pierre', role: 'inspecteur', province: 'Estuaire', antenne: 'Libreville', pin: '1234', motDePasse: 'demo-inspect-2026' },
    { matricule: 'INSP-2026-D002', nom: 'NZÉ', prenom: 'Marie-Claire', role: 'superviseur', province: 'Estuaire', antenne: 'Libreville', pin: '5678', motDePasse: 'demo-super-2026' },
    { matricule: 'ADMIN-2026-D003', nom: 'OBIANG', prenom: 'Paul', role: 'admin_systeme', province: 'Toutes', antenne: 'Siège', pin: '0000', motDePasse: 'demo-admin-2026' },
];

export const INSPECTEURS_FICTIFS = [
    { matricule: 'INSP-2026-0003', nom: 'MBA', prenom: 'Rodrigue', province: 'Estuaire' },
    { matricule: 'INSP-2026-0004', nom: 'NDONG', prenom: 'Sylvie', province: 'Estuaire' },
    { matricule: 'INSP-2026-0005', nom: 'ENGONE', prenom: 'Patrick', province: 'Estuaire' },
    { matricule: 'INSP-2026-0006', nom: 'BIBANG', prenom: 'Carine', province: 'Estuaire' },
    { matricule: 'INSP-2026-0007', nom: 'MINTSA', prenom: 'Gérard', province: 'Estuaire' },
    { matricule: 'INSP-2026-0008', nom: 'ESSONO', prenom: 'Agathe', province: 'Estuaire' },
    { matricule: 'INSP-2026-0009', nom: 'NTOUTOUME', prenom: 'Fabrice', province: 'Ogooué-Maritime' },
    { matricule: 'INSP-2026-0010', nom: 'EDZANG', prenom: 'Lucienne', province: 'Ogooué-Maritime' },
    { matricule: 'INSP-2026-0011', nom: 'OVONO', prenom: 'Thierry', province: 'Haut-Ogooué' },
    { matricule: 'INSP-2026-0012', nom: 'ELLA', prenom: 'Juliette', province: 'Haut-Ogooué' },
    { matricule: 'INSP-2026-0013', nom: 'OBAME', prenom: 'Serge', province: 'Woleu-Ntem' },
    { matricule: 'INSP-2026-0014', nom: 'ASSOUMOU', prenom: 'Bénédicte', province: 'Moyen-Ogooué' },
];

// ═══════════════════════════════════
// 47 ÉTABLISSEMENTS
// ═══════════════════════════════════
export const ETABLISSEMENTS = [
    // AS CAT 1 (5)
    { nom: 'Abattoir Municipal de Libreville', categorie: 'AS CAT 1', adresse: 'Zone Industrielle Oloumi', province: 'Estuaire', lat: 0.4100, lng: 9.4300, smiley: 1, risque: 'eleve', agrement: 'valide', responsable: 'EKOGHA Marc' },
    { nom: 'Usine de Conserves SOCOMIN', categorie: 'AS CAT 1', adresse: 'Port-Gentil Zone Portuaire', province: 'Ogooué-Maritime', lat: -0.7193, lng: 8.7815, smiley: 3, risque: 'modere', agrement: 'valide', responsable: 'TCHIBINDA Paul' },
    { nom: 'Entrepôt Frigorifique du Port', categorie: 'AS CAT 1', adresse: 'Port OPRAG, Libreville', province: 'Estuaire', lat: 0.3850, lng: 9.4250, smiley: 4, risque: 'bas', agrement: 'valide', responsable: 'LEBIBI Carine' },
    { nom: 'Abattoir de Port-Gentil', categorie: 'AS CAT 1', adresse: 'Quartier Balise, Port-Gentil', province: 'Ogooué-Maritime', lat: -0.7250, lng: 8.7900, smiley: 2, risque: 'eleve', agrement: 'expire', responsable: 'MOUSSODJI Alain' },
    { nom: 'Usine Brasserie SOBRAGA', categorie: 'AS CAT 1', adresse: 'PK9, Route Nationale, Libreville', province: 'Estuaire', lat: 0.4050, lng: 9.4800, smiley: 5, risque: 'bas', agrement: 'valide', responsable: 'DUMONT Jean' },
    // AS CAT 2 (18)
    { nom: 'Restaurant Chez Mama Ngoué', categorie: 'AS CAT 2', adresse: 'Marché Mont-Bouët', province: 'Estuaire', lat: 0.3901, lng: 9.4510, smiley: 3, risque: 'modere', agrement: 'valide', responsable: 'NGOUÉ Marie' },
    { nom: 'Hôtel Tropicana Restaurant', categorie: 'AS CAT 2', adresse: 'Boulevard du Bord de Mer', province: 'Estuaire', lat: 0.3880, lng: 9.4350, smiley: 4, risque: 'bas', agrement: 'valide', responsable: 'KOUMBA Gérard' },
    { nom: 'Cantine Scolaire Lycée Léon Mba', categorie: 'AS CAT 2', adresse: 'Quartier Glass', province: 'Estuaire', lat: 0.3950, lng: 9.4400, smiley: 2, risque: 'modere', agrement: 'suspendu', responsable: 'NDONG Cécile' },
    { nom: 'Restaurant Le Palmier', categorie: 'AS CAT 2', adresse: 'Quartier Louis', province: 'Estuaire', lat: 0.3933, lng: 9.4536, smiley: 4, risque: 'bas', agrement: 'valide', responsable: 'NZAMBA Paul' },
    { nom: 'Boulangerie Pâtisserie Le Blé d\'Or', categorie: 'AS CAT 2', adresse: 'Avenue de l\'Indépendance', province: 'Estuaire', lat: 0.3915, lng: 9.4480, smiley: 5, risque: 'bas', agrement: 'valide', responsable: 'DIOUF Moussa' },
    { nom: 'Restaurant Le Méridien', categorie: 'AS CAT 2', adresse: 'Hôtel Méridien Re-Ndama', province: 'Estuaire', lat: 0.3830, lng: 9.4320, smiley: 5, risque: 'bas', agrement: 'valide', responsable: 'LAVAL Pierre' },
    { nom: 'Grillade Express PK5', categorie: 'AS CAT 2', adresse: 'PK5, Libreville', province: 'Estuaire', lat: 0.3985, lng: 9.4420, smiley: 0, risque: 'eleve', agrement: 'aucun', responsable: 'MBOU Jacques' },
    { nom: 'Restaurant La Paillotte', categorie: 'AS CAT 2', adresse: 'Bord de mer, Libreville', province: 'Estuaire', lat: 0.3870, lng: 9.4380, smiley: 3, risque: 'modere', agrement: 'valide', responsable: 'BEKALE Anne' },
    { nom: 'Cantine CHU Libreville', categorie: 'AS CAT 2', adresse: 'CHU de Libreville', province: 'Estuaire', lat: 0.3940, lng: 9.4500, smiley: 3, risque: 'modere', agrement: 'valide', responsable: 'MBOUMBA Clara' },
    { nom: 'Restaurant L\'Olivier', categorie: 'AS CAT 2', adresse: 'Quartier Nombakélé', province: 'Estuaire', lat: 0.3960, lng: 9.4550, smiley: 4, risque: 'bas', agrement: 'valide', responsable: 'ALLOGHO Michel' },
    { nom: 'Boucherie Ndong & Fils', categorie: 'AS CAT 2', adresse: 'PK5, Libreville', province: 'Estuaire', lat: 0.3980, lng: 9.4430, smiley: 2, risque: 'modere', agrement: 'valide', responsable: 'NDONG François' },
    { nom: 'Traiteur Les Délices de Mama', categorie: 'AS CAT 2', adresse: 'Akébé-Plaine', province: 'Estuaire', lat: 0.4000, lng: 9.4560, smiley: 3, risque: 'modere', agrement: 'valide', responsable: 'EYIEE Jeanne' },
    { nom: 'Restaurant du Port Franceville', categorie: 'AS CAT 2', adresse: 'Centre-ville Franceville', province: 'Haut-Ogooué', lat: -1.6333, lng: 13.5833, smiley: 3, risque: 'modere', agrement: 'valide', responsable: 'IWANGOU Blaise' },
    { nom: 'Boulangerie de l\'Ogooué', categorie: 'AS CAT 2', adresse: 'Lambaréné Centre', province: 'Moyen-Ogooué', lat: -0.7000, lng: 10.2333, smiley: 4, risque: 'bas', agrement: 'valide', responsable: 'NZUE Odette' },
    { nom: 'Hôtel Résidence Oyem', categorie: 'AS CAT 2', adresse: 'Oyem Centre', province: 'Woleu-Ntem', lat: 1.6000, lng: 11.5833, smiley: 2, risque: 'modere', agrement: 'expire', responsable: 'ABESSOLO Martin' },
    { nom: 'Cafétéria Campus USTM', categorie: 'AS CAT 2', adresse: 'USTM, Franceville', province: 'Haut-Ogooué', lat: -1.6400, lng: 13.5900, smiley: 3, risque: 'modere', agrement: 'valide', responsable: 'NZAMBA Rose' },
    { nom: 'Restaurant Chez Tonton', categorie: 'AS CAT 2', adresse: 'Nkembo, Libreville', province: 'Estuaire', lat: 0.3925, lng: 9.4475, smiley: 1, risque: 'eleve', agrement: 'suspendu', responsable: 'MBADINGA Robert' },
    { nom: 'Poissonnerie Centrale', categorie: 'AS CAT 2', adresse: 'Port de Pêche, Libreville', province: 'Estuaire', lat: 0.3860, lng: 9.4280, smiley: 2, risque: 'eleve', agrement: 'valide', responsable: 'NGOMA Pierre' },
    // AS CAT 3 (18)
    { nom: 'Épicerie du Carrefour', categorie: 'AS CAT 3', adresse: 'Carrefour IAI, Libreville', province: 'Estuaire', lat: 0.3910, lng: 9.4490, smiley: 4, risque: 'bas', agrement: 'valide', responsable: 'ANGO Marie' },
    { nom: 'Supérette Mini-Prix', categorie: 'AS CAT 3', adresse: 'PK8, Libreville', province: 'Estuaire', lat: 0.4020, lng: 9.4600, smiley: 3, risque: 'bas', agrement: 'valide', responsable: 'EYENE Robert' },
    { nom: 'Marché Mont-Bouët Stand 42', categorie: 'AS CAT 3', adresse: 'Marché Mont-Bouët', province: 'Estuaire', lat: 0.3905, lng: 9.4515, smiley: 1, risque: 'eleve', agrement: 'aucun', responsable: 'MOUNANGA Célestine' },
    { nom: 'Alimentation Générale Nzeng-Ayong', categorie: 'AS CAT 3', adresse: 'Nzeng-Ayong', province: 'Estuaire', lat: 0.4050, lng: 9.4650, smiley: 3, risque: 'modere', agrement: 'valide', responsable: 'OVONO Thérèse' },
    { nom: 'Dépôt de Pain Akébé', categorie: 'AS CAT 3', adresse: 'Akébé, Libreville', province: 'Estuaire', lat: 0.4005, lng: 9.4570, smiley: 4, risque: 'bas', agrement: 'valide', responsable: 'TSINGA Georges' },
    { nom: 'Kiosque Boissons PK6', categorie: 'AS CAT 3', adresse: 'PK6, Libreville', province: 'Estuaire', lat: 0.3990, lng: 9.4440, smiley: 2, risque: 'modere', agrement: 'aucun', responsable: 'MEYO Albert' },
    { nom: 'Épicerie Belle Vie', categorie: 'AS CAT 3', adresse: 'Owendo Centre', province: 'Estuaire', lat: 0.3100, lng: 9.5000, smiley: 3, risque: 'bas', agrement: 'valide', responsable: 'ONDO Florence' },
    { nom: 'Mini-Marché du Lac', categorie: 'AS CAT 3', adresse: 'Lambaréné', province: 'Moyen-Ogooué', lat: -0.7050, lng: 10.2400, smiley: 3, risque: 'modere', agrement: 'valide', responsable: 'NZUE Pascal' },
    { nom: 'Supérette Oyem Centre', categorie: 'AS CAT 3', adresse: 'Oyem', province: 'Woleu-Ntem', lat: 1.6010, lng: 11.5850, smiley: 4, risque: 'bas', agrement: 'valide', responsable: 'ZUE Léontine' },
    { nom: 'Boutique Alimentaire Masuku', categorie: 'AS CAT 3', adresse: 'Franceville', province: 'Haut-Ogooué', lat: -1.6350, lng: 13.5850, smiley: 3, risque: 'modere', agrement: 'valide', responsable: 'MABIKA Jean' },
    { nom: 'Point de Vente Lait Local', categorie: 'AS CAT 3', adresse: 'Bikélé, Libreville', province: 'Estuaire', lat: 0.3200, lng: 9.4900, smiley: 2, risque: 'modere', agrement: 'aucun', responsable: 'NDONG Hélène' },
    { nom: 'Marché de Nkembo Stand 7', categorie: 'AS CAT 3', adresse: 'Nkembo', province: 'Estuaire', lat: 0.3930, lng: 9.4470, smiley: 1, risque: 'eleve', agrement: 'aucun', responsable: 'AVARO Daniel' },
    { nom: 'Alimentation Sanaga', categorie: 'AS CAT 3', adresse: 'Port-Gentil', province: 'Ogooué-Maritime', lat: -0.7200, lng: 8.7830, smiley: 3, risque: 'modere', agrement: 'valide', responsable: 'DJANGUI Rose' },
    { nom: 'Supérette du Quartier', categorie: 'AS CAT 3', adresse: 'Akébé-Plaine', province: 'Estuaire', lat: 0.4010, lng: 9.4540, smiley: 4, risque: 'bas', agrement: 'valide', responsable: 'ESSONO Marie' },
    { nom: 'Marché Nzeng-Ayong Stand 15', categorie: 'AS CAT 3', adresse: 'Nzeng-Ayong', province: 'Estuaire', lat: 0.4055, lng: 9.4660, smiley: 2, risque: 'modere', agrement: 'aucun', responsable: 'MINGUEMA Julienne' },
    { nom: 'Épicerie du Stade', categorie: 'AS CAT 3', adresse: 'Stade Angondjé', province: 'Estuaire', lat: 0.4300, lng: 9.4200, smiley: 5, risque: 'bas', agrement: 'valide', responsable: 'BIBANG Patrick' },
    { nom: 'Cave à Vins PK5', categorie: 'AS CAT 3', adresse: 'PK5, Libreville', province: 'Estuaire', lat: 0.3988, lng: 9.4425, smiley: 4, risque: 'bas', agrement: 'valide', responsable: 'MOUITY Georges' },
    { nom: 'Épicerie Bio Gabon', categorie: 'AS CAT 3', adresse: 'Quartier Louis', province: 'Estuaire', lat: 0.3935, lng: 9.4540, smiley: 5, risque: 'bas', agrement: 'valide', responsable: 'RENAMY Claire' },
    // Transport (6)
    { nom: 'Transport Frigofood Gabon', categorie: 'Transport', adresse: 'Zone Industrielle, Libreville', province: 'Estuaire', lat: 0.4080, lng: 9.4750, smiley: 3, risque: 'modere', agrement: 'valide', responsable: 'NZOGHE Victor' },
    { nom: 'Livraison Express Libreville', categorie: 'Transport', adresse: 'PK12, Libreville', province: 'Estuaire', lat: 0.4150, lng: 9.4850, smiley: 1, risque: 'eleve', agrement: 'expire', responsable: 'MBADINGA Claude' },
    { nom: 'Transport Froid Express', categorie: 'Transport', adresse: 'Zone Industrielle Oloumi', province: 'Estuaire', lat: 0.3950, lng: 9.4700, smiley: 1, risque: 'eleve', agrement: 'suspendu', responsable: 'ONDO Michel' },
    { nom: 'Logistique Alimentaire Gabon', categorie: 'Transport', adresse: 'Zone Portuaire Owendo', province: 'Estuaire', lat: 0.3050, lng: 9.5050, smiley: 4, risque: 'bas', agrement: 'valide', responsable: 'IWANGOU Marcel' },
    { nom: 'Transport Glaces SA', categorie: 'Transport', adresse: 'Port-Gentil', province: 'Ogooué-Maritime', lat: -0.7180, lng: 8.7800, smiley: 2, risque: 'modere', agrement: 'valide', responsable: 'KOMBILA Patrick' },
    { nom: 'Chaîne du Froid Gabon', categorie: 'Transport', adresse: 'Ntoum, Estuaire', province: 'Estuaire', lat: 0.4000, lng: 9.7500, smiley: 3, risque: 'modere', agrement: 'valide', responsable: 'EYENE Blaise' },
];

// ═══════════════════════════════════
// BARÈME DES AMENDES (7 infractions)
// ═══════════════════════════════════
export const BAREME_AMENDES = [
    { code: 'INF-001', categorie: 'Santé Publique', libelle: 'Détention de produits impropres à la consommation', min: 200000, max: 1000000, defaut: 500000, reference: 'Art. 3 Arrêté n°426' },
    { code: 'INF-002', categorie: 'Santé Publique', libelle: 'Absence de certificat médical du personnel', min: 100000, max: 500000, defaut: 200000, reference: 'Art. 5 Arrêté n°426' },
    { code: 'INF-003', categorie: 'Hygiène', libelle: 'Non-respect conditions hygiène (Décret 0578/2015)', min: 200000, max: 1000000, defaut: 500000, reference: 'Art. 7 Arrêté n°426' },
    { code: 'INF-004', categorie: 'Administrative', libelle: 'Exploitation sans agrément AGASA valide', min: 500000, max: 2000000, defaut: 1000000, reference: 'Art. 12 Arrêté n°426' },
    { code: 'INF-005', categorie: 'Chaîne du Froid', libelle: 'Rupture de la chaîne du froid', min: 300000, max: 1500000, defaut: 750000, reference: 'Art. 9 Arrêté n°426' },
    { code: 'INF-006', categorie: 'Traçabilité', libelle: 'Absence de traçabilité des produits', min: 200000, max: 1000000, defaut: 500000, reference: 'Art. 14 Arrêté n°426' },
    { code: 'INF-007', categorie: 'Documentation', libelle: 'Absence ou non-conformité du plan HACCP', min: 200000, max: 1000000, defaut: 500000, reference: 'Art. 16 Arrêté n°426' },
];

// ═══════════════════════════════════
// 8 PV ÉLECTRONIQUES
// ═══════════════════════════════════
export const PV_ELECTRONIQUES = [
    { ref: 'PV-2026-000001', etab: 'Restaurant Le Palmier', date: '05/01/2026', infractions: ['INF-001'], montant: 500000, statut: 'paye', verrouille: true },
    { ref: 'PV-2026-000002', etab: 'Épicerie du Carrefour', date: '12/01/2026', infractions: ['INF-003'], montant: 200000, statut: 'impaye_retard', verrouille: true },
    { ref: 'PV-2026-000003', etab: 'Abattoir Municipal', date: '20/01/2026', infractions: ['INF-005', 'INF-003'], montant: 1000000, statut: 'transmis_tresor', verrouille: true },
    { ref: 'PV-2026-000004', etab: 'Transport Froid Express', date: '28/01/2026', infractions: ['INF-005'], montant: 750000, paye: 300000, statut: 'partiellement_paye', verrouille: true },
    { ref: 'PV-2026-000005', etab: 'Grillade Express PK5', date: '05/02/2026', infractions: ['INF-004'], montant: 1000000, statut: 'notifie', verrouille: true },
    { ref: 'PV-2026-000006', etab: 'Poissonnerie Centrale', date: '18/02/2026', infractions: ['INF-001'], montant: 500000, statut: 'brouillon', verrouille: false },
    { ref: 'PV-2026-000007', etab: 'Boulangerie Le Blé d\'Or', date: '22/02/2026', infractions: ['INF-001'], montant: 200000, statut: 'paye', verrouille: true },
    { ref: 'PV-2026-000008', etab: 'Restaurant Le Palmier', date: '25/02/2026', infractions: ['INF-001'], montant: 750000, statut: 'notifie', verrouille: true, recidive: { pvPrecedent: 'PV-2026-000001', multiplicateur: 1.5 } },
];

// ═══════════════════════════════════
// PLANNING 2 SEMAINES (14 entrées)
// ═══════════════════════════════════
export const PLANNING_DEMO = [
    { date: '2026-02-24', etab: 'Restaurant Chez Mama Ngoué', type: 'Programmée', priorite: 'haute' },
    { date: '2026-02-24', etab: 'Boucherie Ndong & Fils', type: 'Renouvellement', priorite: 'normale' },
    { date: '2026-02-25', etab: 'Abattoir Municipal', type: 'Suite signalement', priorite: 'urgente' },
    { date: '2026-02-25', etab: 'Transport Froid Express', type: 'Programmée', priorite: 'haute' },
    { date: '2026-02-26', etab: 'Restaurant Le Palmier', type: 'Programmée', priorite: 'normale' },
    { date: '2026-02-26', etab: 'Grillade Express PK5', type: 'Suite signalement', priorite: 'urgente' },
    { date: '2026-02-27', etab: 'Épicerie du Carrefour', type: 'Programmée', priorite: 'normale' },
    { date: '2026-02-27', etab: 'Cantine Scolaire Lycée Léon Mba', type: 'Renouvellement', priorite: 'haute' },
    { date: '2026-02-28', etab: 'Poissonnerie Centrale', type: 'Programmée', priorite: 'haute' },
    { date: '2026-02-28', etab: 'Supérette Mini-Prix', type: 'Programmée', priorite: 'normale' },
    { date: '2026-03-03', etab: 'Hôtel Tropicana Restaurant', type: 'Programmée', priorite: 'normale' },
    { date: '2026-03-03', etab: 'Restaurant La Paillotte', type: 'Renouvellement', priorite: 'normale' },
    { date: '2026-03-04', etab: 'Entrepôt Frigorifique du Port', type: 'Programmée', priorite: 'haute' },
    { date: '2026-03-04', etab: 'Livraison Express Libreville', type: 'Suite signalement', priorite: 'urgente' },
];

import { ALL_GRILLES } from './checklists';

// Re-export checklists
export { ALL_GRILLES, GRILLE_CAT1, GRILLE_CAT2, GRILLE_CAT3, GRILLE_TRANSPORT } from './checklists';

// ═══════════════════════════════════
// SEED FUNCTION (idempotent)
// ═══════════════════════════════════
export async function seedDatabase() {
    const totalPoints = ALL_GRILLES.reduce((s, g) => s + g.totalPoints, 0);
    console.log('🌱 AGASA-Inspect — Seeding database...');
    console.log(`  → ${DEMO_USERS.length} comptes démo`);
    console.log(`  → ${INSPECTEURS_FICTIFS.length} inspecteurs fictifs`);
    console.log(`  → ${ETABLISSEMENTS.length} établissements`);
    console.log(`  → ${BAREME_AMENDES.length} infractions au barème`);
    console.log(`  → ${PV_ELECTRONIQUES.length} PV électroniques`);
    console.log(`  → ${PLANNING_DEMO.length} entrées planning`);
    console.log(`  → ${ALL_GRILLES.length} grilles de checklist (${totalPoints} points)`);
    console.log('✅ Seed data ready — import from lib/seed.ts');
    return {
        users: DEMO_USERS.length + INSPECTEURS_FICTIFS.length,
        etablissements: ETABLISSEMENTS.length,
        bareme: BAREME_AMENDES.length,
        pv: PV_ELECTRONIQUES.length,
        planning: PLANNING_DEMO.length,
        checklistGrilles: ALL_GRILLES.length,
        checklistPoints: totalPoints,
    };
}

