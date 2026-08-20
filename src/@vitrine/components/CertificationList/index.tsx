// CertificationList/index.tsx — jeromemarichez-fr
// Les certifications, avec ce que chacune change concrètement.

import type { ICertification } from '@/interfaces/ICertification'
import styles from './certification-list.module.css'

interface CertificationListProps {
  certifications: ICertification[]
}

/**
 * Rend une liste de certifications.
 *
 * Une certification n'est affichée avec un lien que si son justificatif officiel est
 * connu (`ICertification.justificatif`). Aucun n'ayant été fourni à ce jour, la liste
 * s'affiche entièrement sans lien : c'est volontaire, et c'est la règle du projet —
 * mieux vaut une certification non cliquable qu'un lien mort sur un site qui vend de
 * la rigueur.
 */
export function CertificationList({ certifications }: CertificationListProps) {
  return (
    <ul className={styles.liste}>
      {certifications.map((certification) => (
        <li className={styles.item} key={certification.intitule}>
          <p className={styles.intitule}>
            {certification.justificatif ? (
              <a href={certification.justificatif} rel="noopener noreferrer" target="_blank">
                {certification.intitule}
              </a>
            ) : (
              certification.intitule
            )}
          </p>
          <p className={styles.organisme}>
            {certification.organisme}
            {certification.annee ? (
              <span className={styles.annee}>{certification.annee}</span>
            ) : null}
          </p>
          <p className={styles.apport}>{certification.apport}</p>
        </li>
      ))}
    </ul>
  )
}
