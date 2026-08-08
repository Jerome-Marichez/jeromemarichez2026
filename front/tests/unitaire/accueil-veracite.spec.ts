/**
 * Intention (écriture déléguée par Jérôme MARICHEZ le 2026-08-08 — issue #29) :
 * le fil rouge e-commerce de la page d'accueil est un SCÉNARIO ILLUSTRATIF, et rien
 * n'autorise à le lire comme une étude de cas. Jérôme n'a aucune référence client
 * publiable et n'a jamais mené cette chaîne entière chez un même e-commerçant — le
 * taggage relève de la période Acetelecom / MailingVox, l'e-commerce de la période
 * Verhoeven Joaillier. L'avertissement qui le dit est donc OBLIGATOIRE ET NON VIDE dans
 * le schéma : l'exigence est dans le type, pas dans la vigilance du prochain rédacteur.
 *
 * Le schéma est vérifié pour ce qu'il REFUSE, jamais seulement pour ce qu'il accepte :
 * un schéma qui accepte tout ne protège rien. Le contenu étant validé au chargement du
 * module, un refus casse le BUILD et n'atteint jamais la production.
 *
 * Cas limites couverts : avertissement absent (clé retirée) ; avertissement vide ;
 * étiquette d'avertissement vide ; clé inconnue glissée dans la section (`strictObject`) ;
 * chaîne réduite à un seul maillon ; maillon rattaché à aucune offre ; clé d'offre hors
 * des trois publiées ; point d'entrée sans lien ni étape ; section de preuves sans
 * référence ; libellé d'action vide, qui rendrait un lien sans nom accessible.
 *
 * LIMITE DITE FRANCHEMENT : `z.string().min(1)` refuse la chaîne vide, pas une chaîne
 * d'espaces. Le caractère substantiel de l'avertissement n'est donc pas garanti par le
 * schéma — il est vérifié ici sur le contenu réel, et sa présence à l'écran l'est par
 * `accueil-structure.spec.tsx`.
 *
 * Niveau : unitaire (schéma et données pures).
 * Jeu de données : le contenu réel de l'accueil, et des variantes invalides dérivées de
 * lui pour chaque refus.
 */
import { accueil } from '@/content'
import { accueilSchema } from '@/schemas/accueil.schema'

/** Copie profonde du contenu réel : chaque variante part de la donnée publiée. */
const copie = (): Record<string, unknown> =>
  JSON.parse(JSON.stringify(accueil)) as Record<string, unknown>

/** Contenu réel dont la seule section « chaîne » est altérée. */
const avecChaine = (modification: Record<string, unknown>): Record<string, unknown> => {
  const donnees = copie()
  donnees.chaine = { ...(donnees.chaine as Record<string, unknown>), ...modification }

  return donnees
}

/** Contenu réel dont la section « chaîne » perd une clé. */
const sansCleDeChaine = (cle: string): Record<string, unknown> => {
  const donnees = copie()
  const chaine = { ...(donnees.chaine as Record<string, unknown>) }
  delete chaine[cle]
  donnees.chaine = chaine

  return donnees
}

const maillonsPublies = accueil.chaine.maillons
const PUBLIE = JSON.stringify(accueil)
const FIL_ROUGE = JSON.stringify(accueil.chaine)

describe('conformité du contenu réel', () => {
  it('valide la page d’accueil publiée', () => {
    expect(() => accueilSchema.parse(accueil)).not.toThrow()
  })

  it('conserve les huit sections attendues, dans l’ordre de lecture de la page', () => {
    expect(Object.keys(accueil)).toEqual([
      'meta',
      'accroche',
      'chaine',
      'pointsEntree',
      'pourquoi',
      'offres',
      'preuves',
      'contact',
    ])
  })
})

