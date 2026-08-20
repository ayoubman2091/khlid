import { Hero } from '@/components/sections/Hero'
import { TrustSignals } from '@/components/sections/TrustSignals'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { ProjectsGrid } from '@/components/sections/ProjectsGrid'
import { WhyUs } from '@/components/sections/WhyUs'
import { ServiceAreas } from '@/components/sections/ServiceAreas'
import { LocationSection } from '@/components/sections/LocationSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { CTASection } from '@/components/sections/CTASection'
import { VideoSection } from '@/components/sections/VideoSection'
import { SEO } from '@/seo/SEO'
import { homeMeta } from '@/seo/pageMeta'
import { GENERAL_FAQ } from '@/data/faq'
import { PROJECT_VIDEO_IDS } from '@/data/realisations'

export default function Home() {
  return (
    <>
      <SEO {...homeMeta()} />
      <Hero />
      <TrustSignals />
      <ServicesGrid />
      <ProjectsGrid limit={4} />
      <VideoSection videoIds={PROJECT_VIDEO_IDS.slice(0, 3)} title="Un chantier récent en vidéo" />
      <WhyUs />
      <ServiceAreas />
      <LocationSection />
      <FAQSection items={GENERAL_FAQ} />
      <CTASection />
    </>
  )
}
