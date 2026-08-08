/**
 * Intention (écriture déléguée par Jérôme MARICHEZ le 2026-08-08 — issue #26) :
 * l'ORDRE des axes de l'offre « Data & IA » est le message, pas une mise en page.
 * L'offre s'ouvre sur la FIABILITÉ des données, puis sur leur QUALIFICATION selon
 * l'usage visé, et SEULEMENT ENSUITE sur les deux volets. Cet ordre distingue Jérôme de
 * qui vend l'IA d'abord et découvre ensuite que la donnée du client est inexploitable :
 * l'inverser pour gagner en effet d'annonce changerait le discours (précisions de
 * Jérôme MARICHEZ, 2026-08-08 — issue #16).
 *
 * Le découpage en volets est une DONNÉE (`IAxeOffre.volet`), pas une convention de
 * nommage ni un regroupement calculé par le rendu : un axe sans `volet` appartient au
 * socle commun aux deux volets.
 *
 * Cas limites couverts : les axes d'un même volet restent contigus (sans quoi le rendu
 * devrait regrouper, donc réordonner) ; l'offre est entièrement sur devis et ne publie
 * AUCUN montant chiffré ; le RAG est revendiqué comme technique maison, sans framework.
 *
 * Niveau : unitaire (données pures).
 * Jeu de données : le contenu réel de l'offre Data & IA du dépôt.
 */
import { offreDataIa } from '@/content'

const cles = offreDataIa.axes.map((axe) => axe.cle)
const volets = offreDataIa.axes.map((axe) => axe.volet)

describe('offre Data & IA — identité', () => {
  it('porte la clé et le titre arbitrés', () => {
    expect(offreDataIa.cle).toBe('data-ia')
    expect(offreDataIa.titre).toBe('Data & IA')
  })

  it('se termine sur une décision, pas sur une liste d’outils', () => {
    expect(offreDataIa.decisionPermise).toMatch(/vous décidez/i)
  })
})

describe('ordre de lecture des axes', () => {
  it('ouvre sur la fiabilité des données, avant toute promesse d’IA', () => {
    expect(cles[0]).toBe('fiabilite-donnees')
  })

  it('enchaîne sur la qualification selon l’usage visé', () => {
    expect(cles[1]).toBe('qualification-donnees')
  })

  it('place les deux axes de préalable avant tout axe rattaché à un volet', () => {
    const premierAxeDeVolet = volets.findIndex((volet) => volet !== undefined)

    expect(premierAxeDeVolet).toBeGreaterThan(1)
  })

  it('traite la fiabilité comme un prérequis, jamais comme un correctif', () => {
    const fiabilite = offreDataIa.axes.find((axe) => axe.cle === 'fiabilite-donnees')

    expect(fiabilite?.description).toMatch(/prérequis/)
    expect(fiabilite?.description).toMatch(/jamais un correctif/)
  })

  it('distingue trois usages dans la qualification des données', () => {
    const qualification = offreDataIa.axes.find((axe) => axe.cle === 'qualification-donnees')

    expect(qualification?.description).toMatch(/marketing/i)
    expect(qualification?.description).toMatch(/LLM/)
    expect(qualification?.description).toMatch(/prédictifs/)
  })
})

describe('les deux volets sont portés par la donnée', () => {
  const voletsNommes = [...new Set(volets.filter((volet): volet is string => volet !== undefined))]

  it('déclare exactement deux volets nommés', () => {
    expect(voletsNommes).toHaveLength(2)
    expect(voletsNommes).toEqual(['Agents autonomes', 'Projets data supervisés et non supervisés'])
  })

  it('laisse au socle commun les axes sans volet', () => {
    const socle = offreDataIa.axes.filter((axe) => axe.volet === undefined).map((axe) => axe.cle)

    expect(socle).toEqual([
      'fiabilite-donnees',
      'qualification-donnees',
      'mlops-cloud',
      'conformite',
      'devis',
    ])
  })

  it('garde contigus les axes d’un même volet, pour que le rendu n’ait rien à regrouper', () => {
    const sequence = volets.filter((volet): volet is string => volet !== undefined)
    const apparitions = sequence.filter((volet, index) => volet !== sequence[index - 1])

    expect(new Set(apparitions).size).toBe(apparitions.length)
  })

  it('rattache chaque volet à au moins deux axes', () => {
    for (const volet of voletsNommes) {
      expect(offreDataIa.axes.filter((axe) => axe.volet === volet).length).toBeGreaterThanOrEqual(2)
    }
  })
})

describe('véracité propre à l’offre', () => {
  it('revendique un RAG maison, sans framework tiers', () => {
    const rag = offreDataIa.axes.find((axe) => axe.cle === 'rag-documentaire')

    expect(rag?.description).toMatch(/PostgreSQL/)
    expect(rag?.description).toMatch(/sans framework tiers/)
  })

  it('est entièrement sur devis et ne publie aucun montant', () => {
    const devis = offreDataIa.axes.find((axe) => axe.cle === 'devis')

    expect(devis?.description).toMatch(/entièrement sur devis/)
    expect(JSON.stringify(offreDataIa)).not.toMatch(/\d\s?(€|EUR)/)
  })

  it('nomme Prézage et Llama 3, autorisés, sans publier de chiffre couvert par le NDA', () => {
    const adaptation = offreDataIa.axes.find((axe) => axe.cle === 'adaptation-modeles')

    expect(adaptation?.description).toMatch(/Llama 3/)
    expect(adaptation?.description).toMatch(/Prézage/)
    expect(adaptation?.preuve).not.toMatch(/\d+\s?%/)
  })
})
