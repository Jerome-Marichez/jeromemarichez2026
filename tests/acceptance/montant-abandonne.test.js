/**
 * Intention (écriture déléguée par Jérôme MARICHEZ le 2026-08-08 — issue #29) :
 * le montant évoqué en première intention pour la mise en place SEA, puis ABANDONNÉ au
 * profit de la fourchette, ne doit réapparaître dans AUCUNE source versionnée du dépôt.
 * Pas dans le contenu, pas dans la documentation, pas dans un commentaire, pas dans un
 * fichier de test — pas même pour expliquer qu'il a été abandonné.
 *
 * Pourquoi ce niveau et pas un test unitaire : la garantie ne porte sur aucun module.
 * Elle porte sur le DÉPÔT pris comme un tout, tel qu'un lecteur — ou un moteur de
 * recherche sur le dépôt public — peut le lire. C'est une exigence d'acceptation :
 * la grille validée est la seule chose que le dépôt dit du prix.
 *
 * Ce qui rendrait ce test inutile, et qui est donc vérifié aussi : un balayage qui ne
 * lirait rien passerait à vide. Le test contrôle donc qu'il a bien parcouru le dépôt et
 * qu'il RETROUVE les deux bornes réellement publiées. S'il ne les trouve plus, c'est
 * son propre balayage qui est cassé, et il le dit.
 *
 * Cas limites couverts : le montant abandonné cherché comme simple suite de caractères,
 * donc attrapé même collé à un symbole monétaire, à une mention fiscale ou inséré dans
 * un nombre plus long ; les fichiers encore non suivis mais déjà présents dans l'arbre
 * de travail (`--others`), pour qu'un ajout soit refusé AVANT son premier commit ; les
 * bornes publiées cherchées avec des bornes de chiffres, pour que « 12000 » ne passe
 * pas pour « 1200 ».
 *
 * Exclusion assumée : `package-lock.json`. Ce sont des empreintes d'intégrité générées
 * par npm, pas du contenu rédigé — une collision de trois chiffres dans une empreinte
 * ne dirait rien du prix publié.
 *
 * Niveau : acceptation (runner Node natif, `make test-acceptance`).
 * Jeu de données : les sources réellement versionnées du dépôt.
 */
const assert = require('node:assert/strict')
const { execFileSync } = require('node:child_process')
const { readFileSync } = require('node:fs')
const { join } = require('node:path')
const { describe, it } = require('node:test')

/**
 * Le montant abandonné, composé chiffre par chiffre.
 *
 * Il n'est écrit nulle part en clair, pas même ici : ce fichier fait lui-même partie des
 * sources balayées, et un test qui contiendrait la valeur qu'il interdit se trouverait
 * lui-même. La composition n'est donc pas une coquetterie, c'est ce qui rend le test
 * applicable à lui-même.
 */
const MONTANT_ABANDONNE = [4, 9, 9].join('')

/** Fichiers exclus du balayage, et eux seuls. */
const EXCLUS = /(^|\/)package-lock\.json$/

const racine = execFileSync('git', ['rev-parse', '--show-toplevel'], { encoding: 'utf8' }).trim()

/**
 * Sources versionnées, plus celles déjà posées dans l'arbre de travail et non ignorées :
 * un montant réintroduit doit être refusé avant même son premier commit.
 */
const sources = execFileSync(
  'git',
  ['ls-files', '-z', '--cached', '--others', '--exclude-standard'],
  { cwd: racine, encoding: 'utf8' },
)
  .split('\0')
  .filter((chemin) => chemin !== '' && !EXCLUS.test(chemin))

const lus = sources.map((chemin) => ({
  chemin,
  contenu: readFileSync(join(racine, chemin), 'utf8'),
}))

/** Fichiers contenant une suite de chiffres prise comme nombre entier isolé. */
const contenant = (nombre) => {
  const motif = new RegExp(`(?<!\\d)${nombre}(?!\\d)`)

  return lus.filter((source) => motif.test(source.contenu)).map((source) => source.chemin)
}

/**
 * Un prix, c'est-à-dire l'une des bornes publiées SUIVIE d'un symbole monétaire ou d'une
 * mention fiscale.
 *
 * La borne basse ne peut pas être cherchée seule hors du contenu éditorial : « 300 » est
 * aussi la limite de lignes par fichier source, citée dans le CLAUDE.md, le README et la
 * documentation. Un nombre nu n'est pas un prix ; un nombre suivi d'un « € » en est un.
 */
const PRIX_PUBLIE = /(?<!\d)(300|1[ {2}]?200)\s*(€|EUR\b|TTC)/

