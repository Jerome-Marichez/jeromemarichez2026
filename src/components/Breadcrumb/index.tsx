// Breadcrumb/index.tsx — jeromemarichez-fr
// Le fil d'Ariane visible. Même liste que celle déclarée aux moteurs.

import Link from 'next/link'
import type { IBreadcrumbItem } from '@/interfaces/IBreadcrumbItem'
import { ROUTES } from '../../routes'
import styles from './breadcrumb.module.css'

interface BreadcrumbProps {
  /** Niveaux qui suivent l'accueil. Le dernier est la page courante. */
  fil: IBreadcrumbItem[]
}

/**
 * Rend le fil d'Ariane à partir de la même liste que `buildBreadcrumbSchema` : le fil
 * affiché et le fil déclaré ne peuvent pas diverger, puisqu'il n'y en a qu'un.
 *
 * Une liste ordonnée, et pas une suite de liens séparés par des barres obliques : la
 * hiérarchie est une information, elle doit exister pour un lecteur d'écran et pas
 * seulement à l'œil. Le dernier niveau n'est pas un lien — il désigne la page qu'on lit
 * déjà, et `aria-current` le dit.
 */
export function Breadcrumb({ fil }: BreadcrumbProps) {
  const dernier = fil.length - 1

  return (
    <nav aria-label="Fil d'Ariane" className={styles.ariane}>
      <ol className={styles.liste}>
        <li className={styles.niveau}>
          <Link href={ROUTES.accueil}>Accueil</Link>
        </li>
        {fil.map((niveau, index) => (
          <li className={styles.niveau} key={niveau.route}>
            <span aria-hidden="true" className={styles.separateur}>
              /
            </span>
            {index === dernier ? (
              <span aria-current="page">{niveau.nom}</span>
            ) : (
              <Link href={niveau.route}>{niveau.nom}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
