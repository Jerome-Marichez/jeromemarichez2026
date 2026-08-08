/**
 * Intention (écriture déléguée par Jérôme MARICHEZ le 2026-08-08 — issue #26) :
 * le jeu de données éditorial réel du dépôt est conforme à ses schémas Zod, et ces
 * schémas REFUSENT réellement ce qu'ils prétendent refuser. Un schéma qui accepte tout
 * ne protège rien : le contenu est validé au chargement du module, donc une donnée non
 * conforme doit casser le BUILD, jamais atteindre la production.
 *
 * Le garde-fou central est l'union discriminée `Justificatif` : la variante `a-fournir`
 * ne porte AUCUNE propriété `url`. Le typage l'interdit à la compilation, et le
 * `z.strictObject` le rattrape au chargement si quelqu'un contourne le typage — c'est ce
 * qui rend un lien de certification mort structurellement impossible.
 *
 * Cas limites couverts : clé inconnue rejetée par `strictObject` sur chaque entité ;
 * tableau d'axes vide ; clé en majuscules ; preuve vide (différente de `null`, qui est
 * légitime) ; justificatif `a-fournir` porteur d'une `url` ; justificatif `disponible`
 * en HTTP ; année hors bornes ou non entière ; niveau de diplôme hors référentiel ;
 * année de fin antérieure à l'année de début ; unicité des clés.
 *
 * Niveau : unitaire (schémas purs sur le contenu réel).
 * Jeu de données : le contenu éditorial réel du dépôt, et des variantes invalides
 * dérivées de lui pour les refus.
 */
import { certifications, experiences, formations, identite, offres } from '@/content'
import { axeOffreSchema } from '@/schemas/axe-offre.schema'
import { certificationSchema, justificatifSchema } from '@/schemas/certification.schema'
import { experienceSchema } from '@/schemas/experience.schema'
import { formationSchema } from '@/schemas/formation.schema'
import { offreSchema } from '@/schemas/offre.schema'

const AXE_VALIDE = {
  cle: 'cadrage',
  titre: 'Cadrage',
  description: 'Recueil du besoin et spécifications.',
  preuve: null,
} as const

const CERTIFICATION_VALIDE = {
  cle: 'istqb-foundation',
  intitule: 'ISTQB Foundation',
  organisme: 'ISTQB',
  annee: 2026,
  justificatif: { statut: 'a-fournir' },
} as const

const cles = (elements: readonly { cle: string }[]): readonly string[] =>
  elements.map((element) => element.cle)

describe('conformité du contenu réel', () => {
  it('valide chaque offre publiée', () => {
    for (const offre of offres) {
      expect(() => offreSchema.parse(offre)).not.toThrow()
    }
  })

  it('valide chaque certification, formation et expérience publiée', () => {
    for (const certification of certifications) {
      expect(() => certificationSchema.parse(certification)).not.toThrow()
    }
    for (const formation of formations) {
      expect(() => formationSchema.parse(formation)).not.toThrow()
    }
    for (const experience of experiences) {
      expect(() => experienceSchema.parse(experience)).not.toThrow()
    }
  })

  it('publie trois offres, chacune avec au moins un axe', () => {
    expect(offres).toHaveLength(3)
    for (const offre of offres) {
      expect(offre.axes.length).toBeGreaterThan(0)
    }
  })

  it('ne déclare jamais deux fois la même clé', () => {
    for (const collection of [certifications, formations, experiences, identite.langues, offres]) {
      expect(new Set(cles(collection)).size).toBe(collection.length)
    }
  })

  it('ne déclare jamais deux fois le même axe au sein d’une offre', () => {
    for (const offre of offres) {
      expect(new Set(cles(offre.axes)).size).toBe(offre.axes.length)
    }
  })

  it('rattache chaque expérience à des offres qui existent', () => {
    const clesOffres = new Set(cles(offres))

    for (const experience of experiences) {
      for (const offreLiee of experience.offresLiees) {
        expect(clesOffres.has(offreLiee)).toBe(true)
      }
    }
  })
})

describe('offreSchema — refus', () => {
  const offreValide = offres[0]

  it.each([
    ['clé hors des trois offres arbitrées', { cle: 'seo-sea' }],
    ['titre vide', { titre: '' }],
    ['accroche vide', { accroche: '' }],
    ['décision permise vide', { decisionPermise: '' }],
    ['tableau d’axes vide', { axes: [] }],
  ])('refuse une offre avec %s', (_cas, surcharge) => {
    expect(() => offreSchema.parse({ ...offreValide, ...surcharge })).toThrow()
  })

  it('refuse une clé inconnue plutôt que de l’ignorer', () => {
    expect(() => offreSchema.parse({ ...offreValide, tarif: '1000 €' })).toThrow()
  })
})

