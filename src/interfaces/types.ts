// Alias de types purs, dérivés des interfaces d'entités du dossier. Uniquement des
// `type`, jamais d'interface : voir CLAUDE.md, section « Interfaces et types ».

/** Les quatre axes de pratique, une seule pratique. Aucun ordre hiérarchique. */
export type NomAxe = "Full Stack" | "IA" | "QA" | "Data-Driven";

/** Statut d'un poste : encadré (contrat direct) ou mission en indépendant. */
export type StatutExperience = "salarie" | "independant";
