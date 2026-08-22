// IBoundary.ts — jeromemarichez-fr
// Une limite assumée : ce qui n'est pas fait, et ce qui l'est à la place.

/**
 * Dire ce qu'on ne fait pas est un argument, pas un aveu.
 *
 * C'est aussi la traduction directe des règles de véracité du `CLAUDE.md` : plutôt que
 * de simplement taire ce qui n'est pas revendicable, le site l'écrit noir sur blanc.
 * Un dirigeant qui lit « pas de cluster Kubernetes administré en propre » sait à quoi
 * s'en tenir — et sait, par la même occasion, que le reste de la page est fiable.
 */
export interface IBoundary {
  /** Ce qui n'est pas proposé, formulé sans détour. */
  hors: string
  /** Ce qui est réellement fait à la place. */
  alaPlace: string
}