describe('axeOffreSchema — refus', () => {
  it.each([
    ['clé en majuscules', { cle: 'Cadrage' }],
    ['clé avec espace', { cle: 'cadrage initial' }],
    ['titre vide', { titre: '' }],
    ['description vide', { description: '' }],
    ['preuve vide au lieu de null', { preuve: '' }],
    ['volet vide', { volet: '' }],
  ])('refuse un axe avec %s', (_cas, surcharge) => {
    expect(() => axeOffreSchema.parse({ ...AXE_VALIDE, ...surcharge })).toThrow()
  })

  it('accepte une preuve absente sous la forme explicite null', () => {
    expect(() => axeOffreSchema.parse({ ...AXE_VALIDE, preuve: null })).not.toThrow()
  })

  it('accepte un volet nommé et refuse une clé inconnue', () => {
    expect(() => axeOffreSchema.parse({ ...AXE_VALIDE, volet: 'Agents autonomes' })).not.toThrow()
    expect(() => axeOffreSchema.parse({ ...AXE_VALIDE, montant: 1000 })).toThrow()
  })
})

describe('justificatifSchema — un lien mort est impossible', () => {
  it('accepte un justificatif à fournir, sans URL', () => {
    expect(() => justificatifSchema.parse({ statut: 'a-fournir' })).not.toThrow()
  })

  it('refuse une URL glissée dans un justificatif à fournir', () => {
    expect(() =>
      justificatifSchema.parse({ statut: 'a-fournir', url: 'https://example.org/certificat' }),
    ).toThrow()
  })

  it('accepte un justificatif disponible en HTTPS absolu', () => {
    expect(() =>
      justificatifSchema.parse({ statut: 'disponible', url: 'https://example.org/certificat' }),
    ).not.toThrow()
  })

  it.each([
    ['HTTP', 'http://example.org/certificat'],
    ['relative', '/certificat'],
    ['vide', ''],
    ['texte', 'à fournir'],
  ])('refuse un justificatif disponible dont l’URL est %s', (_cas, url) => {
    expect(() => justificatifSchema.parse({ statut: 'disponible', url })).toThrow()
  })

  it('refuse un justificatif disponible sans URL', () => {
    expect(() => justificatifSchema.parse({ statut: 'disponible' })).toThrow()
  })

  it('refuse un statut inconnu', () => {
    expect(() => justificatifSchema.parse({ statut: 'en-cours' })).toThrow()
  })
})

describe('certificationSchema — refus', () => {
  it.each([
    ['année antérieure aux bornes', { annee: 1999 }],
    ['année non entière', { annee: 2026.5 }],
    ['intitulé vide', { intitule: '' }],
    ['organisme vide', { organisme: '' }],
    ['clé en majuscules', { cle: 'ISTQB' }],
  ])('refuse une certification avec %s', (_cas, surcharge) => {
    expect(() => certificationSchema.parse({ ...CERTIFICATION_VALIDE, ...surcharge })).toThrow()
  })

  it('accepte une année non établie sous la forme explicite null', () => {
    expect(() => certificationSchema.parse({ ...CERTIFICATION_VALIDE, annee: null })).not.toThrow()
  })
})

describe('formationSchema et experienceSchema — refus', () => {
  it('refuse un niveau de diplôme hors du référentiel des CV', () => {
    const formation = formations[0]

    expect(() => formationSchema.parse({ ...formation, niveau: 'Bac +2' })).toThrow()
  })

  it('refuse une expérience dont l’année de fin précède l’année de début', () => {
    const experience = experiences[0]

    expect(() =>
      experienceSchema.parse({ ...experience, anneeDebut: 2026, anneeFin: 2023 }),
    ).toThrow()
  })

  it('refuse une expérience sans fait ni offre liée', () => {
    const experience = experiences[0]

    expect(() => experienceSchema.parse({ ...experience, faits: [] })).toThrow()
    expect(() => experienceSchema.parse({ ...experience, offresLiees: [] })).toThrow()
  })

  it('refuse une offre liée qui n’existe pas', () => {
    const experience = experiences[0]

    expect(() => experienceSchema.parse({ ...experience, offresLiees: ['seo-sea'] })).toThrow()
  })
})
