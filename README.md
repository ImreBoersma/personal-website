# imreboersma.nl

Personal portfolio of Imre Boersma — software developer at Watch-E, Arnhem. A
content-driven, statically rendered site.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack) + [React 19](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- TypeScript
- [Biome](https://biomejs.dev) for linting & formatting
- Content authored in Markdown, parsed with `gray-matter` + `react-markdown`
- Deployed on [Vercel](https://vercel.com)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

| Script          | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the dev server                 |
| `npm run build` | Production build                     |
| `npm run start` | Serve the production build           |
| `npm run lint`  | Lint & format with Biome (`--write`) |

Requires Node.js 20+.

## Editing content

All copy lives in Markdown under [`content/`](content/) — no code changes
needed to update the site. Each file's YAML frontmatter holds structured fields;
the Markdown body is the free-form text.

```
content/
├── profile.md            # name, hero copy, about, section headings
├── skills.md             # skill groups
├── education.md          # education entries
├── volunteer.md          # volunteer roles
├── experience/*.md       # one file per job (numeric prefix = order)
└── projects/*.md         # one file per project (numeric prefix = order)
```

For example, a project file — omit `link`/`repo` to hide those buttons:

```markdown
---
title: "Vrijwilligersportal voor de Zwarte Cross"
role: "Softwareontwikkelaar"
stack: [React, C#, ASP.NET]
link: "https://example.com" # optional
repo: "https://github.com/..." # optional
---

Description of the project in plain Markdown.
```

Loaders in [`lib/content.ts`](lib/content.ts) read these files at build time and
type the frontmatter.

## Project structure

```
app/         # Next.js App Router (layout, page, global styles)
components/   # UI, grouped atoms / molecules / organisms
lib/          # content loaders
content/      # Markdown content (see above)
public/       # static assets (headshot, favicon set)
```
