/**
 * Intention (écriture déléguée par Jérôme MARICHEZ le 2026-08-08 — issue #24) :
 * l'adresse e-mail est OBFUSQUÉE au rendu SANS que personne n'y perde quoi que ce soit.
 * Les deux moitiés comptent autant l'une que l'autre : une obfuscation qui casse le
 * lecteur d'écran, la sélection ou le clavier échange un problème de robots contre un
 * problème d'humains, ce qui est un mauvais échange sur un site qui vend de
 * l'accessibilité.
 *
 * Comportement attendu — la partie « obfuscation » :
 * 1. le `href` servi ne contient AUCUNE adresse lisible : tout est percent-encodé ;
 * 2. le HTML SERVI ne contient aucune sous-chaîne CONTIGUË qui ressemble à une adresse —
 *    c'est ce que cherche un moissonneur qui applique une expression régulière au HTML
 *    brut sans exécuter la page. La vérification porte sur le rendu SERVEUR
 *    (`renderToString`) et non sur le DOM de jsdom : le premier est ce que reçoit un
 *    robot, le second ce que construit un navigateur, et seul le premier est en jeu ;
 *
 * — et la partie « accessibilité », qui est la vraie contrainte :
 * 3. le NOM ACCESSIBLE du lien est l'adresse exacte : c'est ce qu'annonce un lecteur
 *    d'écran, et c'est ce qu'obtient une sélection puis une copie. Aucun leurre n'est
 *    glissé entre les fragments, aucun caractère n'est masqué, l'ordre du DOM est
 *    l'ordre de lecture ;
 * 4. c'est un `a[href]`, donc focalisable et activable au clavier — et non un `span`
 *    animé par un script ;
 * 5. `decodeURIComponent(href)` rend exactement `mailto:<adresse>` : c'est l'opération
 *    que fait le navigateur avant de passer l'URI au client de messagerie. Ce test est
 *    le contrat sur lequel repose « le lien fonctionne vraiment » ;
 * 6. aucun script n'est nécessaire : le composant est pur et rendu côté serveur, ce que
 *    prouve l'absence de tout attribut d'événement dans le balisage produit.
 *
 * Cas limites couverts : découpage sur la DERNIÈRE arobase (une partie locale citée peut
 * légalement en contenir une) ; chaîne sans arobase, arobase en tête ou en fin — refusées
 * bruyamment plutôt que rendues en morceaux plausibles ; caractères « non réservés » que
 * `encodeURIComponent` laisserait passer et qui doivent quand même être encodés.
 *
 * Niveau : unitaire (fonctions pures + React Testing Library). Aucune doublure.
 * Jeu de données : l'adresse réelle du contenu typé (`identite.contact.email`) et des
 * adresses construites dans le test pour les cas limites.
 */
import { render, screen } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { LienEmail } from '@/@shared/components/LienEmail'
import { identite } from '@/content'
import { mailtoObfusque, segmenterEmail } from '@/utils/email'

const EMAIL = identite.contact.email

/** Ce que cherche un moissonneur : une adresse d'un seul tenant dans le texte brut. */
const REGEX_MOISSONNEUR = /[A-Za-z0-9._+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}/g

describe('segmenterEmail', () => {
  it('découpe l’adresse en trois fragments réassemblables à l’identique', () => {
    const { partieLocale, arobase, domaine } = segmenterEmail(EMAIL)

    expect(`${partieLocale}${arobase}${domaine}`).toBe(EMAIL)
    expect(arobase).toBe('@')
  })

  it('découpe sur la DERNIÈRE arobase, jamais sur la première', () => {
    const { partieLocale, domaine } = segmenterEmail('"a@b"@exemple.fr')

    expect(partieLocale).toBe('"a@b"')
    expect(domaine).toBe('exemple.fr')
  })

  it.each([
    ['sans arobase', 'jeromemarichez.fr'],
    ['arobase en tête', '@ik.me'],
    ['arobase en fin', 'jerome@'],
    ['chaîne vide', ''],
  ])('refuse une %s plutôt que de rendre des morceaux plausibles', (_cas, valeur) => {
    expect(() => segmenterEmail(valeur)).toThrow(/Adresse e-mail attendue/)
  })
})

