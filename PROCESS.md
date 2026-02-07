# PROCESS.md -- From Clone to Deployed Site

This guide covers the complete workflow for creating a new site using this template
with the GSD + Impeccable workflow. Follow the phases in order. Each phase has a
checklist -- complete all items before moving to the next phase.

**Estimated total time:** ~2-4 hours for first deployment (faster on subsequent projects)

## Table of Contents

1. [Phase 1: Environment Setup](#phase-1-environment-setup-30-min) (~30 min)
2. [Phase 2: Brand Discovery + Impeccable Teaching](#phase-2-brand-discovery--impeccable-teaching-1-2-hours) (~1-2 hours)
3. [Phase 3: Initial Build](#phase-3-initial-build) (varies)
4. [Phase 4: Deploy to Vercel](#phase-4-deploy-to-vercel) (~15 min)
5. [Phase 5: Design Critique + Iteration](#phase-5-design-critique--iteration) (~1-2 hours)
6. [Phase 6: Launch Checklist](#phase-6-launch-checklist)
7. [Maintenance](#maintenance)

---

## Phase 1: Environment Setup (~30 min)

### Clone and Install

- [ ] Clone the repo:
  ```bash
  git clone <template-url> <project-name>
  ```
- [ ] Enter the project directory:
  ```bash
  cd <project-name>
  ```
- [ ] Install dependencies:
  ```bash
  npm install
  ```
- [ ] Copy the environment template:
  ```bash
  cp .env.local.example .env.local
  ```

### Create Sanity Project

- [ ] Go to [sanity.io/manage](https://sanity.io/manage)
- [ ] Click **Create new project**
- [ ] Name it (use the project or client name)
- [ ] Select **Create dataset** -- name it `production`
- [ ] Copy the **Project ID** from the project dashboard
- [ ] Navigate to **API** tab -> **Tokens** -> **Add API token**
- [ ] Create a **read** token:
  - Name: `Next.js Read Token`
  - Permissions: **Viewer**
  - Copy the generated token (you will not see it again)
- [ ] Create a **write** token:
  - Name: `Next.js Write Token`
  - Permissions: **Editor**
  - Copy the generated token (you will not see it again)

> **Note:** You need two tokens -- a read token (Viewer) for fetching content and a
> write token (Editor) for Sanity Studio mutations.

### Configure Environment Variables

- [ ] Open `.env.local` in your editor
- [ ] Fill in the values:

| Variable | Value | Public? | Where to Get It |
|----------|-------|---------|-----------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your project ID | Yes | sanity.io/manage -> Project dashboard |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Yes | sanity.io/manage -> Datasets |
| `SANITY_API_READ_TOKEN` | Viewer token | **No** | sanity.io/manage -> API -> Tokens |
| `SANITY_API_WRITE_TOKEN` | Editor token | **No** | sanity.io/manage -> API -> Tokens |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` (for now) | Yes | Set to production URL after deploy |

> **Secret variables** (`SANITY_API_READ_TOKEN`, `SANITY_API_WRITE_TOKEN`) must never
> be committed to version control. They are already in `.gitignore` via `.env.local`.

### Set CORS Origins

- [ ] In Sanity Manage, go to your project -> **API** -> **CORS Origins**
- [ ] Add: `http://localhost:3000`
- [ ] Check the **Allow credentials** checkbox
- [ ] Save

> You will add the production URL after Vercel deployment (Phase 4).

### Verify Local Setup

- [ ] Start the dev server:
  ```bash
  npm run dev
  ```
- [ ] Visit [http://localhost:3000](http://localhost:3000) -- site loads without errors
- [ ] Visit [http://localhost:3000/studio](http://localhost:3000/studio) -- Sanity Studio loads and you can log in
- [ ] Create a test document in Studio -- verify it saves (check the Sanity Manage dashboard)
- [ ] If Studio shows a CORS error: double-check `http://localhost:3000` is in CORS Origins with credentials enabled

---

## Phase 2: Brand Discovery + Impeccable Teaching (~1-2 hours)

### Brand Discovery

- [ ] Define brand attributes: voice, values, personality, target audience
- [ ] Collect design references: 3-5 sites or designs that capture the desired aesthetic
- [ ] Choose color palette: primary, secondary, accent, neutrals
- [ ] Choose typography: heading font + body font
- [ ] Document everything in a brand brief (markdown file or notes -- bullet points and reference links are fine)

### Teach Impeccable

- [ ] Run: `/teach-impeccable`
- [ ] Provide:
  - Brand discovery artifacts (voice, values, personality)
  - Design references (URLs or screenshots)
  - Color palette choices
  - Typography choices
  - Any specific constraints (e.g., "minimalist", "bold and colorful", "editorial")

**When to run `/teach-impeccable`:**
- After completing brand discovery (before building pages)
- When brand direction changes significantly
- When starting a major new section with different aesthetic goals

> Impeccable learns your brand context and uses it to evaluate design quality
> when you later run `/critique` and `/audit`.

### Update Design Tokens

- [ ] Open `app/globals.css`
- [ ] Update the semantic color tokens in the `:root` block with your brand palette (oklch values)
- [ ] Update the `.dark` block if supporting dark mode
- [ ] Open `app/layout.tsx`
- [ ] Replace the `Inter` and `Fraunces` font imports with your chosen brand fonts
- [ ] Keep the CSS variable names the same (`--font-sans`, `--font-heading`)
- [ ] Verify changes propagate: all components should reflect new colors and fonts

---

## Phase 3: Initial Build

### Create Content in Sanity

- [ ] Open Sanity Studio at [http://localhost:3000/studio](http://localhost:3000/studio)
- [ ] Create **Site Settings** (singleton):
  - Site name
  - Site description
  - Navigation links
  - Social links
  - Footer text
- [ ] Create initial page content (homepage hero, about text, contact info)
- [ ] Upload images and configure hotspot/crop where supported
- [ ] **Publish** all content (drafts are not visible on the site)

### Build Core Pages

- [ ] Customize homepage hero section (heading, subheading, CTA)
- [ ] Customize about section content
- [ ] Customize contact section or form
- [ ] Verify all sections render content from Sanity (not hardcoded text)
- [ ] Test responsive behavior at mobile (375px), tablet (768px), and desktop (1280px)

### Copy Patterns (if needed)

- [ ] Review available patterns in [`_patterns/README.md`](./_patterns/README.md)
- [ ] **Blog pattern:** Follow [`_patterns/blog/README.md`](./_patterns/blog/README.md) installation steps
- [ ] **Contact form with email:** Follow [`_patterns/contact-form/README.md`](./_patterns/contact-form/README.md) installation steps
- [ ] After copying: update imports, wire up your Sanity client, install any listed dependencies
- [ ] Test each copied pattern locally before moving on

> Patterns are self-contained -- they include their own schemas, queries, and components.
> Copy the files into your project, then customize freely.

---

## Phase 4: Deploy to Vercel

### Push to GitHub

- [ ] Initialize git (if not already):
  ```bash
  git init && git add . && git commit -m "Initial site"
  ```
- [ ] Create a GitHub repository and push:
  ```bash
  git remote add origin <your-repo-url>
  git push -u origin main
  ```

### Deploy

- [ ] Go to [vercel.com/new](https://vercel.com/new)
- [ ] Import the GitHub repository
- [ ] Add environment variables:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Same as `.env.local` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `SANITY_API_READ_TOKEN` | Your Viewer token |
| `SANITY_API_WRITE_TOKEN` | Your Editor token |
| `NEXT_PUBLIC_SITE_URL` | Your Vercel production URL (e.g., `https://<project>.vercel.app`) |
| `SKIP_ENV_VALIDATION` | `true` (required for build step) |

If using the **contact form** pattern, also add:

| Variable | Value |
|----------|-------|
| `RESEND_API_KEY` | Your Resend API key |
| `CONTACT_FROM_EMAIL` | Verified sender address |
| `CONTACT_TO_EMAIL` | Where to receive submissions |

- [ ] Click **Deploy**
- [ ] Copy the production URL once deployment completes

### Post-Deploy Configuration

- [ ] Add production URL to Sanity CORS origins:
  - [sanity.io/manage](https://sanity.io/manage) -> your project -> **API** -> **CORS Origins**
  - Add: `https://<your-project>.vercel.app`
  - Check **Allow credentials**
- [ ] Verify production site loads correctly
- [ ] Verify Sanity Studio works at `https://<your-project>.vercel.app/studio`
- [ ] Test that content changes in Studio appear on production (after Vercel rebuilds)
- [ ] Update `NEXT_PUBLIC_SITE_URL` in `.env.local` to the production URL for local metadata accuracy

---

## Phase 5: Design Critique + Iteration

### Run Design Critique

- [ ] Run: `/critique`
- [ ] Review feedback on:
  - Brand consistency with taught aesthetic
  - Visual hierarchy and spacing
  - Typography and color usage
  - Accessibility and contrast
  - Responsive design quality
- [ ] Create a list of actionable improvements from the critique
- [ ] Implement improvements
- [ ] Re-run `/critique` to verify improvements landed

**When to run `/critique`:**
- After initial build is complete (all pages have content)
- After major design changes or new sections
- Before client review or launch
- Whenever the design feels "off" but you cannot pinpoint why

### Run Technical Audit

- [ ] Run: `/audit`
- [ ] Review feedback on:
  - Performance (bundle size, image optimization, Core Web Vitals)
  - SEO (meta tags, structured data, sitemap)
  - Accessibility (WCAG compliance, keyboard navigation, screen reader)
  - Best practices (security headers, error handling)
- [ ] Address critical issues first, then warnings

**When to run `/audit`:**
- Before launch (required)
- After adding new features or patterns
- When performance issues are noticed
- Periodic health checks (monthly)

### Visual Testing with Dev-Browser

Dev-browser provides AI-powered visual verification of your UI during development.
Use it to catch layout issues, visual regressions, and responsive breakpoints
that are easy to miss in code review alone.

**Workflow:**

- [ ] Start the dev server: `npm run dev`
- [ ] Use dev-browser to capture the current state of pages
- [ ] Verify layout, spacing, colors, and typography match design intent
- [ ] Test responsive breakpoints:
  - Mobile: 375px
  - Tablet: 768px
  - Desktop: 1280px
- [ ] Check interactive states: hover, focus, active on buttons and links
- [ ] Verify form states: empty, filled, error, success
- [ ] Test loading states and transitions

**When to use dev-browser:**
- After implementing new components or sections
- Before committing visual changes
- When fixing UI bugs (verify the fix, check for regressions)
- During responsive design work
- After changing design tokens (colors, fonts, spacing)

**Complement with manual browser testing:**

- [ ] Test in Chrome, Firefox, Safari
- [ ] Use DevTools device emulation for responsive testing
- [ ] Check color contrast with the Lighthouse accessibility audit
- [ ] Verify keyboard navigation works (Tab, Enter, Escape)

---

## Phase 6: Launch Checklist

### Pre-Launch

- [ ] All content is published in Sanity (no lingering drafts)
- [ ] `/critique` feedback addressed
- [ ] `/audit` issues resolved (critical and warnings)
- [ ] Forms tested end-to-end (submission + email delivery)
- [ ] SEO: meta titles and descriptions set for all pages
- [ ] SEO: OpenGraph images configured
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`
- [ ] Favicon and app icons configured
- [ ] 404 page works and has navigation back to home
- [ ] All links work (no broken internal or external links)
- [ ] Mobile responsiveness verified on actual devices if possible

### Post-Launch

- [ ] Set up Vercel deploy webhooks from Sanity (auto-rebuild on content change):
  - Sanity Manage -> your project -> **API** -> **Webhooks**
  - URL: Vercel deploy hook URL (from Vercel project settings -> Git -> Deploy Hooks)
  - Trigger on: Create, Update, Delete
- [ ] Monitor Vercel analytics for errors and performance
- [ ] Share the URL and gather feedback
- [ ] Iterate based on feedback (return to Phase 5 as needed)

---

## Maintenance

**Content updates:** Editors use Sanity Studio to update content. Changes appear on
the site after a rebuild (automatic if webhooks are configured, or trigger a manual
deploy in Vercel).

**Design updates:**
- Small changes: edit code directly, then run `/critique` to validate
- Major rebrand: re-run `/teach-impeccable` with new brand context, update design
  tokens in `app/globals.css`, update fonts in `app/layout.tsx`

**Adding patterns:** Review the available patterns in `_patterns/README.md` and follow
the pattern-specific README for installation steps.

**Keeping dependencies updated:**
- [ ] Run `npm outdated` to check for updates
- [ ] Update regularly: `npm update`
- [ ] For major version bumps, review changelogs before upgrading
- [ ] Run `/audit` after dependency updates to catch regressions
