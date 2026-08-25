// PoleTagList.stories.tsx — jeromemarichez-fr

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PoleTagList } from '.'

const meta = {
  title: 'Poles/PoleTagList',
  component: PoleTagList,
  args: { legende: 'Pôles concernés', poles: ['data'] },
} satisfies Meta<typeof PoleTagList>

export default meta
type Story = StoryObj<typeof meta>

/** Le cas le plus fréquent sur une fiche de réalisation : un seul pôle. */
export const UnPole: Story = {}

/**
 * Deux pôles, dont les deux suites parallèles de la donnée.
 *
 * L'ordre d'affichage suit celui de la chaîne, jamais celui du tableau reçu : c'est
 * `listPoles` qui le tient. Rien ici ne doit laisser lire que l'IA vient après le SEA.
 */
export const DeuxPoles: Story = { args: { poles: ['sea-ux', 'ia'] } }

/** Trois pôles : le cas où la ligne d'étiquettes commence à devoir se replier. */
export const TroisPoles: Story = { args: { poles: ['ingenierie-web', 'data', 'ia'] } }

/**
 * Les quatre pôles à la fois.
 *
 * Aucune fiche n'en porte quatre aujourd'hui, et c'est précisément pourquoi la story
 * existe : c'est le seul endroit où l'on vérifie que les quatre teintes se distinguent
 * les unes des autres à cette taille, y compris en thème sombre.
 */
export const LesQuatre: Story = {
  args: { poles: ['ingenierie-web', 'data', 'ia', 'sea-ux'] },
}

/**
 * Aucun pôle : le composant ne rend rien du tout, pas même une liste vide.
 *
 * Une `<nav>` vide serait annoncée par un lecteur d'écran comme un point de repère sans
 * contenu. L'aperçu est donc légitimement vide.
 */
export const Aucun: Story = { args: { poles: [] } }
