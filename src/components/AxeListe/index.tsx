import type { IAxe } from '@/interfaces/IAxe'
import styles from './axe-liste.module.css'

interface IAxeListeProps {
  readonly axes: readonly IAxe[]
}

/**
 * Les quatre axes de la pratique, lus comme un commentaire de code.
 *
 * C'est une liste de definitions et pas une grille de cartes : quatre cartes de
 * meme taille diraient quatre offres au catalogue, alors qu'il s'agit d'une seule
 * pratique lue sous quatre angles. Alignees sur la meme colonne de caracteres,
 * les quatre lignes se lisent comme un bloc, ce qui est exactement le propos.
 *
 * Aucun numero d'ordre : les axes n'ont pas de hierarchie entre eux, et un
 * « 01 / 02 / 03 » en inventerait une.
 */
export function AxeListe({ axes }: IAxeListeProps) {
  return (
    <dl className={styles.liste}>
      {axes.map((axe) => (
        <div className={styles.axe} key={axe.nom}>
          <dt className={styles.nom}>
            <span className={styles.marqueur} aria-hidden="true">
              {'//'}
            </span>
            {axe.nom}
          </dt>
          <dd className={styles.corps}>
            <p className={styles.phrase}>{axe.phrase}</p>
            <ul className={styles.preuves}>
              {axe.preuves.map((preuve) => (
                <li className={styles.preuve} key={preuve.chiffre}>
                  <span className={styles.chiffre}>{preuve.chiffre}</span>
                  <span className={styles.contexte}>{preuve.contexte}</span>
                </li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  )
}
