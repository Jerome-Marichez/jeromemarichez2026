import { ActionLink } from '@/@shared/components/ActionLink'
import { Section } from '@/@shared/components/Section'
import { cheminOffre } from '@/@shared/config/routes'
import type { IAccueil } from '@/interfaces/accueil'
import styles from './points-entree.module.css'

interface IPointsEntreeProps {
  contenu: IAccueil['pointsEntree']
}

/**
 * Les deux points d'entrée dans la chaîne : partir de zéro, ou brancher sur une
 * application déjà en service. C'est la section qui permet au visiteur de SE SITUER.
 *
 * Le chemin de chaque entrée est une liste ordonnée : l'ordre porte l'information, et
 * le trait de liaison entre deux étapes n'est qu'un décor — il est dessiné par un
 * pseudo-élément au contenu vide, donc jamais restitué par un lecteur d'écran.
 * L'information n'est ainsi portée ni par la seule couleur, ni par le seul dessin
 * (WCAG 1.4.1).
 *
 * Les libellés de liens sont complets et distincts, jamais composés d'une amorce
 * répétée : restitués hors contexte, quatre liens « En savoir plus » seraient
 * indiscernables (WCAG 2.4.4).
 */
export function PointsEntree({ contenu }: IPointsEntreeProps) {
  return (
    <Section id="points-entree" lead={contenu.lead} title={contenu.titre} width="wide">
      <ul className={styles.grille}>
        {contenu.points.map((point) => (
          <li className={styles.item} key={point.cle}>
            <article className={styles.carte}>
              <h3 className={styles.situation}>{point.situation}</h3>
              <p className={styles.description}>{point.description}</p>
              <div className={styles.chemin}>
                <span className={styles.etiquette}>{contenu.libelleChemin}</span>
                <ol className={styles.etapes}>
                  {point.etapes.map((etape) => (
                    <li className={styles.etape} key={etape}>
                      <span className={styles.etapeLibelle}>{etape}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className={styles.actions}>
                {point.liens.map((lien) => (
                  <ActionLink href={cheminOffre(lien.offre)} key={lien.offre} variant="secondary">
                    {lien.libelle}
                  </ActionLink>
                ))}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  )
}
