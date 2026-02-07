---
phase: 06-seo-production-polish
plan: 02
subsystem: seo
tags: [sitemap, robots-txt, seo, crawlers, next-metadata]

# Dependency graph
requires:
  - phase: 02-sanity-schemas
    provides: page and post schemas with slug and _updatedAt
  - phase: 06-seo-production-polish
    plan: 01
    provides: NEXT_PUBLIC_SITE_URL env variable
provides:
  - Dynamic XML sitemap at /sitemap.xml
  - Robots.txt at /robots.txt
  - SITEMAP_QUERY for all published pages and posts
affects: [production deployment, search engine indexing]

# Tech tracking
tech-stack:
  added: []
  patterns: [Next.js MetadataRoute.Sitemap, MetadataRoute.Robots, client.fetch for build-time data]

key-files:
  created:
    - app/sitemap.ts
    - app/robots.ts
  modified:
    - sanity/lib/queries.ts

decisions:
  - id: D-0602-01
    decision: Use client.fetch instead of sanityFetch for sitemap
    rationale: Sitemap runs at build/ISR time without live preview context; avoids defineLive wrapper issues

metrics:
  duration: ~1 minute
  completed: 2026-02-08
---

# Phase 6 Plan 02: Sitemap and Robots.txt Summary

**One-liner:** Dynamic XML sitemap from Sanity content and robots.txt with studio/api exclusions for search engine crawlers.

## What Was Built

### SITEMAP_QUERY
New GROQ query in `sanity/lib/queries.ts` that fetches all published (non-draft) pages and posts with their slug and `_updatedAt` timestamp for lastModified values.

### Dynamic Sitemap (app/sitemap.ts)
Next.js MetadataRoute.Sitemap implementation that:
- Fetches all pages and posts from Sanity via `client.fetch` (direct, no live preview)
- Filters out draft documents and the "home" slug (homepage gets priority 1 as root URL)
- Maps pages to `/{slug}` with monthly change frequency, priority 0.8
- Maps posts to `/blog/{slug}` with weekly change frequency, priority 0.6
- Adds homepage entry with priority 1
- Uses NEXT_PUBLIC_SITE_URL for absolute URLs

### Robots.txt (app/robots.ts)
Next.js MetadataRoute.Robots implementation that:
- Allows all user agents to crawl `/`
- Disallows `/api/` and `/studio/` paths
- References `/sitemap.xml` for crawler discovery

## Task Commits

| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 3 | Dynamic sitemap generation | 47bfb74 | app/sitemap.ts, sanity/lib/queries.ts |
| 4 | Robots.txt configuration | 8c481f7 | app/robots.ts |

## Deviations from Plan

None - plan executed exactly as written.

## Decisions Made

| ID | Decision | Rationale |
|----|----------|-----------|
| D-0602-01 | Use client.fetch for sitemap instead of sanityFetch | Sitemap runs at build/ISR time; doesn't need live preview wrapper |

## Verification

- `npx tsc --noEmit` passes with zero errors
- All files created as specified

## Self-Check: PASSED
