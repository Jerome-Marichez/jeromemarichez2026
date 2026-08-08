/**
 * Intention (écriture déléguée par Jérôme MARICHEZ le 2026-08-08 — issue #29) :
 * UN SEUL test de `preuves.service`, vérifié contre le code réel. Plusieurs lots en
 * avaient proposé un ; l'accueil a été entièrement réécrit depuis, et un
 * `chaine.service` coexiste désormais avec ce service — les propositions antérieures
 * décrivaient un état du dépôt qui n'existe plus. Celui-ci fait foi.
 *
 * Ce que le service garantit : une preuve affichée sur la page d'accueil est TOUJOURS
 * celle écrite dans la page d'offre correspondante. Le texte n'est jamais recopié, donc
 * jamais susceptible de diverger, et jamais saisi hors de `content/offres/`, où se fait
 * la relecture de véracité. La page d'accueil ne peut donc pas affirmer quelque chose
 * que la page d'offre ne dit pas.
 *
 * Le service ÉCHOUE bruyamment sur trois erreurs d'édition, et c'est là son intérêt :
 * offre inconnue, axe inconnu, et — le cas qui compte — axe dont la preuve vaut `null`.
 * Une affirmation sans preuve ne s'affiche pas : plutôt qu'un blanc dans la page, le
 * build casse. Les résolutions ayant lieu au rendu serveur, l'erreur survient à la
 * compilation, jamais devant un visiteur.
 *
 * Cas limites couverts : `preuve: null` (légitime dans une offre, fatal en référence) ;
 * offre inexistante ; axe inexistant dans une offre existante ; liste vide ; ordre de
 * déclaration ; unicité des clés de rendu ; non-mutation du catalogue.
 *
 * Niveau : unitaire (service pur).
 * Jeu de données : les références réelles de l'accueil et le catalogue réel des offres.
 */
import { accueil, offres } from '@/content'
import type { IReferencePreuve } from '@/interfaces/reference-preuve'
import type { CleOffre } from '@/interfaces/types'
import { resoudrePreuves } from '@/services/preuves.service'

const referencesPubliees = accueil.preuves.references
const resolues = resoudrePreuves(referencesPubliees, offres)

/** L'axe réel désigné par une référence, cherché relationnellement. */
const axeDe = (reference: IReferencePreuve) =>
  offres
    .find((offre) => offre.cle === reference.offre)
    ?.axes.find((axe) => axe.cle === reference.axe)

/** Une référence vers un axe dont la preuve vaut `null` — cas légitime dans une offre. */
const referenceSansPreuve = (): IReferencePreuve => {
  for (const offre of offres) {
    const axe = offre.axes.find((candidate) => candidate.preuve === null)
    if (axe !== undefined) {
      return { offre: offre.cle, axe: axe.cle }
    }
  }

  throw new Error('Le catalogue ne contient plus aucun axe sans preuve : le cas limite a disparu.')
}

describe('resoudrePreuves — le texte vient de l’offre, jamais de l’accueil', () => {
  it('résout toutes les références publiées par l’accueil', () => {
    expect(resolues).toHaveLength(referencesPubliees.length)
  })

  it('reprend l’énoncé exactement tel qu’il est écrit dans l’offre', () => {
    for (const [index, reference] of referencesPubliees.entries()) {
      expect(resolues[index]?.enonce).toBe(axeDe(reference)?.preuve)
    }
  })

  it('reprend le titre de l’axe, non sa clé', () => {
    for (const [index, reference] of referencesPubliees.entries()) {
      expect(resolues[index]?.titre).toBe(axeDe(reference)?.titre)
      expect(resolues[index]?.titre).not.toBe(reference.axe)
    }
  })

  it('étiquette chaque preuve par le TITRE de son offre, jamais par sa clé', () => {
    const clesPubliees = offres.map((offre) => offre.cle)

    for (const [index, reference] of referencesPubliees.entries()) {
      const offre = offres.find((candidate) => candidate.cle === reference.offre)

      expect(resolues[index]?.offre).toBe(offre?.titre)
      expect(clesPubliees).not.toContain(resolues[index]?.offre)
    }
  })

  it('suit le catalogue quand un énoncé y change', () => {
    const catalogueRetouche = offres.map((offre) => ({
      ...offre,
      axes: offre.axes.map((axe) => ({
        ...axe,
        preuve: axe.preuve === null ? null : `Énoncé venu du catalogue — ${axe.cle}`,
      })),
    }))
    const retouchees = resoudrePreuves(referencesPubliees, catalogueRetouche)

    for (const [index, reference] of referencesPubliees.entries()) {
      expect(retouchees[index]?.enonce).toBe(`Énoncé venu du catalogue — ${reference.axe}`)
    }
  })

  it('n’écrit aucun énoncé de preuve dans les références de l’accueil', () => {
    expect(JSON.stringify(referencesPubliees)).not.toContain('€')
    for (const reference of referencesPubliees) {
      expect(Object.keys(reference).sort()).toEqual(['axe', 'offre'])
    }
  })
})

