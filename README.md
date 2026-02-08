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

---

## Prerequisites

This section walks you through everything you need before cloning the template. If you've never used a terminal before, don't worry -- every step tells you exactly what to type and what to expect back.

### Opening a terminal

- **Mac:** Press `Cmd + Space`, type `Terminal`, press Enter
- **Windows:** Press `Win + R`, type `cmd`, press Enter (or search for "Terminal" in the Start menu)

You'll see a blinking cursor waiting for input. This is where you'll type all the commands below.

### Step 1: Create your accounts

Create these three accounts in this order. Signing up with GitHub for all of them keeps everything linked under one login.

1. **GitHub** -- go to [github.com](https://github.com/) and create a free account. This is where your website's code will live.
2. **Vercel** -- go to [vercel.com](https://vercel.com/) and click **Sign Up**, then choose **Continue with GitHub**. This is what hosts and deploys your website.
3. **Sanity** -- go to [sanity.io](https://www.sanity.io/) and click **Get started**, then choose **Continue with GitHub**. This is the content management system (CMS) where you'll edit your site's text, images, etc.

### Step 2: Install developer tools

#### Git

Git tracks changes to your code and lets you push it to GitHub.

Check if you already have it:
```bash
git --version
```

**If you see something like** `git version 2.39.0` -- you're good, skip to the next tool.

**If you see** `command not found` or get a prompt to install developer tools -- install it:

- **Mac:** A popup may appear asking to install Xcode Command Line Tools. Click **Install**. Or run:
  ```bash
  xcode-select --install
  ```
- **Windows:** Download from [git-scm.com](https://git-scm.com/) and run the installer with default settings.

After installing, close and reopen your terminal, then run `git --version` again to confirm.

#### Node.js

Node.js runs the JavaScript that powers the website. npm (Node Package Manager) comes bundled with it.

Check if you already have it:
```bash
node -v
```

**If you see** `v20.x.x` or higher (e.g., `v22.5.1`) -- you're good.

**If you see** `command not found` or a version lower than 20 -- install it:

- **Mac (with Homebrew):**
  ```bash
  brew install node
  ```
  Don't have Homebrew? Install it first with:
  ```bash
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  ```
  Then run `brew install node`.

- **Mac or Windows (without Homebrew):** Download the LTS version from [nodejs.org](https://nodejs.org/) and run the installer.

Verify both installed:
```bash
node -v
npm -v
```

You should see version numbers for both (e.g., `v22.5.1` and `10.8.2`).

#### Claude Code

Claude Code is the AI assistant that will help you build your site. It runs in your terminal.

Check if you already have it:
```bash
claude --version
```

**If you see** a version number -- you're good.

**If you see** `command not found` -- install it:
```bash
npm install -g @anthropic-ai/claude-code
```

> You'll need an [Anthropic account](https://console.anthropic.com/) with API access, or a Claude Pro/Max subscription, to use Claude Code. See the [Claude Code docs](https://docs.anthropic.com/en/docs/claude-code) for setup details.

### Step 3: Install Claude Code skills

These skills are separate from Claude Code itself and need to be installed once. They give Claude specialized abilities for project management and design.

#### GSD (Get Shit Done)

GSD is a workflow system that breaks your project into phases, tracks progress, and picks up where you left off between sessions.

```bash
npx get-shit-done-cc --claude --global
```

Verify it worked by opening Claude Code and running `/gsd:help`.

To update GSD later:
```bash
npx get-shit-done-cc@latest --claude --global
```

> [GSD documentation and source code](https://github.com/glittercowboy/get-shit-done)

#### Impeccable (Design Quality)

Impeccable teaches Claude how to evaluate and improve your design quality -- typography, color, layout, spacing, accessibility, and more.

Install via the Claude Code plugin marketplace:
```
/plugin marketplace add pbakaus/impeccable
```

Then run `/plugin menu` to complete the setup.

> [Impeccable documentation](https://impeccable.style) | [Source code](https://github.com/pbakaus/impeccable)

#### UI/UX Pro Max (optional -- color & font selection)

If you don't already have brand colors and fonts picked out, this skill has 97 curated color palettes and 57 font pairings organized by industry type.

```
npx skills add https://github.com/nextlevelbuilder/ui-ux-pro-max-skill --skill ui-ux-pro-max
```

> [UI/UX Pro Max on skills.sh](https://skills.sh/nextlevelbuilder/ui-ux-pro-max-skill/ui-ux-pro-max)

### Step 4: Install a code editor

You'll need a code editor to view and edit your project files. Either of these works great:

- [Cursor](https://www.cursor.com/) -- AI-native code editor (recommended if you're new)
- [VS Code](https://code.visualstudio.com/) -- the most popular code editor

Download one, install it, and open it. You can always open your project folder from the editor later.

---

## Quick Start

### 1. Choose where to put your project

In your terminal, navigate to the folder where you want your project to live. For example, your home folder:

```bash
cd ~
```

Or a specific folder like Documents:

```bash
cd ~/Documents
```

> **Tip:** The project will be created as a new folder inside wherever you are, so you don't need to create a folder first.

### 2. Clone the template

```bash
git clone https://github.com/BLaanen/website-starter-pack.git my-website
cd my-website
```

Replace `my-website` with whatever you want to name your project (no spaces -- use dashes instead).

### 3. Install dependencies

```bash
npm install
```

This downloads all the packages the project needs. It may take a minute or two. You'll see a progress bar and then a summary when it's done.

### 4. Create a Sanity project

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

### 5. Set up environment variables

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

### 6. Set up CORS (so the CMS can talk to your site)

1. In [sanity.io/manage](https://www.sanity.io/manage), go to your project
2. Navigate to **API** > **CORS Origins**
3. Add `http://localhost:3000`
4. Check the **Allow credentials** checkbox
5. Save

### 7. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the site.

Open [http://localhost:3000/studio](http://localhost:3000/studio) to access the Sanity content editor.

If everything loads without errors, you're set up.

### 8. Start Claude Code

Open a **new terminal tab** (keep the dev server running in the first one), navigate to your project folder, and start Claude Code in skip-permissions mode so it can work faster without asking for approval on every action:

```bash
cd ~/my-website
claude --dangerously-skip-permissions
```

> **Note:** `--dangerously-skip-permissions` lets Claude run commands, read/write files, and execute tools without prompting you each time. This is safe for local development on a new project. If you prefer to approve each action, just run `claude` instead.

Now you're ready to start building. See the next section for the recommended workflow.

---

## Building Your Site with Claude Code

This template is designed to work with [Claude Code](https://docs.anthropic.com/en/docs/claude-code) and a set of skills that dramatically speed up building a professional website.

### GSD (Get Shit Done)

GSD breaks your project into manageable phases and tracks your progress. Use it to:

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

Impeccable gives Claude the ability to evaluate and improve your design. Use it to define what your website looks like and then iterate on quality:

- **`/impeccable:teach-impeccable`** -- Run this first. Tell Claude about your brand: colors, fonts, personality, target audience, and design references. This context is used for all future design evaluations.

- **`/impeccable:critique`** -- After building pages, run this to get design feedback: visual hierarchy, spacing, typography, color usage, brand consistency, and accessibility.

- **`/impeccable:audit`** -- Run a technical audit covering performance, SEO, accessibility, and best practices.

- **`/impeccable:polish`** -- Final quality pass that catches alignment, spacing, and consistency issues.

### UI/UX Pro Max (Design Direction & Palette Selection)

Don't know what colors or fonts to use yet? [UI/UX Pro Max](https://skills.sh/nextlevelbuilder/ui-ux-pro-max-skill/ui-ux-pro-max) has 97 curated color palettes and 57 font pairings organized by industry and product type. It helps you pick a design direction before you start building:

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

---

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
- [GSD Documentation](https://github.com/glittercowboy/get-shit-done)
- [Impeccable Documentation](https://impeccable.style)