describe('l’avertissement « scénario illustratif » est obligatoire', () => {
  it('refuse une chaîne dont l’avertissement a été retiré', () => {
    expect(() => accueilSchema.parse(sansCleDeChaine('avertissement'))).toThrow()
  })

  it('refuse un avertissement vide', () => {
    expect(() => accueilSchema.parse(avecChaine({ avertissement: '' }))).toThrow()
  })

  it('refuse une étiquette d’avertissement vide', () => {
    expect(() => accueilSchema.parse(avecChaine({ libelleAvertissement: '' }))).toThrow()
  })

  it('refuse une chaîne dont l’étiquette d’avertissement a été retirée', () => {
    expect(() => accueilSchema.parse(sansCleDeChaine('libelleAvertissement'))).toThrow()
  })

  it('accepte le contenu réel, avertissement compris', () => {
    expect(() => accueilSchema.parse(avecChaine({}))).not.toThrow()
  })
})

describe('l’avertissement publié dit ce qui n’a pas eu lieu', () => {
  it('porte un texte substantiel, pas une chaîne d’espaces', () => {
    expect(accueil.chaine.avertissement.trim().length).toBeGreaterThan(80)
  })

  it('annonce le scénario comme illustratif dans son étiquette', () => {
    expect(accueil.chaine.libelleAvertissement).toMatch(/illustratif/i)
  })

  it('nie explicitement le client et la mission, plutôt que de rester vague', () => {
    expect(accueil.chaine.avertissement).toMatch(/aucun client/i)
    expect(accueil.chaine.avertissement).toMatch(/aucune mission/i)
  })

  it('dit que la chaîne entière n’a pas été menée chez un même e-commerçant', () => {
    expect(accueil.chaine.avertissement).toMatch(/pas mené cette chaîne entière/i)
  })

  it('renvoie les compétences aux offres, où elles sont attestées', () => {
    expect(accueil.chaine.avertissement).toMatch(/attestées offre par offre/i)
  })
})

