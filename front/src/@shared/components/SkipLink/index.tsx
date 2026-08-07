import styles from './skip-link.module.css'

interface ISkipLinkProps {
  /** Identifiant de l'élément à atteindre ; celui-ci doit être focusable. */
  targetId: string
  children?: string
}

/**
 * Premier élément focusable de la page : permet d'atteindre le contenu principal
 * sans parcourir toute la navigation au clavier (WCAG 2.4.1).
 *
 * Il reste dans le flux et dans l'ordre de tabulation en permanence — il est
 * seulement déplacé hors du champ visuel par une transformation, et revient à sa
 * place dès qu'il reçoit le focus.
 */
export function SkipLink({ targetId, children = 'Aller au contenu principal' }: ISkipLinkProps) {
  return (
    <a className={styles.skipLink} href={`#${targetId}`}>
      {children}
    </a>
  )
}
