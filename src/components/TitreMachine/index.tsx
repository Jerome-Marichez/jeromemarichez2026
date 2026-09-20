import styles from './titre-machine.module.css';

interface ITitreMachineProps {
  readonly texte: string;
  /** Duree totale de la frappe, en secondes. */
  readonly duree?: number;
}

/**
 * Le titre qui s'ecrit, en composant serveur.
 *
 * Le portfolio d'origine construisait la chaine caractere par caractere dans un
 * `useState` : le titre n'existait donc ni pour un robot d'indexation, ni pour
 * un lecteur d'ecran, ni avant l'hydratation. Ici le `h1` est rendu entier cote
 * serveur, et seule sa **revelation** est animee, en CSS, avec un retard par
 * caractere. Rien a hydrater, et le referencement voit le titre complet.
 *
 * Le titre est expose d'un bloc a la synthese vocale ; les caracteres decoupes
 * sont masques, sinon ils seraient annonces un par un.
 */
export function TitreMachine({ texte, duree = 1.6 }: ITitreMachineProps) {
  const caracteres = [...texte];
  const pas = duree / caracteres.length;

  return (
    <h1 className={styles.titre}>
      <span className="hors-ecran">{texte}</span>

      <span aria-hidden="true" className={styles.frappe}>
        {caracteres.map((caractere, index) => (
          <span
            // Le meme caractere revient plusieurs fois dans le titre : la
            // position fait donc partie de l'identite de la cellule.
            key={`${caractere}-${index}`}
            className={styles.cellule}
            style={{ animationDelay: `${(index * pas).toFixed(3)}s` }}
          >
            {caractere === ' ' ? ' ' : caractere}
          </span>
        ))}
        <span
          className={styles.curseur}
          style={{ animationDelay: `${duree.toFixed(3)}s` }}
        />
      </span>
    </h1>
  );
}
