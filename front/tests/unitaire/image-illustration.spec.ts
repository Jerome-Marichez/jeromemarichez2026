/**
 * Intention (écriture déléguée par Jérôme MARICHEZ le 2026-08-08 — issue #23) :
 * les attributs d'une image responsive sont DÉRIVÉS d'une seule déclaration, et le
 * schéma refuse une déclaration qui produirait des dimensions fausses.
 *
 * Pourquoi ce test compte : le défaut visé est silencieux. Une image dont les
 * `width`/`height` ne sont pas ceux du fichier servi s'affiche parfaitement — elle fait
 * seulement sauter la page au chargement, ce qu'aucune relecture de code ne montre et
 * qu'aucun rendu statique ne signale.
 *
 * Comportement attendu :
 * 1. `cheminImage` compose `<base>-<largeur>.<format>` ;
 * 2. `jeuDeSources` rend toutes les déclinaisons avec un descripteur de LARGEUR (`w`) ;
 * 3. `formatDeRepli` rend le DERNIER format déclaré, `formatsModernes` tous les autres :
 *    le repli n'est pas proposé deux fois ;
 * 4. `declinaisonDeRepli` rend la PLUS LARGE — c'est elle qui alimente `src`, `width` et
 *    `height`, donc le rapport réservé avant chargement ;
 * 5. `typeMime` rend `image/jpeg` pour `jpg` et non `image/jpg`, type qu'aucun navigateur
 *    ne reconnaît et qui ferait retomber l'image sur le repli sans que rien ne le dise ;
 * 6. le schéma REFUSE des déclinaisons dans le désordre ou en double, puisque le rendu
 *    lit la dernière comme étant la plus large ;
 * 7. le schéma refuse un texte alternatif trop court pour être une description.
 *
 * Cas limites couverts : un seul format déclaré (aucune `<source>`, tout sur l'`img`) ;
 * déclinaisons en ordre décroissant ; deux déclinaisons de même largeur ; un `alt` réduit
 * à un intitulé creux.
 *
 * Niveau : unitaire (fonctions pures et schéma Zod réels).
 * Jeu de données : l'illustration réelle de `content/parcours-page.ts` pour le cas
 * nominal, et des déclarations construites dans le test pour les cas limites.
 */
import { parcoursPage } from '@/content'
import type { IImageIllustration } from '@/interfaces/image-illustration'
import { imageIllustrationSchema } from '@/schemas/image-illustration.schema'
import {
  cheminImage,
  declinaisonDeRepli,
  formatDeRepli,
  formatsModernes,
  jeuDeSources,
  typeMime,
} from '@/utils/image'

const illustration = parcoursPage.entete.illustration

/** Déclaration valide servant de base aux cas limites : on n'en modifie qu'un champ. */
const base = {
  cle: 'exemple',
  alt: 'Description suffisamment longue pour décrire réellement ce que montre l’image de test.',
  base: '/images/exemple',
  formats: ['webp', 'jpg'],
  declinaisons: [
    { largeur: 800, hauteur: 533 },
    { largeur: 1200, hauteur: 800 },
  ],
  tailles: '100vw',
  placeholder: true,
  licence: 'Licence de test',
  provenance: 'Provenance de test',
}

describe('composition des chemins', () => {
  it('compose « base-largeur.format »', () => {
    expect(cheminImage(illustration, 'webp', 800)).toBe('/images/tasse-800.webp')
    expect(cheminImage(illustration, 'jpg', 1200)).toBe('/images/tasse-1200.jpg')
  })

  it('rend toutes les déclinaisons avec un descripteur de largeur', () => {
    const jeu = jeuDeSources(illustration, 'webp')

    expect(jeu).toBe('/images/tasse-800.webp 800w, /images/tasse-1200.webp 1200w')
    for (const declinaison of illustration.declinaisons) {
      expect(jeu).toContain(`${declinaison.largeur}w`)
    }
    expect(jeu).not.toContain('x,')
  })
})

describe('choix du repli', () => {
  it('prend le DERNIER format comme repli, et les autres comme sources modernes', () => {
    expect(formatDeRepli(illustration)).toBe('jpg')
    expect(formatsModernes(illustration)).toEqual(['webp'])
  })

  it('ne propose aucune source moderne quand un seul format est déclaré', () => {
    const unique = imageIllustrationSchema.parse({
      ...base,
      formats: ['jpg'],
    }) as IImageIllustration

    expect(formatsModernes(unique)).toEqual([])
    expect(formatDeRepli(unique)).toBe('jpg')
  })

  it('prend la déclinaison la PLUS LARGE, celle que pointe src', () => {
    const repli = declinaisonDeRepli(illustration)
    const plusLarge = Math.max(...illustration.declinaisons.map((d) => d.largeur))

    expect(repli.largeur).toBe(plusLarge)
    expect(repli.hauteur).toBe(
      illustration.declinaisons.find((d) => d.largeur === plusLarge)?.hauteur,
    )
  })

  it('donne à jpg le type image/jpeg, seul type que les navigateurs reconnaissent', () => {
    expect(typeMime('jpg')).toBe('image/jpeg')
    expect(typeMime('webp')).toBe('image/webp')
  })
})

describe('le schéma refuse ce qui produirait des dimensions fausses', () => {
  it('refuse des déclinaisons en ordre décroissant', () => {
    expect(() =>
      imageIllustrationSchema.parse({
        ...base,
        declinaisons: [
          { largeur: 1200, hauteur: 800 },
          { largeur: 800, hauteur: 533 },
        ],
      }),
    ).toThrow(/plus étroite à la plus large/)
  })

  it('refuse deux déclinaisons de même largeur', () => {
    expect(() =>
      imageIllustrationSchema.parse({
        ...base,
        declinaisons: [
          { largeur: 800, hauteur: 533 },
          { largeur: 800, hauteur: 533 },
        ],
      }),
    ).toThrow(/plus étroite à la plus large/)
  })

  it('refuse un texte alternatif réduit à un intitulé creux', () => {
    expect(() => imageIllustrationSchema.parse({ ...base, alt: 'Photo' })).toThrow()
  })

  it('accepte l’illustration réellement publiée', () => {
    expect(() => imageIllustrationSchema.parse(illustration)).not.toThrow()
  })
})

describe('cohérence de la déclaration réelle avec les fichiers du dépôt', () => {
  it('déclare des déclinaisons de même rapport hauteur/largeur, à 1 % près', () => {
    const rapports = illustration.declinaisons.map((d) => d.largeur / d.hauteur)

    for (const rapport of rapports) {
      expect(Math.abs(rapport - (rapports[0] as number))).toBeLessThan(0.01)
    }
  })

  it('déclare une largeur d’affichage, sinon la plus grande déclinaison part toujours', () => {
    expect(illustration.tailles.length).toBeGreaterThan(0)
    expect(illustration.tailles).toContain('vw')
  })
})
