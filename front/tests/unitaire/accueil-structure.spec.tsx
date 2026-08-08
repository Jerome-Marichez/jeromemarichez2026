/**
 * Intention (écriture déléguée par Jérôme MARICHEZ le 2026-08-08 — issue #29) :
 * la page d'accueil RENDUE tient les garanties que la donnée seule ne prouve pas.
 *
 * 1. Un seul `h1`, et c'est l'accroche : le plan du document a une racine unique.
 * 2. Aucun saut de niveau de titre (h1 → h3 sans h2). Un lecteur d'écran restitue le
 *    plan par ces niveaux ; un saut lui fait annoncer une sous-section qui n'existe pas.
 * 3. La mention du caractère illustratif du fil rouge est réellement RENDUE, pas
 *    seulement présente dans les données — un avertissement obligatoire dans le schéma
 *    mais jamais affiché ne protégerait personne, et c'est exactement le défaut qu'une
 *    relecture des seules données laisse passer.
 * 4. Les trois pôles restent ATTEIGNABLES depuis l'accueil, par des routes dérivées de
 *    la clé de l'offre (`cheminOffre`), jamais écrites en dur dans le contenu.
 * 5. Aucun libellé de lien identique ne mène à deux destinations différentes (WCAG
 *    2.4.4) : restitués hors contexte par un lecteur d'écran, deux liens homonymes
 *    seraient indiscernables. L'inverse — deux libellés distincts vers une même
 *    destination — reste licite et n'est pas interdit ici.
 *
 * Cas limites couverts : titres rendus par des composants différents (`Accroche` et
 * `AppelContact` composent leur région à la main, les autres passent par `Section`) ;
 * régions toutes nommées ; rattachement d'un maillon affiché par TITRE d'offre et jamais
 * par clé ; aucun lien sans nom accessible.
 *
 * Niveau : unitaire (React Testing Library, jsdom) — la vue et les services réels
 * collaborent, aucune doublure de module.
 * Jeu de données : le contenu réel du dépôt, celui que sert la page « / ».
 */
import { render, screen } from '@testing-library/react'
import { cheminOffre } from '@/@shared/config/routes'
import { accueil, offres } from '@/content'
import { AccueilView } from '@/views/accueil/AccueilView'

/** Texte accessible d'un élément, espaces normalisés comme le fait un lecteur d'écran. */
const nom = (element: Element): string => (element.textContent ?? '').replace(/\s+/g, ' ').trim()

const rendu = () => render(<AccueilView />).container

describe('plan du document', () => {
  it('ne porte qu’un seul h1, et c’est l’accroche', () => {
    const container = rendu()
    const h1 = container.querySelectorAll('h1')

    expect(h1).toHaveLength(1)
    expect(nom(h1[0] as Element)).toBe(accueil.accroche.titre)
  })

  it('n’enchaîne aucun saut de niveau de titre', () => {
    const container = rendu()
    const niveaux = [...container.querySelectorAll('h1, h2, h3, h4, h5, h6')].map((titre) =>
      Number(titre.tagName.slice(1)),
    )

    expect(niveaux[0]).toBe(1)
    for (const [index, niveau] of niveaux.entries()) {
      if (index > 0) {
        expect(niveau).toBeLessThanOrEqual((niveaux[index - 1] as number) + 1)
      }
    }
  })

  it('descend jusqu’au niveau 3 — les sections ont bien des sous-titres', () => {
    const container = rendu()

    expect(container.querySelectorAll('h3').length).toBeGreaterThan(0)
  })

  it('nomme chacune des sept régions de la page', () => {
    rendu()
    const regions = screen.getAllByRole('region')

    expect(regions).toHaveLength(7)
    for (const region of regions) {
      expect(region.getAttribute('aria-labelledby')).toBeTruthy()
    }
  })

  it('reprend le titre de chaque section dans le nom de sa région', () => {
    rendu()

    for (const titre of [
      accueil.accroche.titre,
      accueil.chaine.titre,
      accueil.pointsEntree.titre,
      accueil.pourquoi.titre,
      accueil.offres.titre,
      accueil.preuves.titre,
      accueil.contact.titre,
    ]) {
      expect(screen.getByRole('region', { name: titre })).not.toBeNull()
    }
  })
})

