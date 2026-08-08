/**
 * Intention (écriture déléguée par Jérôme MARICHEZ le 2026-08-08 — issues #23 et #24) :
 * UNE CERTIFICATION SANS JUSTIFICATIF N'AFFICHE AUCUN LIEN. C'est une règle de véracité
 * bloquante du CLAUDE.md, et c'est le seul endroit du lot où un défaut serait à la fois
 * invisible en relecture et grave en production : un lien mort ou inventé sous une
 * certification est une affirmation fausse sur un titre professionnel.
 *
 * Le typage l'impose déjà — la variante `a-fournir` de l'union `Justificatif` ne porte
 * aucune propriété `url`. Ce test vérifie que le RENDU ne contourne pas la garantie, ce
 * que le compilateur ne dit pas : rien n'empêche d'écrire un `href` en dur, une ancre
 * vide ou un lien vers une page de recherche.
 *
 * Comportement attendu :
 * 1. justificatif « disponible » → un lien, vers l'URL exacte du justificatif ;
 * 2. justificatif « a-fournir » → AUCUN lien dans la carte, et aucun `href` ;
 * 3. sur le contenu RÉEL du dépôt, où les cinq certifications sont « a-fournir »,
 *    la section n'expose aucun lien du tout ;
 * 4. rien n'est affiché à la place du lien absent — pas de mention « à fournir » qui
 *    raconterait un dossier incomplet sur une page destinée à convaincre ;
 * 5. deux liens de justificatif voisins portent des noms accessibles DISTINCTS
 *    (WCAG 2.4.4) : restitués hors contexte, « Voir le justificatif » cinq fois de suite
 *    serait indiscernable ;
 * 6. l'année n'est affichée que lorsqu'elle est établie — `annee: null` (cas Google Ads,
 *    daté 2021 sur deux CV et 2022 sur un troisième) n'affiche rien plutôt qu'une
 *    approximation.
 *
 * Cas limites couverts : deux justificatifs disponibles côte à côte ; une certification
 * sans justificatif NI année ; le contenu réel, entièrement en « a-fournir ».
 *
 * Niveau : unitaire (React Testing Library, jsdom). Aucune doublure de module : c'est le
 * vrai composant, le vrai schéma Zod et le vrai contenu qui tournent.
 * Jeu de données : `tests/fixtures/certifications.fixture.json` — quatre entrées couvrant
 * les quatre cas du modèle, validées par le VRAI `certificationSchema` — et le contenu
 * réel du dépôt pour le cas nominal.
 */
import { render, screen, within } from '@testing-library/react'
import { certifications, parcoursPage } from '@/content'
import type { ICertification } from '@/interfaces/certification'
import { certificationSchema } from '@/schemas/certification.schema'
import { Certifications } from '@/views/parcours/sections/Certifications'
import donnees from '../fixtures/certifications.fixture.json'

/** Validées par le vrai schéma : un jeu de données non conforme échoue ici, pas plus loin. */
const jeuDeTest: readonly ICertification[] = donnees.certifications.map((certification) =>
  certificationSchema.parse(certification),
)

const rendre = (liste: readonly ICertification[]) =>
  render(
    <Certifications
      certifications={liste}
      libelleJustificatif={parcoursPage.libelleJustificatif}
      titre={parcoursPage.titreCertifications}
    />,
  ).container

/** La carte d'une certification, repérée par son titre — pas par sa position. */
const carte = (container: HTMLElement, intitule: string): HTMLElement => {
  const titre = screen.getByRole('heading', { name: intitule })
  const article = titre.closest('article')
  if (article === null) throw new Error(`Carte introuvable pour « ${intitule} ».`)
  expect(container.contains(article)).toBe(true)
  return article
}

describe('justificatif disponible', () => {
  it('affiche un lien vers l’URL exacte du justificatif', () => {
    const container = rendre(jeuDeTest)
    const attendue = jeuDeTest[0] as ICertification
    const liens = [...carte(container, attendue.intitule).querySelectorAll('a')]

    expect(liens).toHaveLength(1)
    expect(liens[0]?.getAttribute('href')).toBe(
      attendue.justificatif.statut === 'disponible' ? attendue.justificatif.url : null,
    )
  })

  it('compose le libellé du lien avec l’intitulé, pour que deux liens restent distincts', () => {
    rendre(jeuDeTest)
    const disponibles = jeuDeTest.filter(
      (certification) => certification.justificatif.statut === 'disponible',
    )

    expect(disponibles.length).toBeGreaterThan(1)
    const noms = disponibles.map((certification) => {
      const lien = screen.getByRole('link', {
        name: `${parcoursPage.libelleJustificatif} ${certification.intitule}`,
      })
      return lien.textContent
    })

    expect(new Set(noms).size).toBe(disponibles.length)
  })
})

