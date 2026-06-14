interface ImageProps {
  src?: string
  alt?: string
}

// Markdown images (![alt](src)) and explicit <Image> both render through here.
// The alt text doubles as a caption. Plain <img> keeps parity with the rest of the site.
export default function Image({ src, alt }: ImageProps) {
  if (!src) return null
  return (
    <figure className="prose-figure">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt || ''} loading="lazy" />
      {alt && <figcaption>{alt}</figcaption>}
    </figure>
  )
}
