// axes.service.ts — jeromemarichez2026
// Logique métier : découper les axes d'une offre en groupes de volets.
// Aucune logique de rendu ici (docs/architecture.md — services/ vs hooks).
import type { IAxeOffre } from '../interfaces/axe-offre'
import type { IGroupeAxes } from '../interfaces/groupe-axes'

/**
 * Groupe les axes par volet, EN PRÉSERVANT L'ORDRE DU CONTENU.
 *
 * L'algorithme est un découpage en suites contiguës : on parcourt les axes une fois et
 * on ouvre un nouveau groupe dès que le volet change. Aucun tri, aucun rassemblement.
 *
 * C'est un choix de fond, pas une facilité d'implémentation. L'offre « Data & IA »
 * ouvre sur la fiabilité puis la qualification des données, AVANT ses deux volets, et
 * se referme sur MLOps, conformité et « sur devis », APRÈS eux. Un regroupement par
 * valeur — rassembler tout le socle d'un côté, tout l'agent de l'autre — produirait
 * trois blocs au lieu de quatre et déplacerait ces axes : l'offre s'ouvrirait ou se
 * fermerait sur autre chose que ce que le contenu a décidé. L'ordre du tableau `axes`
 * EST le message (content/offres/data-ia.ts), et il traverse le rendu intact.
 *
 * Une offre qui ne distingue aucun volet — Ingénierie Web, SEA — produit un groupe
 * unique de volet `null` : le gabarit n'a donc aucun cas particulier à connaître.
 */
export function grouperAxesParVolet(axes: readonly IAxeOffre[]): readonly IGroupeAxes[] {
  const groupes: IGroupeAxes[] = []
  let courant: { volet: string | null; axes: IAxeOffre[] } | null = null

  for (const axe of axes) {
    const volet = axe.volet ?? null

    if (courant === null || courant.volet !== volet) {
      courant = { volet, axes: [] }
      groupes.push({
        // Dérivée du premier axe du groupe : unique par construction, puisqu'une clé
        // d'axe est unique au sein de son offre (IAxeOffre.cle).
        cle: axe.cle,
        volet,
        axes: courant.axes,
      })
    }

    courant.axes.push(axe)
  }

  return groupes
}
