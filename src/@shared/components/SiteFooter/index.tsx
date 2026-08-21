// SiteFooter/index.tsx — jeromemarichez-fr
// Pied de page : reprendre la chaîne, et donner un moyen direct de joindre.

import Link from 'next/link'
import { POLES_NAV } from '@/@vitrine/contenu/poles-nav'
import { ROUTES } from '../../routes'
import { SITE_IDENTITY } from '../../seo/site'
import styles from './site-footer.module.css'

/**
 * Le pied de page redit la promesse plutôt que de la résumer : c'est le dernier endroit
 * où un visiteur qui a tout lu décide d'écrire ou de partir.
 *
 * L'adresse de contact est un `mailto:` direct, sans formulaire intermédiaire — c'est
 * cohérent avec ce que le site vend, un interlocuteur joignable sans filtre.
 */
export function SiteFooter() {
  return (
    <footer className={styles.pied}>
      <div className={styles.contenu}>
        <div className={styles.appel}>
          <p className={styles.promesse}>
            Un seul interlocuteur, du cadrage au run, et il répond de tout. Décrivez votre
            situation, je vous dis ce que j'en ferais — et si ce n'est pas pour moi, je vous le dis
            aussi.
          </p>
          <a className={styles.contact} href={`mailto:${SITE_IDENTITY.email}`}>
            {SITE_IDENTITY.email}
          </a>
        </div>

        <nav aria-label="Pied de page" className={styles.navigation}>
          <p className={styles.titreNav}>Les trois pôles</p>
          <ul className={styles.liens}>
            {POLES_NAV.map((pole) => (
              <li key={pole.id}>
                <Link href={pole.route}>{pole.nom}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Le site" className={styles.navigation}>
          <p className={styles.titreNav}>Le site</p>
          <ul className={styles.liens}>
            <li>
              <Link href={ROUTES.accueil}>Accueil</Link>
            </li>
            <li>
              <Link href={ROUTES.blog}>Blog</Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Profils" className={styles.navigation}>
          <p className={styles.titreNav}>Ailleurs</p>
          <ul className={styles.liens}>
            <li>
              <a href={SITE_IDENTITY.github} rel="me noopener noreferrer" target="_blank">
                GitHub
              </a>
            </li>
            <li>
              <a href={SITE_IDENTITY.linkedin} rel="me noopener noreferrer" target="_blank">
                LinkedIn
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <p className={styles.mentions}>
        {SITE_IDENTITY.nom} — {SITE_IDENTITY.titre} à {SITE_IDENTITY.ville}. Site conçu, développé
        et exploité par moi-même, comme le reste.
      </p>
    </footer>
  )
}
