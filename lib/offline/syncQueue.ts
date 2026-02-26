import { db, type SyncQueueItem } from './db';

/**
 * File de synchronisation avec priorités 1-5
 * 
 * Priorités :
 * 1. PV électroniques (CRITIQUE)
 * 2. Inspections (résultats checklists)
 * 3. Photos (volumineuses)
 * 4. Planning (mises à jour)
 * 5. Autres (audit logs offline)
 */

export async function ajouterAlaFile(
    type: SyncQueueItem['type'],
    action: SyncQueueItem['action'],
    entityId: string,
    data: unknown,
    priorite: number = 5
): Promise<void> {
    const json = JSON.stringify(data);
    await db.syncQueue.add({
        type,
        action,
        entityId,
        data: json,
        priorite,
        tentatives: 0,
        maxTentatives: 3,
        derniereErreur: null,
        statut: 'en_attente',
        taille: new Blob([json]).size,
        creeLe: Date.now(),
        modifieLe: Date.now(),
    });
}

export async function getFileEnAttente(): Promise<SyncQueueItem[]> {
    return db.syncQueue
        .where('statut')
        .equals('en_attente')
        .sortBy('priorite');
}

export async function getFileStats() {
    const all = await db.syncQueue.where('statut').anyOf(['en_attente', 'en_cours', 'echouee']).toArray();

    const byType = {
        pv: { count: 0, taille: 0 },
        inspection: { count: 0, taille: 0 },
        photo: { count: 0, taille: 0 },
        planning: { count: 0, taille: 0 },
        audit: { count: 0, taille: 0 },
    };

    all.forEach(item => {
        const t = byType[item.type];
        if (t) {
            t.count++;
            t.taille += item.taille;
        }
    });

    return {
        total: all.length,
        totalTaille: all.reduce((s, i) => s + i.taille, 0),
        byType,
        echouees: all.filter(i => i.statut === 'echouee').length,
    };
}

export async function synchroniser(): Promise<{ envoyes: number; echecs: number }> {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
        return { envoyes: 0, echecs: 0 };
    }

    const items = await getFileEnAttente();
    let envoyes = 0;
    let echecs = 0;

    for (const item of items) {
        if (!item.id) continue;

        // Mark en_cours
        await db.syncQueue.update(item.id, { statut: 'en_cours', modifieLe: Date.now() });

        try {
            // In production: call Convex mutation here based on item.type
            // await convex.mutation(api.sync.mutations[`sync${type}`], JSON.parse(item.data));

            // Simulate network delay
            await new Promise(r => setTimeout(r, 200));

            await db.syncQueue.update(item.id, { statut: 'synchronisee', modifieLe: Date.now() });
            envoyes++;
        } catch (err) {
            const newTentatives = item.tentatives + 1;
            const errMsg = err instanceof Error ? err.message : 'Erreur inconnue';

            await db.syncQueue.update(item.id, {
                tentatives: newTentatives,
                derniereErreur: errMsg,
                statut: newTentatives >= item.maxTentatives ? 'echouee' : 'en_attente',
                modifieLe: Date.now(),
            });
            echecs++;
        }
    }

    // Log to history
    await db.syncHistory.add({
        date: Date.now(),
        elementsEnvoyes: envoyes,
        dureeMs: items.length * 200,
        statut: echecs === 0 ? 'succes' : envoyes > 0 ? 'partiel' : 'echec',
        details: `${envoyes} envoyés, ${echecs} échecs`,
    });

    return { envoyes, echecs };
}

export async function getHistoriqueSync() {
    return db.syncHistory.orderBy('date').reverse().limit(20).toArray();
}

export async function getDonneesLocalesStats() {
    const [etabs, checklists, baremes, plannings] = await Promise.all([
        db.etablissements.count(),
        db.checklistModeles.count(),
        db.baremeAmendes.count(),
        db.planning.count(),
    ]);

    return { etablissements: etabs, checklists, baremes, plannings };
}
