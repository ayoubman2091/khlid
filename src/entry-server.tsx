import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, Routes, Route } from 'react-router-dom'
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
export { staticRoutes, getMetaForPath } from '@/seo/pageMeta'
// Re-exported so the node-side build scripts (scripts/prerender.ts,
// scripts/generate-seo-files.ts) share the app's one canonical-URL rule instead of
// reimplementing it — they can only reach src/ through this bundle, because the `@/` alias
// is resolved by Vite, not by node.
export { canonicalPath } from '@/seo/canonicalPath'

/**
 * Server/prerender-only mirror of App.tsx's route table (see scripts/prerender.ts).
 * Deliberately uses static (eager) imports instead of React.lazy: renderToString does not
 * wait on Suspense/lazy boundaries, so a lazy-loaded page would render as its fallback (empty)
 * during prerendering — which would silently defeat the whole point of prerendering. The
 * CLIENT bundle (src/App.tsx, loaded via main.tsx) still code-splits normally for real
 * visitors; only this SSR-only entry trades that off for synchronous, complete server HTML.
 * Keep this route list in sync with App.tsx's <Route> table if either changes.
 */
function ServerApp() {
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

/** Renders one route to a body-only HTML string. SEO.tsx's effect never runs during
 *  renderToString (no effects run server-side) — that's expected: the prerender script gets
 *  head metadata separately from seo/pageMeta.ts's getMetaForPath(), not from this render. */
export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <ServerApp />
      </StaticRouter>
    </StrictMode>,
  )
}
