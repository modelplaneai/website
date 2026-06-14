interface YouTubeProps {
  id: string
  title?: string
}

// Responsive, privacy-friendly YouTube embed.
export default function YouTube({ id, title = 'YouTube video' }: YouTubeProps) {
  return (
    <figure className="prose-figure">
      <div className="prose-embed">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </figure>
  )
}
