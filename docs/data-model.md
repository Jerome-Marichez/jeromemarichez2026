# Modèle de données

Le site n'a **ni base de données, ni API, ni CMS** : tout le contenu est versionné en
TypeScript dans `src/@vitrine/contenu/`, et sa forme est tenue par des interfaces de
`src/interfaces/` (une entité par fichier, préfixe `I`). Ce document décrit ces entités.

> **Pas de Zod ici, et c'est volontaire.** Zod est obligatoire sur les **entrées
> externes** (formulaire, body d'API, webhook, variables d'environnement). Un fichier de
> contenu compilé avec le site n'en est pas une : le compilateur refuse déjà un champ
> manquant ou mal typé, et un schéma exécuté au build ne ferait que revérifier ce que
> TypeScript a garanti. La seule vraie frontière du blog est le `slug` d'URL — il est
> confronté à la liste close des articles par `generateStaticParams`, donc aucune URL
> hors de cette liste n'est servie. Il en va de même pour les réalisations.

## Entités

| Entité | Fichier | Rôle | Relations |
|--------|---------|------|-----------|
| `IPole` | `src/interfaces/IPole.ts` | Un **nœud** de la chaîne d'offres | `route` pointe une entrée de `ROUTES` |
| **`IJointure`** | `src/interfaces/IJointure.ts` | Une **arête** : ce qu'un pôle remet au suivant, et ce qui se passe si le client l'a déjà | `amont` et `aval` référencent un `PoleId` |
| `IEditorialPage` | `src/interfaces/IEditorialPage.ts` | Une page rédigée (accueil, page de pôle) | contient des `IEditorialSection` |
| `IEditorialSection` | `src/interfaces/IEditorialSection.ts` | Une section de page | contient des `IEditorialBlock` ; `pole` référence un `PoleId` |
| `IEditorialBlock` | `src/interfaces/IEditorialBlock.ts` | Un point d'expertise | — |
| `IProof` | `src/interfaces/IProof.ts` | Une preuve chiffrée | `fiche` référence une `IRealisationChiffree` |
| **`IRealisation`** | `src/interfaces/IRealisation.ts` | **Une réalisation** : un travail mené, son cadre, sa décision | contient un `IRealisationCadre` et des `IRealisationEtape` ; `poles` référence des `PoleId` |
| `IRealisationChiffree` | `src/interfaces/IRealisationChiffree.ts` | Une `IRealisation` dont le `chiffre` est **obligatoire** | étend `IRealisation` |
| `IRealisationCadre` | `src/interfaces/IRealisationCadre.ts` | Le cadre d'emploi : employeur, poste, période, équipe | — |
| `IRealisationChiffre` | `src/interfaces/IRealisationChiffre.ts` | Un résultat chiffré, et ce qu'il ne dit pas | — |
| `IRealisationEtape` | `src/interfaces/IRealisationEtape.ts` | Une étape du travail mené | — |
| `IRealisationGroupe` | `src/interfaces/IRealisationGroupe.ts` | Vue dérivée : un cadre et ses fiches | calculée par `find-realisation`, jamais déclarée |
| `IRealisationsIndex` | `src/interfaces/IRealisationsIndex.ts` | L'en-tête éditoriale de `/realisations` | — |
| `ICertification` | `src/interfaces/ICertification.ts` | Une certification obtenue | `ICertificationLogo` |
| `IBoundary` | `src/interfaces/IBoundary.ts` | Une limite assumée | — |
| **`IArticle`** | `src/interfaces/IArticle.ts` | **Un article du blog** | contient des `IArticleSection` |
| `IArticleSection` | `src/interfaces/IArticleSection.ts` | Une section d'article | — |
| `IBlogIndex` | `src/interfaces/IBlogIndex.ts` | L'en-tête éditoriale de `/blog` | — |
| `IBreadcrumbItem` | `src/interfaces/IBreadcrumbItem.ts` | Un niveau de fil d'Ariane | lu par le rendu **et** par le JSON-LD |

## Le bloc éditorial (`IEditorialBlock`)

C'est l'unité la plus fine du site : un point d'expertise à l'intérieur d'une section.

