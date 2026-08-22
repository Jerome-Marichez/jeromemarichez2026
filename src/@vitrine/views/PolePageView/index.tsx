// PolePageView/index.tsx — jeromemarichez-fr
// Gabarit commun aux quatre pages de pôle.

import { LiquidGlassRuntime } from '@/@shared/components/LiquidGlassRuntime'
import { Reveal } from '@/@shared/components/Reveal'
import type { IEditorialPage } from '@/interfaces/IEditorialPage'
import type { IPole } from '@/interfaces/IPole'
import { CertificationList } from '../../components/CertificationList'
import { EditorialSection } from '../../components/EditorialSection'
import { PoleHero } from '../../components/PoleHero'
import { PoleStickyBar } from '../../components/PoleStickyBar'
import { selectCertificationsByPole } from '../../contenu/select-certifications'
import { MAX_GLASS_PAGE_POLE, selectGlassSectionIds } from '../../services/glass-policy'
import styles from './pole-page-view.module.css'

interface PolePageViewProps {
  pole: IPole
  page: IEditorialPage
  /** Les pôles vers lesquels celui-ci ouvre. Vide pour un bout de chaîne. */
  suites: IPole[]
}

/**
 * Les quatre pôles partagent un gabarit strictement identique.
 *
 * C'est un choix éditorial, pas une économie de code : quatre pages construites pareil
 * disent qu'il s'agit d'un seul métier. Quatre mises en page différentes auraient dit
 * quatre prestataires.
 *
 * Le bloc de certifications ne s'affiche que si le pôle en a **une à lui**
 * (`selectCertificationsByPole` s'en charge). Un titre « Ce qui est certifié sur ce
 * pôle » suivi de la seule certification transverse d'anglais dirait le contraire de ce
 * qu'il annonce : mieux vaut ne rien afficher que d'annoncer une preuve absente.
 */
export function PolePageView({ pole, page, suites }: PolePageViewProps) {
  const verre = selectGlassSectionIds(page.sections, MAX_GLASS_PAGE_POLE)
  const certifications = selectCertificationsByPole(pole.id)

  return (
    // `data-pole` est le porteur de la teinte : le bloc CSS qui mappe `--accent` sur
    // l'identifiant du pôle s'y accroche, et tout ce qui est dessous en hérite. Aucun
    // composant ne connaît la couleur d'un pôle, il ne connaît que `--accent`.
    <div className={styles.page} data-pole={pole.id}>
      <PoleHero pole={pole} suites={suites} />
      <PoleStickyBar pole={pole} />

      <div className={styles.corps}>
        {page.sections.map((section) => (
          <EditorialSection glass={verre.has(section.id)} key={section.id} section={section} />
        ))}

        {certifications.length > 0 ? (
          <Reveal
            ariaLabelledBy="certifications-titre"
            as="section"
            className={styles.certifications}
          >
            <h2 id="certifications-titre">Ce qui est certifié sur ce pôle</h2>
            <p className={styles.chapo}>
              Une certification ne remplace pas une réalisation : elle dit seulement que la méthode
              a été évaluée par un tiers.
            </p>
            <CertificationList certifications={certifications} />
          </Reveal>
        ) : null}
      </div>

      <LiquidGlassRuntime />
    </div>
  )
}
