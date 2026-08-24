# Pistes d'amélioration

Backlog des améliorations identifiées mais non prioritaires. Chaque entrée précise
le bénéfice attendu et l'effort estimé.

| # | Amélioration | Bénéfice | Effort | Statut |
|---|--------------|----------|--------|--------|
| 1 | Compression du HTML en production (`gzip` dans `docker/nginx.conf`) | Budget de performance mobile : premier levier, de loin | faible | **fait** (issue #76) : 80/81/82 → 96/97/97 |
| 2 | Stratégie de chargement des polices (sous-ensemble, `preload`, `size-adjust`) | LCP mobile | moyen | proposé : **c'est là que se joue désormais la marge** (voir plus bas) |
| 3 | Réduction du JavaScript inutilisé (~153 Kio) et du JavaScript hérité (~43 Kio) | Budget de performance mobile | moyen | **entamé** (issue #145) : Zod sorti du groupage client, 53 Kio de moins ; le reste est chiffré plus bas et revient à l'issue #80 |
| 4 | Préchargement RSC de toutes les routes de pôle depuis l'accueil | Bande passante mobile après le LCP | faible | proposé |

## Budget de performance : diagnostic du 2026-08-22

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
périmètre du lot qui a rendu les budgets exécutables, et fait l'objet d'un lot distinct :
c'est justement le budget qui l'a mis au jour, le jour de sa mise en service.

En profil **desktop** non bridé, les mêmes pages sortent à **99 / 100 / 100 / 100** : le
site n'est pas lent dans l'absolu, il l'est sur un mobile en 4G médiocre. C'est le cas
qui compte, et c'est celui que le budget mesure.

## Résultat : compression activée le 2026-08-22 (issue #76)

Le diagnostic ci-dessus est confirmé jusqu'au bout : c'était bien du transfert, et rien
d'autre. `gzip` déclaré dans `docker/nginx.conf` (réglages et justifications dans
[docker](./docker.md#compression)) suffit à faire passer les trois pages.

| Page | Perf avant | Perf après | A11y | Bonnes prat. | SEO |
|------|-----------|-----------|------|--------------|-----|
| accueil | 80 | **96** | 100 | 100 | 100 |
| `/services/ingenierie-web/` | 81 | **97** | 100 | 100 | 100 |
| article de blog | 82 | **97** | 100 | 100 | 100 |

L'`index.html` de l'accueil passe de **119 998 à 22 215 octets sur le fil, soit 81 % de
moins**. Aucune ligne de code applicatif n'a bougé, aucun composant n'a été supprimé,
aucune police n'a été touchée : le site était correctement construit, il était mal
servi. C'est le genre de défaut qu'aucune revue de code ne trouve et qu'une mesure
trouve le premier jour.

**Ce que la mesure ne dit pas encore.** Le budget est tenu, mais la marge de l'accueil
est d'**un point**. Les deux `woff2` du chemin critique (67 et 49 Kio) n'ont pas bougé :
ils sont déjà compressés à la source et le gzip ne les touche pas, à dessein. Ils
restent donc le premier poste du chemin critique, et c'est la piste 2 qui porte la
marge suivante, pas la piste 3.

Les polices n'ont **pas** été retouchées ici, et c'est délibéré : Fraunces et Inter sont
un choix de design documenté dans [design](./design.md#typographie), déjà réduit au
strict nécessaire (variable, sous-ensemble latin, axe `opsz` seul depuis le retrait de
`SOFT` et `WONK`, registre monospace confié à la pile système). Alléger davantage
suppose d'arbitrer sur le dessin (`preload` sélectif, `size-adjust`, sous-ensemble de
glyphes) et cet arbitrage revient à Jérôme MARICHEZ, pas à un lot de performance.

## Résultat : Zod sorti du groupage client le 2026-08-24 (issue #145)

L'accueil était retombé à **93** après l'arrivée du formulaire de contact. La mesure a
désigné un coupable qu'aucune des hypothèses de départ ne visait.

**Le LCP de l'accueil est son `h1`** (« Je construis, j'exploite, je mesure… »), et il se
peint, sans bridage, **145 ms** après le premier octet. Le texte n'est donc lent nulle
part : ce sont les octets qui l'entourent qui coûtent. Lighthouse simule le lien bridé en
imputant au LCP **tout ce qui a fini de se charger avant cette peinture**, et il y avait
**359 Kio** dans cette fenêtre pour un document de 20 Kio et 13 Kio de feuilles de style.

Le plus gros poste réductible était **Zod, livré en entier au navigateur** : 294 Kio
bruts, 68 Kio transférés, dont Lighthouse relevait **82 % jamais exécutés**. Le schéma de
contact est le seul du site évalué côté client (il n'y a pas de serveur), et
`import { z } from 'zod'` importe un objet de portée dont chaque constructeur reste
atteignable par une propriété : rien ne s'élague au groupage. `zod/mini` est le même Zod,
même noyau, même `safeParse`, mêmes `issues`, même `z.infer`, mais ses contrôles sont des
fonctions passées à `check()`, donc élagables. **Le morceau passe de 68 à 13 Kio
transférés.** La règle du `CLAUDE.md` est tenue à la lettre : la validation reste un
schéma Zod dont le type est dérivé.

| Page | Perf avant | Perf après | A11y | Bonnes prat. | SEO |
|------|-----------|-----------|------|--------------|-----|
| **accueil** | **93** | **95** | 100 | 100 | 100 |
| `/services/ingenierie-web/` | 96 | 96 | 100 | 100 | 100 |
| blog | 97 | 97 | 100 | 100 | 100 |
| article | 97 | 97 | 100 | 100 | 100 |
| article-avec-source | 97 | 97 | 100 | 100 | 100 |
| realisations | 97 | 97 | 100 | 100 | 100 |
| realisation | 97 | 97 | 100 | 100 | 100 |

LCP de l'accueil : **3 169 ms → 2 933 ms**, mesuré à cinq passes, écart-type 20 ms, et
**95 aux cinq passes**. Le blocage total tombe de 86 à 9 ms au passage, le JavaScript en
moins n'ayant plus à être analysé. Les six autres pages ne perdent rien : elles ne rendent
pas le formulaire, donc elles ne portaient pas Zod.

**Méthode.** `node scripts/budgets.mjs`, Lighthouse mobile bridé (slow 4G : 150 ms de RTT,
1 638 kbps, processeur ÷ 4), médiane de trois passes, sept pages. Le score de la catégorie
performance ne dépend que de cinq métriques pondérées ; sur l'accueil, quatre étaient déjà
à 100 et **le LCP portait à lui seul tout l'écart** (73/100 avant, 80/100 après).

**Le `bfcache` était un défaut du harnais, pas du site.** Les deux motifs de refus que
Lighthouse relevait sur chaque page venaient du `Cache-Control: no-store` que
`scripts/serve-out.mjs` posait sur toute réponse, là où `docker/nginx.conf` sert
`immutable` sur `/_next/static/` et `must-revalidate` ailleurs. Le serveur de mesure
reflète désormais la production, comme il le fait déjà pour la compression : le budget
condamnait le site pour un en-tête qu'aucun visiteur ne reçoit. Sans effet sur le score
(`bf-cache` est un diagnostic de poids nul), vérifié avant et après.

**Ce qui reste, et à qui.** Après ce lot, il reste **305 Kio** dans la fenêtre du LCP,
dont **117 Kio de react-dom et du routeur d'App Router** (plancher du cadriciel, non
réductible sans en changer) et **116 Kio des deux `woff2`**. Ces deux postes valent
chacun plus que tout ce qui est encore réductible dans le code applicatif, et le second
reste un arbitrage de dessin. Le détail chiffré est reporté à l'issue **#80**.
