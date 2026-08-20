import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { CTASection } from '@/components/sections/CTASection'
import { SEO } from '@/seo/SEO'
import { breadcrumbSchema } from '@/seo/schema'
import { BUSINESS } from '@/lib/constants'

export default function About() {
  const crumbs = [{ name: 'Accueil', path: '/' }, { name: 'À propos', path: '/a-propos' }]
  return (
    <>
      <SEO
        title={`À propos — RK Pyrénées Construction, entreprise de bâtiment à ${BUSINESS.city}`}
        description="RK Pyrénées Construction est une entreprise de bâtiment (SASU) basée à Toulouse depuis 2023, spécialisée en maçonnerie, rénovation et construction."
        path="/a-propos"
        schemas={[breadcrumbSchema(crumbs)]}
      />
      <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumb items={crumbs} />
        <h1 className="mt-6 font-display text-4xl font-bold text-ink-900 sm:text-5xl">À propos de RK Pyrénées Construction</h1>

        <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-700">
          <p>
            RK Pyrénées Construction est une entreprise de bâtiment basée à {BUSINESS.city}, constituée en {BUSINESS.legalForm}{' '}
            et immatriculée depuis {BUSINESS.foundedYear} (SIREN {BUSINESS.siren}). Elle intervient sur des chantiers de
            maçonnerie, rénovation, construction neuve, terrassement et dallage pour des particuliers et des
            professionnels, à Toulouse et dans sa proche périphérie.
          </p>
          <p>
            L'entreprise couvre l'ensemble du gros œuvre : fondations, structures en béton armé, élévation de murs,
            ainsi que les travaux de dallage et d'aménagement extérieur (terrasses, allées, perrons). Elle intervient
            aussi bien sur des constructions neuves que sur la rénovation de bâti ancien toulousain — pierre et brique.
          </p>
          <h2 className="pt-2 font-display text-2xl font-bold text-ink-900">Notre méthode</h2>
          <p>
            Chaque projet démarre par une visite sur site et se poursuit par un devis détaillé, sans surprise de
            budget en cours de chantier : toute modification par rapport au devis initial fait l'objet d'un avenant
            chiffré avant d'être réalisée.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-4 px-4 sm:px-6 lg:px-8">
        <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-stone-200">
          <OptimizedImage stem="1000048194-A1aP2raD33t64j93" alt="Chantier de construction RK Pyrénées Construction en zone urbaine" variant="full" className="h-full w-full object-cover" />
        </div>
        <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-stone-200">
          <OptimizedImage stem="47061-vBTBOy9ywctKb4Gh" alt="Chantier de rénovation structurelle d'un bâti ancien" variant="full" className="h-full w-full object-cover" />
        </div>
      </div>

      <div className="pt-16">
        <CTASection />
      </div>
    </>
  )
}
