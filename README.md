# Aylesim portfolio

Portfolio website for Alessandro Miracapillo, built with Next.js.

## Development

```bash
pnpm install
pnpm dev
```

The site is available at `http://localhost:3000`.

## Content

Portfolio data lives in Markdown files under `content/`. Project metadata is
validated and transformed by `src/lib/content.ts`.

`public/content.json` is generated from that source of truth:

```bash
pnpm content:json
pnpm content:json:check
```

## Quality checks

```bash
pnpm check
pnpm build
```
