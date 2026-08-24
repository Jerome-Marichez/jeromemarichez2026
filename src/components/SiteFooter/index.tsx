// SiteFooter/index.tsx — jeromemarichez-fr
// Pied de page : reprendre la chaîne, et donner un moyen direct de joindre.

import Link from 'next/link'
import { POLES_NAV } from '@/contenu/poles-nav'
import { ROUTES } from '../../routes'
import { SITE_IDENTITY } from '../../seo/site'
import { MotionToggle } from '../MotionToggle'
import styles from './site-footer.module.css'

/**
 * Le pied de page redit la promesse plutôt que de la résumer : c'est le dernier endroit
 * où un visiteur qui a tout lu décide d'écrire ou de partir.
 *
 * L'adresse de contact est un `mailto:` direct, sans formulaire intermédiaire — c'est
 * cohérent avec ce que le site vend, un interlocuteur joignable sans filtre.
 *
 * **Le `MotionToggle` est ici parce que le pied de page est rendu par la mise en page
 * racine**, donc sur TOUTE page — accueil, les quatre pôles, le blog. Il n'existait
 * jusqu'ici que dans `HomeHero` : une page de pôle révélait ses sections au défilement
 * sans offrir nulle part le moyen d'arrêter ça, ce qui laissait WCAG 2.2.2 à moitié
 * tenu. Le placer au niveau de la mise en page ferme le trou une fois, plutôt que page
 * par page — et une page ajoutée demain l'a sans y penser.
 *
 * L'accueil en porte donc deux, et c'est voulu : les deux lisent le même magasin et
 * affichent le même état, mais celui du seuil est au pied de la scène, là où le
 * mouvement se voit. Demander à quelqu'un que l'animation gêne de descendre au bas de la
 * page pour la couper serait tenir la règle contre son objet.
 */
export function SiteFooter() {
  return (
    <footer className={styles.pied}>
      <div className={styles.contenu}>
        <div className={styles.appel}>
          <p className={styles.promesse}>
            Un seul interlocuteur, du cadrage au run, et il répond de tout. Décrivez votre
            situation, je vous dis ce que j'en ferais.
          </p>
          <a className={styles.contact} href={`mailto:${SITE_IDENTITY.email}`}>
            {SITE_IDENTITY.email}
          </a>
        </div>

        <nav aria-label="Pied de page" className={styles.navigation}>
          <p className={styles.titreNav}>Les quatre pôles</p>
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
              <Link href={ROUTES.realisations}>Réalisations</Link>
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

      <div className={styles.bas}>
        <p className={styles.mentions}>
          {SITE_IDENTITY.nom}. {SITE_IDENTITY.titre} à {SITE_IDENTITY.ville}. Site conçu, développé
          et exploité par moi-même.
        </p>
        <MotionToggle />
      </div>
    </footer>
  )
}
