#!/bin/bash
# Hook PreToolUse — garde-fou dépendances (jeromemarichez-fr)
# Avant d'autoriser l'ajout d'une dépendance (npm/yarn/pnpm/bun install ou édition
# d'un package.json), vérifie pour chaque NOUVEAU paquet qu'il remplit AU MOINS UNE
# des deux conditions :
#   A. au moins MIN_CONTRIBUTORS (3) contributeurs différents
#      ET une publication récente (moins de MAX_AGE_MONTHS (6) mois) ;
#   B. maintenu par un gros éditeur de confiance (Meta/Facebook, Google, Amazon/AWS,
#      Microsoft, Vercel…) AVEC au moins BIG_ORG_MIN_STARS (1000) étoiles GitHub.
# Dans TOUS les cas (A comme B), la dernière version publiée doit respecter la
# convention SemVer — refus si non conforme OU si l'information est indisponible.
# Sortie : rien = laisser passer ; sinon "deny" (critère non respecté) ou
# "ask" (vérification impossible : réseau, rate limit… — ou publication ancienne :
# un paquet mature en maintenance n'est pas refusé d'office, l'humain tranche).
#
# Lecture des métadonnées npm — trois appels légers, jamais le document complet.
# Le document complet d'un paquet porte tout son historique et pèse plusieurs
# mégaoctets (storybook 23,8 Mo, vite 38,9 Mo) : le télécharger expirait, jq n'y
# trouvait plus dist-tags, et le paquet était refusé pour un manquement à SemVer
# qu'il n'avait pas. Le hook lit donc :
#   1. <pkg>/latest  → version publiée et dépôt déclaré (2 à 13 Ko) ;
#   2. /-/v1/search  → date de publication de cette version (1 à 2 Ko) ; ce champ
#      est absent de <pkg>/latest comme de l'en-tête abrégé install-v1, qui reste
#      par ailleurs multi-mégaoctet. Repli sur le document complet, plafonné à
#      NPM_MAX_DOC_BYTES, pour les paquets que l'index de recherche ignore ;
#   3. l'API GitHub  → étoiles et contributeurs.
# La recherche npm étant une recherche et non une résolution de nom, sa réponse
# n'est retenue que si elle porte EXACTEMENT le nom et la version demandés ; sinon
# la date reste inconnue et le hook part sur "ask".
# curl rend un code 200 dès la réception des en-têtes : un transfert interrompu
# ensuite laisse un corps tronqué sous un code 200. Le code de sortie de curl et
# la relecture du JSON sont donc vérifiés, et une récupération incomplète rend
# "ask", jamais "deny".
#
# Détection d'une installation dans une commande Bash — le découpage suit les
# règles du shell et vit dans lib/extract-install-packages.awk : un texte entre
# guillemets reste un seul mot, un corps de heredoc est de la donnée, et seul le
# premier mot d'une commande simple peut être le gestionnaire de paquets. Une
# ligne d'installation citée dans l'argument d'une autre commande n'est donc plus
# prise pour une installation.
# (Correction demandée par Jérôme MARICHEZ le 2026-08-24, issue #157, au titre de
# la règle 10 du CLAUDE.md. Aucun seuil n'a changé.)

set -u
MIN_CONTRIBUTORS="${MIN_CONTRIBUTORS:-3}"
MAX_AGE_MONTHS="${MAX_AGE_MONTHS:-6}"
BIG_ORG_MIN_STARS="${BIG_ORG_MIN_STARS:-1000}"
# Délai réseau et plafond de taille : ce ne sont pas des critères d'acceptation,
# seulement les bornes de ce qu'on accepte de télécharger. Les dépasser ne fait
# jamais passer un paquet, cela mène à "ask".
NPM_TIMEOUT="${NPM_TIMEOUT:-20}"
NPM_MAX_DOC_BYTES="${NPM_MAX_DOC_BYTES:-3000000}"
# Orgs/mainteneurs de confiance — extensible sans écraser la liste via
# TRUSTED_ORGS_EXTRA="org1 org2" dans l'environnement.
TRUSTED_ORGS="${TRUSTED_ORGS:-facebook meta-llama google googleapis angular aws awslabs amzn amazon-archives microsoft azure vercel vitejs vuejs sveltejs nodejs openjs-foundation colinhacks jestjs testing-library cypress-io stryker-mutator biomejs egoist sindresorhus}"
TRUSTED_ORGS="$TRUSTED_ORGS ${TRUSTED_ORGS_EXTRA:-}"

