// CertificationList/index.tsx — jeromemarichez-fr
// Les certifications : un logo, un intitulé, un millésime.

import type { ICertification } from '@/interfaces/ICertification'
import styles from './certification-list.module.css'

interface CertificationListProps {
  certifications: ICertification[]
}

/**
 * Rend une liste de certifications, chacune sous sa plaque de logo.
 *
 * Le logo est l'élément dominant de la carte (issue #49, demande de Jérôme MARICHEZ :
 * « les logos de certifications, moins de blabla ») : la plaque vient en premier et
 * occupe la hauteur, l'intitulé et l'année suivent. Il n'y a plus de paragraphe
 * d'apport, et plus de ligne d'organisme redondante avec le logo — ce que la
 * certification change dans la prestation se dit dans les sections de pôle.
 *
 * Deux règles se rejoignent ici, et toutes deux tiennent au même principe — ne jamais
 * publier ce qui n'a pas été fourni :
 *   — le lien n'apparaît que si le justificatif officiel est connu ;
 *   — le logo n'apparaît que si le fichier a été déposé dans `public/certifications/`
 *     **et** que sa provenance est consignée dans le LISEZMOI du dossier.
 * Sans fichier, la plaque affiche le nom de l'organisme en lettres capitales : la grille
 * garde son rythme, et rien n'est cassé.
 *
 * Le logo porte le nom de l'organisme en `alt`, parce qu'il est désormais le **seul**
 * endroit où cet organisme est énoncé. Le repli, lui, l'écrit en clair : dans les deux
 * cas l'information est donnée une fois et une seule.
 *
 * `img` natif et non `next/image`, pour deux raisons qui pointent dans le même sens :
 * l'optimiseur ne saurait rien faire de ces fichiers — ce sont des SVG, et
 * `/_next/image` les refuse tant que `dangerouslyAllowSVG` est à `false`, ce qu'il doit
 * rester ; et son runtime pesait 8,7 ko gzip sur toutes les pages du site pour zéro
 * image effectivement rendue. `largeur` et `hauteur` restent obligatoires côté
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
              // biome-ignore lint/performance/noImgElement: les logos sont des SVG, et /_next/image les refuse tant que `dangerouslyAllowSVG` vaut `false`, ce qu'il doit rester pour des raisons de sécurité. La règle vise le cas général de l'image bitmap non optimisée ; ici elle a tort, pas le code. Raisonnement complet dans le commentaire de tête du composant.
              <img
                alt={certification.organisme}
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
          {certification.annee ? <p className={styles.annee}>{certification.annee}</p> : null}
        </li>
      ))}
    </ul>
  )
}
