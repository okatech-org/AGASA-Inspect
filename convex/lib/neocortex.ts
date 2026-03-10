export const SIGNAL_TYPES = {
  INSPECTION_SYNC: "INSPECTION_SYNC",
  PV_SYNC: "PV_SYNC",
  PHOTO_SYNC: "PHOTO_SYNC",
  FLUX_F3_ENVOYE: "FLUX_F3_ENVOYE",
  FLUX_F3_ERREUR: "FLUX_F3_ERREUR",
  CONFIG_MISE_A_JOUR: "CONFIG_MISE_A_JOUR",
} as const;

export const CORTEX = {
  LIMBIQUE: "LIMBIQUE",
  HIPPOCAMPE: "HIPPOCAMPE",
  PLASTICITE: "PLASTICITE",
  SYNC: "SYNC",
  GATEWAY: "GATEWAY",
} as const;

export const CATEGORIES_ACTION = {
  METIER: "METIER",
  SYSTEME: "SYSTEME",
  UTILISATEUR: "UTILISATEUR",
} as const;

export const genererCorrelationId = (): string => {
  const random = Math.random().toString(36).slice(2, 10);
  return `corr_${Date.now()}_${random}`;
};
