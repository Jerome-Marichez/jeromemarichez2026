'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { INavigationLink } from '../../../../interfaces/inavigation-link'
import styles from './nav-link.module.css'

/**
 * NON PUR — d'où sa place dans `_notPure/`.
 *
 * Ce composant lit une donnée qui ne vient pas de ses props : la route courante,
 * fournie par le routeur (`usePathname`). Il en dépend donc du contexte
 * d'exécution et doit être rendu côté client.
 *
 * Ce coût est assumé pour une seule raison : sans `aria-current="page"`, un
 * lecteur d'écran ne distingue pas la page affichée des autres entrées du menu
 * (WCAG 2.4.8). C'est le seul composant du socle dans ce cas.
 */
export function NavLink({ href, label }: INavigationLink) {
  const pathname = usePathname()
  const isCurrentPage = pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Link aria-current={isCurrentPage ? 'page' : undefined} className={styles.link} href={href}>
      {label}
    </Link>
  )
}
