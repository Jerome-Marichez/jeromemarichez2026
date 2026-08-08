/**
 * Intention (écriture déléguée par Jérôme MARICHEZ le 2026-08-08 — issue #24) :
 * la page de contact affiche l'URL d'un profil public SANS jamais la réécrire. La règle
 * qu'on protège ici est celle de `identite.ts` : « un sameAs erroné rattache l'identité du
 * site à un tiers, ce qui est pire que l'absence de sameAs ». Recopier l'URL LinkedIn
 * dans le contenu de la page aurait créé une seconde vérité, qui aurait divergé.
 *
 * Comportement attendu :
 * 1. une référence est rapprochée d'une URL par comparaison d'HÔTE, pas par sous-chaîne :
 *    `includes('linkedin')` accepterait `https://linkedin.attaquant.example` ;
 * 2. une référence qui ne désigne aucune URL LÈVE — au build, donc — au lieu de faire
 *    disparaître silencieusement une coordonnée de la page ;
 * 3. une référence qui en désigne DEUX lève aussi : choisir la première publierait une
 *    coordonnée au hasard ;
 * 4. l'ordre de sortie est celui des références, pas celui des URL : l'ordre d'affichage
 *    est un choix éditorial ;
 * 5. le libellé affiché est DÉRIVÉ de l'URL — hôte et chemin, sans protocole ni barre
 *    finale — et jamais rédigé à la main.
 *
 * Cas limites couverts : hôte présent en sous-chaîne d'un autre domaine ; deux URL sur le
 * même hôte ; une URL racine (aucun chemin à afficher) ; une URL avec barre finale ; une
 * chaîne qui n'est pas une URL absolue.
 *
 * Niveau : unitaire (fonction pure).
 * Jeu de données : le contenu réel (`contactPage.coordonnees.profils` contre
 * `identite.profilsPublics`) et des jeux construits dans le test pour les cas limites.
 */
import { contactPage, identite } from '@/content'
import type { IReferenceProfil } from '@/interfaces/profil-public'
import { resoudreProfils } from '@/services/profils.service'

const LINKEDIN: IReferenceProfil = { cle: 'linkedin', nom: 'LinkedIn', hote: 'www.linkedin.com' }

describe('rapprochement par hôte', () => {
  it('résout une référence contre l’URL publique qui porte cet hôte', () => {
    const [profil] = resoudreProfils([LINKEDIN], ['https://www.linkedin.com/in/jerome'])

    expect(profil?.url).toBe('https://www.linkedin.com/in/jerome')
    expect(profil?.nom).toBe('LinkedIn')
  })

  it('ne se laisse pas prendre par un hôte qui contient le nom du réseau', () => {
    expect(() =>
      resoudreProfils([LINKEDIN], ['https://linkedin.attaquant.example/in/jerome']),
    ).toThrow(/aucune URL publique/)
  })

  it('ne confond pas un sous-domaine avec l’hôte déclaré', () => {
    expect(() => resoudreProfils([LINKEDIN], ['https://fr.www.linkedin.com/in/x'])).toThrow(
      /aucune URL publique/,
    )
  })

  it('lève quand aucune URL ne correspond, au lieu de retirer la coordonnée', () => {
    expect(() => resoudreProfils([LINKEDIN], ['https://github.com/Jerome-Marichez'])).toThrow(
      /Profil « linkedin »/,
    )
  })

  it('lève quand deux URL correspondent, au lieu d’en choisir une au hasard', () => {
    expect(() =>
      resoudreProfils(
        [LINKEDIN],
        ['https://www.linkedin.com/in/premier', 'https://www.linkedin.com/in/second'],
      ),
    ).toThrow(/2 URL publiques/)
  })

  it('ignore une chaîne qui n’est pas une URL absolue plutôt que de lever à côté', () => {
    expect(() => resoudreProfils([LINKEDIN], ['pas-une-url'])).toThrow(/aucune URL publique/)
  })
})

describe('ordre et libellé', () => {
  it('rend les profils dans l’ordre des références, pas dans celui des URL', () => {
    const references: readonly IReferenceProfil[] = [
      LINKEDIN,
      { cle: 'github', nom: 'GitHub', hote: 'github.com' },
    ]
    const resolus = resoudreProfils(references, [
      'https://github.com/Jerome-Marichez',
      'https://www.linkedin.com/in/jerome',
    ])

    expect(resolus.map((profil) => profil.cle)).toEqual(['linkedin', 'github'])
  })

  it('dérive le libellé de l’URL : hôte et chemin, sans protocole', () => {
    const [profil] = resoudreProfils([LINKEDIN], ['https://www.linkedin.com/in/jerome-31948712b'])

    expect(profil?.libelle).toBe('www.linkedin.com/in/jerome-31948712b')
  })

  it('retire la barre oblique finale du libellé', () => {
    const [profil] = resoudreProfils([LINKEDIN], ['https://www.linkedin.com/in/jerome/'])

    expect(profil?.libelle).toBe('www.linkedin.com/in/jerome')
  })

  it('n’affiche que l’hôte quand l’URL n’a pas de chemin', () => {
    const [profil] = resoudreProfils(
      [{ cle: 'x', nom: 'X', hote: 'exemple.fr' }],
      ['https://exemple.fr/'],
    )

    expect(profil?.libelle).toBe('exemple.fr')
  })
})

describe('contenu réel du dépôt', () => {
  it('résout tous les profils de la page de contact sans lever', () => {
    const resolus = resoudreProfils(contactPage.coordonnees.profils, identite.profilsPublics)

    expect(resolus).toHaveLength(contactPage.coordonnees.profils.length)
    for (const profil of resolus) {
      expect(identite.profilsPublics).toContain(profil.url)
      expect(profil.url.startsWith('https://')).toBe(true)
    }
  })

  it('n’écrit aucune URL de profil dans le contenu de la page de contact', () => {
    const contenu = JSON.stringify(contactPage)

    for (const url of identite.profilsPublics) {
      expect(contenu).not.toContain(url)
    }
    expect(contenu).not.toContain('https://')
  })
})
