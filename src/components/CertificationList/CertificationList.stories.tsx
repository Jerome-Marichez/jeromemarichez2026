// CertificationList.stories.tsx — jeromemarichez-fr

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { CERTIFICATIONS } from '@/contenu/certifications'
import { selectCertificationsByPole } from '@/contenu/select-certifications'
import { CertificationList } from '.'

const meta = {
  title: 'Editorial/CertificationList',
  component: CertificationList,
  args: { certifications: CERTIFICATIONS },
} satisfies Meta<typeof CertificationList>

export default meta
type Story = StoryObj<typeof meta>

/** Toutes les certifications, telles qu'elles paraissent sur l'accueil. */
export const Toutes: Story = {}

/** La sélection d'une page de pôle : seules les certifications qui la concernent. */
export const PourUnPole: Story = {
  args: { certifications: selectCertificationsByPole('sea-ux') },
  globals: { pole: 'sea-ux' },
}

/**
 * Une certification sans millésime.
 *
 * Le cas existe réellement — Microsoft Ads est confirmée sans année connue — et la ligne
 * d'année doit alors disparaître au lieu d'afficher un vide. C'est un point de véracité
 * autant que de mise en page.
 */
export const SansAnnee: Story = {
  args: { certifications: CERTIFICATIONS.filter((c) => c.annee === undefined) },
}

/**
 * Une certification sans justificatif publié.
 *
 * L'intitulé cesse alors d'être un lien : le site ne publie jamais une certification
 * derrière une URL morte ou approximative.
 */
export const SansJustificatif: Story = {
  args: { certifications: CERTIFICATIONS.filter((c) => c.justificatif === undefined) },
}