describe('la mention illustrative est rendue, pas seulement déclarée', () => {
  it('affiche le texte exact de l’avertissement', () => {
    rendu()

    expect(screen.getByText(accueil.chaine.avertissement)).not.toBeNull()
  })

  it('affiche l’étiquette « scénario illustratif »', () => {
    rendu()

    expect(screen.getByText(accueil.chaine.libelleAvertissement)).not.toBeNull()
  })

  it('place l’avertissement AVANT le premier maillon du scénario', () => {
    const container = rendu()
    const avertissement = screen.getByText(accueil.chaine.avertissement)
    const premierMaillon = screen.getByRole('heading', {
      name: accueil.chaine.maillons[0]?.titre,
    })
    const position = avertissement.compareDocumentPosition(premierMaillon)

    expect(container.contains(avertissement)).toBe(true)
    expect(position & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('rend le scénario dans une liste ordonnée — l’ordre est l’information', () => {
    rendu()
    const etapes = screen.getAllByRole('listitem')
    const rangs = accueil.chaine.maillons.map(
      (_maillon, index) => `${accueil.chaine.libelleEtape} ${index + 1}`,
    )

    expect(etapes.length).toBeGreaterThanOrEqual(accueil.chaine.maillons.length)
    for (const rang of rangs) {
      expect(screen.getByText(rang)).not.toBeNull()
    }
  })

  it('affiche le rattachement d’un maillon par le TITRE de l’offre, jamais par sa clé', () => {
    const container = rendu()
    const texte = nom(container)

    for (const offre of offres) {
      expect(texte).not.toContain(offre.cle)
    }
    expect(screen.getAllByText(offres[1]?.titre as string).length).toBeGreaterThan(0)
  })
})

describe('les trois pôles restent atteignables', () => {
  it('publie au moins un lien vers chacune des trois offres', () => {
    const container = rendu()
    const destinations = [...container.querySelectorAll('a')].map((lien) =>
      lien.getAttribute('href'),
    )

    for (const offre of offres) {
      expect(destinations).toContain(cheminOffre(offre.cle))
    }
  })

  it('dérive la destination de la clé de l’offre, jamais d’un chemin écrit à la main', () => {
    const container = rendu()
    const versServices = [...container.querySelectorAll('a')]
      .map((lien) => lien.getAttribute('href') ?? '')
      .filter((href) => href.startsWith('/services/'))
    const attendues = offres.map((offre) => cheminOffre(offre.cle))

    expect(versServices.length).toBeGreaterThanOrEqual(offres.length)
    for (const href of versServices) {
      expect(attendues).toContain(href)
    }
  })

  it('atteint les trois offres depuis la seule section des points d’entrée', () => {
    const cibles = new Set(
      accueil.pointsEntree.points.flatMap((point) =>
        point.liens.map((lien) => cheminOffre(lien.offre)),
      ),
    )

    expect([...cibles].sort()).toEqual(offres.map((offre) => cheminOffre(offre.cle)).sort())
  })

  it('mène aussi au contact, action attendue de la page', () => {
    const container = rendu()
    const destinations = [...container.querySelectorAll('a')].map((lien) =>
      lien.getAttribute('href'),
    )

    expect(destinations).toContain(accueil.contact.action.href)
  })
})

describe('libellés de liens — WCAG 2.4.4', () => {
  it('donne un nom accessible à chaque lien', () => {
    const container = rendu()

    for (const lien of container.querySelectorAll('a')) {
      expect(nom(lien)).not.toBe('')
    }
  })

  it('ne fait jamais mener un même libellé à deux destinations différentes', () => {
    const container = rendu()
    const destinationsParLibelle = new Map<string, Set<string>>()

    for (const lien of container.querySelectorAll('a')) {
      const libelle = nom(lien).toLowerCase()
      const destinations = destinationsParLibelle.get(libelle) ?? new Set<string>()
      destinations.add(lien.getAttribute('href') ?? '')
      destinationsParLibelle.set(libelle, destinations)
    }

    const homonymes = [...destinationsParLibelle.entries()]
      .filter(([, destinations]) => destinations.size > 1)
      .map(([libelle, destinations]) => `« ${libelle} » → ${[...destinations].join(' et ')}`)

    expect(homonymes).toEqual([])
    expect(destinationsParLibelle.size).toBeGreaterThan(1)
  })

  it('distingue les trois liens d’offre par le titre de l’offre, pas par leur position', () => {
    rendu()

    for (const offre of offres) {
      const lien = screen.getByRole('link', {
        name: `${accueil.offres.libelleLien} ${offre.titre}`,
      })

      expect(lien.getAttribute('href')).toBe(cheminOffre(offre.cle))
    }
  })

  it('garde des libellés complets et non composés dans les points d’entrée', () => {
    rendu()

    for (const point of accueil.pointsEntree.points) {
      for (const lien of point.liens) {
        expect(screen.getByRole('link', { name: lien.libelle }).getAttribute('href')).toBe(
          cheminOffre(lien.offre),
        )
      }
    }
  })
})

describe('les énoncés affichés viennent des offres, jamais de l’accueil', () => {
  it('affiche chaque preuve avec le texte écrit dans son offre d’origine', () => {
    rendu()

    for (const reference of accueil.preuves.references) {
      const offre = offres.find((candidate) => candidate.cle === reference.offre)
      const axe = offre?.axes.find((candidate) => candidate.cle === reference.axe)

      expect(axe?.preuve).toBeTruthy()
      expect(screen.getByText(axe?.preuve as string)).not.toBeNull()
    }
  })

  it('n’écrit aucun énoncé de preuve dans le contenu de l’accueil', () => {
    const enonces = offres
      .flatMap((offre) => offre.axes)
      .map((axe) => axe.preuve)
      .filter((preuve): preuve is string => preuve !== null)
    const contenuAccueil = JSON.stringify(accueil)

    for (const enonce of enonces) {
      expect(contenuAccueil).not.toContain(enonce)
    }
  })
})
