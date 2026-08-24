# extract-install-packages.awk — extrait les paquets d'une commande shell.
#
# Lit une commande shell sur l'entrée standard, imprime un candidat paquet par
# ligne. Utilisé par check-new-dependency.sh, et isolé ici pour rester lisible et
# vérifiable seul.
#
# Le découpage suit les règles du shell. Le motif précédent cherchait « npm
# install » n'importe où dans la chaîne : une ligne d'installation CITÉE dans
# l'argument d'une autre commande (gh issue create --body "… npm install …")
# passait pour une installation réelle, et « ». » se retrouvait pris pour un nom
# de paquet. Ici un texte entre guillemets reste UN seul mot, un corps de heredoc
# est de la donnée, et seul le premier mot d'une commande simple peut être le
# gestionnaire de paquets : une citation ne peut plus se faire passer pour une
# commande.
#
# La couverture ne baisse pas, elle suit les séparateurs du shell : une
# installation reste vue après cd … &&, après ;, dans une boucle, derrière sudo
# ou une affectation d'environnement, et les guillemets autour d'un nom de paquet
# sont retirés au lieu de le déformer.
#
# Limite assumée : le contenu d'une substitution ($(…) ou `…`) est traité comme
# opaque. Ce qu'elle produit n'est pas connaissable statiquement, et c'est ce qui
# permet à un corps de PR construit par "$(cat <<EOF … EOF)" de ne plus être lu
# comme du code.
#
# (Écrit pour l'issue #157, correction demandée par Jérôme MARICHEZ le 2026-08-24.)

function addword() {
  if (!hasword) return
  if (discard) { discard = 0; word = ""; hasword = 0; return }
  nw++; w[nw] = word; word = ""; hasword = 0
}

function endcmd(   k, j, mgr, verb) {
  addword()
  k = 1
  # Ce qui précède la commande sans être la commande : mots-clés du shell
  # (for … ; do npm i x ; done), affectations d'environnement (CI=1 npm i x),
  # et les lanceurs qui passent la main (sudo, env, command, time, exec, nohup).
  while (k <= nw && (w[k] ~ /^[A-Za-z_][A-Za-z0-9_]*=/ ||
                     w[k] == "do" || w[k] == "then" || w[k] == "else" ||
                     w[k] == "elif" || w[k] == "!" ||
                     w[k] == "sudo" || w[k] == "env" || w[k] == "command" ||
                     w[k] == "time" || w[k] == "exec" || w[k] == "nohup")) k++
  mgr = (k <= nw) ? w[k] : ""
  if (mgr == "npm" || mgr == "yarn" || mgr == "pnpm" || mgr == "bun") {
    j = k + 1
    while (j <= nw && substr(w[j], 1, 1) == "-") j++
    verb = (j <= nw) ? w[j] : ""
    if ((mgr == "npm"  && (verb == "install" || verb == "i" || verb == "add")) ||
        (mgr == "yarn" &&  verb == "add") ||
        (mgr == "pnpm" && (verb == "add" || verb == "install" || verb == "i")) ||
        (mgr == "bun"  &&  verb == "add")) {
      for (j = j + 1; j <= nw; j++) print w[j]
    }
  }
  nw = 0
}

# Rend la position juste après une substitution de commande.
function skipsub(p, c,   sst, ch, j) {
  if (c == "`") { sst = p + 1; ch = "`" } else { sst = p; ch = ")" }
  j = index(substr(buf, sst), ch)
  return (j == 0) ? n + 1 : sst + j
}

# Note le délimiteur du heredoc, rend la position juste après lui.
function readheredoc(p,   q) {
  p += 2; hddash = 0
  if (substr(buf, p, 1) == "-") { hddash = 1; p++ }
  while (substr(buf, p, 1) == " " || substr(buf, p, 1) == "\t") p++
  hddelim = ""; q = substr(buf, p, 1)
  if (q == "'" || q == "\"") {
    p++
    while (p <= n && substr(buf, p, 1) != q) { hddelim = hddelim substr(buf, p, 1); p++ }
    p++
  } else {
    while (p <= n && substr(buf, p, 1) ~ /[A-Za-z0-9_.-]/) {
      hddelim = hddelim substr(buf, p, 1); p++
    }
  }
  hdpending = 1
  return p
}

BEGIN { mode = "CMD"; nw = 0; word = ""; hasword = 0; discard = 0; hdpending = 0 }

{ buf = buf $0 "\n" }

END {
  n = length(buf); i = 1
  while (i <= n) {
    c = substr(buf, i, 1)

    if (mode == "HD") {                       # corps de heredoc : de la donnée
      j = index(substr(buf, i), "\n")
      if (j == 0) break
      line = substr(buf, i, j - 1); i = i + j
      if (hddash) sub(/^\t+/, "", line)
      if (line == hddelim) mode = "CMD"
      continue
    }

    if (mode == "SQ") {
      if (c == "'") { mode = "CMD" } else { word = word c; hasword = 1 }
      i++; continue
    }

    if (mode == "DQ") {
      if (c == "\\") {
        d = substr(buf, i + 1, 1)
        if (d == "\n") { i += 2; continue }          # continuation de ligne
        if (d == "\"" || d == "\\" || d == "$" || d == "`") {
          word = word d; hasword = 1; i += 2; continue
        }
        word = word c; hasword = 1; i++; continue
      }
      if (c == "\"") { mode = "CMD"; i++; continue }
      if (c == "`" || (c == "$" && substr(buf, i + 1, 1) == "(")) {
        i = skipsub(i, c); continue
      }
      word = word c; hasword = 1; i++; continue
    }

    # mode == CMD
    if (c == "\\") {
      # Barre oblique inverse suivie d'un saut de ligne : continuation de ligne,
      # les deux caractères disparaissent sans ouvrir de mot.
      if (substr(buf, i + 1, 1) == "\n") { i += 2; continue }
      word = word substr(buf, i + 1, 1); hasword = 1; i += 2; continue
    }
    if (c == "'") { mode = "SQ"; hasword = 1; i++; continue }
    if (c == "\"") { mode = "DQ"; hasword = 1; i++; continue }

    if (c == "#" && !hasword) {               # commentaire shell
      j = index(substr(buf, i), "\n")
      if (j == 0) break
      i = i + j - 1; continue
    }

    if (c == "$" && substr(buf, i + 1, 1) == "{") {   # ${VAR} : un seul mot
      j = index(substr(buf, i), "}")
      if (j > 0) { word = word substr(buf, i, j); hasword = 1; i += j; continue }
    }

    if (c == "`" || (c == "$" && substr(buf, i + 1, 1) == "(")) {
      i = skipsub(i, c); hasword = 1; continue
    }

    if (c == "<" && substr(buf, i + 1, 1) == "<" && substr(buf, i + 2, 1) != "<") {
      i = readheredoc(i); continue
    }

    if (c == "<" || c == ">") {               # cible de redirection : pas un paquet
      if (hasword && word ~ /^[0-9]+$/) { word = ""; hasword = 0 } else addword()
      while (i <= n && substr(buf, i, 1) ~ /[<>&]/) i++
      discard = 1; continue
    }

    if (c == "\n") {
      endcmd(); discard = 0
      if (hdpending) { mode = "HD"; hdpending = 0 }
      i++; continue
    }

    if (c == ";" || c == "&" || c == "|" || c == "(" || c == ")" ||
        c == "{" || c == "}") { endcmd(); discard = 0; i++; continue }

    if (c == " " || c == "\t") { addword(); i++; continue }

    word = word c; hasword = 1; i++
  }
  endcmd()
}
