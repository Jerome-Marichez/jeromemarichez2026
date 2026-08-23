// ChainDiagram/index.tsx — jeromemarichez-fr
// La chaîne en un écran : deux plaques en file, puis un embranchement vers deux autres.

import Link from 'next/link'
import type { IJointure } from '@/interfaces/IJointure'
import type { IPole } from '@/interfaces/IPole'
import { POLES_NAV } from '../../contenu/poles-nav'
import { LIBELLE_PLACE } from '../../contenu/poles-places'
import { jointuresDepuis, jointureVers } from '../../services/find-jointure'
import styles from './chain-diagram.module.css'

/**
 * Une plaque : la place, et le nom cliquable.
 *
 * Elle portait aussi la promesse du pôle. Elle ne la porte plus depuis l'issue #103 : les
 * quatre portes, un peu plus bas, disent cette même promesse **et** la preuve **et**
 * l'invite à entrer. Deux blocs qui répètent les mêmes lignes à un écran d'intervalle,
 * c'est exactement le doublon que cette issue est venue supprimer — et un schéma n'a pas
 * besoin de prose pour dire une topologie. Ce qui reste ici est ce que les portes ne
 * disent pas : les **arêtes**.
 */
function Plaque({ pole }: { pole: IPole }) {
  return (
    <article className={styles.plaque}>
      <p className={styles.place}>{LIBELLE_PLACE[pole.place]}</p>
      <h3 className={styles.nom}>
        <Link className={styles.lien} href={pole.route}>
          {pole.nom}
        </Link>
      </h3>
    </article>
  )
}

/** Une arête : la matière transmise, puis ce qui se passe si le client l'a déjà. */
function Arete({ jointure }: { jointure: IJointure }) {
  return (
    <p className={styles.jointure}>
      <span aria-hidden="true" className={styles.fleche} />
      <span>
        {jointure.matiere} <strong className={styles.dejaEnPlace}>{jointure.siDejaEnPlace}</strong>
      </span>
    </p>
  )
}

/**
 * Le schéma est en HTML et CSS purs — pas de canvas, pas de SVG porteur de texte.
 *
 * C'est délibéré : ce bloc sert à la fois de thèse, de sommaire et d'ancre de
 * navigation. Il doit donc être lu par un moteur de recherche, atteint au clavier et
 * annoncé par un lecteur d'écran. Une image ne rendrait aucun de ces trois services.
 *
 * **Deux listes, et c'est tout le modèle.** L'épine — ingénierie web puis data — est un
 * `<ol>` parce que l'ordre y porte le sens : la donnée vient du run. Les deux suites sont
 * un `<ul>` **imbriqué** dans le maillon de la donnée, parce qu'il n'existe aucun ordre
 * entre elles : les numéroter 3 et 4 dirait qu'on fait l'IA avant le SEA & UX, ce qui est
 * faux. Aplatir les quatre pôles dans un seul `<ol>` remettrait cette affirmation dans le
 * balisage, là où un lecteur d'écran la lirait à voix haute.
 *
 * La structure est déduite des **arêtes**, pas d'un test sur un identifiant : un pôle qui
 * a une seule sortie la rend en file, un pôle qui en a plusieurs ouvre une branche.
 */
export function ChainDiagram() {
  const epine = POLES_NAV.filter((pole) => pole.place !== 'suite')
  const suites = POLES_NAV.filter((pole) => pole.place === 'suite')

  return (
    <ol className={styles.chaine}>
      {epine.map((pole) => {
        const sortantes = jointuresDepuis(pole.id)
        const unique = sortantes.length === 1 ? sortantes[0] : undefined

        return (
          // `data-pole` porte la teinte du maillon : la plaque ET l'arête qui en part
          // en héritent. Les branches, imbriquées, posent la leur et l'emportent — la
          // cascade dit la structure sans qu'aucun module ne nomme une couleur.
          <li className={styles.maillon} data-pole={pole.id} key={pole.id}>
            <Plaque pole={pole} />

            {unique ? <Arete jointure={unique} /> : null}

            {sortantes.length > 1 ? (
              <>
                <p className={styles.embranchement}>
                  Deux suites s'ouvrent ici, et rien ne les ordonne : l'une, l'autre, ou les deux.
                </p>
                <ul className={styles.branches}>
                  {suites.map((suite) => {
                    const entrante = jointureVers(suite.id)

                    return (
                      <li className={styles.branche} data-pole={suite.id} key={suite.id}>
                        <Plaque pole={suite} />
                        {entrante ? <Arete jointure={entrante} /> : null}
                      </li>
                    )
                  })}
                </ul>
              </>
            ) : null}
          </li>
        )
      })}
    </ol>
  )
}
