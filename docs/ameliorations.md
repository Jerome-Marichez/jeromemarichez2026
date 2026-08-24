# Pistes d'amélioration

Backlog des améliorations identifiées mais non prioritaires. Chaque entrée précise
le bénéfice attendu et l'effort estimé.

| # | Amélioration | Bénéfice | Effort | Statut |
|---|--------------|----------|--------|--------|
| 1 | Compression du HTML en production (`gzip` dans `docker/nginx.conf`) | Budget de performance mobile : premier levier, de loin | faible | **fait** (issue #76) — 80/81/82 → 96/97/97 |
| 2 | Stratégie de chargement des polices (sous-ensemble, `preload`, `size-adjust`) | LCP mobile | moyen | proposé — **c'est là que se joue désormais la marge** (voir plus bas) |
| 3 | Réduction du JavaScript inutilisé (~153 Kio) et du JavaScript hérité (~43 Kio) | Budget de performance mobile | moyen | proposé |
| 4 | Préchargement RSC de toutes les routes de pôle depuis l'accueil | Bande passante mobile après le LCP | faible | proposé |

## Budget de performance — diagnostic du 2026-08-22

Les budgets sont devenus exécutables (`make budgets`, voir [testing](./testing.md)). Leur
première exécution rapporte **80 / 81 / 82** en performance mobile, contre un seuil de
**95** alors en vigueur. Le seuil n'a pas été touché ce jour-là : ce qui suit est ce
qu'il faut corriger.

*(Depuis, le 2026-08-24, le plancher bloquant de performance est passé à 80 sur décision
de Jérôme MARICHEZ, issue #146 : « Pour le LCP j'autorise 80/100 mais pas moins ». La
cible reste 95, et les pistes listées ici restent donc entières.)*

Le profil des trois pages est identique et sans ambiguïté :

| Métrique | Accueil | Pôle |
|----------|---------|------|
| First Contentful Paint | 1,7 s | 1,4 s |
| Speed Index | 1,7 s | 1,4 s |
| Total Blocking Time | 20 ms | 20 ms |
| Cumulative Layout Shift | 0 | 0 |
| **Largest Contentful Paint** | **5,3 s** | **5,0 s** |

Tout est excellent sauf le LCP, et le LCP arrive **3,5 s après** un premier rendu déjà
rapide. Ce n'est donc ni du JavaScript bloquant (TBT à 20 ms) ni de la mise en page
(CLS à 0) : c'est du **transfert**.

Le relevé réseau le confirme :

- le document HTML de l'accueil pèse **120 Kio**, servi **sans compression** ;
- deux polices `woff2` de **67 Kio** et **49 Kio** s'y ajoutent sur le chemin critique ;
- sur le lien bridé (1638 kbps, soit environ 200 Kio/s), ces 236 Kio coûtent à eux seuls
  plus d'une seconde et retardent le rendu du texte principal.

**Ce n'est pas un artefact du harnais de mesure.** `docker/nginx.conf` ne déclare aucune
directive `gzip`, et l'image `nginx:alpine` la laisse commentée par défaut. La production
sert donc, elle aussi, 120 Kio de HTML non compressé. Un HTML de cette taille se comprime
autour de 20 Kio : c'est le premier levier, et c'est une correction de configuration de
service, pas de code applicatif.

Ce correctif touche la configuration de production (`docker/nginx.conf`, et
`scripts/serve-out.mjs` pour que la mesure reste fidèle à ce que sert nginx). Il sort du
périmètre du lot qui a rendu les budgets exécutables, et fait l'objet d'un lot distinct —
c'est justement le budget qui l'a mis au jour, le jour de sa mise en service.

En profil **desktop** non bridé, les mêmes pages sortent à **99 / 100 / 100 / 100** : le
site n'est pas lent dans l'absolu, il l'est sur un mobile en 4G médiocre. C'est le cas
qui compte, et c'est celui que le budget mesure.

## Résultat — compression activée le 2026-08-22 (issue #76)

Le diagnostic ci-dessus est confirmé jusqu'au bout : c'était bien du transfert, et rien
d'autre. `gzip` déclaré dans `docker/nginx.conf` — réglages et justifications dans
[docker](./docker.md#compression) — suffit à faire passer les trois pages.

| Page | Perf avant | Perf après | A11y | Bonnes prat. | SEO |
|------|-----------|-----------|------|--------------|-----|
| accueil | 80 | **96** | 100 | 100 | 100 |
| `/services/ingenierie-web/` | 81 | **97** | 100 | 100 | 100 |
| article de blog | 82 | **97** | 100 | 100 | 100 |

L'`index.html` de l'accueil passe de **119 998 à 22 215 octets sur le fil — 81 % de
moins**. Aucune ligne de code applicatif n'a bougé, aucun composant n'a été supprimé,
aucune police n'a été touchée : le site était correctement construit, il était mal
servi. C'est le genre de défaut qu'aucune revue de code ne trouve et qu'une mesure
trouve le premier jour.

**Ce que la mesure ne dit pas encore.** Le budget est tenu, mais la marge de l'accueil
est d'**un point**. Les deux `woff2` du chemin critique (67 et 49 Kio) n'ont pas bougé —
ils sont déjà compressés à la source et le gzip ne les touche pas, à dessein. Ils
restent donc le premier poste du chemin critique, et c'est la piste 2 qui porte la
marge suivante, pas la piste 3.

Les polices n'ont **pas** été retouchées ici, et c'est délibéré : Fraunces et Inter sont
un choix de design documenté dans [design](./design.md#typographie), déjà réduit au
strict nécessaire (variable, sous-ensemble latin, axe `opsz` seul depuis le retrait de
`SOFT` et `WONK`, registre monospace confié à la pile système). Alléger davantage
suppose d'arbitrer sur le dessin — `preload` sélectif, `size-adjust`, sous-ensemble de
glyphes — et cet arbitrage revient à Jérôme MARICHEZ, pas à un lot de performance.
