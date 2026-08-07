# Docker

## Principe

Stack conteneurisée dès le bootstrap : `Dockerfile` multi-stage (build → runtime
minimal) par app, orchestration par `docker-compose.yml` à la racine, interface
unique via Make.

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
| `app` | `./Dockerfile` | `${APP_PORT:-3000}` | `npm run build` puis `npm run start` |

<!-- TODO : ajouter ici les services d'infrastructure (base de données, cache…)
     au fur et à mesure, avec leurs volumes. -->
