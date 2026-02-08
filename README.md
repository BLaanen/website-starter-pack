# Website Starter Pack

A ready-to-go starter template for building professional websites with **Next.js**, **Sanity CMS**, and **Vercel**. Clone it, configure it, and have a deployed site with a working CMS in under an hour.

**Tech stack:** Next.js 16 / React 19 / Sanity v5 / Tailwind CSS 4 / Vercel

## What You Get

- A working Next.js site with a header, footer, homepage, and 404 page
- Sanity Studio embedded at `/studio` for content editing
- A design system with semantic color tokens (oklch), fluid typography, and responsive spacing
- shadcn/ui components (Button, Input, Card, Dialog, Sheet, etc.) ready to customize
- Phosphor Icons (6,000+ icons, 6 weights)
- SEO foundations: metadata, OpenGraph, sitemap, robots.txt
- Security headers and image optimization via Vercel
- A pattern library with copy-paste blog and contact form features
- A step-by-step process guide ([PROCESS.md](./PROCESS.md)) for going from clone to launched site

## Prerequisites

Before you start, make sure you have these installed on your computer:

1. **Node.js** (version 20 or higher)
   - Check if you have it: open your terminal and run `node -v`
   - If not installed: download from [nodejs.org](https://nodejs.org/) (pick the LTS version)

2. **npm** (comes with Node.js)
   - Check: `npm -v`

3. **Git**
   - Check: `git --version`
   - If not installed: download from [git-scm.com](https://git-scm.com/)

4. **A code editor** -- [VS Code](https://code.visualstudio.com/) or [Cursor](https://www.cursor.com/) recommended

5. **Accounts you'll need** (all free to start):
   - [GitHub](https://github.com/) -- to host your code
   - [Sanity.io](https://www.sanity.io/) -- for the content management system
   - [Vercel](https://vercel.com/) -- to deploy and host your site

## Quick Start

### 1. Clone the template

```bash
git clone https://github.com/BLaanen/website-starter-pack.git my-website
cd my-website
```

Replace `my-website` with whatever you want to name your project.

### 2. Install dependencies

```bash
npm install
```

This downloads all the packages the project needs. It may take a minute or two.

### 3. Create a Sanity project

You need a Sanity project to store your website's content (text, images, etc.).

1. Go to [sanity.io/manage](https://www.sanity.io/manage) and sign in (or create an account)
2. Click **Create new project**
3. Give it a name (e.g., "My Website")
4. Create a dataset called `production`
5. Copy your **Project ID** from the project dashboard (you'll need this next)

Now create two API tokens:

6. In your project, go to **API** > **Tokens** > **Add API token**
7. Create a **read token**:
   - Name: `Next.js Read Token`
   - Permissions: **Viewer**
   - Click create, then **copy the token immediately** (you won't be able to see it again)
8. Create a **write token**:
   - Name: `Next.js Write Token`
   - Permissions: **Editor**
   - Click create, then **copy the token immediately**

### 4. Set up environment variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` in your editor and fill in your values:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token_here
SANITY_API_WRITE_TOKEN=your_write_token_here
```

> **Important:** The `.env.local` file contains secret tokens. It is already in `.gitignore` so it won't be uploaded to GitHub. Never share these tokens publicly.

### 5. Set up CORS (so the CMS can talk to your site)

1. In [sanity.io/manage](https://www.sanity.io/manage), go to your project
2. Navigate to **API** > **CORS Origins**
3. Add `http://localhost:3000`
4. Check the **Allow credentials** checkbox
5. Save

### 6. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the site.

Open [http://localhost:3000/studio](http://localhost:3000/studio) to access the Sanity content editor.

If everything loads without errors, you're set up.

## Using Claude Code to Build Your Site

This template is designed to work with [Claude Code](https://docs.anthropic.com/en/docs/claude-code) and a set of skills that dramatically speed up building a professional website:

### GSD (Get Shit Done)

GSD is a workflow system for Claude Code that breaks complex projects into manageable phases and tracks your progress. Use it to:

- Plan and execute the full site-building process step by step
- Keep track of where you are if you take a break and come back later
- Follow the process in [PROCESS.md](./PROCESS.md) with Claude guiding you through each phase

**To start a new site project with GSD:**
```
/gsd:new-project
```

**To resume where you left off:**
```
/gsd:resume-work
```

### Impeccable (Design Quality Skills)

Impeccable is a set of Claude Code skills for achieving professional-level design. Before you start building pages, use it to define what your website looks like:

- **`/impeccable:teach-impeccable`** -- Run this first. Tell Claude about your brand: colors, fonts, personality, target audience, and design references. This context is used for all future design evaluations.

- **`/impeccable:critique`** -- After building pages, run this to get design feedback: visual hierarchy, spacing, typography, color usage, brand consistency, and accessibility.

- **`/impeccable:audit`** -- Run a technical audit covering performance, SEO, accessibility, and best practices.

- **`/impeccable:polish`** -- Final quality pass that catches alignment, spacing, and consistency issues.

### UI/UX Pro Max (Design Direction & Palette Selection)

Don't know what colors or fonts to use yet? [UI/UX Pro Max](https://skills.sh/nextlevelbuilder/ui-ux-pro-max-skill/ui-ux-pro-max) is a Claude Code skill with 97 curated color palettes and 57 font pairings organized by industry and product type. It helps you pick a design direction before you start building:

- Browse color palettes by category (SaaS, healthcare, creative, fintech, etc.)
- Get curated font pairings with Google Fonts alternatives
- Generate a complete design system with style, accessibility, and layout guidelines
- Includes UX anti-pattern warnings to avoid common mistakes

**Use UI/UX Pro Max when:** You're starting from scratch and need help choosing colors, fonts, and a visual style.

**Then use Impeccable when:** You've made your choices and want to teach Claude your brand context so it can evaluate your design quality as you build.

### Recommended Workflow

1. **Set up** -- Clone, install, create Sanity project, configure env vars (steps above)
2. **Pick your design direction** -- If you don't have brand colors and fonts yet, use UI/UX Pro Max to browse palettes and font pairings. If you already know your brand, skip to step 3.
3. **Teach your brand** -- Run `/impeccable:teach-impeccable` and provide your brand choices (colors, fonts, mood, references). Or use `/gsd:new-project` and let GSD walk you through brand discovery as part of the process.
4. **Update design tokens** -- Change the colors in `app/globals.css` and the fonts in `app/layout.tsx` to match your brand
5. **Build your pages** -- Create content in Sanity Studio, customize components, copy patterns from `_patterns/` as needed
6. **Critique and iterate** -- Run `/impeccable:critique` to get design feedback, implement improvements, repeat
7. **Deploy** -- Push to GitHub, import into Vercel, add env vars, deploy
8. **Final audit** -- Run `/impeccable:audit` before launch to catch any issues

See [PROCESS.md](./PROCESS.md) for the full detailed checklist.

## Project Structure

```
my-website/
├── app/
│   ├── (site)/          # Your website pages (homepage, 404, etc.)
│   ├── (studio)/        # Sanity Studio (CMS editor at /studio)
│   ├── actions/         # Server actions (e.g., contact form submission)
│   ├── globals.css      # Design tokens: colors, fonts, spacing
│   ├── layout.tsx       # Root layout with font loading
│   ├── robots.ts        # SEO robots.txt generation
│   └── sitemap.ts       # SEO sitemap generation
├── components/
│   ├── Header.tsx       # Site header with responsive navigation
│   ├── Footer.tsx       # Site footer with social links
│   ├── portable-text.tsx # Rich text rendering for Sanity content
│   ├── primitives/      # Layout primitives (Container)
│   └── ui/              # shadcn/ui components (Button, Card, etc.)
├── lib/
│   ├── env.ts           # Environment variable validation
│   ├── utils.ts         # Utility functions (cn() for class merging)
│   └── validations/     # Zod schemas for form validation
├── sanity/
│   ├── client.ts        # Sanity client configuration
│   ├── schemas/         # Content schemas (define your content structure)
│   ├── lib/
│   │   ├── queries.ts   # GROQ queries for fetching content
│   │   ├── image.ts     # Image URL builder
│   │   └── metadata.ts  # SEO metadata helpers
│   └── live.ts          # Real-time preview configuration
├── _patterns/           # Copy-paste pattern library
│   ├── blog/            # Full blog with categories, RSS, Portable Text
│   └── contact-form/    # Contact form with Zod validation and email
├── PROCESS.md           # Full step-by-step guide from clone to launch
├── .env.local.example   # Environment variable template
└── vercel.json          # Vercel deployment configuration
```

## Patterns

The `_patterns/` directory contains self-contained features you can copy into your project. Each pattern has its own README with installation steps.

| Pattern | What it does |
|---------|-------------|
| `blog/` | Full blog system: posts, categories, authors, Portable Text rendering, RSS feed |
| `contact-form/` | Contact form with client + server validation (Zod), server action, email delivery (Resend) |

To use a pattern, read its README, copy the files into the appropriate directories, install any extra dependencies, and wire up your Sanity client. See [_patterns/README.md](./_patterns/README.md) for details.

## Deploying to Vercel

1. Push your project to a GitHub repository
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo
3. Add these environment variables in Vercel:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `SANITY_API_READ_TOKEN` | Your Viewer token |
| `SANITY_API_WRITE_TOKEN` | Your Editor token |
| `NEXT_PUBLIC_SITE_URL` | Your Vercel URL (e.g., `https://my-website.vercel.app`) |
| `SKIP_ENV_VALIDATION` | `true` |

4. Click **Deploy**
5. After deployment, add your production URL to Sanity CORS origins (same steps as local setup, but with your `https://...vercel.app` URL)

See [PROCESS.md](./PROCESS.md) Phase 4 for the complete deployment walkthrough.

## Common Issues

**Sanity Studio shows a CORS error:**
Make sure you added `http://localhost:3000` (or your production URL) to CORS origins in [sanity.io/manage](https://www.sanity.io/manage) with **Allow credentials** checked.

**Content changes don't appear on the site:**
Make sure you clicked **Publish** in Sanity Studio (drafts are not visible on the site). For production, set up a deploy webhook so Vercel rebuilds automatically when content changes -- see [PROCESS.md](./PROCESS.md) Phase 6.

**Environment validation errors on build:**
Add `SKIP_ENV_VALIDATION=true` to your Vercel environment variables. This is needed because server-side tokens aren't available during the Next.js config evaluation step.

**`npm run typegen` fails:**
This command requires real Sanity credentials to generate TypeScript types from your schemas. Make sure your `.env.local` has valid tokens, and that the Sanity project has at least one published document.

## Available Scripts

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start the development server (with Turbopack) |
| `npm run build` | Build for production |
| `npm run start` | Run the production build locally |
| `npm run lint` | Check for code issues |
| `npm run lint:fix` | Auto-fix code issues |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check formatting without changing files |
| `npm run typegen` | Generate TypeScript types from Sanity schemas |

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Vercel Documentation](https://vercel.com/docs)
- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
