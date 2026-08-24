// PoleHero/index.tsx — jeromemarichez-fr
// Ouverture d'une page de pôle : où l'on est dans la chaîne, ce qu'il faut pour y être,
// et vers où l'on peut aller ensuite.

import Link from 'next/link'
import { Fragment } from 'react'
import { Breadcrumb } from '@/components/Breadcrumb'
import type { IPole } from '@/interfaces/IPole'
import { ROUTES } from '@/routes'
import { SITUATION_PLACE } from '../../contenu/poles-places'
import { jointureVers } from '../../services/find-jointure'
import styles from './pole-hero.module.css'

interface PoleHeroProps {
  pole: IPole
  /** Les pôles vers lesquels celui-ci ouvre. Vide pour un bout de chaîne. */
  suites: IPole[]
}

/**
 * L'ouverture dit la **place** du pôle, pas son rang.
 *
 * Elle affichait « Pôle 2 sur 3 ». À quatre pôles dont deux parallèles, ce libellé ne
 * pouvait plus être rendu vrai en changeant le chiffre : compter des pôles affirme qu'il
 * les faut tous, dans l'ordre. Le grand chiffre restant est le **temps** de la chaîne, et
 * les deux suites portent le même — c'est le seul endroit du site où deux pages affichent
 * délibérément le même numéro.
 *
 * L'arête entrante est rendue juste sous l'accroche, et c'est le bloc le plus utile de la
 * page : le prospect y lit ce qui est requis **et** que la matière qu'il possède déjà ne
 * se repaie pas. Sans cette seconde phrase, « il faut passer par la donnée » se lit comme
 * un préalable à acheter.
 */
export function PoleHero({ pole, suites }: PoleHeroProps) {
  const entrante = jointureVers(pole.id)

  return (
    <section aria-labelledby="pole-titre" className={styles.hero}>
      <Breadcrumb fil={[{ nom: pole.nom, route: pole.route }]} />

      <p className={styles.place}>
        <span aria-hidden="true" className={styles.numero}>
          {pole.temps}
        </span>
        <span className={styles.placeTexte}>{SITUATION_PLACE[pole.place]}</span>
      </p>

      <h1 className={styles.titre} id="pole-titre">
        {pole.nom}
      </h1>
      <p className={styles.promesse}>{pole.promesse}</p>
      <p className={styles.accroche}>{pole.accroche}</p>

      {entrante ? (
        <p className={styles.jointure}>
          <span className={styles.matiere}>{entrante.matiere}</span>{' '}
          <span className={styles.dejaEnPlace}>{entrante.siDejaEnPlace}</span>
        </p>
      ) : null}

      {suites.length > 0 ? (
        <p className={styles.suite}>
          {suites.length > 1
            ? 'Ce pôle ouvre deux suites, à prendre séparément ou ensemble : '
            : 'Ce pôle se termine dans le suivant : '}
          {suites.map((cible, index) => (
            <Fragment key={cible.id}>
              {index > 0 ? ' et ' : null}
              <Link className={styles.lienSuite} href={cible.route}>
                {cible.nom}
              </Link>
            </Fragment>
          ))}
          .
        </p>
      ) : (
        <p className={styles.suite}>
          Ce qui est décidé ici retourne dans le produit —{' '}
          <Link className={styles.lienSuite} href={ROUTES['ingenierie-web']}>
            l'ingénierie web
          </Link>{' '}
          — et c'est la même personne qui l'implémente.
        </p>
      )}
    </section>
  )
}