input=$(cat)
tool=$(printf '%s' "$input" | jq -r '.tool_name // empty')

deny() { jq -n --arg r "$1" '{hookSpecificOutput:{hookEventName:"PreToolUse",permissionDecision:"deny",permissionDecisionReason:$r}}'; exit 0; }
ask()  { jq -n --arg r "$1" '{hookSpecificOutput:{hookEventName:"PreToolUse",permissionDecision:"ask",permissionDecisionReason:$r}}'; exit 0; }

# Extraction des paquets d'une commande Bash : un découpage respectant les règles
# du shell, pour qu'une ligne d'installation CITÉE dans l'argument d'une autre
# commande ne passe plus pour une installation réelle. Détail et limites assumées
# dans l'extracteur lui-même.
HOOK_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
EXTRACTOR="$HOOK_DIR/lib/extract-install-packages.awk"

pkgs=""
case "$tool" in
  Bash)
    cmd=$(printf '%s' "$input" | jq -r '.tool_input.command // empty')
    # Extracteur manquant : on ne laisse pas passer en silence, on demande.
    [ -r "$EXTRACTOR" ] || ask "Garde-fou dépendances : extracteur $EXTRACTOR illisible — impossible d'analyser la commande, confirmation manuelle requise."
    pkgs=$(printf '%s\n' "$cmd" \
      | awk -f "$EXTRACTOR" \
      | grep -vE '^(-|$)' \
      | sed -E 's/(.)@[^@]*$/\1/' \
      | sort -u)
    ;;
  Edit|Write)
    file=$(printf '%s' "$input" | jq -r '.tool_input.file_path // empty')
    case "$file" in */package.json|package.json) ;; *) exit 0 ;; esac
    if [ "$tool" = "Write" ]; then
      newdeps=$(printf '%s' "$input" | jq -r '.tool_input.content // empty' \
        | jq -r '(.dependencies // {}) + (.devDependencies // {}) | keys[]' 2>/dev/null)
    else
      newdeps=$(printf '%s' "$input" | jq -r '.tool_input.new_string // empty' \
        | grep -oE '"@?[A-Za-z0-9._/-]+"[[:space:]]*:[[:space:]]*"[~^>=<]?[0-9]' \
        | sed -E 's/^"([^"]+)".*/\1/' \
        | grep -vE '^(version|node|npm|pnpm|yarn|bun|packageManager)$')
    fi
    olddeps=""
    [ -f "$file" ] && olddeps=$(jq -r '(.dependencies // {}) + (.devDependencies // {}) | keys[]' "$file" 2>/dev/null)
    pkgs=$(comm -13 <(printf '%s\n' "$olddeps" | sort -u) <(printf '%s\n' "$newdeps" | sort -u) | grep -v '^$')
    ;;
  *) exit 0 ;;
esac

[ -z "$pkgs" ] && exit 0

TOKEN=$(gh auth token 2>/dev/null || printf '%s' "${GITHUB_TOKEN:-}")
gh_get() { # $1 = url — corps puis code HTTP en dernière ligne
  if [ -n "$TOKEN" ]; then
    curl -sSL --max-time 10 -H "Authorization: Bearer $TOKEN" -H "Accept: application/vnd.github+json" -w '\n%{http_code}' "$1" 2>/dev/null
  else
    curl -sSL --max-time 10 -H "Accept: application/vnd.github+json" -w '\n%{http_code}' "$1" 2>/dev/null
  fi
}

