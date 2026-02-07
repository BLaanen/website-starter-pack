import type { Metadata } from 'next';
import { sanityFetch } from '@/sanity/live';
import { PAGE_METADATA_QUERY, SITE_SETTINGS_QUERY } from './queries';
import { urlFor } from './image';

interface GenerateMetadataParams {
  type: 'page' | 'post' | 'siteSettings';
  slug?: string;
}

export async function generatePageMetadata({
  type,
  slug,
}: GenerateMetadataParams): Promise<Metadata> {
  if (type === 'siteSettings') {
    const { data: settings } = await sanityFetch({
      query: SITE_SETTINGS_QUERY,
    });
    return {
      title: settings?.siteName || 'Website',
      description: settings?.siteDescription || '',
    };
  }

  if (!slug) return { title: 'Page Not Found' };

  const { data } = await sanityFetch({
    query: PAGE_METADATA_QUERY,
    params: { slug },
  });

  const page = data?.page;
  const settings = data?.siteSettings;

  if (!page) return { title: 'Page Not Found' };

  const title = page.metaTitle || settings?.siteName || 'Untitled';
  const description = page.metaDescription || settings?.siteDescription || '';

  const ogImageUrl = page.ogImage?.asset
    ? urlFor(page.ogImage).width(1200).height(630).format('jpg').quality(90).url()
    : null;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      ...(ogImageUrl
        ? { images: [{ url: ogImageUrl, width: 1200, height: 630 }] }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImageUrl ? { images: [ogImageUrl] } : {}),
    },
  };
}
