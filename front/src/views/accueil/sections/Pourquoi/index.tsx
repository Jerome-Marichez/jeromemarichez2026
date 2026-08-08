import { Section } from '@/@shared/components/Section'
import type { IAccueil } from '@/interfaces/accueil'
import type { IPreuveResolue } from '@/interfaces/preuve-resolue'
import styles from './pourquoi.module.css'

interface IPourquoiProps {
  contenu: IAccueil['pourquoi']
  preuves: readonly IPreuveResolue[]
}

/**
 * D'où vient la promesse d'interlocuteur unique : un constat fait en encadrant des
 * prestataires d'acquisition, énoncé à la première personne.
 *
 * Le constat est rendu en deux colonnes parce que c'est sa forme même : deux jeux de
 * chiffres qui ne se rencontrent pas. Les colonnes ne s'opposent pas visuellement par
 * une couleur (ni « bien » ni « mal ») — elles sont strictement symétriques, et seul
 * le texte de conclusion dit ce qui les sépare : un périmètre d'accès à la donnée.
 *
 * Les chiffres du parcours ne sont pas écrits ici : ils viennent des offres, résolus
 * par `services/preuves.service.ts`. La page ne peut donc pas avancer un montant que
 * la page d'offre correspondante ne dit pas.
 */
export function Pourquoi({ contenu, preuves }: IPourquoiProps) {
  return (
    <Section id="pourquoi" lead={contenu.lead} title={contenu.titre} tone="muted" width="default">
      <div className={styles.panneau}>
        <div className={styles.colonnes}>
          {contenu.colonnes.map((colonne) => (
            <div className={styles.colonne} key={colonne.cle}>
              <h3 className={styles.colonneTitre}>{colonne.titre}</h3>
              <ul className={styles.elements}>
                {colonne.elements.map((element) => (
                  <li className={styles.element} key={element}>
                    {element}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className={styles.conclusion}>{contenu.conclusion}</p>
        <ul className={styles.preuves}>
          {preuves.map((preuve) => (
            <li className={styles.preuve} key={preuve.cle}>
              {preuve.enonce}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
