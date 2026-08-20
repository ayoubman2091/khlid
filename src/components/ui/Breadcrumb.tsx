import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export interface Crumb {
  name: string
  path: string
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="text-sm text-ink-600">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight size={14} className="text-stone-300" aria-hidden="true" />}
              {isLast ? (
                <span className="font-medium text-ink-900" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link to={item.path} className="hover:text-brick-500 hover:underline">
                  {item.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
