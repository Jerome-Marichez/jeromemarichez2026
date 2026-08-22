# Pistes d'amélioration

Backlog des améliorations identifiées mais non prioritaires. Chaque entrée précise
le bénéfice attendu et l'effort estimé.

| # | Amélioration | Bénéfice | Effort | Statut |
|---|--------------|----------|--------|--------|
| 1 | Compression du HTML et des polices en production (`gzip`/`brotli` dans `docker/nginx.conf`) | Budget de performance mobile : premier levier, de loin | faible | **identifié, non fait** |
| 2 | Stratégie de chargement des polices (sous-ensemble, `preload`, `size-adjust`) | LCP mobile | moyen | proposé |
| 3 | Réduction du JavaScript inutilisé (~153 Kio) et du JavaScript hérité (~43 Kio) | Budget de performance mobile | moyen | proposé |
| 4 | Préchargement RSC de toutes les routes de pôle depuis l'accueil | Bande passante mobile après le LCP | faible | proposé |

## Budget de performance — diagnostic du 2026-08-22

Les budgets sont devenus exécutables (`make budgets`, voir [testing](./testing.md)). Leur
première exécution rapporte **80 / 81 / 82** en performance mobile, contre un seuil de
**95**. Le seuil n'a pas été touché : ce qui suit est ce qu'il faut corriger.

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
