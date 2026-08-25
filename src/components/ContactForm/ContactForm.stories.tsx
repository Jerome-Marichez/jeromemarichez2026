// ContactForm.stories.tsx — jeromemarichez-fr

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fireEvent } from 'storybook/test'
import { CONTACT_FORMULAIRE } from '@/contenu/contact'
import { LONGUEUR_MAX_MESSAGE } from '@/schemas/contact.schema'
import { SITE_IDENTITY } from '@/seo/site'
import { ContactForm } from '.'

const meta = {
  title: 'Contact/ContactForm',
  component: ContactForm,
  args: { destinataire: SITE_IDENTITY.email, titreId: 'contact-titre' },
  decorators: [
    (Story) => (
      <section aria-labelledby="contact-titre">
        <h2 id="contact-titre" style={{ color: 'var(--encre)' }}>
          Décrire votre besoin
        </h2>
        <Story />
      </section>
    ),
  ],
} satisfies Meta<typeof ContactForm>

export default meta
type Story = StoryObj<typeof meta>

/** Remplit un champ sans passer par la frappe, quand le texte est trop long pour être tapé. */
function remplir(champ: HTMLElement, valeur: string) {
  fireEvent.change(champ, { target: { value: valeur } })
}

/**
 * Le formulaire au repos.
 *
 * La région d'annonce est déjà dans le document, vide : un `role="alert"` inséré en même
 * temps que son texte est annoncé de façon inégale selon les lecteurs d'écran. Elle est
 * masquée par `:empty`, jamais par une condition de rendu, donc elle est présente ici
 * même si rien ne se voit.
 */
export const Vierge: Story = {}

/**
 * Le refus d'un envoi vide.
 *
 * Trois messages de champ, le résumé en tête, et le focus porté sur ce résumé. Le résumé
 * renvoie vers chaque champ par de vrais liens : au clavier on entend le nombre
 * d'erreurs, on choisit laquelle corriger, et on y va d'une touche. C'est l'état le plus
 * difficile à atteindre sur le site, puisqu'il faut délibérément soumettre un formulaire
 * vide.
 */
export const EnvoiVide: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: CONTACT_FORMULAIRE.bouton }))
  },
}

/**
 * Le refus d'une saisie trop courte, bornes du schéma à l'appui.
 *
 * Les messages ne viennent pas du composant : ils appartiennent au schéma Zod, parce
 * qu'ils formulent une règle et non un libellé d'écran. Un espace seul compte pour vide,
 * le `trim()` s'appliquant avant les bornes.
 */
export const SaisieTropCourte: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByLabelText(/Votre nom/), 'A')
    await userEvent.type(canvas.getByLabelText(/Le sujet/), '  ')
    await userEvent.type(canvas.getByLabelText(/Votre message/), 'Trop court.')
    await userEvent.click(canvas.getByRole('button', { name: CONTACT_FORMULAIRE.bouton }))
  },
}

/**
 * Le refus de longueur : une saisie valide qui produit une URL `mailto:` trop longue.
 *
 * Le cas est réel et invisible autrement : le message tient dans ses 1 500 caractères,
 * mais chaque caractère accentué en pèse six une fois pourcent-encodé, et l'URL dépasse
 * la limite au-delà de laquelle certains clients mail tronquent en silence. Le refus
 * sort comme une erreur de champ, pas comme un troisième état : du point de vue du
 * visiteur, c'est le même geste que pour un message trop long.
 */
export const RefusDeLongueur: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByLabelText(/Votre nom/), 'Camille Dubois')
    await userEvent.type(canvas.getByLabelText(/Le sujet/), 'Refonte et mesure')
    remplir(canvas.getByLabelText(/Votre message/), 'é'.repeat(LONGUEUR_MAX_MESSAGE))
    await userEvent.click(canvas.getByRole('button', { name: CONTACT_FORMULAIRE.bouton }))
  },
}
