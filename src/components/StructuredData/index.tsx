// StructuredData/index.tsx — jeromemarichez-fr
// Injecte un ou plusieurs graphes JSON-LD dans la page.

interface StructuredDataProps {
  /** Graphes schema.org construits par `@shared/seo/structured-data`. */
  schemas: Record<string, unknown>[]
}

/**
 * Rendu côté serveur : le JSON-LD part dans le HTML statique, donc il est lu au premier
 * passage du robot, sans dépendre du JavaScript.
 *
 * `JSON.stringify` sur des objets construits en interne, jamais sur une entrée
 * utilisateur : c'est ce qui rend `dangerouslySetInnerHTML` acceptable ici. Le
 * remplacement de `<` ferme la seule porte restante, celle d'une chaîne éditoriale qui
 * contiendrait une balise et casserait le `<script>`.
 */
export function StructuredData({ schemas }: StructuredDataProps) {
  return (
    <>
      {schemas.map((schema) => (
        <script
          key={String(schema['@id'] ?? schema['@type'])}
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: seul moyen d'émettre du JSON-LD ; la donnée est interne et échappée.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
        />
      ))}
    </>
  )
}
