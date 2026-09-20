import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { certifications } from '@/contenu/certifications'
import type { ICertification } from '@/interfaces/ICertification'
import { CertificationListe } from './index'

const meta = {
  title: 'Composants/CertificationListe',
  component: CertificationListe,
} satisfies Meta<typeof CertificationListe>

export default meta

type Story = StoryObj<typeof meta>

/**
 * Les certifications réelles. `justificatif` y vaut `null` partout : aucune ne
 * rend donc de lien, seulement le nom et l'organisme.
 */
export const Defaut: Story = {
  args: {
    certifications,
  },
}

/**
 * Cas limite : un justificatif renseigné. Le contenu réel ne fournit encore
 * aucune URL (`ICertification`, doc du champ : « une URL ne s'invente ni ne
 * s'approxime »), donc cette entrée est construite à partir du type, en
 * variation de la certification ISTQB réelle, pour vérifier que le lien
 * apparaît et reste distinct du texte simple qui l'entoure. L'URL utilise le
 * domaine réservé aux exemples (RFC 2606) : ce n'est pas un justificatif réel.
 */
const [istqb, anthropic] = certifications

if (istqb === undefined || anthropic === undefined) {
  throw new Error('Le contenu réel des certifications est incomplet.')
}

const certificationAvecJustificatif: ICertification = {
  ...istqb,
  justificatif: 'https://example.com/justificatif',
}

export const AvecJustificatif: Story = {
  args: {
    certifications: [certificationAvecJustificatif, anthropic],
  },
}
