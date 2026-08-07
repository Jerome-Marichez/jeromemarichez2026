// src/index.ts — jeromemarichez2026 (back)
// Serveur HTTP minimal sans dépendance (node:http) : point de départ à remplacer
// par le vrai back (routes → services → repositories, validation Zod à la frontière).
import { createServer } from 'node:http'

const port = Number(process.env.PORT ?? 3001)

export const server = createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: 'ok', service: 'jeromemarichez2026' }))
    return
  }
  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ error: 'not found' }))
})

// En test (niveau système), le serveur est démarré par le test via listen(0).
if (process.env.NODE_ENV !== 'test') {
  server.listen(port, () => {
    // biome-ignore lint/suspicious/noConsole: log de démarrage — en conteneur, stdout est le canal de log
    console.log(`jeromemarichez2026 back démarré sur http://localhost:${port}`)
  })
}
