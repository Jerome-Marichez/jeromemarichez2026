// EmploymentFrame/index.tsx — jeromemarichez-fr
// Le cadre d'une réalisation : organisation, statut, intitulé de poste, période, équipe.

import type { IRealisationCadre } from '@/interfaces/IRealisationCadre'
import styles from './employment-frame.module.css'

interface EmploymentFrameProps {
  cadre: IRealisationCadre
  /**
   * Balise portant le nom de l'organisation. `h2` sur la liste, où chaque cadre ouvre un
   * groupe ; `p` sur une fiche, où le titre de niveau 2 appartient déjà aux sections du
   * récit.
   */
  niveau?: 'h2' | 'p'
  /** Identifiant du titre, pour le `aria-labelledby` de la section qui l'englobe. */
  titreId?: string
}

/**
 * Rendu en liste de définitions, et pas en suite de phrases.
 *
 * Quatre informations de nature différente — un statut, un poste, une période, une équipe
 * — dont chacune répond à une question précise. Une liste de définitions dit laquelle
 * répond à quoi, pour un lecteur d'écran comme à l'œil, là où « Développeur Full Stack,
 * 2019-2022, poste unique » demande de deviner.
 *
 * **Le statut est un terme à part entière, en tête de la liste**, jamais une mention
 * glissée dans une autre valeur : c'est lui qui distingue les deux postes salariés de la
 * mission menée en indépendant chez Truffle Capital, et une information de ce rang doit
 * être atteignable comme les autres à la navigation par définitions (issue #107).
 *
 * Ce bloc est le garde-fou éditorial de tout l'espace : c'est lui qui dit à quel titre
 * chaque travail a été mené. Il apparaît donc au-dessus du titre sur une fiche, pas en bas
 * de page.
 */
export function EmploymentFrame({ cadre, niveau = 'p', titreId }: EmploymentFrameProps) {
  const Organisation = niveau

  return (
    <div className={styles.cadre}>
      <Organisation className={styles.organisation} id={titreId}>
        {cadre.organisation}
      </Organisation>

      <dl className={styles.details}>
        <div className={styles.ligne}>
          <dt className={styles.terme}>Statut</dt>
          <dd className={styles.valeur}>{cadre.statut}</dd>
        </div>
        <div className={styles.ligne}>
          <dt className={styles.terme}>Poste</dt>
          <dd className={styles.valeur}>{cadre.poste}</dd>
        </div>
        <div className={styles.ligne}>
          <dt className={styles.terme}>Période</dt>
          <dd className={styles.valeur}>{cadre.periode}</dd>
        </div>
        <div className={styles.ligne}>
          <dt className={styles.terme}>Équipe</dt>
          <dd className={styles.valeur}>{cadre.equipe}</dd>
        </div>
      </dl>
    </div>
  )
}
