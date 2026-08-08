# SEO technique

Le référencement est ici une **exigence produit**, pas une passe de finition : l'une des
trois offres vendues sur ce site est « SEO / SEA ». Un site de référencement mal
référencé est une contradiction que le premier prospect technique verra — il lui suffit
d'ouvrir le code source de la page.

Ce document décrit le dispositif et, surtout, **ce qu'il faut faire quand on ajoute une
page**. La règle correspondante est inscrite dans le [`CLAUDE.md`](../CLAUDE.md).

## Le principe

Une page ne rédige **jamais** ses balises elle-même. Elle déclare trois choses — un
titre, une description, un chemin — et tout le reste en découle : URL canonique, Open
Graph, carte Twitter. C'est ce qui rend la règle tenable dans la durée : il n'y a rien à
réinventer, donc rien à oublier.

| Fichier | Rôle |
|---------|------|
| `front/src/@shared/seo/site.ts` | Origine du site, **seul** lecteur de l'environnement, fabrique les URL absolues |
| `front/src/@shared/seo/metadata.ts` | `buildRootMetadata()` (layout) et `buildPageMetadata()` (pages) |
| `front/src/@shared/seo/structured-data.ts` | Graphe JSON-LD `Person` + `ProfessionalService` |
| `front/src/@shared/seo/routes.server.ts` | Découverte des routes réelles — **module serveur uniquement** |
| `front/src/@shared/components/JsonLd/` | Injection du graphe dans le document |
| `front/src/app/robots.ts` | `/robots.txt` |
| `front/src/app/sitemap.ts` | `/sitemap.xml` |
| `front/src/schemas/env.schema.ts` | Validation Zod du domaine de production |
| `front/src/schemas/page-seo.schema.ts` | Validation Zod des métadonnées d'une page |

## Ajouter une page

```tsx
// front/src/app/parcours/page.tsx
import type { Metadata } from 'next'
import { buildPageMetadata } from '@/@shared/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Parcours',
  description: 'Neuf ans d’ingénierie logicielle, de la chefferie de projet au run…',
  path: '/parcours',
})
```

C'est tout. Le titre est suffixé par le gabarit (`Parcours — Jérôme Marichez`), la
canonique et l'Open Graph sont posés, et **la page entre d'elle-même dans le sitemap**.

Trois points de vigilance :

- **Le titre et la description sont bornés par Zod** (60 et 160 caractères, description
  au moins 50). Les pages étant prérendues, un dépassement **casse le build** — il
  n'atteint jamais la production. C'est volontaire : au-delà, les moteurs tronquent.
- **`absoluteTitle: true`** empêche le suffixage. Réservé à la page d'accueil, dont le
  titre porte déjà l'identité complète : le gabarit la répéterait.
- **Hiérarchie de titres** : un seul `<h1>` par page, aucun niveau sauté. Le lien
  d'évitement et le repère `<main>` du layout sont déjà en place.

### Données structurées d'une page

