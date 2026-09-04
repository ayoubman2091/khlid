import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'

// Route-level code splitting (audit item #12): the homepage no longer pulls in every guide,
// service, and realisation page's code on first load — each route's JS downloads only when
// visited. Home stays eager since it's what most visitors land on first.
import Home from '@/pages/Home'
const ServicesHub = lazy(() => import('@/pages/ServicesHub'))
const ServiceDetail = lazy(() => import('@/pages/ServiceDetail'))
const Realisations = lazy(() => import('@/pages/Realisations'))
const RealisationDetail = lazy(() => import('@/pages/RealisationDetail'))
const About = lazy(() => import('@/pages/About'))
const ServiceAreasPage = lazy(() => import('@/pages/ServiceAreasPage'))
const Contact = lazy(() => import('@/pages/Contact'))
const Quote = lazy(() => import('@/pages/Quote'))
const GuidesIndex = lazy(() => import('@/pages/GuidesIndex'))
const Guide = lazy(() => import('@/pages/Guide'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<ServicesHub />} />
          <Route path="services/:slug" element={<ServiceDetail />} />
          <Route path="realisations" element={<Realisations />} />
          <Route path="realisations/:slug" element={<RealisationDetail />} />
          <Route path="projets" element={<Navigate to="/realisations/" replace />} />
          <Route path="a-propos" element={<About />} />
          <Route path="zones-intervention" element={<ServiceAreasPage />} />
          <Route path="contact" element={<Contact />} />
          <Route path="devis" element={<Quote />} />
          <Route path="guides" element={<GuidesIndex />} />
          <Route path="guides/:slug" element={<Guide />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
