import { useState, useId } from 'react'
import { ChevronDown } from 'lucide-react'
import type { FAQItem } from '@/types'

export function Accordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const idBase = useId()

  return (
    <div className="divide-y divide-stone-200 border-y border-stone-200">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        const panelId = `${idBase}-panel-${i}`
        const buttonId = `${idBase}-button-${i}`
        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-base font-semibold text-ink-900 sm:text-lg"
              >
                {item.question}
                <ChevronDown
                  size={20}
                  className={`shrink-0 text-brick-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            {isOpen && (
              <div id={panelId} role="region" aria-labelledby={buttonId} className="pb-5 pr-8 text-ink-700 leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
