# modelplane.ai website

Source for the Modelplane website and blog at
[modelplane.ai](https://modelplane.ai), built with Next.js and deployed on
Vercel.

Modelplane itself — the open source control plane for AI inference — lives at
[github.com/modelplaneai/modelplane](https://github.com/modelplaneai/modelplane).

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `pages/` — routes (landing page, `/blog`, `/manifesto`, `/privacy`, feeds, OG images).
- `src/components/` — React components.
- `content/blog/` — blog posts as MDX. See [`content/blog/README.md`](content/blog/README.md) to add one.
- `public/` — static assets (logos, images, icons).

## Checks

```bash
npm run lint            # eslint
npm run validate-posts  # validate blog frontmatter
npm run build           # production build
```

CI runs `validate-posts` and `build` on every pull request.

## Deploy

Deploys automatically on push to `main` via Vercel. Pull requests get preview
deployments.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). To write a blog post, follow
[`content/blog/README.md`](content/blog/README.md).

## License

This repository is licensed under [Creative Commons Attribution 4.0
International (CC-BY-4.0)](LICENSE), the same license Crossplane and Kubernetes
use for their website and documentation.

Modelplane™ is a trademark. The Modelplane name and logos are not covered by
this license; CC-BY-4.0 grants no rights to them.
