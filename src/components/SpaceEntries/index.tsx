// SpaceEntries/index.tsx — jeromemarichez-fr
// Les deux espaces éditoriaux en entrées, depuis l'accueil.
//
// L'accueil vendait ses pôles et taisait ses espaces : on n'arrivait à `/realisations/`
// et à `/blog/` que par le menu. Point 3 de l'issue #84.
//
// Le registre est délibérément PLUS SOBRE que celui des pôles : un espace ne se vend pas,
// il déplie. Lui donner la même présence visuelle qu'un pôle aurait laissé croire à une
// cinquième et une sixième offre — ce que `IEspaceEditorial` prend soin de distinguer
// dans le type, et que le rendu ne doit pas défaire.
//
// Le volume affiché est DÉRIVÉ des listes sources (voir `espaces.ts`), jamais écrit à la
// main : l'accueil ne peut donc pas annoncer un nombre de fiches que l'espace ne tient
// pas. C'est la même règle que pour les chiffres de `preuves.ts`.

import { ESPACES_EDITORIAUX } from '../../contenu/espaces'
import styles from './space-entries.module.css'

export function SpaceEntries() {
  return (
    <ul className={styles.liste}>
      {ESPACES_EDITORIAUX.map((espace) => (
        <li key={espace.id}>
          <a className={styles.entree} href={espace.route}>
            <span className={styles.titre}>{espace.titre}</span>
            <span className={styles.volume}>{espace.volume}</span>
            <span className={styles.accroche}>{espace.accroche}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}
