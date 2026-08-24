// PoleEntries/index.tsx — jeromemarichez-fr
// Les quatre pôles en entrées visuelles, depuis l'accueil.
//
// Jusqu'ici l'accueil déroulait ses pôles dans le fil du texte : on y arrivait en lisant,
// ou par le menu. Un visiteur qui scanne ne trouvait aucune porte. C'est le point 3 de
// l'issue #84.
//
// ## Ces portes portent désormais le report de l'accueil
//
// L'accueil est devenu une vitrine (issue #103) : ses sections de pôle sont descendues
// sur `/services/<pole>/`, qui les disaient déjà en plus long. Ce qui les remplace, c'est
// cette grille — et pour qu'elle les remplace vraiment, chaque porte répond aux trois
// questions qu'un prospect se pose devant un nom de pôle : ce que j'y fais (`promesse`),
// ce qui le prouve (`PREUVE_POLE`), et où lire la suite (la plaque entière est le lien).
// Une porte qui ne donnerait que le nom renverrait le visiteur à la navigation,
// c'est-à-dire à rien.
//
// ## La disposition EST le modèle
//
// Quatre plaques alignées à égalité diraient un catalogue — exactement ce que le
// `CLAUDE.md` interdit d'affirmer. La grille rend donc la chaîne réelle :
//
//     Ingénierie web          (le socle, pleine largeur)
//            ↓
//         Data               (le passage obligé, pleine largeur)
//            ↓
//     IA  ·  SEA & UX        (deux suites, CÔTE À CÔTE, de rang égal)
//
// Les deux suites partagent une rangée parce qu'elles partagent un temps. Les empiler
// aurait réintroduit l'ordre que le modèle nie, et c'est le défaut que ce composant
// existe pour éviter.
//
// Chaque plaque porte `data-pole` : sa marque et son filet prennent `--accent` sans
// qu'aucune règle d'ici ne nomme une couleur (voir `poles.css`). Depuis l'issue #104,
// elle prend aussi le lavis pastel de son pôle sur le fond papier — d'où la classe
// globale `lavis-bloc`, qui ne connaît pas davantage la couleur : elle consomme
// `--lavis-fond` et `--lavis-tache`, posés par `data-pole` sur la plaque elle-même. Les
// quatre portes sont donc quatre taches de couleur côte à côte, une par pôle.

import { PoleGlyph } from '@/components/PoleGlyph'
import type { IPole } from '@/interfaces/IPole'
import { POLES_NAV } from '../../contenu/poles-nav'
import { LIBELLE_PLACE } from '../../contenu/poles-places'
import { PREUVE_POLE } from '../../contenu/poles-preuves'
import styles from './pole-entries.module.css'

/**
 * Une porte : la place, le nom, la promesse, la preuve, et l'invite à entrer.
 *
 * La plaque entière est le lien — c'est la cible la plus grande possible, et cela évite
 * un second lien vers la même page dans le même bloc, qu'un lecteur d'écran annoncerait
 * deux fois. « Voir le pôle » est donc `aria-hidden` : le rôle de lien est déjà porté par
 * l'élément, cette ligne n'est qu'une invite visuelle.
 */
function Porte({ pole }: { pole: IPole }) {
  return (
    <a className={`${styles.plaque} lavis-bloc`} data-pole={pole.id} href={pole.route}>
      <span aria-hidden="true" className={styles.marque}>
        <PoleGlyph pole={pole.id} />
      </span>
      <span className={styles.place}>{LIBELLE_PLACE[pole.place]}</span>
      <span className={styles.nom}>{pole.nom}</span>
      <span className={styles.promesse}>{pole.promesse}</span>
      <span className={styles.preuve}>{PREUVE_POLE[pole.id]}</span>
      <span aria-hidden="true" className={styles.aller}>
        Voir le pôle
      </span>
    </a>
  )
}

/**
 * Les pôles sont lus depuis `POLES_NAV`, source unique déjà chargée par l'en-tête et le
 * pied de page. Aucun libellé n'est recopié ici : un cinquième pôle ajouté demain
 * apparaîtrait sans qu'on touche à ce fichier, et un pôle renommé ne pourrait pas diverger.
 */
export function PoleEntries() {
  const socle = POLES_NAV.filter((pole) => pole.place === 'socle')
  const passage = POLES_NAV.filter((pole) => pole.place === 'passage')
  const suites = POLES_NAV.filter((pole) => pole.place === 'suite')

  return (
    <ul className={styles.grille}>
      {[...socle, ...passage].map((pole) => (
        <li className={styles.tronc} key={pole.id}>
          <Porte pole={pole} />
        </li>
      ))}

      {/* Les deux suites dans un même élément de liste : c'est ce qui les met sur une
          rangée et les empêche d'être lues l'une après l'autre. */}
      <li className={styles.branche}>
        <ul className={styles.paire}>
          {suites.map((pole) => (
            <li key={pole.id}>
              <Porte pole={pole} />
            </li>
          ))}
        </ul>
      </li>
    </ul>
  )
}
