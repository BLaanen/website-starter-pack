---
phase: 07-pattern-library-process
plan: 03
subsystem: docs
tags: [process, workflow, checklist, sanity, vercel, impeccable, dev-browser]

# Dependency graph
requires:
  - phase: 07-pattern-library-process
    provides: Pattern library with blog and contact-form patterns (07-01, 07-02)
  - phase: 01-project-foundation
    provides: Environment validation with Zod, Sanity client config
  - phase: 06-seo-production-polish
    provides: Sitemap, robots.txt, metadata infrastructure
provides:
  - "PROCESS.md: Complete clone-to-deployed-site workflow checklist"
  - "Environment setup guide with exact Sanity project creation steps"
  - "Impeccable integration documentation (teach, critique, audit)"
  - "Dev-browser visual testing workflow with when-to-use guidance"
  - "Pattern copy-in workflow referenced in build phase"
affects: []

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Checkbox-format workflow documentation for step-by-step execution"

key-files:
  created:
    - PROCESS.md
  modified: []

key-decisions:
  - "Two separate API tokens documented (read + write) matching actual env.ts schema"
  - "SKIP_ENV_VALIDATION=true included in Vercel deploy env vars for build step"
  - "Six-phase workflow structure: Setup, Brand, Build, Deploy, Critique, Launch + Maintenance"

patterns-established:
  - "Process documentation: checklist format with concrete commands and URLs, no prose-heavy sections"

# Metrics
duration: 3min
completed: 2026-02-08
---

# Phase 7 Plan 3: PROCESS.md Workflow Documentation Summary

**Complete clone-to-deployed-site checklist covering environment setup, brand discovery with Impeccable teaching, pattern copy-in, Vercel deployment, design critique iteration, and launch readiness**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-07T23:53:12Z
- **Completed:** 2026-02-07T23:55:44Z
- **Tasks:** 1
- **Files created:** 1

## Accomplishments

- Created PROCESS.md with 348-line comprehensive workflow checklist (6 phases + maintenance)
- Documented exact Sanity project creation, API token setup, env var configuration, and CORS origins
- Integrated Impeccable workflow with clear when-to-use guidance for /teach-impeccable, /critique, and /audit
- Documented dev-browser visual testing workflow with responsive breakpoints and when-to-use triggers
- Referenced pattern library copy-in workflow with links to _patterns/ READMEs

## Task Commits

Each task was committed atomically:

1. **Task 1: Create PROCESS.md** - `52b6146` (feat)

## Files Created/Modified

- `PROCESS.md` - Complete workflow checklist from clone to deployed site (348 lines)

## Decisions Made

- Documented two separate API tokens (SANITY_API_READ_TOKEN + SANITY_API_WRITE_TOKEN) matching the actual env.ts Zod schema, rather than a single generic token
- Included SKIP_ENV_VALIDATION=true in the Vercel deployment env var table since env.ts requires it during build config evaluation
- Structured as 6 phases + maintenance to match the natural workflow progression

## Deviations from Plan

None -- plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None -- no external service configuration required.

## Next Phase Readiness

- All Phase 7 plans are now complete (07-01 patterns, 07-02 contact form, 07-03 process docs)
- Project is feature-complete: template + patterns + process documentation
- Ready for end-to-end testing by cloning fresh and following PROCESS.md

## Self-Check: PASSED

---
*Phase: 07-pattern-library-process*
*Completed: 2026-02-08*
