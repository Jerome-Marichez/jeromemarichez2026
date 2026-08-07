/**
 * Calcul de contraste WCAG 2.1 (§1.4.3 texte, §1.4.11 composants d'interface).
 * Fonctions pures, sans état : elles servent à vérifier que les jetons de
 * couleur du socle tiennent le niveau AA, plutôt que de l'affirmer.
 * Référence : https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */

const HEX_PATTERN = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i

/** Convertit une couleur hexadécimale (`#abc` ou `#aabbcc`) en canaux 0-255. */
export function parseHexColor(hex: string): readonly [number, number, number] {
  const value = hex.trim()
  if (!HEX_PATTERN.test(value)) {
    throw new Error(`Couleur hexadécimale invalide : « ${hex} »`)
  }

  const digits = value.slice(1)
  const expanded =
    digits.length === 3
      ? digits
          .split('')
          .map((digit) => digit + digit)
          .join('')
      : digits

  return [
    Number.parseInt(expanded.slice(0, 2), 16),
    Number.parseInt(expanded.slice(2, 4), 16),
    Number.parseInt(expanded.slice(4, 6), 16),
  ]
}

/** Linéarisation d'un canal sRGB 0-255 vers l'espace linéaire 0-1. */
function linearizeChannel(channel: number): number {
  const ratio = channel / 255
  return ratio <= 0.03928 ? ratio / 12.92 : ((ratio + 0.055) / 1.055) ** 2.4
}

/** Luminance relative d'une couleur hexadécimale, entre 0 (noir) et 1 (blanc). */
export function relativeLuminance(hex: string): number {
  const [red, green, blue] = parseHexColor(hex)
  return (
    0.2126 * linearizeChannel(red) +
    0.7152 * linearizeChannel(green) +
    0.0722 * linearizeChannel(blue)
  )
}

/**
 * Ratio de contraste entre deux couleurs, de 1:1 (identiques) à 21:1
 * (noir sur blanc). L'ordre des arguments n'a pas d'importance.
 */
export function contrastRatio(foreground: string, background: string): number {
  const first = relativeLuminance(foreground)
  const second = relativeLuminance(background)
  const lighter = Math.max(first, second)
  const darker = Math.min(first, second)
  return (lighter + 0.05) / (darker + 0.05)
}
