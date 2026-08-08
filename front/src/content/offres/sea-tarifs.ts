// sea-tarifs.ts — jeromemarichez2026
// Grille tarifaire de l'offre « SEA ». Arbitrages de Jérôme MARICHEZ du 2026-08-08,
// issue #17.
//
// CE FICHIER EST LE SEUL ENDROIT DU DÉPÔT OÙ UN MONTANT EST ÉCRIT. Ni le README, ni la
// documentation, ni une page ne recopient les chiffres : ils décrivent la grille et
// renvoient ici. Deux écritures d'un même prix finiraient par diverger, et la seconde
// engagerait Jérôme vis-à-vis d'un prospect sans que personne ne s'en aperçoive.
//
// C'est le premier engagement commercial chiffré du site. Les valeurs ci-dessous sont
// celles validées : elles ne se déduisent pas, ne s'arrondissent pas et ne
// s'« harmonisent » pas. Une première intention chiffrée avait été évoquée puis
// abandonnée au profit de la fourchette ; c'est la fourchette qui fait foi, et le montant
// abandonné ne figure nulle part dans ce dépôt, pas même en commentaire.
//
// La mention « toutes taxes comprises » n'est pas une note de bas de page : elle est une
// propriété du montant lui-même (`Montant`, interfaces/types.ts) et sort collée au
// chiffre par `utils/tarif.ts`.
import type { IGrilleTarifaire } from '../../interfaces/grille-tarifaire'
import { grilleTarifaireSchema } from '../../schemas/grille-tarifaire.schema'

const donnees = {
  offre: 'sea',
  argument:
    'En encadrant des prestataires d’acquisition avant de piloter moi-même, j’ai vu la même mécanique se répéter : les campagnes s’optimisent sur les métriques de la régie — coût par clic, conversions déclarées — parce que c’est la seule matière disponible de ce côté-là, pendant que l’entreprise décide sur ses chiffres à elle : marge, stock, valeur d’un client dans la durée. Ce n’est pas une affaire de compétence, c’est une affaire d’accès. C’est ce qui rend la mise en place incluse quand j’ai conçu le site : c’est le seul cas où la mesure est construite dans le produit dès le départ, du côté de vos chiffres.',
  // Preuve DÉSIGNÉE et non recopiée : les budgets pilotés et les prestataires encadrés
  // sont déjà écrits — une seule fois — sur l'axe « Pilotage des campagnes » de l'offre.
  preuve: { offre: 'sea', axe: 'sea-pilotage' },
  lignes: [
    {
      cle: 'mise-en-place-site-concu',
      intitule: 'Mise en place de la solution data-driven',
      condition: 'si j’ai conçu le site',
      // Aucun montant : c'est la charnière économique de la chaîne cadrage →
      // développement → câblage data → SEA, et la raison concrète de prendre le tout
      // chez un seul interlocuteur.
      montant: { nature: 'inclus' },
    },
    {
      cle: 'mise-en-place-site-existant',
      intitule: 'Mise en place de la solution data-driven',
      condition: 'sur un site existant, que je n’ai pas conçu',
      montant: {
        nature: 'fourchette',
        minimum: 300,
        maximum: 1200,
        mentionFiscale: 'TTC',
        periodicite: 'une-seule-fois',
        variableSelon: 'le périmètre',
      },
    },
    {
      cle: 'gestion-du-compte',
      intitule: 'Gestion du compte',
      condition: 'ensuite, une fois la solution en place',
      montant: { nature: 'sur-devis', periodicite: 'mensuel' },
    },
  ],
} satisfies IGrilleTarifaire

/** Validée au chargement : une donnée non conforme échoue au build, pas en production. */
export const grilleTarifaireSea: IGrilleTarifaire = grilleTarifaireSchema.parse(donnees)