describe('mailtoObfusque', () => {
  it('rend un href que le navigateur décode en l’adresse exacte', () => {
    expect(decodeURIComponent(mailtoObfusque(EMAIL))).toBe(`mailto:${EMAIL}`)
  })

  it('ne laisse aucune adresse lisible dans le href', () => {
    const href = mailtoObfusque(EMAIL)

    expect(href).not.toContain(EMAIL)
    expect(href).not.toContain(segmenterEmail(EMAIL).partieLocale)
    expect(href).not.toContain(segmenterEmail(EMAIL).domaine)
    expect(href.match(REGEX_MOISSONNEUR)).toBeNull()
  })

  it('encode aussi les caractères « non réservés » qu’encodeURIComponent laisserait passer', () => {
    // Le point et le tiret sont non réservés : laissés tels quels, « ik.me » resterait
    // lisible et l'obfuscation ne servirait à rien.
    const href = mailtoObfusque('a.b-c@ik.me')

    expect(href).not.toContain('.')
    expect(href).not.toContain('-')
    expect(decodeURIComponent(href)).toBe('mailto:a.b-c@ik.me')
  })

  it('garde l’arobase littérale, seul délimiteur de l’URI mailto', () => {
    const [schemeEtLocal, domaine] = mailtoObfusque(EMAIL).split('@')

    expect(mailtoObfusque(EMAIL).split('@')).toHaveLength(2)
    expect(schemeEtLocal?.startsWith('mailto:%')).toBe(true)
    expect(domaine?.startsWith('%')).toBe(true)
  })
})

describe('LienEmail — ce que reçoit un humain', () => {
  const rendre = () => render(<LienEmail email={EMAIL} />).container

  it('donne au lien l’adresse exacte comme nom accessible', () => {
    rendre()

    expect(screen.getByRole('link', { name: EMAIL })).not.toBeNull()
  })

  it('restitue et copie l’adresse sans le moindre caractère parasite', () => {
    const container = rendre()

    // `textContent` est ce que rend une sélection puis une copie, et ce qu'un lecteur
    // d'écran concatène : aucun espace, aucun leurre, aucun caractère masqué.
    expect(container.textContent).toBe(EMAIL)
  })

  it('reste activable au clavier : c’est un vrai lien, pas un span scripté', () => {
    const lien = rendre().querySelector('a')

    expect(lien).not.toBeNull()
    expect(lien?.getAttribute('href')).toBeTruthy()
    expect(lien?.tagName).toBe('A')
  })

  it('ne laisse aucune adresse d’un seul tenant dans le HTML SERVI', () => {
    const servi = renderToString(<LienEmail email={EMAIL} />)

    expect(servi).not.toContain(EMAIL)
    expect(servi.match(REGEX_MOISSONNEUR)).toBeNull()
  })

  it('sépare les fragments dans le HTML servi, sans rien ajouter de visible', () => {
    const servi = renderToString(<LienEmail email={EMAIL} />)
    const { partieLocale, domaine } = segmenterEmail(EMAIL)

    // Les fragments sont bien tous là, mais jamais accolés.
    expect(servi).toContain(partieLocale)
    expect(servi).toContain(domaine)
    expect(servi).not.toContain(`${partieLocale}@`)
    expect(servi).not.toContain(`@${domaine}`)

    // Ce qui les sépare ne doit être NI du texte, NI un élément : seulement des
    // commentaires, invisibles pour l'utilisateur comme pour l'arbre d'accessibilité.
    const interieur = servi.replace(/^<a[^>]*>/, '').replace(/<\/a>$/, '')
    expect(interieur.replace(/<!--[\s\S]*?-->/g, '')).toBe(EMAIL)
    expect(interieur).not.toMatch(/<(?!!--)/)
  })

  it('n’a besoin d’aucun script : aucun gestionnaire d’événement dans le balisage', () => {
    const balisage = rendre().innerHTML

    expect(balisage).not.toMatch(/\son[a-z]+=/i)
    expect(balisage).not.toContain('<script')
  })

  it('n’enveloppe les fragments dans AUCUN élément, qui fausserait le nom accessible', () => {
    const lien = rendre().querySelector('a') as HTMLElement

    // Un `span` par fragment donnerait « jeromemarichez @ ik.me » : l'algorithme de nom
    // accessible sépare par une espace le résultat de chaque enfant de type ÉLÉMENT.
    // Des nœuds de TEXTE, eux, se concatènent sans rien insérer.
    expect(lien.children).toHaveLength(0)
    expect(lien.textContent).toBe(EMAIL)
  })
})
