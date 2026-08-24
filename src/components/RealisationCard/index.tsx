// RealisationCard/index.tsx — jeromemarichez-fr
// Une réalisation vue depuis une liste : son chiffre s'il y en a un, son titre, son chapô.

import Link from 'next/link'
import type { IRealisation } from '@/interfaces/IRealisation'
import { toRealisationRoute } from '@/routes'
import { PoleTagList } from '../PoleTagList'
import styles from './realisation-card.module.css'

interface RealisationCardProps {
  realisation: IRealisation
}

/**
 * Le lien porte le titre, et rien d'autre — même raison que sur une carte d'article :
 * rendre la carte entière cliquable demanderait un lien vide superposé ou du JavaScript,
 * et un lecteur d'écran annoncerait un lien sans intitulé.
 *
 * Le titre est un `h3` sans réglage possible : la carte n'apparaît que sous un cadre
 * d'emploi (liste) ou sous « Sur les mêmes pôles » (fiche), deux titres de niveau 2. Un
 * niveau paramétrable serait une option que personne n'utilise, et qu'un appelant finirait
 * par régler de travers.
 *
 * Le chiffre passe **avant** le titre quand il existe. Ce n'est pas un effet de mise en
 * page : sur une liste où trois fiches sur treize en portent un, c'est le seul endroit où
 * la différence entre les deux gabarits se voit d'un coup d'œil. Une carte sans chiffre
 * n'a pas de trou à la place — elle commence simplement par son titre.
 */
export function RealisationCard({ realisation }: RealisationCardProps) {
  return (
    <article className={styles.carte}>
      {realisation.chiffre ? (
        <p className={styles.chiffre}>
          <span className={styles.nombre}>{realisation.chiffre.chiffre}</span>
          <span className={styles.mesure}>{realisation.chiffre.libelle}</span>
        </p>
      ) : null}

      <h3 className={styles.titre}>
        <Link className={styles.lien} href={toRealisationRoute(realisation.slug)}>
          {realisation.titre}
        </Link>
      </h3>

      <p className={styles.chapo}>{realisation.chapo}</p>

      <PoleTagList
        legende={`Pôles mobilisés pour ${realisation.titre}`}
        poles={realisation.poles}
      />
    </article>
  )
}
