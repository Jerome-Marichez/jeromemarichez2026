# Modèle de données

Le site n'a **pas de base de données** (arbitrage justifié dans
[`architecture.md`](./architecture.md)). Le modèle décrit ici est celui du **contenu
éditorial** : des structures TypeScript versionnées dans le dépôt, validées par des
schémas Zod au chargement du module.

> **Le contenu éditorial est de la donnée, pas du JSX.** Ajouter une offre, une
> expérience ou une certification ne demande pas de toucher au rendu.

## Où vit quoi

| Rôle | Emplacement |
|------|-------------|
| Interfaces d'entités (`IXxx`, une par fichier) | `front/src/interfaces/` |
| Alias de types purs (unions, unions discriminées) | `front/src/interfaces/types.ts` |
| Schémas Zod (un par entité, type dérivé par `z.infer`) | `front/src/schemas/` |
| Jeu de données éditorial | `front/src/content/` |
| Contrat de formulaire de contact (partagé front/back) | `shared/interfaces/`, `shared/schemas/` |

Point d'entrée unique du contenu : `front/src/content/index.ts`.

## Entités

| Entité | Rôle | Relations |
|--------|------|-----------|
| `IOffre` | Une des trois offres de service. Porte l'accroche et la **décision** que la prestation permet de trancher. | Contient 1..n `IAxeOffre`. Référencée par `IExperience.offresLiees`. |
| `IAxeOffre` | Un axe de travail à l'intérieur d'une offre : ce qui est fait, la preuve qui l'appuie, et le `volet` auquel il appartient le cas échéant. | Appartient à une `IOffre`. |
| `IExperience` | Une expérience professionnelle du parcours. | Pointe vers 1..n `IOffre` via `offresLiees` (clés `CleOffre`). |
| `IFormation` | Un diplôme obtenu. | Aucune. |
| `ICertification` | Une certification et son justificatif officiel. | Porte un `Justificatif` (union discriminée). |
| `IIdentite` | L'identité professionnelle publique : nom, titre, ville, promesse, profils. Alimente les métadonnées et le JSON-LD. | Porte un `IContact` et 0..n `ILangue`. |
| `IContact` | Les coordonnées directes : e-mail et téléphone. | Appartient à `IIdentite`. |
| `ILangue` | Une compétence linguistique : niveau, référentiel, organisme évaluateur. | Appartient à `IIdentite`. |

```mermaid
erDiagram
    IOFFRE      ||--|{ IAXEOFFRE     : "contient"
    IEXPERIENCE }o--|{ IOFFRE        : "appuie (offresLiees)"
    ICERTIFICATION ||--|| JUSTIFICATIF : "porte"
    IIDENTITE   ||--|| ICONTACT      : "porte"
    IIDENTITE   ||--o{ ILANGUE       : "pratique"
    IFORMATION  {
        string cle
        string intitule
        string niveau
        string ville
        number annee
    }
```

### Clés et identité

- Chaque entité porte une `cle` en minuscules, chiffres et tirets (`^[a-z0-9-]+$`),
  stable dans le temps : elle sert d'identifiant, d'ancre et de segment d'URL.
- `CleOffre` est une union fermée : `'ingenierie-web' | 'data-ia' | 'sea'`. Une
  `offresLiees` pointant vers une offre inexistante ne compile pas.
- La troisième clé était `seo-sea` jusqu'au 2026-08-08 (issue #16). Le référencement
  naturel n'étant pas une prestation vendue, l'offre est devenue `sea` et l'axe « SEO
  technique » a rejoint `ingenierie-web` sous la clé `seo-ready`, comme **propriété du
  livrable**. L'union étant fermée et reprise à l'identique dans quatre schémas Zod
  (`offre`, `accueil`, `experience`), le renommage ne pouvait pas être partiel : une clé
  oubliée ne compile pas, et une référence de preuve orpheline casse le build.

## Contraintes d'intégrité

Elles sont portées **deux fois** : par le typage (à la compilation) et par le schéma Zod
(au chargement). Les schémas sont des `z.strictObject` : toute clé inconnue est rejetée.

| Contrainte | Où |
|------------|-----|
| Aucune chaîne vide (`min(1)`) sur tous les libellés | schémas Zod |
| Une offre a au moins un axe ; une expérience au moins un fait | schémas Zod |
| `IAxeOffre.volet` est optionnel mais jamais vide s'il est présent | `axe-offre.schema.ts` |
| `anneeFin >= anneeDebut` sur une expérience | `experience.schema.ts` (`refine`) |
| Années bornées à `2000..2100`, entières | schémas Zod |
| Aucune clé inconnue dans une entité | `z.strictObject` |

