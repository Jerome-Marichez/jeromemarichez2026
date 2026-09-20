import { Fira_Code, Shadows_Into_Light } from 'next/font/google';

/**
 * Deux voix, et deux seulement.
 *
 * Fira Code porte tout le site. Ce n'est pas le monospace-costume que l'on
 * plaque sur un sujet technique : la mise en page entiere s'aligne sur sa
 * cellule de caractere, donc la police est la grille.
 *
 * Shadows Into Light ne porte que l'annotation manuscrite, la voix humaine
 * dans la marge. Elle reste rare par construction : des qu'elle sert deux fois
 * sur un ecran, elle a cesse d'etre une annotation.
 */

export const policeCode = Fira_Code({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--police-code',
  display: 'swap',
});

export const policeMain = Shadows_Into_Light({
  subsets: ['latin'],
  weight: '400',
  variable: '--police-main',
  display: 'swap',
});
