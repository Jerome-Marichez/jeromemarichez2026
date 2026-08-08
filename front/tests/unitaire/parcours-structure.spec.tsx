/**
 * Intention (écriture déléguée par Jérôme MARICHEZ le 2026-08-08 — issue #23) :
 * la page parcours RENDUE tient les garanties que la donnée seule ne prouve pas, et
 * n'altère RIEN de ce qu'elle affiche. C'est la page que lisent un prospect qui hésite et
 * un recruteur : une réécriture d'intitulé y serait une affirmation fausse sur un
 * historique professionnel.
 *
 * Comportement attendu :
 * 1. un seul `h1`, et c'est le titre de la page ; aucun saut de niveau de titre ;
 * 2. LES INTITULÉS DE POSTE SONT RENDUS À L'IDENTIQUE des CV — caractère pour caractère,
 *    sans reformulation, sans troncature et sans transformation de casse. Le rendu doit
 *    donc contenir un titre dont le texte est STRICTEMENT égal à `experience.intitule` ;
 * 3. l'ordre d'affichage est celui du contenu, et il est bien ANTICHRONOLOGIQUE : les
 *    années de début décroissent strictement d'une expérience à la suivante ;
 * 4. tous les faits de chaque expérience sont affichés — un fait déclaré et non rendu
 *    serait une preuve perdue, et la ligne éditoriale veut qu'une affirmation porte la
 *    sienne ;
 * 5. formations et certifications sont affichées ;
 * 6. l'IMAGE est servie en formats modernes, tailles responsives et DIMENSIONS
 *    DÉCLARÉES : `width` et `height` sont ceux du fichier réellement pointé par `src`,
 *    faute de quoi la place réservée est fausse et la page saute au chargement ;
 * 7. le texte alternatif DÉCRIT l'image : il n'est ni vide, ni un intitulé creux
 *    (« image », « photo », « illustration »), ni le titre de la page recopié ;
 * 8. l'illustration reste tracée comme un PLACEHOLDER avec sa provenance — c'est ce qui
 *    empêche l'image d'emprunt de rester en ligne sans que personne ne s'en souvienne ;
 * 9. toutes les régions sont nommées, et aucun lien n'est sans nom accessible.
 *
 * Cas limites couverts : une expérience dont l'intitulé contient un séparateur typo-
 * graphique (« · ») qu'une mise en forme pourrait manger ; une certification sans année ;
 * la déclinaison de repli qui doit être la PLUS LARGE et non la première déclarée.
 *
 * Niveau : unitaire (React Testing Library, jsdom) — la vue et les utilitaires réels
 * collaborent, aucune doublure de module.
 * Jeu de données : le contenu réel du dépôt, celui que sert la page « /parcours ».
 */
import { render, screen } from '@testing-library/react'
import { certifications, experiences, formations, parcoursPage } from '@/content'
import { declinaisonDeRepli } from '@/utils/image'
import { ParcoursView } from '@/views/parcours/ParcoursView'

const rendu = () => render(<ParcoursView />).container

/** Texte accessible d'un élément, espaces normalisés comme le fait un lecteur d'écran. */
const nom = (element: Element): string => (element.textContent ?? '').replace(/\s+/g, ' ').trim()

describe('plan du document', () => {
  it('ne porte qu’un seul h1, et c’est le titre de la page', () => {
    const titres = rendu().querySelectorAll('h1')

    expect(titres).toHaveLength(1)
    expect(nom(titres[0] as Element)).toBe(parcoursPage.entete.titre)
  })

  it('n’enchaîne aucun saut de niveau de titre', () => {
    const niveaux = [...rendu().querySelectorAll('h1, h2, h3, h4, h5, h6')].map((titre) =>
      Number(titre.tagName.slice(1)),
    )

    expect(niveaux[0]).toBe(1)
    for (const [index, niveau] of niveaux.entries()) {
      if (index > 0) {
        expect(niveau).toBeLessThanOrEqual((niveaux[index - 1] as number) + 1)
      }
    }
  })

  it('nomme chacune des régions de la page par son propre titre', () => {
    rendu()
    const regions = screen.getAllByRole('region')

    expect(regions).toHaveLength(5)
    for (const region of regions) {
      expect(region.getAttribute('aria-labelledby')).toBeTruthy()
    }
    for (const titre of [
      parcoursPage.entete.titre,
      parcoursPage.titreExperiences,
      parcoursPage.titreFormations,
      parcoursPage.titreCertifications,
      parcoursPage.contact.titre,
    ]) {
      expect(screen.getByRole('region', { name: titre })).not.toBeNull()
    }
  })

  it('donne un nom accessible à chaque lien', () => {
    for (const lien of rendu().querySelectorAll('a')) {
      expect(nom(lien)).not.toBe('')
    }
  })
})

