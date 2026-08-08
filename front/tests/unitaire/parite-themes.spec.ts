/**
 * Intention (écriture déléguée par Jérôme MARICHEZ le 2026-08-08 — issue #26) :
 * les deux thèmes déclarent EXACTEMENT le même jeu de jetons `--color-*`. C'est la
 * promesse écrite en tête de `tokens.css` (« Les deux blocs déclarent EXACTEMENT les
 * mêmes jetons de couleur »), et c'est elle qui rend la vérification de contraste
 * exhaustive : un jeton présent d'un seul côté sortirait du contrôle sans bruit.
 *
 * Ce test attrape la régression la plus probable du socle de design : ajouter une
 * couleur au thème clair et oublier le sombre — ou l'inverse.
 *
 * Cas limites couverts : le bloc `prefers-color-scheme: dark`, qui applique le thème
 * sombre par défaut, doit déclarer les mêmes jetons ET les mêmes valeurs que le bloc
 * `[data-theme="dark"]` — sinon la préférence système et le forçage explicite
 * afficheraient deux thèmes différents ; aucun jeton de couleur ne peut porter la même
 * valeur dans les deux thèmes sans que ce soit visible (contrôle de non-copie) ; toute
 * valeur de couleur est bien une couleur hexadécimale lisible par le calcul de contraste.
 *
 * Niveau : unitaire (lecture textuelle, aucun navigateur).
 * Jeu de données : le vrai `tokens.css` du dépôt.
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { THEME_SELECTORS } from '@/@shared/config/contrast-pairs'
import { parseHexColor } from '@/@shared/utils/color'
import { extractCustomProperties } from '@/@shared/utils/css-custom-properties'

const CHEMIN_TOKENS = join(__dirname, '..', '..', 'src', '@shared', 'styles', 'tokens.css')
const tokens = readFileSync(CHEMIN_TOKENS, 'utf8')

/** Bloc appliqué quand l'utilisateur n'a rien forcé et que son système est en sombre. */
const SELECTEUR_PREFERENCE_SYSTEME = ':root:not([data-theme="light"])'

function jetonsCouleur(selecteur: string): ReadonlyMap<string, string> {
  const proprietes = extractCustomProperties(tokens, selecteur)
  return new Map([...proprietes].filter(([nom]) => nom.startsWith('color-')))
}

const clair = jetonsCouleur(THEME_SELECTORS.clair)
const sombre = jetonsCouleur(THEME_SELECTORS.sombre)
const preferenceSysteme = jetonsCouleur(SELECTEUR_PREFERENCE_SYSTEME)

const nomsTries = (jetons: ReadonlyMap<string, string>): readonly string[] =>
  [...jetons.keys()].sort()

describe('parité des thèmes clair et sombre', () => {
  it('déclare des jetons de couleur dans les deux thèmes', () => {
    expect(clair.size).toBeGreaterThan(0)
    expect(sombre.size).toBeGreaterThan(0)
  })

  it('déclare le même jeu de jetons --color-* dans les deux thèmes', () => {
    expect(nomsTries(sombre)).toEqual(nomsTries(clair))
  })

  it('ne laisse aucun jeton de couleur sans contrepartie dans l’autre thème', () => {
    for (const nom of clair.keys()) {
      expect(sombre.has(nom)).toBe(true)
    }
    for (const nom of sombre.keys()) {
      expect(clair.has(nom)).toBe(true)
    }
  })

  it('donne à chaque jeton une couleur hexadécimale exploitable par le calcul de contraste', () => {
    for (const [nom, valeur] of [...clair, ...sombre]) {
      expect(() => parseHexColor(valeur)).not.toThrow()
      expect(nom.startsWith('color-')).toBe(true)
    }
  })

  it('recalcule réellement les valeurs pour le thème sombre', () => {
    // Deux thèmes qui partageraient toutes leurs valeurs ne seraient qu'un seul thème.
    const identiques = [...clair].filter(([nom, valeur]) => sombre.get(nom) === valeur)

    expect(identiques).toEqual([])
  })
})

describe('préférence système (prefers-color-scheme: dark)', () => {
  it('déclare les mêmes jetons que le thème sombre forcé', () => {
    expect(nomsTries(preferenceSysteme)).toEqual(nomsTries(sombre))
  })

  it('déclare les mêmes valeurs que le thème sombre forcé', () => {
    for (const [nom, valeur] of sombre) {
      expect(preferenceSysteme.get(nom)).toBe(valeur)
    }
  })
})
