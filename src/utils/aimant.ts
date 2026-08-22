// aimant.ts — jeromemarichez-fr
// Le décalage d'un bouton attiré par le pointeur. Fonction pure, sans DOM.

/**
 * Amplitude maximale du décalage, en pixels.
 *
 * Six pixels, et pas davantage : au-delà, le bouton quitte visiblement sa place et le
 * geste devient un jouet. En deçà, il ne se remarque pas. C'est aussi la borne qui
 * garantit que rien ne dépasse de la zone de clic — l'attraction reste un `transform`,
 * la cible au pointeur ne bouge pas.
 */
export const PORTEE_AIMANT = 6

function borner(valeur: number): number {
  return Math.max(-1, Math.min(1, valeur))
}

/**
 * Rend le décalage `[x, y]` à appliquer au bouton pour qu'il suive le pointeur.
 *
 * La position du pointeur est ramenée à `[-1, 1]` dans chaque axe du cadre, puis
 * multipliée par la portée. Un pointeur au centre ne décale rien ; un pointeur au bord
 * décale de la portée entière ; au-delà du cadre, le décalage est borné plutôt que de
 * croître — sans quoi un mouvement rapide traversant le bouton l'enverrait au loin.
 *
 * Un cadre de largeur ou de hauteur nulle rend `0` sur l'axe concerné : l'élément n'est
 * pas encore mis en page, il n'y a pas de centre à viser.
 *
 * @param cadre position et dimensions de l'élément, telles que les rend un `DOMRect`.
 *   Le type est réduit aux quatre champs utiles pour que la fonction se teste sans DOM.
 */
export function calculerDecalageAimant(
  cadre: { left: number; top: number; width: number; height: number },
  pointeurX: number,
  pointeurY: number,
  portee: number = PORTEE_AIMANT,
): readonly [number, number] {
  const demiLargeur = cadre.width / 2
  const demiHauteur = cadre.height / 2

  const x = demiLargeur > 0 ? borner((pointeurX - (cadre.left + demiLargeur)) / demiLargeur) : 0
  const y = demiHauteur > 0 ? borner((pointeurY - (cadre.top + demiHauteur)) / demiHauteur) : 0

  return [x * portee, y * portee]
}
