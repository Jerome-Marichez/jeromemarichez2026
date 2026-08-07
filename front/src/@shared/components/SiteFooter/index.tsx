import Link from 'next/link'
import { siteNavigation } from '../../config/navigation'
import { ActionLink } from '../ActionLink'
import { Container } from '../Container'
import styles from './site-footer.module.css'

/**
 * Pied de page appliqué à toutes les routes.
 *
 * Aucune date n'y est calculée : un « © 2026 » se périme, et lire l'horloge
 * rendrait le composant impur pour un gain nul sur un site prérendu.
 */
export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Container width="wide">
        <div className={styles.grid}>
          <div className={styles.identity}>
            <p className={styles.name}>Jérôme Marichez</p>
            <p className={styles.tagline}>
              Ingénieur logiciel à Lille. Un seul interlocuteur pour vos projets digitaux, sans
              sous-traitance.
            </p>
            <ActionLink href="/contact" variant="secondary">
              Me contacter
            </ActionLink>
          </div>

          <nav aria-label="Navigation de pied de page">
            <ul className={styles.list}>
              {siteNavigation.map((link) => (
                <li key={link.href}>
                  <Link className={styles.link} href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className={styles.legal}>© Jérôme Marichez</p>
      </Container>
    </footer>
  )
}
