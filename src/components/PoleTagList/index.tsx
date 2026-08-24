// PoleTagList/index.tsx — jeromemarichez-fr
// Les pôles mobilisés par une réalisation, rendus navigables.

import Link from 'next/link'
import type { PoleId } from '@/interfaces/types'
import { listPoles } from '@/services/find-pole'
import styles from './pole-tag-list.module.css'

interface PoleTagListProps {
  poles: readonly PoleId[]
  /** Intitulé de la liste. Il change selon qu'on est sur une carte ou sur une fiche. */
  legende: string
}

/**
 * Une liste **non ordonnée**, et c'est un choix de balisage autant que de sens : les
 * pôles d'une réalisation ne se succèdent pas, ils ont été mobilisés ensemble. Un `<ol>`
 * ferait lire un rang à voix haute là où il n'y en a aucun — même raison que dans
 * l'en-tête du site.
 *
 * Chaque étiquette porte `data-pole` : `poles.css` mappe alors `--accent` sur la teinte du
 * pôle, et l'étiquette prend sa couleur sans qu'aucune couleur ne soit nommée ici. La
 * couleur n'est jamais seule à porter l'information — le nom du pôle est écrit (WCAG
 * 1.4.1).
 *
 * L'ordre d'affichage vient de `listPoles`, donc de la chaîne, jamais de l'ordre dans
 * lequel une fiche a déclaré ses pôles.
 */
export function PoleTagList({ poles, legende }: PoleTagListProps) {
  const rattaches = listPoles(poles)

  if (rattaches.length === 0) return null

  return (
    <nav aria-label={legende} className={styles.zone}>
      <ul className={styles.liste}>
        {rattaches.map((pole) => (
          <li className={styles.item} data-pole={pole.id} key={pole.id}>
            <Link className={styles.etiquette} href={pole.route}>
              {pole.nom}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