describe('le balayage du dépôt est réel', () => {
  it('parcourt les sources versionnées du dépôt', () => {
    assert.ok(
      lus.length > 100,
      `Balayage suspect : ${lus.length} fichiers lus. Le dépôt en compte davantage.`,
    )
  })

  it('lit bien le contenu des fichiers, et pas seulement leur nom', () => {
    const grille = lus.find((source) => source.chemin.endsWith('content/offres/sea-tarifs.ts'))

    assert.ok(grille, 'La grille tarifaire n’a pas été trouvée : le balayage est incomplet.')
    assert.match(grille.contenu, /mentionFiscale/)
  })

  it('retrouve la borne basse publiée — sinon le test passerait à vide', () => {
    assert.notDeepEqual(contenant(300), [])
  })

  it('retrouve la borne haute publiée — sinon le test passerait à vide', () => {
    assert.notDeepEqual(contenant(1200), [])
  })
})

describe('le montant abandonné ne réapparaît nulle part', () => {
  it('n’est présent dans aucune source versionnée', () => {
    const fautifs = lus
      .filter((source) => source.contenu.includes(MONTANT_ABANDONNE))
      .map((source) => source.chemin)

    assert.deepEqual(
      fautifs,
      [],
      `Le montant abandonné en cours de négociation réapparaît dans : ${fautifs.join(', ')}. ` +
        'Seule la fourchette validée fait foi — voir front/src/content/offres/sea-tarifs.ts.',
    )
  })

  it('n’est pas davantage présent dans le fichier de ce test', () => {
    const moi = lus.find((source) => source.chemin.endsWith('montant-abandonne.test.js'))

    assert.ok(moi, 'Ce fichier de test n’est pas balayé : la garantie ne s’applique pas à lui.')
    assert.ok(!moi.contenu.includes(MONTANT_ABANDONNE))
  })
})

describe('les bornes publiées ne sont écrites qu’une fois', () => {
  const GRILLE = 'front/src/content/offres/sea-tarifs.ts'
  const contenuEditorial = () =>
    lus.filter((source) => source.chemin.startsWith('front/src/content/'))

  /**
   * ÉVOLUTION DU 2026-08-08 (lot « pages parcours et contact », issues #23 et #24) —
   * à relire par Jérôme MARICHEZ.
   *
   * Les deux cas précédents exigeaient que l'ENTIER NU des deux bornes n'apparaisse, dans
   * `front/src/content/`, que dans la grille. C'était vrai le jour où ils ont été écrits,
   * et c'est devenu un FAUX POSITIF : `content/parcours-page.ts` déclare les dimensions
   * natives de l'image de la page parcours, dont la déclinaison large mesure en pixels
   * exactement la borne haute de la grille. Une largeur d'image n'est pas un prix.
   *
   * Le fichier faisait DÉJÀ ce constat pour la borne basse — « un nombre nu n'est pas un
   * prix ; un nombre suivi d'un € en est un » (voir `PRIX_PUBLIE`), parce que 300 est
   * aussi la limite de lignes par fichier. La même distinction est simplement étendue au
   * contenu éditorial.
   *
   * L'intention est INCHANGÉE : un montant tarifaire ne s'écrit qu'à un seul endroit. Et
   * elle est mieux tenue qu'avant, parce que le premier cas ci-dessous ne dépend plus des
   * chiffres eux-mêmes : il attrape TOUT montant déclaré hors de la grille, y compris un
   * montant futur que personne n'aurait pensé à ajouter à la liste des bornes surveillées.
   */
  it('ne déclare aucun montant tarifaire hors de la grille', () => {
    const avecMontant = contenuEditorial()
      .filter((source) =>
        /mentionFiscale|nature: '(fourchette|sur-devis|inclus)'/.test(source.contenu),
      )
      .map((source) => source.chemin)

    assert.deepEqual(
      avecMontant,
      [GRILLE],
      `Un montant est déclaré hors de la grille, dans : ${avecMontant.join(', ')}.`,
    )
  })

  it('n’écrit les bornes publiées comme un PRIX dans aucun autre contenu', () => {
    const avecPrix = contenuEditorial()
      .filter((source) => source.chemin !== GRILLE && PRIX_PUBLIE.test(source.contenu))
      .map((source) => source.chemin)

    assert.deepEqual(avecPrix, [])
  })

  it('garde la grille comme seul contenu à écrire la borne haute en toutes lettres', () => {
    assert.match(lus.find((source) => source.chemin === GRILLE).contenu, /maximum/)
  })

  it('ne recopie la borne haute dans aucune documentation', () => {
    const documentation = contenant(1200).filter((chemin) => chemin.endsWith('.md'))

    assert.deepEqual(documentation, [])
  })

  it('n’écrit un prix en toutes lettres ni dans l’application ni dans la documentation', () => {
    // Les tests, eux, ont le droit d'écrire le prix attendu : c'est même leur objet —
    // ils vérifient que la mise en forme calculée produit exactement cette chaîne.
    const prixEcrits = lus
      .filter((source) => !source.chemin.includes('tests/'))
      .filter((source) => PRIX_PUBLIE.test(source.contenu))
      .map((source) => source.chemin)

    assert.deepEqual(
      prixEcrits,
      [],
      `Un prix est écrit en toutes lettres dans : ${prixEcrits.join(', ')}. ` +
        'Le chiffre et sa mention sortent de front/src/utils/tarif.ts, jamais d’une saisie.',
    )
  })
})
