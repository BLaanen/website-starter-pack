// Blog listing page -- self-contained for the blog pattern.
// Only imports from npm packages and relative paths within the pattern.

import type { Metadata } from 'next';
import Link from 'next/link';

import {
  POSTS_QUERY,
  CATEGORIES_QUERY,
} from '../../lib/sanity-queries';

// TODO: Import your project's Sanity client here.
// Example: import { sanityClient } from '<your-project>/lib/sanity';
// Then replace the placeholder fetch calls below.

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read our latest articles, tutorials, and insights.',
};

// Placeholder type -- replace with your generated types or refine as needed.
interface Post {
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  author?: string;
  categories?: { title: string; slug: string }[];
}

interface Category {
  title: string;
  slug: string;
  description?: string;
}

export default async function BlogPage() {
  // TODO: Replace these with your Sanity client fetch calls.
  // const posts: Post[] = await sanityClient.fetch(POSTS_QUERY);
  // const categories: Category[] = await sanityClient.fetch(CATEGORIES_QUERY);
  const posts: Post[] = [];
  const categories: Category[] = [];

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Blog</h1>

      {/* Category filter */}
      <nav className="mb-12 flex flex-wrap gap-2" aria-label="Blog categories">
        <Link
          href="/blog"
          className="rounded-full bg-gray-900 px-4 py-1.5 text-sm font-medium text-white"
        >
          All
        </Link>
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/blog/category/${category.slug}`}
            className="rounded-full border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {category.title}
          </Link>
        ))}
      </nav>

      {/* Post grid */}
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet. Create some in Sanity Studio.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-wrap gap-2 mb-3">
                {post.categories?.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/blog/category/${cat.slug}`}
                    className="text-xs font-medium uppercase tracking-wide text-blue-600 hover:text-blue-800"
                  >
                    {cat.title}
                  </Link>
                ))}
              </div>

              <h2 className="text-xl font-semibold mb-2">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:underline"
                >
                  {post.title}
                </Link>
              </h2>

              {post.excerpt && (
                <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
              )}

              <div className="mt-auto flex items-center gap-2 text-sm text-gray-500">
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                {post.author && (
                  <>
                    <span aria-hidden="true">&middot;</span>
                    <span>{post.author}</span>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
