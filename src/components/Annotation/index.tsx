import styles from './annotation.module.css';

interface IAnnotationProps {
  readonly children: React.ReactNode;
}

/**
 * L'annotation manuscrite, seule occasion ou Shadows Into Light apparait.
 *
 * C'est la voix humaine dans la marge d'un ecran de code, et elle reste rare par
 * construction : des qu'elle sert deux fois sur le meme ecran, elle a cesse
 * d'etre une annotation pour devenir une police de corps. Une par page, au plus.
 *
 * La fleche est dessinee, jamais un glyphe unicode : un caractere emprunte
 * change de forme d'une plateforme a l'autre et casse l'ecriture a la main.
 */
export function Annotation({ children }: IAnnotationProps) {
  return (
    <aside className={styles.annotation}>
      <svg
        className={styles.fleche}
        viewBox="0 0 48 34"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        {/* Un trait trace a la main : il part vers le haut a gauche, vers le
            texte qu'il commente. */}
        <path d="M46 31 C 34 30, 18 26, 8 9" />
        <path d="M8 9 L 15 16" />
        <path d="M8 9 L 4 18" />
      </svg>
      <p className={styles.texte}>{children}</p>
    </aside>
  );
}
