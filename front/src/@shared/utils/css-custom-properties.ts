/**
 * Lecture des propriétés personnalisées CSS d'un bloc de règles, à partir du
 * texte d'une feuille de style. Fonctions pures : elles permettent de vérifier
 * les jetons de `@shared/styles/tokens.css` sans navigateur ni exécution du CSS.
 *
 * Volontairement limité à ce dont le socle a besoin — un bloc, ses déclarations
 * `--nom: valeur` — plutôt que d'embarquer un analyseur CSS complet.
 */

const DECLARATION_PATTERN = /(--[a-z0-9-]+)\s*:\s*([^;}]+)/gi

/**
 * Extrait le contenu textuel du bloc `{ … }` qui suit immédiatement `selector`.
 * Le sélecteur doit être suivi (aux espaces près) d'une accolade ouvrante, ce qui
 * évite de confondre `:root` avec `:root[data-theme='dark']`.
 */
export function extractRuleBlock(css: string, selector: string): string {
  let searchFrom = 0

  while (searchFrom < css.length) {
    const start = css.indexOf(selector, searchFrom)
    if (start === -1) break

    let cursor = start + selector.length
    while (cursor < css.length && /\s/.test(css.charAt(cursor))) cursor += 1

    if (css.charAt(cursor) === '{') {
      return readBalancedBlock(css, cursor)
    }
    searchFrom = start + selector.length
  }

  throw new Error(`Bloc CSS introuvable pour le sélecteur « ${selector} »`)
}

/** Lit le contenu d'un bloc en équilibrant les accolades, à partir du `{` ouvrant. */
function readBalancedBlock(css: string, openingBrace: number): string {
  let depth = 0

  for (let cursor = openingBrace; cursor < css.length; cursor += 1) {
    const character = css.charAt(cursor)
    if (character === '{') depth += 1
    if (character === '}') {
      depth -= 1
      if (depth === 0) return css.slice(openingBrace + 1, cursor)
    }
  }

  throw new Error('Bloc CSS non terminé : accolade fermante manquante')
}

/**
 * Renvoie les propriétés personnalisées déclarées par `selector`, sous la forme
 * `nom` (sans les deux tirets) vers valeur nettoyée. Les commentaires du bloc
 * sont ignorés.
 */
export function extractCustomProperties(
  css: string,
  selector: string,
): ReadonlyMap<string, string> {
  const block = extractRuleBlock(css, selector).replace(/\/\*[\s\S]*?\*\//g, '')
  const properties = new Map<string, string>()

  for (const [, name, value] of block.matchAll(DECLARATION_PATTERN)) {
    if (name === undefined || value === undefined) continue
    properties.set(name.slice(2), value.trim())
  }

  return properties
}
