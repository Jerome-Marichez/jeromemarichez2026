// liquid-gl.d.ts — jeromemarichez-fr
// Déclarations pour `liquid-gl` (NaughtyDuk, MIT) — le paquet est publié sans types.
// Surface volontairement réduite à ce que le site utilise réellement.

declare module 'liquid-gl' {
  /** Options de rendu d'une lentille. Voir `@shared/glass/settings`. */
  export interface LiquidGlOptions {
    /** Sélecteur des éléments transformés en verre. */
    target?: string
    /** Élément capturé pour la réfraction. `'body'` par défaut. */
    snapshot?: string
    /** Qualité de la capture, 0.1 à 3. Coût GPU en carré de ce facteur. */
    resolution?: number
    /** Force du décalage réfractif, 0 à 1. */
    refraction?: number
    /** Aberration chromatique, 0 à 1. */
    aberration?: number
    /** Profondeur du biseau, 0 à 1. */
    bevelDepth?: number
    /** Largeur de la zone biseautée, 0 à 1. */
    bevelWidth?: number
    /** Rayon de flou, en pixels. */
    frost?: number
    /** Ombre portée. */
    shadow?: boolean
    /** Reflet spéculaire. */
    specular?: boolean
    /** Apparition de la lentille. */
    reveal?: 'none' | 'fade'
    /** Inclinaison au survol. */
    tilt?: boolean
    /** Amplitude de l'inclinaison, 0 à 25 degrés. */
    tiltFactor?: number
    /** Durée d'amortissement de l'inclinaison, en millisecondes. */
    tiltEase?: number
    /** Grossissement, 0.001 à 3. */
    magnify?: number
    on?: { init?: () => void }
  }

  /** Une lentille attachée à un élément du DOM. */
  export interface LiquidGlLens {
    el: HTMLElement
    options: LiquidGlOptions
    setShadow(enabled: boolean): void
    setTilt(enabled: boolean): void
  }

  export interface LiquidGl {
    (options?: LiquidGlOptions): LiquidGlLens | LiquidGlLens[] | undefined
    /** Déclare des éléments animés que la capture doit rafraîchir. */
    registerDynamic(elements: string | Element | Element[]): void
    /** Branche le rendu sur un défilement lissé (Lenis, Locomotive). */
    syncWith(config?: Record<string, unknown>): unknown
  }

  const liquidGL: LiquidGl
  export default liquidGL
}
