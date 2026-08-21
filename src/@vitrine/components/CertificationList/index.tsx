// CertificationList/index.tsx — jeromemarichez-fr
// Les certifications, avec ce que chacune change concrètement.

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
 *
 * `img` natif et non `next/image`, pour deux raisons qui pointent dans le même sens :
 * l'optimiseur ne saurait rien faire de ces fichiers — ce sont des SVG, et
 * `/_next/image` les refuse tant que `dangerouslyAllowSVG` est à `false`, ce qu'il doit
 * rester ; et son runtime pesait 8,7 ko gzip sur toutes les pages du site pour zéro
 * image effectivement rendue. `width` et `hauteur` restent obligatoires côté
 * `ICertificationLogo` : ce sont eux, et non le composant, qui réservent la place et
 * garantissent l'absence de CLS. `loading="lazy"` parce que la grille des
 * certifications est toujours loin sous la ligne de flottaison.
 */
export function CertificationList({ certifications }: CertificationListProps) {
  return (
    <ul className={styles.liste}>
      {certifications.map((certification) => (
        <li className={styles.item} key={certification.intitule}>
          <span className={styles.plaque}>
            {certification.logo ? (
              <img
                alt=""
                className={styles.logo}
                decoding="async"
                height={certification.logo.hauteur}
                loading="lazy"
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
