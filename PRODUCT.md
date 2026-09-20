# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Lecteur principal : le recruteur et l'employeur.** Recruteur, chargé de
recrutement technique, manager ou lead qui reçoit une candidature et veut jauger le
niveau réel avant d'accorder un entretien. Il arrive le plus souvent depuis LinkedIn,
depuis une candidature ou depuis la signature d'un CV, sur mobile aussi souvent que sur
poste de travail.

Son parcours se fait en deux temps, et le site doit servir les deux :

1. **Trente secondes de jaugeage.** Niveau, stack, séniorité, localisation. À ce stade
   il cherche une raison d'éliminer. Le site doit lui donner de quoi continuer.
2. **La lecture détaillée.** Parcours, projets, preuves chiffrées, puis le CV en PDF
   qu'il archive ou transmet.

Un client ou un prospect peut lire le site, mais il n'est pas la cible : aucune
hiérarchie, aucun contenu et aucun appel à l'action ne se décide pour lui.

## Product Purpose

Site CV personnel de Jérôme Marichez, ingénieur logiciel à Lille. Il existe pour
**décrocher un poste**. Le succès se mesure à une seule chose : le recruteur qui arrive
sur le site accorde l'entretien.

Le site est aussi une pièce à conviction sur lui-même. Il est signé par un ingénieur qui
revendique la qualité, la performance et le test : un défaut de performance ou
d'accessibilité y contredit directement ce que la page affirme. Le site est la
démonstration de ce qu'il raconte.

## Positioning

**Ingénieur Full Stack | IA | QA | Data-Driven** (intitulé LinkedIn, il fait foi pour le
titre du site). Dix ans d'expérience, toujours en petite équipe ou en autonomie
complète.

Quatre axes, un seul ingénieur. Ce ne sont pas quatre métiers juxtaposés ni quatre
offres : c'est un ingénieur full stack dont la pratique s'étend à l'IA, à la QA et à la
donnée, parce que les équipes où il a travaillé n'avaient ni QA, ni ops, ni équipe data.

Ce qu'un profil voisin ne pourrait pas copier sans mentir :

- **Le développement en IA augmentée piloté par les tests.** Claude Code et Gemini au
  quotidien, outillés par des agents, des hooks, des skills et des serveurs MCP internes,
  et le test qui fait foi avant, pendant et après la génération. Méthode écrite et
  transmise à une équipe, pas une pratique personnelle.
- **Il conçoit, livre, recette puis exploite.** Donc il paie lui-même le prix de ses
  choix d'architecture. Développeur autant que testeur, certifié ISTQB Foundation.
- **La qualité et l'intégration continue définies là où il n'y en avait pas**, pas
  héritées d'une équipe qui les avait déjà.
- **Le double poste réellement occupé** sur trois expériences : ingénieur et chef de
  projet à la fois, jusqu'au risque financier porté en propre chez Truffle Capital.
  L'encadrement se raconte dans les expériences, jamais dans le titre.

## Operating Context

- **Entrée depuis LinkedIn, une candidature ou un CV.** Le visiteur connaît déjà le nom
  et cherche la confirmation, pas la découverte.
- **Le CV PDF est le livrable attendu.** Le recruteur archive, transmet ou imprime. Six
  versions ciblées existent et servent de matière au site ; le site, lui, raconte un
  profil unique sur ses quatre axes, sans sélecteur de profil.
- **Lecture sur mobile fréquente**, souvent entre deux rendez-vous.
- **Le NDA de l'employeur s'applique** à une partie de la matière (voir les contraintes).

## Capabilities and Constraints

**Fonctionnel**

- Site statique, sans authentification, sans base de données, sans appel réseau.
- **Contact : coordonnées seulement**, en clair et cliquables (téléphone, email,
  LinkedIn, GitHub). Aucun formulaire, donc aucun service tiers, aucune donnée collectée
  et rien à maintenir.
- Téléchargement du CV en PDF.

**Technique**

- Rendu statique ou ISR, métadonnées par page.
- Performance : plancher bloquant à 80 sur la performance, 95 sur l'accessibilité, les
  bonnes pratiques et le SEO. 80 n'est pas la cible, c'est le plancher.
- TypeScript strict, validation Zod de toute entrée externe, aucun fichier source au
  delà de 300 lignes.

**Véracité du contenu, contrainte bloquante**

Le site engage une réputation professionnelle et sera lu par des recruteurs. Aucune
formulation ne dépasse ce qui est réellement établi. La table des interdits
(certifications non obtenues, technologies non pratiquées, périmètres d'encadrement,
attributions par employeur) est conservée dans `CLAUDE.md` et fait foi. Les six CV dans
`/Users/nicolasb/Documents/CV/MES CV/` sont la source en cas de doute sur un chiffre,
une date ou un périmètre.

**Points ouverts, à ne pas trancher seul**

- **Date de la certification Google Ads.** Les nouveaux CV indiquent 2022, un arbitrage
  antérieur retenait 2021. À confirmer par Jérôme MARICHEZ avant publication.
- **URL des justificatifs de certification.** Une certification sans justificatif fourni
  ne se publie pas avec un lien mort : elle reste marquée à fournir.

