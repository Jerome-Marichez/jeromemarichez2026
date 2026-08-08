/**
 * Intention (écriture déléguée par Jérôme MARICHEZ le 2026-08-08 — issue #29) :
 * `resoudreMaillons` rattache chaque maillon de la chaîne aux offres qui le couvrent en
 * LISANT leur titre dans le catalogue, jamais en le recopiant dans le contenu de
 * l'accueil. C'est la même règle que pour la navigation dérivée : une recopie avait déjà
 * fait diverger « Data et IA » de « Data & IA » (issue #11). Le contenu de l'accueil ne
 * porte donc que des CLÉS, et le titre affiché suit le catalogue partout où il change.
 *
 * L'ORDRE de déclaration est conservé — l'ordre des maillons EST la chaîne : le site,
 * la donnée structurée et l'entrepôt, le taggage, le SEA. Le réordonner changerait le
 * discours de la page, pas seulement sa mise en page.
 *
 * Une clé d'offre inconnue ÉCHOUE bruyamment. Le contenu étant résolu au rendu serveur,
 * donc au build, l'erreur survient à la compilation plutôt que devant un visiteur sous
 * la forme d'un maillon rattaché à une offre qui n'existe pas.
 *
 * Cas limites couverts : catalogue dont les titres diffèrent de ceux du dépôt (preuve
 * que le titre est LU et non écrit en dur) ; clé inconnue ; catalogue vide ; liste de
 * maillons vide ; maillon rattaché à DEUX offres — l'entrepôt, pivot qui alimente
 * l'acquisition et les projets data ; non-mutation du contenu source.
 *
 * Niveau : unitaire (service pur).
 * Jeu de données : le contenu réel du dépôt (`accueil.chaine.maillons`, `offres`), et
 * des catalogues dérivés de lui pour les cas de refus.
 */
import { accueil, offres } from '@/content'
import type { IMaillonChaine } from '@/interfaces/maillon-chaine'
import type { IOffre } from '@/interfaces/offre'
import type { CleOffre } from '@/interfaces/types'
import { resoudreMaillons } from '@/services/chaine.service'

const maillons = accueil.chaine.maillons
const resolus = resoudreMaillons(maillons, offres)

/** Titre réel d'une offre du dépôt, cherché relationnellement et jamais écrit ici. */
const titreDe = (cle: CleOffre): string => {
  const offre = offres.find((candidate) => candidate.cle === cle)
  if (offre === undefined) {
    throw new Error(`Le dépôt ne publie aucune offre « ${cle} ».`)
  }

  return offre.titre
}

/** Le catalogue réel, dont seuls les TITRES sont remplacés par des marqueurs. */
const CATALOGUE_RENOMME: readonly IOffre[] = offres.map((offre) => ({
  ...offre,
  titre: `Titre venu du catalogue — ${offre.cle}`,
}))

const MAILLON_MINIMAL: IMaillonChaine = {
  cle: 'maillon-de-controle',
  titre: 'Maillon de contrôle',
  role: 'Rôle de contrôle.',
  illustration: 'Illustration de contrôle.',
  libelleSortie: 'Ce qu’il passe à l’étape suivante',
  sortie: 'Sortie de contrôle.',
  offres: ['sea'],
}

describe('resoudreMaillons — le titre est lu, jamais recopié', () => {
  it('remplace chaque clé par le titre réel de l’offre correspondante', () => {
    for (const [index, maillon] of maillons.entries()) {
      expect(resolus[index]?.offres).toEqual(maillon.offres.map(titreDe))
    }
  })

  it('suit le catalogue reçu quand les titres y changent', () => {
    const renommes = resoudreMaillons(maillons, CATALOGUE_RENOMME)

    for (const [index, maillon] of maillons.entries()) {
      expect(renommes[index]?.offres).toEqual(
        maillon.offres.map((cle) => `Titre venu du catalogue — ${cle}`),
      )
    }
  })

  it('ne laisse aucune clé d’offre dans le résultat', () => {
    const clesPubliees = offres.map((offre) => offre.cle)

    for (const resolu of resolus) {
      for (const titre of resolu.offres) {
        expect(clesPubliees).not.toContain(titre)
      }
    }
  })

  it('n’écrit aucun titre d’offre dans les données de rattachement de l’accueil', () => {
    const titresPublies = offres.map((offre) => offre.titre)

    for (const maillon of maillons) {
      for (const cle of maillon.offres) {
        expect(titresPublies).not.toContain(cle)
      }
    }
  })
})

