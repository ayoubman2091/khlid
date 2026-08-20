import { Button } from '@/components/ui/Button'
import { SEO } from '@/seo/SEO'
import { notFoundMeta } from '@/seo/pageMeta'

export default function NotFound() {
  return (
    <>
      <SEO {...notFoundMeta()} />
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
        <p className="font-display text-6xl font-bold text-brick-500">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-ink-900">Page introuvable</h1>
        <p className="mt-3 text-ink-600">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <Button to="/" size="lg" className="mt-8">
          Retour à l'accueil
        </Button>
      </div>
    </>
  )
}
