import Head from 'next/head'
import type { ReactNode } from 'react'
import {
  SITE_NAME,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_TITLE,
  ogCardUrl,
} from '@/lib/site'

// Default social card for pages that do not supply their own image.
const DEFAULT_IMAGE = ogCardUrl({
  title: 'The open source control plane for AI inference',
  accent: 'AI inference',
})

interface SeoProps {
  /** Full document <title>. Defaults to the site title. */
  title?: string
  /** Social card title (og:title / twitter:title). Defaults to `title`, then the site default. */
  ogTitle?: string
  description?: string
  /** Absolute canonical URL, also used for og:url. */
  url?: string
  /** Absolute Open Graph / Twitter image URL. Defaults to the generic Modelplane card. */
  image?: string
  /** Image dimensions. Default to the 1200×630 generated card; pass null to omit (e.g. a cover of unknown size). */
  imageWidth?: number | null
  imageHeight?: number | null
  type?: 'website' | 'article'
  noindex?: boolean
  /** Extra head tags (e.g. the article:* meta on blog posts). */
  children?: ReactNode
}

// Single source of truth for a page's title and social-card meta. Rendering one
// <Seo> per page (and none in _document) keeps exactly one set of og/twitter
// tags in the document head.
export default function Seo({
  title,
  ogTitle,
  description,
  url,
  image,
  imageWidth = 1200,
  imageHeight = 630,
  type = 'website',
  noindex = false,
  children,
}: SeoProps) {
  const pageTitle = title ?? DEFAULT_TITLE
  const socialTitle = ogTitle ?? title ?? DEFAULT_OG_TITLE
  const desc = description ?? DEFAULT_DESCRIPTION
  const ogImage = image ?? DEFAULT_IMAGE

  return (
    <Head>
      <title key="title">{pageTitle}</title>
      <meta key="description" name="description" content={desc} />
      {url && <link key="canonical" rel="canonical" href={url} />}
      {noindex && <meta key="robots" name="robots" content="noindex" />}

      <meta key="og:site_name" property="og:site_name" content={SITE_NAME} />
      <meta key="og:title" property="og:title" content={socialTitle} />
      <meta key="og:description" property="og:description" content={desc} />
      <meta key="og:type" property="og:type" content={type} />
      {url && <meta key="og:url" property="og:url" content={url} />}
      <meta key="og:image" property="og:image" content={ogImage} />
      {imageWidth != null && imageHeight != null && (
        <>
          <meta key="og:image:width" property="og:image:width" content={String(imageWidth)} />
          <meta key="og:image:height" property="og:image:height" content={String(imageHeight)} />
        </>
      )}

      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
      <meta key="twitter:title" name="twitter:title" content={socialTitle} />
      <meta key="twitter:description" name="twitter:description" content={desc} />
      <meta key="twitter:image" name="twitter:image" content={ogImage} />

      {children}
    </Head>
  )
}
