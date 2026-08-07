import Link from 'next/link'
import type { ReactNode } from 'react'
import styles from './action-link.module.css'

/** `primary` pour l'action attendue d'une page, `secondary` pour une alternative. */
export type ActionLinkVariant = 'primary' | 'secondary'

interface IActionLinkProps {
  href: string
  children: ReactNode
  variant?: ActionLinkVariant
  /** Ouvre dans un nouvel onglet et annonce l'ouverture aux lecteurs d'écran. */
  external?: boolean
  className?: string
}

/**
 * Lien mis en avant visuellement comme un bouton. Le site étant une vitrine
 * entièrement prérendue, ses appels à l'action sont des NAVIGATIONS : c'est un
 * `a` qui est rendu, jamais un `button` — un `button` sans gestionnaire ne serait
 * ni annoncé correctement, ni ouvrable dans un nouvel onglet.
 *
 * Les vraies commandes (envoi du formulaire de contact) relèveront d'un `button`
 * dédié, qui réutilisera ces mêmes jetons.
 */
export function ActionLink({
  href,
  children,
  variant = 'primary',
  external = false,
  className,
}: IActionLinkProps) {
  const classNames = [styles.action, styles[variant], className].filter(Boolean).join(' ')

  if (external) {
    return (
      <a
        className={classNames}
        href={href}
        rel="noopener noreferrer"
        target="_blank"
        data-variant={variant}
      >
        {children}
        <span className={styles.assistiveHint}> (nouvelle fenêtre)</span>
      </a>
    )
  }

  return (
    <Link className={classNames} href={href} data-variant={variant}>
      {children}
    </Link>
  )
}
