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
 */
export function selectCertificationsByPole(pole: PoleId): ICertification[] {
  return CERTIFICATIONS.filter(
    (certification) => certification.pole === pole || certification.pole === 'transverse',
  )
}