describe('le fil rouge ne se laisse pas lire comme une référence client', () => {
  it.each(['Truffle', 'Verhoeven', 'Acetelecom', 'MailingVox', 'Prézage', 'Sms En Masse'])(
    'ne nomme jamais « %s » dans la chaîne',
    (entreprise) => {
      expect(FIL_ROUGE).not.toContain(entreprise)
    },
  )

  it('ne rattache aucun résultat chiffré au scénario', () => {
    for (const maillon of maillonsPublies) {
      expect(maillon.illustration).not.toMatch(/\d+\s?%/)
      expect(maillon.illustration).not.toMatch(/\d\s?(€|EUR\b)/)
    }
  })

  it('ne raconte pas le scénario au passé composé, qui le donnerait pour advenu', () => {
    for (const maillon of maillonsPublies) {
      expect(maillon.illustration).not.toMatch(/\b(j’ai|j'ai|nous avons)\b/i)
    }
  })

  it('ne dit jamais « chez un client »', () => {
    expect(FIL_ROUGE.toLowerCase()).not.toContain('chez un client')
  })
})

describe('véracité générale de l’accueil publié', () => {
  it('parle à la première personne du singulier, jamais au « nous »', () => {
    expect(PUBLIE).not.toMatch(/\bnous\b/i)
  })

  it('ne publie aucun montant : la tarification vit dans l’offre SEA', () => {
    expect(PUBLIE).not.toContain('€')
    expect(PUBLIE).not.toContain('TTC')
    expect(PUBLIE).not.toMatch(/\bHT\b/)
  })

  it('n’annonce aucun délai de réponse, aucun engagement de ce type n’étant établi', () => {
    expect(PUBLIE).not.toMatch(/sous\s+\d+\s?(h\b|heures|jours)/i)
  })

  it('énonce le constat sur un dispositif, jamais sur des personnes', () => {
    expect(accueil.pourquoi.conclusion).toMatch(/périmètre/i)
    expect(accueil.pourquoi.conclusion).toMatch(/pas de compétence/i)
  })
})

describe('le schéma refuse ce que le typage refuse', () => {
  it('refuse une clé inconnue glissée dans la section « chaîne »', () => {
    expect(() => accueilSchema.parse(avecChaine({ etudeDeCas: 'Boutique X' }))).toThrow()
  })

  it('refuse une chaîne réduite à un seul maillon', () => {
    expect(() => accueilSchema.parse(avecChaine({ maillons: [maillonsPublies[0]] }))).toThrow()
  })

  it('refuse un maillon rattaché à aucune offre', () => {
    const orphelin = { ...maillonsPublies[0], offres: [] }

    expect(() =>
      accueilSchema.parse(avecChaine({ maillons: [orphelin, maillonsPublies[1]] })),
    ).toThrow()
  })

  it('refuse une clé d’offre hors des trois publiées', () => {
    const fantome = { ...maillonsPublies[0], offres: ['seo'] }

    expect(() =>
      accueilSchema.parse(avecChaine({ maillons: [fantome, maillonsPublies[1]] })),
    ).toThrow()
  })

  it.each(['titre', 'role', 'illustration', 'sortie', 'libelleSortie'])(
    'refuse un maillon dont « %s » est vide',
    (champ) => {
      const vide = { ...maillonsPublies[0], [champ]: '' }

      expect(() =>
        accueilSchema.parse(avecChaine({ maillons: [vide, maillonsPublies[1]] })),
      ).toThrow()
    },
  )

  it('refuse une page d’accueil offrant un seul point d’entrée', () => {
    const donnees = copie()
    const section = donnees.pointsEntree as Record<string, unknown>
    donnees.pointsEntree = { ...section, points: [accueil.pointsEntree.points[0]] }

    expect(() => accueilSchema.parse(donnees)).toThrow()
  })

  it('refuse un point d’entrée qui ne mène nulle part', () => {
    const donnees = copie()
    const section = donnees.pointsEntree as Record<string, unknown>
    const [premier, second] = accueil.pointsEntree.points
    donnees.pointsEntree = { ...section, points: [{ ...premier, liens: [] }, second] }

    expect(() => accueilSchema.parse(donnees)).toThrow()
  })

  it('refuse un point d’entrée sans chemin d’étapes', () => {
    const donnees = copie()
    const section = donnees.pointsEntree as Record<string, unknown>
    const [premier, second] = accueil.pointsEntree.points
    donnees.pointsEntree = { ...section, points: [{ ...premier, etapes: [] }, second] }

    expect(() => accueilSchema.parse(donnees)).toThrow()
  })

  it('refuse une section de preuves sans aucune référence', () => {
    const donnees = copie()
    donnees.preuves = { ...(donnees.preuves as Record<string, unknown>), references: [] }

    expect(() => accueilSchema.parse(donnees)).toThrow()
  })

  it('refuse un « pourquoi » sans preuve à l’appui', () => {
    const donnees = copie()
    donnees.pourquoi = { ...(donnees.pourquoi as Record<string, unknown>), references: [] }

    expect(() => accueilSchema.parse(donnees)).toThrow()
  })

  it('refuse un constat réduit à une seule colonne, qui n’opposerait rien', () => {
    const donnees = copie()
    const section = donnees.pourquoi as Record<string, unknown>
    donnees.pourquoi = { ...section, colonnes: [accueil.pourquoi.colonnes[0]] }

    expect(() => accueilSchema.parse(donnees)).toThrow()
  })

  it('refuse une action dont le libellé est vide, qui rendrait un lien sans nom', () => {
    const donnees = copie()
    const section = donnees.contact as Record<string, unknown>
    donnees.contact = { ...section, action: { href: '/contact', libelle: '' } }

    expect(() => accueilSchema.parse(donnees)).toThrow()
  })

  it('refuse une référence de preuve dont l’axe est vide', () => {
    const donnees = copie()
    const section = donnees.preuves as Record<string, unknown>
    donnees.preuves = { ...section, references: [{ offre: 'sea', axe: '' }] }

    expect(() => accueilSchema.parse(donnees)).toThrow()
  })
})
