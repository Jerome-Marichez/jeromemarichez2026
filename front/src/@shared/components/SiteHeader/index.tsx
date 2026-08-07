import Link from 'next/link'
import { siteNavigation } from '../../config/navigation'
import { Container } from '../Container'
import { NavLink } from './_notPure/NavLink'
import styles from './site-header.module.css'

/**
 * En-tête appliqué à toutes les routes : identité à gauche, navigation
 * principale à droite.
 *
 * La navigation est une simple liste de liens qui se replie sur plusieurs
 * lignes en dessous de 640 px, au lieu d'un menu déroulant. Ce choix supprime
 * d'un coup l'état d'ouverture, le piège de focus, la gestion de la touche
 * Échap et le JavaScript associé : cinq liens tiennent sans cela.
 */
export function SiteHeader() {
  return (
    <header className={styles.header}>
      <Container className={styles.inner} width="wide">
        <Link className={styles.brand} href="/">
          <span className={styles.brandName}>Jérôme Marichez</span>
          <span className={styles.brandRole}>Ingénieur logiciel, Lille</span>
        </Link>

        <nav aria-label="Navigation principale" className={styles.nav}>
          <ul className={styles.list}>
            {siteNavigation.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href} label={link.label} />
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  )
}
