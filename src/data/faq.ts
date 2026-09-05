import type { FAQItem } from '@/types'
import { SERVICE_AREAS } from '@/lib/constants'

/**
 * FAQ construite à partir des objections réelles d'un chantier de construction/rénovation,
 * comparables à celles publiées par les concurrents directs audités (voir COMPETITOR_ANALYSIS.md,
 * ex. Bâti HALLI). Aucune réponse n'affirme une certification ou un chiffre non confirmé par le client.
 */
export const GENERAL_FAQ: FAQItem[] = [
  {
    // Placed first deliberately. This FAQ feeds the homepage's FAQPage schema, and the homepage
    // is the page Google serves for "gros oeuvre toulouse" / "entreprise gros oeuvre toulouse"
    // (the two highest-impression non-brand queries in GSC). Both the visible answer and the
    // extracted schema now address that question directly instead of leaving it implicit.
    // Every fact below is already stated on /services/construction/ (its `intro` and
    // `includes`) — this restates it, it does not claim anything new.
    question: 'Réalisez-vous le gros œuvre à Toulouse ?',
    answer:
      "Oui. Le gros œuvre — fondations, murs de soubassement, élévation en parpaing ou en brique, dalles et structures en béton armé — fait partie de nos chantiers courants à Toulouse et en Midi-Pyrénées, en construction neuve comme en extension, en résidentiel comme en professionnel. C'est la structure porteuse du bâtiment, réalisée avant les travaux de second œuvre.",
  },
  {
    question: 'Comment se déroule une demande de devis avec RK Pyrénées Construction ?',
    answer:
      "Vous décrivez votre projet via le formulaire de devis ou par téléphone. Nous convenons d'une visite sur site si nécessaire, puis vous recevez un devis détaillé avant tout engagement. Le devis est gratuit et sans obligation.",
  },
  {
    question: 'Dans quelles zones intervenez-vous ?',
    answer:
      `RK Pyrénées Construction intervient dans toute la zone ${SERVICE_AREAS[0]}. Pour un projet situé en dehors de cette zone, contactez-nous : nous étudions chaque demande au cas par cas selon la localisation exacte.`,
  },
  {
    question: 'Le devis est-il vraiment gratuit et sans engagement ?',
    answer:
      "Oui. La visite et le devis ne vous engagent à rien. Vous êtes libre d'accepter, de demander des ajustements ou de ne pas donner suite.",
  },
  {
    question: 'Combien de temps dure un chantier de rénovation ou construction ?',
    answer:
      "Cela dépend entièrement de la nature et de l'ampleur des travaux. Le délai estimé est indiqué dans le devis et un planning vous est communiqué avant le démarrage du chantier.",
  },
  {
    question: 'Que se passe-t-il si le projet évolue en cours de chantier ?',
    answer:
      "Toute modification par rapport au devis initial (ajout de travaux, changement de matériaux) fait l'objet d'un avenant chiffré avant réalisation, pour que vous gardiez la visibilité sur le budget.",
  },
  {
    question: 'Travaillez-vous aussi bien sur des maisons anciennes que des constructions neuves ?',
    answer:
      "Oui, nos chantiers couvrent aussi bien la construction neuve (fondations, structures) que la rénovation de bâti ancien toulousain (pierre, brique), ainsi que les travaux extérieurs (dallage, terrassement).",
  },
  {
    question: 'Comment se passe la fin de chantier ?',
    answer:
      'Une visite de réception a lieu avec vous à la fin des travaux pour vérifier ensemble que le résultat correspond au devis validé.',
  },
]
