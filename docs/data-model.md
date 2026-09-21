# Modèle de données

Le site n'a **pas de base de données**. Son « modèle de données » est un ensemble de
tableaux TypeScript typés, vérifiés à la compilation, et figés au moment du build
statique.

Deux dossiers, et une règle qui les sépare :

| Dossier | Rôle |
|---------|------|
| `src/interfaces/` | **la forme** : une interface par entité, préfixée `I`. Les alias de types purs dans `types.ts`, uniquement des `type` |
| `src/contenu/` | **la matière** : les tableaux typés qui portent le contenu réel |

## Pourquoi le contenu est du code

Ce détour paraît inutile sur un site de six pages. Il ne l'est pas, et la raison est
précise : le contenu de ce site est **contraint par des règles de véracité bloquantes**
(voir la table des interdits dans `CLAUDE.md`). Une affirmation qui dépasse ce qui est
établi engage une réputation professionnelle.

Rassembler tout le contenu dans un dossier typé rend ces règles **vérifiables**. Une
chaîne perdue au milieu d'un JSX ne l'est pas : personne ne la relit, et la relecture de
véracité exigée avant chaque PR ne saurait pas où regarder.

Second bénéfice : le type interdit d'oublier un champ. Une expérience sans contexte ou
une preuve sans son contexte ne compile pas.

## Les entités

### `IProfil`

L'identité et le paragraphe d'ouverture. `anneesExperience` vaut **10**, et c'est une
correction assumée : les six CV écrivent « neuf ans », Jérôme MARICHEZ a corrigé.

### `IAxe` et `NomAxe`

Les quatre axes de la pratique. `NomAxe` est une union fermée :
`'Full Stack' | 'IA' | 'QA' | 'Data-Driven'`.

**Les quatre axes n'ont aucune hiérarchie entre eux.** L'ordre de déclaration suit
l'intitulé LinkedIn, rien de plus, et aucun champ ne porte de rang. C'est délibéré : un
numéro d'ordre inventerait une priorité que le positionnement ne pose pas.

Chaque axe porte au moins une `IPreuve`.

### `IPreuve`

`{ chiffre, contexte }`. **Les deux champs sont obligatoires**, et c'est la contrainte
la plus utile du modèle : elle rend impossible d'afficher un chiffre nu. « Panier moyen
en hausse de 50 % » sans « Verhoeven Joaillier, refonte des parcours sur la donnée » est
une affirmation invérifiable.

### `IExperience` et `StatutExperience`

Une expérience professionnelle. `StatutExperience` vaut `'salarie'` ou `'independant'`.

**Ce champ existe pour une raison de véracité** : Truffle Capital était un **client**,
sur une mission en indépendant, pas un employeur. Le type force donc à trancher, et la
vue rend la distinction visible au lieu de la laisser se deviner.

`posteIntitule` est **repris à l'identique du CV**, jamais réécrit pour coller à une
offre. `encadrement` vaut `null` quand il n'y en a pas : le champ existe partout, mais il
ne s'invente pas.

`realisations` porte les puces du CV **portées telles quelles**. On corrige l'orthographe
et la syntaxe, on ne change pas l'angle.

### `IProjet`

Un projet détaillé, en quatre parties fixes : `contexte`, `enjeu`, `monRole`,
`resultat`. La structure vient du CV le plus complet et n'en bouge pas.

C'est le cœur du propos pour un recruteur : il veut voir le raisonnement, pas une
vignette. Les quatre champs sont donc obligatoires, et une fiche incomplète ne compile
pas.

### `ICompetence`

`{ famille, items }`. Neuf familles, soixante-et-onze entrées au total. Les `items`
restent courts par construction : ils alimentent un mur dense.

### `ICertification`

Deux champs nullables, et chacun encode une règle :

- **`annee: number | null`.** `null` quand la date n'est pas tranchée. C'est le cas de
  Google Ads : les CV disent 2022, un arbitrage antérieur disait 2021. Tant que Jérôme
  MARICHEZ n'a pas tranché, **aucune année ne s'affiche**. Le type interdit d'en choisir
  une par défaut.
- **`justificatif: string | null`.** `null` tant qu'aucune URL réelle n'a été fournie.
  Aucune n'existe à ce jour, donc aucune certification ne porte de lien. **Une URL de
  certification ne s'invente ni ne s'approxime**, et un lien mort est pire que pas de
  lien.

