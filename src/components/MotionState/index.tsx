'use client'

// MotionState/index.tsx — jeromemarichez-fr
// Le choix « animation figée », publié sur la racine du document pour que le CSS le lise.

import { useEffect } from 'react'
import { useMotionPaused } from '../../hooks/use-motion-paused'

/** Attribut posé sur `<html>`. Les modules CSS le lisent en `:global`. */
export const ATTRIBUT_FIGE = 'data-fige'

/**
 * Ne rend rien, et c'est tout son rôle : refléter l'état de mise en pause sur
 * `document.documentElement`.
 *
 * ## Pourquoi un composant, et pas le bouton
 *
 * `MotionToggle` porte déjà l'état, mais il est rendu **deux fois** sur l'accueil (au
 * pied de la scène et au pied de page) : deux instances se disputeraient la propriété
 * d'un attribut global, et retirer l'une changerait le comportement de l'autre sans
 * qu'aucune ne le dise. La mise en page racine en rend **un seul**, toujours, sur toutes
 * les pages présentes et futures.
 *
 * ## Pourquoi le DOM et pas une prop
 *
 * Ce que l'attribut coupe est du CSS pur — le `backdrop-filter` d'un panneau de verre,
 * rendu au serveur, sans JavaScript. Faire descendre l'état par des props obligerait
 * `GlassSurface` à devenir un composant client, donc à hydrater trois panneaux par page
 * pour un réglage que personne ne touche : le site perdrait un rendu identique avec et
 * sans JavaScript pour rien.
 *
 * `prefers-reduced-motion` est déjà couvert par une requête média dans les modules — la
 * garde CSS ne dépend donc jamais du seul JavaScript. Cet attribut ne sert qu'au
 * contrôle de la page, celui qui satisfait WCAG 2.2.2.
 */
export function MotionState() {
  const fige = useMotionPaused()

  useEffect(() => {
    const racine = document.documentElement
    if (fige) racine.setAttribute(ATTRIBUT_FIGE, 'true')
    else racine.removeAttribute(ATTRIBUT_FIGE)
  }, [fige])

  return null
}
