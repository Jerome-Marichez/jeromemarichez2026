/**
 * Intention (écriture déléguée par Jérôme MARICHEZ le 2026-08-08 — issue #26) :
 * chaque combinaison texte/fond et bordure/fond déclarée dans
 * `@shared/config/contrast-pairs.ts` tient son seuil WCAG dans LES DEUX thèmes,
 * avec les valeurs réellement écrites dans `@shared/styles/tokens.css`.
 * C'est le critère d'acceptation « contraste AA » rendu exécutable : 4.5:1 pour du
 * texte courant (WCAG 1.4.3), 3:1 pour un composant d'interface (1.4.11).
 *
 * Cas limites couverts : un jeton cité par une exigence mais absent du thème fait
 * échouer le test bruyamment plutôt que de le laisser passer à vide ; l'inventaire
 * des exigences ne peut pas se vider sans que le test le signale ; le seuil déclaré
 * ne peut pas descendre sous les minima WCAG.
 *
 * Niveau : unitaire (fonctions pures, aucun rendu).
 * Jeu de données : le vrai `tokens.css` du dépôt et le vrai inventaire d'exigences —
 * aucune couleur n'est recopiée ici, sans quoi le test mesurerait sa propre copie.
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { CONTRAST_REQUIREMENTS, THEME_SELECTORS } from '@/@shared/config/contrast-pairs'
import { contrastRatio } from '@/@shared/utils/color'
import { extractCustomProperties } from '@/@shared/utils/css-custom-properties'

/** Chemin résolu depuis le fichier de test : insensible au répertoire de travail. */
const CHEMIN_TOKENS = join(__dirname, '..', '..', 'src', '@shared', 'styles', 'tokens.css')
const tokens = readFileSync(CHEMIN_TOKENS, 'utf8')

/** Minima WCAG 2.1 — aucune exigence du dépôt ne peut descendre en dessous. */
const MINIMUM_COMPOSANT = 3
const MINIMUM_TEXTE = 4.5

function jetonsDuTheme(selecteur: string): ReadonlyMap<string, string> {
  return extractCustomProperties(tokens, selecteur)
}

/** Lecture stricte : un jeton absent est une erreur, jamais un test qui s'évapore. */
function valeurJeton(jetons: ReadonlyMap<string, string>, nom: string): string {
  const valeur = jetons.get(nom)
  if (valeur === undefined) {
    throw new Error(
      `Jeton « --${nom} » absent du thème : tokens.css et contrast-pairs.ts divergent.`,
    )
  }
  return valeur
}

describe('inventaire des exigences de contraste', () => {
  it('déclare des combinaisons à vérifier', () => {
    expect(CONTRAST_REQUIREMENTS.length).toBeGreaterThan(0)
  })

  it('couvre les deux thèmes du site', () => {
    expect(Object.keys(THEME_SELECTORS).sort()).toEqual(['clair', 'sombre'])
  })

  it('ne déclare aucun seuil inférieur aux minima WCAG', () => {
    for (const exigence of CONTRAST_REQUIREMENTS) {
      expect(exigence.minimumRatio).toBeGreaterThanOrEqual(MINIMUM_COMPOSANT)
    }
  })

  it('décrit où chaque combinaison apparaît réellement', () => {
    for (const exigence of CONTRAST_REQUIREMENTS) {
      expect(exigence.usage.length).toBeGreaterThan(0)
    }
  })

  it('exige 4.5:1 dès qu’un jeton de texte est en avant-plan', () => {
    const exigencesDeTexte = CONTRAST_REQUIREMENTS.filter((exigence) =>
      exigence.foreground.startsWith('color-text'),
    )
    expect(exigencesDeTexte.length).toBeGreaterThan(0)
    for (const exigence of exigencesDeTexte) {
      expect(exigence.minimumRatio).toBe(MINIMUM_TEXTE)
    }
  })
})

describe.each(Object.entries(THEME_SELECTORS))(
  'contraste des jetons — thème %s',
  (_theme, selecteur) => {
    const jetons = jetonsDuTheme(selecteur)

    it('déclare des jetons de couleur', () => {
      const couleurs = [...jetons.keys()].filter((nom) => nom.startsWith('color-'))
      expect(couleurs.length).toBeGreaterThan(0)
    })

    it.each(
      CONTRAST_REQUIREMENTS.map(
        (exigence) =>
          [
            `${exigence.foreground} sur ${exigence.background} — ${exigence.usage}`,
            exigence,
          ] as const,
      ),
    )('%s', (_libelle, exigence) => {
      const avantPlan = valeurJeton(jetons, exigence.foreground)
      const arrierePlan = valeurJeton(jetons, exigence.background)

      expect(contrastRatio(avantPlan, arrierePlan)).toBeGreaterThanOrEqual(exigence.minimumRatio)
    })
  },
)
