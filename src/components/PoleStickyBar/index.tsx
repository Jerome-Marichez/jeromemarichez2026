// PoleStickyBar/index.tsx — jeromemarichez-fr
// L'en-tête de pôle collant : où l'on est, et la seule action de la page.

import { SITE_IDENTITY } from '@/@shared/seo/site'
import type { IPole } from '@/interfaces/IPole'
import styles from './pole-sticky-bar.module.css'

interface PoleStickyBarProps {
  pole: IPole
}

/**
 * Une page de pôle se lit sur plusieurs écrans : passé le seuil, plus rien ne dit
 * lequel des pôles on est en train de lire, et l'action de contact est restée en bas.
 * Cette barre répond aux deux, sans rien ajouter au discours.
 *
 * Elle prend `--accent`, la teinte du pôle courant, posée par `data-pole` sur la page
 * (`poles.css`). Elle ne nomme aucune couleur : c'est la cascade qui décide, et la barre
 * serait juste sur un cinquième pôle sans qu'une ligne d'ici ne bouge.
 *
 * Son fond suit exactement la recette de `SiteHeader`, aux mêmes jetons de bande :
 * opaque partout, translucide et floutée au-delà de 1024px. Deux bandes qui s'empilent
 * l'une sous l'autre doivent se ressembler — sinon l'empilement se lit comme un défaut
 * plutôt que comme une intention.
 */
export function PoleStickyBar({ pole }: PoleStickyBarProps) {
  return (
    <div className={styles.barre}>
      <div className={styles.contenu}>
        <p className={styles.repere}>
          {/* Le TEMPS de la chaîne, pas un rang : les deux suites portent le même.
              Voir « 3 » sur l'IA et « 3 » sur le SEA & UX dit qu'elles sont parallèles,
              là où « 3 » puis « 4 » aurait dit qu'il faut les deux, dans cet ordre. */}
          <span aria-hidden="true" className={styles.temps}>
            {pole.temps}
          </span>
          <span className={styles.nom}>{pole.nom}</span>
        </p>

        <a className={styles.action} href={`mailto:${SITE_IDENTITY.email}`}>
          Décrire mon besoin
        </a>
      </div>
    </div>
  )
}
