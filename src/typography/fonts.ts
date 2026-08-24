// fonts.ts — jeromemarichez-fr
// Les familles de caractères, chargées par `next/font` et exposées en variables CSS.
//
// `next/font/google` télécharge les fichiers au build et les sert depuis le domaine du
// site : aucune requête vers fonts.gstatic.com à l'exécution, donc aucun tiers dans le
// chemin critique et rien à déclarer côté RGPD. `display: 'swap'` évite le texte
// invisible pendant le chargement, qui compterait comme un défaut de LCP.
//
// Deux familles seulement, et c'est un budget autant qu'un parti pris : chaque fonte
// préchargée est un fichier que le navigateur va chercher avant de peindre le texte. Le
// registre monospace du site — étiquettes, chiffres, rangs — est intégralement composé
// en capitales espacées, où la personnalité d'une fonte de labeur ne se lit pas. Il est
// donc servi par la pile système, qui coûte zéro octet : voir `--police-mono-pile` dans
// `globals.css`.
//
// ## Le préchargement reste actif, et ce n'est pas par défaut d'y avoir pensé
//
// Les deux `woff2` préchargés pèsent 67 et 49 ko : c'est le premier poste du chemin
// critique de l'accueil, dont le LCP est le `h1`. Trois variantes ont donc été mesurées
// pendant l'issue #145, sur l'accueil, tout le reste égal, cinq passes chacune :
//
//   les deux préchargées (ce fichier)  perf 95 aux cinq passes, LCP 2 933 ms ± 20
//   aucune préchargée                  perf 94 à 96 selon la passe, LCP 2 337 à 2 989
//   Inter seule préchargée             perf 94 à 96 selon la passe, LCP 2 959 ms
//
// Retirer le préchargement fait bien tomber le LCP, mais il le fait de façon instable, et
// la raison est mécanique : Lighthouse impute au LCP tout ce qui a fini de se charger
// avant la peinture observée. Non préchargée, une fonte n'est demandée qu'après l'analyse
// des feuilles de style ; elle arrive alors tantôt avant cette peinture, tantôt après, et
// le score bascule de trois points selon le côté où elle tombe. Préchargées, les deux
// fontes arrivent toujours du même côté : le score ne bouge plus d'une passe à l'autre.
// Un budget qui échoue une fois sur trois au hasard se fait désactiver en une semaine.
//
// Surtout, le préchargement sélectif est nommément un arbitrage de dessin, au même titre
// que le sous-ensemble de glyphes ou le `size-adjust` : il revient à Jérôme MARICHEZ et
// pas à un lot de performance. Voir `docs/ameliorations.md` et l'issue #80, qui portent
// déjà ce poste. Ce fichier n'a donc pas changé de comportement, il porte seulement la
// mesure pour que la question ne se rouvre pas sans elle.

import { Fraunces, Inter } from 'next/font/google'

/** Titres et accroches. Serif à contraste variable, pour le registre d'atelier. */
export const fontDisplay = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  // Pas de `weight` : `axes` n'est acceptable que sur une fonte chargée en variable.
  //
  // `opsz` seul. `SOFT` et `WONK` étaient demandés ici pour être aussitôt fixés à zéro
  // dans `globals.css` — or zéro est leur valeur par défaut. Les deux axes étaient donc
  // embarqués dans le woff2 variable, préchargés, puis neutralisés à l'arrivée : le
  // rendu est identique sans eux, pour 60 ko de moins sur le chemin critique. C'est
  // toujours la même antique ferme, débarrassée de la fantaisie de Fraunces — sauf que
  // maintenant on ne la télécharge plus pour l'annuler.
  axes: ['opsz'],
  variable: '--police-titre',
})

/** Texte courant. */
export const fontBody = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--police-texte',
})

/** Classes à poser sur `<html>` pour exposer les deux variables. */
export const FONT_VARIABLES = `${fontDisplay.variable} ${fontBody.variable}`
