/**
 * Intention (écriture déléguée par Jérôme MARICHEZ le 2026-08-08 — issue #26) :
 * un numéro français national se convertit en E.164 sans jamais produire une chaîne
 * plausible mais injoignable, et les schémas d'identité REFUSENT réellement ce qu'ils
 * prétendent refuser. Le `0` initial est un préfixe national d'acheminement : il
 * disparaît derrière l'indicatif pays, il n'est pas « juste » un espace en moins.
 *
 * Cas limites couverts : numéro collé sans espaces, préfixe `00`, paire manquante ou en
 * trop, numéro déjà en E.164 passé par erreur, séparateurs autres que l'espace, chaîne
 * vide ; e-mail sans arobase ; profil public en HTTP au lieu de HTTPS ; code pays en
 * minuscules ; description de site hors des bornes SEO ; clé inconnue rejetée par
 * `z.strictObject`.
 *
 * Le motif qui VALIDE est celui qui autorise la CONVERSION : un format et son contrôle
 * ne peuvent pas diverger puisqu'ils sont écrits une seule fois (`utils/telephone.ts`).
 *
 * Niveau : unitaire (fonction pure et schémas Zod).
 * Jeu de données : le contenu réel `identite` du dépôt, et des valeurs limites écrites
 * dans le test pour les refus.
 */

import { identite } from '@/content'
import { contactSchema } from '@/schemas/contact.schema'
import { identiteSchema } from '@/schemas/identite.schema'
import { INDICATIF_FRANCE, TELEPHONE_NATIONAL_FR, telephoneVersE164 } from '@/utils/telephone'

/** Contact valide de référence : chaque cas limite n'en fait varier qu'un champ. */
const CONTACT_VALIDE = { email: 'contact@example.org', telephone: '07 71 65 15 88' } as const

describe('telephoneVersE164', () => {
  it('convertit un numéro national en E.164 en absorbant le préfixe d’acheminement', () => {
    expect(telephoneVersE164('07 71 65 15 88')).toBe('+33771651588')
  })

  it('convertit le numéro réellement publié par le site', () => {
    expect(telephoneVersE164(identite.contact.telephone)).toBe(
      `${INDICATIF_FRANCE}${identite.contact.telephone.replace(/ /g, '').slice(1)}`,
    )
  })

  it('produit toujours l’indicatif France suivi de neuf chiffres', () => {
    expect(telephoneVersE164('01 23 45 67 89')).toMatch(/^\+33\d{9}$/)
  })

  it('ne conserve aucun espace dans le résultat', () => {
    expect(telephoneVersE164('06 12 34 56 78')).not.toMatch(/\s/)
  })

  it.each([
    ['numéro collé sans espaces', '0771651588'],
    ['préfixe 00 non attribué', '00 71 65 15 88'],
    ['paire manquante', '07 71 65 15'],
    ['paire en trop', '07 71 65 15 88 99'],
    ['chiffre isolé dans une paire', '07 71 65 15 8'],
    ['déjà en E.164', '+33771651588'],
    ['séparateurs par points', '07.71.65.15.88'],
    ['séparateurs par tirets', '07-71-65-15-88'],
    ['chaîne vide', ''],
    ['texte', 'zéro sept soixante et onze'],
  ])('refuse un %s plutôt que de produire un numéro injoignable', (_cas, valeur) => {
    expect(() => telephoneVersE164(valeur)).toThrow(/Numéro français attendu/)
  })

  it('valide et convertit sur le même motif', () => {
    expect(TELEPHONE_NATIONAL_FR.test(identite.contact.telephone)).toBe(true)
    expect(() => telephoneVersE164(identite.contact.telephone)).not.toThrow()
  })
})

describe('contactSchema', () => {
  it('accepte les coordonnées réellement publiées', () => {
    expect(() => contactSchema.parse(identite.contact)).not.toThrow()
  })

  it.each([
    ['e-mail sans arobase', { email: 'contact.example.org' }],
    ['e-mail sans domaine', { email: 'contact@' }],
    ['e-mail vide', { email: '' }],
    ['téléphone collé', { telephone: '0771651588' }],
    ['téléphone international', { telephone: '+33 7 71 65 15 88' }],
    ['téléphone tronqué', { telephone: '07 71 65' }],
  ])('refuse un %s', (_cas, surcharge) => {
    expect(() => contactSchema.parse({ ...CONTACT_VALIDE, ...surcharge })).toThrow()
  })

  it('refuse une clé inconnue plutôt que de l’ignorer', () => {
    expect(() => contactSchema.parse({ ...CONTACT_VALIDE, adresse: '3 rue de Lille' })).toThrow()
  })
})

describe('identiteSchema', () => {
  it('accepte l’identité réellement publiée', () => {
    expect(() => identiteSchema.parse(identite)).not.toThrow()
  })

  it.each([
    ['profil public en HTTP', { profilsPublics: ['http://github.com/Jerome-Marichez'] }],
    ['profil public qui n’est pas une URL', { profilsPublics: ['Jerome-Marichez'] }],
    ['code pays en minuscules', { codePays: 'fr' }],
    ['code pays sur trois lettres', { codePays: 'FRA' }],
    ['description de site trop courte', { descriptionSite: 'Trop court.' }],
    ['description de site trop longue', { descriptionSite: 'a'.repeat(161) }],
    ['nom vide', { nom: '' }],
  ])('refuse une %s', (_cas, surcharge) => {
    expect(() => identiteSchema.parse({ ...identite, ...surcharge })).toThrow()
  })

  it('refuse une adresse postale, qui n’est pas une donnée établie', () => {
    expect(() => identiteSchema.parse({ ...identite, adresse: '3 rue de Lille' })).toThrow()
  })

  it('n’expose que des profils publics en HTTPS', () => {
    for (const profil of identite.profilsPublics) {
      expect(profil.startsWith('https://')).toBe(true)
    }
  })

  it('classe l’anglais sous les langues, avec son référentiel et son évaluateur', () => {
    const anglais = identite.langues.find((langue) => langue.code === 'en')

    expect(anglais?.nom).toBe('Anglais')
    expect(anglais?.referentiel).toBe('CECRL')
    expect(anglais?.evaluePar).toBe('EF SET')
  })

  it('donne à chaque langue une étiquette BCP 47 exploitable', () => {
    for (const langue of identite.langues) {
      expect(langue.code).toMatch(/^[a-z]{2}(-[A-Z]{2})?$/)
      expect(langue.niveau.length).toBeGreaterThan(0)
      expect(langue.referentiel.length).toBeGreaterThan(0)
    }
  })
})