`Person` et `ProfessionalService` décrivent **le site entier** : ils sont injectés une
fois par le layout racine, pas par les pages. Une page n'ajoute un graphe que si elle
décrit une entité qui lui est propre (une page d'offre et son `Service`, par exemple),
en réutilisant le composant `JsonLd`.

## Comment le sitemap se dérive des routes réelles

`routes.server.ts` parcourt l'arborescence de `front/src/app/` au moment du build et
retient tout dossier portant un fichier `page.tsx` (ou `.ts`, `.jsx`, `.js`).

| Cas | Traitement |
|-----|------------|
| `app/parcours/page.tsx` | `/parcours` |
| `app/(vitrine)/contact/page.tsx` | `/contact` — le groupe de routes n'apparaît pas dans l'URL |
| `app/_prive/page.tsx` | ignoré — dossier privé |
| `app/@modale/page.tsx` | ignoré — emplacement parallèle |
| `app/(.)photo/page.tsx` | ignoré — route interceptée |
| `app/[slug]/page.tsx` | **ignoré** — non énumérable sans les données qui le peuplent |
| `app/api/route.ts` | ignoré — gestionnaire de route, pas une page |

**Conséquence pratique : ajouter une page suffit à la faire apparaître dans le sitemap,
en supprimer une suffit à l'en retirer.** Aucune liste à tenir à jour, donc aucune
divergence possible. Une liste écrite à la main serait juste le jour de son écriture et
fausse au premier ajout — et un sitemap faux est pire qu'absent : il envoie les moteurs
sur des 404 et laisse les vraies pages hors index, sans qu'aucun test ni aucun lint ne
s'en aperçoive.

**Le jour où une route dynamique apparaîtra** (`/blog/[slug]`), ses URL devront être
ajoutées explicitement dans `sitemap.ts` à partir du contenu typé qui les peuple —
exactement comme `generateStaticParams` le fera pour le rendu.

Ni `priority` ni `changeFrequency` ne sont émis : Google les ignore depuis des années,
et les renseigner reviendrait à inventer des valeurs. Seul `lastModified`, qui a une
source réelle (la date du fichier de page), est déclaré.

## Domaine de production

`NEXT_PUBLIC_SITE_URL` porte le domaine public, **validée par Zod**
(`front/src/schemas/env.schema.ts`) : protocole `http`/`https` exigé, barre oblique
finale retirée. Une valeur malformée **fait échouer le build** avec un message explicite,
plutôt que de publier silencieusement des canoniques fausses.

Absente, le front retombe sur `http://localhost:3000` — repli utilisable en
développement, jamais en production.

> **C'est une variable de BUILD.** Le préfixe `NEXT_PUBLIC_` signifie que Next.js la
> remplace par sa valeur pendant `next build` : la définir au démarrage du conteneur
> n'aurait aucun effet. `docker-compose.yml` la transmet en argument de build, et le
> `front/Dockerfile` la reçoit via `ARG`. Sur un hébergeur (Vercel, Cloud Run), elle doit
> être présente dans l'environnement **de build**.

## Véracité des données structurées

Les règles de véracité du [`CLAUDE.md`](../CLAUDE.md) s'appliquent au JSON-LD **exactement
comme au texte visible**, alors même qu'il n'est lu que par des machines.

Le graphe est construit à partir du contenu typé de `front/src/content/`, jamais de texte
en dur. Ne sont **pas** émis, faute d'être établis : note ou avis (`aggregateRating`,
`review`), fourchette de prix (`priceRange`), coordonnées (`telephone`, `email`), rue
(`streetAddress`), zone desservie (`areaServed`).

Deux garde-fous sont portés par le **typage** et non par la vigilance :

- une certification dont le justificatif est `a-fournir` est émise **sans lien** —
  l'union discriminée `Justificatif` rend l'accès à `url` non compilable ;
- `sameAs` n'est émis que si un profil public a été **vérifié**. Un `sameAs` erroné
  rattache l'identité du site à un tiers.

## Vérifier

```bash
cd front && NEXT_PUBLIC_SITE_URL="https://jeromemarichez.fr" npm run build
npx next start -p 3117

curl -s http://localhost:3117/robots.txt
curl -s http://localhost:3117/sitemap.xml
```

Le JSON-LD servi doit être analysable — c'est le seul critère qui compte, un graphe
illisible étant purement et simplement ignoré :

```bash
curl -s http://localhost:3117/ \
  | grep -o '<script type="application/ld+json">[^<]*' \
  | sed 's/.*json">//' | node -e 'JSON.parse(require("fs").readFileSync(0,"utf8"))' \
  && echo "JSON-LD valide"
```

Le graphe se contrôle ensuite avec le [validateur de résultats enrichis de
Google](https://search.google.com/test/rich-results) et le
[validateur schema.org](https://validator.schema.org/), une fois le site en ligne.

## Reste à faire

- **Image Open Graph** : aucune n'est fournie. `twitter:card` annonce
  `summary_large_image` ; tant qu'aucune image n'existe, les réseaux retombent sur un
  aperçu sans visuel. À poser en `app/opengraph-image.tsx`.
- **URL des offres dans le JSON-LD** : le `hasOfferCatalog` décrit les trois services
  sans `url`, les pages `/services/<cle>` n'existant pas encore. Déclarer l'URL d'une
  page absente enverrait les moteurs sur une 404.
- **`lastModified`** : en CI, la copie de travail est fraîchement clonée, donc toutes les
  dates valent celle du build. Une date par page, tirée de l'historique Git, serait plus
  juste.
- **Vérification automatisée** : les contrôles ci-dessus sont manuels. Ils gagneraient à
  devenir des tests d'acceptation (`tests/acceptance/uat/`) une fois les pages livrées.
