// tarif.schema.ts — jeromemarichez2026
// Schéma Zod de l'entité ITarif et du `Montant` qu'elle porte. Le type est dérivé du
// schéma (z.infer), jamais écrit à la main. Convention : docs/architecture.md.
import { z } from 'zod'

const periodiciteSchema = z.literal(['une-seule-fois', 'mensuel'])

/**
 * Une fourchette de prix : la seule forme de montant qui porte des chiffres.
 *
 * `mentionFiscale` y est **requise** — c'est le pendant, au chargement, de ce que le
 * typage interdit déjà à la compilation : aucun montant chiffré ne peut être publié sans
 * dire s'il s'entend toutes taxes comprises. `z.literal('TTC')` fige l'arbitrage rendu
 * par Jérôme MARICHEZ le 2026-08-08 : une valeur `'HT'` glissée dans le contenu échoue
 * au build.
 *
 * Le `refine` rejette une borne haute **inférieure ou égale** à la borne basse. La
 * consigne ne demandait que le cas inférieur ; l'égalité est refusée aussi, parce qu'une
 * fourchette dont les deux bornes coïncident n'est pas une fourchette — elle afficherait
 * « 300 à 300 € », un prix ferme déguisé en estimation. Le jour où un montant unique
 * devra être publié, il prendra sa propre variante plutôt que d'emprunter celle-ci.
 */
const fourchetteSchema = z
  .strictObject({
    nature: z.literal('fourchette'),
    // Des euros entiers et positifs : le site ne publie pas de centimes, et un montant
    // nul ou négatif n'est pas un prix.
    minimum: z.number().int().positive(),
    maximum: z.number().int().positive(),
    mentionFiscale: z.literal('TTC'),
    periodicite: periodiciteSchema,
    variableSelon: z.string().min(1),
  })
  .refine((fourchette) => fourchette.maximum > fourchette.minimum, {
    message: 'La borne haute d’une fourchette doit être strictement supérieure à la borne basse.',
    path: ['maximum'],
  })

/**
 * Montant d'une ligne tarifaire, en trois cas exclusifs.
 *
 * Union discriminée en `strictObject`, comme `justificatifSchema` : les variantes
 * `inclus` et `sur-devis` REFUSENT toute clé supplémentaire, une `mentionFiscale` ou un
 * `minimum` glissé sur une prestation sans prix affiché échoue donc au chargement, en
 * plus de ne pas compiler.
 */
export const montantSchema = z.discriminatedUnion('nature', [
  z.strictObject({ nature: z.literal('inclus') }),
  fourchetteSchema,
  z.strictObject({ nature: z.literal('sur-devis'), periodicite: periodiciteSchema }),
])

export const tarifSchema = z.strictObject({
  cle: z
    .string()
    .regex(/^[a-z0-9-]+$/, 'La clé d’une ligne tarifaire est en minuscules, chiffres et tirets.'),
  intitule: z.string().min(1),
  // Une ligne sans condition d'application obligerait le prospect à deviner laquelle des
  // deux mises en place le concerne : jamais vide.
  condition: z.string().min(1),
  montant: montantSchema,
})

export type TarifValide = z.infer<typeof tarifSchema>
