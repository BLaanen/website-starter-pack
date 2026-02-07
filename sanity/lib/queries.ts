import { defineQuery } from 'next-sanity';

export const ALL_POSTS_QUERY = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    coverImage {
      asset->{_id, url, metadata {lqip, dimensions}},
      hotspot,
      crop,
      alt
    },
    "author": author->{name, image},
    "categories": categories[]->{title, slug}
  }
`);

export const POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    body,
    coverImage {
      asset->{_id, url, metadata {lqip, dimensions, palette}},
      hotspot,
      crop,
      alt
    },
    "author": author->{name, image, bio},
    "categories": categories[]->{title, slug},
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`);

export const ALL_PAGES_QUERY = defineQuery(`
  *[_type == "page"] {
    _id,
    title,
    slug
  }
`);

export const PAGE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    body,
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`);

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    siteName,
    siteDescription,
    navigation[] {
      text,
      url,
      isExternal
    },
    socialLinks[] {
      platform,
      url
    },
    footerText
  }
`);

export const HOMEPAGE_QUERY = defineQuery(`
  *[_type == "page" && slug.current == "home"][0] {
    title,
    body[] {
      ...,
      _type == "imageBlock" => {
        ...,
        image {
          ...,
          asset->
        }
      }
    }
  }
`);

export const PAGE_METADATA_QUERY = defineQuery(`
  {
    "page": *[_type == "page" && slug.current == $slug][0]{
      "metaTitle": coalesce(seo.metaTitle, title),
      "metaDescription": coalesce(seo.metaDescription, ""),
      "ogImage": seo.ogImage {
        ...,
        asset->
      },
      title
    },
    "siteSettings": *[_type == "siteSettings"][0]{
      siteName,
      siteDescription
    }
  }
`);

export const ALL_CATEGORIES_QUERY = defineQuery(`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug
  }
`);
