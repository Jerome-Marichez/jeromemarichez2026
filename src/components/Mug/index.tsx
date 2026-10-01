'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import styles from './mug.module.css'
import mugPic from './mug.png'

interface IMugProps {
  /** Libelle lu par la synthese vocale. Laisser vide pour une tasse decorative. */
  readonly description?: string
}

/**
 * La tasse de cafe, signature du site.
 *
 * C'est **la tasse d'origine** du portfolio de Jerome MARICHEZ : sa photo de mug
 * et sa video de cafe reel qui tourne dedans. Une version precedente la redessinait
 * en SVG pour economiser le poids ; l'economie etait vraie, le resultat etait moins
 * beau, et sur l'element qui porte l'identite du site c'est le resultat qui tranche.
 *
 * Ce qui a ete garde de la reecriture, parce que ca ne coute rien au rendu :
 *
 * - **La video est pilotee, pas seulement masquee.** `prefers-reduced-motion` et le
 *   bouton de mise en pause (WCAG 2.2.2) l'arretent reellement. Une regle CSS ne
 *   suspend pas une video : il faut appeler `pause()`, donc ce composant est client.
 * - **Le poster porte la premiere image**, donc la tasse est pleine avant que la
 *   video n'ait charge, et rien ne saute.
 * - **La video ne charge pas sur un petit ecran** : `cafe.mp4` pese 1,6 Mo pour un
 *   detail de quelques centaines de pixels. Sous 64rem, l'image suffit et c'est elle
 *   qui reste affichee.
 */
