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

## Contrôles automatisés de l'image

`docker/nginx.conf` **décide du comportement du site en production** : résolution des
routes, statut d'erreur, compression. Longtemps rien ne l'a vérifié — une faute de
frappe dans une directive passait toute la CI au vert et ne se manifestait qu'au premier
`docker compose up`. Le cas nominal est le pire : la compression vaut **15 points de
performance mobile**, et un site qui cesse de compresser reste un site qui répond 200.

Deux contrôles, volontairement séparés parce que leur coût n'est pas le même.

| Cible | Ce qu'elle fait | Durée | Où elle tourne |
|-------|-----------------|-------|----------------|
| `make nginx-check` | Monte `docker/nginx.conf` là où le Dockerfile le copie et lance **`nginx -t`** dans `nginx:1.29-alpine`. | ~10 s | **Toute PR → `dev`** (`ci-dev-nginx`) |
| `make docker-smoke` | **Construit l'image**, rejoue `nginx -t` **dedans**, la démarre et l'interroge en HTTP. | ~50 s | **Toute PR → `dev`** (`ci-dev-docker`), plus `workflow_dispatch` |

Le placement du second a été **décidé sur mesure, pas sur intuition** : estimé à quatre
minutes, il en prend cinquante secondes (`npm ci` + `next build` dans une image sans
cache), soit **moins que le contrôle d'accessibilité déjà placé sur `dev`**. Le critère
du dépôt est la durée ; à ce prix-là, faire attendre la PR de production n'a plus de
justification. Le premier contrôle reste malgré tout utile : il tient en 10 s **sans
build applicatif**, donc il répond encore quand `npm ci` est cassé — il sépare « la
configuration nginx est fausse » de « l'application ne construit pas ».

### `nginx -t` teste bien le fichier du dépôt

Le point mérite d'être dit, parce que c'est l'erreur qui rendrait le contrôle décoratif :
`nginx -t` charge `/etc/nginx/nginx.conf`, qui fait `include /etc/nginx/conf.d/*.conf`.
Le script monte le fichier versionné **à la place** du `default.conf` livré par l'image —
c'est donc bien `docker/nginx.conf`, dans le contexte `http` réel de l'image, et pas la
configuration par défaut. La version de nginx n'est pas recopiée dans le script : elle
est **lue dans le `Dockerfile`**, une directive pouvant être valide sur une version et
pas sur une autre.

### La fumée HTTP : la syntaxe ne prouve pas l'effet

Une configuration syntaxiquement valide peut ne rien faire. `make docker-smoke` pose donc
à l'image les trois questions que la configuration prétend savoir répondre :

| Assertion | Ce qu'elle protège |
|-----------|--------------------|
| `GET /` → **200** | `index` + `try_files` résolvent `<route>/index.html` (`trailingSlash: true`) |
| `GET /url-absente/` → **404** | `error_page 404 /404.html` sert la page **sans** transformer le statut en 200 |
| `Content-Encoding: gzip` sur le HTML | les six directives de compression **s'appliquent** — les 15 points |
| `Vary: Accept-Encoding` | un cache intermédiaire ne servira pas du gzip à un client qui n'en veut pas |

C'est l'assertion gzip qui justifie d'aller jusqu'au conteneur démarré : un
`gzip_types` mal placé reste valide pour `nginx -t`, mais un `Content-Encoding` absent ne
se discute pas.

Le conteneur est attendu par **sonde HTTP**, jamais par un `sleep` arbitraire, et retiré
par un `trap` — y compris en cas d'échec, sans conteneur orphelin.

### `.dockerignore`

Le `Dockerfile` fait `npm ci` **puis** `COPY . .`. Sans `.dockerignore`, le
`node_modules` de la machine hôte écrase celui que `npm ci` vient d'installer : sur un
poste macOS, les binaires natifs copiés dans l'image Linux ne sont pas les bons. La CI ne
voyait pas le défaut (checkout vierge) — un poste de développement, si.

<!-- TODO : ajouter ici les services d'infrastructure (base de données, cache…)
     au fur et à mesure, avec leurs volumes. -->
