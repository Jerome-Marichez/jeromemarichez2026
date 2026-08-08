/**
 * Intention (écriture déléguée par Jérôme MARICHEZ le 2026-08-08 — issue #29) :
 * un montant publié ne peut PAS se détacher de sa mention fiscale, et une ligne sans
 * montant ne peut PAS afficher de chiffre. C'est le premier engagement commercial
 * chiffré du site : un prix ambigu se paie au premier échange avec un prospect.
 *
 * La garantie tient en deux moitiés, et les deux sont vérifiées ici :
 * - `Montant` interdit d'ÉCRIRE un chiffre sans mention fiscale — le schéma Zod le
 *   rejoue au chargement pour ce que le typage ne peut pas rattraper (donnée construite
 *   dynamiquement, contournement d'un `as`) ;
 * - `formaterMontant` interdit de l'AFFICHER sans elle : le chiffre et sa mention
 *   sortent d'un seul et même gabarit, dans la même chaîne, jamais reléguée en note de
 *   bas de page par une mise en page ou perdue par un rendu partiel.
 *
 * Cas limites couverts, côté schéma : borne haute INFÉRIEURE à la borne basse ; bornes
 * ÉGALES — une fourchette dont les deux bornes coïncident n'est pas une estimation mais
 * un prix ferme déguisé ; fourchette sans `mentionFiscale` ; mention fiscale `HT`,
 * contraire à l'arbitrage du 2026-08-08 ; `mentionFiscale` ou `minimum` glissés sur une
 * ligne SANS montant (`inclus`, `sur-devis`) ; montant nul, négatif ou à centimes ; clé
 * en majuscules ; condition d'application vide.
 *
 * Cas limites couverts, côté mise en forme : les deux périodicités pour chacune des
 * natures concernées ; groupement des milliers ; et la propriété qui compte —
 * tout texte de montant contenant un chiffre contient sa mention TTC, tout texte n'en
 * contenant pas ne contient aucun chiffre.
 *
 * Niveau : unitaire (schéma et fonction pure).
 * Jeu de données : la grille réelle du dépôt, et des montants dérivés d'elle pour les
 * refus. Aucun chiffre n'est inventé au-delà de ceux nécessaires au groupement des
 * milliers, qui ne sont pas des prix publiés.
 */
import { grilleTarifaireSea } from '@/content'
import type { Montant } from '@/interfaces/types'
import { montantSchema, tarifSchema } from '@/schemas/tarif.schema'
import { formaterMontant } from '@/utils/tarif'

/** La fourchette réellement publiée, lue dans la grille et jamais réécrite ici. */
const fourchettePubliee = grilleTarifaireSea.lignes
  .map((ligne) => ligne.montant)
  .find((montant): montant is Extract<Montant, { nature: 'fourchette' }> => {
    return montant.nature === 'fourchette'
  })

const LIGNE_VALIDE = {
  cle: 'mise-en-place-site-existant',
  intitule: 'Mise en place de la solution data-driven',
  condition: 'sur un site existant, que je n’ai pas conçu',
  montant: { ...fourchettePubliee },
}

describe('formaterMontant — les trois cas de la grille validée', () => {
  it('rend « Incluse » pour une prestation comprise dans une autre', () => {
    expect(formaterMontant({ nature: 'inclus' })).toBe('Incluse')
  })

  it('colle le chiffre, sa mention, son rythme et ce qui le fait varier', () => {
    expect(formaterMontant(fourchettePubliee as Montant)).toBe(
      '300 à 1 200 € TTC, une seule fois, selon le périmètre',
    )
  })

  it('rend « Forfait mensuel, sur devis » pour un montant non chiffré mensuel', () => {
    expect(formaterMontant({ nature: 'sur-devis', periodicite: 'mensuel' })).toBe(
      'Forfait mensuel, sur devis',
    )
  })

  it('rend « Forfait unique, sur devis » pour un montant non chiffré ponctuel', () => {
    expect(formaterMontant({ nature: 'sur-devis', periodicite: 'une-seule-fois' })).toBe(
      'Forfait unique, sur devis',
    )
  })

  it('dit « par mois » à la suite d’un prix mensuel, et non « Forfait mensuel »', () => {
    const mensuel = { ...fourchettePubliee, periodicite: 'mensuel' } as Montant

    expect(formaterMontant(mensuel)).toContain('par mois')
    expect(formaterMontant(mensuel)).not.toContain('Forfait')
  })
})

describe('formaterMontant — groupement des milliers', () => {
  it.each([
    [300, '300'],
    [1200, '1 200'],
    [12000, '12 000'],
    [120000, '120 000'],
    [1200000, '1 200 000'],
  ])('groupe %s en « %s »', (maximum, attendu) => {
    const montant = { ...fourchettePubliee, minimum: 1, maximum } as Montant

    expect(formaterMontant(montant)).toContain(`${attendu} € TTC`)
  })

  it('groupe par espace ordinaire, jamais par une espace insécable invisible', () => {
    const montant = { ...fourchettePubliee, minimum: 1, maximum: 12000 } as Montant

    expect(formaterMontant(montant)).not.toMatch(/[  ]/)
  })
})