describe('justificatif à fournir', () => {
  it('n’affiche AUCUN lien dans la carte', () => {
    const container = rendre(jeuDeTest)
    const sansJustificatif = jeuDeTest.filter(
      (certification) => certification.justificatif.statut === 'a-fournir',
    )

    expect(sansJustificatif.length).toBeGreaterThan(0)
    for (const certification of sansJustificatif) {
      const bloc = carte(container, certification.intitule)

      expect(bloc.querySelectorAll('a')).toHaveLength(0)
      expect(bloc.querySelectorAll('[href]')).toHaveLength(0)
    }
  })

  it('n’affiche rien à la place du lien : ni statut interne, ni mention de substitution', () => {
    const container = rendre(jeuDeTest)

    for (const certification of jeuDeTest) {
      if (certification.justificatif.statut !== 'a-fournir') continue
      const texte = (carte(container, certification.intitule).textContent ?? '').trim()

      // La carte ne contient QUE ce qui est établi : l'organisme, l'intitulé, et
      // l'année quand elle existe. Rien d'autre — pas de « à fournir », pas de
      // pastille, pas de note de bas de carte.
      const attendu = [
        certification.organisme,
        certification.intitule,
        certification.annee === null ? '' : String(certification.annee),
      ].join('')

      expect(texte).toBe(attendu)
      expect(texte.toLowerCase()).not.toContain('a-fournir')
      expect(texte.toLowerCase()).not.toContain('à fournir')
    }
  })

  it('n’écrit l’URL d’aucun justificatif absent dans le balisage', () => {
    const container = rendre(jeuDeTest)
    const destinations = [...container.querySelectorAll('a')].map((lien) =>
      lien.getAttribute('href'),
    )
    const urlsLegitimes = jeuDeTest
      .map((certification) =>
        certification.justificatif.statut === 'disponible' ? certification.justificatif.url : null,
      )
      .filter((url): url is string => url !== null)

    expect(destinations).toEqual(urlsLegitimes)
  })
})

describe('contenu réel du dépôt', () => {
  it('n’a aujourd’hui aucun justificatif fourni — le jeu de test n’est donc pas redondant', () => {
    expect(certifications.length).toBeGreaterThan(0)
    for (const certification of certifications) {
      expect(certification.justificatif.statut).toBe('a-fournir')
      expect('url' in certification.justificatif).toBe(false)
    }
  })

  it('n’expose donc aucun lien sur la page réellement publiée', () => {
    const container = rendre(certifications)

    expect(container.querySelectorAll('a')).toHaveLength(0)
    expect(container.querySelectorAll('[href]')).toHaveLength(0)
  })

  it('affiche malgré tout les cinq certifications, avec leur organisme', () => {
    const container = rendre(certifications)

    for (const certification of certifications) {
      const bloc = carte(container, certification.intitule)

      expect(within(bloc).getByText(certification.organisme)).not.toBeNull()
    }
  })
})

describe('année d’obtention', () => {
  it('affiche l’année quand elle est établie', () => {
    const container = rendre(jeuDeTest)
    const datee = jeuDeTest.find((certification) => certification.annee !== null) as ICertification

    expect(within(carte(container, datee.intitule)).getByText(String(datee.annee))).not.toBeNull()
  })

  it('n’affiche aucune année quand elle ne l’est pas, plutôt qu’une approximation', () => {
    const container = rendre(jeuDeTest)
    const nonDatee = jeuDeTest.find(
      (certification) => certification.annee === null,
    ) as ICertification
    const bloc = carte(container, nonDatee.intitule)

    expect(bloc.textContent).not.toMatch(/\b(19|20)\d{2}\b/)
  })

  it('ne date pas la certification Google Ads du contenu réel, non tranchée', () => {
    const container = rendre(certifications)
    const googleAds = certifications.find((certification) => certification.cle === 'google-ads')

    expect(googleAds?.annee).toBeNull()
    expect(carte(container, googleAds?.intitule as string).textContent).not.toMatch(/\b20\d{2}\b/)
  })
})
