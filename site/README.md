# site/ — MDX Content Source

This directory contains the MDX content files that the Next.js site reads.

## What is active

- `pages/*.mdx` — All Codex, Toolkit, and AI Standard content pages. These are read by `next-site/src/lib/content.ts` and rendered via MDXRemote.

## What is NOT active

- `_legacy/` — Mintlify platform artifacts from before the March 2026 migration. These files are not read by anything. They are kept for reference only.
  - `docs.json` — Old Mintlify navigation config. Navigation is now hardcoded in `next-site/src/lib/content.ts` → `getNavigation()`.
  - `style.css` — Old Mintlify design system CSS. Styles are now in `next-site/src/styles/globals.css`.
  - `.mintignore`, `api-reference/`, `snippets/`, `images/`, `logo/` — Mintlify build artifacts.

## How content flows

1. You write/edit `.mdx` files in `pages/`
2. `next-site/src/lib/content.ts` reads them using `gray-matter` for frontmatter
3. Next.js renders them via `MDXRemote` inside `DocReader` component
4. Toolkit discipline landing pages (`/toolkit/foundation`, etc.) use `DisciplineLanding.tsx` component, NOT MDX
5. Custom CSS classes used in MDX (`.flow-label`, `.glass-card`, `.key-phrase`, etc.) are styled in `next-site/src/styles/globals.css` under `.mdx-content`

## How to add a new toolkit deep-dive page

1. Create `pages/your-tool-name.mdx` with frontmatter (title, description)
2. Add the slug to `TOOLKIT_SLUGS` in `next-site/src/app/toolkit/[slug]/page.tsx`
3. Add the slug to the relevant group in `getNavigation()` in `next-site/src/lib/content.ts`
4. Push to GitHub → Vercel auto-deploys from `next-site/` root