### `IFormation`

`{ diplome, ville, annee }`. Deux diplômes.

### `IArticle`

Un article de blog. `corpsHtml` porte le corps **sous forme de chaîne HTML**, écrite à la
main et rendue directement.

**Pourquoi cette forme, et à quelle condition elle est sûre.** La contrainte vient de
Jérôme MARICHEZ : « blog en HTML, pas besoin de te prendre la tête sur une architecture
compliquée ». Aucun MDX, aucune chaîne de rendu, aucune dépendance ajoutée. Cinq articles
ne justifient ni catégories, ni étiquettes, ni pagination, ni recherche.

L'injection directe d'HTML est sans risque **ici, et seulement ici** : le contenu est
écrit dans le dépôt et compilé, jamais reçu d'un visiteur. Cette condition est écrite à
l'endroit de l'injection dans `ArticleView`. Le jour où quelqu'un branche une source
externe sur ce champ, elle tombe, et il faut alors assainir.

Les articles vivent dans `src/contenu/blog/`, un fichier par article, agrégés par un
`index.ts` du plus récent au plus ancien.

### `IContact`

Téléphone, email, GitHub, LinkedIn, localisation. **Aucun champ de formulaire**, parce
qu'il n'y a pas de formulaire.

Les profils sont stockés sous leur **forme lisible** (`github.com/Jerome-Marichez`),
celle qui s'affiche. La conversion en URL utilisable passe par `src/utils/lien.ts` :
sans schéma, le navigateur lirait la valeur comme un chemin relatif, et l'adresse
LinkedIn contient un « é » illégal dans une URL brute.

## Ce qui n'est pas une entité

`navigation.ts` et `accroches.ts` portent du contenu, mais pas des entités :

- **`navigation.ts`** décrit les routes. `src/app/sitemap.ts` en dérive, donc une route
  ajoutée au menu entre automatiquement dans le plan du site. Une liste tenue à la main
  en deux endroits finirait par mentir.
- **`accroches.ts`** porte les phrases courtes qui tiennent un écran à elles seules
  (titres de section, chapôs, l'annotation manuscrite de l'accueil). Toutes sont tirées
  des CV, pas écrites par dessus : une accroche inventée serait la première chose qu'un
  recruteur pourrait mettre en défaut en entretien.

## Le découpage en fichiers

`experiences/` est un dossier avec un fichier par expérience (`acetelecom.ts`,
`verhoeven.ts`, `truffle.ts`) et un `index.ts` qui agrège dans l'ordre chronologique
inverse.

C'est la limite de 300 lignes par fichier qui l'impose. Le forçage est bon : chaque
expérience devient relisible seule, ce qui compte pour la relecture de véracité.

## Ce qui n'est pas dans le modèle, et pourquoi

- **Aucun schéma Zod.** La règle du projet impose Zod sur toute entrée externe, et ce
  site n'en a aucune : ni formulaire, ni query, ni webhook, ni variable
  d'environnement. Le contenu n'est pas une entrée externe, c'est du code compilé. Le
  jour où une entrée apparaît, elle passe par `src/schemas/`.
- **Aucune couche de service.** Il n'y a pas de règle de gestion : le site lit du
  contenu et le rend. `src/utils/` porte les quelques helpers purs.
- **Aucun identifiant, aucune clé étrangère, aucune date de publication.** Rien n'est
  requêté, trié dynamiquement ni paginé. Ajouter ces champs « au cas où » serait
  inventer un besoin.
- **Aucun témoignage, aucun tarif, aucune disponibilité.** Ils n'existent pas, et le
  modèle ne leur laisse pas de place où s'installer.

## Règles générales

1. **Les types dérivent des interfaces, jamais l'inverse.**
2. **Les interfaces d'entités vivent dans `src/interfaces/`**, un fichier par entité,
   nom préfixé `I`. Les alias de types purs vont dans `types.ts`.
3. **Aucune chaîne de contenu en dur dans un composant.** Tout passe par
   `src/contenu/`.
4. **Un champ nullable encode une règle**, il ne signale pas une négligence. Chaque
   `null` du modèle est documenté ci-dessus.
5. **En cas de doute sur un chiffre, une date ou un périmètre**, les six CV font foi,
   pas la mémoire de qui écrit.
