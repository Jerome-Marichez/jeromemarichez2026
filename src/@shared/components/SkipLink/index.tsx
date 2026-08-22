// SkipLink/index.tsx — jeromemarichez-fr
// Lien d'évitement vers le contenu principal.

import styles from './skip-link.module.css'

/**
 * Premier élément focusable du document (RGAA 12.7, WCAG 2.4.1).
 *
 * Il est déplacé hors écran plutôt que masqué par `display: none` : un lien réellement
 * masqué n'est pas atteignable au clavier, ce qui annule le service rendu. Il réapparaît
 * au focus, sans dépendre du JavaScript.
 */
export function SkipLink() {
  return (
    <a className={styles.lien} href="#contenu">
      Aller au contenu
    </a>
  )
}