describe('la mention fiscale ne se détache jamais du chiffre', () => {
  it.each(grilleTarifaireSea.lignes.map((ligne) => [ligne.cle, ligne] as const))(
    'ligne « %s » : tout chiffre affiché porte sa mention TTC',
    (_cle, ligne) => {
      const texte = formaterMontant(ligne.montant)

      if (/\d/.test(texte)) {
        expect(texte).toContain('TTC')
        expect(texte).toContain('€')
      }
    },
  )

  it.each(grilleTarifaireSea.lignes.map((ligne) => [ligne.cle, ligne] as const))(
    'ligne « %s » : sans montant chiffré, aucun chiffre n’est affiché',
    (_cle, ligne) => {
      const texte = formaterMontant(ligne.montant)

      if (ligne.montant.nature !== 'fourchette') {
        expect(texte).not.toMatch(/\d/)
        expect(texte).not.toContain('€')
        expect(texte).not.toContain('TTC')
      }
    },
  )

  it('affiche la mention DANS la même chaîne que le prix, jamais après une coupure', () => {
    const texte = formaterMontant(fourchettePubliee as Montant)
    const positionMention = texte.indexOf('TTC')
    const positionDernierChiffre = texte.search(/\d(?!.*\d)/s)

    expect(positionMention).toBeGreaterThan(positionDernierChiffre)
    expect(positionMention - positionDernierChiffre).toBeLessThanOrEqual(4)
  })

  it('publie au moins une ligne chiffrée — sans quoi la propriété serait vide', () => {
    const chiffrees = grilleTarifaireSea.lignes.filter(
      (ligne) => ligne.montant.nature === 'fourchette',
    )

    expect(chiffrees.length).toBeGreaterThanOrEqual(1)
  })
})

describe('le schéma refuse au chargement ce que le typage refuse à la compilation', () => {
  it('accepte la fourchette réellement publiée', () => {
    expect(() => montantSchema.parse(fourchettePubliee)).not.toThrow()
  })

  it('refuse une borne haute inférieure à la borne basse', () => {
    expect(() =>
      montantSchema.parse({ ...fourchettePubliee, minimum: 1200, maximum: 300 }),
    ).toThrow(/borne haute/i)
  })

  it('refuse deux bornes égales — un prix ferme déguisé en estimation', () => {
    expect(() => montantSchema.parse({ ...fourchettePubliee, minimum: 300, maximum: 300 })).toThrow(
      /borne haute/i,
    )
  })

  it('refuse un montant chiffré sans mention fiscale', () => {
    const { mentionFiscale: _retiree, ...sansMention } = {
      ...fourchettePubliee,
    } as Record<string, unknown>

    expect(() => montantSchema.parse(sansMention)).toThrow()
  })

  it('refuse une mention fiscale hors taxes, contraire à l’arbitrage rendu', () => {
    expect(() => montantSchema.parse({ ...fourchettePubliee, mentionFiscale: 'HT' })).toThrow()
  })

  it('refuse une mention fiscale sur une ligne incluse, qui n’a aucun montant à taxer', () => {
    expect(() => montantSchema.parse({ nature: 'inclus', mentionFiscale: 'TTC' })).toThrow()
  })

  it('refuse une mention fiscale sur une ligne sur devis', () => {
    expect(() =>
      montantSchema.parse({ nature: 'sur-devis', periodicite: 'mensuel', mentionFiscale: 'TTC' }),
    ).toThrow()
  })

  it('refuse un chiffre glissé sur une ligne sans montant', () => {
    expect(() => montantSchema.parse({ nature: 'inclus', minimum: 300 })).toThrow()
  })

  it('refuse une fourchette sans ce qui la fait varier', () => {
    expect(() => montantSchema.parse({ ...fourchettePubliee, variableSelon: '' })).toThrow()
  })

  it('refuse une fourchette sans périodicité, qui laisserait croire à un abonnement', () => {
    const { periodicite: _retiree, ...sansRythme } = {
      ...fourchettePubliee,
    } as Record<string, unknown>

    expect(() => montantSchema.parse(sansRythme)).toThrow()
  })

  it.each([0, -300, 300.5])(
    'refuse un montant « %s », qui n’est pas un prix publiable',
    (borne) => {
      expect(() => montantSchema.parse({ ...fourchettePubliee, minimum: borne })).toThrow()
    },
  )

  it('refuse une nature de montant qui n’existe pas', () => {
    expect(() => montantSchema.parse({ nature: 'gratuit' })).toThrow()
  })
})

describe('le schéma d’une ligne tarifaire', () => {
  it('accepte une ligne conforme à celle publiée', () => {
    expect(() => tarifSchema.parse(LIGNE_VALIDE)).not.toThrow()
  })

  it('refuse une condition d’application vide, qui ferait deviner le prospect', () => {
    expect(() => tarifSchema.parse({ ...LIGNE_VALIDE, condition: '' })).toThrow()
  })

  it('refuse un intitulé vide', () => {
    expect(() => tarifSchema.parse({ ...LIGNE_VALIDE, intitule: '' })).toThrow()
  })

  it.each(['Mise-En-Place', 'mise en place', 'mise_en_place', ''])(
    'refuse la clé « %s », hors du format minuscules-chiffres-tirets',
    (cle) => {
      expect(() => tarifSchema.parse({ ...LIGNE_VALIDE, cle })).toThrow()
    },
  )

  it('refuse une clé inconnue ajoutée à la ligne', () => {
    expect(() => tarifSchema.parse({ ...LIGNE_VALIDE, remise: '10 %' })).toThrow()
  })
})
