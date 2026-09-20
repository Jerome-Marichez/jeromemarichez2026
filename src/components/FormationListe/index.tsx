import type { IFormation } from '@/interfaces/IFormation'
import styles from './formation-liste.module.css'

interface IFormationListeProps {
  readonly formations: readonly IFormation[]
}

/**
 * Les diplômes obtenus, dans leur ordre de déclaration.
 *
 * Aucune année n'est rendue : c'est l'ordre de la liste qui fait le classement.
 */
export function FormationListe({ formations }: IFormationListeProps) {
  return (
    <dl className={styles.liste}>
      {formations.map((formation) => (
        <div className={styles.entree} key={formation.diplome}>
          <dt className={styles.diplome}>{formation.diplome}</dt>
          <dd className={styles.detail}>{formation.ville}</dd>
        </div>
      ))}
    </dl>
  )
}