npm_body=$(mktemp) || ask "Impossible de préparer la lecture du registre npm — confirmation manuelle requise."
trap 'rm -f "$npm_body"' EXIT
npm_get() { # "$@" = arguments curl — corps dans $npm_body, code HTTP sur stdout.
  # Sortie ≠ 0 : récupération incomplète. curl rend 200 dès les en-têtes, donc son
  # propre code de sortie (28 délai dépassé, 18 transfert partiel…) et la relecture
  # du JSON sont les seuls témoins d'un corps tronqué.
  local code rc
  code=$(curl -sSL --max-time "$NPM_TIMEOUT" -o "$npm_body" -w '%{http_code}' "$@" 2>/dev/null)
  rc=$?
  printf '%s' "$code"
  [ "$rc" -eq 0 ] || return 1
  [ "$code" = "200" ] || return 0
  jq -e . "$npm_body" >/dev/null 2>&1 || return 1
  return 0
}

# Date limite (il y a MAX_AGE_MONTHS mois) au format ISO — comparaison lexicographique.
cutoff=$(date -u -v-"${MAX_AGE_MONTHS}"m +%Y-%m-%dT%H:%M:%S 2>/dev/null \
      || date -u -d "-${MAX_AGE_MONTHS} months" +%Y-%m-%dT%H:%M:%S 2>/dev/null)
[ -z "$cutoff" ] && ask "Impossible de calculer la date limite de fraîcheur — confirmation manuelle requise."

