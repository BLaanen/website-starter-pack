// Blog post detail page -- self-contained for the blog pattern.
// Only imports from npm packages and relative paths within the pattern.

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { PortableText } from '../../../components/portable-text';
import {
  POST_BY_SLUG_QUERY,
  POST_SLUGS_QUERY,
} from '../../../lib/sanity-queries';

// TODO: Import your project's Sanity client here.
// Example: import { sanityClient } from '<your-project>/lib/sanity';
// Then replace the placeholder fetch calls below.

// Placeholder types -- replace with your generated types or refine as needed.
interface Post {
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  mainImage?: { alt?: string };
  body?: unknown[];
  author?: {
    name: string;
    slug: string;
    image?: unknown;
    bio?: string;
  };
  categories?: { title: string; slug: string }[];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // TODO: Replace with your Sanity client fetch call.
  // const slugs = await sanityClient.fetch(POST_SLUGS_QUERY);
  // return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
  return [];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  // TODO: Replace with your Sanity client fetch call.
  // const post: Post | null = await sanityClient.fetch(POST_BY_SLUG_QUERY, { slug });
  const post: Post | null = null;

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.title,
    description: post.excerpt || `Read ${post.title} on our blog.`,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  // TODO: Replace with your Sanity client fetch call.
  // const post: Post | null = await sanityClient.fetch(POST_BY_SLUG_QUERY, { slug });
  const post: Post | null = null;

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <article>
        {/* Back link */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          &larr; Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-10">
          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/blog/category/${cat.slug}`}
                  className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 hover:bg-blue-200 transition-colors"
                >
                  {cat.title}
                </Link>
              ))}
            </div>
          )}

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 text-gray-500">
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
                <span>{post.author.name}</span>
              </>
            )}
          </div>
        </header>

        {/* Body */}
        {post.body && (
          <div className="prose-like">
            <PortableText value={post.body} />
          </div>
        )}

        {/* Author bio */}
        {post.author?.bio && (
          <footer className="mt-16 border-t border-gray-200 pt-8">
            <div className="flex items-start gap-4">
              <div>
                <p className="font-semibold">{post.author.name}</p>
                <p className="text-sm text-gray-600 mt-1">{post.author.bio}</p>
              </div>
            </div>
          </footer>
        )}
      </article>
    </main>
  );
}
