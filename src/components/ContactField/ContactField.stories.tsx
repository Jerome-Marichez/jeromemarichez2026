// ContactField.stories.tsx — jeromemarichez-fr

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { CONTACT_FORMULAIRE } from '@/contenu/contact'
import { LONGUEUR_MAX_MESSAGE } from '@/schemas/contact.schema'
import { MESSAGE_URL_TROP_LONGUE } from '@/services/contact-mailto'
import { formatContactCounter } from '@/utils/format-contact-counter'
import { ContactField } from '.'

const meta = {
  title: 'Contact/ContactField',
  component: ContactField,
  args: {
    champ: 'nom',
    label: CONTACT_FORMULAIRE.champs.nom.label,
    aide: CONTACT_FORMULAIRE.champs.nom.aide,
    marqueObligatoire: CONTACT_FORMULAIRE.marqueObligatoire,
    valeur: '',
    onChange: () => {},
  },
} satisfies Meta<typeof ContactField>

export default meta
type Story = StoryObj<typeof meta>

/** Le champ vide, avec son libellé, sa marque d'obligation et son texte d'aide. */
export const Vide: Story = {}

/** Le champ rempli. La valeur est pilotée par le parent, jamais par le champ. */
export const Rempli: Story = { args: { valeur: 'Camille Dubois' } }

/**
 * Le champ en erreur.
 *
 * Trois choses changent d'un coup et doivent être vérifiées ensemble : le message
 * apparaît sous la saisie, `aria-invalid` passe à `true`, et le message rejoint
 * `aria-describedby` derrière le texte d'aide. Un message visible qui ne serait pas
 * rattaché au champ ne serait jamais lu par un lecteur d'écran.
 */
export const EnErreur: Story = {
  args: { erreur: 'Indiquez le nom sous lequel je vous réponds.' },
}

/** Le champ multiligne avec son compteur de caractères, tel qu'il sert au message. */
export const Multiligne: Story = {
  args: {
    champ: 'message',
    label: CONTACT_FORMULAIRE.champs.message.label,
    aide: CONTACT_FORMULAIRE.champs.message.aide,
    multiligne: true,
    valeur: 'Nous refondons notre site et nous ne savons pas quoi mesurer.',
    complement: formatContactCounter(60, LONGUEUR_MAX_MESSAGE),
  },
}

/**
 * Le champ multiligne en erreur, compteur compris.
 *
 * C'est l'empilement le plus chargé du composant : aide, compteur, puis message
 * d'erreur. L'ordre de lecture doit rester tenable, et le message d'erreur ne doit pas
 * se confondre avec le compteur.
 */
export const MultiligneEnErreur: Story = {
  args: {
    champ: 'message',
    label: CONTACT_FORMULAIRE.champs.message.label,
    aide: CONTACT_FORMULAIRE.champs.message.aide,
    multiligne: true,
    valeur: 'Trop court.',
    complement: formatContactCounter(11, LONGUEUR_MAX_MESSAGE),
    erreur: MESSAGE_URL_TROP_LONGUE,
  },
}
