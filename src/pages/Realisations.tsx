import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { ProjectsGrid } from '@/components/sections/ProjectsGrid'
import { VideoSection } from '@/components/sections/VideoSection'
import { CTASection } from '@/components/sections/CTASection'
import { SEO } from '@/seo/SEO'
import { realisationsMeta } from '@/seo/pageMeta'
import { PROJECT_VIDEO_IDS } from '@/data/realisations'

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
      </div>
      <div className="pt-8">
        <ProjectsGrid title="" />
      </div>
      <VideoSection videoIds={PROJECT_VIDEO_IDS} />
      <CTASection />
    </>
  )
}
