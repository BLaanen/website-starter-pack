import type { MetadataRoute } from 'next';
import { client } from '@/sanity/client';
import { SITEMAP_QUERY } from '@/sanity/lib/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const data = await client.fetch(SITEMAP_QUERY);

  const pages = (data?.pages || [])
    .filter((page: any) => page.slug && page.slug !== 'home')
    .map((page: any) => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: new Date(page._updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

  const posts = (data?.posts || [])
    .filter((post: any) => post.slug)
    .map((post: any) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post._updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...pages,
    ...posts,
  ];
}
