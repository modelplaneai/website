interface EmbedProps {
  src: string
  title?: string
}

// Generic responsive 16:9 iframe embed for non-YouTube providers.
export default function Embed({ src, title = 'Embedded content' }: EmbedProps) {
  return (
    <figure className="prose-figure">
      <div className="prose-embed">
        <iframe src={src} title={title} loading="lazy" allowFullScreen />
      </div>
    </figure>
  )
}
