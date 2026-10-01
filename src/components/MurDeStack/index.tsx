import Link from 'next/link'
import { GlypheCompetence } from '@/components/GlyphesCompetences'
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
 * La densite vient d'une grille explicite et de l'interlignage serre, **jamais**
 * d'une typographie minuscule : un mur illisible ne recompense personne. Les
 * entrees restent a 13px sur un contraste de 15:1.
 *
 * Chaque famille porte un glyphe decoratif pour se distinguer au premier coup
 * d'oeil, et un ancrage de preuve optionnel vers le projet reel ou elle a
 * servi (issue #173). L'ancrage est absent quand aucun projet ne la traite
 * explicitement : voir `src/contenu/competences.ts`.
 *
 * Structure en liste de definitions : la famille est le terme, ses entrees la
 * definition. Un lecteur d'ecran annonce donc « 9 termes » et peut sauter de
 * famille en famille, ce qu'une suite de `div` ne permettrait pas. La grille
 * CSS s'applique aux groupes `dt`/`dd`, pas au balisage, qui reste inchange.
 */
export function MurDeStack({ competences }: IMurDeStackProps) {
  return (
    <div className={styles.mur}>
      <dl className={styles.colonnes}>
        {competences.map((competence) => (
          <div className={styles.groupe} key={competence.famille}>
            <dt className={styles.famille}>
              <GlypheCompetence famille={competence.famille} />
              {competence.famille}
            </dt>
            <dd>
              <ul className={styles.entrees}>
                {competence.items.map((item) => (
                  <li className={styles.entree} key={item}>
                    {item}
                  </li>
                ))}
              </ul>
              {competence.ancrage !== undefined && (
                <p className={styles.ancrage}>
                  vu sur : <Link href="/projets/">{competence.ancrage.titreProjet}</Link>
                </p>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
