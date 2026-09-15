import { Link } from 'react-router-dom'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { SERVICES } from '@/data/services'
import { QuoteForm } from '@/components/sections/QuoteForm'
import { SEO } from '@/seo/SEO'
import { quoteMeta } from '@/seo/pageMeta'
import { BUSINESS } from '@/lib/constants'
import { Phone } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'

export default function Quote() {
  const meta = quoteMeta()
  return (
    <>
      <SEO {...meta} />
      <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumb items={meta.crumbs!} />
        <h1 className="mt-6 font-display text-4xl font-bold text-ink-900 sm:text-5xl">Demander un devis gratuit</h1>
        <p className="mt-4 text-lg text-ink-600">
          Décrivez votre projet : nous revenons vers vous avec un devis détaillé, sans engagement.
        </p>

        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <a
            href={`tel:${BUSINESS.phoneE164}`}
            onClick={() => trackEvent('phone_click', { location: 'quote_page' })}
            className="inline-flex items-center gap-2 font-semibold text-ink-900 hover:text-brick-500"
          >
            <Phone size={16} /> {BUSINESS.phone}
          </a>
          <a
            href={`https://wa.me/${BUSINESS.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { location: 'quote_page' })}
            className="inline-flex items-center gap-2 font-semibold text-forest-700 hover:text-forest-800"
          >
            <WhatsAppIcon size={16} /> WhatsApp
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
          <QuoteForm />
        </div>
      </div>

      {/* 76 mots de corps avant ce bloc, sur la page où se décide le contact - la plus mince du
          site à l'endroit le plus cher. Aucun montant ici : la décision client du 2026-08-20
          (CONTENT_STRATEGY_NO_PRICING.md) interdit toute information tarifaire, et expliquer
          comment un devis se construit n'est pas publier un prix. */}
      <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        <section>
          <h2 className="font-display text-2xl font-bold text-ink-900">Ce qu'il nous faut pour chiffrer</h2>
          <p className="mt-3 text-ink-600">
            Plus la demande est précise, plus le devis l'est. Trois éléments changent réellement
            un chiffrage : la nature des travaux (construction neuve, rénovation, reprise
            structurelle, extérieur), l'état de l'existant s'il y en a un, et l'accès au chantier
            — un engin qui ne peut pas approcher change l'organisation bien plus que la
            technique. Des photos, même prises au téléphone, valent souvent mieux qu'un long
            descriptif. Un plan, un permis accordé ou une étude de sol, si vous en avez, évitent
            un aller-retour.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold text-ink-900">Ce qui se passe après votre demande</h2>
          <p className="mt-3 text-ink-600">
            Nous reprenons contact pour cadrer le besoin et lever ce qui manque. Sur la plupart
            des projets de gros œuvre, de maçonnerie ou de terrassement, une visite sur place
            suit : on ne chiffre pas sérieusement une reprise de mur ou un décaissement sans
            avoir vu le terrain et l'existant. Le devis écrit arrive ensuite. Il est gratuit et
            sans engagement.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold text-ink-900">À quoi reconnaît-on un devis exploitable</h2>
          <p className="mt-3 text-ink-600">
            Un devis qui tient en une ligne et un total ne vous permet de comparer rien du tout.
            Un devis exploitable détaille les postes — terrassement, fondations, élévation,
            dalles, ouvrages particuliers — avec les quantités correspondantes, et indique ce
            qui n'est pas compris. C'est ce niveau de détail qui vous permet de confronter deux
            entreprises sur la même base et de voir ce que chacune a prévu, ou omis. C'est le
            principe sur lequel les nôtres sont construits.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold text-ink-900">Sur quoi porte votre projet ?</h2>
          <p className="mt-3 text-ink-600">
            Si vous hésitez sur la nature exacte des travaux, ces pages décrivent ce que couvre
            chaque métier et comment le chantier se déroule :
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}/`} className="font-medium text-brick-600 hover:underline">
                  {s.name} à {BUSINESS.city}
                </Link>
                <span className="text-ink-500"> — {s.tagline.toLowerCase()}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-ink-600">
            Vous pouvez aussi regarder{' '}
            <Link to="/realisations/" className="font-medium text-brick-600 hover:underline">
              nos chantiers déjà réalisés
            </Link>{' '}
            : chaque fiche décrit la méthode employée, photos à l'appui.
          </p>
        </section>
      </div>
    </>
  )
}