describe('resoudreMaillons — l’ordre est la chaîne', () => {
  it('conserve l’ordre de déclaration des maillons', () => {
    expect(resolus.map((resolu) => resolu.cle)).toEqual(maillons.map((maillon) => maillon.cle))
  })

  it('déroule la chaîne du site jusqu’au SEA, en passant par l’entrepôt puis le taggage', () => {
    expect(maillons.map((maillon) => maillon.cle)).toEqual(['site', 'entrepot', 'taggage', 'sea'])
  })

  it('conserve l’ordre des offres à l’intérieur d’un maillon', () => {
    const inverse = resoudreMaillons(
      [{ ...MAILLON_MINIMAL, offres: ['data-ia', 'ingenierie-web', 'sea'] }],
      offres,
    )

    expect(inverse[0]?.offres).toEqual([
      titreDe('data-ia'),
      titreDe('ingenierie-web'),
      titreDe('sea'),
    ])
  })

  it('rend une liste vide pour une chaîne vide, sans lever', () => {
    expect(resoudreMaillons([], offres)).toEqual([])
  })
})

describe('resoudreMaillons — tout le reste du maillon est repris tel quel', () => {
  it('ne modifie ni le rôle, ni l’illustration, ni la sortie, ni son libellé', () => {
    for (const [index, maillon] of maillons.entries()) {
      const resolu = resolus[index]

      expect(resolu?.cle).toBe(maillon.cle)
      expect(resolu?.titre).toBe(maillon.titre)
      expect(resolu?.role).toBe(maillon.role)
      expect(resolu?.illustration).toBe(maillon.illustration)
      expect(resolu?.libelleSortie).toBe(maillon.libelleSortie)
      expect(resolu?.sortie).toBe(maillon.sortie)
    }
  })

  it('laisse le contenu source intact — il porte toujours des clés après résolution', () => {
    resoudreMaillons(maillons, offres)

    for (const maillon of accueil.chaine.maillons) {
      for (const cle of maillon.offres) {
        expect(offres.some((offre) => offre.cle === cle)).toBe(true)
      }
    }
  })
})

describe('resoudreMaillons — une clé inconnue échoue au lieu de publier un rattachement faux', () => {
  it('lève sur une clé d’offre que le catalogue ne publie pas', () => {
    const inconnue = [
      { ...MAILLON_MINIMAL, offres: ['offre-fantome' as CleOffre] },
    ] as readonly IMaillonChaine[]

    expect(() => resoudreMaillons(inconnue, offres)).toThrow(/offre-fantome/)
  })

  it('nomme le maillon fautif dans le message, pour que l’édition sache où corriger', () => {
    const inconnue = [
      { ...MAILLON_MINIMAL, offres: ['offre-fantome' as CleOffre] },
    ] as readonly IMaillonChaine[]

    expect(() => resoudreMaillons(inconnue, offres)).toThrow(/maillon-de-controle/)
  })

  it('lève dès qu’une seule clé d’un maillon est inconnue, même si les autres résolvent', () => {
    const partiel = [
      { ...MAILLON_MINIMAL, offres: ['sea', 'offre-fantome' as CleOffre] },
    ] as readonly IMaillonChaine[]

    expect(() => resoudreMaillons(partiel, offres)).toThrow()
  })

  it('lève sur un catalogue vide, plutôt que de rendre un rattachement sans titre', () => {
    expect(() => resoudreMaillons(maillons, [])).toThrow()
  })

  it('résout sans lever sur le contenu réel du dépôt', () => {
    expect(() => resoudreMaillons(accueil.chaine.maillons, offres)).not.toThrow()
  })
})

describe('l’entrepôt est le pivot de la chaîne', () => {
  const entrepot = resolus.find((resolu) => resolu.cle === 'entrepot')

  it('existe dans la chaîne publiée', () => {
    expect(entrepot).toBeDefined()
  })

  it('est rattaché à exactement deux offres', () => {
    expect(entrepot?.offres).toHaveLength(2)
  })

  it('alimente l’acquisition ET les projets data et IA, dans cet ordre', () => {
    expect(entrepot?.offres).toEqual([titreDe('sea'), titreDe('data-ia')])
  })

  it('est le seul maillon rattaché à plus d’une offre', () => {
    const multiples = resolus.filter((resolu) => resolu.offres.length > 1)

    expect(multiples.map((resolu) => resolu.cle)).toEqual(['entrepot'])
  })

  it('laisse chaque autre maillon couvert par au moins une offre', () => {
    for (const resolu of resolus) {
      expect(resolu.offres.length).toBeGreaterThanOrEqual(1)
    }
  })

  it('fait couvrir les trois offres du site par la chaîne entière', () => {
    const couvertes = new Set(maillons.flatMap((maillon) => maillon.offres))

    expect([...couvertes].sort()).toEqual(offres.map((offre) => offre.cle).sort())
  })
})
