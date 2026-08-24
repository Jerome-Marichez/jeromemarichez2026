// ContactField/index.tsx — jeromemarichez-fr
// Un champ du formulaire de contact : son libellé, son aide, son erreur, son compteur.
//
// Composant pur : il ne porte aucun état et ne connaît pas la validation. Il reçoit une
// valeur et un message d'erreur, il rend le balisage qui les relie. C'est justement ce
// câblage (`htmlFor`, `aria-describedby`, `aria-invalid`) qu'on ne veut pas voir écrit
// trois fois de suite dans le formulaire, où une des trois finit toujours par diverger.

import type { ContactField as ContactFieldName } from '@/schemas/contact.schema'
import styles from './contact-field.module.css'

interface ContactFieldProps {
  /** Nom du champ dans le schéma. Il fabrique tous les identifiants du bloc. */
  champ: ContactFieldName
  label: string
  aide: string
  /** Le libellé du caractère obligatoire, écrit en toutes lettres à côté du label. */
  marqueObligatoire: string
  valeur: string
  /** Message d'erreur du dernier envoi refusé, s'il portait sur ce champ. */
  erreur?: string
  /** Rend un `textarea` plutôt qu'un `input`. */
  multiligne?: boolean
  /** Texte d'appoint sous le champ, par exemple le compteur de caractères. */
  complement?: string
  /** Valeur d'`autocomplete` quand le navigateur peut aider au remplissage. */
  autoComplete?: string
  onChange: (valeur: string) => void
}

/** Nombre de lignes du champ long. Assez pour écrire un paragraphe sans faire défiler. */
const LIGNES_MESSAGE = 7

/**
 * Le champ est toujours décrit par son aide, et en plus par son erreur quand il y en a une.
 *
 * L'ordre compte : l'aide d'abord, l'erreur ensuite. Un lecteur d'écran restitue les
 * descriptions dans l'ordre donné, et on veut entendre ce que le champ attend avant
 * d'entendre pourquoi ce qui y est ne convient pas.
 */
function listDescribedBy(champ: string, aErreur: boolean, aComplement: boolean): string {
  const identifiants = [`${champ}-aide`]

  if (aComplement) identifiants.push(`${champ}-complement`)
  if (aErreur) identifiants.push(`${champ}-erreur`)

  return identifiants.join(' ')
}

export function ContactField({
  champ,
  label,
  aide,
  marqueObligatoire,
  valeur,
  erreur,
  multiligne,
  complement,
  autoComplete,
  onChange,
}: ContactFieldProps) {
  const identifiant = `contact-${champ}`
  const decrit = listDescribedBy(identifiant, Boolean(erreur), Boolean(complement))

  /* `required` plutôt qu'`aria-required` : l'attribut natif porte déjà l'information aux
     technologies d'assistance, et le formulaire pose `noValidate` — la bulle du
     navigateur ne prend donc jamais la main sur les messages écrits ici. */
  const communs = {
    'aria-describedby': decrit,
    'aria-invalid': Boolean(erreur),
    className: styles.saisie,
    id: identifiant,
    name: champ,
    onChange: (evenement: { target: { value: string } }) => onChange(evenement.target.value),
    required: true,
    value: valeur,
  }

  return (
    <div className={styles.champ}>
      <label className={styles.label} htmlFor={identifiant}>
        {label} <span className={styles.obligatoire}>{marqueObligatoire}</span>
      </label>

      <p className={styles.aide} id={`${identifiant}-aide`}>
        {aide}
      </p>

      {multiligne ? (
        <textarea {...communs} rows={LIGNES_MESSAGE} />
      ) : (
        <input {...communs} autoComplete={autoComplete} type="text" />
      )}

      {complement ? (
        <p className={styles.complement} id={`${identifiant}-complement`}>
          {complement}
        </p>
      ) : null}

      {erreur ? (
        <p className={styles.erreur} id={`${identifiant}-erreur`}>
          {erreur}
        </p>
      ) : null}
    </div>
  )
}
