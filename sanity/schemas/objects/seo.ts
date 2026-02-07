import { defineType } from 'sanity'

export default defineType({
  name: 'seo',
  type: 'object',
  title: 'SEO',
  description: 'Search engine optimization fields',
  fields: [
    {
      name: 'metaTitle',
      type: 'string',
      title: 'Meta Title',
      description: 'Title for search engines and social media (50-60 characters recommended)',
      validation: (Rule) =>
        Rule.custom<string>((value) => {
          if (!value) return true
          if (value.length > 60) {
            return 'Title is longer than 60 characters. Consider shortening for better display in search results.'
          }
          return true
        }).warning(),
    },
    {
      name: 'metaDescription',
      type: 'text',
      title: 'Meta Description',
      description: 'Description for search engines and social media (150-160 characters recommended)',
      rows: 3,
      validation: (Rule) =>
        Rule.custom<string>((value) => {
          if (!value) return true
          if (value.length > 160) {
            return 'Description is longer than 160 characters. Consider shortening for better display in search results.'
          }
          return true
        }).warning(),
    },
    {
      name: 'ogImage',
      type: 'image',
      title: 'Open Graph Image',
      description: 'Image for social media sharing (1200x630px recommended)',
      options: {
        hotspot: true,
      },
    },
  ],
})
