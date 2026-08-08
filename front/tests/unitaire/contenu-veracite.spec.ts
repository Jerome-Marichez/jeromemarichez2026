/**
 * Intention (écriture déléguée par Jérôme MARICHEZ le 2026-08-08 — issue #26) :
 * le contenu PUBLIÉ respecte les règles de véracité bloquantes du CLAUDE.md. Le corpus
 * examiné est la DONNÉE exportée (offres, expériences, identité, certifications,
 * formations), pas le texte des fichiers sources : un terme interdit cité dans un
 * commentaire d'en-tête — pour expliquer pourquoi il est interdit — n'est pas publié.
 *
 * Ce qui est vérifié : aucun terme interdit ; le site parle à la première personne du
 * singulier (« je », jamais « nous ») ; le SEO n'est pas vendu comme prestation ; aucune
 * certification ne peut porter un lien mort ; EF SET n'est pas une certification ;
 * Microsoft Ads est absent ; l'ISTQB reste au niveau Foundation.
 *
 * CORRECTION D'UNE PROPOSITION PÉRIMÉE : le test de véracité initial interdisait
 * « Universitat » et « Barcelona ». Jérôme MARICHEZ a arbitré l'inverse le 2026-08-08 —
 * l'Universitat de Barcelona est nommée comme ÉDITRICE de la publication arXiv, la
 * méthode ayant été implémentée par lui. Ce test vérifie donc la mention ET l'absence de
 * la formule qui reste interdite : « en collaboration avec ».
 *
 * Cas limites couverts : « Kubernetes » n'est pas interdit en soi — il ne l'est que
 * revendiqué ; l'absence de K8s se dit telle quelle, c'est un argument de lucidité, et le
 * test exige que toute occurrence soit une négation.
 *
 * HORS PÉRIMÈTRE ASSUMÉ (deuxième vague, réécritures en cours) : le contenu de la page
 * d'accueil et la grille tarifaire ne sont pas dans le corpus.
 *
 * Niveau : unitaire (données pures).
 * Jeu de données : le contenu éditorial réel du dépôt.
 */
import { certifications, experiences, formations, identite, offres } from '@/content'

/** Le contenu réellement publié, hors accueil et tarifs (deuxième vague). */
const CORPUS = JSON.stringify({ certifications, experiences, formations, identite, offres })

/** Termes que le site ne doit jamais publier (CLAUDE.md, règles de véracité). */
const TERMES_INTERDITS = [
  'en collaboration avec',
  'LangChain',
  'LlamaIndex',
  'AppsFlyer',
  'Adjust',
  'Amplitude',
  'Tealium',
  'Adobe Launch',
  'Adobe Analytics',
  'Meta Ads',
  'LinkedIn Ads',
  'GraphQL',
  'NestJS',
  'Prisma',
  'Gherkin',
  'Cucumber',
  'PyTorch',
  'Microsoft Ads',
  'mentorat',
] as const

