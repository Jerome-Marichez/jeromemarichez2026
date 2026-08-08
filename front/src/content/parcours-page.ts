// parcours-page.ts — jeromemarichez2026
// Libellés de la page « /parcours » (issue #23).
//
// PÉRIMÈTRE STRICT : ce fichier ne porte que la charpente. Les expériences, les
// formations et les certifications ne sont PAS ici — elles vivent dans leurs fichiers
// respectifs, n'ont pas été touchées, et sont affichées telles quelles.
//
// Véracité — points tenus ici :
// - « neuf ans » et « trois postes » sont vérifiables sur `content/experiences.ts` :
//   2017 → 2026, trois employeurs. Aucun autre chiffre n'est avancé ;
// - l'ordre des secteurs cités dans le chapô suit l'ordre CHRONOLOGIQUE réel du parcours
//   (capital-risque 2017, joaillerie 2019, éditeur SaaS 2023), quand la page affiche,
//   elle, l'ordre antichronologique. Les deux sont justes, aucun ne réordonne les faits ;
// - aucun intitulé de poste n'est repris ni reformulé ici : la page les lit dans
//   `experiences.ts`, qui les tient à l'identique des CV (règle bloquante du CLAUDE.md) ;
// - aucun délai de réponse, aucune référence client, aucun témoignage ;
// - première personne du singulier, aucun emoji, aucun superlatif.
//
// L'IMAGE EST UN PLACEHOLDER. Voir le commentaire de `illustration` ci-dessous.
import type { IParcoursPage } from '../interfaces/parcours-page'
import { parcoursPageSchema } from '../schemas/parcours-page.schema'

const donnees = {
  meta: {
    titre: 'Parcours',
    description:
      'Neuf ans d’ingénierie logicielle chez trois employeurs, du capital-risque à l’édition SaaS, avec la formation et les certifications qui l’accompagnent.',
  },
  entete: {
    titre: 'Neuf ans d’ingénierie logicielle',
    lead: 'Trois postes, du capital-risque au e-commerce de luxe puis à l’édition SaaS. Les intitulés, les périodes et les faits ci-dessous sont ceux de mes CV.',
    // ------------------------------------------------------------------------------
    // PLACEHOLDER SOUS LICENCE UNSPLASH — À REMPLACER PAR UNE PHOTO DE JÉRÔME MARICHEZ.
    //
    // Ce n'est pas un portrait, et c'est délibéré : un portrait placeholder montrant le
    // visage d'un inconnu présenterait quelqu'un d'autre comme étant Jérôme le jour où
    // il partirait en production. Une image d'ambiance ne prétend représenter personne.
    //
    // Provenance complète : ~/Desktop/assets-jeromemarichez/LICENCE-ET-PROVENANCE.md.
    // Le champ `placeholder` ci-dessous porte la même information dans la DONNÉE, où un
    // test peut la vérifier — un commentaire seul disparaît sans que rien ne s'en
    // aperçoive, et l'image provisoire reste en ligne.
    // ------------------------------------------------------------------------------
    illustration: {
      cle: 'tasse',
      alt: 'Vue de dessus de deux planches en bois posées sur une table sombre : à gauche du café moulu, des grains et un porte-filtre rempli de mouture ; à droite un second porte-filtre et une tasse de café au lait au motif de cœur.',
      base: '/images/tasse',
      // `webp` d'abord, `jpg` en repli : le dernier format alimente l'attribut `src`.
      formats: ['webp', 'jpg'],
      declinaisons: [
        { largeur: 800, hauteur: 533 },
        { largeur: 1200, hauteur: 800 },
      ],
      // Largeur d'AFFICHAGE, pas de fichier. Sans cette déclaration le navigateur suppose
      // `100vw` et télécharge la déclinaison de 1200 px même sur un téléphone.
      //
      // Les deux longueurs sont écrites en clair, et c'est la seule exception du site à
      // la règle « aucune valeur en dur » : `sizes` est lu par le sélecteur de ressources
      // AVANT toute mise en forme, sans élément de rattachement — une `var(--…)` n'y a
      // aucune valeur à résoudre et rendrait la déclaration invalide, donc ignorée. Elles
      // décrivent la grille de `entete.module.css` : une colonne pleine largeur en
      // dessous d'environ 49 rem, deux colonnes d'environ 32 rem au-delà.
      tailles: '(min-width: 49rem) 32rem, 100vw',
      placeholder: true,
      licence: 'Unsplash License — usage commercial autorisé, sans attribution obligatoire',
      provenance: 'Unsplash, photo photo-1497935586351-b67a49e012bf, récupérée le 2026-08-08',
    },
  },
  titreExperiences: 'Expériences',
  titreFormations: 'Formation',
  titreCertifications: 'Certifications',
  libelleJustificatif: 'Voir le justificatif',
  contact: {
    titre: 'Un projet en tête ?',
    lead: 'Dites-moi ce que vous voulez construire ou mesurer : je vous dis ce que ce parcours vous apporte, et ce qu’il n’apporte pas.',
    action: { href: '/contact', libelle: 'Parler de votre projet' },
  },
} satisfies IParcoursPage

/** Validé au chargement : une donnée non conforme échoue au build, pas en production. */
export const parcoursPage: IParcoursPage = parcoursPageSchema.parse(donnees)
