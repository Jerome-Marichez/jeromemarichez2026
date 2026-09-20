import type { ICompetence } from '@/interfaces/ICompetence'
import styles from './mur-de-stack.module.css'

interface IMurDeStackProps {
  readonly competences: readonly ICompetence[]
}

/**
 * Le mur de stack : neuf familles, soixante-et-onze entrees, d'un bloc.
 *
 * C'est un choix, pas un defaut de mise en page. Une page de competences qui
 * aere tout finit par mentir sur la quantite : elle donne a dix lignes l'air
 * d'en valoir cinquante. Ici la densite est l'information. Le recruteur qui
 * survole voit l'etendue d'un coup d'oeil, celui qui lit vraiment y trouve le
 * detail, et les deux lectures sont servies par la meme surface.
 *
 * La densite vient de la mise en colonnes et de l'interlignage serre, **jamais**
 * d'une typographie minuscule : un mur illisible ne recompense personne. Les
 * entrees restent a 13px sur un contraste de 15:1.
 *
 * Structure en liste de definitions : la famille est le terme, ses entrees la
 * definition. Un lecteur d'ecran annonce donc « 9 termes » et peut sauter de
 * famille en famille, ce qu'une suite de `div` ne permettrait pas.
 */
export function MurDeStack({ competences }: IMurDeStackProps) {
  return (
    <div className={styles.mur}>
      <dl className={styles.colonnes}>
        {competences.map((competence) => (
          <div className={styles.groupe} key={competence.famille}>
            <dt className={styles.famille}>{competence.famille}</dt>
            <dd>
              <ul className={styles.entrees}>
                {competence.items.map((item) => (
                  <li className={styles.entree} key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
