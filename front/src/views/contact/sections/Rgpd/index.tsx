import { Section } from '@/@shared/components/Section'
import type { IContactPage } from '@/interfaces/contact-page'
import styles from './rgpd.module.css'

interface IRgpdProps {
  contenu: IContactPage['rgpd']
}

/**
 * Ce qu'il advient des données — dit explicitement plutôt que laissé au doute.
 *
 * LE FAIT CENTRAL EST UNE ABSENCE : cette page ne comporte aucun formulaire, donc elle ne
 * collecte AUCUNE donnée de tiers. Les seules données personnelles affichées sont celles
 * de Jérôme MARICHEZ lui-même, déjà publiques sur ses trois CV et publiées à sa demande
 * (2026-08-08). Une page de contact muette sur ce point laisserait supposer un traitement
 * silencieux, ce qui est exactement l'inverse de la situation.
 *
 * Rendu en LISTE : chaque mention répond à une question distincte, et un lecteur d'écran
 * en annonce le nombre avant de les énumérer. Un pavé unique obligerait à tout écouter
 * pour trouver le point qui concerne le visiteur.
 *
 * Aucune durée de conservation chiffrée n'est publiée : aucune n'a été arbitrée, et un
 * délai inventé serait une affirmation fausse dans le texte même qui doit protéger le
 * visiteur. Voir docs/rgpd.md.
 */
export function Rgpd({ contenu }: IRgpdProps) {
  return (
    <Section id="rgpd" title={contenu.titre} tone="muted" width="narrow">
      <ul className={styles.mentions}>
        {contenu.mentions.map((mention) => (
          <li key={mention}>{mention}</li>
        ))}
      </ul>
    </Section>
  )
}
