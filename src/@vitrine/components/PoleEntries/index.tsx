// PoleEntries/index.tsx — jeromemarichez-fr
// Les quatre pôles en entrées visuelles, depuis l'accueil.
//
// Jusqu'ici l'accueil déroulait ses pôles dans le fil du texte : on y arrivait en lisant,
// ou par le menu. Un visiteur qui scanne ne trouvait aucune porte. C'est le point 3 de
// l'issue #84.
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
// qu'aucune règle d'ici ne nomme une couleur (voir `poles.css`).

import { PoleGlyph } from '@/@shared/components/PoleGlyph'
import { POLES_NAV } from '../../contenu/poles-nav'
import { LIBELLE_PLACE } from '../../contenu/poles-places'
import styles from './pole-entries.module.css'

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
          <a className={styles.plaque} data-pole={pole.id} href={pole.route}>
            <span aria-hidden="true" className={styles.marque}>
              <PoleGlyph pole={pole.id} />
            </span>
            <span className={styles.place}>{LIBELLE_PLACE[pole.place]}</span>
            <span className={styles.nom}>{pole.nom}</span>
            <span className={styles.promesse}>{pole.promesse}</span>
          </a>
        </li>
      ))}

      {/* Les deux suites dans un même élément de liste : c'est ce qui les met sur une
          rangée et les empêche d'être lues l'une après l'autre. */}
      <li className={styles.branche}>
        <ul className={styles.paire}>
          {suites.map((pole) => (
            <li key={pole.id}>
              <a className={styles.plaque} data-pole={pole.id} href={pole.route}>
                <span aria-hidden="true" className={styles.marque}>
                  <PoleGlyph pole={pole.id} />
                </span>
                <span className={styles.place}>{LIBELLE_PLACE[pole.place]}</span>
                <span className={styles.nom}>{pole.nom}</span>
                <span className={styles.promesse}>{pole.promesse}</span>
              </a>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  )
}
