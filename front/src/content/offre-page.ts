// offre-page.ts — jeromemarichez2026
// Libellés du gabarit des trois pages d'offre (issue #22).
//
// PÉRIMÈTRE STRICT : ce fichier ne porte que la CHARPENTE — intitulés de section et
// étiquettes. Il ne dit rien d'une offre en particulier. Tout ce qui décrit une offre
// (accroche, axes, preuves, décision permise, grille tarifaire) vient de
// `content/offres/`, qui n'a pas été touché : le contenu fait foi, la page l'affiche.
//
// Véracité — points tenus ici :
// - aucune affirmation, aucun chiffre, aucune durée : rien ici ne peut être faux, parce
//   que rien ici n'avance quoi que ce soit. Les preuves sont dans les offres ;
// - première personne du singulier (CLAUDE.md) : « je », jamais « nous » ;
// - aucun délai de réponse annoncé, aucun engagement de disponibilité : aucun n'est
//   établi (même règle que `content/accueil.ts`) ;
// - aucun montant : les seuls chiffres publiables du site sont dans `sea-tarifs.ts` et
//   n'en sortent que par `utils/tarif.ts` ;
// - aucun emoji, aucun superlatif.
//
// AUCUN LIBELLÉ N'EST REPRIS DE `content/accueil.ts`. « Ce que vous décidez » y existe
// déjà comme étiquette de carte ; le reprendre à l'identique aurait écrit deux fois le
// même texte, ce que le projet s'interdit. Sur une page d'offre la décision n'est pas
// une étiquette mais une SECTION, et elle porte donc un intitulé qui lui est propre.
import type { IOffrePage } from '../interfaces/offre-page'
import { offrePageSchema } from '../schemas/offre-page.schema'

const donnees = {
  titreAxes: 'Ce que couvre l’offre',
  libellePreuve: 'Preuve',
  titreDecision: 'Ce que cette offre vous permet de décider',
  titreTarifs: 'Tarifs',
  libellePreuveTarifs: 'Ce qui appuie cet argument',
  contact: {
    titre: 'Parlons de votre projet',
    lead: 'Décrivez votre besoin en quelques lignes : je vous dis ce que cette offre couvre dans votre cas, et ce qu’elle ne couvre pas.',
    action: { href: '/contact', libelle: 'Me contacter' },
  },
} satisfies IOffrePage

/** Validé au chargement : une donnée non conforme échoue au build, pas en production. */
export const offrePage: IOffrePage = offrePageSchema.parse(donnees)
