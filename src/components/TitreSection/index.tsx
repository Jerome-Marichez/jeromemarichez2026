import styles from './titre-section.module.css';

interface ITitreSectionProps {
  readonly children: React.ReactNode;
  /** Niveau reel dans le plan du document. Le style ne change pas avec lui. */
  readonly niveau?: 2 | 3;
  readonly id?: string;
}

/**
 * Un titre de section.
 *
 * Aucun sur-titre, aucun numero d'ordre : le titre porte son propre poids. Le
 * marqueur `//` qui le precede n'est pas un ornement, c'est la syntaxe du monde
 * retenu, et il est masque a la synthese vocale, qui lirait « barre oblique
 * barre oblique » sans y gagner quoi que ce soit.
 */
export function TitreSection({ children, niveau = 2, id }: ITitreSectionProps) {
  const Balise = niveau === 2 ? 'h2' : 'h3';

  return (
    <Balise className={styles.titre} id={id}>
      <span className={styles.marqueur} aria-hidden="true">
        //
      </span>
      {children}
    </Balise>
  );
}
