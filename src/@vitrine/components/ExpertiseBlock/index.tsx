// ExpertiseBlock/index.tsx — jeromemarichez-fr
// Un point d'expertise : ce qu'il couvre, ce qu'il prouve, ce qu'il permet de trancher.

import type { IEditorialBlock } from '@/interfaces/IEditorialBlock'
import styles from './expertise-block.module.css'

interface ExpertiseBlockProps {
  bloc: IEditorialBlock
  /** Niveau de titre, pour que la hiérarchie du document reste juste selon le contexte. */
  headingLevel?: 'h3' | 'h4'
}

/**
 * Rend un bloc d'expertise.
 *
 * La preuve et la décision sont typographiées différemment du corps : ce sont les deux
 * seules lignes qu'un dirigeant pressé lira, et la ligne éditoriale du projet veut
 * qu'elles soient repérables sans être criées.
 */
export function ExpertiseBlock({ bloc, headingLevel = 'h3' }: ExpertiseBlockProps) {
  const Heading = headingLevel

  return (
    <article className={styles.bloc}>
      <Heading className={styles.titre}>{bloc.titre}</Heading>
      <p className={styles.texte}>{bloc.texte}</p>

      {bloc.preuve ? (
        <p className={styles.preuve}>
          <span className={styles.etiquette}>Preuve</span>
          {bloc.preuve}
        </p>
      ) : null}

      {bloc.decision ? (
        <p className={styles.decision}>
          <span className={styles.etiquette}>Ce que vous tranchez</span>
          {bloc.decision}
        </p>
      ) : null}
    </article>
  )
}
