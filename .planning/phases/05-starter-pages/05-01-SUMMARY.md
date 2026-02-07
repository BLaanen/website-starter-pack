---
phase: 05
plan: 01
subsystem: frontend
tags: [portable-text, homepage, hero, about, sections, groq]

dependency-graph:
  requires: [03-02, 04-01, 04-02]
  provides: [PortableText component, homepage sections, HOMEPAGE_QUERY]
  affects: [05-02, 06-xx]

tech-stack:
  added: ["@portabletext/react"]
  patterns: [server-component sections, portable-text serialization, hardcoded-hero-with-cms-body]

key-files:
  created:
    - components/portable-text.tsx
    - app/(site)/sections/hero.tsx
    - app/(site)/sections/about.tsx
  modified:
    - sanity/lib/queries.ts
    - app/(site)/page.tsx
    - next.config.ts
    - package.json

decisions:
  - id: hero-hardcoded
    description: "Hero section uses hardcoded template defaults (heading fallback, subheading, CTA) since Page schema has no hero-specific fields"
  - id: portable-text-server
    description: "PortableText component is a server component (no 'use client') for optimal performance"
  - id: csp-video-embeds
    description: "Added frame-src CSP directive for YouTube and Vimeo to support videoEmbed block type"

metrics:
  duration: 5m07s
  completed: 2026-02-08
---

# Phase 5 Plan 01: Homepage Sections Summary

**PortableText component with full block type serialization, Hero section with gradient background, About section rendering CMS body content, HOMEPAGE_QUERY fetching page with slug "home"**

## What Was Built

### Task 1: PortableText Component and Dependencies

Created a reusable `PortableText` component at `components/portable-text.tsx` that serializes all Sanity portable text block types:

- **Standard blocks**: `normal`, `h2`, `h3`, `h4`, `blockquote` with Tailwind typography classes
- **Marks**: `strong`, `em`, `code`, `link` (with external link detection for `target="_blank"`)
- **Lists**: `bullet` and `number` with proper spacing
- **Custom types**: All four custom block types from the schema:
  - `imageBlock` - renders via `next/image` with `urlFor()`, includes alt text and optional caption
  - `callout` - info/warning/success tones with dark mode support
  - `ctaButton` - renders as a `Button` component with primary/outline variants
  - `videoEmbed` - YouTube/Vimeo URL transformation to embed URLs, responsive aspect-ratio iframe

Also installed `@portabletext/react` as an explicit dependency and updated the Content Security Policy in `next.config.ts` to add `frame-src` for YouTube and Vimeo domains (required for videoEmbed iframes).

### Task 2: Homepage Sections and Query

**HOMEPAGE_QUERY**: Added to `sanity/lib/queries.ts` - fetches the page document with `slug.current == "home"`, expanding `imageBlock` assets for proper URL generation.

**Hero section** (`app/(site)/sections/hero.tsx`):
- Server component with gradient background (`from-primary/10 via-background to-accent/10`)
- Displays page title from CMS (falls back to "Welcome")
- Hardcoded template subheading and CTA button (users customize in code since Page schema has no hero-specific fields)
- Responsive padding scaling from `py-24` to `lg:py-40`

**About section** (`app/(site)/sections/about.tsx`):
- Server component rendering the Page `body` field via PortableText
- Uses `Container` with `width="narrow"` for readable content width
- Conditionally rendered only when body content exists

**Homepage composition** (`app/(site)/page.tsx`):
- Async server component using `sanityFetch` with `HOMEPAGE_QUERY`
- Renders Hero (always) and About (when body content exists)
- Placeholder comment for Contact section (05-02)

## Task Commits

| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 1 | Install deps and create PortableText component | `1752399` | `components/portable-text.tsx`, `next.config.ts`, `package.json` |
| 2 | Create Hero and About sections with homepage query | `29b6257` | `app/(site)/sections/hero.tsx`, `app/(site)/sections/about.tsx`, `sanity/lib/queries.ts`, `app/(site)/page.tsx` |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Updated CSP for video embed iframes**

- **Found during:** Task 1
- **Issue:** The Content Security Policy's `default-src 'self'` would block YouTube and Vimeo iframes used by the `videoEmbed` block type
- **Fix:** Added `frame-src 'self' https://www.youtube.com https://player.vimeo.com` to the CSP directives in `next.config.ts`
- **Files modified:** `next.config.ts`
- **Commit:** `1752399`

## Build Verification Note

TypeScript compilation (`tsc --noEmit`) passes clean. The `npm run build` fails during static generation due to a **pre-existing** Sanity API authentication error (`Unauthorized - Session not found`) that originates from the site layout's `SITE_SETTINGS_QUERY` call (added in phase 04). This is not caused by the homepage changes and occurs even without them. The project requires valid Sanity API credentials in `.env.local` for successful builds.

## Decisions Made

1. **Hero uses hardcoded defaults**: Since the Page schema only has `title` and `body` (no hero-specific fields like heroHeading, heroSubheading, heroCTA, heroImage), the Hero section uses the page title with hardcoded subheading and CTA. This is appropriate for a boilerplate template.

2. **PortableText is a server component**: No `'use client'` directive since all rendering is static. The component uses `next/image` for optimized image delivery.

3. **CSP updated for video embeds**: Added `frame-src` directive to support the videoEmbed block type without compromising security.

## Next Phase Readiness

- Contact section placeholder exists in homepage for 05-02
- PortableText component is ready for reuse in blog post pages and dynamic pages
- HOMEPAGE_QUERY pattern established for other page queries

## Self-Check: PASSED
