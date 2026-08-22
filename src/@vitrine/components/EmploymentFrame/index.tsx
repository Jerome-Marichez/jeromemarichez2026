// EmploymentFrame/index.tsx — jeromemarichez-fr
// Le cadre d'emploi d'une réalisation : employeur, intitulé de poste, période, équipe.

import type { IRealisationCadre } from '@/interfaces/IRealisationCadre'
import styles from './employment-frame.module.css'

interface EmploymentFrameProps {
  cadre: IRealisationCadre
  /**
   * Balise portant l'employeur. `h2` sur la liste, où chaque cadre ouvre un groupe ;
   * `p` sur une fiche, où le titre de niveau 2 appartient déjà aux sections du récit.
   */
  niveau?: 'h2' | 'p'
  /** Identifiant du titre, pour le `aria-labelledby` de la section qui l'englobe. */
  titreId?: string
}

/**
 * Rendu en liste de définitions, et pas en suite de phrases.
 *
 * Trois informations de nature différente — un poste, une période, une équipe — dont
 * chacune répond à une question précise. Une liste de définitions dit laquelle répond à
 * quoi, pour un lecteur d'écran comme à l'œil, là où « Développeur Full Stack, 2019-2022,
 * poste unique » demande de deviner.
 *
 * Ce bloc est le garde-fou éditorial de tout l'espace : c'est lui qui empêche une fiche de
 * se lire comme une prestation vendue à un client. Il apparaît donc au-dessus du titre sur
 * une fiche, pas en bas de page.
 */
export function EmploymentFrame({ cadre, niveau = 'p', titreId }: EmploymentFrameProps) {
  const Employeur = niveau

  return (
    <div className={styles.cadre}>
      <Employeur className={styles.employeur} id={titreId}>
        {cadre.employeur}
      </Employeur>

      <dl className={styles.details}>
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
