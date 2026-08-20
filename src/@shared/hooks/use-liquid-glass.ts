'use client'

// use-liquid-glass.ts — jeromemarichez-fr
// Amorce et démonte liquidGL (NaughtyDuk, MIT) sur les surfaces de verre du site.
//
// liquidGL est un singleton global (`window.liquidGL`, `window.__liquidGLRenderer__`)
// chargé en différé : il n'entre jamais dans le bundle initial et ne peut donc pas
// peser sur le LCP. Ce hook encapsule les trois garde-fous que la bibliothèque impose
// et que le site doit tenir pour rester à Lighthouse ≥ 95 partout.

import { useEffect } from 'react'
import { GLASS_TARGET, LIQUID_GL_OPTIONS, MIN_GLASS_VIEWPORT } from '../glass/settings'
import { supportsLiquidGlass } from '../glass/support'
import { teardownLiquidGlass } from '../glass/teardown'

/**
 * Active le verre réfractant sur les éléments `GLASS_TARGET` de la page montée.
 *
 * Ne fait rien — et laisse le repli CSS `backdrop-filter` en place — dans trois cas :
 * mouvement réduit demandé, viewport trop étroit (Safari devient instable dès qu'une
 * lentille dépasse la moitié du viewport, ce qui est systématique sur mobile), ou
 * absence de WebGL.
 *
 * @param enabled passe à `false` pour laisser le repli CSS, par exemple sous
 *   `prefers-reduced-motion`.
 */
export function useLiquidGlass(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return
    if (!supportsLiquidGlass(MIN_GLASS_VIEWPORT)) return

    let cancelled = false

    const boot = async () => {
      const { default: liquidGL } = await import('liquid-gl')
      if (cancelled) return
      if (!document.querySelector(GLASS_TARGET)) return
      liquidGL({ target: GLASS_TARGET, ...LIQUID_GL_OPTIONS })
    }

    void boot()

    return () => {
      cancelled = true
      teardownLiquidGlass()
    }
  }, [enabled])
}
