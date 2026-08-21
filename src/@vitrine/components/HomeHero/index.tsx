// HomeHero/index.tsx — jeromemarichez-fr
// Le seuil : la promesse, et la chaîne annoncée d'entrée.

import Link from 'next/link'
import { ChainCanvas } from '@/@shared/components/ChainCanvas'
import { MotionToggle } from '@/@shared/components/MotionToggle'
import { SITE_IDENTITY } from '@/@shared/seo/site'
import { HERO_ACCUEIL } from '../../contenu/accueil'
import styles from './home-hero.module.css'

/**
 * Le `h1` est le seul de la page et il est rendu statiquement : c'est lui le LCP, pas
 * la scène WebGL, qui n'arrive qu'après et ne bloque rien.
 *
 * Les trois jetons de preuve sont posés dès le seuil parce que la promesse
 * d'interlocuteur unique est invérifiable telle quelle : sans chiffre à côté, elle se
 * lit comme un slogan d'agence, ce que ce site refuse d'être.
 */
export function HomeHero() {
  return (
    <section aria-labelledby="seuil-titre" className={styles.seuil}>
      <div className={styles.discours}>
        <p className={styles.situation}>
          {SITE_IDENTITY.titre} à {SITE_IDENTITY.ville} · 9 ans
        </p>

        <h1 className={styles.titre} id="seuil-titre">
          {HERO_ACCUEIL.titre}
        </h1>
        <p className={styles.chapo}>{HERO_ACCUEIL.chapo}</p>
        <p className={styles.methode}>{HERO_ACCUEIL.methode}</p>

        <p className={styles.actions}>
          <a className={styles.actionPrincipale} href={`mailto:${SITE_IDENTITY.email}`}>
            Décrire mon besoin
          </a>
          <Link className={styles.actionSecondaire} href="#chaine">
            Voir la chaîne
          </Link>
        </p>

        <ul className={styles.jetons}>
          {HERO_ACCUEIL.jetons.map((jeton) => (
            <li className={styles.jeton} key={jeton.libelle}>
              <span className={styles.chiffre}>{jeton.chiffre}</span>
              <span className={styles.libelle}>{jeton.libelle}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.volume}>
        <ChainCanvas description="Des plaques de verre alignées dans le même axe : une seule chaîne, tenue par une seule personne." />
        {/* Le contrôle est posé au pied de la scène, là où le mouvement se voit.
            WCAG 2.2.2 demande un mécanisme de mise en pause : la préférence système
            n'en est pas un, elle ne se change pas depuis la page. */}
        <p className={styles.controle}>
          <MotionToggle />
        </p>
      </div>
    </section>
  )
}
