#!/bin/bash
# nginx-check.sh — valide la syntaxe de docker/nginx.conf avec le vrai nginx.
#
# Contrôle *rapide* (~10 s : un pull d'image, aucun build applicatif). Il monte le
# fichier du dépôt exactement là où le Dockerfile le copie
# (`/etc/nginx/conf.d/default.conf`) et lance `nginx -t`, qui charge
# `/etc/nginx/nginx.conf` — lequel fait `include /etc/nginx/conf.d/*.conf`. C'est donc
# bien le fichier versionné qui est testé, dans le contexte `http` réel de l'image, et
# pas la configuration par défaut : le montage *remplace* le `default.conf` livré.
#
# La version de l'image est celle du Dockerfile, et l'écart est une erreur : une
# directive peut être valide sur une version et pas sur une autre.
#
# Usage : ./scripts/nginx-check.sh

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CONF="$ROOT/docker/nginx.conf"

# L'image de runtime est lue dans le Dockerfile plutôt que recopiée ici : deux sources
# de vérité qui divergent vaudraient moins qu'aucun contrôle.
IMAGE="$(grep -oE '^FROM +nginx:[^ ]+' "$ROOT/Dockerfile" | head -1 | awk '{print $2}')"
if [ -z "$IMAGE" ]; then
  echo "✗ image nginx introuvable dans le Dockerfile (ligne 'FROM nginx:...')"
  exit 1
fi

if ! docker info >/dev/null 2>&1; then
  echo "✗ Docker indisponible — ce contrôle exige un démon Docker (la CI en a un)."
  exit 1
fi

echo "→ nginx -t sur docker/nginx.conf (image $IMAGE)"
docker run --rm \
  -v "$CONF:/etc/nginx/conf.d/default.conf:ro" \
  "$IMAGE" nginx -t

echo "✓ docker/nginx.conf est syntaxiquement valide pour $IMAGE"
