/**
 * Intention (écriture déléguée par Jérôme MARICHEZ le 2026-08-08 — issue #29) :
 * les TROIS lignes publiées de la grille SEA sont exactement celles validées par Jérôme
 * MARICHEZ le 2026-08-08. C'est le premier engagement commercial chiffré du site : les
 * valeurs ne se déduisent pas, ne s'arrondissent pas et ne s'« harmonisent » pas. Un
 * arrondi silencieux — 300 devenu 350, 1 200 devenu 1 000 — engagerait Jérôme vis-à-vis
 * d'un prospect sans que personne ne s'en aperçoive : ce test le fait échouer en CI.
 *
 * La grille est aussi vérifiée dans sa FORME éditoriale : deux lignes portent le même
 * intitulé et deux conditions différentes — la même prestation n'a pas le même prix
 * selon que Jérôme a conçu le site ou non, et le prospect identifie son cas AVANT de
 * lire un montant. La preuve qui appuie l'argument est une RÉFÉRENCE, jamais un texte
 * recopié : les chiffres du parcours restent écrits à un seul endroit.
 *
 * Cas limites couverts : la ligne « incluse » ne porte AUCUNE autre propriété que sa
 * nature — pas de mention fiscale, pas de borne, pas de périodicité ; l'offre Data & IA
 * n'a aucune grille, et cette absence est une information, pas un oubli ; l'argument ne
 * nomme aucune agence et ne généralise pas sur la profession.
 *
 * Niveau : unitaire (données pures).
 * Jeu de données : la grille tarifaire réelle du dépôt et le catalogue des offres.
 */
import { grillesTarifaires, grilleTarifaireSea, offres } from '@/content'
import { grilleTarifaireSchema } from '@/schemas/grille-tarifaire.schema'
import { formaterMontant } from '@/utils/tarif'

const lignes = grilleTarifaireSea.lignes
const ligneDe = (cle: string) => lignes.find((ligne) => ligne.cle === cle)

describe('la grille publiée est celle de l’offre SEA', () => {
  it('est conforme à son schéma', () => {
    expect(() => grilleTarifaireSchema.parse(grilleTarifaireSea)).not.toThrow()
  })

  it('est rattachée à l’offre SEA du catalogue', () => {
    expect(grilleTarifaireSea.offre).toBe('sea')
    expect(offres.some((offre) => offre.cle === grilleTarifaireSea.offre)).toBe(true)
  })

  it('est la seule grille publiée du site', () => {
    expect(grillesTarifaires).toHaveLength(1)
    expect(grillesTarifaires[0]).toBe(grilleTarifaireSea)
  })

  it('laisse Data & IA sans grille — un projet data se chiffre au périmètre', () => {
    expect(grillesTarifaires.some((grille) => grille.offre === 'data-ia')).toBe(false)
    expect(grillesTarifaires.some((grille) => grille.offre === 'ingenierie-web')).toBe(false)
  })
})

describe('les trois lignes validées, dans leur ordre de lecture', () => {
  it('publie exactement trois lignes', () => {
    expect(lignes).toHaveLength(3)
  })

  it('les ordonne du cas inclus au forfait de gestion', () => {
    expect(lignes.map((ligne) => ligne.cle)).toEqual([
      'mise-en-place-site-concu',
      'mise-en-place-site-existant',
      'gestion-du-compte',
    ])
  })

  it('donne des clés uniques', () => {
    expect(new Set(lignes.map((ligne) => ligne.cle)).size).toBe(lignes.length)
  })

  it('porte le même intitulé sur les deux mises en place, et deux conditions distinctes', () => {
    const concu = ligneDe('mise-en-place-site-concu')
    const existant = ligneDe('mise-en-place-site-existant')

    expect(concu?.intitule).toBe('Mise en place de la solution data-driven')
    expect(existant?.intitule).toBe(concu?.intitule)
    expect(existant?.condition).not.toBe(concu?.condition)
  })

  it('énonce chaque condition à la première personne du singulier', () => {
    expect(ligneDe('mise-en-place-site-concu')?.condition).toBe('si j’ai conçu le site')
    expect(ligneDe('mise-en-place-site-existant')?.condition).toBe(
      'sur un site existant, que je n’ai pas conçu',
    )
    expect(ligneDe('gestion-du-compte')?.condition).toBe('ensuite, une fois la solution en place')
  })
})

