// SiteHeader/index.tsx — jeromemarichez-fr
// En-tête : identité, et les quatre pôles rendus navigables.

import Link from 'next/link'
import { POLES_NAV } from '@/contenu/poles-nav'
import { ROUTES } from '../../routes'
import { SITE_IDENTITY } from '../../seo/site'
import styles from './site-header.module.css'

/**
 * En-tête collant.
 *
 * Son fond est du verre, mais réglé en **bande** et non en panneau : il floute et sature
 * beaucoup moins. Ce qui passe sous lui est le texte de la page en défilement, et non le
 * décor — au réglage d'un panneau, ce texte en ressortirait en traînée colorée. Les deux
 * jeux de jetons sont dans `verre.css`.
 *
 * Chaque entrée porte `data-pole` : le chiffre du temps prend la teinte de son pôle,
 * et l'en-tête devient la légende de la palette du site. Aucune couleur n'est nommée
 * ici — le lien ne connaît que `--accent`.
 *
 * Le chiffre porté par chaque lien n'est pas un rang mais le **temps** de la chaîne, et
 * l'IA comme le SEA & UX portent le même : ce sont les deux suites de la donnée, et rien
 * ne les ordonne. C'est aussi pour cela que la liste est un `<ul>` et non un `<ol>` — un
 * `<ol>` affirmerait dans le balisage un quatrième rang qui n'existe pas, et un lecteur
 * d'écran le lirait à voix haute.
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

        <div className={styles.navigations}>
          <nav aria-label="Les quatre pôles" className={styles.navigation}>
            <ul className={styles.liste}>
              {POLES_NAV.map((pole) => (
                <li data-pole={pole.id} key={pole.id}>
                  <Link className={styles.lien} href={pole.route}>
                    <span aria-hidden="true" className={styles.temps}>
                      {pole.temps}
                    </span>
                    {pole.nom}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bloc distinct, et pas deux éléments de plus dans la liste des pôles : ni les
              réalisations ni le blog ne sont des offres, et les ajouter à la chaîne les
              ferait lire comme telles. Les réalisations passent devant le blog — elles
              montrent ce qui a été fait, ce qui est la question que se pose un visiteur
              qui vient de lire les quatre pôles. */}
          <nav aria-label="Réalisations et blog" className={styles.navigationSecondaire}>
            <ul className={styles.liste}>
              <li>
                <Link className={styles.lien} href={ROUTES.realisations}>
                  Réalisations
                </Link>
              </li>
              <li>
                <Link className={styles.lien} href={ROUTES.blog}>
                  Blog
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
