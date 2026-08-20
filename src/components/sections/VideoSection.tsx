import { useState } from 'react'
import { Play } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

/**
 * Facade cliquable : ne charge l'iframe YouTube (et son JS) qu'au clic, pour ne jamais
 * charger 15 vidéos simultanément comme le fait le site actuel (voir audit §5.2, problème P1).
 */
function VideoThumb({ videoId }: { videoId: string }) {
  const [active, setActive] = useState(false)

  if (active) {
    return (
      <div className="aspect-video overflow-hidden rounded-xl bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
          title={`Vidéo de chantier RK Pyrénées Construction ${videoId}`}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => {
        setActive(true)
        trackEvent('video_play', { video: videoId })
      }}
      className="group relative aspect-video w-full overflow-hidden rounded-xl bg-ink-900"
      aria-label="Lire la vidéo de chantier"
    >
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt="Miniature d'une vidéo de chantier RK Pyrénées Construction"
        loading="lazy"
        className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-60"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brick-500 text-white shadow-lg transition-transform group-hover:scale-110">
          <Play size={22} fill="currentColor" />
        </span>
      </span>
    </button>
  )
}

export function VideoSection({ videoIds, title = 'Nos chantiers en vidéo' }: { videoIds: string[]; title?: string }) {
  if (videoIds.length === 0) return null
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl">{title}</h2>
      <p className="mt-3 max-w-xl text-ink-600">Chantiers filmés sur le terrain.</p>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videoIds.map((id) => (
          <VideoThumb key={id} videoId={id} />
        ))}
      </div>
    </section>
  )
}