export function Mug({ description }: IMugProps) {
  const video = useRef<HTMLVideoElement>(null)
  const scene = useRef<HTMLDivElement>(null)
  const decoratif = description === undefined

  useEffect(() => {
    const element = video.current
    if (element === null) return

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    // `cafe.mp4` pese 1,6 Mo pour un detail de quelques centaines de pixels. Sous
    // cette largeur, le poster suffit et la video n'est jamais demandee : c'est
    // `preload="none"` qui l'empeche de se telecharger, et l'absence de `play()`
    // qui l'empeche d'etre reclamee ensuite.
    const grandEcran = window.matchMedia('(min-width: 64rem)')
    const racine = document.documentElement

    const appliquer = () => {
      const enPause = preference.matches || racine.dataset.mouvement === 'pause'

      if (enPause || !grandEcran.matches) {
        element.pause()
      } else {
        // `play()` rend une promesse rejetee quand le navigateur refuse la lecture
        // automatique. Ce n'est pas une erreur a remonter : la tasse reste alors
        // sur son poster, qui montre deja le cafe.
        void element.play().catch(() => undefined)
      }
    }

    appliquer()
    preference.addEventListener('change', appliquer)
    grandEcran.addEventListener('change', appliquer)

    // Le bouton de pause pose un attribut sur `<html>` : on l'observe plutot que
    // de faire remonter un etat, ce qui coupleraient deux composants sans raison.
    const observateur = new MutationObserver(appliquer)
    observateur.observe(racine, {
      attributes: true,
      attributeFilter: ['data-mouvement'],
    })

    return () => {
      preference.removeEventListener('change', appliquer)
      grandEcran.removeEventListener('change', appliquer)
      observateur.disconnect()
    }
  }, [])

  /**
   * La tasse s'oriente vers le curseur.
   *
   * Elle **ne se deplace pas** : seule sa rotation change, et elle vaut l'angle
   * entre son centre et la souris. C'est la seule interaction de la tasse, il n'y
   * a aucun etat de survol : deux reponses concurrentes au meme geste se
   * gêneraient.
   *
   * Trois choix qui font la difference entre un effet agreable et un effet qui
   * rame ou qui saute :
   *
   * - **Rien ne passe par un etat React.** Une position de curseur change des
   *   dizaines de fois par seconde ; la stocker dans un `useState` re-rendrait le
   *   composant a chaque frame. L'angle est donc ecrit directement dans une
   *   propriete CSS, en dehors du cycle de rendu.
   * - **Le mouvement est amorti par la transition CSS**, pas calcule image par
   *   image. La tasse arrive toujours un peu apres le curseur, et ce retard lui
   *   donne du poids. Une poursuite exacte donnerait un objet colle au pointeur.
   * - **L'angle est deroule.** `atan2` bascule de 180 a -180 quand le curseur
   *   passe derriere la tasse ; ecrit tel quel, cela ferait faire un tour complet
   *   a l'envers. On accumule donc l'angle en prenant toujours le chemin le plus
   *   court, ce qui rend le passage invisible.
   */
  useEffect(() => {
    const element = scene.current
    if (element === null) return

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    // Sur un ecran tactile il n'y a pas de curseur a suivre : l'effet n'aurait
    // aucun sens et couterait un ecouteur pour rien.
    const pointeurFin = window.matchMedia('(hover: hover) and (pointer: fine)')
    const racine = document.documentElement

    /** Position de repos, celle du portfolio d'origine. */
    const ANGLE_REPOS = 50
    /** L'anse est dessinee en bas de l'image : ce quart de tour l'envoie vers le
     *  curseur plutot que de l'en eloigner. */
    const ORIENTATION_ANSE = 90

    let demande = 0
    // L'angle accumule, jamais ramene dans [-180, 180] : c'est lui qui permet le
    // deroulage. La tasse peut donc tourner plusieurs fois dans le meme sens si le
    // curseur en fait le tour, ce qui est exactement ce qu'on attend d'un objet.
    let angleAccumule = ANGLE_REPOS

    const repos = () => {
      angleAccumule = ANGLE_REPOS
      element.style.setProperty('--angle', `${ANGLE_REPOS}deg`)
    }

    const surMouvement = (evenement: PointerEvent) => {
      if (preference.matches || racine.dataset.mouvement === 'pause') {
        repos()
        return
      }

      // Une seule ecriture par frame, quel que soit le nombre d'evenements.
      if (demande !== 0) return
      demande = requestAnimationFrame(() => {
        demande = 0
        const cadre = element.getBoundingClientRect()
        const centreX = cadre.left + cadre.width / 2
        const centreY = cadre.top + cadre.height / 2

        const vise =
          (Math.atan2(evenement.clientY - centreY, evenement.clientX - centreX) * 180) / Math.PI +
          ORIENTATION_ANSE

        // Chemin le plus court entre l'angle courant et l'angle vise, ramene dans
        // [-180, 180]. Sans cela, franchir le dos de la tasse lui ferait faire un
        // tour complet a l'envers.
        const ecart = ((((vise - angleAccumule + 180) % 360) + 360) % 360) - 180
        angleAccumule += ecart

        element.style.setProperty('--angle', `${angleAccumule.toFixed(1)}deg`)
      })
    }

    const brancher = () => {
      if (pointeurFin.matches) {
        window.addEventListener('pointermove', surMouvement, { passive: true })
      } else {
        window.removeEventListener('pointermove', surMouvement)
        repos()
      }
    }

    brancher()
    pointeurFin.addEventListener('change', brancher)
    // Le bouton de pause et la preference systeme remettent la tasse droite.
    preference.addEventListener('change', repos)
    const observateur = new MutationObserver(repos)
    observateur.observe(racine, { attributes: true, attributeFilter: ['data-mouvement'] })

    return () => {
      if (demande !== 0) cancelAnimationFrame(demande)
      window.removeEventListener('pointermove', surMouvement)
      pointeurFin.removeEventListener('change', brancher)
      preference.removeEventListener('change', repos)
      observateur.disconnect()
    }
  }, [])

  // Une tasse decorative et une tasse nommee ne sont pas le meme element pour une
  // synthese vocale : la premiere doit etre tue, la seconde annoncee comme une
  // image. Les rendre en deux branches plutot qu'en un `role` conditionnel evite
  // aussi la combinaison illegale `role="presentation"` avec un `aria-label`.
  const contenu = (
    <>
      <video
        ref={video}
        className={styles.cafe}
        poster="/tasse/cafe.jpg"
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src="/tasse/cafe.mp4" type="video/mp4" />
      </video>

      <Image
        className={styles.mug}
        src={mugPic}
        alt=""
        sizes="(max-width: 40rem) 60vw, 34ch"
        priority
      />
    </>
  )

  if (decoratif) {
    return (
      <div ref={scene} className={styles.scene} aria-hidden="true">
        {contenu}
      </div>
    )
  }

  return (
    <div ref={scene} className={styles.scene} role="img" aria-label={description}>
      {contenu}
    </div>
  )
}
