/**
 * Intention (écriture déléguée par Jérôme MARICHEZ le 2026-08-08 — issue #26) :
 * le calcul de contraste lui-même est juste. Il est le second endroit où le test des
 * jetons pourrait passer à vide : un `contrastRatio` qui renverrait toujours une grande
 * valeur validerait n'importe quelle palette. On le confronte donc aux bornes connues de
 * WCAG 2.1 — noir sur blanc vaut 21:1, une couleur sur elle-même vaut 1:1 — et à la
 * définition de la luminance relative (§ dfn-relative-luminance).
 *
 * Cas limites couverts : notation courte `#abc` équivalente à `#aabbcc` ; casse et
 * espaces indifférents ; l'ordre des arguments ne change pas le ratio ; toute entrée qui
 * n'est pas une couleur hexadécimale valide lève une erreur explicite au lieu de
 * produire un ratio plausible (chaîne vide, dièse manquant, longueur invalide, chiffre
 * non hexadécimal, notation `rgb()`).
 *
 * Niveau : unitaire (fonctions pures, aucun jeu de données externe).
 */
import { contrastRatio, parseHexColor, relativeLuminance } from '@/@shared/utils/color'

const NOIR = '#000000'
const BLANC = '#ffffff'
/** Contraste maximal possible en sRGB, valeur de référence de WCAG 2.1. */
const CONTRASTE_MAXIMAL = 21

describe('parseHexColor', () => {
  it('convertit une notation longue en canaux 0-255', () => {
    expect(parseHexColor('#16181c')).toEqual([22, 24, 28])
  })

  it('développe la notation courte à trois chiffres', () => {
    expect(parseHexColor('#abc')).toEqual(parseHexColor('#aabbcc'))
  })

  it('accepte les majuscules et les espaces autour de la valeur', () => {
    expect(parseHexColor('  #FCFCFA  ')).toEqual(parseHexColor('#fcfcfa'))
  })

  it.each([
    ['chaîne vide', ''],
    ['dièse manquant', 'ffffff'],
    ['longueur invalide', '#12345'],
    ['chiffre non hexadécimal', '#xyzxyz'],
    ['notation fonctionnelle', 'rgb(255, 255, 255)'],
    ['jeton CSS non résolu', 'var(--color-text)'],
  ])('lève sur une valeur invalide — %s', (_cas, valeur) => {
    expect(() => parseHexColor(valeur)).toThrow(/Couleur hexadécimale invalide/)
  })
})

describe('relativeLuminance', () => {
  it('vaut 0 pour le noir et 1 pour le blanc', () => {
    expect(relativeLuminance(NOIR)).toBeCloseTo(0, 10)
    expect(relativeLuminance(BLANC)).toBeCloseTo(1, 10)
  })

  it('pondère le vert plus fortement que le rouge, et le rouge plus que le bleu', () => {
    const rouge = relativeLuminance('#ff0000')
    const vert = relativeLuminance('#00ff00')
    const bleu = relativeLuminance('#0000ff')

    expect(vert).toBeGreaterThan(rouge)
    expect(rouge).toBeGreaterThan(bleu)
  })

  it('reste dans l’intervalle 0-1 pour une couleur quelconque', () => {
    const luminance = relativeLuminance('#0b4f79')

    expect(luminance).toBeGreaterThan(0)
    expect(luminance).toBeLessThan(1)
  })
})

describe('contrastRatio', () => {
  it('vaut 21:1 entre le noir et le blanc', () => {
    expect(contrastRatio(NOIR, BLANC)).toBeCloseTo(CONTRASTE_MAXIMAL, 5)
  })

  it('vaut 1:1 pour une couleur comparée à elle-même', () => {
    expect(contrastRatio('#0b4f79', '#0b4f79')).toBeCloseTo(1, 10)
  })

  it('ne dépend pas de l’ordre des arguments', () => {
    expect(contrastRatio('#54585f', '#fcfcfa')).toBeCloseTo(contrastRatio('#fcfcfa', '#54585f'), 10)
  })

  it('ne dépasse jamais le contraste maximal', () => {
    expect(contrastRatio(NOIR, BLANC)).toBeLessThanOrEqual(CONTRASTE_MAXIMAL)
  })

  it('propage l’erreur d’une couleur invalide au lieu de rendre un ratio', () => {
    expect(() => contrastRatio('#zzzzzz', BLANC)).toThrow(/Couleur hexadécimale invalide/)
  })
})
