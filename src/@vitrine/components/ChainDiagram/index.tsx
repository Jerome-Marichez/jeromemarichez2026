// ChainDiagram/index.tsx — jeromemarichez-fr
// La chaîne en un écran : trois plaques, deux passages de relais.

import Link from 'next/link'
import { POLES_NAV } from '../../contenu/poles-nav'
import styles from './chain-diagram.module.css'

/**
 * Le schéma est en HTML et CSS purs — pas de canvas, pas de SVG porteur de texte.
 *
 * C'est délibéré : ce bloc sert à la fois de thèse, de sommaire et d'ancre de
 * navigation. Il doit donc être lu par un moteur de recherche, atteint au clavier et
 * annoncé par un lecteur d'écran. Une image ne rendrait aucun de ces trois services.
 *
 * `<ol>` et non `<ul>` : l'ordre porte le sens. On ne pioche pas un pôle dans un menu,
 * on avance dans une chaîne.
 */
export function ChainDiagram() {
  return (
    <ol className={styles.chaine}>
      {POLES_NAV.map((pole) => (
        <li className={styles.maillon} key={pole.id}>
          <article className={styles.plaque}>
            <p className={styles.rang}>Pôle {pole.rang}</p>
            <h3 className={styles.nom}>
              <Link className={styles.lien} href={pole.route}>
                {pole.nom}
              </Link>
            </h3>
            <p className={styles.promesse}>{pole.promesse}</p>
          </article>

          {pole.remise ? (
            <p className={styles.remise}>
              <span aria-hidden="true" className={styles.fleche} />
              {pole.remise}
            </p>
          ) : null}
        </li>
      ))}
    </ol>
  )
}
