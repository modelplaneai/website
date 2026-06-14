interface VideoProps {
  src: string
  poster?: string
  caption?: string
}

// Self-hosted video. Place files under public/blog/<slug>/ and reference by absolute path.
export default function Video({ src, poster, caption }: VideoProps) {
  return (
    <figure className="prose-figure">
      <video className="prose-video" controls playsInline preload="metadata" poster={poster}>
        <source src={src} />
        Your browser does not support the video tag.
      </video>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
