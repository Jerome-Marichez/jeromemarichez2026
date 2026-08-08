/**
 * Intention (écriture déléguée par Jérôme MARICHEZ le 2026-08-08 — issue #23) :
 * une période d'années s'affiche exactement, et une période impossible ne s'affiche pas.
 * Sur une page de parcours, une date est une affirmation comme une autre : « 2019 – 2017 »
 * publié tel quel ferait douter de tout le reste.
 *
 * Comportement attendu : deux millésimes distincts rendent « début – fin » ; un
 * millésime unique rend l'année seule, sans intervalle qui suggérerait une durée ; une
 * fin antérieure au début lève.
 *
 * Cas limites couverts : début égal à fin ; fin antérieure au début ; le séparateur ne
 * doit pas permettre à la période de se couper en fin de ligne (espaces insécables).
 *
 * Niveau : unitaire (fonction pure).
 * Jeu de données : les périodes réelles de `content/experiences.ts` et des couples
 * construits dans le test pour les cas limites.
 */
import { experiences } from '@/content'
import { formaterPeriode } from '@/utils/periode'

describe('formaterPeriode', () => {
  it('rend « début – fin » pour une période de plusieurs années', () => {
    expect(formaterPeriode(2019, 2022)).toBe('2019 – 2022')
  })

  it('rend l’année seule quand début et fin coïncident', () => {
    expect(formaterPeriode(2022, 2022)).toBe('2022')
  })

  it('lève sur une période qui finit avant de commencer', () => {
    expect(() => formaterPeriode(2022, 2019)).toThrow(/finit avant de commencer/)
  })

  it('sépare par des espaces insécables, pour que la période ne se coupe pas', () => {
    const rendu = formaterPeriode(2017, 2019)

    expect(rendu).toContain(' ')
    expect(rendu).not.toMatch(/ – /)
  })

  it('met en forme chaque période réelle du parcours sans lever', () => {
    for (const experience of experiences) {
      const rendu = formaterPeriode(experience.anneeDebut, experience.anneeFin)

      expect(rendu).toContain(String(experience.anneeDebut))
      expect(rendu).toContain(String(experience.anneeFin))
    }
  })
})
