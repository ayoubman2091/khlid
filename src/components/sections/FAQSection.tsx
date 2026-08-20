import type { FAQItem } from '@/types'
import { Accordion } from '@/components/ui/Accordion'

export function FAQSection({ items, title = 'Questions fréquentes' }: { items: FAQItem[]; title?: string }) {
  if (items.length === 0) return null
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="mb-8 font-display text-3xl font-bold text-ink-900 sm:text-4xl">{title}</h2>
      <Accordion items={items} />
    </section>
  )
}
