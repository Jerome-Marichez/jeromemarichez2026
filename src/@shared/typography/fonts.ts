// fonts.ts — jeromemarichez-fr
// Les familles de caractères, chargées par `next/font` et exposées en variables CSS.
//
// `next/font/google` télécharge les fichiers au build et les sert depuis le domaine du
// site : aucune requête vers fonts.gstatic.com à l'exécution, donc aucun tiers dans le
// chemin critique et rien à déclarer côté RGPD. `display: 'swap'` évite le texte
// invisible pendant le chargement, qui compterait comme un défaut de LCP.

import { Fraunces, IBM_Plex_Mono, Inter } from 'next/font/google'

/** Titres et accroches. Serif à contraste variable, pour le registre d'atelier. */
export const fontDisplay = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  // Pas de `weight` : `axes` n'est acceptable que sur une fonte chargée en variable.
  // `SOFT` et `WONK` à zéro retirent la fantaisie de Fraunces et laissent une antique
  // ferme — le registre visé, celui d'un homme qui parle, pas d'un logotype d'agence.
  axes: ['SOFT', 'WONK', 'opsz'],
  variable: '--police-titre',
})

/** Texte courant. */
export const fontBody = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--police-texte',
})

/** Étiquettes techniques, chiffres, rangs de pôle. */
export const fontMono = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--police-mono',
})

/** Classes à poser sur `<html>` pour exposer les trois variables. */
export const FONT_VARIABLES = `${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`