## Règle de véracité portée par le typage

Deux règles du [`CLAUDE.md`](../CLAUDE.md) ne sont pas laissées à la vigilance du
rédacteur : elles sont **rendues impossibles à enfreindre** par le modèle.

### 1. Pas de lien de certification mort ou inventé

`Justificatif` (dans `front/src/interfaces/types.ts`) est une **union discriminée** :

```ts
export type Justificatif =
  | { readonly statut: 'disponible'; readonly url: string }
  | { readonly statut: 'a-fournir' }
```

La variante `a-fournir` **ne porte aucune propriété `url`**. Conséquences :

- lire `certification.justificatif.url` sans narrowing préalable est une **erreur de
  compilation** (`TS2339`) — le rendu ne peut pas produire un lien vers rien ;
- écrire une `url` sur une certification `a-fournir` est une **erreur de compilation**
  (`TS2353`), et le `z.strictObject` la rejetterait aussi **au chargement** ;
- une URL `disponible` doit être absolue et en **HTTPS** (`z.url().startsWith('https://')`).

**À ce jour, aucune URL de justificatif n'est connue : les cinq certifications sont
toutes en `a-fournir`.** Elles ne pourront afficher un lien qu'une fois les URLs
officielles transmises par Jérôme MARICHEZ.

### 2. Pas de chiffre approché

- `ICertification.annee` est `number | null`. `null` signifie « année **non établie** » —
  jamais une valeur approchée. Une seule certification est dans ce cas aujourd'hui :
  Google Ads, datée 2021 sur deux CV et 2022 sur le troisième — arbitrage du 2026-08-08,
  aucune année n'est affichée.
- `IAxeOffre.preuve` est `string | null`. `null` signifie « aucune preuve publiable » :
  la ligne éditoriale impose de reformuler ou de supprimer plutôt que d'inventer.

### 3. Une coordonnée, une seule écriture

`IContact` est le **point unique** des coordonnées : e-mail et téléphone n'existent nulle
part ailleurs dans le code — ni dans un composant, ni dans un `mailto:`, ni dans le
JSON-LD.

| Donnée | Forme stockée | Validation | Forme dérivée |
|--------|---------------|------------|---------------|
| E-mail | adresse telle quelle | `z.email()` | — |
| Téléphone | format national `0X XX XX XX XX` | `TELEPHONE_NATIONAL_FR` | E.164 (`+33…`) par `utils/telephone.ts` |

*(Les valeurs elles-mêmes ne sont pas recopiées ici : elles vivent dans
`front/src/content/identite.ts`, et nulle part ailleurs.)*

Le format international **n'est pas saisi une seconde fois** : `telephoneVersE164()` le
dérive du numéro national, et le motif qui valide la donnée est celui-là même qui
autorise la conversion. Deux écritures d'un même numéro finiraient par diverger, et la
seconde — celle que seules les machines lisent — divergerait en silence.

### 4. Une langue n'est pas une certification

`ILangue` existe pour que la distinction soit **structurelle** et non éditoriale : les CV
de référence classent « Anglais, B2 (EF SET, CECRL) » sous *Langues*. EF SET est le test
qui évalue le niveau, pas un titre obtenu. La compétence part donc dans `knowsLanguage`
du JSON-LD, jamais dans `hasCredential` — où elle aurait gonflé la liste des
certifications d'une ligne indue.

## Validation au chargement

Chaque module de `front/src/content/` **valide ses données à l'import** :

```ts
const donnees = { /* ... */ } satisfies IOffre
export const offreIngenierieWeb: IOffre = offreSchema.parse(donnees)
```

Trois filets, dans cet ordre :

1. `satisfies IOffre` — la forme est vérifiée **à la compilation** ;
2. `offreSchema.parse(...)` — les invariants (chaînes non vides, bornes, clés inconnues)
   sont vérifiés **au chargement du module** ;
3. l'annotation `: IOffre` sur le résultat du `parse` force TypeScript à vérifier que le
   **schéma et l'interface décrivent bien la même forme**. Une divergence entre les deux
   ne compile pas.

Le contenu étant prérendu (SSG), ce chargement a lieu **au build** : une donnée non
conforme casse le build, jamais la production.

## Règles générales

- **Pas de binaire en base** : les images et fichiers sont des **références**
  (URL / chemin d'asset), jamais des BLOB.
- Le contenu est versionné dans le dépôt : toute évolution éditoriale est **relisible en
  revue de PR**, au même titre que le code.
- Pas de migration : il n'y a pas de persistance à faire évoluer.
