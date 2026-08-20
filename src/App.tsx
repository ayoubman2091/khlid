import { Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import Home from '@/pages/Home'
import ServicesHub from '@/pages/ServicesHub'
import ServiceDetail from '@/pages/ServiceDetail'
import Realisations from '@/pages/Realisations'
import RealisationDetail from '@/pages/RealisationDetail'
import About from '@/pages/About'
import ServiceAreasPage from '@/pages/ServiceAreasPage'
import Contact from '@/pages/Contact'
import Quote from '@/pages/Quote'
import GuidesIndex from '@/pages/GuidesIndex'
import Guide from '@/pages/Guide'
import NotFound from '@/pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<ServicesHub />} />
        <Route path="services/:slug" element={<ServiceDetail />} />
        <Route path="realisations" element={<Realisations />} />
        <Route path="realisations/:slug" element={<RealisationDetail />} />
        <Route path="a-propos" element={<About />} />
        <Route path="zones-intervention" element={<ServiceAreasPage />} />
        <Route path="contact" element={<Contact />} />
        <Route path="devis" element={<Quote />} />
        <Route path="guides" element={<GuidesIndex />} />
        <Route path="guides/:slug" element={<Guide />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
