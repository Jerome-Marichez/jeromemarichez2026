/**
 * Intention (écriture déléguée par Jérôme MARICHEZ le 2026-08-08 — issue #26) :
 * l'utilitaire qui extrait les jetons d'une feuille de style attrape LE BON bloc de
 * règles. Sans ce test, celui des contrastes pourrait passer à vide : une extraction
 * qui renvoie une table vide ne fait échouer aucune comparaison qu'on n'a pas écrite.
 *
 * Comportement attendu : `extractRuleBlock` rend le contenu du bloc `{ … }` qui suit
 * immédiatement le sélecteur, accolades équilibrées ; `extractCustomProperties` rend
 * les déclarations `--nom: valeur` de ce bloc, commentaires retirés, nom sans tirets.
 *
 * Cas limites couverts : `:root` ne doit JAMAIS attraper `:root[data-theme="dark"]`,
 * y compris quand le bloc sombre est écrit en premier ; un sélecteur absent lève une
 * erreur au lieu de rendre une table vide ; un bloc non refermé lève ; les blocs
 * imbriqués (media query) sont équilibrés ; les commentaires ne produisent pas de faux
 * jetons ; une déclaration sans point-virgule final est lue quand même ; les valeurs à
 * virgules (`font-family`, `clamp`) ne sont pas tronquées.
 *
 * Niveau : unitaire (fonctions pures).
 * Jeu de données : des feuilles de style minimales écrites dans le test pour les cas
 * limites, et le vrai `tokens.css` du dépôt pour le cas nominal.
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { THEME_SELECTORS } from '@/@shared/config/contrast-pairs'
import { extractCustomProperties, extractRuleBlock } from '@/@shared/utils/css-custom-properties'

const CHEMIN_TOKENS = join(__dirname, '..', '..', 'src', '@shared', 'styles', 'tokens.css')
const tokens = readFileSync(CHEMIN_TOKENS, 'utf8')

/** Le bloc sombre est écrit AVANT le clair : le piège que le sélecteur doit éviter. */
const CSS_ORDRE_INVERSE = `
:root[data-theme="dark"] {
  --color-text: #ffffff;
}

:root {
  --color-text: #000000;
}
`

describe('extractRuleBlock', () => {
  it('rend le contenu du bloc qui suit le sélecteur', () => {
    const bloc = extractRuleBlock(':root { --a: 1; }', ':root')

    expect(bloc.trim()).toBe('--a: 1;')
  })

  it('distingue « :root » de « :root[data-theme="dark"] » même écrit après lui', () => {
    const clair = extractRuleBlock(CSS_ORDRE_INVERSE, ':root')
    const sombre = extractRuleBlock(CSS_ORDRE_INVERSE, ':root[data-theme="dark"]')

    expect(clair).toContain('#000000')
    expect(clair).not.toContain('#ffffff')
    expect(sombre).toContain('#ffffff')
    expect(sombre).not.toContain('#000000')
  })

  it('tolère les espaces entre le sélecteur et son accolade', () => {
    expect(extractRuleBlock(':root\n  {\n  --a: 1;\n}', ':root')).toContain('--a: 1')
  })

  it('équilibre les accolades des blocs imbriqués', () => {
    const media = extractRuleBlock(
      '@media (prefers-color-scheme: dark) {\n  :root { --a: 1; }\n}\n:root { --a: 2; }',
      '@media (prefers-color-scheme: dark)',
    )

    expect(media).toContain('--a: 1')
    expect(media).not.toContain('--a: 2')
  })

  it('lève sur un sélecteur absent plutôt que de rendre un bloc vide', () => {
    expect(() => extractRuleBlock(':root { --a: 1; }', '.inexistant')).toThrow(
      /Bloc CSS introuvable/,
    )
  })

  it('lève quand le sélecteur n’est jamais suivi d’une accolade', () => {
    expect(() => extractRuleBlock('/* :root sans bloc */', ':root')).toThrow(/introuvable/)
  })

  it('lève sur un bloc dont l’accolade fermante manque', () => {
    expect(() => extractRuleBlock(':root { --a: 1;', ':root')).toThrow(/accolade fermante/)
  })
})

describe('extractCustomProperties', () => {
  it('rend les propriétés du bloc, nom sans les deux tirets', () => {
    const proprietes = extractCustomProperties(
      ':root { --color-text: #16181c; --space-sm: 1rem; }',
      ':root',
    )

    expect(proprietes.get('color-text')).toBe('#16181c')
    expect(proprietes.get('space-sm')).toBe('1rem')
    expect(proprietes.has('--color-text')).toBe(false)
  })

  it('ignore les commentaires du bloc', () => {
    const proprietes = extractCustomProperties(
      ':root { /* --color-piege: #ff0000; */ --color-text: #000000; }',
      ':root',
    )

    expect(proprietes.has('color-piege')).toBe(false)
    expect(proprietes.get('color-text')).toBe('#000000')
    expect(proprietes.size).toBe(1)
  })

  it('lit la dernière déclaration même sans point-virgule final', () => {
    expect(extractCustomProperties(':root { --a: 1rem }', ':root').get('a')).toBe('1rem')
  })

  it('ne tronque pas une valeur qui contient des virgules ou des parenthèses', () => {
    const proprietes = extractCustomProperties(
      ':root { --font-size-base: clamp(1rem, 0.975rem + 0.125vw, 1.125rem); }',
      ':root',
    )

    expect(proprietes.get('font-size-base')).toBe('clamp(1rem, 0.975rem + 0.125vw, 1.125rem)')
  })

  it('ne mélange pas les deux thèmes du vrai tokens.css', () => {
    const clair = extractCustomProperties(tokens, THEME_SELECTORS.clair)
    const sombre = extractCustomProperties(tokens, THEME_SELECTORS.sombre)

    expect(clair.get('color-background')).toBe('#fcfcfa')
    expect(sombre.get('color-background')).toBe('#0e1013')
    expect(clair.get('color-background')).not.toBe(sombre.get('color-background'))
  })

  it('lit un nombre substantiel de jetons dans le vrai tokens.css', () => {
    const clair = extractCustomProperties(tokens, THEME_SELECTORS.clair)

    // Le thème clair porte les couleurs ET l'échelle typographique, d'espacement, etc.
    expect(clair.size).toBeGreaterThan(30)
  })
})
