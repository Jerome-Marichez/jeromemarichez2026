import { Section } from '@/@shared/components/Section'
import type { IContactPage } from '@/interfaces/contact-page'

interface ISansFormulaireProps {
  contenu: IContactPage['sansFormulaire']
}

/**
 * L'absence de formulaire, expliquée.
 *
 * Cette section existe parce qu'un visiteur qui cherche un formulaire et n'en trouve pas
 * conclut à un site inachevé. Dire pourquoi il n'y en a pas transforme un manque en
 * décision — et la décision, elle, est cohérente avec ce que le site vend : on ne livre
 * pas un mécanisme qui fait semblant de fonctionner.
 *
 * Aucun engagement de date n'y figure : le service d'acheminement n'est pas choisi, et
 * annoncer « bientôt » serait une promesse que rien n'appuie.
 */
export function SansFormulaire({ contenu }: ISansFormulaireProps) {
  return (
    <Section id="sans-formulaire" title={contenu.titre} width="narrow">
      <p>{contenu.texte}</p>
    </Section>
  )
}
