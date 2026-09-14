import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { ProjectsGrid } from '@/components/sections/ProjectsGrid'
import { VideoSection } from '@/components/sections/VideoSection'
import { CTASection } from '@/components/sections/CTASection'
import { SEO } from '@/seo/SEO'
import { realisationsMeta } from '@/seo/pageMeta'
import { PROJECT_VIDEO_IDS, REALISATIONS } from '@/data/realisations'
import { getServiceBySlug } from '@/data/services'
import { Link } from 'react-router-dom'

export default function Realisations() {
  const meta = realisationsMeta()
  return (
    <>
      <SEO {...meta} />
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumb items={meta.crumbs!} />
        <h1 className="mt-6 max-w-2xl font-display text-4xl font-bold text-ink-900 sm:text-5xl">Nos réalisations</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-600">
          Les photos ci-dessous sont celles de nos propres chantiers, classées par type de travaux.
        </p>
        <div className="mt-6 max-w-3xl space-y-4 text-ink-600">
          <p>
            Quatre familles de chantiers reviennent dans notre activité et structurent cette page :
            le dallage en pierre naturelle, les dalles béton extérieures, le gros œuvre de
            construction neuve et la reprise de bâti ancien. Chaque fiche décrit la méthode
            réellement employée sur les photos — préparation du support, ferraillage, coffrage,
            reprise en sous-œuvre — plutôt qu'une galerie sans commentaire.
          </p>
          <p>
            Nous ne publions ni nom de client, ni adresse, ni budget : ces informations
            appartiennent aux personnes qui nous ont fait travailler. Ce qui est montré ici est
            vérifiable sur les images elles-mêmes, et c'est sur cette base que nous préférons être
            jugés.
          </p>
        </div>
      </div>
      <div className="pt-8">
        <ProjectsGrid title="" />
      </div>
      {/* Google reported this URL as "Détectée, actuellement non indexée" on 2026-09-08 while it
          was 112 words of body copy. This block is the substance it lacked, and it doubles as the
          hub -> case-study -> service link path: before it, the only route from here into a
          service page went through a card image. */}
      <div className="mx-auto mt-16 max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-ink-900">Ce que montrent ces chantiers</h2>
        <div className="mt-8 space-y-8">
          {REALISATIONS.map((r) => {
            const service = getServiceBySlug(r.serviceSlug)
            const lead = r.sections?.[0]
            return (
              <section key={r.slug}>
                <h3 className="font-display text-xl font-semibold text-ink-900">
                  <Link to={`/realisations/${r.slug}/`} className="hover:text-brick-600">
                    {r.title}
                  </Link>
                </h3>
                {lead && <p className="mt-2 text-ink-600">{lead.body}</p>}
                {r.techniques && r.techniques.length > 0 && (
                  <p className="mt-2 text-sm text-ink-500">
                    Techniques : {r.techniques.join(' · ')}.
                  </p>
                )}
                {service && (
                  <p className="mt-2 text-sm">
                    <Link to={`/services/${service.slug}/`} className="font-medium text-brick-600 hover:underline">
                      Voir le service {service.shortName.toLowerCase()} à Toulouse
                    </Link>
                  </p>
                )}
              </section>
            )
          })}
        </div>
      </div>

      <VideoSection videoIds={PROJECT_VIDEO_IDS} />
      <CTASection />
    </>
  )
}
