import type { IProjet } from '../../interfaces/IProjet'
import { choixNextjs } from './choix-nextjs'
import { fraude } from './fraude'
import { mesure } from './mesure'
import { prezage } from './prezage'
import { smsEnMasseDemarcheQa } from './sms-en-masse-demarche-qa'
import { smsEnMasseDesignSystem } from './sms-en-masse-design-system'
import { smsEnMasseIaAugmentee } from './sms-en-masse-ia-augmentee'
import { smsEnMassePlateforme } from './sms-en-masse-plateforme'
import { truffle } from './truffle'
import { verhoeven } from './verhoeven'

/**
 * Les projets détaillés au format Contexte / Enjeu / Mon rôle / Résultat, portés
 * tels quels depuis la section PROJETS DÉTAILLÉS du CV « Ingénieur Fullstack &
 * Chef de Projet » (CLAUDE.md, « on le porte, on ne le réécrit pas »), pas
 * reconstruits depuis les expériences. Ordre du CV conservé.
 */
export const projets: IProjet[] = [
  smsEnMassePlateforme,
  smsEnMasseDesignSystem,
  smsEnMasseDemarcheQa,
  smsEnMasseIaAugmentee,
  prezage,
  choixNextjs,
  fraude,
  mesure,
  verhoeven,
  truffle,
]
