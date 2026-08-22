// IRealisation.ts — jeromemarichez-fr
// Une réalisation : un travail mené, son cadre d'emploi, et ce qu'il permettait de trancher.
//
// Le contenu est versionné en TypeScript, comme le reste du site (docs/architecture.md).
// Ce n'est donc pas une entrée externe et il n'est pas validé par Zod : la seule frontière
// franchie est le `slug` d'URL, confronté à cette liste close au build par
// `generateStaticParams`.

import type { IPageMeta } from './IEditorialPage'
import type { IRealisationCadre } from './IRealisationCadre'
import type { IRealisationChiffre } from './IRealisationChiffre'
import type { IRealisationEtape } from './IRealisationEtape'
import type { PoleId } from './types'

/**
 * Une réalisation publiée.
 *
 * **Ce n'est pas un cas client**, et le modèle le tient par la structure plutôt que par la
 * relecture : `cadre` est obligatoire, donc aucune fiche ne peut paraître sans son
 * intitulé de poste, sa période et sa taille d'équipe.
 *
 * `poles` est un `readonly PoleId[]` **non contraint**, et c'est un choix. Le modèle de
 * l'offre — ingénierie web, puis data, puis IA et/ou SEA & UX — décrit ce qui se vend
 * aujourd'hui, pas un historique. Un type qui exigerait `data` partout forcerait à
 * réétiqueter des travaux de 2017 et de 2019 pour satisfaire le compilateur : ce serait
 * le type qui écrirait le contenu. Deux formes portent d'ailleurs tout l'argument —
 * `['ingenierie-web', 'data', 'sea-ux']` **sans IA** montre qu'on n'est pas obligé
 * d'acheter de l'IA, et `['data']` seul que la donnée se livre pour elle-même.
 */
export interface IRealisation {
  /** Identifiant kebab-case, dernier segment de l'URL (`/realisations/<slug>/`). Immuable. */
  slug: string
  /** Titre affiché, `<h1>` de la fiche. Formulé à l'infinitif : un travail, pas une offre. */
  titre: string
  /** Chapô, 2 à 3 phrases. Sert aussi de résumé sur la liste et dans le JSON-LD. */
  chapo: string
  /** Métadonnées SEO propres à la fiche. */
  meta: IPageMeta
  /** Cadre d'emploi. Obligatoire — voir `IRealisationCadre`. */
  cadre: IRealisationCadre
  /** Pôles réellement mobilisés. Non contraint : voir la note ci-dessus. */
  poles: readonly PoleId[]
  /** Le problème posé au départ, dans les termes de l'époque. */
  probleme: string
  /** Ce qui a été fait, étape par étape. */
  etapes: readonly IRealisationEtape[]
  /**
   * Le résultat, **directionnel et jamais chiffré** : le nombre a sa propre porte
   * (`chiffre`), et elle n'est ouverte que trois fois sur tout le site.
   *
   * Obligatoire, y compris quand aucun résultat n'a été mesuré — le champ dit alors qu'il
   * n'y en a pas. Le rendre optionnel laisserait une fiche muette sur son issue, ce qui
   * se lit comme un résultat tu, pas comme un résultat absent.
   */
  resultat: string
  /** Le chiffre, quand la fiche en porte un. Trois fiches seulement. */
  chiffre?: IRealisationChiffre
  /** Ce que le commanditaire pouvait trancher à l'arrivée. Une décision, jamais un outil. */
  decision: string
}
