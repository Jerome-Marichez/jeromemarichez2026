// ProofWall/index.tsx — jeromemarichez-fr
// Le mur de preuves : ce qui est vérifiable.

import Link from 'next/link'
import { toRealisationRoute } from '@/@shared/routes'
import type { IProof } from '@/interfaces/IProof'
import styles from './proof-wall.module.css'

interface ProofWallProps {
  preuves: IProof[]
}

/**
 * Aucun compteur animé, aucune incrémentation au défilement.
 *
 * Un chiffre qui s'anime demande qu'on le regarde ; un chiffre posé demande qu'on le
 * vérifie. Le second registre est le seul tenable ici — et il évite au passage une
 * animation qui n'aurait rien apporté à la lecture.
 *
 * Trois tuiles sur six portent un lien vers la réalisation qui les déplie, et le libellé
 * du lien est le **titre de la fiche** plutôt qu'un « en savoir plus ». Six liens de même
 * intitulé sur une page sont un défaut d'accessibilité connu : sortis de leur contexte,
 * ils ne disent plus où ils mènent.
 */
export function ProofWall({ preuves }: ProofWallProps) {
  return (
    <ul className={styles.mur}>
      {preuves.map((preuve) => (
        <li className={styles.tuile} key={preuve.libelle}>
          <p className={styles.chiffre}>{preuve.chiffre}</p>
          <p className={styles.libelle}>{preuve.libelle}</p>
          <p className={styles.contexte}>{preuve.contexte}</p>
          {preuve.fiche ? (
            <p className={styles.renvoi}>
              <Link href={toRealisationRoute(preuve.fiche.slug)}>{preuve.fiche.titre}</Link>
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  )
}
