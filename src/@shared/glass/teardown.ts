// teardown.ts — jeromemarichez-fr
// Démontage de liquidGL.
//
// La bibliothèque n'expose aucune API de destruction : elle installe un moteur unique
// sur `window.__liquidGLRenderer__`, une boucle `requestAnimationFrame` permanente, un
// canvas plein écran et une div d'ombre par lentille, tous accrochés à `document.body`.
// Sans ce démontage, une navigation client laisserait la boucle tourner sur des
// lentilles disparues — une fuite qui se paie en INP sur toutes les pages suivantes.

/** Forme interne réellement observée dans `liquid-gl@2.0.1`. */
interface InternalRenderer {
  _rafId?: number | null
  canvas?: HTMLCanvasElement
  lenses?: Array<{ _shadowEl?: HTMLElement | null }>
}

interface LiquidGlWindow extends Window {
  __liquidGLRenderer__?: InternalRenderer
  __liquidGLNoWebGL__?: boolean
}

const DYNAMIC_STYLES_ID = 'liquid-gl-dynamic-styles'

/** Arrête la boucle de rendu et retire du DOM tout ce que liquidGL y a ajouté. */
export function teardownLiquidGlass(): void {
  if (typeof window === 'undefined') return

  const scope = window as LiquidGlWindow
  const renderer = scope.__liquidGLRenderer__
  if (!renderer) return

  if (typeof renderer._rafId === 'number') {
    cancelAnimationFrame(renderer._rafId)
    renderer._rafId = null
  }

  for (const lens of renderer.lenses ?? []) {
    lens._shadowEl?.remove()
    lens._shadowEl = null
  }

  renderer.canvas?.remove()
  document.getElementById(DYNAMIC_STYLES_ID)?.remove()

  scope.__liquidGLRenderer__ = undefined
}
