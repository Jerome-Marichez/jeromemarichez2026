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

Configuration nginx : [`docker/nginx.conf`](../docker/nginx.conf). Deux règles y comptent :

- `trailingSlash: true` fait sortir chaque route en `<route>/index.html`, que la directive
  `index` résout nativement — **aucune règle de réécriture à tenir**.
- Les assets de `/_next/static/` sont immuables (leur nom change à chaque build) et
  portent `max-age=31536000, immutable` ; le HTML porte `max-age=0, must-revalidate`,
  sans quoi une mise en production resterait invisible pour les visiteurs déjà venus.

<!-- TODO : ajouter ici les services d'infrastructure (base de données, cache…)
     au fur et à mesure, avec leurs volumes. -->
