interface ProcessStep {
  title: string
  description: string
}

export function Process({ steps, title = 'Comment se déroule votre chantier' }: { steps: ProcessStep[]; title?: string }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="mb-10 font-display text-3xl font-bold text-ink-900 sm:text-4xl">{title}</h2>
      <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step.title} className="relative pl-12">
            <span className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full bg-ink-900 font-display text-sm font-bold text-white">
              {i + 1}
            </span>
            <h3 className="font-display text-base font-bold text-ink-900">{step.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
