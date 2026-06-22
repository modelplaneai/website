# Contributing to the Modelplane website

This repository is the source for the Modelplane website and blog at
[modelplane.ai](https://modelplane.ai). Contributions — fixes, improvements, and
blog posts — are welcome.

For the Modelplane project itself, see
[github.com/modelplaneai/modelplane](https://github.com/modelplaneai/modelplane).

## Getting set up

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project layout

- `pages/` — routes (landing page, `/blog`, `/manifesto`, `/privacy`, feeds, OG images).
- `src/components/` — React components.
- `content/blog/` — blog posts as MDX.
- `public/` — static assets.

## Writing a blog post

Posts live in `content/blog/` and are published through pull requests. Follow
[`content/blog/README.md`](content/blog/README.md), which covers the folder
layout, frontmatter, and assets.

## Before you open a pull request

Run these locally; CI runs the last two on every pull request:

```bash
npm run lint
npm run validate-posts   # if you touched blog content
npm run build
```

Opening a pull request creates a Vercel preview deployment you can use to review
the change in a real environment.

## Assets

Only add images, icons, fonts, or logos that you have the right to redistribute
under this repository's license. Do not commit proprietary fonts or brand
assets. Third-party logos used in the site are referenced for identification
only.

## Commits and pull requests

- Write commit subjects in the imperative mood, naming what the change does.
- Lead the body with the problem, then the change and why it is right.
- Sign off every commit with `git commit -s`, certifying you have the right to
  submit the work under the project's license
  ([Developer Certificate of Origin](https://developercertificate.org/)).

## License of contributions

By contributing, you agree that your contributions are licensed under
[CC-BY-4.0](LICENSE). The Modelplane name and logos are trademarks and are not
granted by that license.
