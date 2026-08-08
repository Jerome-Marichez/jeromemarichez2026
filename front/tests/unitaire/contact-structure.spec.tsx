/**
 * Intention (écriture déléguée par Jérôme MARICHEZ le 2026-08-08 — issue #24) :
 * la page de contact RENDUE affiche les trois coordonnées, toutes tirées du contenu typé,
 * et NE COMPORTE AUCUN FORMULAIRE — arbitrage de Jérôme MARICHEZ du 2026-08-08,
 * postérieur à l'issue #24 qui en demandait un. Ce test est ce qui rend l'arbitrage
 * vérifiable : le jour où un formulaire réapparaîtrait sans que l'acheminement des
 * messages soit tranché, la page afficherait « message envoyé » sans rien envoyer.
 *
 * Comportement attendu :
 * 1. un seul `h1` ; régions nommées ; aucun saut de niveau ;
 * 2. AUCUN élément de formulaire dans la page — ni `form`, ni `input`, ni `textarea`, ni
 *    `select`, ni `button` : l'absence est le comportement attendu, pas un oubli ;
 * 3. les trois coordonnées sont celles de `identite`, jamais des chaînes écrites dans la
 *    vue : le test compare au contenu typé, il ne recopie aucune adresse ni aucun numéro ;
 * 4. le TÉLÉPHONE est cliquable et son `href` est en E.164 (`+33…`), seule forme
 *    composable hors de France, tandis que le texte affiché reste au format national,
 *    seule forme lisible par un humain ;
 * 5. le profil LinkedIn pointe l'URL vérifiée de `identite.profilsPublics` — une URL de
 *    profil erronée rattacherait l'identité du site à un tiers ;
 * 6. les coordonnées sont présentées en liste de définitions, chaque valeur portant son
 *    étiquette : c'est ce qui permet à un lecteur d'écran de restituer le couple ;
 * 7. la mention RGPD est réellement RENDUE, et elle dit l'absence de collecte. Une
 *    mention obligatoire dans le schéma mais jamais affichée ne protégerait personne ;
 * 8. l'absence de formulaire est EXPLIQUÉE : un visiteur qui n'en trouve pas et ne lit
 *    aucune raison conclut à un site inachevé.
 *
 * L'obfuscation de l'e-mail et son accessibilité sont couvertes séparément, au plus près
 * de leur mécanique, par `email-obfusque.spec.tsx`.
 *
 * Cas limites couverts : une coordonnée qui serait écrite en dur dans la vue au lieu
 * d'être lue dans `identite` ; un `button` introduit « en attendant » le formulaire.
 *
 * Niveau : unitaire (React Testing Library, jsdom) — la vue, le service de résolution des
 * profils et les utilitaires réels collaborent, aucune doublure de module.
 * Jeu de données : le contenu réel du dépôt, celui que sert la page « /contact ».
 */
import { render, screen } from '@testing-library/react'
import { contactPage, identite } from '@/content'
import { telephoneVersE164 } from '@/utils/telephone'
import { ContactView } from '@/views/contact/ContactView'

const rendu = () => render(<ContactView />).container

const nom = (element: Element): string => (element.textContent ?? '').replace(/\s+/g, ' ').trim()

