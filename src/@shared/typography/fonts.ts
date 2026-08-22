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
