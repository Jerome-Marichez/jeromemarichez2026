'use client'

import { useCallback, useEffect, useState } from 'react'
import styles from './bouton-mouvement.module.css'

/**
 * Mise en pause explicite du mouvement, exigee par WCAG 2.2.2.
 *
 * `prefers-reduced-motion` couvre le visiteur qui a regle son systeme. Ce
 * bouton couvre celui qui ne l'a pas fait et qui veut quand meme que la vapeur
 * s'arrete. Il pose `data-mouvement` sur la racine, ou la feuille globale met
 * toutes les animations en pause.
 *
 * L'etat initial est lu depuis le document plutot que suppose, pour que le
 * rendu serveur et le client ne divergent pas.
 */
export function BoutonMouvement() {
  const [enPause, setEnPause] = useState(false)

  useEffect(() => {
    setEnPause(document.documentElement.dataset.mouvement === 'pause')
  }, [])

  const basculer = useCallback(() => {
    setEnPause((precedent) => {
      const suivant = !precedent
      if (suivant) {
        document.documentElement.dataset.mouvement = 'pause'
      } else {
        delete document.documentElement.dataset.mouvement
      }
      return suivant
    })
  }, [])

  return (
    <button type="button" className={styles.bouton} onClick={basculer} aria-pressed={enPause}>
      {enPause ? 'Reprendre le mouvement' : 'Mettre le mouvement en pause'}
    </button>
  )
}
