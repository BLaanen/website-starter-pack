// GROQ queries for the blog pattern.
//
// These are plain string constants -- the consuming project provides the
// Sanity client. Import the queries you need and pass them to your client:
//
//   import { POSTS_QUERY } from '<your-project>/lib/sanity-queries';
//   const posts = await sanityClient.fetch(POSTS_QUERY);
//
// Replace '<your-project>' with your project's import alias (e.g. @/).

/** Fetch all published posts, newest first. */
export const POSTS_QUERY = `
  *[_type == "post"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    mainImage,
    "author": author->name,
    "categories": categories[]->{ title, "slug": slug.current }
  }
`;

/** Fetch a single post by slug with full content. */
export const POST_BY_SLUG_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    mainImage,
    body,
    "author": author->{ name, "slug": slug.current, image, bio },
    "categories": categories[]->{ title, "slug": slug.current }
  }
`;

/** Fetch posts that belong to a category (by category slug). */
export const POSTS_BY_CATEGORY_QUERY = `
  *[_type == "post" && references(*[_type == "category" && slug.current == $slug]._id)] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    mainImage,
    "author": author->name,
    "categories": categories[]->{ title, "slug": slug.current }
  }
`;

/** Fetch all categories. */
export const CATEGORIES_QUERY = `
  *[_type == "category"] | order(title asc) {
    title,
    "slug": slug.current,
    description
  }
`;

/** Fetch all post slugs (for generateStaticParams). */
export const POST_SLUGS_QUERY = `
  *[_type == "post"]{ "slug": slug.current }
`;

/** Fetch all category slugs (for generateStaticParams). */
export const CATEGORY_SLUGS_QUERY = `
  *[_type == "category"]{ "slug": slug.current }
`;
