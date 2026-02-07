import { defineType } from 'sanity'

export default defineType({
  name: 'videoEmbed',
  type: 'object',
  title: 'Video Embed',
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'Video URL',
      description: 'YouTube, Vimeo, or other video URL',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Optional title for accessibility',
    },
  ],
  preview: {
    select: {
      title: 'title',
      url: 'url',
    },
    prepare({ title, url }) {
      return {
        title: title || 'Video Embed',
        subtitle: url,
      }
    },
  },
})
