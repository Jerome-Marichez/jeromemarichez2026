import Link from 'next/link'
import styles from './bouton.module.css'

interface IBoutonProps {
  readonly href: string
  readonly children: React.ReactNode
  /** `primaire` porte la lampe en aplat, `secondaire` n'a qu'un filet. */
  readonly ton?: 'primaire' | 'secondaire'
  /** Renseigne pour un fichier a telecharger plutot qu'une route interne. */
  readonly telechargement?: string
}

/**
 * Une action. Deux tons seulement, et un seul primaire par ecran : s'il y en a
 * deux, le visiteur n'a plus d'action principale.
 *
 * Un lien vers un fichier n'est pas une route interne : il sort donc du routeur
 * et porte l'attribut `download`, sinon le PDF s'ouvrirait dans l'onglet au lieu
 * d'arriver dans les telechargements du recruteur.
 */
export function Bouton({ href, children, ton = 'secondaire', telechargement }: IBoutonProps) {
  if (telechargement !== undefined) {
    return (
      <a className={styles.bouton} data-ton={ton} href={href} download={telechargement}>
        {children}
      </a>
    )
  }

  return (
    <Link className={styles.bouton} data-ton={ton} href={href}>
      {children}
    </Link>
  )
}
