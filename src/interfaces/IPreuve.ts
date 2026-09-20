/** Une preuve chiffrée, toujours rattachée à son contexte : jamais un chiffre nu. */
export interface IPreuve {
  chiffre: string
  contexte: string
}
