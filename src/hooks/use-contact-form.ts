'use client'

// use-contact-form.ts — jeromemarichez-fr
// L'état d'écran du formulaire de contact : ce qui est saisi, ce qui est en erreur, et
// où va le focus après une validation.
//
// Aucune règle métier ici. La validation et la composition de l'URL vivent dans
// `services/contact-mailto.ts` ; ce hook les appelle et range le résultat pour le rendu.

import { type FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import type { IMailtoCompose } from '@/interfaces/IMailtoCompose'
import type { ContactErrors } from '@/interfaces/types'
import { CHAMPS_CONTACT, type ContactField } from '@/schemas/contact.schema'
import { prepareContactMail } from '../services/contact-mailto'

type Saisie = Record<ContactField, string>

const SAISIE_VIDE: Saisie = { nom: '', sujet: '', message: '' }

/**
 * Le formulaire ne valide qu'à la soumission, jamais à la frappe.
 *
 * Valider pendant qu'on écrit revient à dire « c'est faux » à quelqu'un qui n'a pas fini
 * sa phrase : le champ passe en erreur au deuxième caractère, et le lecteur d'écran
 * l'annonce. Les erreurs posées à la soumission restent affichées tant que la soumission
 * suivante n'a pas tranché, ce qui laisse au visiteur le temps de les lire et de les
 * corriger dans l'ordre qui l'arrange.
 */
export function useContactForm(destinataire: string) {
  const [valeurs, setValeurs] = useState<Saisie>(SAISIE_VIDE)
  const [erreurs, setErreurs] = useState<ContactErrors>({})
  const [mailto, setMailto] = useState<IMailtoCompose | null>(null)
  /**
   * Compteur de soumissions refusées, et non un simple booléen.
   *
   * Deux soumissions de suite qui échouent sur les mêmes champs produisent le même état
   * d'erreur : sans un compteur qui change, l'effet de focus ne se rejouerait pas et le
   * second refus passerait inaperçu.
   */
  const [refus, setRefus] = useState(0)
  const resumeRef = useRef<HTMLDivElement>(null)

  const champsEnErreur = CHAMPS_CONTACT.filter((champ) => erreurs[champ])

  /**
   * Le focus part au résumé d'erreurs, pas au premier champ fautif.
   *
   * Le résumé donne le nombre d'erreurs et leur liste avant de renvoyer vers un champ ;
   * sauter directement au premier champ ferait perdre les autres à qui navigue au
   * clavier ou à l'oreille. `role="alert"` annonce le contenu, `tabIndex={-1}` rend le
   * bloc focusable sans l'insérer dans l'ordre de tabulation.
   */
  useEffect(() => {
    if (refus > 0) resumeRef.current?.focus()
  }, [refus])

  const modifier = useCallback((champ: ContactField, valeur: string) => {
    setValeurs((precedentes) => ({ ...precedentes, [champ]: valeur }))
    // Le message de réussite ne survit pas à une reprise de la saisie : il porterait sur
    // un mail qui n'est plus celui qui est à l'écran.
    setMailto(null)
  }, [])

  const soumettre = useCallback(
    (evenement: FormEvent<HTMLFormElement>) => {
      evenement.preventDefault()

      const preparation = prepareContactMail(destinataire, valeurs)

      if (!preparation.ok) {
        setMailto(null)
        setErreurs(preparation.erreurs)
        // Le compteur est incrémenté ICI, et pas seulement dans l'état d'erreur : c'est
        // lui, et lui seul, qui déclenche le renvoi du focus vers le résumé.
        setRefus((precedent) => precedent + 1)
        return
      }

      setErreurs({})
      setMailto(preparation.mailto)
      window.location.assign(preparation.mailto.url)
    },
    [destinataire, valeurs],
  )

  return { valeurs, erreurs, champsEnErreur, mailto, modifier, soumettre, resumeRef }
}