| Champ | Type | Obligatoire | Rôle |
|-------|------|-------------|------|
| `titre` | `string` | oui | Intitulé court du point d'expertise |
| `texte` | `string` | **non** | Corps du bloc, une à trois phrases |
| `preuve` | `string` | non | Preuve chiffrée réelle (montant, pourcentage, durée, contrainte tenue) |
| `decision` | `string` | non | Ce que le client peut trancher grâce à ce point |

### Pourquoi `texte` est optionnel

Trois champs sur quatre sont facultatifs, mais pas pour la même raison. `preuve` et
`decision` le sont parce que le type ne peut pas garantir qu'une preuve existe : leur
absence est un **signal de relecture**, pas un état souhaitable.

`texte` l'est pour la raison inverse. Quand un bloc porte déjà un titre, une preuve
chiffrée et une décision, le paragraphe redit en prose ce que les trois autres
établissent — et c'est le seul des quatre qui n'apporte rien à un dirigeant pressé
(issue #45). Dans ce cas précis, il s'omet.

### Contraintes d'intégrité

Aucune n'est vérifiée à l'exécution : elles sont tenues par la relecture.

- **Un bloc dépourvu de `preuve` et de `decision` garde son `texte`.** Sans lui, il ne
  reste qu'un titre orphelin. Les repères des charnières sont exactement ce cas.
- **Un `texte` supprimé ne transfère jamais sa charge.** Si le paragraphe portait un fait
  qui n'existe nulle part ailleurs, ce fait se **déplace** dans `preuve` ou `decision` ; il
  ne se jette pas, et le champ d'accueil ne s'élargit pas pour l'absorber.
- **Les bornes de véracité restent dans le paragraphe qui les porte.** « ISTQB Foundation
  est le seul niveau que je détiens », « pas de cluster Kubernetes administré en propre »,
  « RAG fait maison, aucun framework tiers », « pas d'autre outillage mobile revendiqué » :
  ces phrases sont la raison d'être de leur bloc, jamais du remplissage.
- **Les trois composants de rendu ne produisent pas de paragraphe vide.**
  `ExpertiseBlock`, `HingeSection` et `ThreadSection` conditionnent l'élément à la
  présence de la valeur.

## L'article (`IArticle`)

C'est la seule entité **datée** du site, et c'est ce qui la distingue du reste du
contenu : une page de pôle est vraie ou fausse, un article est vrai **à une date**.

| Champ | Type | Obligatoire | Rôle |
|-------|------|-------------|------|
| `slug` | `string` | oui | Identité durable. Dernier segment de l'URL, clé de recherche, ancre du JSON-LD |
| `titre` | `string` | oui | `<h1>`, `headline` du JSON-LD, dernier niveau du fil d'Ariane |
| `chapo` | `string` | oui | Résumé. Teaser sur la liste, `description` du JSON-LD |
| `meta` | `IPageMeta` | oui | `<title>` (60 car. max) et meta description (155 car. max) |
| `datePublication` | `string` (`AAAA-MM-JJ`) | oui | Date affichée, `datePublished`, **clé de tri** de la liste |
| `dateRevision` | `string` (`AAAA-MM-JJ`) | non | Révision de fond. `dateModified` et `lastModified` du sitemap |
| `sections` | `IArticleSection[]` | oui | Corps de l'article : un titre `<h2>` et ses paragraphes |

### Contraintes d'intégrité

Aucune n'est vérifiée à l'exécution — elles le sont par le compilateur, par la
construction du site, ou elles restent à la charge de l'auteur :

- **`slug` unique et stable.** Deux articles de même slug produiraient deux fois la même
  page ; changer un slug publié casse les liens entrants et l'historique de position dans
  les moteurs. Un titre se corrige, un slug ne se corrige pas.
- **`slug` en kebab-case ASCII**, sans accent ni apostrophe : c'est une URL, elle doit
  s'écrire, se lire au téléphone et se copier sans encodage.
- **Dates au format `AAAA-MM-JJ`.** Ce format se compare comme du texte, ce dont le tri
  chronologique se sert directement. TypeScript ne peut pas le contraindre : c'est une
  convention, tenue par la relecture.
- **`dateRevision` ≥ `datePublication`** quand elle existe.
- **Véracité du contenu** : les règles du [`CLAUDE.md`](../CLAUDE.md) s'appliquent mot
  pour mot à un article comme au reste du site.

### Règles portées par le service

Elles vivent dans `src/@vitrine/services/find-article.ts`, jamais dans le contenu ni dans
un composant :

| Règle | Comportement |
|-------|--------------|
| `listArticles()` | Classe par `datePublication` décroissante. Le tri porte sur la publication et **non** sur la révision : corriger un vieil article ne doit pas le remettre en tête comme s'il était neuf |
| `findArticle(slug)` | Rend l'article et jusqu'à `MAX_ARTICLES_LIES` (2) autres. **Lève** sur un slug inconnu : les slugs servis sont énumérés au build, un slug absent est une incohérence de code, pas une URL saisie par un visiteur |
| `articleRevisionDate(a)` | `dateRevision` si elle existe, `datePublication` sinon. Écrite une fois, pour que le sitemap et le JSON-LD ne puissent pas publier deux dates différentes |

### Ce qui n'est pas dans le modèle, et pourquoi

- **Pas d'auteur.** Le site n'a qu'un auteur, déclaré une fois pour tout le site par le
  nœud `Person` du layout. Un champ `auteur` par article laisserait croire à une équipe
  de rédaction.
- **Pas d'image.** Aucune illustration n'est servie ; déclarer une image dans le JSON-LD
  ou dans `og:image` sans la servir serait une affirmation fausse de plus.
- **Pas de rattachement à un pôle, pas de tags, pas de catégories.** Avec trois articles,
  une taxonomie serait un classement sans classe. Le jour où elle s'impose, le
  rattachement dérivera de `PoleId` et de l'ordre porté par `POLES_NAV` — jamais d'une
  liste de pôles recopiée dans le blog. L'ordre est **la position dans `POLES_NAV`**, et
  nulle part ailleurs : une seconde liste d'ordre finirait par contredire la première.
- **Pas de statut `brouillon`.** Un article non publié n'est pas dans `articles.ts`.

## La réalisation (`IRealisation`)

C'est l'entité la plus exposée du site : le format « portfolio » dérive de lui-même vers
« mon client X », et les entreprises citées sont des **employeurs**. Le modèle tient cette
frontière par le **type**, pas par la relecture.

| Champ | Type | Obligatoire | Rôle |
|-------|------|-------------|------|
| `slug` | `string` | oui | Identité durable. Dernier segment de l'URL, clé de recherche, ancre du JSON-LD |
| `titre` | `string` | oui | `<h1>`, `name` du JSON-LD, dernier niveau du fil d'Ariane. À l'infinitif : un travail, pas une offre |
| `chapo` | `string` | oui | Résumé. Teaser sur la liste, `description` du JSON-LD |
| `meta` | `IPageMeta` | oui | `<title>` (60 car. max) et meta description (155 car. max) |
| **`cadre`** | `IRealisationCadre` | **oui** | Employeur, intitulé de poste exact, période, équipe |
| `poles` | `readonly PoleId[]` | oui | Pôles réellement mobilisés. **Non contraint** |
| `probleme` | `string` | oui | Le problème posé au départ, dans les termes de l'époque |
| `etapes` | `readonly IRealisationEtape[]` | oui | Ce qui a été fait, étape par étape |
| `resultat` | `string` | oui | Résultat **directionnel**, jamais chiffré. Dit qu'il n'y en a pas quand il n'y en a pas |
| `chiffre` | `IRealisationChiffre` | **non** | Le chiffre. **Trois fiches sur treize** en portent un |
| `decision` | `string` | oui | Ce que le commanditaire pouvait trancher à l'arrivée |

### Ce que le type interdit, et pourquoi

- **`cadre` n'a aucun champ optionnel.** Une fiche ne peut pas paraître sans dire d'où
  elle vient — et une fiche sans provenance se lit comme une prestation vendue. C'est le
  compilateur qui ferme cette porte, parce que c'est le seul garde-fou qui ne s'oublie pas
  en relecture. Le champ `equipe` existe pour la même raison : il empêche « j'ai managé N
  développeurs », en obligeant à écrire ce qui a réellement été encadré.
- **Le chiffre n'a qu'une porte d'entrée.** `IRealisationChiffre` est une entité à part,
  avec une `portee` obligatoire — ce que le chiffre **ne** dit **pas**. Un chiffre publié
  sans sa portée se fait élargir tout seul par celui qui le lit : « +50 % de panier moyen »
  devient « +50 % de chiffre d'affaires ». Concentrer le nombre dans une entité dédiée le
  rend aussi visible en revue : une quatrième fiche chiffrée ne peut pas apparaître au
  détour d'un paragraphe.
- **`IRealisationChiffree` porte les deux gabarits dans le type.** `IRealisation` laisse
  `chiffre` optionnel — c'est le cas général ; l'interface dérivée le rend obligatoire.
  `IProof.fiche` n'accepte qu'une `IRealisationChiffree`, donc le mur de preuves de
  l'accueil **lit** le chiffre sur la fiche au lieu de le recopier. Le nombre n'est écrit
  qu'une fois dans le dépôt : l'accueil et la fiche ne peuvent pas diverger.
- **`resultat` est obligatoire même quand il n'y a rien à annoncer.** Deux fiches n'ont
  aucun résultat mesuré et l'écrivent. Rendre le champ optionnel laisserait une fiche muette
  sur son issue, ce qui se lit comme un résultat tu, pas comme un résultat absent.
- **`poles` n'est pas contraint.** Le modèle de l'offre — ingénierie web → data → (IA
  et/ou SEA & UX) — décrit ce qui se vend aujourd'hui, pas un historique. Un type qui
  exigerait `data` partout forcerait à réétiqueter des travaux de 2017 pour satisfaire le
  compilateur : ce serait le type qui écrirait le contenu.

### Règles portées par le service

Elles vivent dans `src/@vitrine/services/find-realisation.ts` :

| Règle | Comportement |
|-------|--------------|
| `listRealisations()` | Rend la liste **dans l'ordre déclaré**. Aucun tri : une réalisation n'est pas datée, il n'existe pas de clé de tri qui ne soit pas inventée |
| `groupRealisationsByCadre()` | Groupe par employeur, dans l'ordre de `CADRES` (du poste le plus récent au plus ancien). Un cadre sans fiche ne produit pas de groupe vide |
| `findRealisation(slug)` | Rend la fiche et jusqu'à `MAX_REALISATIONS_LIEES` (2) autres, choisies sur les **pôles partagés** — la liste groupe déjà par employeur, proposer trois fois le même employeur en bas de page n'apprendrait rien. **Lève** sur un slug inconnu |
| `listPoles(ids)` (`find-pole`) | Ordonne les pôles selon `POLES_NAV`, jamais selon l'ordre déclaré par la fiche |

## Où vivent les données

```
src/@vitrine/contenu/blog/
├── articles.ts          ← la liste publiée : SOURCE UNIQUE du blog
├── blog-index.ts        ← l'en-tête éditoriale de /blog
├── export-statique.ts   ← un fichier par article
├── test-avant-code.ts
└── mesurer-avant-arbitrer.ts

src/@vitrine/contenu/realisations/
├── realisations.ts        ← la liste publiée : SOURCE UNIQUE de l'espace
├── realisations-index.ts  ← l'en-tête éditoriale de /realisations
├── cadres.ts              ← les trois cadres d'emploi, partagés par les fiches
├── mailingvox-produits.ts ← les fiches, groupées par employeur
├── mailingvox-donnee.ts   ←   (MailingVox est scindé en deux : limite de 300 lignes)
├── verhoeven.ts
└── truffle.ts
```

`articles.ts` et `realisations.ts` alimentent **tout** : la liste, les pages générées au
build (`generateStaticParams`), le sitemap (`@shared/seo/sitemap-entries`) et les données
structurées. Retirer une entrée de ces tableaux la fait disparaître partout — il n'y a pas
de second endroit à mettre à jour.

## Règles générales

- **Pas de binaire en base** : sans objet, il n'y a pas de base. Les rares visuels (logos
  de certification) sont des **références** vers `public/`, jamais des données.
- **Migrations** : sans objet. Un changement de forme d'entité est une modification de
  type, donc une erreur de compilation tant que le contenu ne l'a pas suivie — c'est la
  contrepartie recherchée d'un contenu typé plutôt que stocké.
- **Seed de démonstration** : sans objet. Les jeux de données de test vivent dans
  `tests/fixtures/` (`article.fixture.json` pour le blog).
