// PoleHero/index.tsx — jeromemarichez-fr
// Ouverture d'une page de pôle : où l'on est dans la chaîne, et vers où l'on va.

import Link from 'next/link'
import { ROUTES } from '@/@shared/routes'
import type { IPole } from '@/interfaces/IPole'
import styles from './pole-hero.module.css'

interface PoleHeroProps {
  pole: IPole
  suivant?: IPole
}

/**
 * Le rang du pôle est affiché en grand, et le maillon suivant est annoncé dès
 * l'ouverture. Un visiteur qui arrive ici depuis un moteur de recherche doit comprendre
 * en une seconde qu'il lit un maillon, pas une plaquette isolée.
 */
export function PoleHero({ pole, suivant }: PoleHeroProps) {
  return (
    <section aria-labelledby="pole-titre" className={styles.hero}>
      <nav aria-label="Fil d'Ariane" className={styles.ariane}>
        <Link href={ROUTES.accueil}>Accueil</Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">{pole.nom}</span>
      </nav>

      <p className={styles.rang}>
        <span aria-hidden="true" className={styles.numero}>
          {pole.rang}
        </span>
        <span className={styles.rangTexte}>Pôle {pole.rang} sur 3</span>
      </p>

      <h1 className={styles.titre} id="pole-titre">
        {pole.nom}
      </h1>
      <p className={styles.promesse}>{pole.promesse}</p>
      <p className={styles.accroche}>{pole.accroche}</p>

      {suivant ? (
        <p className={styles.suite}>
          Ce pôle se termine dans le suivant :{' '}
          <Link className={styles.lienSuite} href={suivant.route}>
            {suivant.nom}
          </Link>
        </p>
      ) : (
        <p className={styles.suite}>
          Dernier maillon. Ce qui est décidé ici retourne dans le produit —{' '}
          <Link className={styles.lienSuite} href={ROUTES['ingenierie-web']}>
            l'ingénierie web
          </Link>{' '}
          — et c'est la même personne qui l'implémente.
        </p>
      )}
    </section>
  )
}
