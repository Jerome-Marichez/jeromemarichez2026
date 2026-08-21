// SiteHeader/index.tsx — jeromemarichez-fr
// En-tête : identité, et la chaîne des trois pôles rendue navigable.

import Link from 'next/link'
import { POLES_NAV } from '@/@vitrine/contenu/poles-nav'
import { ROUTES } from '../../routes'
import { SITE_IDENTITY } from '../../seo/site'
import styles from './site-header.module.css'

/**
 * En-tête collant.
 *
 * Il n'utilise **pas** liquidGL : la bibliothèque ignore délibérément les éléments en
 * `position: fixed` ou `sticky`, un panneau de verre y resterait figé sur la capture
 * initiale et dériverait au défilement. Son fond est donc un `backdrop-filter` CSS
 * classique — moins spectaculaire, mais juste à toutes les positions de défilement.
 *
 * La numérotation des pôles n'est pas décorative : elle dit que l'offre est une chaîne
 * ordonnée, pas un menu où l'on pioche.
 */
export function SiteHeader() {
  return (
    <header className={styles.entete}>
      <div className={styles.contenu}>
        <Link className={styles.identite} href={ROUTES.accueil}>
          <span className={styles.nom}>{SITE_IDENTITY.nom}</span>
          <span className={styles.role}>
            {SITE_IDENTITY.titre} · {SITE_IDENTITY.ville}
          </span>
        </Link>

        <nav aria-label="Les trois pôles" className={styles.navigation}>
          <ol className={styles.liste}>
            {POLES_NAV.map((pole) => (
              <li key={pole.id}>
                <Link className={styles.lien} href={pole.route}>
                  <span aria-hidden="true" className={styles.rang}>
                    {pole.rang}
                  </span>
                  {pole.nom}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </header>
  )
}
