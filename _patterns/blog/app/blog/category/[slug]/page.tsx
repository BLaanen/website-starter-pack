// Category filter page -- self-contained for the blog pattern.
// Only imports from npm packages and relative paths within the pattern.

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  POSTS_BY_CATEGORY_QUERY,
  CATEGORIES_QUERY,
  CATEGORY_SLUGS_QUERY,
} from '../../../../lib/sanity-queries';

// TODO: Import your project's Sanity client here.
// Example: import { sanityClient } from '<your-project>/lib/sanity';
// Then replace the placeholder fetch calls below.

// Placeholder types -- replace with your generated types or refine as needed.
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

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // TODO: Replace with your Sanity client fetch call.
  // const slugs = await sanityClient.fetch(CATEGORY_SLUGS_QUERY);
  // return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
  return [];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  // TODO: Replace with your Sanity client fetch call.
  // const categories: Category[] = await sanityClient.fetch(CATEGORIES_QUERY);
  // const category = categories.find((c) => c.slug === slug);
  const category: Category | undefined = undefined;

  if (!category) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `${category.title} - Blog`,
    description:
      category.description || `Browse posts in the ${category.title} category.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;

  // TODO: Replace with your Sanity client fetch calls.
  // const categories: Category[] = await sanityClient.fetch(CATEGORIES_QUERY);
  // const category = categories.find((c) => c.slug === slug);
  // const posts: Post[] = await sanityClient.fetch(POSTS_BY_CATEGORY_QUERY, { slug });
  const category: Category | undefined = undefined;
  const posts: Post[] = [];

  if (!category) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Back link */}
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
      >
        &larr; All Posts
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          {category.title}
        </h1>
        {category.description && (
          <p className="text-lg text-gray-600">{category.description}</p>
        )}
      </header>

      {/* Post grid (same card layout as blog listing) */}
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts in this category yet.</p>
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
