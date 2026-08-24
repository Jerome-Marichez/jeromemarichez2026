// poles-preuves.ts (jeromemarichez-fr)
// La preuve que chaque porte de l'accueil met sous le nom de son pôle.
//
// Pourquoi ici et pas dans `poles-nav.ts` : cette liste-là est chargée par l'en-tête et
// le pied de page, donc sur toutes les pages du site, et elle ne porte que l'identité et
// la place. La preuve n'a qu'un seul lecteur (la porte de l'accueil) et elle reste donc
// chez lui.
//
// Le `Record<PoleId, string>` est exhaustif par construction : un cinquième pôle ne
// compilerait pas tant que sa preuve n'est pas écrite. C'est ce que demande l'issue #103 :
// chaque porte porte une preuve, aucune n'en est dispensée, et le compilateur le tient.
//
// **Les deux nombres publiables ne sont pas recopiés ici** : ils sont lus sur la fiche de
// réalisation qui les déplie, exactement comme le fait le mur de preuves (`preuves.ts`).
// Le nombre n'est écrit qu'une fois dans le dépôt, donc la porte et la fiche ne peuvent
// pas afficher deux valeurs différentes.
//
// Data et IA n'ont pas de nombre, et n'en inventent pas. Les trois seuls chiffres
// publiables du site sont ceux du mur de preuves (voir `IRealisationChiffre`) et aucun
// des trois ne tombe sur ces deux pôles-ci. Le `CLAUDE.md` accepte une **contrainte
// tenue** ou un résultat directionnel comme preuve : c'est ce qui est écrit, et rien
// n'est élargi pour que la ligne ressemble à un chiffre.

import type { PoleId } from '@/interfaces/types'
import { REALISATION_SMS_EN_MASSE } from './realisations/mailingvox-produits'
import { REALISATION_PARCOURS_ACHAT } from './realisations/verhoeven'

export const PREUVE_POLE: Record<PoleId, string> = {
  'ingenierie-web':
    `${REALISATION_SMS_EN_MASSE.chiffre.chiffre} ${REALISATION_SMS_EN_MASSE.chiffre.libelle} ` +
    'sur la plateforme SaaS livrée, conformité RGAA / WCAG tenue en parallèle.',
  data: 'Conformité RGPD et DORA tenue en appels d’offres grands comptes.',
  ia: 'Règles anti-fraude implémentées dans le produit : fraude en baisse, latence réduite.',
  'sea-ux':
    `${REALISATION_PARCOURS_ACHAT.chiffre.chiffre} ${REALISATION_PARCOURS_ACHAT.chiffre.libelle} ` +
    'après refonte des parcours d’achat.',
}
