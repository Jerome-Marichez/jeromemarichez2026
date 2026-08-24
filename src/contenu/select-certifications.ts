// select-certifications.ts — jeromemarichez-fr
// Sélection des certifications à afficher selon le contexte.

import type { ICertification } from '@/interfaces/ICertification'
import type { PoleId } from '@/interfaces/types'
import { CERTIFICATIONS } from './certifications'

/**
 * Certifications d'un pôle, complétées par les certifications transverses.
 *
 * Une page de pôle qui listerait tout le tableau diluerait son propre argument : le
 * visiteur venu pour l'ingénierie web n'a pas besoin d'y lire les certifications
 * d'acquisition. Elles restent visibles sur la page du pôle concerné et sur l'accueil.
 *
 * **Un pôle sans certification à lui n'en affiche aucune, transverses comprises.** Le
 * passage à quatre pôles a créé ce cas : la donnée n'a aujourd'hui aucune certification
 * propre. Rendre malgré tout le bloc afficherait un titre « Ce qui est certifié sur ce
 * pôle » suivi de la seule certification d'anglais — le contraire de ce qu'il annonce.
 * Le site vend de la rigueur : mieux vaut ne rien montrer que d'appeler preuve ce qui
 * n'en est pas une ici.
 */
export function selectCertificationsByPole(pole: PoleId): ICertification[] {
  const propres = CERTIFICATIONS.filter((certification) => certification.pole === pole)

  if (propres.length === 0) return []

  return CERTIFICATIONS.filter(
    (certification) => certification.pole === pole || certification.pole === 'transverse',
  )
}
