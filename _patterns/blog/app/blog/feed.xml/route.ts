// RSS feed route handler -- self-contained for the blog pattern.
// Only imports from npm packages and relative paths within the pattern.
//
// Requires the 'feed' npm package: npm install feed
//
// To add Atom and JSON feed formats, copy this file to:
//   app/blog/atom.xml/route.ts  -- change feed.rss2() to feed.atom1()
//   app/blog/feed.json/route.ts -- change feed.rss2() to feed.json1()
//     and set Content-Type to 'application/json; charset=utf-8'

import { Feed } from 'feed';

import { POSTS_QUERY } from '../../../lib/sanity-queries';

// TODO: Import your project's Sanity client here.
// Example: import { sanityClient } from '<your-project>/lib/sanity';

// TODO: Replace with your site's actual URL and details.
const SITE_URL = 'https://example.com';
const SITE_TITLE = 'My Blog';
const SITE_DESCRIPTION = 'Articles, tutorials, and insights.';

interface FeedPost {
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  author?: string;
}

export async function GET() {
  // TODO: Replace with your Sanity client fetch call.
  // const posts: FeedPost[] = await sanityClient.fetch(POSTS_QUERY);
  const posts: FeedPost[] = [];

  const feed = new Feed({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    id: SITE_URL,
    link: SITE_URL,
    language: 'en',
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss: `${SITE_URL}/blog/feed.xml`,
      atom: `${SITE_URL}/blog/atom.xml`,
      json: `${SITE_URL}/blog/feed.json`,
    },
  });

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: `${SITE_URL}/blog/${post.slug}`,
      link: `${SITE_URL}/blog/${post.slug}`,
      description: post.excerpt || '',
      date: new Date(post.publishedAt),
      author: post.author ? [{ name: post.author }] : undefined,
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
