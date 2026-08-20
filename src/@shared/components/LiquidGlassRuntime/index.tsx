'use client'

// LiquidGlassRuntime/index.tsx — jeromemarichez-fr
// Amorce liquidGL une fois par page, puis le démonte.

import { useLiquidGlass } from '../../hooks/use-liquid-glass'
import { useMotionPaused } from '../../hooks/use-motion-paused'

/**
 * Composant sans rendu : il n'existe que pour porter le cycle de vie du moteur de
 * verre. Le placer une seule fois par page, après les surfaces qu'il doit éclairer —
 * liquidGL lit le DOM au montage, un placement en tête ne trouverait aucune lentille.
 *
 * Sous `prefers-reduced-motion` — ou dès que le visiteur a figé l'animation depuis la
 * page — le moteur n'est pas amorcé du tout : la boucle de rendu permanente de liquidGL
 * est une animation, même quand aucune lentille ne bouge. S'il tournait déjà, il est
 * démonté proprement par le nettoyage du hook.
 */
export function LiquidGlassRuntime() {
  const fige = useMotionPaused()
  useLiquidGlass(!fige)

  return null
}
