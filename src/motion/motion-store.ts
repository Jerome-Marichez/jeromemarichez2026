'use client'

// motion-store.ts — jeromemarichez-fr
// Le choix « animation figée », partagé par toute la page et retenu d'une visite à l'autre.
//
// WCAG 2.2.2 exige un mécanisme de **mise en pause** pour toute animation automatique
// qui dure plus de cinq secondes. `prefers-reduced-motion` n'en est pas un : c'est une
// préférence système que beaucoup d'utilisateurs ne savent pas régler, et elle ne se
// change pas depuis la page. Il faut un contrôle explicite, et il doit tenir.

const CLE = 'jm-animation-figee'

type Abonne = () => void

const abonnes = new Set<Abonne>()
let fige: boolean | undefined

function lire(): boolean {
  if (fige !== undefined) return fige
  if (typeof window === 'undefined') return false

  try {
    fige = window.localStorage.getItem(CLE) === '1'
  } catch {
    // Stockage refusé (navigation privée verrouillée, politique d'entreprise) : le
    // contrôle reste utilisable, il ne survit simplement pas au rechargement.
    fige = false
  }

  return fige
}

export const motionStore = {
  subscribe(abonne: Abonne): () => void {
    abonnes.add(abonne)
    return () => {
      abonnes.delete(abonne)
    }
  },

  getSnapshot(): boolean {
    return lire()
  },

  /** Rendu côté serveur : jamais figé, sinon l'état initial différerait à l'hydratation. */
  getServerSnapshot(): boolean {
    return false
  },

  toggle(): void {
    fige = !lire()

    try {
      window.localStorage.setItem(CLE, fige ? '1' : '0')
    } catch {
      // Sans stockage, le choix vaut pour la session en cours. C'est déjà l'essentiel.
    }

    for (const abonne of abonnes) abonne()
  },
}
