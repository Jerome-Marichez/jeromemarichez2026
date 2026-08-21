// slab-shader.ts — jeromemarichez-fr
// Le matériau des dalles de verre. Un seul programme, partagé par les trois.
//
// Volontairement PAS de `MeshPhysicalMaterial` avec `transmission` : la transmission
// impose une passe de rendu et une cible de rendu par objet transparent. Pour trois
// dalles qui n'ont besoin que d'une arête allumée, le coût serait sans rapport avec
// le résultat. Un Fresnel dans un shader non éclairé donne la même lecture pour
// zéro lumière, zéro ombre et zéro texture.

export const SLAB_VERTEX_SHADER = /* glsl */ `
  varying vec3 vNormalView;
  varying vec3 vPositionView;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vNormalView = normalize(normalMatrix * normal);
    vec4 positionView = modelViewMatrix * vec4(position, 1.0);
    vPositionView = positionView.xyz;
    gl_Position = projectionMatrix * positionView;
  }
`

export const SLAB_FRAGMENT_SHADER = /* glsl */ `
  precision mediump float;

  uniform vec3 uEdgeColor;
  uniform vec3 uCoreColor;
  uniform float uTime;
  uniform float uIndex;
  uniform float uCoreAlpha;
  uniform float uEdgeAlpha;

  varying vec3 vNormalView;
  varying vec3 vPositionView;
  varying vec2 vUv;

  void main() {
    vec3 normal = normalize(vNormalView);
    vec3 view = normalize(-vPositionView);

    // Fresnel : le centre reste presque vide, l'arête s'allume. Exposant 2.0 plutôt
    // que 3.0 — à 3.0, une dalle vue de face n'allume plus que son biseau et devient
    // invisible sur un fond clair, ce qui vide la scène de son sujet.
    float fresnel = pow(1.0 - clamp(dot(normal, view), 0.0, 1.0), 2.0);

    // Bande spéculaire unique, qui glisse lentement le long de la dalle. Décalée par
    // dalle pour que les trois ne clignotent pas ensemble.
    float bandeCentre = fract(uTime * 0.06 + uIndex * 0.31);
    float bande = smoothstep(0.06, 0.0, abs(vUv.y - bandeCentre));

    vec3 couleur = mix(uCoreColor, uEdgeColor, fresnel);

    float alpha = mix(uCoreAlpha, uEdgeAlpha, fresnel) + bande * 0.08;
    gl_FragColor = vec4(couleur, clamp(alpha, 0.0, 0.85));
  }
`

/**
 * Opacité du corps et de l'arête.
 *
 * Deux jeux de valeurs, parce que le verre ne se lit pas pareil selon le fond : posé
 * sur le papier clair, un voile à 4 % disparaît purement et simplement — c'est le
 * défaut qu'on corrige ici. Sur le graphite du thème sombre, la même valeur suffit
 * largement et monter plus haut donnerait une plaque laiteuse.
 */
export const SLAB_ALPHA = {
  clair: { corps: 0.035, arete: 0.3 },
  sombre: { corps: 0.03, arete: 0.34 },
} as const

/** Teinte d'arête par dalle : la première prend le cuivre, les deux autres s'éteignent. */
export const SLAB_EDGE_TINT = [1, 0.55, 0.3] as const