# Le word-splitting sur $pkgs est voulu (liste séparée par des espaces) ; set -f
# désarme le glob pour qu'un nom de paquet contenant * ou ? ne soit pas expansé
# sur le disque.
set -f
for pkg in $pkgs; do
  enc=$(printf '%s' "$pkg" | sed 's|/|%2F|g')

  # 1. Version publiée et dépôt déclaré — quelques kilooctets.
  code=$(npm_get "https://registry.npmjs.org/$enc/latest")
  [ "$?" -eq 0 ] || ask "Dépendance $pkg : récupération des métadonnées npm incomplète (transfert interrompu ou réponse tronquée) — impossible de vérifier, confirmation manuelle requise."
  case "$code" in
    200) ;;
    404) deny "Dépendance $pkg : introuvable sur le registre npm — installation refusée." ;;
    *)   ask  "Dépendance $pkg : registre npm injoignable (HTTP $code) — confirmation manuelle requise." ;;
  esac

  latest=$(jq -r '.version // empty' "$npm_body")
  repo=$(jq -r '.repository.url // .repository // empty' "$npm_body" \
    | grep -oE 'github\.com[/:][A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+' | head -1 \
    | sed -E 's|github\.com[/:]||; s|\.git$||')
  owner=$(printf '%s' "$repo" | cut -d/ -f1 | tr '[:upper:]' '[:lower:]')

  # SemVer obligatoire — refus aussi quand l'information est indisponible.
  SEMVER_RE='^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)(-[0-9A-Za-z.-]+)?(\+[0-9A-Za-z.-]+)?$'
  if [ -z "$latest" ]; then
    deny "Dépendance $pkg : version publiée introuvable — impossible de vérifier la convention SemVer, installation refusée."
  fi
  if ! printf '%s' "$latest" | grep -qE "$SEMVER_RE"; then
    deny "Dépendance $pkg : la version publiée '$latest' ne respecte pas la convention SemVer — installation refusée."
  fi

  # 2. Date de publication de CETTE version, en deux temps.
  # 2a. L'index de recherche la rend en 1 à 2 Ko. Mais c'est une recherche, pas
  # une résolution de nom : sur un nom inexistant il rend un paquet voisin. Sa
  # réponse n'est donc retenue que si le nom ET la version correspondent.
  pubdate=""
  scode=$(npm_get --get --data-urlencode "text=$pkg" --data-urlencode "size=1" \
                  "https://registry.npmjs.org/-/v1/search")
  if [ "$?" -eq 0 ] && [ "$scode" = "200" ]; then
    pubdate=$(jq -r --arg p "$pkg" --arg v "$latest" \
      '(.objects[0].package // {}) | select(.name == $p and .version == $v) | .date // empty' \
      "$npm_body" 2>/dev/null)
  fi
  # 2b. Repli sur le document complet pour ce que l'index ignore (un paquet
  # déprécié n'y figure pas : request, left-pad) ou quand il limite le débit. Le
  # plafond de taille rend ce repli sûr, et les deux populations se complètent :
  # un paquet absent de l'index est un paquet qui ne publie plus, donc au document
  # petit (request 307 Ko, left-pad 23 Ko), tandis que les documents de plusieurs
  # mégaoctets appartiennent aux paquets actifs, que l'index connaît. Au-delà du
  # plafond curl abandonne et la date reste inconnue, ce qui mène à "ask".
  # On ne se rabat PAS sur .time.modified : c'est la date de dernière modification
  # du document, pas celle de la version. Elle bouge quand un paquet est déprécié,
  # et ferait passer pour récent un paquet qui ne publie plus (request, publié pour
  # la dernière fois en 2020-02, porte un .time.modified de 2026-07).
  if [ -z "$pubdate" ]; then
    fcode=$(npm_get --max-filesize "$NPM_MAX_DOC_BYTES" "https://registry.npmjs.org/$enc")
    if [ "$?" -eq 0 ] && [ "$fcode" = "200" ]; then
      pubdate=$(jq -r --arg v "$latest" '.time[$v] // empty' "$npm_body" 2>/dev/null)
    fi
  fi

  recent=0
  [ -n "$pubdate" ] && [ "$(printf '%s' "$pubdate" | cut -c1-19)" '>' "$cutoff" ] && recent=1

  # Condition B — gros éditeur de confiance + beaucoup d'étoiles
  if [ -n "$owner" ]; then
    for org in $TRUSTED_ORGS; do
      if [ "$owner" = "$org" ]; then
        resp=$(gh_get "https://api.github.com/repos/$repo")
        gcode=$(printf '%s' "$resp" | tail -n1)
        gbody=$(printf '%s' "$resp" | sed '$d')
        if [ "$gcode" = "200" ]; then
          stars=$(printf '%s' "$gbody" | jq -r '.stargazers_count // 0')
          [ "$stars" -ge "$BIG_ORG_MIN_STARS" ] 2>/dev/null && continue 2
        fi
      fi
    done
  fi

  # Condition A — fraîcheur + contributeurs. Une publication ancienne peut être un
  # simple paquet mature en maintenance : confirmation manuelle plutôt que refus sec.
  if [ "$recent" != 1 ]; then
    [ -z "$pubdate" ] && ask "Dépendance $pkg : date de publication indisponible sur le registre npm — impossible de vérifier la fraîcheur, confirmation manuelle requise."
    ask "Dépendance $pkg : dernière publication le $pubdate (> $MAX_AGE_MONTHS mois) et pas un éditeur de confiance. Paquet mature en maintenance ou paquet abandonné ? Confirmation manuelle requise."
  fi
  [ -z "$repo" ] && deny "Dépendance $pkg : aucun dépôt GitHub déclaré sur npm — impossible de vérifier les contributeurs, installation refusée."

  resp=$(gh_get "https://api.github.com/repos/$repo/contributors?per_page=$MIN_CONTRIBUTORS")
  code=$(printf '%s' "$resp" | tail -n1)
  body=$(printf '%s' "$resp" | sed '$d')
  [ "$code" != "200" ] && ask "Dépendance $pkg : impossible de compter les contributeurs de $repo (HTTP $code) — confirmation manuelle requise."
  # Même règle que pour npm : un corps illisible est un défaut de récupération, pas
  # un dépôt à zéro contributeur — sinon la troncature redeviendrait un refus.
  contribs=$(printf '%s' "$body" | jq -r 'if type == "array" then length else empty end' 2>/dev/null)
  [ -z "$contribs" ] && ask "Dépendance $pkg : réponse GitHub illisible pour les contributeurs de $repo — confirmation manuelle requise."
  if [ "$contribs" -lt "$MIN_CONTRIBUTORS" ] 2>/dev/null; then
    deny "Dépendance $pkg ($repo) : $contribs contributeur(s) (< $MIN_CONTRIBUTORS) — installation refusée."
  fi
done
set +f

exit 0
