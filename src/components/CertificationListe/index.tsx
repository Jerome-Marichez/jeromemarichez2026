import type { ICertification } from '@/interfaces/ICertification'
import styles from './certification-liste.module.css'

interface ICertificationListeProps {
  readonly certifications: readonly ICertification[]
}

/**
 * Les certifications, dans leur ordre de déclaration.
 *
 * Aucune année n'est rendue : c'est l'ordre de la liste qui fait le classement.
 *
 * `justificatif` est `null` partout pour l'instant, donc aucun lien n'est rendu.
 * Le jour où une URL réelle sera fournie, la condition ci-dessous fait
 * apparaître un lien sans qu'il faille toucher au reste du composant.
 */
export function CertificationListe({ certifications }: ICertificationListeProps) {
  return (
    <ul className={styles.liste}>
      {certifications.map((certification) => (
        <li className={styles.entree} key={certification.nom}>
          <p className={styles.nom}>
            {certification.justificatif !== null ? (
              <a
                className={styles.lien}
                href={certification.justificatif}
                target="_blank"
                rel="noopener noreferrer"
              >
                {certification.nom}
              </a>
            ) : (
              certification.nom
            )}
          </p>
          <p className={styles.detail}>{certification.organisme}</p>
        </li>
      ))}
    </ul>
  )
}
