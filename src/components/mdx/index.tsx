import type { MDXRemoteProps } from 'next-mdx-remote'
import Video from './Video'
import YouTube from './YouTube'
import Embed from './Embed'
import Image from './Image'
import Callout from './Callout'

// External links open in a new tab; internal/anchor links stay in place.
function A({ href = '', children, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const external = /^https?:\/\//.test(href)
  return (
    <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
      {children}
    </a>
  )
}

// The complete allowlist of components available inside MDX posts. Anything not
// listed here (and not a standard HTML tag) fails the build, keeping PR review safe.
export const mdxComponents: MDXRemoteProps['components'] = {
  Video,
  YouTube,
  Embed,
  Callout,
  img: Image,
  Image,
  a: A,
}
