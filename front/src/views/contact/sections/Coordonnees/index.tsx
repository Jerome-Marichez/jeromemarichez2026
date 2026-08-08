import { LienEmail } from '@/@shared/components/LienEmail'
import { Section } from '@/@shared/components/Section'
import type { IContact } from '@/interfaces/contact'
import type { IContactPage } from '@/interfaces/contact-page'
import type { IProfilResolu } from '@/interfaces/profil-public'
import { telephoneVersE164 } from '@/utils/telephone'
import styles from './coordonnees.module.css'

interface ICoordonneesProps {
  contenu: IContactPage['coordonnees']
  /** Coordonnées directes, venues de `identite` — jamais écrites dans cette vue. */
  contact: IContact
  profils: readonly IProfilResolu[]
}

/**
 * Les trois coordonnées directes : e-mail, téléphone, profil public.
 *
 * UNE LISTE DE DÉFINITIONS et non une suite de paragraphes : chaque coordonnée est une
 * valeur associée à une étiquette, ce que `dl`/`dt`/`dd` dit nativement. Un lecteur
 * d'écran restitue l'étiquette avec la valeur ; trois paragraphes l'obligeraient à
 * deviner le rattachement, ou demanderaient un `aria-label` par ligne pour retrouver ce
 * que le HTML sait déjà exprimer.
 *
 * TROIS LIENS, TROIS NOMS ACCESSIBLES DISTINCTS ET EXPLICITES :
 *
 * - l'e-mail est obfusqué par `LienEmail` — méthode, garanties et limites documentées
 *   dans `@shared/components/LienEmail/` et `utils/email.ts` ;
 * - le téléphone part en E.164 (`+33771651588`) dans le `href`, seule forme composable
 *   hors de France, tout en restant affiché au format national, seule forme lisible par
 *   un humain. La conversion est DÉRIVÉE du contenu typé : aucun numéro n'est réécrit ;
 * - le profil affiche son URL sans protocole, ce qui dit où il mène sans qu'on ait à
 *   inventer un libellé. Il ouvre dans le même onglet : un lien qui change de site n'a
 *   pas besoin d'être arraché à la navigation du visiteur, et un `target="_blank"` non
 *   demandé lui retire le bouton « précédent ».
 */
export function Coordonnees({ contenu, contact, profils }: ICoordonneesProps) {
  return (
    <Section id="coordonnees" title={contenu.titre} tone="muted" width="narrow">
      <dl className={styles.liste}>
        <div className={styles.ligne}>
          <dt className={styles.etiquette}>{contenu.libelleEmail}</dt>
          <dd className={styles.valeur}>
            <LienEmail email={contact.email} />
          </dd>
        </div>
        <div className={styles.ligne}>
          <dt className={styles.etiquette}>{contenu.libelleTelephone}</dt>
          <dd className={styles.valeur}>
            <a href={`tel:${telephoneVersE164(contact.telephone)}`}>{contact.telephone}</a>
          </dd>
        </div>
        {profils.map((profil) => (
          <div className={styles.ligne} key={profil.cle}>
            <dt className={styles.etiquette}>{profil.nom}</dt>
            <dd className={styles.valeur}>
              <a href={profil.url}>{profil.libelle}</a>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
