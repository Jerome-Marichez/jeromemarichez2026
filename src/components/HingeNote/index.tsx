// HingeNote/index.tsx — jeromemarichez-fr
// La phrase qui passe la main d'un pôle au suivant.

import styles from './hinge-note.module.css'

interface HingeNoteProps {
  texte: string
}

/**
 * Rend une charnière.
 *
 * C'est le composant le plus important du site pour ce qu'il vend : sans ces phrases,
 * les pôles redeviennent des offres juxtaposées, et l'argument « c'est la même
 * personne du cadrage au run » tombe. Elles sont donc rendues comme des respirations
 * pleine largeur, pas comme des notes de bas de section.
 *
 * Le trait qui les précède est purement décoratif : il est produit en CSS et reste
 * invisible aux lecteurs d'écran, qui n'entendent que la phrase.
 */
export function HingeNote({ texte }: HingeNoteProps) {
  return (
    <p className={styles.charniere}>
      <span className={styles.texte}>{texte}</span>
    </p>
  )
}