describe('plan du document', () => {
  it('ne porte qu’un seul h1, et c’est le titre de la page', () => {
    const titres = rendu().querySelectorAll('h1')

    expect(titres).toHaveLength(1)
    expect(nom(titres[0] as Element)).toBe(contactPage.entete.titre)
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

  it('nomme chacune des quatre régions de la page par son propre titre', () => {
    rendu()
    const regions = screen.getAllByRole('region')

    expect(regions).toHaveLength(4)
    for (const titre of [
      contactPage.entete.titre,
      contactPage.coordonnees.titre,
      contactPage.sansFormulaire.titre,
      contactPage.rgpd.titre,
    ]) {
      expect(screen.getByRole('region', { name: titre })).not.toBeNull()
    }
  })
})

describe('aucun formulaire — arbitrage du 2026-08-08', () => {
  it.each(['form', 'input', 'textarea', 'select', 'button'])(
    'ne rend aucun élément « %s »',
    (balise) => {
      expect(rendu().querySelectorAll(balise)).toHaveLength(0)
    },
  )

  it('n’expose aucun contrôle de saisie aux technologies d’assistance', () => {
    rendu()

    expect(screen.queryAllByRole('textbox')).toHaveLength(0)
    expect(screen.queryAllByRole('button')).toHaveLength(0)
  })

  it('explique l’absence plutôt que de la laisser deviner', () => {
    rendu()

    expect(screen.getByRole('heading', { name: contactPage.sansFormulaire.titre })).not.toBeNull()
    expect(screen.getByText(contactPage.sansFormulaire.texte)).not.toBeNull()
  })
})

describe('les coordonnées viennent du contenu typé', () => {
  it('affiche l’adresse e-mail de l’identité, et elle seule', () => {
    rendu()

    expect(screen.getByRole('link', { name: identite.contact.email })).not.toBeNull()
  })

  it('rend le téléphone cliquable en E.164, affiché au format national', () => {
    rendu()
    const lien = screen.getByRole('link', { name: identite.contact.telephone })

    expect(lien.getAttribute('href')).toBe(`tel:${telephoneVersE164(identite.contact.telephone)}`)
    expect(lien.getAttribute('href')).toMatch(/^tel:\+33\d{9}$/)
    expect(nom(lien)).toBe(identite.contact.telephone)
  })

  it('pointe une URL de profil réellement vérifiée dans l’identité', () => {
    const container = rendu()
    const externes = [...container.querySelectorAll('a')]
      .map((lien) => lien.getAttribute('href') ?? '')
      .filter((href) => href.startsWith('https://'))

    expect(externes.length).toBe(contactPage.coordonnees.profils.length)
    for (const href of externes) {
      expect(identite.profilsPublics).toContain(href)
    }
  })

  it('affiche le profil déclaré par le contenu, et pas un autre', () => {
    const container = rendu()
    const externes = [...container.querySelectorAll('a')]
      .map((lien) => lien.getAttribute('href') ?? '')
      .filter((href) => href.startsWith('https://'))

    for (const profil of contactPage.coordonnees.profils) {
      expect(externes.some((href) => new URL(href).hostname === profil.hote)).toBe(true)
      expect(screen.getByText(profil.nom)).not.toBeNull()
    }
  })

  it('associe chaque coordonnée à son étiquette dans une liste de définitions', () => {
    const container = rendu()
    const etiquettes = [...container.querySelectorAll('dt')].map((dt) => nom(dt))
    const valeurs = container.querySelectorAll('dd')

    expect(container.querySelectorAll('dl')).toHaveLength(1)
    expect(etiquettes).toContain(contactPage.coordonnees.libelleEmail)
    expect(etiquettes).toContain(contactPage.coordonnees.libelleTelephone)
    expect(valeurs).toHaveLength(etiquettes.length)
    expect(etiquettes).toHaveLength(2 + contactPage.coordonnees.profils.length)
  })
})

describe('mention RGPD', () => {
  it('rend réellement chaque mention déclarée', () => {
    rendu()

    expect(contactPage.rgpd.mentions.length).toBeGreaterThan(0)
    for (const mention of contactPage.rgpd.mentions) {
      expect(screen.getByText(mention)).not.toBeNull()
    }
  })

  it('dit explicitement qu’aucune donnée du visiteur n’est collectée', () => {
    const texte = nom(rendu()).toLowerCase()

    expect(texte).toContain('aucun formulaire')
    expect(texte).toMatch(/ne collecte donc rien|aucune donnée/)
  })

  it('n’annonce aucune durée de conservation chiffrée, faute d’arbitrage', () => {
    const mentions = contactPage.rgpd.mentions.join(' ')

    expect(mentions).not.toMatch(/\b\d+\s*(jours?|mois|ans?|années?)\b/i)
  })

  it('n’annonce aucun délai de réponse, qui n’est pas établi', () => {
    const texte = nom(rendu())

    expect(texte).not.toMatch(/sous \d+\s*(h|heures?|jours?)/i)
    expect(texte).not.toMatch(/réponse sous/i)
  })
})
