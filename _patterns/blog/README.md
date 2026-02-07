# Blog Pattern

Self-contained blog system powered by Sanity CMS with Portable Text rendering,
category filtering, and RSS feeds. Copy into any project built from this
template.

## Features

- Post listing page with responsive grid layout
- Post detail page with rich text body (Portable Text)
- Category filtering with dedicated category pages
- RSS feed (with guidance for Atom and JSON feed formats)
- Static generation via `generateStaticParams`
- SEO metadata on every page
- Author attribution and bios

## Prerequisites

Your project must already have a Sanity client configured (the base template
includes one). The following npm packages are required by this pattern:

| Package                | Purpose                          |
| ---------------------- | -------------------------------- |
| `@portabletext/react`  | Renders Sanity Portable Text     |
| `feed`                 | Generates RSS/Atom/JSON feeds    |

## Installation

### 1. Install dependencies

```bash
npm install @portabletext/react feed
```

### 2. Copy Sanity schemas

```bash
cp _patterns/blog/sanity-schemas/* src/sanity/schemas/documents/
```

Or wherever your project keeps its Sanity document schemas.

### 3. Register schemas in Sanity config

Add the blog schemas to your schema types array:

```typescript
// src/sanity/schemas/index.ts (or your schema config file)
import blogPost from './documents/post';
import blogCategory from './documents/category';
import blogAuthor from './documents/author';

export const schemaTypes = [
  // ...existing schemas
  blogPost,
  blogCategory,
  blogAuthor,
];
```

> If your project already defines `post`, `category`, or `author` schemas, merge
> the fields rather than duplicating the types.

### 4. Copy queries

```bash
cp _patterns/blog/lib/sanity-queries.ts src/lib/
```

Or merge the query constants into your existing queries file.

### 5. Copy components

```bash
cp _patterns/blog/components/portable-text.tsx src/components/
```

### 6. Copy pages

```bash
cp -r _patterns/blog/app/blog src/app/
```

### 7. Wire up your Sanity client

Each page and route file contains `TODO` comments showing where to import your
Sanity client and replace placeholder fetch calls. Search for `TODO` in the
copied files:

```bash
grep -r "TODO" src/app/blog/ src/components/portable-text.tsx src/lib/sanity-queries.ts
```

### 8. Configure the RSS feed

In `src/app/blog/feed.xml/route.ts`, update:

- `SITE_URL` -- your production domain
- `SITE_TITLE` -- your blog/site name
- `SITE_DESCRIPTION` -- a short description for the feed

## Customization

### Styling

All components use Tailwind CSS classes. Key files to customize:

- `components/portable-text.tsx` -- rich text block styles
- `app/blog/page.tsx` -- listing layout and post card design
- `app/blog/[slug]/page.tsx` -- post detail layout

### Adding Portable Text blocks

1. Add the block type to `sanity-schemas/post.ts` in the `body` field's `of`
   array
2. Add a renderer in `components/portable-text.tsx` under `types`

### Pagination

The listing page renders all posts. To add pagination, convert
`app/blog/page.tsx` to an optional catch-all route:

1. Rename `app/blog/page.tsx` to `app/blog/[[...page]]/page.tsx`
2. Use the page param to calculate offset/limit in the GROQ query
3. Add `generateStaticParams` to pre-render each page

### Additional feed formats

Copy `app/blog/feed.xml/route.ts` to create Atom and JSON feeds:

- `app/blog/atom.xml/route.ts` -- change `feed.rss2()` to `feed.atom1()`
- `app/blog/feed.json/route.ts` -- change `feed.rss2()` to `feed.json1()`
  and set `Content-Type` to `application/json; charset=utf-8`

## File Structure

```
blog/
  README.md
  sanity-schemas/
    post.ts          # Blog post document schema
    category.ts      # Category document schema
    author.ts        # Author document schema
  lib/
    sanity-queries.ts  # GROQ query constants
  components/
    portable-text.tsx  # Custom Portable Text renderer
  app/blog/
    page.tsx                   # Post listing
    [slug]/page.tsx            # Post detail
    category/[slug]/page.tsx   # Category filter
    feed.xml/route.ts          # RSS feed
```

## Notes

- This pattern intentionally duplicates schemas and components from the base
  template to remain self-contained and portable.
- Posts and category pages are statically generated at build time. Content
  changes require a rebuild (configure a Sanity webhook for auto-deploy).
- The pattern uses placeholder data by default. Nothing renders until you wire
  up your Sanity client and create content in the Studio.
