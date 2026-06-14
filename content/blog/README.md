# Contributing a blog post

The Modelplane blog is open source. Posts live in this folder and are published
through pull requests. This guide covers everything you need to write one.

## 1. Create your post

Each post is a folder named `YYYY-MM-DD-your-slug/` containing an `index.mdx`
file. The date prefix is stripped to form the public URL, so
`content/blog/2026-06-14-welcome/` is served at `/blog/welcome`.

```
content/blog/
  2026-06-14-welcome/
    index.mdx
```

The fastest start is to copy the `2026-06-14-welcome` post and edit it.

## 2. Frontmatter

Every post begins with YAML frontmatter:

```yaml
---
title: "Operating any model on any GPU"
description: "One sentence shown in listings, search results, and social cards."
date: "2026-06-14"            # ISO date; controls ordering
authors:
  - name: "Jane Doe"
    title: "Maintainer"        # optional
    url: "https://github.com/janedoe"   # optional
    avatar: "/blog/your-slug/jane.png"  # optional
tags: ["control-plane", "inference"]
cover: "/blog/your-slug/cover.png"      # optional; used in listing + social card
draft: false                            # true = hidden in production
pinned: false                           # true = floats to the top of /blog
---
```

- `title`, `description`, and `date` are required.
- `draft: true` posts render locally and on preview deployments, but are hidden
  from the production site, the RSS feed, and the sitemap.
- `pinned: true` floats the post to the top of the blog listing (newest pinned
  first) with a "Pinned" badge. Ordering elsewhere (RSS, newer/older nav) stays
  chronological. Use sparingly for announcements you want to keep at the top.
- Reading time is computed automatically; don't set it.

## 3. Images and video

Next.js only serves files from `public/`, so **put your assets under
`public/blog/<your-slug>/`** and reference them with absolute paths:

```
public/blog/your-slug/cover.png
public/blog/your-slug/diagram.png
public/blog/your-slug/demo.mp4
```

## 4. What you can write

Posts are MDX (Markdown + a small set of components). All standard Markdown
works, plus GitHub-flavored tables, task lists, and strikethrough. Code blocks
are syntax highlighted automatically and support a `title="..."` and line
highlighting with `{1,3-5}`.

The available components are:

| Component | Usage |
| --- | --- |
| Image | `![alt text](/blog/your-slug/image.png)` (alt becomes the caption) |
| `<Video>` | `<Video src="/blog/your-slug/demo.mp4" poster="/blog/your-slug/poster.png" caption="Optional caption" />` |
| `<YouTube>` | `<YouTube id="VIDEO_ID" title="Optional title" />` |
| `<Embed>` | `<Embed src="https://..." title="Optional title" />` for non-YouTube iframes |
| `<Callout>` | `<Callout type="info\|tip\|warn" title="Optional">...</Callout>` |

Any component not listed here will fail the build. This keeps every post safe to
review and merge.

## 5. Preview locally

```bash
cd website
npm install
npm run dev
```

Then open `http://localhost:3000/blog/your-slug`.

## 6. Open a pull request

Push your branch and open a PR. Vercel builds a preview deployment automatically;
the PR will get a unique URL where maintainers can read your rendered post at
`<preview-url>/blog/your-slug` before merging. The CI check also runs a full
build and validates your frontmatter. Once approved and merged, your post is
live.
