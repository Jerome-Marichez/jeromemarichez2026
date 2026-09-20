# jeromemarichez.fr

Site portfolio et vitrine de services de **Jérôme Marichez**, ingénieur-conseil indépendant à Lille :
ingénierie web, data, IA, SEA & UX.

**Stack** : TypeScript, avec Next.js (App Router).

Le site a deux fonctions et une seule promesse. Il **raconte un parcours** (ingénieur
logiciel, 9 ans, passé par la chefferie de projet et l'AMOA) et il **vend une chaîne à quatre pôles**
qui s'appuie dessus. La promesse : *un seul interlocuteur humain pour vos projets
digitaux, du cadrage au run*. Celui qui cadre est celui qui code, mesure et exploite,
et il répond de tout.

Ce que la promesse **n'engage pas** : l'absence totale de tiers. Sur un projet dont la
taille le demande (c'est rare), Jérôme s'entoure de prestataires qu'il choisit, qu'il
cadre et dont il répond. Le client, lui, ne gère personne d'autre que lui : aucune couche
commerciale, aucun transfert de dossier, l'interlocuteur ne change pas. La page d'accueil
le dit explicitement dans la section « Et si le projet dépasse une personne ? ».

---

## 🎯 Positionnement

| Ce qui est vendu | Ce qui le rend crédible |
|------------------|-------------------------|
| Un interlocuteur unique, pas une chaîne de prestataires | 9 ans en petite équipe ou en autonomie complète, décisions techniques assumées en production |
| Une responsabilité unique, même quand un renfort est nécessaire | Encadrement de prestataires externes déjà exercé (équipe marketing de 5 à 10 personnes et 3 prestataires chez Truffle Capital, SEA/SEO/SMA chez Verhoeven Joaillier) et spécifications écrites pour des tiers extérieurs au domaine (AMOA Artedrone) |
| Du conseil qui va jusqu'au run | Trois migrations majeures menées sans interruption de service |
| De la décision simplifiée, pas des tableaux de bord de plus | Double casquette rare : développeur produit **et** pilote d'acquisition |
| De la mesure conforme | RGPD et DORA tenus en appels d'offres grands comptes |

**Angle éditorial transverse** : ne jamais vendre une techno, toujours vendre une
décision rendue possible. Chaque bloc de service se termine sur ce que le client
*décide* grâce à la prestation, pas sur la liste d'outils employés.

---

## 🧩 Les quatre pôles : une chaîne qui s'embranche

*(Modèle arbitré par Jérôme MARICHEZ le 2026-08-21.)*

```
Ingénierie web  →  DATA  →  ( IA  et/ou  SEA & UX )
```

Ce ne sont **pas quatre offres posées côte à côte au catalogue**, et ce n'est pas non
plus une file de quatre étapes qu'il faudrait toutes acheter :

- **Data est le passage obligé.** Ni IA ni SEA & UX ne se font sans elle : sans mesure,
  l'IA devine et l'acquisition arbitre à l'aveugle.
- **L'embranchement est inclusif.** IA seule, SEA & UX seule, ou les deux.
- **IA et SEA & UX sont parallèles**, jamais successives. Aucun contenu, aucun visuel,
  aucun libellé, aucun numéro d'ordre ne doit laisser croire que l'une vient après
  l'autre.

| Place | Pôle | Ce qu'il fait |
|-------|------|---------------|
| socle | **Ingénierie web** | construire le site, le SaaS, l'application mobile, et les exploiter |
| passage | **Data** | comprendre le métier, gouverner, bâtir ou reprendre la stratégie data, puis explorer |
| suite | **IA** | choisir la solution : règle métier intégrée à l'existant, modèle, ou LLM |
| suite | **SEA & UX** | trancher les parcours et les budgets sur la donnée, puis implémenter |

### Les jointures : la dépendance est de matière, pas d'achat

Les trois arêtes du schéma sont une **entité du modèle** (`IJointure`), pas un champ du
pôle amont : la donnée en ouvre deux, et un pôle ne peut pas porter une seule remise
sans en cacher une.

| De → vers | Ce qui est transmis | Si le client l'a déjà |
|-----------|---------------------|-----------------------|
| Ingénierie web → Data | un produit en production, exploité et mesuré : c'est le run qui fabrique la donnée | on part du produit existant, il n'est pas réécrit pour avoir le droit d'être mesuré |
| Data → IA | un métier formalisé, une donnée gouvernée, et la réponse au test de déterminisme : cette suite ne s'ouvre que si elle est non | la stratégie data est reprise telle quelle, elle ne se rachète pas |
| Data → SEA & UX | la même donnée, tournée vers l'arbitrage | on arbitre dessus dès le premier jour, et rien n'oblige à prendre l'IA |

Cette seconde colonne est ce qui distingue une dépendance de **matière** (vraie et
acceptable) d'une dépendance d'**achat**, fausse et repoussante. Elle est rendue en
tête de chaque page de pôle, là où l'objection naît.

Les **charnières** du site sont le récit de ces jointures : des sections à part entière,
avec leur propre titre. Sans elles, l'offre redevient un catalogue de prestations qu'on
pourrait acheter à autant de fournisseurs différents. La chaîne n'est crédible **que**
parce que c'est la même personne à chaque poste : c'est l'argument de vente, pas un
détail d'organisation.

### Le fil IA : l’axe transverse

Un troisième type de section, le **fil**, traverse tous les pôles au lieu de s'insérer
entre deux. Il lève une confusion que le site crée lui-même : l'IA y apparaît comme
**offre** (le pôle IA) *et* comme **méthode de production** (partout). Le fil parle de la
seconde, en quatre étapes (concevoir, construire, livrer, piloter) et se place avant le
premier pôle pour que la méthode se lise avant les offres.

Sa règle d'écriture est bloquante : **l'IA propose, les tests tranchent**. Le pilotage
SEA reste attribué à la donnée et aux modèles (clustering, profilage), jamais à un agent
autonome. Le fil ne cite aucune preuve qui ne soit déjà portée par un pôle.

### Le socle : Ingénierie web

L'offre socle : concevoir, développer et exploiter un produit web ou mobile de bout en
bout. Elle mobilise toutes les compétences du parcours.

- **UI / UX** : maquettage et design system, catalogue de composants (Storybook),
  accessibilité **RGAA / WCAG / W3C**, refonte de parcours pilotée par la mesure
  (A/B testing, heatmaps, taux de rebond). *Preuve : panier moyen +50 % sur un
  e-commerce de joaillerie de luxe.*
- **Front-end** : React, Next.js avec stratégie de rendu différenciée par type de page
  (CSR / SSR / SSG / ISR) pour arbitrer performance perçue, coût serveur et
  référencement ; Angular, Ionic (iOS / Android), Redux / Zustand / React Query,
  Tailwind, Material UI. *Preuve : Lighthouse 98/100.*
- **Back-end** : Node.js / Express, API REST, webhooks, cloud functions, traitements
  asynchrones distribués (Google Cloud Pub/Sub), PostgreSQL (relationnel, séries
  temporelles, vectoriel), MySQL, Firebase, validation Zod.
- **Architecture & exploitation** : arbitrage monolithe / microservices, Docker, CI/CD
  GitHub Actions, Google Cloud (Cloud Run, VM Compute Engine auto-scalées, cloud
  functions, Pub/Sub), Vercel, serveurs on-premise et IaaS. SLI / SLO / SLA, PCA et PRA
  testés, déploiements sans interruption de service.
- **Qualité** : développement **piloté par les tests (TDD)**, Jest, Cypress, Playwright,
  tests de mutation (Stryker), Postman, tests de performance et de charge,
  non-régression à chaque livraison. Certification **ISTQB Foundation**.
- **Migrations sans coupure** : PHP 5 → 7 puis réécriture Node.js, jQuery → React,
  Ionic 6 → 8 et Angular 15 → 19, chacune menée sans interruption ni gel de la roadmap.
- **Chefferie de projet & AMOA** : recueil du besoin, spécifications, **BPMN 2.0**,
  cartographie SI, matrice de risques, recette et tests d'acceptation (UAT),
  coordination d'une équipe marketing de 5 à 10 personnes et de 3 prestataires.
- **Développement en IA augmentée** : Claude Code et Gemini au quotidien (agents,
  hooks, skills, loop, serveurs MCP internes), piloté par les tests. Vélocité
  augmentée à effectif constant.

### Le passage obligé : Data

**L'ordre est le contenu.** Ce pôle ne part pas de la technique, il y arrive. On comprend
d'abord le métier, on gouverne ensuite, on bâtit alors la stratégie data, et on finit sur
une question posée puis explorée. Toute réécriture qui remettrait la technique en tête
viderait l'offre de son sens.

**La gouvernance précède la stratégie data** (arbitré par Jérôme MARICHEZ le 2026-08-23,
issue #126). Ce n'est pas un détail de plan : ce qui a le droit d'être collecté borne ce
qu'on décide de mesurer, jamais l'inverse. Un plan de collecte arbitré avant la question
du droit se refait.

L'enchaînement complet, celui qui doit rester lisible sur le site :

```
métier  →  gouvernance  →  stratégie data  →  problématique  →  exploration de données
   →  [ le problème a-t-il une réponse déterministe ? ]
         oui  →  on s'arrête. Pas d'IA.
         non  →  alors seulement, on considère l'IA
                 (supervisé, non supervisé, LLM, agents)
```

Le **test de déterminisme** est un test, pas une intuition : il se pose à un endroit
précis, et sa réponse tombe soit **en amont** (le métier la porte déjà, elle est définie
dès le cadrage), soit **pendant l'exploration de données**. Dans les deux cas on s'arrête
là. Le cas « déterministe » s'écrit toujours comme un **bon résultat** : c'est un client à
qui on évite une dépense inutile, jamais un projet raté.

Le test ne gouverne que la suite IA. **Le SEA & UX ne l'attend pas** : les deux suites
restent parallèles et de rang égal.

C'est aussi le pôle par lequel tout passe, et celui qui **se livre pour lui-même**. Un
client peut s'arrêter au document produit ici, sans jamais acheter d'IA ni de SEA. Cette
possibilité doit rester lisible partout : sans elle, le passage obligé se lit comme un
péage.

**1. Comprendre le métier : une prestation à part entière, pas une étape préparatoire.**

- **Faire émerger les règles métier existantes**, celles que les équipes appliquent
  sans les avoir formalisées : recueil auprès de ceux qui les appliquent, mise par
  écrit, confrontation à l'historique. *Preuve : AMOA de la startup biotech Artedrone,
  besoin recueilli auprès des équipes scientifiques et dirigeantes et traduit en
  spécifications exploitables par des prestataires non spécialistes ; BPMN 2.0,
  cartographie SI.*
- **Découvrir les profils de clients** : profilage par clustering (KNN) sur les données
  réelles, restitution visuelle pensée pour la décision.
- **Découvrir les insights métier** : reprise de l'historique, analyse exploratoire sous
  Orange Data Mining, pondération et sélection des variables, élimination des
  corrélations fortes et du bruit. *Preuve : analyse de l'historique des inscriptions
  ayant abouti à des règles anti-fraude (fraude en baisse, conversion en hausse).*
- **Livrable propre** : ce que la donnée dit de l'activité, les règles formalisées, les
  profils identifiés, les questions sans réponse. Le client peut s'arrêter là.

**2. Gouvernance et législation : avant la technique, jamais après.**

- **Qui possède quoi** : cartographie des sources et de leur propriété, ce qui peut
  sortir de chez le client et ce qui doit y rester.
- **Ce qui a le droit d'être collecté et traité** : RGPD, base légale, consentement
  (CMP, déclenchement conditionnel des tags par catégorie), cadrage des traitements avec
  le juridique. *Preuve : conformité RGPD et DORA tenue en appels d'offres grands
  comptes (distribution, assurance, banque) ; cadrage RGPD des données clients chez un
  e-commerçant de joaillerie.*
- **La contrainte oriente la solution** : une donnée qui ne peut pas sortir écarte
  d'office un service tiers et ramène l'arbitrage entre modèle open-weight hébergé et
  règle explicite.

**3. La stratégie data : la déployer, ou s'appuyer sur celle qui existe.**

- **Quand rien n'est en place**, définition des indicateurs à partir des questions du
  métier, plan de collecte, pipelines d'ingestion, modélisation : PostgreSQL
  (relationnel, séries temporelles, vectoriel), MySQL, Firebase.
- **Quand la donnée existe**, reprise de l'existant, agrégation et réconciliation
  multi-sources, dédoublonnage des identités, contrôles d'intégrité et de véracité dès
  l'ingestion, détection d'anomalies. La qualité est un **prérequis**, pas un correctif.
  *Preuve : système d'analyse multi-sources conforme RGPD mesurant la rentabilité client
  à long terme, branché sur Google Ads et Bing Ads.*

**4. La problématique et l'exploration de données : l'étape qui produit le test.**

- **Poser la problématique** : une question à laquelle une donnée peut répondre, et dont
  la réponse change une décision. Un objectif large ne se traite pas, il se découpe en
  questions.
- **Explorer les données** : la question est posée, l'exploration ne cherche plus à
  comprendre l'activité (c'est l'étape 1) mais à savoir si la réponse tient déjà dans un
  seuil, une règle ou une requête.
- **Le test de déterminisme** : « ce problème a-t-il une réponse déterministe ? ». Oui,
  la réponse s'écrit, se vérifie et s'explique, et on s'arrête là, sans IA. Non, elle
  dépend de régularités qu'aucune règle ne tient, et l'IA devient une option à examiner.
  Le test est posé **ici, et une seule fois** : la page IA n'en rejoue pas la question,
  elle part de son résultat. Et il ne préjuge de rien pour le SEA & UX, qui s'ouvre sur
  la même exploration sans avoir à attendre cette réponse.
- **S'arrêter est un résultat** : le cas déterministe n'est pas un projet raté, c'est un
  projet répondu. Le client repart avec la règle qui tranche et sans le budget d'un
  modèle à entraîner puis à maintenir.

### Une des deux suites : IA

**La solution répond au problème posé au départ, pas à l'état de l'art**, et **elle
n'est pas toujours de l'IA**. Ce pôle s'ouvre après la donnée (sans métier formalisé ni
donnée gouvernée, un modèle apprend l'erreur de cadrage au lieu de la corriger), mais il
ne se prend pas forcément : le SEA & UX s'ouvre en parallèle, et rien n'oblige à acheter
de l'IA pour tirer parti de sa donnée.

Ce pôle ne s'ouvre que sur une réponse : celle du **test de déterminisme**, posé à
l'étape 4 du pôle Data. Le site ne repose pas le test ici, il en reçoit le résultat et
raconte ses deux issues. **Les quatre familles se nomment sans hiérarchie** : supervisé,
non supervisé, LLM, agents. Aucune n'est un niveau au-dessus d'une autre.

- **Réponse déterministe : une règle métier suffit**, moins chère à faire tourner, plus
  facile à expliquer à un régulateur, plus simple à corriger qu'un modèle. Intégrée aux
  systèmes existants, c'est un **livrable complet**. *Preuve : règles anti-fraude définies puis
  implémentées dans le produit (fraude en baisse, conversion des inscriptions en
  hausse, latence réduite) ; flux commande, stock et facturation modélisés en BPMN puis
  intégrés entre un ERP et un site marchand (survente évitée sur des pièces uniques).*
- **Machine learning** : supervisé (classification, réseaux de neurones) ou non
  supervisé selon ce que la donnée permet. Modèle supervisé anticipant les échecs de
  dépôt vocal, en production (TensorFlow, inférence en cloud functions) : extraction des
  caractéristiques du signal audio selon une méthode publiée sur **arXiv**, implémentée
  par Jérôme lui-même, adaptée aux données réelles puis industrialisée. *Preuve : routes
  vocales coûteuses évitées.*
- **Coût et propriété** : ce que la stratégie data rembourse. C'est l'argument le plus
  différenciant du pôle. Si la stratégie data est assez solide en amont, on passe sur une
  solution IA **dont le client est propriétaire**, à **coûts réduits**, via
  l'implémentation d'un **workflow agentique de bas niveau cognitif** ; le cas échéant, on
  passe par un **LLM classique, open source ou propriétaire**. Deux notions distinctes,
  à ne jamais fondre en une :
  - **La propriété** : le client possède la solution au lieu de louer indéfiniment
    l'intelligence d'un tiers. Ce qui se lit sur ce qui reste s'il coupe, pas sur le prix
    du mois.
  - **Le niveau cognitif** : un workflow agentique de bas niveau cognitif coûte moins
    cher qu'un LLM sollicité pour tout, parce que la donnée bien structurée a déjà fait
    une fois le travail que le modèle aurait facturé à chaque appel.
- **LLM, quand le problème est du langage** : Claude (Vertex AI, API Anthropic), OpenAI,
  Gemini, Llama. Context engineering, comparaison continue et arbitrage
  **coût / latence / qualité / confidentialité** par cas d'usage. Fine-tuning de
  **Llama 3** sur corpus métier pour l'application mobile *Prézage*, complété par un
  procédé maison d'augmentation du contexte proche du RAG. *Preuve : charge de travail
  des prestataires réduite.*
- **RAG documentaire, fait maison**. Réponse automatisée aux tickets de support de
  niveau 1 : recherche vectorielle PostgreSQL + API OpenAI, réponses ancrées sur la
  documentation interne et non sur la mémoire du modèle. **Aucun framework tiers.**
- **Agents & interopérabilité**. Conception, développement **et documentation** de
  serveurs **MCP** et de plugins **n8n / Make / Zapier** : le produit devient appelable
  par un agent IA ou un scénario no-code chez le client.
- **MLOps & cloud** : déploiement, versioning et monitoring de modèles, CI/CD Docker et
  GitHub Actions, Vertex AI, Pub/Sub, Cloud Run, cloud functions, VM Compute Engine
  auto-scalées. **Pas de cluster Kubernetes administré en propre**. L'absence se dit
  telle quelle.

### L'autre suite : SEA & UX

L'offre acquisition **et arbitrage**, tenue par un ingénieur des données. Elle s'ouvre
elle aussi après la donnée, **en parallèle de l'IA et jamais après elle**. C'est ce qui
la différencie d'une agence : la mesure n'est pas déclarative, elle est construite dans
le code.

> **Point de vigilance éditorial numéro un.** *UX* ne veut **pas** dire design
> graphique. Jérôme ne vend **aucune** création visuelle, aucune direction artistique,
> aucune maquette livrée en fichier. Ce qu'il vend, ce sont des **arbitrages** pris sur
> la donnée : quel parcours, quelle étape supprimée, quel formulaire raccourci, quel
> test A/B tranché, quelle page rendue en SSR plutôt qu'en CSR, puis implémentés par
> lui-même. Toute formulation qui laisserait planer un doute là-dessus est à réécrire.

- **Mesure et taggage** : Google Tag Manager conteneur **web et server-side**,
  dataLayer, Measurement Protocol, plan de taggage et nomenclature d'événements
  standardisée, documentée et opposable. Google Analytics, Matomo, Search Console,
  et côté mobile Firebase Analytics / Crashlytics.
- **Conformité by design** : RGPD, CMP et gestion du consentement (déclenchement
  conditionnel des tags par catégorie), cadrage des traitements avec le juridique.
  La conformité n'est pas une case à cocher après coup : elle conditionne l'architecture
  de collecte.
- **LTV, pas one-shot**. Système d'analyse multi-sources (SEO, SEA, IA) conforme RGPD :
  agrégation des sources d'acquisition, réconciliation et dédoublonnage des identités,
  mesure de la **rentabilité client à long terme**. Les budgets sont arbitrés sur la
  rentabilité réelle, pas sur les métriques natives des régies.
- **Solutions sur mesure multi-source**. Pas de connecteur générique : la donnée est
  agrégée depuis les régies (Google Ads, Bing Ads), le produit et le CRM, puis
  réconciliée selon le modèle métier du client.
- **Tableaux de bord personnalisés** : un dashboard par client et par produit, pas un
  gabarit. Data visualisation et **clustering / profilage clients** (KNN) pour rendre
  la décision lisible : ce que le dirigeant doit trancher apparaît, le reste
  disparaît.
- **SEA & pilotage** : Google Ads, Bing Ads, SEO / SEA / SMA, A/B testing, optimisation
  du taux de conversion. *Budgets pilotés : 100 000 € ADS/SEO chez Truffle Capital,
  ~25 000 € d'encadrement de prestataires SEA chez Verhoeven Joaillier.*
- **Arbitrages UX**. Refonte de parcours pilotée par la mesure : A/B testing des pages
  et des designs, heatmaps, taux de rebond, part de trafic mobile. Une étape disparaît
  parce que les chiffres le disent. *Preuve : panier moyen +50 % chez Verhoeven
  Joaillier.* Et comme c'est la même personne qui code, l'arbitrage décidé est
  **implémenté**, pas transmis à un tiers : c'est ce qui boucle la chaîne sur
  l'ingénierie web.
- **SEO technique** (stratégie de rendu Next.js par type de page, Core Web Vitals,
  Lighthouse, accessibilité) : le référencement traité comme une propriété du produit.

---

## 🚫 Les limites assumées

Le site porte une section **« Ce que je ne fais pas »** ([`src/contenu/limites.ts`](./src/contenu/limites.ts)).
Ce n'est pas un aveu, c'est l'argument qui rend le reste croyable : un prestataire qui
sait tout faire ne sait rien faire.

Chaque ligne y traduit une règle de véracité du [`CLAUDE.md`](./CLAUDE.md) : pas de
cluster Kubernetes administré en propre, pas de framework RAG tiers, pas de création
graphique, une seule chaîne d'outillage de mesure mobile, ISTQB Foundation et rien
au-delà.

**Règle de rédaction de cette section** : elle énonce ce qui est fait, elle ne **nomme
jamais** un outil ou un niveau de certification proscrit par la table de véracité, même
sous forme de négation. « Deux régies publicitaires, pas douze » plutôt que la liste de
celles qui ne sont pas couvertes.

**État du contrôle** : la table des interdits du [`CLAUDE.md`](./CLAUDE.md) fait
autorité, mais **aucun contrôle automatisé ne la vérifie à ce jour**. Le test
d'intégration qui doit échouer dès qu'un terme proscrit réapparaît dans le contenu
publié, `tests/integration/veracite-contenu.integration.spec.ts`, au nommage imposé
par la [stratégie de tests](./docs/testing.md), **reste à écrire**. Son intention
complète (motifs couverts, jeu de données, cas limites) est spécifiée dans l'issue
[#117](https://github.com/Jerome-Marichez/jeromemarichez2026/issues/117) et il revient
à Jérôme MARICHEZ de le poser. D'ici là, la table s'applique à la relecture, pas à
la CI.

---

## 🎓 Certifications à mettre en avant

Chaque certification doit être **cliquable vers son justificatif officiel**. Aucune URL
n'ayant été fournie à ce jour, les sept certifications sont publiées **sans lien**, avec
la mention « justificatifs communiqués sur demande » : un lien mort coûterait plus cher
que l'absence de lien. Les millésimes ont été arbitrés par Jérôme le **2026-08-20** :
Google Ads en 2021 (le CV Tracking Specialist indiquait 2022) et Microsoft Ads
confirmée, sans année connue.

Une certification **se montre, elle ne se commente pas** : le rendu est un logo, un
intitulé, un millésime. Pas de paragraphe d'apport. Ce que chacune change dans la
prestation se dit dans les sections de pôle, à leur place, une fois.

| Certification | Année | Lien officiel | Logo |
|---------------|-------|---------------|------|
| Claude with Google Cloud's Vertex AI | 2026 | *à fournir* | `google-cloud.svg` |
| ISTQB **Foundation** (niveau Avancé **non** obtenu) | 2026 | *à fournir* | *à fournir* |
| Google Analytics Individual Qualification (GAIQ) | 2021 | *à fournir* | `google-analytics.svg` |
| Google Ads | 2021 | *à fournir* | `google-ads.svg` |
| Microsoft Ads | *non renseignée* | *à fournir* | *à fournir* |
| WeLoveDev, Top 5 % React | 2023 | *à fournir* | *à fournir* |
| EF SET, Anglais B2 (CECRL) | *non renseignée* | *à fournir* | *à fournir* |

Les logos suivent la **même règle que les justificatifs** : aucun fichier inventé, aucune
image cassée. Tant qu'un logo manque, la certification s'affiche en toutes lettres. La
provenance, la licence et la base d'usage de chaque fichier déposé sont consignées dans
[`public/certifications/LISEZMOI.md`](./public/certifications/LISEZMOI.md), qui liste aussi
ce qu'il faut réunir pour les quatre logos manquants.

---

## 🗺️ Arborescence prévue

| Route | Rôle |
|-------|------|
| `/` | **Vitrine, pas catalogue déplié.** Accroche et promesse d'interlocuteur unique, le schéma de la chaîne et de son embranchement, les **quatre portes** (nom du pôle, promesse, une preuve chiffrée, lien vers sa page), les deux objections traitées (« et si je disparais ? » et « et si le projet me dépasse ? »), preuves chiffrées, limites assumées, certifications, et un **formulaire de contact** qui compose un `mailto:` avec l'adresse affichée en clair à côté. Le **détail de chaque pôle** vit sur `/services/<pole>/`, qui le disait déjà en plus long ; le **fil IA transverse** est descendu sur `/services/ingenierie-web/`, la page où le site dit comment le code est produit |
| `/services/ingenierie-web` | Le socle en détail |
| `/services/data` | Le passage obligé en détail |
| `/services/ia` | Une des deux suites en détail |
| `/services/sea-ux` | L'autre suite en détail |
| `/realisations` | Liste des réalisations, groupées par cadre (statut, organisation, intitulé de poste exact, période, équipe) |
| `/realisations/<slug>` | Une réalisation. Une page statique par fiche, générée au build par `generateStaticParams` |
| `/blog` | Liste des articles, du plus récent au plus ancien |
| `/blog/<slug>` | Un article. Une page statique par article, générée au build par `generateStaticParams` |
| `/parcours` | *(pas encore construite)* Parcours d'ingénieur et de chef de projet, formation |
| `/contact` | *(reportée)* Le contact vit dans la section `contact` de l'accueil. L'export statique ferme les routes API : le formulaire y **compose une URL `mailto:`** validée côté client, sans appel réseau, sans sous-traitant et sans cookie, et l'adresse reste affichée en clair en `mailto:` à côté pour qui n'a pas de client mail. Le pied de page porte le même `mailto:` direct |

Chaque page de service porte ses propres métadonnées SEO, ses données structurées
(`schema.org/Service` et `ProfessionalService`) et un appel à contact contextualisé.

### L'espace `/realisations/` : le nom est un arbitrage de véracité

**Deux postes salariés et une mission en indépendant** : Lead Tech chez Acetelecom /
MailingVox (2023-2026, salarié), Développeur Full Stack chez Verhoeven Joaillier
(2019-2022, salarié, poste unique), Développeur web & Chef de projet digital chez Truffle
Capital (2017-2019, **en auto-entrepreneur** : Truffle Capital était donc un client).
**Truffle Capital est le seul client cité sur le site.** Artedrone n'en est pas un second :
c'est une **participation du fonds**, au bénéfice de laquelle l'AMOA a été menée dans le
cadre de la mission Truffle. Nommer l'espace « cas clients » ferait passer dix fiches sur
treize pour une relation commerciale qui n'a jamais existé, et réécrirait des intitulés de
poste que le [`CLAUDE.md`](./CLAUDE.md) impose de reprendre à l'identique des CV.

L'espace s'appelle donc **`/realisations/`**, et **chaque fiche porte son cadre** :
statut, intitulé exact, période, taille d'équipe. Le cadre est **obligatoire dans le
type** (`IRealisationCadre`, aucun champ optionnel, `statut` compris) : c'est le
compilateur, et non la relecture, qui interdit qu'une fiche paraisse sans dire d'où elle
vient ni à quel titre. Le `statut` a été ajouté après coup : sans lui, l'espace a publié
« trois postes salariés » pendant plusieurs versions (issue #107).

**Deux gabarits, et c'est structurant.** Trois fiches seulement portent un chiffre : ce
sont les trois du mur de preuves (+50 % de panier moyen, 98/100 Lighthouse, 100 000 € de
budget ADS/SEO **piloté**). Le mur de preuves les **lit sur la fiche** au lieu de les
recopier (`IProof.fiche` n'accepte qu'une `IRealisationChiffree`), donc le nombre n'est
écrit qu'une fois dans le dépôt. Les dix autres fiches sont **sans chiffre** et portent au
mieux un résultat directionnel (« fraude en baisse », « routes vocales coûteuses
évitées »), jamais quantifié ; deux d'entre elles n'ont aucun résultat et l'écrivent noir
sur blanc. Même doctrine que les certifications publiées sans lien plutôt qu'avec un lien
mort.

Le rattachement aux pôles est un `readonly PoleId[]` **non contraint**. Le modèle décrit
l'offre d'aujourd'hui, pas un historique : un type qui exigerait `data` partout forcerait à
réétiqueter des travaux de 2017 pour satisfaire le compilateur. Deux formes portent
l'argument : `['ingenierie-web', 'data', 'sea-ux']` **sans IA** montre qu'on n'est pas
obligé d'acheter de l'IA, `['data']` seul que la donnée se livre pour elle-même.

Une **réalisation n'est pas datée** : ce qui la situe dans le temps est la période du poste
sous lequel elle a été menée, et cette période appartient au contenu de la fiche. Ses
métadonnées passent donc par `buildPageMetadata`, pas par `buildArticleMetadata` qui
exigerait une date de publication qu'il faudrait inventer. Les données structurées sont
volontairement pauvres. `CollectionPage` + `ItemList` sur la liste, `WebPage` avec
`isPartOf` sur la fiche : **ni `Service` ni `CreativeWork`**, aucun type qui affirmerait
une prestation vendue ou une œuvre détenue.

Le **blog** n'est pas un quatrième pôle et la navigation le sépare de la chaîne : ce sont
des notes courtes sur des décisions techniques réelles. Chaque article porte ses propres
métadonnées, un `schema.org/BlogPosting`, un fil d'Ariane `Accueil → Blog → article` et sa
**date** : c'est la seule partie du site dont le sitemap publie une date par page. Chaque
article porte aussi une **figure construite** (du SVG rendu au serveur, jamais un fichier
d'image) et, quand il en a une, un lien vers sa **publication d'origine**. Le modèle de
l'entité est décrit dans [`docs/data-model.md`](./docs/data-model.md), la grammaire des
figures dans [`docs/design.md`](./docs/design.md).

Un article peut reprendre un post publié ailleurs. Il le **porte**, il ne le réécrit pas :
le titre, le plan et les formulations de l'auteur passent tels quels, et seules deux choses
les modifient. La **mise à la forme** d'abord : orthographe, syntaxe, chapô, sections
titrées. La **véracité** ensuite : les règles s'y appliquent mot pour mot, et un post plus
large que ce qui est établi se **réécrit à la baisse**. C'est ce qui s'est passé pour
« J'ai open-sourcé mon plugin Claude Code », dont le post d'origine annonçait une CI plus
validée qu'elle ne l'est. La ligne éditoriale du site (vendre une décision, finir sur ce
que le lecteur peut trancher) vaut pour un article **écrit pour le site** ; elle
n'autorise pas à refaire l'angle d'un texte repris (issue #121). Deux conséquences valables
partout : aucun appel à l'action de réseau social (étoile, partage, contribution) n'entre
dans le contenu publié, et un article dont l'**URL d'origine n'a pas été fournie se publie
sans source** plutôt qu'avec une adresse approchée (même règle que les justificatifs de
certification).

## ✅ Contraintes produit

- **SEO** : **export statique intégral** (`output: 'export'`). Aucune page n'est rendue
  à la requête. Métadonnées, `canonical` et données structurées par page, sitemap et
  robots générés. Conséquence assumée : ni route API, ni ISR, ni Server Action
  (voir [architecture](./docs/architecture.md)).
- **Performance** : Lighthouse à 95 visé sur les 4 catégories, Core Web Vitals au vert.
  Le site est lui-même la démonstration de ce qui est vendu. Le **plancher bloquant** de
  la catégorie performance est à **80** depuis le 2026-08-24 (décision de Jérôme
  MARICHEZ, issue #146) : sous 80 rien ne se livre, entre 80 et 95 le budget passe et le
  rapport le signale. Accessibilité, bonnes pratiques et SEO gardent un plancher à 95.
- **Accessibilité** : RGAA / WCAG AA, testée et non supposée (`uat/`).
- **RGPD** : mesure d'audience conforme, consentement géré, aucune donnée personnelle
  collectée hors formulaire de contact explicite.

Le contenu éditorial doit respecter les **règles de véracité** listées dans
[`CLAUDE.md`](./CLAUDE.md) : ce qui n'est pas revendicable n'est pas écrit, même quand
la formule serait vendeuse.

---

## 🚀 Pour lancer l'application

### Prérequis

- **Node.js 24** (LTS, voir `.nvmrc`) et npm
- **Docker** (pour le démarrage conteneurisé)
- **Make** (interface de commandes)

### Démarrage rapide (Docker)

```bash
cp .env.example .env    # compléter les variables (jamais commité)
make docker-up          # stack conteneurisée (docker compose)
make logs               # logs des conteneurs
make docker-down        # arrêt
```

### Démarrage local (hors Docker)

```bash
make install        # dépendances
make dev            # démarrage en mode développement
```

L'application est servie sur **http://localhost:3000**. Les variables d'environnement
requises sont décrites dans `.env.example` (elles sont validées par un schéma Zod au
démarrage).

### Catalogue de composants

```bash
make storybook          # catalogue local (http://localhost:6006)
make storybook-build    # build statique, dans storybook-static/ (non versionné)
```

Trente et un composants sur trente-quatre y ont une story, chacune colocalisée avec son
composant. Le catalogue charge les
jetons CSS du site et ouvre deux réglages que les pages ne permettent pas : le thème
clair ou sombre, et les quatre teintes de pôle. Les paquets Storybook sont uniquement en
`devDependencies`, donc rien n'en part au navigateur d'un visiteur. Détails,
conventions et exclusions motivées : [`docs/storybook.md`](./docs/storybook.md).

## 🧪 Tests & qualité

```bash
make lint             # Biome + limite 300 lignes/fichier
make type-check       # types TypeScript (tsc --noEmit), sans émission
make test             # unitaires + intégration
make test-unit        # unitaires
make test-int         # intégration
make test-e2e         # e2e (navigateur) : construit et sert `out/`, puis Cypress
make test-system      # système (vrai serveur HTTP)
make test-acceptance  # acceptation / non-fonctionnels (uat/)
make test-mutation    # mutation (Stryker)
```

La stratégie complète (niveaux, conventions d'emplacement et de nommage) est
décrite dans [`docs/testing.md`](./docs/testing.md).

## 📚 Documentation

| Document | Contenu |
|----------|---------|
| [`docs/architecture.md`](./docs/architecture.md) | Architecture applicative et choix techniques |
| [`docs/data-model.md`](./docs/data-model.md) | Modèle de données |
| [`docs/testing.md`](./docs/testing.md) | Stratégie de tests |
| [`docs/ci-cd.md`](./docs/ci-cd.md) | Pipelines CI/CD |
| [`docs/git-workflow.md`](./docs/git-workflow.md) | Workflow Git (main/dev, PR, protections) |
| [`docs/docker.md`](./docs/docker.md) | Conteneurisation |
| [`docs/tooling.md`](./docs/tooling.md) | Outillage (Make, Biome, hooks Claude Code) |
| [`docs/model-routing.md`](./docs/model-routing.md) | Routage de modèles (subagents Claude Code) |
| [`docs/security.md`](./docs/security.md) | Sécurité |
| [`docs/accessibility.md`](./docs/accessibility.md) | Accessibilité |
| [`docs/design.md`](./docs/design.md) | Design & UI |
| [`docs/storybook.md`](./docs/storybook.md) | Storybook (catalogue de composants) |
| [`docs/rgpd.md`](./docs/rgpd.md) | RGPD |
| [`docs/ameliorations.md`](./docs/ameliorations.md) | Pistes d'amélioration |

## Workflow Git

Deux branches permanentes : `main` (production, protégée) et `dev` (intégration).
Toute fonctionnalité passe par `feature/<nom>` → PR vers `dev` → CI verte → merge.
Détails : [`docs/git-workflow.md`](./docs/git-workflow.md).

> Projet géré par Jérôme MARICHEZ.
