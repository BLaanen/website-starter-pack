# Pattern Library

Copy-paste patterns for extending this template. Inspired by
[shadcn/ui](https://ui.shadcn.com/) -- you own the code, not a dependency.

## Why `_patterns/`?

The underscore prefix tells Next.js to **exclude this directory from routing**.
Nothing inside `_patterns/` becomes a page or API route. It exists purely as a
reference library you copy from.

## Available Patterns

| Pattern        | Description                                                         |
| -------------- | ------------------------------------------------------------------- |
| `blog/`        | Full blog system with Sanity CMS, Portable Text, categories, RSS   |
| `contact-form/`| Server Action contact form with Zod validation and email delivery   |

## How to Use a Pattern

1. **Read the pattern README** -- each pattern has its own `README.md` with
   prerequisites, installation steps, and customization notes.
2. **Copy the files** into your project directory (e.g., schemas into `sanity/schemas/`,
   pages into `app/`, components into `components/`).
3. **Install dependencies** -- patterns list their required npm packages.
4. **Configure** -- update imports, wire up your Sanity client, set environment
   variables, and register any Sanity schemas.
5. **Create content** -- add documents in Sanity Studio and verify everything
   renders correctly.

## Design Principles

**Self-contained.** Every pattern includes its own schemas, queries, components,
and pages. Patterns never import from outside their directory (no `@/` imports).
Only npm package imports and relative imports within the pattern.

**Intentionally duplicated.** Patterns may duplicate code that already exists in
the base template. This is deliberate -- it keeps patterns portable so they work
in any project built from this template, regardless of what the base template
has changed.

**Copy, don't install.** Patterns are not published as packages. You copy the
source files into your project, giving you full ownership and the ability to
customize everything without fighting abstractions.

**Documentation-first.** Each pattern README walks you through the full
installation and provides customization guidance. Read it before copying files.