## Brand Commitments

- **Nom et domaine** : Jérôme Marichez, `jeromemarichez.fr`.
- **Contrainte visuelle posée par Jérôme MARICHEZ** : l'ADN du site est **le café et le
  code**. Elle vient du portfolio d'origine (`github.com/Jerome-Marichez/portfolio`) et
  se lit dans ses jetons : fond café torréfié `#232020`, accent café au lait `#D48646`,
  Fira Code pour le code, Shadows Into Light pour la note manuscrite, et un mug de café
  animé. Cette contrainte est reprise telle quelle, et modernisée.
- **Ton** : sobre, direct, à la première personne. Pas de superlatif, pas de jargon
  d'agence, aucun emoji dans le contenu publié.
- **Aucun tiret cadratin dans un texte destiné à être lu**, attributs d'accessibilité
  compris. La phrase se reformule, le caractère ne se substitue pas.

## Evidence on Hand

**Preuves chiffrées, toutes issues des CV**

| Preuve | Contexte |
|--------|----------|
| Panier moyen en hausse de 50 % | Verhoeven Joaillier, refonte des parcours sur la donnée |
| Lighthouse 98/100, RGAA et WCAG | Sms En Masse |
| Plus de 200 000 installations iOS et Android, près de 1 000 avis | Prézage |
| 3 migrations majeures sans coupure de service | PHP 5 vers 7 puis Node.js, jQuery vers React, Ionic 6 vers 8 et Angular 15 vers 19 |
| Survente supprimée sur des pièces uniques | Verhoeven, ERP M3 Soft synchronisé |
| Fraude en baisse, conversion préservée | Sms En Masse, pression ARCOM |
| Budget ADS et SEO justifié en comité de direction | Truffle Capital et Verhoeven |
| Équipe de 5 à 10 personnes coordonnée, prestataires recrutés à ses frais | Truffle Capital, en indépendant |

**Parcours**

- 2023 à 2026, **Acetelecom** : lead tech sur Sms En Masse, ingénieur fullstack sur
  Prézage et MailingVox. Équipe de trois, sans QA, sans ops, sans équipe data.
- 2019 à 2022, **Verhoeven Joaillier** : développeur fullstack et chef de projet
  digital, poste unique sur le périmètre digital.
- 2017 à 2019, **Truffle Capital** : chef de projet digital et développeur, **en
  indépendant**. Truffle était un client, pas un employeur.

**Formation et certifications**

- Bac +5, Expert en informatique et systèmes d'information, Lille, 2025.
  Bac +3, Développeur, Dunkerque, 2022.
- ISTQB Foundation (2026), Claude with Google Cloud's Vertex AI (2026),
  WeLoveDev Top 5 % React (2023), Google Ads, Google Analytics Individual
  Qualification (2021).

**Sources**

- Six CV ciblés dans `/Users/nicolasb/Documents/CV/MES CV/` : Ingénieur Fullstack & Chef
  de Projet, Ingénieur Fullstack, Chef de projet digital, Testeur QA, Web Analyste,
  Support Applicatif N2. Le plus complet est *Ingénieur Fullstack & Chef de Projet*.
- Portfolio d'origine : `github.com/Jerome-Marichez/portfolio`, qui sert aujourd'hui
  `jeromemarichez.fr`.
- Visuels de projets déjà disponibles dans ce portfolio : Sms En Masse, Prézage,
  MailingVox, Verhoeven Joaillier, Truffle Capital, FishEye, Boule Infernal.

**Ce qui n'existe pas et ne doit pas être inventé**

- Aucun témoignage client, aucune recommandation écrite, aucune référence nommée
  au delà des employeurs déjà cités.
- Aucun tarif, aucune disponibilité, aucune prétention de certification non obtenue.
- **Prézage et Llama 3 peuvent être nommés.** Restent couverts par le NDA : le contenu
  du corpus, les données et les chiffres du projet.

## Product Principles

1. **Le recruteur cherche une raison d'éliminer. Ne pas la lui donner.** Chaque écran
   répond à une question qu'il se pose vraiment, dans l'ordre où il se la pose.
2. **Chaque affirmation porte sa preuve** : un chiffre, une durée, une contrainte tenue.
   Une affirmation sans preuve disponible se reformule ou se supprime.
3. **Ne jamais dépasser ce qui est établi.** Une formule plus vendeuse qui dépasse le
   réel est une faute, pas un arbitrage marketing.
4. **Le site se juge sur lui-même.** Performance, accessibilité et qualité du code font
   partie du propos : ici, un défaut se lit comme un démenti.
5. **Un ingénieur, quatre axes.** Full Stack, IA, QA, Data-Driven se lisent comme une
   seule pratique cohérente, jamais comme un candidat qui ratisse large.

## Accessibility & Inclusion

RGAA et WCAG niveau AA, testés et non déclaratifs. Plancher d'accessibilité à 95,
non négociable. Mécanisme de mise en pause des animations (WCAG 2.2.2) et respect de
`prefers-reduced-motion` : l'ADN du site est animé, donc ce point n'est pas une option.
Lecture au clavier complète, et tout attribut lu par une synthèse vocale est traité
comme un texte destiné à être lu.