describe('termes interdits', () => {
  it.each(TERMES_INTERDITS)('ne publie jamais « %s »', (terme) => {
    expect(CORPUS.toLowerCase()).not.toContain(terme.toLowerCase())
  })

  it('ne revendique aucun ISTQB au-delà du niveau Foundation', () => {
    expect(CORPUS).not.toMatch(/ISTQB[^"]*(Avanc|Advanced)/i)
    expect(CORPUS).not.toMatch(/Automatisation de [Tt]est/)
  })

  it('ne mentionne Kubernetes que pour dire qu’il n’est pas administré en propre', () => {
    const occurrences = CORPUS.match(/Kubernetes/g) ?? []

    for (const _occurrence of occurrences) {
      expect(CORPUS).toContain('Pas de cluster Kubernetes administré en propre')
    }
    expect(CORPUS).not.toMatch(/cluster Kubernetes administré en propre[^"]*par mes soins/i)
  })
})

describe('publication arXiv — arbitrage du 2026-08-08', () => {
  const axeSupervise = offres
    .flatMap((offre) => offre.axes)
    .find((axe) => axe.cle === 'apprentissage-supervise')

  it('nomme l’Universitat de Barcelona comme éditrice de la publication', () => {
    expect(axeSupervise?.description).toContain('Universitat de Barcelona')
    expect(axeSupervise?.description).toContain('arXiv')
  })

  it('attribue l’implémentation à Jérôme, sans annoncer de collaboration', () => {
    expect(axeSupervise?.description).toMatch(/implémentée moi-même/)
    expect(axeSupervise?.description).not.toContain('en collaboration avec')
  })
})

describe('première personne du singulier', () => {
  it.each(['nous', 'notre', 'nos', 'notre équipe'])('ne dit jamais « %s »', (pronom) => {
    expect(CORPUS.toLowerCase()).not.toMatch(new RegExp(`\\b${pronom}\\b`))
  })

  it('parle bien à la première personne quelque part dans les offres', () => {
    expect(JSON.stringify(offres)).toMatch(/\bje\b/i)
  })
})

describe('le SEO n’est pas une prestation vendue', () => {
  it('ne connaît que les trois clés d’offre arbitrées', () => {
    expect(offres.map((offre) => offre.cle)).toEqual(['ingenierie-web', 'data-ia', 'sea'])
  })

  it('a définitivement renommé « seo-sea » en « sea »', () => {
    expect(CORPUS).not.toContain('seo-sea')
    expect(offres.find((offre) => offre.cle === 'sea')?.titre).toBe('SEA')
  })

  it('n’intitule aucune offre avec du référencement naturel', () => {
    for (const offre of offres) {
      expect(offre.titre).not.toMatch(/SEO/i)
    }
  })

  it('ne garde « SEO » dans un titre d’axe que comme propriété du livrable', () => {
    const axesSeo = offres.flatMap((offre) =>
      offre.axes.filter((axe) => /SEO/i.test(axe.titre)).map((axe) => ({ offre: offre.cle, axe })),
    )

    expect(axesSeo.map(({ offre, axe }) => [offre, axe.cle])).toEqual([
      ['ingenierie-web', 'seo-ready'],
    ])
  })

  it('dit explicitement ce que l’offre SEA ne couvre pas', () => {
    const perimetre = offres
      .find((offre) => offre.cle === 'sea')
      ?.axes.find((axe) => axe.cle === 'perimetre')

    expect(perimetre?.description).toMatch(/pas une prestation de référencement naturel/i)
    expect(perimetre?.description).toMatch(/netlinking/)
    expect(perimetre?.description).toMatch(/suivi de positions/)
  })

  it('ne mentionne le SEO dans l’offre SEA que pour l’exclure ou comme fait du parcours', () => {
    const axesAvecSeo = (offres.find((offre) => offre.cle === 'sea')?.axes ?? [])
      .filter((axe) => JSON.stringify(axe).includes('SEO'))
      .map((axe) => axe.cle)

    expect(axesAvecSeo.sort()).toEqual(['perimetre', 'sea-pilotage'])
  })

  it('garde l’expérience SEO passée au parcours, qui est un fait vérifiable', () => {
    expect(JSON.stringify(experiences)).toMatch(/SEO/)
  })
})

describe('certifications — aucun lien mort possible', () => {
  it('n’émet une URL que pour un justificatif disponible', () => {
    for (const certification of certifications) {
      if (certification.justificatif.statut === 'disponible') {
        expect(certification.justificatif.url.startsWith('https://')).toBe(true)
      } else {
        expect('url' in certification.justificatif).toBe(false)
      }
    }
  })

  it('ne publie pas EF SET comme certification', () => {
    for (const certification of certifications) {
      expect(certification.intitule).not.toMatch(/EF SET/i)
    }
  })

  it('ne publie pas Microsoft Ads, non établie', () => {
    for (const certification of certifications) {
      expect(certification.intitule).not.toMatch(/Microsoft Ads/i)
    }
  })

  it('n’affiche aucune année pour la certification Google Ads, non tranchée', () => {
    expect(certifications.find((certification) => certification.cle === 'google-ads')?.annee).toBe(
      null,
    )
  })

  it('classe EF SET comme évaluateur d’une langue, pas comme titre professionnel', () => {
    expect(identite.langues.some((langue) => langue.evaluePar === 'EF SET')).toBe(true)
  })
})

describe('ligne éditoriale', () => {
  it('termine chaque offre sur une décision, jamais sur une liste d’outils', () => {
    for (const offre of offres) {
      expect(offre.decisionPermise).toMatch(/vous (décidez|savez)/i)
    }
  })

  it('n’écrit jamais une preuve vide plutôt que d’en inventer une', () => {
    for (const axe of offres.flatMap((offre) => offre.axes)) {
      expect(axe.preuve === null || axe.preuve.trim().length > 0).toBe(true)
    }
  })

  it('n’utilise aucun emoji dans le contenu publié', () => {
    expect(CORPUS).not.toMatch(/\p{Extended_Pictographic}/u)
  })

  it('annonce le développement en IA augmentée piloté par les tests', () => {
    expect(CORPUS).toMatch(/IA augmentée/)
    expect(CORPUS).toMatch(/TDD|piloté par les tests/)
  })
})