describe('les montants validés, au chiffre près', () => {
  it('inclut la mise en place quand j’ai conçu le site, sans aucun chiffre', () => {
    const montant = ligneDe('mise-en-place-site-concu')?.montant

    expect(montant).toEqual({ nature: 'inclus' })
    expect(Object.keys(montant ?? {})).toEqual(['nature'])
  })

  it('publie la fourchette du site existant exactement telle qu’elle a été validée', () => {
    expect(ligneDe('mise-en-place-site-existant')?.montant).toEqual({
      nature: 'fourchette',
      minimum: 300,
      maximum: 1200,
      mentionFiscale: 'TTC',
      periodicite: 'une-seule-fois',
      variableSelon: 'le périmètre',
    })
  })

  it('facture la gestion du compte au forfait mensuel, sur devis', () => {
    expect(ligneDe('gestion-du-compte')?.montant).toEqual({
      nature: 'sur-devis',
      periodicite: 'mensuel',
    })
  })

  it('rend les trois lignes au mot près', () => {
    expect(lignes.map((ligne) => formaterMontant(ligne.montant))).toEqual([
      'Incluse',
      '300 à 1 200 € TTC, une seule fois, selon le périmètre',
      'Forfait mensuel, sur devis',
    ])
  })

  it('ne publie qu’une seule ligne chiffrée, et elle est TTC', () => {
    const chiffrees = lignes.filter((ligne) => ligne.montant.nature === 'fourchette')

    expect(chiffrees).toHaveLength(1)
    for (const ligne of chiffrees) {
      expect(formaterMontant(ligne.montant)).toContain('TTC')
    }
  })
})

describe('l’argument et sa preuve', () => {
  it('désigne sa preuve au lieu de la recopier', () => {
    expect(grilleTarifaireSea.preuve).toEqual({ offre: 'sea', axe: 'sea-pilotage' })
  })

  it('pointe une preuve qui existe réellement et qui est publiable', () => {
    const offre = offres.find((candidate) => candidate.cle === grilleTarifaireSea.preuve.offre)
    const axe = offre?.axes.find((candidate) => candidate.cle === grilleTarifaireSea.preuve.axe)

    expect(axe).toBeDefined()
    expect(axe?.preuve).not.toBeNull()
  })

  it('ne recopie dans l’argument aucun énoncé de preuve écrit dans les offres', () => {
    const enonces = offres
      .flatMap((offre) => offre.axes)
      .map((axe) => axe.preuve)
      .filter((preuve): preuve is string => preuve !== null)

    for (const enonce of enonces) {
      expect(grilleTarifaireSea.argument).not.toContain(enonce)
    }
  })

  it('s’énonce à la première personne, depuis l’expérience vécue', () => {
    expect(grilleTarifaireSea.argument).toMatch(/j’ai vu/i)
    expect(grilleTarifaireSea.argument).not.toMatch(/\bnous\b/i)
  })

  it('porte le constat sur un accès à la donnée, jamais sur la compétence d’autrui', () => {
    expect(grilleTarifaireSea.argument).toMatch(/pas une affaire de compétence/i)
    expect(grilleTarifaireSea.argument).toMatch(/affaire d’accès/i)
  })

  it.each(['Google Ads', 'agence', 'concurrent', 'incompétent'])(
    'ne nomme ni ne vise « %s » dans l’argument',
    (terme) => {
      expect(grilleTarifaireSea.argument.toLowerCase()).not.toContain(terme.toLowerCase())
    },
  )

  it('ne publie aucun chiffre dans l’argument — les montants vivent dans les lignes', () => {
    expect(grilleTarifaireSea.argument).not.toMatch(/\d\s?(€|EUR\b)/)
  })
})

describe('aucun montant ne fuit hors de la grille', () => {
  it('n’écrit aucun prix TTC dans le catalogue des offres', () => {
    expect(JSON.stringify(offres)).not.toContain('TTC')
  })

  it('n’écrit les bornes de la fourchette qu’ici, jamais dans une offre', () => {
    const catalogue = JSON.stringify(offres)

    expect(catalogue).not.toContain('300 à 1 200')
    expect(catalogue).not.toContain('1 200 €')
  })
})