describe('resoudrePreuves — clés de rendu et ordre', () => {
  it('dérive la clé de la référence, offre et axe joints', () => {
    for (const [index, reference] of referencesPubliees.entries()) {
      expect(resolues[index]?.cle).toBe(`${reference.offre}-${reference.axe}`)
    }
  })

  it('produit des clés uniques, utilisables comme clés de liste', () => {
    expect(new Set(resolues.map((preuve) => preuve.cle)).size).toBe(resolues.length)
  })

  it('conserve l’ordre de déclaration — c’est un choix éditorial', () => {
    expect(resolues.map((preuve) => preuve.titre)).toEqual(
      referencesPubliees.map((reference) => axeDe(reference)?.titre),
    )
  })

  it('rend une liste vide sans lever', () => {
    expect(resoudrePreuves([], offres)).toEqual([])
  })

  it('laisse le catalogue intact', () => {
    const avant = JSON.stringify(offres)
    resoudrePreuves(referencesPubliees, offres)

    expect(JSON.stringify(offres)).toBe(avant)
  })
})

describe('resoudrePreuves — une référence cassée échoue au lieu d’afficher un blanc', () => {
  it('lève sur une offre inconnue', () => {
    const fantome = [{ offre: 'seo' as CleOffre, axe: 'sea-pilotage' }]

    expect(() => resoudrePreuves(fantome, offres)).toThrow(/offre inconnue/i)
  })

  it('lève sur un axe inconnu dans une offre existante', () => {
    const fantome = [{ offre: 'sea' as CleOffre, axe: 'axe-inexistant' }]

    expect(() => resoudrePreuves(fantome, offres)).toThrow(/axe inconnu/i)
  })

  it('nomme l’offre dans le message d’un axe inconnu, pour situer la correction', () => {
    const fantome = [{ offre: 'sea' as CleOffre, axe: 'axe-inexistant' }]

    expect(() => resoudrePreuves(fantome, offres)).toThrow(/SEA/)
  })

  it('lève sur un axe dont la preuve vaut null — une affirmation sans preuve ne s’affiche pas', () => {
    expect(() => resoudrePreuves([referenceSansPreuve()], offres)).toThrow(
      /aucune preuve publiable/i,
    )
  })

  it('lève dès qu’une seule référence d’une liste est cassée', () => {
    const melange = [...referencesPubliees, { offre: 'sea' as CleOffre, axe: 'axe-inexistant' }]

    expect(() => resoudrePreuves(melange, offres)).toThrow()
  })

  it('lève sur un catalogue vide', () => {
    expect(() => resoudrePreuves(referencesPubliees, [])).toThrow()
  })

  it('résout sans lever le contenu réel de l’accueil, preuves et « pourquoi »', () => {
    expect(() => resoudrePreuves(accueil.preuves.references, offres)).not.toThrow()
    expect(() => resoudrePreuves(accueil.pourquoi.references, offres)).not.toThrow()
  })
})

describe('ce que l’accueil choisit de prouver', () => {
  it('représente les trois offres dès les trois premières preuves', () => {
    const troisPremieres = referencesPubliees.slice(0, 3).map((reference) => reference.offre)

    expect([...new Set(troisPremieres)].sort()).toEqual(offres.map((offre) => offre.cle).sort())
  })

  it('ne répète dans les preuves aucun axe déjà porté par la section « pourquoi »', () => {
    const dejaPortes = new Set(
      accueil.pourquoi.references.map((reference) => `${reference.offre}-${reference.axe}`),
    )

    for (const reference of referencesPubliees) {
      expect(dejaPortes.has(`${reference.offre}-${reference.axe}`)).toBe(false)
    }
  })

  it('fait apparaître le développement en IA augmentée, imposé partout où le site parle de code', () => {
    expect(referencesPubliees.some((reference) => reference.axe === 'ia-augmentee')).toBe(true)
  })

  it('appuie la section « pourquoi » sur le pilotage des campagnes', () => {
    const pourquoi = resoudrePreuves(accueil.pourquoi.references, offres)

    expect(pourquoi.map((preuve) => preuve.cle)).toContain('sea-sea-pilotage')
    for (const preuve of pourquoi) {
      expect(preuve.enonce.length).toBeGreaterThan(0)
    }
  })
})
