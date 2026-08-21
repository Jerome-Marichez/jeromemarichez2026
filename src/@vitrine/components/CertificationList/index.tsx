// CertificationList/index.tsx — jeromemarichez-fr
// Les certifications, avec ce que chacune change concrètement.

import Image from 'next/image'
import type { ICertification } from '@/interfaces/ICertification'
import styles from './certification-list.module.css'

interface CertificationListProps {
  certifications: ICertification[]
}

/**
 * Rend une liste de certifications, chacune en tête de sa plaque de logo.
 *
 * Deux règles se rejoignent ici, et toutes deux tiennent au même principe — ne jamais
 * publier ce qui n'a pas été fourni :
 *   — le lien n'apparaît que si le justificatif officiel est connu ;
 *   — le logo n'apparaît que si le fichier a été déposé dans `public/certifications/`
 *     **et** autorisé par le propriétaire de la marque (voir le LISEZMOI du dossier).
 * Sans fichier, la plaque affiche le nom de l'organisme en lettres capitales : la grille
 * garde son rythme, et rien n'est cassé.
 *
 * Le logo est `alt=""` : l'organisme est déjà écrit juste en dessous, et le doubler
 * ferait entendre deux fois la même chose à un lecteur d'écran.
 */
export function CertificationList({ certifications }: CertificationListProps) {
  return (
    <ul className={styles.liste}>
      {certifications.map((certification) => (
        <li className={styles.item} key={certification.intitule}>
          <span className={styles.plaque}>
            {certification.logo ? (
              <Image
                alt=""
                className={styles.logo}
                height={certification.logo.hauteur}
                src={certification.logo.fichier}
                width={certification.logo.largeur}
              />
            ) : (
              <span className={styles.sigle}>{certification.organisme}</span>
            )}
          </span>

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
