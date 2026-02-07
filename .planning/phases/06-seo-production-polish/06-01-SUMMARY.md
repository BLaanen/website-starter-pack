---
phase: 06-seo-production-polish
plan: 01
subsystem: seo
tags: [metadata, opengraph, twitter-cards, next-metadata, sanity]

# Dependency graph
requires:
  - phase: 02-sanity-schemas
    provides: siteSettings schema with siteName, siteDescription, seo object
  - phase: 05-starter-pages
    provides: homepage route at app/(site)/page.tsx
provides:
  - NEXT_PUBLIC_SITE_URL env variable with validation
  - metadataBase in root layout for absolute URL resolution
  - PAGE_METADATA_QUERY for per-page SEO data fetching
  - generatePageMetadata helper for reusable metadata generation
  - Homepage dynamic metadata from Sanity siteSettings
affects: [06-02, future page routes needing metadata]

# Tech tracking
tech-stack:
  added: []
  patterns: [generatePageMetadata helper pattern, metadataBase with env URL]

key-files:
  created:
    - sanity/lib/metadata.ts
  modified:
    - lib/env.ts
    - app/layout.tsx
    - sanity/lib/queries.ts
    - app/(site)/page.tsx
    - .env.local.example

decisions:
  - id: D-0601-01
    decision: Use generatePageMetadata helper to centralize SEO metadata generation across all page types
    rationale: Avoids duplicating Sanity fetch + metadata assembly logic in every page route

metrics:
  duration: ~3 minutes
  completed: 2026-02-08
---

# Phase 6 Plan 01: SEO Metadata Infrastructure Summary

**One-liner:** Centralized metadata helper with env-driven metadataBase and per-page OpenGraph/Twitter card generation from Sanity.

## What Was Built

### NEXT_PUBLIC_SITE_URL Environment Variable
Added optional URL env var to `lib/env.ts` publicSchema with `http://localhost:3000` default. Updated both parse branches (skip-validation and standard) and documented in `.env.local.example`.

### Root Layout Metadata Enhancement
Updated `app/layout.tsx` metadata export with:
- `metadataBase` using NEXT_PUBLIC_SITE_URL for absolute OG image URLs
- Title template (`%s | Website`) for child page title composition

### PAGE_METADATA_QUERY
New GROQ query in `sanity/lib/queries.ts` that fetches both page-level SEO fields (metaTitle, metaDescription, ogImage with asset dereference) and siteSettings (siteName, siteDescription) in a single query for fallback values.

### generatePageMetadata Helper
Created `sanity/lib/metadata.ts` with a reusable async function that:
- Accepts `type` (page/post/siteSettings) and optional `slug`
- For siteSettings type: fetches site-level metadata for homepage
- For page type: fetches page SEO + settings, generates title/description with fallbacks
- Builds OpenGraph and Twitter card metadata with 1200x630 OG image when available

### Homepage Metadata
Added `generateMetadata` export to `app/(site)/page.tsx` using the siteSettings type, pulling siteName and siteDescription from Sanity for the homepage title and description.

## Task Commits

| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 1 | SEO metadata infrastructure and helper | 4671dfe | sanity/lib/metadata.ts, lib/env.ts, app/layout.tsx, sanity/lib/queries.ts |
| 2 | Homepage generateMetadata | 281446d | app/(site)/page.tsx |

## Deviations from Plan

None - plan executed exactly as written.

## Decisions Made

| ID | Decision | Rationale |
|----|----------|-----------|
| D-0601-01 | Centralized generatePageMetadata helper pattern | Avoids duplicating Sanity fetch + metadata assembly in every route |

## Verification

- `npx tsc --noEmit` passes with zero errors
- All files created and modified as specified

## Self-Check: PASSED
