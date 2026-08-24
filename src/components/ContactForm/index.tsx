'use client'

// ContactForm/index.tsx — jeromemarichez-fr
// Le formulaire de contact. Il ne poste rien : il compose une URL `mailto:` et ouvre le
// client mail du visiteur avec l'objet et le corps déjà écrits.
//
// Il porte de l'état de saisie et déclenche un effet de bord (l'ouverture du client
// mail). Toute la règle est ailleurs : la validation et l'encodage dans
// `services/contact-mailto.ts`, l'état d'écran dans `use-contact-form`.

import { CHAMPS_CONTACT, LONGUEUR_MAX_MESSAGE } from '@/schemas/contact.schema'
import { formatContactCounter } from '@/utils/format-contact-counter'
import { CONTACT_FORMULAIRE } from '../../contenu/contact'
import { useContactForm } from '../../hooks/use-contact-form'
import { ContactField } from '../ContactField'
import styles from './contact-form.module.css'

interface ContactFormProps {
  /** L'adresse de destination. Elle vient de `SITE_IDENTITY.email`, source unique. */
  destinataire: string
  /** Identifiant du titre de la section, repris en nom accessible du formulaire. */
  titreId: string
}

/**
 * Trois points d'accessibilité portent tout le reste, et aucun n'est décoratif.
 *
 * - **La région d'annonce est présente dès le premier rendu**, vide. Un `role="alert"`
 *   inséré dans le document en même temps que son texte est annoncé de façon inégale
 *   selon les lecteurs d'écran ; une région déjà là au chargement l'est toujours. Elle
 *   disparaît visuellement par `:empty`, jamais par une condition de rendu.
 * - **Le résumé d'erreurs renvoie vers les champs par de vrais liens.** Au clavier, on
 *   entend le nombre d'erreurs, on choisit laquelle corriger, et on y arrive d'une
 *   touche. Sauter d'office au premier champ fautif ferait perdre les autres.
 * - **`noValidate`.** Sans lui, le navigateur affiche ses propres bulles, dans sa langue,
 *   avec ses propres formulations, et court-circuite les messages écrits ici.
 */
export function ContactForm({ destinataire, titreId }: ContactFormProps) {
  const { valeurs, erreurs, champsEnErreur, mailto, modifier, soumettre, resumeRef } =
    useContactForm(destinataire)

  return (
    <form aria-labelledby={titreId} className={styles.formulaire} noValidate onSubmit={soumettre}>
      <p className={styles.consigne}>{CONTACT_FORMULAIRE.consigne}</p>

      <div className={styles.annonce} ref={resumeRef} role="alert" tabIndex={-1}>
        {champsEnErreur.length > 0 ? (
          <>
            <p className={styles.resumeTitre}>{CONTACT_FORMULAIRE.resumeErreurs}</p>
            <ul className={styles.resumeListe}>
              {champsEnErreur.map((champ) => (
                <li key={champ}>
                  <a href={`#contact-${champ}`}>
                    {CONTACT_FORMULAIRE.champs[champ].label} : {erreurs[champ]}
                  </a>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>

      {CHAMPS_CONTACT.map((champ) => (
        <ContactField
          aide={CONTACT_FORMULAIRE.champs[champ].aide}
          autoComplete={champ === 'nom' ? 'name' : undefined}
          champ={champ}
          complement={
            champ === 'message'
              ? formatContactCounter(valeurs.message.trim().length, LONGUEUR_MAX_MESSAGE)
              : undefined
          }
          erreur={erreurs[champ]}
          key={champ}
          label={CONTACT_FORMULAIRE.champs[champ].label}
          marqueObligatoire={CONTACT_FORMULAIRE.marqueObligatoire}
          multiligne={champ === 'message'}
          onChange={(valeur) => modifier(champ, valeur)}
          valeur={valeurs[champ]}
        />
      ))}

      <button className={styles.bouton} type="submit">
        {CONTACT_FORMULAIRE.bouton}
      </button>

      {/* Région distincte de celle des erreurs : `status` est poli, il attend une pause
          dans la lecture, là où `alert` interrompt. Un envoi qui réussit n'a aucune
          raison de couper la parole. */}
      <div className={styles.annonce} role="status">
        {mailto ? (
          <p className={styles.succes}>
            {CONTACT_FORMULAIRE.statutSucces} <a href={`mailto:${destinataire}`}>{destinataire}</a>
          </p>
        ) : null}
      </div>
    </form>
  )
}
