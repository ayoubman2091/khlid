import { Hero } from '@/components/sections/Hero'
import { TrustSignals } from '@/components/sections/TrustSignals'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { ProjectsGrid } from '@/components/sections/ProjectsGrid'
import { WhyUs } from '@/components/sections/WhyUs'
import { ServiceAreas } from '@/components/sections/ServiceAreas'
import { FAQSection } from '@/components/sections/FAQSection'
import { CTASection } from '@/components/sections/CTASection'
import { VideoSection } from '@/components/sections/VideoSection'
import { SEO } from '@/seo/SEO'
import { organizationSchema, localBusinessSchema, websiteSchema } from '@/seo/schema'
import { GENERAL_FAQ } from '@/data/faq'
import { PROJECT_VIDEO_IDS } from '@/data/realisations'
import { BUSINESS } from '@/lib/constants'

export default function Home() {
  return (
    <>
      <SEO
        title={`RK Pyrénées Construction — Maçonnerie, rénovation et construction à ${BUSINESS.city}`}
        description="RK Pyrénées Construction : maçonnerie, rénovation, construction, terrassement, dallage et extension de maison à Toulouse et sa proche banlieue. Devis gratuit."
        path="/"
        image={`${BUSINESS.siteUrl}/logo/logo-512.png`}
        schemas={[organizationSchema(), localBusinessSchema(), websiteSchema()]}
      />
      <Hero />
      <TrustSignals />
      <ServicesGrid />
      <ProjectsGrid limit={4} />
      <VideoSection videoIds={PROJECT_VIDEO_IDS.slice(0, 3)} title="Un chantier récent en vidéo" />
      <WhyUs />
      <ServiceAreas />
      <FAQSection items={GENERAL_FAQ} />
      <CTASection />
    </>
  )
}
