import { Card } from '@/@shared/components/Card'
import { Section } from '@/@shared/components/Section'
import type { ICertification } from '@/interfaces/certification'
import styles from './certifications.module.css'

interface ICertificationsProps {
  titre: string
  certifications: readonly ICertification[]
  /** Amorce du libellé du lien, complétée par l'intitulé de la certification. */
  libelleJustificatif: string
}

/**
 * Les certifications obtenues.
 *
 * ----------------------------------------------------------------------------------
 * UNE CERTIFICATION SANS JUSTIFICATIF N'AFFICHE AUCUN LIEN.
 *
 * C'est la règle de véracité bloquante du CLAUDE.md, et elle n'est pas tenue ici par la
 * vigilance : `Justificatif` est une union discriminée dont la variante `a-fournir` ne
 * porte AUCUNE propriété `url`. Lire `justificatif.url` sans avoir d'abord narrowé sur
 * `statut === 'disponible'` ne compile pas. Le `if` ci-dessous n'est donc pas une
 * précaution que quelqu'un pourrait retirer par distraction : c'est ce qui rend l'accès
 * légal, et le supprimer casse le build.
 *
 * RIEN N'EST AFFICHÉ À LA PLACE DU LIEN ABSENT. Ni « justificatif à fournir », ni
 * pastille, ni note de bas de page. Deux raisons : l'état du justificatif est une
 * information interne au projet, pas un fait sur la certification ; et les cinq
 * certifications étant aujourd'hui dans ce cas, la mention se répéterait cinq fois sur
 * une page destinée à convaincre — elle raconterait un dossier incomplet là où le fait
 * publié, lui, est simplement la certification obtenue.
 *
 * Le jour où une URL sera fournie par Jérôme MARICHEZ, le lien apparaîtra sans qu'une
 * ligne d'ici change.
 * ----------------------------------------------------------------------------------
 *
 * Le libellé du lien est COMPOSÉ (amorce + intitulé) : cinq liens voisins portant tous
 * « Voir le justificatif » seraient indiscernables une fois restitués hors contexte par
 * un lecteur d'écran (WCAG 2.4.4).
 */
export function Certifications({
  titre,
  certifications,
  libelleJustificatif,
}: ICertificationsProps) {
  return (
    <Section id="certifications" title={titre} width="wide">
      <ul className={styles.grille}>
        {certifications.map((certification) => (
          <li className={styles.item} key={certification.cle}>
            <Card eyebrow={certification.organisme} headingLevel={3} title={certification.intitule}>
              {/* `annee` vaut `null` quand l'année n'est pas établie — Google Ads est
                  daté 2021 sur deux CV et 2022 sur un troisième. Une année approchée ne
                  s'écrit pas : on n'affiche alors rien. */}
              {certification.annee === null ? null : (
                <p className={styles.annee}>{certification.annee}</p>
              )}
              {certification.justificatif.statut === 'disponible' ? (
                <a className={styles.justificatif} href={certification.justificatif.url}>
                  {`${libelleJustificatif} ${certification.intitule}`}
                </a>
              ) : null}
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  )
}
