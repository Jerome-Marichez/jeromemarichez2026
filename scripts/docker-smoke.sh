#!/bin/bash
# docker-smoke.sh — construit l'image de production et vérifie qu'elle sert le site.
#
# Contrôle *complet* (~4 min : `npm ci` + `next build` dans l'image). Il ne se contente
# pas de valider la syntaxe de docker/nginx.conf : il démarre l'image et lui pose les
# trois questions que cette configuration prétend savoir répondre.
#
#   1. `/` répond **200** ......... `index` + `try_files` résolvent `<route>/index.html`
#   2. une URL absente répond **404** ... `error_page 404 /404.html` sert la page sans
#                                        transformer le statut en 200
#   3. le HTML sort en **gzip** ... les six directives de compression s'appliquent —
#                                   c'est ce qui vaut 15 points de performance mobile
#
# Le point 3 est le vrai motif du contrôle : une syntaxe valide ne prouve pas qu'une
# directive *agit*. `gzip_types` mal orthographié passerait `nginx -t` ; un
# `Content-Encoding` absent, non.
#
# Usage : ./scripts/docker-smoke.sh [port]

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PORT="${1:-8080}"
IMAGE="jeromemarichez-fr:smoke"
NAME="jmf-smoke-$$"
BASE="http://127.0.0.1:$PORT"

if ! docker info >/dev/null 2>&1; then
  echo "✗ Docker indisponible — ce contrôle exige un démon Docker (la CI en a un)."
  exit 1
fi

cleanup() {
  docker rm -f "$NAME" >/dev/null 2>&1 || true
}
trap cleanup EXIT

echo "→ Construction de l'image"
docker build -t "$IMAGE" "$ROOT"

# `nginx -t` dans l'image *construite* : la copie du Dockerfile est ici vérifiée telle
# qu'elle sera déployée, pas un montage reproduisant l'intention.
echo "→ nginx -t dans l'image construite"
docker run --rm --entrypoint nginx "$IMAGE" -t

echo "→ Démarrage du conteneur sur $BASE"
docker run -d --name "$NAME" -p "$PORT:80" "$IMAGE" >/dev/null

# Sonde HTTP plutôt qu'un `sleep` arbitraire : on attend l'état, pas une durée.
ready=0
for _ in $(seq 1 60); do
  if curl -sf -o /dev/null "$BASE/"; then ready=1; break; fi
  sleep 1
done
if [ "$ready" -ne 1 ]; then
  echo "✗ le conteneur n'a pas répondu sur $BASE en 60 s"
  docker logs "$NAME" || true
  exit 1
fi

fail=0

# 1. L'accueil répond 200.
code="$(curl -s -o /dev/null -w '%{http_code}' "$BASE/")"
if [ "$code" = "200" ]; then
  echo "✓ GET /                     -> 200"
else
  echo "✗ GET /                     -> $code (attendu 200)"
  fail=1
fi

# 2. Une URL absente répond 404 — et pas 200 sur la page d'erreur.
code="$(curl -s -o /dev/null -w '%{http_code}' "$BASE/cette-page-nexiste-pas/")"
if [ "$code" = "404" ]; then
  echo "✓ GET /cette-page-nexiste-pas/ -> 404"
else
  echo "✗ GET /cette-page-nexiste-pas/ -> $code (attendu 404)"
  fail=1
fi

# 3. Le HTML sort compressé, et annonce `Vary: Accept-Encoding`.
headers="$(curl -s -D - -o /dev/null -H 'Accept-Encoding: gzip' "$BASE/")"
if grep -qi '^content-encoding: *gzip' <<<"$headers"; then
  echo "✓ Content-Encoding: gzip sur le HTML"
else
  echo "✗ le HTML n'est pas compressé — la configuration gzip ne s'applique pas"
  echo "$headers"
  fail=1
fi
if grep -qi '^vary:.*accept-encoding' <<<"$headers"; then
  echo "✓ Vary: Accept-Encoding"
else
  echo "✗ Vary: Accept-Encoding manquant — un cache intermédiaire servirait du gzip"
  echo "$headers"
  fail=1
fi

if [ "$fail" -ne 0 ]; then
  echo "✗ l'image ne sert pas le site comme docker/nginx.conf le promet"
  exit 1
fi

echo "✓ l'image sert le site conformément à docker/nginx.conf"
