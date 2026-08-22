// PoleStickyBar/index.tsx — jeromemarichez-fr
// L'en-tête de pôle collant : où l'on est, et la seule action de la page.

import { MagneticAction } from '@/@shared/components/MagneticAction'
import { SITE_IDENTITY } from '@/@shared/seo/site'
import type { IPole } from '@/interfaces/IPole'
import styles from './pole-sticky-bar.module.css'

interface PoleStickyBarProps {
  pole: IPole
}

/**
 * Une page de pôle se lit sur plusieurs écrans : passé le seuil, plus rien ne dit
 * lequel des pôles on est en train de lire, et l'action de contact est restée en bas.
 * Cette barre répond aux deux, sans rien ajouter au discours.
 *
 * Elle prend `--accent`, la teinte du pôle courant, posée par `data-pole` sur la page
 * (mécanisme de l'issue #44). Tant que les teintes ne sont pas définies, le repli est
 * le cuivre : la barre est correcte avant elles, et juste après.
 *
 * Ce n'est **pas** une lentille de verre : liquidGL ignore délibérément les éléments
 * `sticky`, une lentille y resterait figée sur la capture initiale. Le fond suit donc
 * exactement la recette de `SiteHeader` — translucide plat partout, flou au-delà du
 * seuil de 1024px seulement.
 */
export function PoleStickyBar({ pole }: PoleStickyBarProps) {
  return (
    <div className={styles.barre}>
      <div className={styles.contenu}>
        <p className={styles.repere}>
          <span aria-hidden="true" className={styles.rang}>
            {pole.rang}
          </span>
          <span className={styles.nom}>{pole.nom}</span>
        </p>

        <MagneticAction className={styles.action} href={`mailto:${SITE_IDENTITY.email}`}>
          Décrire mon besoin
        </MagneticAction>
      </div>
    </div>
  )
}