describe('les intitulés de poste ne sont jamais réécrits', () => {
  it('rend chaque intitulé caractère pour caractère, tel qu’il est dans le contenu', () => {
    rendu()

    for (const experience of experiences) {
      const titre = screen.getByRole('heading', { name: experience.intitule })

      // `textContent` brut et non normalisé : une transformation de casse, une troncature
      // ou un séparateur avalé se verrait ici et nulle part ailleurs.
      expect(titre.textContent).toBe(experience.intitule)
    }
  })

  it('affiche l’employeur et le secteur de chaque expérience', () => {
    rendu()

    for (const experience of experiences) {
      expect(screen.getAllByText(experience.employeur).length).toBeGreaterThan(0)
      expect(screen.getAllByText(experience.secteur).length).toBeGreaterThan(0)
    }
  })

  it('affiche la période de chaque expérience, bornes comprises', () => {
    const texte = nom(rendu())

    for (const experience of experiences) {
      expect(texte).toContain(String(experience.anneeDebut))
      expect(texte).toContain(String(experience.anneeFin))
    }
  })
})

describe('ordre antichronologique', () => {
  it('affiche les expériences dans l’ordre du contenu, sans les retrier', () => {
    const rendus = [...rendu().querySelectorAll('h3')].map((titre) => titre.textContent)
    const attendus = experiences.map((experience) => experience.intitule)

    expect(rendus.slice(0, attendus.length)).toEqual(attendus)
  })

  it('et cet ordre est bien du plus récent au plus ancien', () => {
    const debuts = experiences.map((experience) => experience.anneeDebut)

    expect(debuts.length).toBeGreaterThan(1)
    for (const [index, debut] of debuts.entries()) {
      if (index > 0) expect(debut).toBeLessThan(debuts[index - 1] as number)
    }
  })
})

describe('rien de ce qui est déclaré n’est perdu au rendu', () => {
  it('affiche tous les faits de toutes les expériences', () => {
    rendu()

    for (const experience of experiences) {
      for (const fait of experience.faits) {
        expect(screen.getByText(fait)).not.toBeNull()
      }
    }
  })

  it('affiche chaque formation avec son niveau, sa ville et son année', () => {
    rendu()

    for (const formation of formations) {
      expect(screen.getByRole('heading', { name: formation.intitule })).not.toBeNull()
      expect(screen.getAllByText(formation.niveau).length).toBeGreaterThan(0)
      expect(screen.getAllByText(formation.ville).length).toBeGreaterThan(0)
      expect(screen.getAllByText(String(formation.annee)).length).toBeGreaterThan(0)
    }
  })

  it('affiche chaque certification', () => {
    rendu()

    for (const certification of certifications) {
      expect(screen.getByRole('heading', { name: certification.intitule })).not.toBeNull()
    }
  })
})

describe('image d’illustration', () => {
  const illustration = parcoursPage.entete.illustration
  const image = () => rendu().querySelector('img') as HTMLImageElement

  it('déclare les dimensions du fichier RÉELLEMENT servi en src', () => {
    const repli = declinaisonDeRepli(illustration)
    const rendue = image()

    expect(rendue.getAttribute('width')).toBe(String(repli.largeur))
    expect(rendue.getAttribute('height')).toBe(String(repli.hauteur))
    expect(rendue.getAttribute('src')).toContain(`-${repli.largeur}.`)
  })

  it('sert un format moderne en priorité, avec un repli', () => {
    const sources = [...rendu().querySelectorAll('source')]

    expect(sources.length).toBeGreaterThan(0)
    expect(sources[0]?.getAttribute('type')).toBe('image/webp')
    expect(image().getAttribute('src')).toMatch(/\.jpg$/)
  })

  it('propose toutes les déclinaisons déclarées, avec leur descripteur de largeur', () => {
    const jeu = rendu().querySelector('source')?.getAttribute('srcSet') ?? ''

    for (const declinaison of illustration.declinaisons) {
      expect(jeu).toContain(`-${declinaison.largeur}.webp ${declinaison.largeur}w`)
    }
  })

  it('déclare la largeur d’affichage, sans quoi la plus grande déclinaison part toujours', () => {
    expect(image().getAttribute('sizes')).toBe(illustration.tailles)
    expect(rendu().querySelector('source')?.getAttribute('sizes')).toBe(illustration.tailles)
  })

  it('décrit l’image plutôt que de la nommer', () => {
    const alt = image().getAttribute('alt') ?? ''

    expect(alt).toBe(illustration.alt)
    expect(alt.length).toBeGreaterThan(40)
    expect(alt.toLowerCase()).not.toMatch(/^(image|photo|illustration|visuel)\b/)
    expect(alt).not.toBe(parcoursPage.entete.titre)
    // Un alt qui décrit énumère : plusieurs mots porteurs, pas une étiquette.
    expect(alt.split(/\s+/).length).toBeGreaterThan(8)
  })

  it('reste tracée comme un placeholder, avec sa licence et sa provenance', () => {
    expect(illustration.placeholder).toBe(true)
    expect(illustration.licence).toMatch(/Unsplash/i)
    expect(illustration.provenance).toMatch(/Unsplash/i)
    expect(illustration.provenance.length).toBeGreaterThan(20)
  })

  it('ne diffère pas le chargement d’une image visible d’emblée', () => {
    expect(image().getAttribute('loading')).toBe('eager')
  })
})
