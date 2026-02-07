import { defineType } from 'sanity'

export default defineType({
  name: 'imageBlock',
  type: 'object',
  title: 'Image Block',
  fields: [
    {
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
        metadata: ['lqip', 'blurhash', 'palette', 'dimensions'],
      },
    },
    {
      name: 'alt',
      type: 'string',
      title: 'Alt Text',
      description: 'Alternative text for accessibility and SEO',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'caption',
      type: 'string',
      title: 'Caption',
      description: 'Optional caption displayed below the image',
    },
  ],
  preview: {
    select: {
      alt: 'alt',
      caption: 'caption',
      media: 'image',
    },
    prepare({ alt, caption, media }) {
      return {
        title: alt || 'Image',
        subtitle: caption || 'No caption',
        media,
      }
    },
  },
})
