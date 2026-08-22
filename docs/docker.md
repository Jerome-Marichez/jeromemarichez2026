# Docker

## Principe

Stack conteneurisée dès le bootstrap : `Dockerfile` multi-stage (build → runtime
minimal) par app, orchestration par `docker-compose.yml` à la racine, interface
unique via Make.

Le site étant en `output: 'export'` (voir [architecture](./architecture.md)), il n'y a
**rien à exécuter au runtime** : l'étape de build produit `out/`, et l'image de runtime
est un **nginx qui sert des fichiers**, pas un Node qui rend des pages. `next start` ne
fonctionne pas sur une sortie exportée — c'est la raison du changement, pas une
préférence.

```bash
cp .env.example .env    # variables locales (jamais commité)
make docker-up          # build + démarrage
make logs               # logs agrégés
make docker-down        # arrêt
```

## Règles

- **Aucun secret dans les images** : variables sensibles via `.env` (gitignoré) —
  le modèle documenté est **`.env.example`** (à tenir à jour à chaque variable ajoutée).
- Données persistées via **volumes** (jamais dans le conteneur).
- Images de prod **multi-stage** (build → runtime minimal) — c'est le cas des
  `Dockerfile` générés (`node:24-alpine`).

## Services

| Service | Build | Port | Notes |
|---------|-------|------|-------|
| `app` | `./Dockerfile` | `${APP_PORT:-3000}` → `80` | `npm ci && npm run build`, puis `nginx:1.29-alpine` sert `out/` |

Configuration nginx : [`docker/nginx.conf`](../docker/nginx.conf). Trois règles y comptent :

- `trailingSlash: true` fait sortir chaque route en `<route>/index.html`, que la directive
  `index` résout nativement — **aucune règle de réécriture à tenir**.
- Les assets de `/_next/static/` sont immuables (leur nom change à chaque build) et
  portent `max-age=31536000, immutable` ; le HTML porte `max-age=0, must-revalidate`,
  sans quoi une mise en production resterait invisible pour les visiteurs déjà venus.
- **La compression est déclarée explicitement** — voir ci-dessous.

## Compression

`nginx:alpine` livre la directive `gzip` **commentée**. Tant qu'on ne la déclare pas,
le site part en clair : l'accueil sortait en **120 Kio de HTML brut**, ce qui coûtait
15 points de performance mobile aux budgets (LCP à 5,3 s pour un FCP à 1,7 s — du
transfert, pas du calcul). Une configuration nginx qu'on ne complète pas est une
configuration qui ne compresse pas ; ça ne se voit pas en desktop, et ça se paie
intégralement en 4G.

| Réglage | Valeur | Pourquoi cette valeur |
|---------|--------|-----------------------|
| `gzip_comp_level` | `6` | Mesuré, pas recopié : sur l'`index.html` de l'accueil, le niveau 6 rend 22 226 octets, le niveau 9 en rend 22 092 — **134 octets de mieux (0,6 %) pour environ deux fois le temps CPU**. Le gain se joue entre 1 et 6. |
| `gzip_min_length` | `1024` | En deçà de 1 Kio, l'en-tête gzip et les tables de Huffman mangent le gain, et la réponse tient de toute façon dans la première fenêtre de congestion : elle arrive dans le même aller-retour, compressée ou non. Le défaut de nginx (20 octets) fait l'inverse. |
| `gzip_vary` | `on` | Une même URL répond désormais en clair ou compressé selon `Accept-Encoding` : sans `Vary`, un cache intermédiaire servirait du gzip à un client qui ne l'a pas demandé. |
| `gzip_proxied` | `any` | Par défaut nginx refuse de compresser une réponse relayée à un proxy. Le site est destiné à vivre derrière un reverse proxy / CDN : sans cette ligne, la compression s'éteindrait justement en production. |
| `gzip_types` | texte + `image/svg+xml` | `text/html` est **toujours** compressé par nginx et ne se déclare pas. Les `woff2`, PNG, WebP et AVIF sont **volontairement absents** : déjà compressés à la source, les repasser au gzip brûle du CPU pour ~0 % de gain, parfois pour grossir la réponse. |

**gzip et pas brotli** : le module `ngx_brotli` n'est pas dans l'image officielle, et
l'ajouter imposerait de compiler nginx nous-mêmes. L'écart brotli/gzip sur du HTML est
de l'ordre de 15 % — il ne justifie pas, aujourd'hui, une image maison à maintenir. Le
jour où elle existe pour une autre raison, brotli s'y ajoute.

### Le harnais de mesure reflète cette configuration

[`scripts/serve-out.mjs`](../scripts/serve-out.mjs) — le serveur qu'utilisent les tests
e2e et `make budgets` — reproduit ces réglages : mêmes types, même seuil, même niveau,
même `Vary`.

**Le sens de la dépendance est fixe et ne s'inverse jamais : `docker/nginx.conf`
décide, le harnais reflète.** Un harnais qui compresserait sans que la production
compresse annoncerait une performance que le visiteur ne reçoit pas — c'est un truquage
de la mesure au sens de la règle 8 du `CLAUDE.md`. L'inverse (harnais en clair,
production compressée) condamne un site qui va bien. Toute évolution des réglages
commence donc par `docker/nginx.conf`.

<!-- TODO : ajouter ici les services d'infrastructure (base de données, cache…)
     au fur et à mesure, avec leurs volumes. -->
