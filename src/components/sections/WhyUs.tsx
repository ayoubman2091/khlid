import { Handshake, PencilRuler, MessageSquare } from 'lucide-react'

const POINTS = [
  {
    icon: PencilRuler,
    title: 'Du gros œuvre à la finition',
    body: "Maçonnerie, structure béton armé, dallage et rénovation : une seule entreprise pour piloter l'ensemble du chantier.",
  },
  {
    icon: MessageSquare,
    title: 'Devis détaillé, pas d\'approximation',
    body: 'Chaque devis décrit les travaux, matériaux et délais avant que vous vous engagiez.',
  },
  {
    icon: Handshake,
    title: 'Une entreprise locale',
    body: 'Basée à Toulouse, RK Pyrénées Construction connaît le bâti toulousain — pierre, brique ancienne, contraintes locales.',
  },
]

export function WhyUs() {
  return (
    <section className="bg-forest-800 py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-10 max-w-xl font-display text-3xl font-bold sm:text-4xl">Pourquoi choisir RK Pyrénées Construction</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {POINTS.map(({ icon: Icon, title, body }) => (
            <div key={title}>
              <Icon size={28} className="text-brick-500" />
              <h3 className="mt-4 font-display text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-200">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
