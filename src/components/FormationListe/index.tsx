import type { IFormation } from '@/interfaces/IFormation'
import styles from './formation-liste.module.css'

interface IFormationListeProps {
  readonly formations: readonly IFormation[]
}

/** Les diplômes obtenus, en liste de définitions alignée sur la même colonne. */
export function FormationListe({ formations }: IFormationListeProps) {
  return (
    <dl className={styles.liste}>
      {formations.map((formation) => (
        <div className={styles.entree} key={formation.diplome}>
          <dt className={styles.diplome}>{formation.diplome}</dt>
          <dd className={styles.detail}>
            {formation.ville}
            <span aria-hidden="true"> · </span>
            {formation.annee}
          </dd>
        </div>
      ))}
    </dl>
  )
}
